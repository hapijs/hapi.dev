---
title: 测试
---

<TutorialLang />

# <a name="testing"></a> 测试

_本教程适用于 hapi v21 及更高版本_

## <a name="overview"></a> 概述

hapi 可以在不打开端口的情况下测试路由。`server.inject()` 会让一个模拟请求走完整个请求生命周期（路由匹配、身份认证、验证、handler 和响应），然后把响应交给你，整个过程不涉及网络。测试运行得很快，也不会因为端口冲突而出问题。

本教程使用 [lab](/module/lab) 作为测试运行器，使用 [code](/module/code) 做断言，不过在 [Mocha](https://mochajs.org/)、[Jest](https://jestjs.io/)、[Vitest](https://vitest.dev/) 或 Node.js 自带的测试运行器中，`server.inject()` 的用法完全一样。

```sh
npm install --save-dev @hapi/lab @hapi/code
```

## <a name="server"></a> 服务器设置

把构建服务器的代码和启动服务器的代码分开。生产环境在某个端口上启动服务器；测试只初始化服务器，并用 `server.inject()` 发送请求：

```
myproject/
├── index.ts            # production entry point: calls start()
├── lib/
│   └── server.ts       # builds the server, exports init() and start()
├── test/
│   └── example.test.ts # calls init() and server.inject()
└── package.json
```

`lib/server.ts` 每次调用都会构建一个新的服务器，因此每个测试都有自己的服务器，不会残留上一个测试的状态：

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

生产环境的入口文件只负责启动服务器：

```ts
import { start } from './lib/server.ts';

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();
```

两个函数的区别：

|                                    | [`server.initialize()`](/api#await-server-initialize) | [`server.start()`](/api#await-server-start) |
| ---------------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| 检查插件依赖                       | 是                                                    | 是                                          |
| 启动缓存                           | 是                                                    | 是                                          |
| 运行 `onPreStart` 扩展             | 是                                                    | 是                                          |
| 监听端口                           | 否                                                    | 是                                          |
| 触发 `'start'`，运行 `onPostStart` | 否                                                    | 是                                          |

测试使用 `initialize()`，这样缓存和 `onPreStart` 中的初始化逻辑会和生产环境完全一样地运行，但不会绑定端口。

## <a name="writingTest"></a> 编写路由测试

创建 `test/example.test.ts`：

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

- lab 通过导出的 `lab` 脚本找到测试。
- `describe()` 用于给测试分组，`it()` 定义一个测试。`beforeEach()` 和 `afterEach()` 在每个测试前后运行。
- `server` 使用 hapi 的 `Server` 类型声明，因为它要稍后在 `beforeEach()` 中才被赋值。
- 每个测试结束后调用 `server.stop()` 会停止缓存，并运行 `onPreStop` 和 `onPostStop` 扩展，这样测试之间不会互相影响。

### <a name="what-server-inject-gives-you"></a> `server.inject()` 提供了什么

`server.inject()` 以对象形式接收请求，并返回响应：

| 请求选项        | 用途                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------ |
| `method`、`url` | 要调用的路由。                                                                             |
| `payload`       | 请求的 payload。对象会以 JSON 发送。                                                       |
| `headers`       | 请求头，例如 `authorization` 或 `cookie`。                                                 |
| `auth`          | `{ strategy, credentials }`，用于跳过身份认证 strategy，以指定用户的身份测试受保护的路由。 |

| 响应属性     | 内容                                                         |
| ------------ | ------------------------------------------------------------ |
| `statusCode` | HTTP 状态码。                                                |
| `headers`    | 响应头。                                                     |
| `payload`    | 字符串形式的响应体，与客户端收到的完全一致。                 |
| `result`     | handler 返回的值，尚未序列化。比较对象时用这个属性。         |
| `request`    | hapi 的请求对象，用于检查 `request.auth`、`request.app` 等。 |

所有选项请参阅 [`server.inject()`](/api#await-server-inject-options)。

## <a name="running"></a> 运行测试

lab 只会自动发现 `.js`、`.mjs` 和 `.cjs` 文件，所以要把 TypeScript 测试文件作为参数传给它。在 `package.json` 中添加一个脚本：

```json
{
    "scripts": {
        "test": "lab -v test/*.test.ts"
    }
}
```

然后运行 `npm test`。lab 导入这些文件时，Node.js 会剥离类型，所以不需要构建步骤。

- 运行 lab 时不要加 `--typescript`、`-t` 或 `-c`；Node.js 已经处理了 TypeScript。
- 要统计覆盖率，请用 `npm install --save-dev c8` 安装 [c8](https://github.com/bcoe/c8)，然后在它下面运行 lab：`c8 lab test/*.test.ts`。
