# 静态内容

_本教程适用于 hapi v17 及以上_

## <a name="overview"></a> 总览

构建网络应用时，经常要从磁盘获取静态文件。处理这些静态文件，hapi 插件可以胜任，比如 [inert](/module/inert)。

首先安装 inert，并导入:

`npm install @hapi/inert`

## <a name="inert"></a> Inert

插件 `inert` 有一些处理方法，为静态文件和目录提供服务，并在工具包（`h`）中增加了方法 `h.file()`，其可以响应文件资源。

## <a name="path"></a> 相对路径

可以配置文件相对路径，来简化后续操作：

```javascript
'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const start = async () => {

    const server = Hapi.server({
        routes: {
            files: {
                // 配置相对路径
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/picture.jpg',
        handler: function (request, h) {

            return h.file('picture.jpg');
        }
    });

    await server.start();

    console.log('服务器运行于：', server.info.uri);
};

start();
```

如上所述，在`server.options.routes` 配置好后，相对路径会应用于**全部**路由。当然，也可以在某条路由上单独配置。

## <a name="hfile"></a> `h.file(path, [options])`


```javascript
const start = async () => {

    const server = Hapi.server();

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/picture.jpg',
        handler: function (request, h) {

            return h.file('/path/to/picture.jpg');
        }
    });

    await server.start();

    console.log('服务器运行于：', server.info.uri);
};

start();
```

注册了 `inert` 插件，就可以访问 `h.file()` 方法。在这里，`h.file()` 要返回的图片路径是 `'/path/to/picture.jpg`。

## <a name="filehandler"></a> 文件处理（File handler）

另一种方法在 `handler` 里配置属性 `file` ：

```javascript
server.route({
    method: 'GET',
    path: '/picture.jpg',
    handler: {
        file: 'picture.jpg'
    }
});
```

### <a name="fileoptions"></a> 文件选项

`file` 可以为方法，其接收 `request` 对象，并返回文件路径字符串：

```javascript
server.route({
    method: 'GET',
    path: '/{filename}',
    handler: {
        file: function (request) {
            return request.params.filename;
        }
    }
});
```

也可以是对象，有 `path` 属性。用对象可以设置 `Content-Disposition` 并压缩文件。如下：

```javascript
server.route({
    method: 'GET',
    path: '/script.js',
    handler: {
        file: {
            path: 'script.js',
            filename: 'client.js', // 覆盖 Content-Disposition 头中的文件名
            mode: 'attachment', // 指定 Content-Disposition 是一个附件
            lookupCompressed: true // 如果请求允许，查找 script.js.gz
        }
    }
});
```

##  <a name="directoryhandler"></a> 目录处理

inert 除了处理文件，也可以配置属性 `directory` 以处理目录。要使其生效，必须指定路径。路由地址无关紧要，也可以使用星号。基本用法如下:

```javascript
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
});
```

### <a name="directoryoptions"></a> 目录选项

上述路由可以匹配所有请求，并在 `public` 目录内寻找文件。这里需要注意，如果请求对 `/`，用这个配置会响应 HTTP `403`。要解决此问题，就要添加索引文件。默认，hapi 会在目录中搜索文件 `index.html`。设置选项 index 选项为 `false`，可禁止提供索引文件，或者指定索引文件数组:

```javascript
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            index: ['index.html', 'default.html']
        }
    }
});
```

且看这个配置，请求 `/`，首先尝试去加载 `/index.html`, 之后再加载 `/default.html`。当没有可用的索引文件时, inert 会显示这个目录为列表页。可以设置属性 `listing` 为 `true` 来开启，如:

```javascript
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: true
        }
    }
});
```
现在，请求 `/`，会明确返回带目录内容的网页。开启目录显示后，默认不显示隐藏文件，可以将 `showHidden` 选项设置为 `true` 来显示。与处理文件一样，目录处理也有一个 `lookupCompressed` 选项，用于预压缩文件。还可以设置默认扩展名 `defaultExtension`，意思是若找不到原始路径，将其附加到请求中。比如请求 `/bacon` 也会尝试请求 `/bacon.html`。

## <a name="fileserver"></a> 静态文件服务器

要提供静态内容，通常会建立文件服务器。在hapi中启用文件服务器：

```js
const Path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');

const init = async () => {

    const server = new Hapi.Server({
        port: 3000,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true
            }
        }
    });

    await server.start();

    console.log('服务器运行于', server.info.uri);
};

init();
```

首先，引入 `inert` 和 `path`。这是必备项。

接下来，配置 `server.options.rouse`。可以设置 `relativeTo` 指定文件目录。

配置好后，注册 `inert` 插件。以加载目录处理程序。在 `directory` 中，配置 `path`，这项必填。第二个选项是 `redirectToSlash`。设置为 `true`，意思是，若路由末尾没有斜杠，则加之。
