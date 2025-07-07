# 日志

_本教程适用于 hapi v17 及以上_

## <a name="overview"></a> 总览

服务器日志重要与否，不言而喻。hapi 内置了日志功能。

## <a name="methods"></a> 内建方法

有两个几乎相同的日志方法，`server.log(tags, [data, [timestamp]]` 和 `request.log(tags, [data])`，便于随时随地调用。

### <a name="request.log"></a> request.log()

当需要在请求上下文中记录日志时，调用`request.log()`，例如路由处理函数内、请求生命周期中、鉴别时。该方法参数有二：

`tags`：日志标签，为字符串或字符串数组，例如 `['error', 'database', 'read']`。以标识事件。标签代替日志级别，事件描述更细腻。

`data`：可选，日志数据，为字符串或对象。如果 data 是函数，函数签名是 `function()`，会调用一次，获取返回值，存储数据。

例如：

```js
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        request.log('error', '事件错误');
        return 'Hello World';
    }
});
```

在这个例子中，请求路由 `/`，会触发事件，并记录。此时控制台会输出传入的 `data` 参数，即 `事件错误`。`data` 可自定义。

### <a name="server.log"></a> server.log()

`server.log()` 用于没有特定请求的上下文中，例如，服务器启动后、插件的 `register()` 方法中。其参数有三，其中 `tags` 和 `data` 与 `request.log()` 一致。参数 `timestamp` 可选，默认为 `Date.now()`，通常不建议覆盖。

```js
const Hapi = require('@hapi/hapi');
const server = Hapi.server({ port: 80 });

server.log(['test', 'error'], '事件测试');
```

## <a name="display"></a> 日志检索展示

hapi 服务器对象会发出所有日志事件。可以通过标准的 EventEmitter 接口去监听处理。


```javascript
server.events.on('log', (event, tags) => {

    if (tags.error) {
        console.log(`Server error: ${event.error ? event.error.message : 'unknown'}`);
    }
});
```

本例，调用 `server.events.on()` 来监听全部 `log` 事件。包括 `server.log()` 和 `request.log()`。

还可以用 `request.logs` 一次获取该请求所有日志。此方法返回一个数组，包含所有请求日志事件。欲用此功能，需将路由的 `log.collect` 选项设置为 `true`，否则只能返回空数组。

```javascript
server.route({
    method: 'GET',
    path: '/',
    options: {
        log: {
            collect: true
        }
    },
    handler: function (request, h) {

        return '你好';
    }
});
```

## <a name="debug"></a> 调试模式 (只针对开发)

开启调试模式，可直接显示所有日志事件到控制台，不需要额外配置或插件。

默认情况，调试模式只会输出未捕获错误、运行时错误以及 hapi 调用错误。不过，在服务器配置中配置后，调试模式可以输出标签事件。例如，要获取请求错误信息，可以如下配置：

```javascript
const server = Hapi.server({ debug: { request: ['error'] } });
```

详情请参阅 [API](/api#server.options.debug)。

## <a name="plugins"></a> 日志插件

hapi 内建的日志方法可基本满足开发需求。如果需要更多的日志功能，可以使用如 [hapi-pino](https://www.npmjs.com/package/hapi-pino)
[New Relic](https://newrelic.com/instant-observability/hapi/2124da5b-0174-457a-be5a-e0068673b2b5) 之类的[日志插件](/plugins#logging)。
