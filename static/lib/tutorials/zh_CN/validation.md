# 确认

_本教程适用于 hapi v17 及以上、joi v16 及以上_

## <a name="overview"></a> 总览

数据确认，乃应用安全稳定之关键。hapi 确认数据，用到 [Joi](https://joi.dev)。这个模块语法十分简单明了。

## <a name="joi"></a> Joi

[Joi](https://joi.dev)，用对象描述确认信息。先安装：

`npm install joi`

再引入：

`const Joi = require('joi');`

## <a name="input"></a> 输入确认

输入确认，在路由的 `options` 中定义，具体位置是 `route.options.validate`。其可以验证 HTTP 头信息、路由参数、查询参数、请求负载。`validate` 默认值为：

```js
{
  headers: true,
  params: true,
  query: true,
  payload: true,
  state: true,
  failAction: 'error'
}
```

如果某个键为 `true`，则不确认。键也可以为方法，方法签名为 `async function(value, options)`，或者 `joi` 对象，joi 也可以配置。下面例子是[查询参数](#queryparams)的一部分：

```js
options: {
    validate: {
        query: Joi.object({
            limit: Joi.number().integer().min(1).max(100).default(10)
        }).options({ stripUnknown: true });
    }
}
```

具体配置，请看[这儿](https://joi.dev)。

### <a name="pathparams"></a> 路由参数

例：

```javascript
server.route({
    method: 'GET',
    path: '/hello/{name}',
    handler: function (request, h) {

        return `Hello ${request.params.name}!`;
    },
    options: {
        validate: {
            params: Joi.object({
                name: Joi.string().min(3).max(10)
            })
        }
    }
});
```

例子中，在 `option` 对象里添加 `validate.params`，以指定那些命名参数应当确认。 Joi 语法非常简洁易懂，上述代码确认参数应为字符串，其最小长度为 3，最大长度为 10。

配置好后，请求 `/hello/panda`，会如期返回 `Hello panda!`。而请求 `/hello/a`，则会得到如下 HTTP `400` 响应错误：

```json
{
    "error": "Bad Request",
    "message": "Invalid request params input",
    "statusCode": 400
}
```

同样，请求 `/hello/thisnameiswaytoolong`，也会得到如上错误。

### <a name="queryparams"></a> 查询参数

确认查询参数，只需要在路由选项中配置 `validate.query`。一旦配置，**必须**为所有所需的查询参数添加确认。

例如，一个路由返回博客列表，且限制请求条量，可以如下配置：

```javascript
server.route({
    method: 'GET',
    path: '/posts',
    handler: function (request, h) {

        return posts.slice(0, request.query.limit);
    },
    options: {
        validate: {
            query: {
                limit: Joi.number().integer().min(1).max(100).default(10)
            }
        }
    }
});
```

这里 `limit` 查询参数会限制在 1 与 100 之间，如果没有指定这个参数，则默认为 10。当请求 `/posts?limit=15&offset=15`，会响应 HTTP `400` 错误。

之所以这样，是因为 `offset` 参数没有配置确认信息。

### <a name="payloadparams"></a> 负载参数

设置 `validate.payload` 选项，来确认负载。其格式与查询参数完全相同，如果要确认一个键，则必须确认所有键。例：

```js
server.route({
    method: 'POST',
    path: '/post',
    handler: function (request, h) {

        return '添加成功';
    },
    options: {
        validate: {
            payload: Joi.object({
                post: Joi.string().min(1).max(140),
                date: Joi.date().required()
            })
        }
    }
});
```

上面的例子是一个非常基本的路由，处理传入博客文章。用户在 `request.payload` 对象中提交了博客文章和日期。通常，这鞋数据会存储到数据库。但存之前，必须确认负载。首先，`joi` 规定 `post` 必须最小 1 个字符，最大 140 个字符。还规定，`date` 必须是 MM-DD-YYY 格式的有效日期，并且必填。

确认失败，则返回：

```json
{
    "error": "Bad Request",
    "message": "Invalid request payload input",
    "statusCode": 400
}
```

### <a name="headers"></a> 请求头

用 `validate.headers` 来验证 HTTP 头：

```js
server.route({
    method: 'GET',
    path:'/hello/{name}',
    handler: (request, h) => {

       return  `Hello ${request.params.name}!`;
    },
    options: {
        validate: {
            headers: Joi.object({
                cookie: Joi.string().required()
            }),
            options: {
                allowUnknown: true
            }
        }
    }
});
```

此处验证 cookie，必须为字符串，且必填。`allowUnknown` 表示允许接受其他头信息，而无需验证。

## <a name="output"></a> 输出

hapi 也可以确认响应信息，这定义在路由 `options` 对象中的 `response` 属性内。

响应不通过，客户端默认会收到 (500) 响应 (参见 `response.failAction` 如下)。

输出确认，可验证返回数据是否与接口文档一致。此外，像 [hapi-swagger](https://github.com/glennjones/hapi-swagger) 和 [lout](https://github.com/hapijs/lout) 之类的插件，会根据验证规则自动生成文档，从而确接口文档始终如新。

hapi 支持多种选项来确认输出，简单列举如下：

### <a name="failaction"></a> response.failAction

可以设置 `response.failAction`，来修改失败确认：
* `error`: 响应内部服务器错误 (500) (默认)
* `log`: 只记录错误日志，并按原样响应
* `ignore`: 忽略错误
* 或者一个带有签名 `async function(request, h, err)` 的方法，其中 `request` 是请求对象, `h` 是响应工具包 ，`err` 是错误信息。

例：

```js
const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().length(10),
    pageCount: Joi.number(),
    datePublished: Joi.date().iso()
});

server.route({
    method: 'GET',
    path: '/books',
    handler: async function (request, h) {

        return await getBooks();
    },
    options: {
        response: {
            schema: Joi.array().items(bookSchema),
            failAction: 'log'
        }
    }
});
```

此路由返回书籍列表。请看，由于 `failAction` 设置为`log`，服务器将只是记录错误，并按原样发送响应。

### <a name="sample"></a> response.sample

如果担心性能，hapi 可以只确认一部分响应。这在路由 `options` 的 `response.sample` 处设置。其值为 `0` 到 `100`，表示确认几成响应，请看：

```javascript
const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().length(10),
    pageCount: Joi.number(),
    datePublished: Joi.date().iso()
});

server.route({
    method: 'GET',
    path: '/books',
    handler: async function (request, h) {

        return await getBooks();
    },
    options: {
        response: {
            sample: 50,
            schema: Joi.array().items(bookSchema)
        }
    }
});
```
书籍路由的响应确认百分比设置为，`sample: 50`。表示服务器只确认一半响应。

###  <a name="status"></a> response.status

有时，同一路由不同响应，比如一个 `POST` 路由可能会返回以下内容：
* `201` 代表一个新建。
* `202` 代表一个更改。

hapi 可以为不同响应，配置不同确认规则。`response.status` 是一个对象，其键为状态码，其值为 joi 对象：

```json5
{
    response: {
        status: {
            201: dataSchema,
            202: Joi.object({ original: dataSchema, updated:  dataSchema })
        }
    }
}
```

### <a name="options"></a> response.options

此选项可以在确认时候传给 joi，用于设置全局选项，如`stripUnknown`、`abortEarly`。如果通过 `schema` 或 `status` 定义了自定义确认函数，则 `options` 可以为任意对象，并变成确认函数的第二个参数。。

## <a name="alternatives"></a> Joi 替代品

通常建议用 Joi 来确认，但 hapi 也可以有别的配置。

最简单的是，可以给确认选项指定布尔值。默认情况下，所有可用的确认都设置为 `true`，表示不做确认。

如果确认的选项设置为 `false`，表示该选项不允许任何值。

也可以传递一个自定义函数，其签名为 `async function (value, options)`。其中，`value` 是要确认的数据，`options` 是服务器对象内定义的确认选项。其返回值会替换原始确认对象。例如，确认 `request.headers`，返回后的值会代替 `request.headers`，原始值则保存在 `request.orig.headers`。否则 `headers` 保持不变。另外，可以用 `failAction` 处理错误。
