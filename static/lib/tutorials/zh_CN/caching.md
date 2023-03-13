# 缓存（Caching）

_本教程适用于 hapi v17 及以上_

## <a name="overview"></a> 总览

在服务器上配置缓存，可让网站性能更佳。hapi 中，配置客户端和服务端缓存，十分容易。

## <a name="client-side"></a> 客户端缓存（Client-side caching）

HTTP 协议定义了诸多 HTTP 请求头（headers），用以指示如浏览器登客户端，如何使用缓存资源。欲知详情，可以查阅 [Google 的指南](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)。

本教程的第一部分，演示 hapi 为客户端配置头信息，十分简单。

### <a name="cache-control"></a> 请求头 Cache-Control

请求头 `Cache-Control` 用以配置是否缓存及缓存时间。例如, `Cache-Control:max-age=30, must-revalidate, private`，表示浏览器可以缓存相关的资源 30 秒，`private` 表示只能被单个用户缓存，`must-revalidate` 表示一旦过期，客户端就必须向服务器重新请求资源。

例:

```javascript
server.route({
    path: '/hapi/{ttl?}',
    method: 'GET',
    handler: function (request, h) {

        const response = h.response({ be: 'hapi' });

        if (request.params.ttl) {
            response.ttl(request.params.ttl);
        }

        return response;
    },
    options: {
        cache: {
            expiresIn: 30 * 1000,
            privacy: 'private'
        }
    }
});
```

