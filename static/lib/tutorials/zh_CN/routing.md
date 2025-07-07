# 路由

_本教程适用于 hapi v17 及以上_

## <a name="overview"></a> 总览

hapi 路由三要素: method、path、handler。将其组合成对象传给服务器，如下:

```javascript
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        return 'Hello World!';
    }
});
```

## <a name="methods"></a> 方法（Methods）

上面代码，发送 `GET` 请求到路由 `/`，返回 `Hello World!`。 `method` 是有效的 HTTP 方法或者方法数组。若需要发送 `PUT` 或`POST` 请求，修改如下：

```javascript
server.route({
    method: ['PUT', 'POST'],
    path: '/',
    handler: function (request, h) {

        return 'I did something!';
    }
});
```

##  <a name="path"></a> 路径（Path）

选项 `path` 必须为字符串。同时可包含命名参数。需命名参数，用 `{}` 括住，例如：

```javascript
server.route({
    method: 'GET',
    path: '/hello/{user}',
    handler: function (request, h) {

        return `Hello ${request.params.user}!`;
    }
});
```

注：用户输入，如查询参数，最好先行转义或确认，可避免 XSS 攻击。可以用 [Hoek](/module/hoek) 的 `escapeHtml()` 方法：

```js
return `Hello ${Hoek.escapeHtml(request.params.user)}!`
```

如上所示，在路径中用到了字符串 `{user}`，此时会生成明明参数。这个参数可 `request.params` 对象中获取，即，`request.params.user`，而后，再 URI 编码，这可以防范内容注入攻击。访问路由 `/hello/john`，返回 `Hello john!`。

## <a name="optionalParameters"></a> 可选命名参数

上面示例中，`user` 参数必传，比如请求 `/hello/bob` 或 `/hello/susan`。但不能请求如 `/hello` 这样的。欲使命名参数可选，只需在其后添加问号。同上边路由，将参数可选：

```javascript
server.route({
    method: 'GET',
    path: '/hello/{user?}',
    handler: function (request, h) {

        const user = request.params.user ? request.params.user : 'stranger';

        return `Hello ${user}!`;
    }
});
```

现在请求 `/hello/mary`，会返回 `Hello mary!`，而请求 `/hello` 则返回 `Hello stranger!`。需注意，在路径中只有 **最后** 一个命名参数可以为可选的。换言之，路径 `/{one?}/{two}/` 无效，因为在可选参数后有另一个命名参数。命名参数也可以是路径的一部分，例如 `/{filename}.jpg`。也可以每一段指定多个命名参数，但相邻命名参数间要有分隔符。比如 `/{filename}.{ext}` 有效，而 `/{filename}{ext}` 无效。

## <a name="multiParameters"></a> 多段命名参数

命名参数不仅可选，还可以让其匹配多段内容。加以星号和数字即可。例如：

```js
server.route({
    method: 'GET',
    path: '/hello/{user*2}',
    handler: function (request, h) {

        const userParts = request.params.user.split('/');

        return `Hello ${userParts[0]} ${userParts[1]}!`;
    }
});
```

此时, 请求 `/hello/john/doe`，会返回字符串 `Hello john doe!`。注意看，这里参数是字符串 `"john/doe"`. 所以要用 `split` 分割来获取其内容。星号后的数字表示应截取几段路径，分配给命名。数字也可以省略，此时匹配后面所有路径。带通配符参数（如 `/{files*}`）只能在路径最后，这点与可选参数一样。

处理请求时，路径越具体，越优先匹配。比如，有路径 `/filename.jpg` 和 `/filename.{ext}`。当请求 `/filename.jpg`，会匹配到第一个。也就是说，路径参数为 `/{files*}` 时，只有所有路由匹配失败，才会走此路有。

## <a name="query"></a> 查询参数（Query Parameters）

查询参数很常见。在 URL 中以 `key=value` 格式传送。如：

`localhost:3000?name=panda&location=chengdu`

此处有两个查询参数，`name=panda`，`location=chengdu`。在 hapi中，可以用 `request.query` 对象获取查询参数。

```js
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        return `Hello ${request.query.name}!`;
    }
});
```

上述代码，获取查询参数 `name`，并返回 `Hello panda!`。

如果查询结构复杂，可用 `qs` 模块。思考如下代码：

```js
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        return request.query;
    }
});
```

请求 `localhost:3000?foo[bar]=baz`，hapi 默认会返回 `{ "foo[bar]"。"baz" }`。 

