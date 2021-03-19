# Testing

此教程兼容hapi v17以及更高版本.

## <a name="overview"></a> Overview

Hapi设计理念是创建健壮的、可测试的应用.为此,Hapi具备不用启动服务就可以测试路由的功能, 减少了TCP协议连接的时间成本,降低了复杂度.

此教程带你进行路由测试的基本设置, 并提出了一种通过[lab](/module/lab)和[code](/module/code)创建可测试应用的一种可能.


## <a name="lab"></a> lab

`lab` 是Node.js的一个简单的测试套件. 区别于其他测试套件, lab 只使用 async/await 特性,并且包含了所有你在现代化Node.js测试套件里所需要的工具. `lab` 可以和任何其他的断言库兼容,在条件不符合时候掏出错误. 在本教程中,你将使用 `code` 断言库.

首先安装 `lab`, 在terminal里面输入:

`npm install --save-dev @hapi/lab`

## <a name="code"></a> code

`code` 建立在 `chai` 断言库基础上,被设计成小巧,简单且直观的断言库. 可以不通需要任何插件,拓展库直接运行,并且开销很小.

然后安装 `code`, 在terminal里输入:

`npm install --save-dev @hapi/code`

## <a name="server"></a> Server Setup

从Getting Started教程中拿到例子的服务代码, 我们对它进行一下小修改, 比如让它在被我们的测试用例引用的时候不自动重启服务. 你可以把这个文件保存为`server.js`,然后放在工程的 `lib`目录下:

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
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});
```
现在用导出 `init()` 和 `start()`方法代替原来的调用这两个方法. 这样我们可以在别的文件中来初始化、启动服务. `init()` 方法可以初始化 (开启缓存, 完成插件注册) 但是并未启动服务. 接下来要在测试用例中启动服务. `start()` 会自动启动服务. 我们将要在入口文件中调用:

```js
`use strict`;

const { start } = require('lib/server');

start();
```
你在这里创建的,是通常启动服务时候使用的,在入口文件通过调用start方法来启动服务的一种方式, 这种方式对外暴露出一个外部HTTP端口, 此外你也可以在我们的测试用例中使用一个什么都不做的模块.

## <a name="writingTest"></a> Writing a Route Test

在这个例子中你将使用 [lab](/module/lab), 同样的方法也可以在任何测试工具中使用,例如 [Mocha](https://mochajs.org/), [Jest](https://jestjs.io/), [Tap](https://www.node-tap.org/), [Ava](https://github.com/avajs) 等.

默认情况下, `lab` 加载所有文件'*.js' 在本地的 `test` 目录里,并执行所有发现的测试用例. 如果想设置其他的文件夹或者文件, 需要将文件或者文件夹路径作为参数传入:

`$  lab unit.js`

准备开始,创建一个 `example.test.js` 在 `test` 目录里:

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
这里你将要测试我们的 `'GET'` 路由是否会响应 `200` 状态码. 首先调用 `describe()` 来给你的测试用例提供一个构造函数. `describe()` 接受2个参数, 一个是测试用例的描述, 另一个是设置测试用例的方法.  

请注意 `init` 代替 `start` 来设置服务, 意味着我们启动了服务, 但是没有监听任何端口. 每个测试用例后都会调用 `stop` 来清理和停止服务.

`it()` 方法将会运行你的测试用例. `it()` 接受2个参数, 一个是测试用例通过的描述语句, 另一个是运行测试用例的方法. 

你需要了解服务器上的 `inject`. `inject` 使用 [Shot](/module/shot) 来 `inject` 直接向hapi的hanlder注入请求. 这就是让我们能够测试HTTP方法的关键所在.

为了让我们的测试用例运行, 你可以修改项目中的 `package.json` 来测试你的测试用例:

```json
  "scripts": {
    "test": "lab -v **/*.test.js"
  }
```
