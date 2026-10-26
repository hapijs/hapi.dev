---
title: 装饰器
---

<TutorialLang />

# 装饰器

_本教程适用于 hapi v21 及更新版本_

## <a name="overview"></a> 概述

装饰（decoration）为 hapi 的某个对象添加你自己的属性。装饰之后，应用的任何部分都可以使用这个新属性：在插件中使用 `server.todos`，在 handler 中使用 `request.loadAccount()`，在构建响应时使用 `h.paginated()`。

大多数 hapi 插件都建立在装饰之上。注册 `@hapi/vision` 后，`h.view()` 之所以存在，是因为 vision 装饰了响应工具包。注册 `@hapi/inert` 后，`handler: { file: 'index.html' }` 之所以可用，是因为 inert 装饰了路由 handler。

使用 [`server.decorate(type, property, method, [options])`](/api#server-decorate-type-property-method-options) 添加装饰。`type` 决定添加到哪个对象上：

| `type`       | 添加到                      | 实际示例                                                                                                          |
| ------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `'server'`   | `server` 对象               | vision 的 `server.views()` 和 `server.render()`，nes 的 `server.publish()`，yar 的 `server.yar`                   |
| `'request'`  | 每个 `request` 对象         | vision 的 `request.render()`，@hapi/cookie 的 `request.cookieAuth`，yar 的 `request.yar`，nes 的 `request.socket` |
| `'toolkit'`  | 响应工具包 `h`              | vision 的 `h.view()`，inert 的 `h.file()`，h2o2 的 `h.proxy()`                                                    |
| `'handler'`  | 路由可以使用的 handler 类型 | vision 的 `{ view }`，inert 的 `{ file }` 和 `{ directory }`，h2o2 的 `{ proxy }`                                 |
| `'response'` | 每个响应对象                | 上述 hapi 插件都没有使用；很少需要                                                                                |

装饰常常与[生命周期钩子](/tutorials/zh_CN/lifecycle-hooks)配合使用：例如 @hapi/cookie 通过装饰添加 `request.cookieAuth`，再通过 `onPreAuth` 钩子为其填充内容。

## <a name="server"></a> 服务器装饰：共享服务

最常见的装饰是与整个应用共享一个对象，例如数据库客户端、邮件发送器或某个服务。插件创建它一次，并用它装饰服务器。handler 通过 `request.server` 访问它，其他插件则通过自己的 `server` 参数访问。

```ts
import Hapi from '@hapi/hapi';

import type { Plugin } from '@hapi/hapi';

interface Todo {
    id: number;
    title: string;
}

class TodoStore {
    #todos = new Map<number, Todo>();

    add(title: string) {
        const todo = { id: this.#todos.size + 1, title };
        this.#todos.set(todo.id, todo);
        return todo;
    }

    list() {
        return [...this.#todos.values()];
    }
}

declare module '@hapi/hapi' {
    interface Server {
        todos: TodoStore;
    }
}

const storePlugin: Plugin<void> = {
    name: 'todo-store',
    register: (server) => {
        server.decorate('server', 'todos', new TodoStore());
    },
};

const routesPlugin: Plugin<void> = {
    name: 'todo-routes',
    dependencies: ['todo-store'],
    register: (server) => {
        server.route({
            method: 'GET',
            path: '/todos',
            handler: (request, h) => request.server.todos.list(),
        });

        server.route<{ Payload: { title: string } }>({
            method: 'POST',
            path: '/todos',
            handler: (request, h) => request.server.todos.add(request.payload.title),
        });
    },
};

const server = Hapi.server({ port: 4000 });

await server.register([storePlugin, routesPlugin]);
await server.start();
```

`declare module` 代码块把这个新属性告诉 TypeScript。hapi 将其对象导出为可扩展的接口，扩展之后，`server.todos` 和 `request.server.todos` 在任何地方都有类型。[TypeScript 一节](#typescript)列出了每种装饰类型对应的接口。

### <a name="where"></a> 值应该放在哪里？

hapi 有多个存放共享值的地方，装饰只是其中之一：

| 值的性质                             | 存放位置                                                                                    | 示例                           |
| ------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------ |
| 带有方法、供路由和插件调用的服务     | 服务器装饰                                                                                  | `server.todos`                 |
| 结果值得按参数缓存的函数             | [服务器方法](/tutorials/zh_CN/server-methods)                                               | `server.methods.getWeather()`  |
| 应用级的配置或状态，任何代码都可读写 | [`server.app`](/api#server-app)                                                             | `server.app.config`            |
| 其他插件只是偶尔读取的插件状态       | [`server.expose()`](/api#server-expose-key-value-options)，通过 `server.plugins[name]` 读取 | `server.plugins['todo-store']` |
| 读取当前请求的辅助函数               | 请求装饰                                                                                    | `request.clientIp()`           |
| 首次使用时才创建的每请求状态         | 带 `apply: true` 的请求装饰                                                                 | `request.loadAccount()`        |
| 由钩子或 handler 设置的每请求数据    | [`request.app`](/api#request-app)，在插件中则用 [`request.plugins`](/api#request-plugins)   | 在 `onRequest` 中设置的 id     |

当值是一个带有方法的服务、每个路由都需要它，并且你想给它一个简短且带类型的名称时，服务器装饰就是正确的选择。

## <a name="request"></a> 请求装饰

请求装饰为每个请求添加一个属性。它分为两种，区别在于值在什么时候创建。

### <a name="methods-shared-by-every-request"></a> 所有请求共享的方法

不带选项时，装饰只会被放到请求原型上一次，所有请求共享它。请使用普通的 `function`，这样 `this` 就是当前请求：

```ts
declare module '@hapi/hapi' {
    interface Request {
        clientIp: () => string;
    }
}

server.decorate('request', 'clientIp', function () {
    const forwarded = this.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
        return forwarded.split(',').at(-1)?.trim() ?? this.info.remoteAddress;
    }

    return this.info.remoteAddress;
});

server.route({
    method: 'GET',
    path: '/whoami',
    handler: (request, h) => {
        return { ip: request.clientIp() };
    },
});
```

这里读取的是 `x-forwarded-for` 的最后一项，也就是由你掌控的、会向该请求头追加地址的单个代理所看到的地址，例如使用 `$proxy_add_x_forwarded_for` 的 nginx，或 AWS 负载均衡器。它之前的项来自客户端，可能是伪造的。如果前面有多层可信代理，每多一层代理就往前数一项；如果没有代理，就忽略这个请求头，因为任何客户端都可以发送它。

### <a name="per-request-values-with-apply-true"></a> 使用 `apply: true` 的每请求值

使用 `{ apply: true }` 时，hapi 会为每个新请求调用一次你的函数，以请求作为参数，并把返回值赋给该属性。当每个请求都需要自己的状态（例如一次带缓存的查询）时使用它：

```ts
interface Account {
    id: string;
    name: string;
}

declare module '@hapi/hapi' {
    interface Request {
        loadAccount: () => Promise<Account | null>;
    }
}

const accounts = new Map([['2133d32a', { id: '2133d32a', name: 'John Doe' }]]);

const findAccount = async (id: string) => accounts.get(id) ?? null;

server.decorate(
    'request',
    'loadAccount',
    (request) => {
        let pending: Promise<Account | null> | undefined;

        return () => {
            const id = request.headers['x-account-id'];
            pending ??= typeof id === 'string' ? findAccount(id) : Promise.resolve(null);
            return pending;
        };
    },
    { apply: true },
);
```

pre-handler、`onPostAuth` 钩子和 handler 都可以调用 `request.loadAccount()`，而每个请求只会查询一次账户。如果不使用 `apply`，装饰就是所有请求共享的同一个函数，没有属于单个请求的地方来保存 `pending`；把变量放在函数外部，会把第一个请求的账户泄漏给其他所有请求。

|            | 不带选项                     | 带 `apply: true`                                           |
| ---------- | ---------------------------- | ---------------------------------------------------------- |
| 创建时机   | 一次，放在请求原型上         | 每个请求一次，在构建请求对象时                             |
| 每请求状态 | 无，通过 `this` 读取请求     | 有，保存在闭包中                                           |
| 每请求开销 | 无                           | 你的函数在每个请求上都会运行                               |
| 实际示例   | vision 的 `request.render()` | @hapi/cookie 的 `request.cookieAuth`，yar 的 `request.yar` |

`apply` 函数在每个请求上都会运行，包括那些从不使用该值的路由的请求。让它保持轻量：只创建闭包，在第一次使用该值时再做实际工作，就像 `loadAccount()` 那样。

## <a name="toolkit"></a> 工具包装饰：响应辅助方法

工具包装饰为 `h` 添加一个方法。请使用普通的 `function`：`this` 是工具包，因此 `this.response()` 构建响应，`this.request` 是当前请求。下面这个装饰让每个列表路由都遵循相同的分页约定：

```ts
import type { ResponseObject } from '@hapi/hapi';

declare module '@hapi/hapi' {
    interface ResponseToolkit {
        paginated: (items: object[], total: number) => ResponseObject;
    }
}

server.decorate('toolkit', 'paginated', function (items: object[], total: number) {
    return this.response(items).header('x-total-count', String(total));
});

server.route<{ Query: { page?: string } }>({
    method: 'GET',
    path: '/todos',
    handler: (request, h) => {
        const page = Number(request.query.page ?? 1);
        const todos = request.server.todos.list();
        return h.paginated(todos.slice((page - 1) * 20, page * 20), todos.length);
    },
});
```

`h.paginated()` 发送一页数据，并带上 `x-total-count` 响应头，这样客户端在每个列表路由上都以相同的方式读取总数。API 中反复出现的响应约定（例如这个响应头或统一的错误包装格式）很适合放在工具包装饰里。hapi 如何把返回值转换成字节，参见[响应编组](/tutorials/zh_CN/response-marshalling)。

## <a name="handler"></a> Handler 装饰：自定义 handler 类型

handler 装饰让路由可以用对象描述其 handler，而不必编写函数，例如 `handler: { file: 'index.html' }`。当许多路由行为相同、只是配置不同时，就可以使用它。

这种装饰是一个 `(route, options)` 函数，hapi 会在添加路由时为每个路由调用一次。它返回真正的 handler。下面这个装饰用于重定向旧 URL：

```ts
import type { HandlerDecorationMethod } from '@hapi/hapi';

interface MovedOptions {
    to: string;
    permanent?: boolean;
}

declare module '@hapi/hapi' {
    interface HandlerDecorations {
        moved?: MovedOptions;
    }
}

const moved: HandlerDecorationMethod = (route, options: MovedOptions) => {
    return (request, h) => h.redirect(options.to).permanent(options.permanent ?? false);
};

moved.defaults = { auth: false };

server.decorate('handler', 'moved', moved);

server.route({ method: 'GET', path: '/old-docs', handler: { moved: { to: '/docs', permanent: true } } });
server.route({ method: 'GET', path: '/blog/{slug}', handler: { moved: { to: '/articles' } } });
```

可选的 `defaults` 属性为每个使用该 handler 的路由设置路由选项；这里的设置让重定向永远不需要身份认证。`defaults` 也可以是一个以 HTTP 方法为参数的函数：h2o2 就用了这种方式，让 `{ proxy }` 路由跳过 payload 解析，直接把 payload 以流的形式转发给上游服务器。

由于 hapi 在添加路由时构建 handler，handler 装饰必须在任何路由使用它之前就已存在。请先注册定义它的插件。

## <a name="response"></a> 响应装饰

`'response'` 装饰为每个响应对象添加一个方法，包括错误响应和通过 `request.generateResponse()` 构建的响应。很少需要用到它。如需在整个应用范围内修改响应，请使用 `onPreResponse` [生命周期钩子](/tutorials/zh_CN/lifecycle-hooks)。

## <a name="extend"></a> 包装已有的装饰

`{ extend: true }` 用包装后的版本替换已有的装饰。你的函数接收当前的装饰，并返回新的装饰。常见用法是在不修改其他插件代码的情况下，为其装饰添加数据。下面的代码包装了 vision 的 `h.view()`，让每个模板都能拿到已登录的用户：

```ts
server.decorate(
    'toolkit',
    'view',
    (existing) => {
        return function (template: string, context: object = {}, options?: object) {
            const user = this.request.auth.credentials?.user;
            return existing.call(this, template, { user, ...context }, options);
        };
    },
    { extend: true },
);
```

必须先注册定义该装饰的插件；扩展一个尚不存在的装饰会抛出错误。handler 装饰不能被扩展。

## <a name="rules"></a> hapi 强制执行的规则

装饰属于整个服务器，而不属于添加它的插件。在插件内添加的装饰，对根服务器和其他所有插件都可见。一旦装饰或路由违反以下任一规则，hapi 就会立即抛出错误：

| 错误用法                                  | 错误信息                                                          |
| ----------------------------------------- | ----------------------------------------------------------------- |
| 两个插件装饰了同一个名称                  | `Server decoration already defined: todos`                        |
| 名称以下划线开头                          | `Property name cannot begin with an underscore: _cache`           |
| 名称是内置属性                            | `Cannot override the built-in request interface decoration: auth` |
| 路由使用了没有任何人装饰过的 handler 类型 | `Unknown handler: moved`                                          |
| 对不存在的名称使用 `extend: true`         | `Cannot extend missing toolkit decoration: view`                  |

由于名称是全局的，可复用插件中的装饰应当使用具体的名称，或者允许用户配置名称，就像 @hapi/cookie 的 `requestDecoratorName` 选项那样。[`server.decorations`](/api#server-decorations) 列出了已在使用的名称。

服务器装饰会被复制到每个插件自己的 `server` 对象上，因此在装饰内部，`this` 是调用它的那个插件的服务器。vision 正是依赖这一点：`server.render()` 查找的是调用方插件中配置的视图，所以两个插件可以各自拥有自己的模板。

## <a name="bootstrap"></a> 用装饰进行启动初始化

插件通常在 `register()` 内部进行装饰，因此 `server.register()` 一完成，装饰就已存在。如果一个插件只在 handler 中使用另一个插件的装饰，那么两者的注册顺序无关紧要，因为 handler 在服务器启动后才运行。如果它在自己的 `register()` 内部就使用该装饰，就必须在添加该装饰的插件之后注册。

- 插件的 `dependencies: ['todo-store']` 属性只是让 hapi 在 [`server.initialize()`](/api#await-server-initialize) 或 `server.start()` 时检查另一个插件是否已注册。它不会改变插件的注册顺序。
- 在服务器启动过程中使用其他插件装饰的代码（例如预热缓存或创建数据表），应放在 [`server.dependency()`](/api#server-dependency-dependencies-after) 回调中。hapi 会在 `onPreStart` 阶段、在其依赖的插件之后运行它，与注册顺序无关：

```ts
import type { Plugin } from '@hapi/hapi';

const seedPlugin: Plugin<void> = {
    name: 'todo-seed',
    register: (server) => {
        server.dependency('todo-store', async (server) => {
            server.todos.add('Read the decorators tutorial');
        });
    },
};
```

完整的启动顺序请参见插件教程中的[依赖](/tutorials/zh_CN/plugins#dependencies)一节，以及[服务器钩子](/tutorials/zh_CN/lifecycle-hooks#server-hooks)。

## <a name="typescript"></a> TypeScript

hapi 为每个可装饰的对象都导出了一个接口。在调用 `server.decorate()` 的同一个文件中，用 `declare module '@hapi/hapi'` 代码块把你的装饰添加进去，让类型和代码放在一起：

| `type`      | 要扩展的接口         | 示例                                                                                          |
| ----------- | -------------------- | --------------------------------------------------------------------------------------------- |
| `'server'`  | `Server`             | `interface Server { todos: TodoStore }`                                                       |
| `'request'` | `Request`            | `interface Request { loadAccount: () => Promise<Account \| null> }`                           |
| `'toolkit'` | `ResponseToolkit`    | `interface ResponseToolkit { paginated: (items: object[], total: number) => ResponseObject }` |
| `'handler'` | `HandlerDecorations` | `interface HandlerDecorations { moved?: MovedOptions }`                                       |

handler 装饰的属性必须是可选的，否则每个路由都必须设置它们。hapi 自己的类型也用同样的机制处理其他应用相关的数据：`ServerApplicationState` 为 `server.app` 提供类型，`RequestApplicationState` 为 `request.app` 提供类型，`PluginProperties` 为 `server.plugins` 提供类型，`PluginsStates` 为 `request.plugins` 提供类型。

如何把这些装饰打包成插件，请参见[插件教程](/tutorials/zh_CN/plugins)；`server.decorate()` 的完整签名请参见 [API 参考](/api#server-decorate-type-property-method-options)。
