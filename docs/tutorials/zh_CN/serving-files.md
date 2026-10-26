---
title: 静态文件服务
---

<TutorialLang />

# <a name="serving-static-content"></a> 静态文件服务

_本教程适用于 hapi v21 及更高版本_

## <a name="overview"></a> 概述

hapi 通过 [inert](/module/inert) 插件提供磁盘上的文件。先安装它：

```sh
npm install @hapi/inert
```

## <a name="inert"></a> Inert

注册 inert 后会多出三种发送文件的方式：

| 方式                | 适用场景                                    |
| ------------------- | ------------------------------------------- |
| `h.file(path)`      | 在 handler 中执行完自己的逻辑后发送一个文件 |
| `file` handler      | 一个始终提供同一文件的路由                  |
| `directory` handler | 一个提供某个文件夹中所有文件的路由          |

导入 `@hapi/inert` 也会把这些内容加入 hapi 的 TypeScript 类型，因此 `h.file()` 以及 `file` 和 `directory` handler 都能通过类型检查。

## <a name="path"></a> 相对路径

在服务器上设置一次 `routes.files.relativeTo`，路由中的所有文件路径都会从这个文件夹开始解析：

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

`routes.files.relativeTo` 默认是进程的工作目录。服务器 `routes` 下的任何选项都会应用到所有路由，单个路由可以在自己的 `options.files` 中覆盖它。

## <a name="hfile"></a> `h.file(path, [options])`

[`h.file()`](/module/inert#h-file-path-options) 把一个文件作为响应发送。路径被限制在 `relativeTo` 文件夹内：解析到文件夹之外的路径，例如 `'../secrets.json'` 或磁盘上其他位置的绝对路径，会返回 `403 Forbidden`。这样请求参数就无法读取任意文件：

```ts
server.route<{ Params: { filename: string } }>({
    method: 'GET',
    path: '/download/{filename}',
    handler: (request, h) => {
        return h.file(request.params.filename, { mode: 'attachment' });
    },
});
```

`/download/report.pdf` 会把 `public/report.pdf` 作为下载文件发送，而 `/download/..%2Fserver.ts` 得到 `403`。如果确实要发送文件夹之外的文件，请传入 `confine: false`，并且绝不要配合由用户输入拼出来的路径使用。

## <a name="filehandler"></a> File handler

如果一个路由始终提供同一个文件，可以使用 `file` handler，而不必编写 handler 函数：

```ts
server.route({
    method: 'GET',
    path: '/picture.jpg',
    handler: {
        file: 'picture.jpg',
    },
});
```

### <a name="fileoptions"></a> File handler 选项

对象形式接受与 `h.file()` 相同的选项：

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

| 选项               | 作用                                                                                                                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `path`             | 要发送的文件；也接受函数 `(request) => path`                                                                                                                                                                                               |
| `mode`             | `'attachment'`（下载）或 `'inline'`；设置 `Content-Disposition` 响应头                                                                                                                                                                     |
| `filename`         | `Content-Disposition` 中的文件名，这里是 `client.js` 而不是 `script.js`                                                                                                                                                                    |
| `lookupCompressed` | 当 `script.js.gz` 存在且客户端接受 gzip 时提供它；`lookupMap` 会替换默认的 `{ gzip: '.gz' }`，所以要列出所有编码，例如 `{ gzip: '.gz', br: '.br' }`（`br` 还需要 [`server.encoder()`](/tutorials/zh_CN/response-marshalling#compression)） |
| `confine`          | `true`（默认）把路径限制在 `relativeTo` 内；`false` 允许任意路径                                                                                                                                                                           |
| `etagMethod`       | `'hash'`（默认）、`'simple'`（基于大小和修改时间，开销更小）或 `false`                                                                                                                                                                     |

完整列表见 [inert API](/module/inert#the-file-handler)。

## <a name="directoryhandler"></a> Directory handler

`directory` handler 用一个路由提供整个文件夹。路径必须以参数结尾，参数的值就是要查找的文件。参数决定了路由能提供多深的层级：`{param}` 提供一层，`{param?}` 还会提供文件夹根目录，`{param*}` 提供任意深度，`{param*2}` 恰好提供两层：

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

### <a name="directoryoptions"></a> Directory handler 选项

对每个请求，inert 按以下方式解析文件：

```mermaid
flowchart TD
    R["请求 /docs"] --> F{"是文件吗？"}
    F -->|是| S[发送该文件]
    F -->|"未找到"| E{"设置了 defaultExtension？"}
    E -->|是| X["尝试 /docs.html"]
    E -->|否| N[404]
    F -->|"是目录"| T{"有结尾斜杠？"}
    T -->|否| RD["302 跳转到 /docs/"]
    T -->|是| I{"存在索引文件？"}
    I -->|是| SI[发送 index.html]
    I -->|否| L{"listing: true？"}
    L -->|是| HL[发送 HTML 目录列表]
    L -->|否| FB[403]
```

| 选项               | 默认值  | 作用                                                                      |
| ------------------ | ------- | ------------------------------------------------------------------------- |
| `path`             | 必填    | 文件夹、按顺序尝试的文件夹数组，或函数 `(request) => path`                |
| `index`            | `true`  | 对目录提供 `index.html`；字符串或数组可指定其他索引文件；`false` 表示禁用 |
| `listing`          | `false` | 对没有索引文件的目录显示 HTML 目录列表                                    |
| `showHidden`       | `false` | 在目录列表中包含隐藏文件，并提供这些文件                                  |
| `redirectToSlash`  | `true`  | 当 `docs` 是目录时，把 `/docs` 重定向到 `/docs/`                          |
| `defaultExtension` | 无      | 找不到 `/about` 时，尝试 `/about.html`                                    |
| `lookupCompressed` | `false` | 提供预压缩的 `.gz` 文件，与 `file` handler 的同名选项相同                 |

使用 `index: ['index.html', 'default.html']` 时，目录请求会先尝试 `index.html`，再尝试 `default.html`。

## <a name="fileserver"></a> 静态文件服务器

一个在站点根路径提供 `public` 文件夹的完整服务器：

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

- `path: '.'` 让 handler 指向 `relativeTo`，也就是 `public` 文件夹。
- `/` 提供 `public/index.html`，`/docs` 会重定向到 `/docs/`，后者提供 `public/docs/index.html`。
- `defaultExtension: 'html'` 让 `/about` 提供 `public/about.html`，这样你的 URL 不需要带 `.html`。
- 由于 `/{param*}` 是最不具体的路径，你添加的其他路由，例如 `/api/users`，仍然会响应各自的请求。请参阅[哪个路由胜出](/tutorials/zh_CN/routing#specificity)。
