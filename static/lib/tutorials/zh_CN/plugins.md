# 插件

_本教程适用于 hapi v17 及以上_

## <a name="overview"></a> 总览

hapi 插件系统格外强大，可以方便地将应用分割为独立的业务逻辑，或者可重用工具。你可以添加现有插件，或自建插件。

## <a name="create"></a> 创建

插件很好写，其核心是一个对象，带有 `register` 属性。`register` 属性值是一个函数，其签名为 `async function (server, options)`。 此外，插件必须有 `name` 属性，还有诸多可选属性，如 `version`。

例:

```javascript
'use strict';

const myPlugin = {
    name: 'myPlugin',
    version: '1.0.0',
    register: async function (server, options) {

        // 创建路由以为示例

        server.route({
            method: 'GET',
            path: '/test',
            handler: function (request, h) {

                return 'hello, world';
            }
        });

        // 诸如此类 ...
        await someAsyncMethods();
    }
};
```

注册此插件，访问路由 `/test`，显示 `'hello, world'`。

当是外部模块时, 需要指定 `pkg` 属性:

```javascript
'use strict';

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        // 创建路由以为示例

        server.route({
            method: 'GET',
            path: '/test',
            handler: function (request, h) {

                return 'hello, world';
            }
        });

        // 诸如此类...
        await someAsyncMethods();
    }
};
```

请注意，第一个例子中，明确了属性 `name` 和 `version`。在第二个例子中，将 package.json 中的内容赋给属性 `pkg`。两种方法都行。

当编写为模块, 插件可以当作默认模块导出，如 `module.exports = { register, name, version }`。如果希望你导出多个插件，可以 `exports.plugin = { register, name, version }`。

此外，当插件属性 `multiple` 设为 `true`，表明当前服务器内，该插件可以重复注册。

另一个可用属性是 `once`，当设置为 `true`，仅注册一次，hapi 会忽略之后的注册，且也不会抛出错误。

###  <a name="register"></a> 注册方法

综上所述，方法 `register` 参数有二：`server`、`options`。

`register` 是个异步函数，插件注册完成即返回。函数内应当处理注册错误。

参数 `server` 为当前服务器对象。

参数 `options` 为插件配置对项。在调用 `server.register(plugins, [options])` 时传递给插件。该对象直接传递给的 `register` 方法。例：

```javascript
'use strict';

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        // 创建路由以为示例

        server.route({
            method: 'GET',
            path: '/test',
            handler: function (request, h) {

                const name = options.name;
                return `你好 ${name}`;
            }
        });

        // 诸如此类...
        await someAsyncMethods();
    }
};
```

此处， `options.name` 获取名字。而后用这个名字来返回消息给用户。来看看插件注册时：

```javascript
const start = async function () {

    await server.register({
        plugin: require('myplugin'),
        options: {
            name: '张三'
        }
    });
};
```

注册插件时，传递选项可以用 `server.register(plugins, [options])`。这里把 `{name: "张三" }` 传给插件，如上述，创建插件时，可以用 `options` 对象来获取。

## <a name="loading"></a> 插件加载

插件可以单独载入，也可以按数组载入，用到方法 `server.register()`。例如：

```javascript
const start = async function () {

    // 载入单插件

    await server.register(require('myplugin'));

    // 载入多插件

    await server.register([require('myplugin'), require('yourplugin')]);
};
```

要给插件传选项，改用对象注册，属性有 `plugin` 和 `options`，例如：

```javascript
const start = async function () {

    await server.register({
        plugin: require('myplugin'),
        options: {
            message: '你好'
        }
    });
};
```

数组对象方式:

```javascript
const start = async function () {

    await server.register([{
        plugin: require('plugin1'),
        options: {}
    }, {
        plugin: require('plugin2'),
        options: {}
    }]);
};
```

###  <a name="registration"></a> 注册选项

`server.register()` 第二个参数，可选。参见 [API](/api#server.register() 。

该选项 hapi 自用，**不会** 传给插件。比如将 `vhost` 或 `prefix` 属性添加到使用插件的路由上。

例:

```javascript
'use strict';

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        server.route({
            method: 'GET',
            path: '/test',
            handler: function (request, h) {

                return 'test passed';
            }
        });

        // 其他...
        await someAsyncMethods();
    }
};
```

通常，加载此插件，会创建 `GET` 路由 `/test`。添加选项 `prefix` 来修改这个插件生成的路由。

```javascript
const start = async function () {

    const server = Hapi.server();

    await server.register(require('myplugin'), {
        routes: {
            prefix: '/plugins'
        }
    });
};
```

现在，因为修改了 `prefix`，加载插件，`GET` 路由注册为 `/plugins/test`.

与之类似，修改 `options.routes.vhost` 属性，将为所有使用插件创建的路由分配默认的 `vhost` 配置。更多关于 `vhost` 的配置信息参见[API](/api#server.route())。
