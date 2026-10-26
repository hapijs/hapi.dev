---
title: Getting Started
---

<TutorialLang />

# Getting Started

_This tutorial is compatible with hapi v21 and newer_

## <a name="overview"></a> Overview

This tutorial sets up a basic hapi server that displays "Hello World!" in your browser.

## <a name="installing"></a> Installing hapi

```sh
mkdir myproject
cd myproject
npm init -y               # creates package.json
npm pkg set type=module   # makes Node.js treat your files as ES modules
npm install @hapi/hapi
```

The examples in these tutorials are written in TypeScript, but TypeScript is optional. hapi works the same from plain JavaScript: remove the type annotations, `import type` lines, `interface` and `declare module` blocks, and type arguments such as `server.route<...>` from an example, and save it as a `.js` file. See [Using TypeScript](#typescript) to set up type checking.

## <a name="server"></a> Creating a Server

A very basic hapi server looks like the following:

```ts
import Hapi from '@hapi/hapi';

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
```

`Hapi.server()` creates the server, and `server.start()` starts listening. The `unhandledRejection` handler stops the process if `init()` fails, for example when the port is already in use.

`host` decides which network interface the server listens on:

| `host`        | Reachable from                                        |
| ------------- | ----------------------------------------------------- |
| `'localhost'` | this machine only; the safest default for development |
| `'0.0.0.0'`   | every interface; needed inside a Docker container     |
| omitted       | every interface (hapi's default)                      |

You can also listen on a Unix socket or a Windows named pipe; see [`server.options.port`](/api#server-options-port).

## <a name="routes"></a> Adding Routes

Add a route that returns "Hello World!":

```ts
import Hapi from '@hapi/hapi';

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        },
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
```

Save the above as `index.ts` and start the server:

```sh
node index.ts
```

Node.js 22.18 and newer run `.ts` files directly, with no build step. This example has no type annotations, so saving it as `index.js` and running `node index.js` works too. Visit `http://localhost:3000` and you'll see `Hello World!`.

A route has three required properties:

| Property  | What it does                                                                                                         |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| `method`  | The HTTP method: `'GET'`, `'POST'`, an array such as `['GET', 'POST']`, or `'*'` for any method.                     |
| `path`    | The URL path. It can contain parameters such as `/users/{id}`; see the [routing tutorial](/tutorials/en_US/routing). |
| `handler` | The function that produces the response. It returns a value, returns a promise, or throws an error.                  |

## <a name="typescript"></a> Using TypeScript

This section is optional. hapi ships its own TypeScript types, so there is no `@types/hapi__hapi` package to install.

Node.js runs the examples by stripping the types, which only removes them; it does not check them. To check them, install the TypeScript compiler and the Node.js types:

```sh
npm install --save-dev typescript @types/node
```

Then add a `tsconfig.json`:

```json
{
    "compilerOptions": {
        "target": "esnext",
        "module": "nodenext",
        "strict": true,
        "noEmit": true,
        "erasableSyntaxOnly": true,
        "verbatimModuleSyntax": true,
        "allowImportingTsExtensions": true
    }
}
```

Run `npx tsc` whenever you want to check your types. `erasableSyntaxOnly` and `verbatimModuleSyntax` reject the TypeScript features that Node.js cannot strip, such as `enum` and type imports written without the `type` keyword.

In the route above, `request` and `h` need no type annotations: TypeScript infers them as hapi's `Request` and `ResponseToolkit` from the `server.route()` signature. Annotate them only when you write a handler outside of a route config, using the types exported by `@hapi/hapi`:

```ts
import type { Request, ResponseToolkit } from '@hapi/hapi';

const hello = (request: Request, h: ResponseToolkit) => {
    return 'Hello World!';
};
```

## <a name="everything"></a> Everything Else

This tutorial was intentionally minimal. Good next steps:

- [Plugins](/tutorials/en_US/plugins): split your application into reusable pieces.
- [Routing](/tutorials/en_US/routing): path parameters, methods, and route options.
- [Lifecycle Hooks](/tutorials/en_US/lifecycle-hooks): run code at each step of a request, and at server startup and shutdown.
- [Decorators](/tutorials/en_US/decorators): add your own methods to the server, the request, and the response toolkit.
- [Response Marshalling](/tutorials/en_US/response-marshalling): how a handler's return value becomes an HTTP response.
- [Testing](/tutorials/en_US/testing): test routes without opening a port.

Everything else is documented in the [API reference](/api). Ask questions on [GitHub](https://github.com/hapijs/hapi/issues) or in the [hapi Slack](https://join.slack.com/t/hapihour/shared_invite/zt-g5ortpsk-ErlnRA2rUcPIWES21oXBOg).
