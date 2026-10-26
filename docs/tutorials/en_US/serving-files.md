---
title: Serving Files
---

<TutorialLang />

# Serving Static Content

_This tutorial is compatible with hapi v21 and newer_

## <a name="overview"></a> Overview

hapi serves files from disk through the [inert](/module/inert) plugin. Install it:

```sh
npm install @hapi/inert
```

## <a name="inert"></a> Inert

Registering inert adds three ways to send files:

| What                | Use it for                                                 |
| ------------------- | ---------------------------------------------------------- |
| `h.file(path)`      | sending a file from inside a handler, after your own logic |
| `file` handler      | a route that always serves one file                        |
| `directory` handler | a route that serves every file in a folder                 |

Importing `@hapi/inert` also adds these to hapi's TypeScript types, so `h.file()` and the `file` and `directory` handlers type-check.

## <a name="path"></a> Relative paths

Set `routes.files.relativeTo` on the server once, and every file path in your routes is resolved from that folder:

```ts
import Path from 'node:path';
import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';

const server = Hapi.server({
    routes: {
        files: {
            relativeTo: Path.join(import.meta.dirname, 'public'),
        },
    },
});

await server.register(Inert);

server.route({
    method: 'GET',
    path: '/picture.jpg',
    handler: (request, h) => {
        return h.file('picture.jpg');
    },
});

await server.start();
console.log('Server running at:', server.info.uri);
```

`routes.files.relativeTo` defaults to the process's working directory. Any option under the server's `routes` applies to every route, and a route can override it in its own `options.files`.

## <a name="hfile"></a> `h.file(path, [options])`

[`h.file()`](/module/inert#h-file-path-options) sends a file as the response. Paths are confined to the `relativeTo` folder: a path that resolves outside it, such as `'../secrets.json'` or an absolute path elsewhere on disk, replies `403 Forbidden`. That stops a request parameter from reading arbitrary files:

```ts
server.route<{ Params: { filename: string } }>({
    method: 'GET',
    path: '/download/{filename}',
    handler: (request, h) => {
        return h.file(request.params.filename, { mode: 'attachment' });
    },
});
```

`/download/report.pdf` sends `public/report.pdf` as a download, and `/download/..%2Fserver.ts` gets `403`. To send a file from outside the folder on purpose, pass `confine: false`, and never with a path built from user input.

## <a name="filehandler"></a> File handler

When a route always serves the same file, use the `file` handler instead of writing a handler function:

```ts
server.route({
    method: 'GET',
    path: '/picture.jpg',
    handler: {
        file: 'picture.jpg',
    },
});
```

### <a name="fileoptions"></a> File handler options

The object form takes the same options as `h.file()`:

```ts
server.route({
    method: 'GET',
    path: '/script.js',
    handler: {
        file: {
            path: 'script.js',
            filename: 'client.js',
            mode: 'attachment',
            lookupCompressed: true,
        },
    },
});
```

| Option             | Effect                                                                                                                                                                                                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`             | the file to send; also accepts a function `(request) => path`                                                                                                                                                                                                                |
| `mode`             | `'attachment'` (download) or `'inline'`; sets the `Content-Disposition` header                                                                                                                                                                                               |
| `filename`         | the file name in `Content-Disposition`, here `client.js` instead of `script.js`                                                                                                                                                                                              |
| `lookupCompressed` | serves `script.js.gz` when it exists and the client accepts gzip; `lookupMap` replaces the default `{ gzip: '.gz' }`, so list every encoding, such as `{ gzip: '.gz', br: '.br' }` (`br` also needs [`server.encoder()`](/tutorials/en_US/response-marshalling#compression)) |
| `confine`          | `true` (default) keeps paths inside `relativeTo`; `false` allows any path                                                                                                                                                                                                    |
| `etagMethod`       | `'hash'` (default), `'simple'` (size and modified time, cheaper), or `false`                                                                                                                                                                                                 |

The full list is in the [inert API](/module/inert#the-file-handler).

## <a name="directoryhandler"></a> Directory handler

The `directory` handler serves a whole folder from one route. The path must end with a parameter, and the parameter's value is the file to look up. The parameter sets how deep the route serves: `{param}` serves one level, `{param?}` also serves the folder root, `{param*}` serves any depth, and `{param*2}` serves exactly two levels:

```ts
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'directory-path-here',
        },
    },
});
```

### <a name="directoryoptions"></a> Directory handler options

For each request, inert resolves the file like this:

```mermaid
flowchart TD
    R["request /docs"] --> F{"is it a file?"}
    F -->|yes| S[send the file]
    F -->|"not found"| E{"defaultExtension set?"}
    E -->|yes| X["try /docs.html"]
    E -->|no| N[404]
    F -->|"a directory"| T{"trailing slash?"}
    T -->|no| RD["302 to /docs/"]
    T -->|yes| I{"index file exists?"}
    I -->|yes| SI[send index.html]
    I -->|no| L{"listing: true?"}
    L -->|yes| HL[send HTML listing]
    L -->|no| FB[403]
```

| Option             | Default  | Effect                                                                                             |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------- |
| `path`             | required | the folder, an array of folders tried in order, or a function `(request) => path`                  |
| `index`            | `true`   | serve `index.html` for a directory; a string or array names other index files; `false` disables it |
| `listing`          | `false`  | show an HTML listing for a directory with no index file                                            |
| `showHidden`       | `false`  | include hidden files in listings and serve them                                                    |
| `redirectToSlash`  | `true`   | redirect `/docs` to `/docs/` when `docs` is a directory                                            |
| `defaultExtension` | none     | when `/about` is not found, try `/about.html`                                                      |
| `lookupCompressed` | `false`  | serve precompressed `.gz` files, same as the `file` handler option                                 |

With `index: ['index.html', 'default.html']`, a directory request tries `index.html` first, then `default.html`.

## <a name="fileserver"></a> Static file server

A complete server that serves the `public` folder at the site root:

```ts
import Path from 'node:path';
import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';

const server = Hapi.server({
    port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(import.meta.dirname, 'public'),
        },
    },
});

await server.register(Inert);

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            defaultExtension: 'html',
        },
    },
});

await server.start();
console.log('Server running at:', server.info.uri);
```

- `path: '.'` points the handler at `relativeTo`, the `public` folder.
- `/` serves `public/index.html`, and `/docs` redirects to `/docs/`, which serves `public/docs/index.html`.
- `defaultExtension: 'html'` lets `/about` serve `public/about.html`, so your URLs need no `.html`.
- Because `/{param*}` is the least specific path possible, any other route you add, such as `/api/users`, still answers its own requests. See [which route wins](/tutorials/en_US/routing#specificity).
