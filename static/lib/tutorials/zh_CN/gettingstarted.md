# 快速入门

_本教程适用于 hapi v17 及以上_

## <a name="overview"></a> 总览

本教程演示搭建一个基础的 hapi 服务器，并在浏览器中显示 "Hello World！"。

## <a name="installing"></a> 安装

新建目录 `myproject`:

* 运行: `cd myproject`，跳转到目录内。
* 运行: `npm init`，根据提示生成文件 package.json。
* 运行: `npm install @hapi/hapi`，安装 hapi，并将相应的依赖并保存至 package.json。

## <a name="server"></a> 创建服务器

最基本的 hapi 服务器代码如下:

```javascript
'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.start();
    console.log('服务器运行于 %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
```

首先引入 hapi，初始化 `Hapi.server()`，传入要监听的端口号（port）和地址（host），启动服务，会在终端打印运行信息。

其中，端口号可以为以下值：主机名、IP 地址、Unix socket 文件、Windows 命名管道。更多细节，见 [API](/api/#-serveroptionsport)。

安全起见，`host` 属性通常设置为 `localhost`。但在 docker 容器中，`localhost` 可能无法在容器外访问，此时需要设置为 `host: '0.0.0.0'`。

## <a name="routes"></a> 添加路由

服务器启动后，添加一个路由，以在浏览器中显示 "Hello World！"。

```javascript
'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    await server.start();
    console.log('服务器运行于 %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
```

将以上代码保存至 `server.js`，执行 `node server.js` 启动服务器。在浏览器中访问 [http://localhost:3000](http://localhost:3000), 可看到 `Hello, world!`。

属性 `method` 为有效的 HTTP 方法或方法数组，又可为 `*`，以通配所有方法。

属性 `path` 为路径，可附参数。其参数可为：可选参数、多段参数、`*` 通配符参数。更多细节，参见 [路由教程](/tutorials/routing)。

方法 `handler` 处理请求和响应。其要么返回一个普通值或期约（promise），要么抛出错误。

### <a name="everything"></a> 其他

hapi 功能众多，本例只演示了冰山一角。强烈建议阅览插件教程，从中可以了解更多，以更好组织 hapi 项目。此外，本教程还提供了诸多例子，可在左侧列表查阅。其余内容请参阅 [API reference](/api)。 欢迎在 [github](https://github.com/hapijs/hapi/issues) 提问，或者在 [slack](https://join.slack.com/t/hapihour/shared_invite/zt-g5ortpsk-ErlnRA2rUcPIWES21oXBOg) 找到我们。
