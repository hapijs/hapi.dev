---
title: Testing
---

<TutorialLang />

# Testing

_This tutorial is compatible with hapi v21 and newer_

## <a name="overview"></a> Overview

hapi can test routes without opening a port. `server.inject()` sends a fake request through the full request lifecycle (routing, authentication, validation, the handler, and the response) and hands you the response, with no network involved. Tests run fast and never collide over ports.

This tutorial uses [lab](/module/lab) as the test runner and [code](/module/code) for assertions, but `server.inject()` works the same from [Mocha](https://mochajs.org/), [Jest](https://jestjs.io/), [Vitest](https://vitest.dev/), or the Node.js test runner.

```sh
npm install --save-dev @hapi/lab @hapi/code
```

## <a name="server"></a> Server Setup

Keep the code that builds the server apart from the code that starts it. Production starts the server on a port; tests only initialize it and send requests with `server.inject()`:

```
myproject/
├── index.ts            # production entry point: calls start()
├── lib/
│   └── server.ts       # builds the server, exports init() and start()
├── test/
│   └── example.test.ts # calls init() and server.inject()
└── package.json
```

`lib/server.ts` builds a new server on every call, so each test gets its own server with no state left over from the previous test:

```ts
import Hapi from '@hapi/hapi';

const createServer = () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function () {
            return 'Hello World!';
        },
    });

    return server;
};

export const init = async () => {
    const server = createServer();
    await server.initialize();
    return server;
};

export const start = async () => {
    const server = createServer();
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};
```

The production entry point only starts the server:

```ts
import { start } from './lib/server.ts';

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();
```

The difference between the two functions:

|                                     | [`server.initialize()`](/api#await-server-initialize) | [`server.start()`](/api#await-server-start) |
| ----------------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| Checks plugin dependencies          | yes                                                   | yes                                         |
| Starts caches                       | yes                                                   | yes                                         |
| Runs `onPreStart` extensions        | yes                                                   | yes                                         |
| Listens on the port                 | no                                                    | yes                                         |
| Emits `'start'`, runs `onPostStart` | no                                                    | yes                                         |

Tests use `initialize()` so caches and `onPreStart` setup run exactly as in production, without binding a port.

## <a name="writingTest"></a> Writing a Route Test

Create `test/example.test.ts`:

```ts
import Lab from '@hapi/lab';
import { expect } from '@hapi/code';

import { init } from '../lib/server.ts';

import type { Server } from '@hapi/hapi';

export const lab = Lab.script();
const { afterEach, beforeEach, describe, it } = lab;

describe('GET /', () => {
    let server: Server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/',
        });

        expect(res.statusCode).to.equal(200);
        expect(res.payload).to.equal('Hello World!');
    });
});
```

- lab finds the tests through the exported `lab` script.
- `describe()` groups tests, and `it()` defines one test. `beforeEach()` and `afterEach()` run around every test.
- `server` is typed with hapi's `Server` type because it is assigned later, in `beforeEach()`.
- `server.stop()` after each test stops caches and runs `onPreStop` and `onPostStop` extensions, so nothing leaks between tests.

### What `server.inject()` gives you

`server.inject()` takes the request as an object and returns the response:

| Request option  | Use it for                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| `method`, `url` | The route to call.                                                                                          |
| `payload`       | The request body. Objects are sent as JSON.                                                                 |
| `headers`       | Request headers, such as `authorization` or `cookie`.                                                       |
| `auth`          | `{ strategy, credentials }` to skip the authentication strategy and test a protected route as a given user. |

| Response property | Contains                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------- |
| `statusCode`      | The HTTP status code.                                                                    |
| `headers`         | The response headers.                                                                    |
| `payload`         | The response body as a string, exactly as a client would receive it.                     |
| `result`          | The value the handler returned, before it was serialized. Compare objects with this one. |
| `request`         | The hapi request object, for checking `request.auth`, `request.app`, and so on.          |

See [`server.inject()`](/api#await-server-inject-options) for every option.

## <a name="running"></a> Running the Tests

lab only discovers `.js`, `.mjs`, and `.cjs` files on its own, so pass the TypeScript test files as arguments. Add a script to `package.json`:

```json
{
    "scripts": {
        "test": "lab -v test/*.test.ts"
    }
}
```

Then run `npm test`. Node.js strips the types when lab imports the files, so there is no build step.

- Run lab without `--typescript`, `-t`, or `-c`; Node.js already handles the TypeScript.
- To measure coverage, install [c8](https://github.com/bcoe/c8) with `npm install --save-dev c8`, and run lab under it: `c8 lab test/*.test.ts`.
