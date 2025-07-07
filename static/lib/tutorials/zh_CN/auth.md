# 鉴别（Authentication）

_本教程适用于 hapi v17 及以上_

## <a name="overview"></a> 总览

现在网页应用，大多都会用到鉴别（Authentication）。hapi 的鉴别有两个概念：`计划（schemes）`、`策略（strategies）`。`计划`乃 hapi 中的一种鉴别方式。例如，`@hapi/basic`、`@hapi/cookie`。`策略`是`计划`的实例，预先配置并且命名。

## <a name="schemes"></a> 计划（Schemes）

`计划` 是个方法，其签名为 `function (server, options)`。参数 `server` 服务器对象的引用，参数 `options` 是该计划的配置项。

此方法返回对象，必须带有属性方法 `authenticate`。剩余属性可选，如 `payload` 和 `response`。

`计划`可自定义，或者使用 hapi 提供的插件。如 `@hapi/basic`、`@hapi/cookie`。

### <a name="authenticate"></a> 属性方法 `authenticate`

方法 `authenticate` 签名为 `function (request, h)`, 必选。

其中，参数 `request` 为服务器创建的 `request` 对象。这个对象与路由处理函数中的相同，详情请参阅 [API](/api#request-object)。

参数 `h` 是 hapi 的[响应工具包](https://hapijs.com/api#response-toolkit).

当鉴别成功时, 该方法必须返回 `h.authenticated({ credentials, artifacts })`。两属性皆是对象。其中，属性 `credentials` 用以存用户鉴别数据，或用户凭证（credentials）。属性 `artifacts` 用以存其他鉴别信息。

返回的两属性 `credentials` 和 `artifacts`，存于对象 `request.auth`，可随时访问（如路由处理函数）。

若鉴别失败, 可抛出错误或返回 `h.unauthenticated(error, [data])`。此处，参数 `error` 是鉴别错误，参数 `data` 是个可选对象，其包含 `credentials`、`artifacts`。如果自定义抛出错误且没提供 `data` 对象，这与直接调用 `return h.unauthenticated(error)` 一样。所传错误会影响后续行为。详情参见 [`server.auth.scheme(name, scheme)`](/api#server.auth.scheme())。此外，处理错误，推荐使用 [boom](/module/boom)。

### <a name="payload"></a> 属性方法 payload

方法 `payload` 签名为 `function (request, h)`。

同样，方法提供 hapi 响应工具包。处理错误，再次建议使用 [boom](/module/boom)。

鉴别成功，请返回 `h.continue`。

### <a name="response"></a> 属性方法 response

方法 `response` 签名为 `function (request, h)`，也提供 hapi 响应工具包。

响应发送之前，此方法可装饰响应对象 (`request.response`)，为其添加头信息。

包装毕，必须返回 `h.continue`, 以发送响应。

处理错误，仍建议用 [boom](/module/boom)。

## <a name="strategies"></a> 策略（Strategies）

`计划`注册后，如何使用。这就要靠`策略（Strategies）`了。

如上所述，`策略（Strategies）`其实`计划（scheme）`实例的拷贝。

欲注册`策略（Strategies）`，需先注册`计划（scheme）`。而后，调用 `server.auth.strategy(name, scheme, [options])` 来注册`策略（Strategies）`。

参数 `name` 为字符串，必填，用以标识`策略（Strategies）`。参数 `scheme` 也是字符串，必填，是`计划（scheme）`名。参数 `options` 为对象，可选，是`计划（scheme）`配置项。

```js
server.auth.strategy('session', 'cookie', {
    name: 'sid-example',
    password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
    isSecure: false
});
```

上述例子，注册了一个`策略（Strategies）`，名为 `session` ，其`计划（scheme）`用 `cookie`。并配置`策略（Strategies）`，给其 `name`、`password`、`isSecure`。

### <a name="default"></a> 默认策略（Default Strategies）

用 `server.auth.default()` 来设置默认`策略（Strategies）`。

此方法接受一个参数, 可传`策略（Strategies）`名，可传对象，其格式与[路由鉴别选项](#route-configuration) 同。

需注意，所有路由都会使用默认`策略（Strategies）`，即使路由添加在 `server.auth.strategy()` 前。

## <a name="route"></a> 路由配置（Route Configuration）

鉴别（Authentication）亦可配置于路由，在 `options.auth`。设置为 `false` 即在该路由上停用鉴别。

其值可为`策略（Strategies）`名，或对象，改对象属性如右：`mode`、`strategies`、`payload`。

参数 `mode` 可为 `'required'`、`'optional'`、`'try'`。此三者与注册`策略（Strategies）`时同。

如果 `mode` 为 `'required'`，访问路由时，必须鉴别用户，且鉴别必须通过，否则报错。

如果 `mode` 为 `'optional'`, 路由仍会使用这个策略。不过**无需**鉴别用户。但若提供了鉴别信息，则必须是有效的。

`mode` 也可为 `'try'`。`'try'` 与 `'optional'` 的区别在于，使用 `try` 鉴别失败，依然会进入路由处理程序。

当只需一个策略，可以设置属性 `strategy` 为策略名。如果需要多个, 必须使用属性 `strategies`，其值为策略名数组。这些策略会被依次执行，直到有第一个成功, 或者全部失败。

最后，参数 `payload` 设为 `false`，表示不鉴别荷载。如果设为 `'required'` 或 `true`，则**必须**鉴别。如果设为 `'optional'`，则若客户端带有鉴别信息，这些信息必须有效。

策略方法支持 `payload` 时，`payload`生效。
