# Cookies

_本教程适用于 hapi v17 及以上_

## <a name="overview"></a> 总览

网页应用中, cookies 通常用于维持两次请求间的用户状态。hapi 中，使用 cookies 更灵活、更安全、更便捷。

## <a name="server"></a> 配置

处理 cookie，hapi 提供了诸多配置选项。默认配置已足够适用，当然也可以自定义。

### <a name="server.state"></a> server.state()

使用 cookie，要先命名并配置。可调用 `server.state(name, [options])`。其中，`name` 是 cookie 名，`options` 是配置对象。

通常，使用默认配置即可。此处为了演示，自定义配置：


```javascript
server.state('data', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: true,
    strictHeader: true
});
```

此例，命名 cookie 为 `data`，配置选项如下：

`ttl`，cookie 的生命周期，单位为毫秒。默认为 `null`，即浏览器关闭时删除。

`isSecure` 和 `isHttpOnly`，参见 [RFC 6265](http://tools.ietf.org/html/rfc6265)，特别是 [4.1.2.5](http://tools.ietf.org/html/rfc6265#section-4.1.2.5) 和 [4.1.2.6](http://tools.ietf.org/html/rfc6265#section-4.1.2.6)。

`encoding`，cookie 的值是 base64 编码的 JSON 字符串。

`clearInvalid`，当 cookie 无效时，是否清理。默认为 `false`。

`strictHeader`，是否严格检查 cookie 的值。默认为 `true`。参见 [RFC 6265](https://tools.ietf.org/html/rfc6265)。

### <a name="options.state"></a> route.options.state()

除此之外，每条路有还可单独配置。有两个属性，位于路由的 `options.state` 对象。

需注意，路由 cookie 是 `server.state` 的补充。

```json5
{
    config: {
        state: {
            parse: true,        // 解析 cookies 并储存在 request.state
            failAction: 'error' // 也可以为 'ignore' 或者 'log'
        }
    }
}
```

`parse`，是否解析 cookie。默认为 `false`。

`failAction`，解析失败时的行为。默认为 `'error'`，即返回错误。可选 `'ignore'` 或 `'log'`。

## <a name="setting"></a> 设置 cookie

cookie 设置点有三：[响应工具包](/api#response-toolkit)、前置条件（pre-requisite）、请求生命周期。

### <a name="h.state"></a> h.state()

调用[`h.state(name, value, [options]`](/api#h.state())，可设置 cookie。例：

```javascript
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        h.state('data', { firstVisit: false });
        return h.response('你好');
    }
});
```

本例，用到上节配置的 cookie。返回 `你好`，以及一个名为 `data` 的 cookie，内容为 `{ firstVisit: false }`，base64 编码的 JSON 字符串。

`state()` 方法也可用于[响应对象](/api#response-object)，方便链式调用。上面例子可以这样写：

```javascript
return h.response('你好').state('data', { firstVisit: false });
```

## <a name="override"></a> 选项重载

`server.state()` 可接收第三个可选参数，来配置 cookie。例如：

```javascript
return h.response('你好').state('data', 'test', { encoding: 'none' });
```

这个例子，仅设置 cookie 为字符串 `"test"`，不编码。

## <a name="value"></a> cookie 获取

用 `request.state` 来获取 cookie。有三处位置：路由处理函数、预处理、请求生命周期。

`request.state` 对象包含解析的 HTTP 状态。键为 cookie 名，值为内容。

示例代码用到了上面的 `data` cookie，其中的值是 `{ firstVisit: false }`：

```javascript
const value = request.state.data;
// console.log(value) 会收到 { firstVisit : false }
```

## <a name="clear"></a> cookie 清除
欲清除 cookie，可调用 `unstate()`，此方法见[响应工具包](/api#response-toolkit) 或 [响应对象](/api#response-object)：

```javascript
return h.response('再会').unstate('data');
```

此处，将 cookie 名传给 `unstate()`，就可以清除 cookie。

