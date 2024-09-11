# 测试

_本教程适用于 hapi v17 及以上_

## <a name="overview"></a> 总览

Hapi 设计理念是创建健壮的、可测试的应用。为此，无需真启动 Hapi 服务器，也可测试路由，没有了 TCP 协议连接开销，降低了复杂度。

此教程演示路由测试的基本设置，并概述测试套件 [lab](/module/lab) 和 [code](/module/code)。

## <a name="lab"></a> lab

`lab` 是个简单测试套件。与其他测试套件不同，lab 不仅有 async/await 特性，而且内置了诸多测试 Node.js 所需工具。`lab` 兼容其他断言库，在条件不符合时抛出错误。本教程中，使用 `code` 断言库。

在终端执行以下命令以安装 `lab`：

`npm install --save-dev @hapi/lab`

## <a name="code"></a> code

`code` 断言库出自于 `chai`，小巧、简单、直观。可以直接运行，无需额外插件或扩展，开销很小。

安装 `code`：

`npm install --save-dev @hapi/code`

## <a name="server"></a> 服务器设置

以快速入门教程中的代码为例。小小修改一下，以在测试时，不自动启动服务。可以将此文件保存为 `server.js`，放在项目 `lib` 目录下：

```js
'use strict';

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/',
  handler: function () {

      return 'Hello World!';
  }
});

exports.init = async () => {

    await server.initialize();
    return server;
};

exports.start = async () => {

    await server.start();
    console.log(`服务器运行于： ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});
```
导出两个函数：`init()`、`start()`，不直接调用，以在其他文件中初始化、启动服务。函数 `init()` 用来初始化服务器，开启缓存，完成插件注册，但并未启动服务。测试用例中用到此函数。函数 `start()` 会真启动服务。这个函数要在入口文件中调用：

```js
`use strict`;

const { start } = require('lib/server');

start();
```
正常启动服务时，调用 `start` 函数，会对外暴露 HTTP 端口。在测试用例中，不需要真启动服务，只需初始化服务即可。因此，调用 `init` 函数，而不是 `start` 函数。

## <a name="writingTest"></a> 路由测试

这个例子用到的 [lab](/module/lab)，可以推广应用到其他测试工具，例如 [Mocha](https://mochajs.org/)、[Jest](https://jestjs.io/)、[Tap](https://www.node-tap.org/)、[Ava](https://github.com/avajs) 等。

默认, `lab` 加载本立目录 `test`，及其中 '*.js'，而后执行测试用例。如果想自定义文件夹或者文件，可参数传入路径：

`$  lab unit.js`

测试前，在 `test` 目录里，创建文件 `example.test.js`：

```js
'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../lib/server');

describe('GET /', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/'
        });
        expect(res.statusCode).to.equal(200);
    });
});
```
此处测试 `'GET'` 请求，看是否会响应状态码 `200`。首先调用 `describe()`，`describe()` 接收 2 个参数, 一个是测试用例描述， 一个是测试用例方法。

请注意，启动服务用 `init`，而不是 `start`。以启动服务器，而不监听端口。每次测试后，调用 `stop` 来清理并停止服务。

函数 `it()` 用来执行测试用例。`it()` 接受 2 个参数，一个是测试用例通过的描述语句，一个是运行测试用例的函数。

例子中用到了 `inject`。`inject` 用到了 [Shot](/module/shot)，直接将请求注入到路由处理方法，这就是不启动服务而能够测试的关键所在。

要运行测试，可以修改项目中的 `package.json`：

```json
  "scripts": {
    "test": "lab -v **/*.test.js"
  }
```
