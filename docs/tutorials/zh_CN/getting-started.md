---
title: 快速入门
---

<TutorialLang />

# 快速入门

_本教程适用于 hapi v21 及更新版本_

## <a name="overview"></a> 概述

本教程搭建一个基础的 hapi 服务器，在浏览器中显示 "Hello World!"。

## <a name="installing"></a> 安装 hapi

```sh
mkdir myproject
cd myproject
npm init -y               # creates package.json
npm pkg set type=module   # makes Node.js treat your files as ES modules
npm install @hapi/hapi
```

这些教程中的示例使用 TypeScript 编写，但 TypeScript 不是必需的。在纯 JavaScript 中使用 hapi 的方式完全相同：从示例中删除类型注解、`import type` 语句、`interface` 和 `declare module` 代码块，以及 `server.route<...>` 这样的类型参数，然后保存为 `.js` 文件即可。如需配置类型检查，请参阅[使用 TypeScript](#typescript)。

## <a name="server"></a> 创建服务器

一个最基础的 hapi 服务器如下：

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

`Hapi.server()` 创建服务器，`server.start()` 开始监听。如果 `init()` 失败（例如端口已被占用），`unhandledRejection` 处理函数会终止进程。

`host` 决定服务器监听哪个网络接口：

| `host`        | 可访问范围                               |
| ------------- | ---------------------------------------- |
| `'localhost'` | 仅本机；开发环境下最安全的默认值         |
| `'0.0.0.0'`   | 所有网络接口；在 Docker 容器中运行时需要 |
| 省略          | 所有网络接口（hapi 的默认行为）          |

服务器也可以监听 Unix socket 或 Windows 命名管道，参见 [`server.options.port`](/api#server-options-port)。

## <a name="routes"></a> 添加路由

添加一个返回 "Hello World!" 的路由：

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

将上面的代码保存为 `index.ts`，然后启动服务器：

```sh
node index.ts
```

Node.js 22.18 及更新版本可以直接运行 `.ts` 文件，无需构建步骤。这个示例没有类型注解，所以保存为 `index.js` 并运行 `node index.js` 也可以。访问 `http://localhost:3000`，就能看到 `Hello World!`。

路由有三个必需属性：

| 属性      | 作用                                                                                   |
| --------- | -------------------------------------------------------------------------------------- |
| `method`  | HTTP 方法：`'GET'`、`'POST'`，`['GET', 'POST']` 这样的数组，或表示任意方法的 `'*'`。   |
| `path`    | URL 路径。可以包含参数，例如 `/users/{id}`；参见[路由教程](/tutorials/zh_CN/routing)。 |
| `handler` | 生成响应的函数。它可以返回一个值、返回一个 promise，或抛出错误。                       |

## <a name="typescript"></a> 使用 TypeScript

本节是可选的。hapi 自带 TypeScript 类型定义，因此不需要安装 `@types/hapi__hapi` 包。

Node.js 运行示例时会剥离类型，这只是删除类型，并不检查类型。要检查类型，需要安装 TypeScript 编译器和 Node.js 类型定义：

```sh
npm install --save-dev typescript @types/node
```

然后添加一个 `tsconfig.json`：

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

需要检查类型时运行 `npx tsc`。`erasableSyntaxOnly` 和 `verbatimModuleSyntax` 会拒绝 Node.js 无法剥离的 TypeScript 特性，例如 `enum`，以及没有使用 `type` 关键字的类型导入。

在上面的路由中，`request` 和 `h` 不需要类型注解：TypeScript 会根据 `server.route()` 的签名将它们推断为 hapi 的 `Request` 和 `ResponseToolkit`。只有在路由配置之外编写 handler 时才需要标注类型，使用 `@hapi/hapi` 导出的类型即可：

```ts
import type { Request, ResponseToolkit } from '@hapi/hapi';

const hello = (request: Request, h: ResponseToolkit) => {
    return 'Hello World!';
};
```

## <a name="everything"></a> 其他内容

本教程刻意保持精简。接下来可以阅读：

- [插件](/tutorials/zh_CN/plugins)：把应用拆分成可复用的模块。
- [路由](/tutorials/zh_CN/routing)：路径参数、方法和路由选项。
- [生命周期钩子](/tutorials/zh_CN/lifecycle-hooks)：在请求的每个阶段，以及服务器启动和关闭时运行代码。
- [装饰器](/tutorials/zh_CN/decorators)：为服务器、请求和响应工具包添加自定义方法。
- [响应编组](/tutorials/zh_CN/response-marshalling)：handler 的返回值如何变成 HTTP 响应。
- [测试](/tutorials/zh_CN/testing)：无需打开端口即可测试路由。

其余内容都记录在 [API 参考](/api)中。如有问题，可以在 [GitHub](https://github.com/hapijs/hapi/issues) 或 [hapi Slack](https://join.slack.com/t/hapihour/shared_invite/zt-g5ortpsk-ErlnRA2rUcPIWES21oXBOg) 上提问。