上述例子演示了为路由设置 `cache` 选项。此处设置 `expiresIn` 为 30 秒，`privacy` 为私有。
该示例还表明，`expiresIn` 可以使用 [响应对象](/api#response-object) 接口提供的 `ttl(毫秒)` 值改写。

此时向 `/hapi` 发出请求，会收到响应头 `cache-control: max-age=30, must-revalidate, private`。如果向 `/hapi/5000` 发送请求，则收到响应头 `cache-control: max-age=5, must-revalidate, private`。

欲了解更多 `cache` 配置信息，请参考 [route-options](/api#route-options) 。

### <a name="last-modified"></a> 请求头 Last-Modified

有时，服务器可以提供某资源最后被修改时间的信息。当用 [inert](/modules/inert) 插件来处理静态内容时，`Last-Modified` 请求头会加载所有响应中。

当响应中设置了 `Last-Modified` 请求头，客户端发来 `If-Modified-Since` 请求头，hapi 会将其与之对比，以决定响应状态码是否该为 `304 Not Modified`。通常称之为条件 GET 请求，其好处是告知浏览器无需为 `304` 响应再次下载资源。

假设 `lastModified` 是 `Date` 对象，可以通过 [响应对象](/api#response-object) 设置这个头信息：

```javascript
return h.response(result)
    .header('Last-Modified', lastModified.toUTCString());
```
`Last-Modified`，见本文 [最后一节](#clientandserver)。

### <a name="etag"></a> 请求头 ETag

请求头 ETag `Last-Modified` 的替代品。服务器提供一个令牌(token) (通常是资源的校验和) 来代替最后修改时间戳。下个请求，浏览器会用这个令牌去设置请求头 `If-None-Match`。服务器拿该值与新 `ETag` 比较，来决定要不要返回 `304` 响应。

用 `etag(tag, options)` 函数来设置 `ETag`:

```javascript
return h.response(result).etag('xxxxxxxxx');
```

欲知详情，请参阅[响应对象](/api#response-object)。

## <a name="server-side"></a>服务端缓存（Server-side Caching）

hapi 服务端缓存十分强大方便，由 [catbox](/module/catbox) 提供，接下来介绍 catbox。

### <a name="catbox"></a> catbox

[catbox](/module/catbox) 是一个多策略的键值对象存储。其提供的扩展，可支持内存缓存，如 [Redis](https://redis.io/)、[Memcached](https://memcached.org/)。

Catbox 接口有二： client、policy。

### <a name="client"></a> Client

[Client](https://github.com/hapijs/catbox#client) 是个低级接口，允许设置和获取键值对。可由以下适配器来初始化: ([Memory](/module/catbox-memory)、[Redis](/module/catbox-redis)、[Memcached](/module/catbox-memcached)。

hapi 里，默认 [client](/module/catbox#client) 用 [catbox memory](/module/catbox-memory) 适配器来初始化。下面例子演示 [Redis](http://redis.io/) 策略来定义 client。

```javascript
'use strict';

const Hapi = require('@hapi/hapi');
const CatboxRedis = require('@hapi/catbox-redis');

const server = Hapi.server({
    port: 8000,
    cache: [
        {
            name: 'my_cache',
            provider: {
                constructor: CatboxRedis,
                options: {
                    partition : 'my_cached_data',
                    host: 'redis-cluster.domain.com',
                    port: 6379,
                    database: 0,
                    tls: {}
                }
            }
        }
    ]
});
```

上面例子，定义了 catbox 客户端：`my_cache`。加上 hapi 默认创建的 catbox，现有两个可用的缓存客户端。注册新缓存客户端时，省略属性 `name` 以替换默认客户端。 `partition` 告诉适配器如何命名缓存（默认为 'catbox'）。其在 [redis](http://redis.io/) 中为键前缀。

###  <a name="policy" />  Policy

[Policy](/module/catbox/api#policy) 接口比 Client 更高一级。下面例子，演示缓存两数之和。其原理可举一反三，推广应用。[server.cache(options)](/api#server.cache()) 创建一个新的[policy](/module/catbox/api#policy), 而后可以在路由处理函数中使用。

```javascript
const start = async () => {

    const server = Hapi.server();

    const add = async (a, b) => {

        await Hoek.wait(1000);   // 模拟一些慢的 I/O 操作

        return Number(a) + Number(b);
    };

    const sumCache = server.cache({
        cache: 'my_cache',
        expiresIn: 10 * 1000,
        segment: 'customSegment',
        generateFunc: async (id) => {

            return await add(id.a, id.b);
        },
        generateTimeout: 2000
    });

    server.route({
        path: '/add/{a}/{b}',
        method: 'GET',
        handler: async function (request, h) {

            const { a, b } = request.params;
            const id = `${a}:${b}`;

            return await sumCache.get({ id, a, b });
        }
    });

    await server.start();

    console.log('服务器运行于:', server.info.uri);
};

start();
```
此时发请求到 `http://localhost:8000/add/1/5`，一秒后，收到响应  `6`。再次请求，会从缓存中立刻返回结果。如果过 10 秒再次请求，因其缓存值已过期，仍一秒后返回。

`server.cache(options)` 用以配置缓存策略。上述例子，缓存策略为 `'my_cache'`。

属性 `expiresIn` 为缓存过期时间，单位毫秒。例子中，设置为 10 秒。

属性 `segment` 为缓存分段。例子中，设置为 `'customSegment'`。分段可用于隔离缓存，如不同方法的缓存。[Redis](http://redis.io/) 中，`segment` 是与 `partition` 一起的额外前缀。当在插件内部调用 [server.cache()](/api#-servercacheoptions) 时，`segment` 的默认值为 `'!pluginName'`。当创建[服务器方法](/tutorials/servermethods) 时, `segment` 值是 `'#methodName'`。如果需要多策略功用一个分段，可以使用 [shared](/api#-servercacheoptions) 选项。

方法 `generateFunc` 表示，调用 `get()` 没有命中，则新建缓存。例子中，返回两数之和。若缓存过期，也会调用此方法。还可配置选项 `staleIn` 来设置缓存中的项目过期时间，单位毫秒，其值需小于 `expiredIn`。当缓存过期，但仍在 `staleIn` 时间内，调用 `get()` 仍可命中，且返回缓存值。若过 `staleIn` 时间，调用 `get()` 则不命中，并调用 `generateFunc` 生成新值。

属性 `generateTimeout` 用以设置 `generateFunc` 执行超时时间。超时候返回错误信息， 单位毫秒。

方法 `get(id)` 是用来从缓存中获取项目。如果没有找到该项目，且存在 `generateFunc`，则生成新值，缓存并返回。

方法 `sumCache.get()` 接收参数 id，可为字符串，或一个有 `id` 属性的对象，这个属性标识缓存对象。

查看 [catbox 选项](/module/catbox/api#policy)，了解更多。充分利用 `staleIn`、`staleTimeout`、`generateTimeout` 等选项，可实现更多功能。

### <a name="serverMethods"></a> 服务器方法（Server methods）

绝大多数情况，可以用服务器方法来缓存，此句可极大减少样板代码。例：

```javascript
const start = async () => {

    const server = Hapi.server();

    server.method('sum', add, {
        cache: {
            cache: 'my_cache',
            expiresIn: 10 * 1000,
            generateTimeout: 2000
        }
    });

    server.route({
        path: '/add/{a}/{b}',
        method: 'GET',
        handler: async function (request, h) {

            const { a, b } = request.params;
            return await server.methods.sum(a, b);
        }
    });

    await server.start();

};

start();
```
[server.method()](/api#server.method()) 会自动创建一个新 [policy](/module/catbox/api#policy)，带有 `segment: '#sum'`。同时，`id`（缓存键） 也自动生成。 默认，可处理 `string`、`number`、`boolean` 参数。对于更复杂的参数，需要提供 `generateKey` 函数，并根据参数唯一id。——详情请参阅服务器方法相关内容。

## <a name="clientandserver"></a> 客户端和服务器缓存（Client and Server caching）

[Catbox Policy](/module/catbox/api#policy) 还有可选项，提供从缓存值的更多信息。若要启用，需要在创建 policy 时将 `getDecoratedValue` 设置为 true。这样，从服务器方法返回值都均为对象 `{ value, cached, report }`。 `value` 是缓存值，`cached` 是布尔值，表示是否命中缓存，`report` 是一个对象，包含缓存相关信息。

下面例子，演示服务器和客户端缓存协同工作，使用 `cached.stored` 时间戳来设置 `last-modified` 头。

```javascript
const start = async () => {

    const server = Hapi.server();

    server.method('sum', add, {
        cache: {
            cache: 'my_cache',
            expiresIn: 10 * 1000,
            generateTimeout: 2000,
            getDecoratedValue: true
        }
    });

    server.route({
        path: '/add/{a}/{b}',
        method: 'GET',
        handler: async function (request, h) {

            const { a, b } = request.params;
            const { value, cached } = await server.methods.sum(a, b);
            const lastModified = cached ? new Date(cached.stored) : new Date();

            return h.response(value)
                .header('Last-modified', lastModified.toUTCString());
        }
    });

    await server.start();

};
```

欲了解关于`cached`和`report`的更多细节，前往[Catbox Policy API](/module/catbox/api#api-1)。