要正确解析，请用 [qs](https://github.com/ljharb/qs) 模块。例：

```js
const Hapi = require('@hapi/hapi');
const Qs = require('qs');

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    query: {
        parser: (query) => Qs.parse(query)
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        return request.query;
    }
});

const init = async () => {

    await server.start();
    console.log('服务器运行于 %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
```

首先，导入 [qs](https://github.com/ljharb/qs)。

而后，设置 `server.options.query.parser` 值，配置查询参数解析方法。本例使用 `Qs.parse()`，其中 `query` 即 `request.query`。现在，所有 `request.query` 都会用 `Qs.parse()` 解析一遍。

最后，返回解析后的查询字符串：

```
{
    "foo": {
        "bar": "baz"
    }
}
```

注：上面例子中，用到了 [qs](https://github.com/ljharb/qs) 模块，其实别的解析器也行，或`npm` 上找，或自定义。只要注意方法必须返回一个对象，每个键是一个参数，匹配的值是参数值。

## <a name="requestpayload"></a> 请求负载（Request Payload）

接口的请求数据，可以从路由处理程序中的 `request.payload` 处获得。如下：

```js
server.route({
    method: 'POST',
    path: '/signup',
    handler: function (request, h) {

        const payload = request.payload;

        return `Welcome ${payload.username}!`;
    }
});
```

在上面的例子中，用 `request.payload` 获取数据。比如获取用户注册数据：

`{ username: 'panda', password: 'bamboo' }`

注：负载建议提前确认，以确保安全。更多信息请参见确认教程。

## <a name="handler"></a> 路由处理方法（Handler）

路由处理方法（Handler）参数有二：`request`、`h`。

参数 `request` 是个对象，包含用户请求详情，例如路由[参数](#parameters)、[请求负载](#requestpayload), [查询参数](#query)、鉴别信息、请求头信息等。关于 `request` 对象具体信息请查阅[相关接口](/api#request-properties)。

第二个参数 `h` 是响应工具包，便于处理响应。如同前述，假若需要响应请求, 可直接在 `handler` 内返回之。其内容可以是字符串、缓冲区（buffer）、JSON 对象, 流（stream）、期约（promise）。

另外，上述返回值，也可以传递给 `h.response(value)`，此方法调用的返回值是一个响应对象, 可以在响应发出前，链式调用以改变响应。例如 `h.response('created').code(201)`，这句会返回 `created`，并改 HTTP 状态码为 `201`。在其中，还可以设置响应头（headers）、内容类型（content type）、内容长度（content length）、重定向等等。更多内容，参见[接口文档](/api#response-toolkit)。

需要强调，方法 `handler` 必须有返回值，期约（promise），错误（error）皆可。

注：处理方法（handle）写成箭头函数，因箭头函数没有自己的 `this`，无法获取 `server.bind()` 属性。但，绑定的上下文可在[`h.context`](/api#h.context) 内访问。

##  <a name="options"></a> 选项（Options）

上述三个要素之外, 路由也可指定 `options` 参数。此参数可配置 [数据确认](/tutorials/validation)，[鉴别](/tutorials/auth)、预处理、负载处理、缓存配置登。详情请参阅[相关文档](/api#route-options)。

以下实例，为路由添加确认：

```javascript
server.route({
    method: 'POST',
    path: '/signup',
    handler: function (request, h) {

        const payload = request.payload;

        return `Welcome ${payload.username}!`;
    },
    options: {
        auth: false,
        validate: {
            payload: {
                username: Joi.string().min(1).max(20),
                password: Joi.string().min(7)
            }
        }
    }
});
```

`options` 下的第一个属性是 `auth`。`auth` 用来设置路由鉴别。因这是注册路由，故而禁用鉴别。

第二个属性是 `validate`。此处配置各种确认规则，如确认 `请求头（headers）`、`参数（params）`、`负载（payload）`，还可配置确认失败处理方法：`failAction`。欲确认 `request.payload`，可使用[joi](https://joi.dev)。详情请查看确认教程。

## <a name="missing"></a> 处理 404（404 Handling）

发请求时，服务器找不到资源，会返回 404 错误。建议以适当的方式处理这些错误。这在 hapi 中很容易处理，只需配置一个路由，就可以捕捉一些未匹配路由。如何配置路由来返回自定义的 `404` 响应，请看例子：

```js
'use strict';

const Hapi = require('@hapi/hapi');

const internals = {};

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: '*',
        path: '/{any*}',
        handler: function (request, h) {

            return '错误 404！未找到！';
        }
    });

    await server.start();
    console.log('服务器启动用 %s', server.info.uri);
};

init();
```

首先，配置服务器。

接着，配置路由，返回自定义 404 响应。此处用通配符 `*`，来匹配所有请求方法。而后，路径写成 `'/{any*}`，广泛且通用。hapi 路由匹配规则是，从具体到模糊，直到匹配到本路由。例如，`localhost:3000/login`将进入 `/login` 路由，而不是`/{any*}`路由。

最后，在处理函数中返回自定义的 404 响应，以让用户知道所请求资源没找到。
