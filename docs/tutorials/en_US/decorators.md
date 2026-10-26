---
title: Decorators
---

<TutorialLang />

# Decorators

_This tutorial is compatible with hapi v21 and newer_

## <a name="overview"></a> Overview

A decoration adds your own property to one of hapi's objects. Once you decorate, every part of your app can use the new property: `server.todos` in a plugin, `request.loadAccount()` in a handler, `h.paginated()` when building a response.

Most hapi plugins are built on decorations. When you register `@hapi/vision`, `h.view()` exists because vision decorated the response toolkit. When you register `@hapi/inert`, `handler: { file: 'index.html' }` works because inert decorated the route handlers.

You add decorations with [`server.decorate(type, property, method, [options])`](/api#server-decorate-type-property-method-options). `type` picks the object you are adding to:

| `type`       | Adds to                           | Real examples                                                                                                 |
| ------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `'server'`   | the `server` object               | vision's `server.views()` and `server.render()`, nes's `server.publish()`, yar's `server.yar`                 |
| `'request'`  | every `request` object            | vision's `request.render()`, @hapi/cookie's `request.cookieAuth`, yar's `request.yar`, nes's `request.socket` |
| `'toolkit'`  | the response toolkit `h`          | vision's `h.view()`, inert's `h.file()`, h2o2's `h.proxy()`                                                   |
| `'handler'`  | the handler types a route can use | vision's `{ view }`, inert's `{ file }` and `{ directory }`, h2o2's `{ proxy }`                               |
| `'response'` | every response object             | none of the hapi plugins above; rarely needed                                                                 |

Decorations often work together with [lifecycle hooks](/tutorials/en_US/lifecycle-hooks): @hapi/cookie, for example, adds `request.cookieAuth` with a decoration and fills it in with an `onPreAuth` hook.

## <a name="server"></a> Server decorations: sharing a service

The most common decoration shares one object with the whole app, such as a database client, a mailer, or a service. A plugin creates it once and decorates the server with it. Handlers reach it through `request.server`, and other plugins through their own `server` argument.

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

The `declare module` block tells TypeScript about the new property. hapi exports its objects as interfaces you can extend, and after this `server.todos` and `request.server.todos` are typed everywhere. The [TypeScript section](#typescript) lists the interface for each decoration type.

### <a name="where"></a> Where should a value live?

hapi has several places to keep shared values, and a decoration is only one of them:

| The value is                                                  | Keep it in                                                                                  | Example                        |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------ |
| a service with methods that routes and plugins call           | a server decoration                                                                         | `server.todos`                 |
| a function whose results are worth caching by arguments       | a [server method](/tutorials/en_US/server-methods)                                          | `server.methods.getWeather()`  |
| app-wide configuration or state, read and written by any code | [`server.app`](/api#server-app)                                                             | `server.app.config`            |
| plugin state that other plugins only occasionally read        | [`server.expose()`](/api#server-expose-key-value-options), read as `server.plugins[name]`   | `server.plugins['todo-store']` |
| a helper that reads the current request                       | a request decoration                                                                        | `request.clientIp()`           |
| per-request state created on first use                        | a request decoration with `apply: true`                                                     | `request.loadAccount()`        |
| per-request data that a hook or handler sets                  | [`request.app`](/api#request-app), or [`request.plugins`](/api#request-plugins) in a plugin | an id set in `onRequest`       |

A server decoration is the right choice when the value is a service with methods, every route needs it, and you want a short, typed name for it.

## <a name="request"></a> Request decorations

A request decoration adds a property to every request. There are two kinds, and the difference is when the value is created.

### Methods shared by every request

Without options, the decoration is put on the request prototype once, and every request shares it. Use a regular `function` so `this` is the current request:

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

This reads the last entry of `x-forwarded-for`, which is the address seen by a single proxy you control that appends to the header, such as nginx with `$proxy_add_x_forwarded_for` or an AWS load balancer. Entries before it come from the client and can be forged. With more trusted proxies in front, count back one entry per proxy; with none, ignore the header, since any client can send it.

### Per-request values with `apply: true`

With `{ apply: true }`, hapi calls your function once for each new request, with the request as its argument, and assigns the return value to the property. Use it when each request needs its own state, such as a cached lookup:

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

A pre-handler, an `onPostAuth` hook, and the handler can all call `request.loadAccount()`, and the account is looked up once per request. Without `apply`, the decoration is one function shared by all requests, so there is no per-request place to keep `pending`; a variable outside the function would leak the first request's account into all the others.

|                   | Without options                      | With `apply: true`                                       |
| ----------------- | ------------------------------------ | -------------------------------------------------------- |
| Created           | once, on the request prototype       | once per request, when the request object is built       |
| Per-request state | none, use `this` to read the request | yes, held in the closure                                 |
| Cost per request  | none                                 | your function runs on every request                      |
| Real example      | vision's `request.render()`          | @hapi/cookie's `request.cookieAuth`, yar's `request.yar` |

`apply` functions run for every request, including requests for routes that never use the value. Keep them cheap: create the closure, and do the work the first time the value is used, as `loadAccount()` does.

## <a name="toolkit"></a> Toolkit decorations: response helpers

A toolkit decoration adds a method to `h`. Use a regular `function`: `this` is the toolkit, so `this.response()` builds a response and `this.request` is the current request. This one gives every list route the same pagination convention:

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

`h.paginated()` sends one page of items with an `x-total-count` header, so clients read the total the same way on every list route. Toolkit decorations are a good place for response conventions your API repeats, such as this header or an error envelope. How hapi turns the returned value into bytes is covered in [response marshalling](/tutorials/en_US/response-marshalling).

## <a name="handler"></a> Handler decorations: custom handler types

A handler decoration lets routes describe their handler as an object instead of writing a function, like `handler: { file: 'index.html' }`. Use one when many routes share the same behavior and differ only in configuration.

The decoration is a function `(route, options)` that hapi calls once per route, when the route is added. It returns the actual handler. This one redirects old URLs:

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

The optional `defaults` property sets route options for every route that uses the handler; here, redirects never require authentication. `defaults` can also be a function of the HTTP method: h2o2 uses one so that `{ proxy }` routes skip payload parsing and stream the body to the upstream server instead.

Because hapi builds the handler when the route is added, the handler decoration must exist before any route uses it. Register the plugin that defines it first.

## <a name="response"></a> Response decorations

`'response'` decorations add a method to every response object, including error responses and those built with `request.generateResponse()`. They are rarely needed. To change responses across the app, use an `onPreResponse` [lifecycle hook](/tutorials/en_US/lifecycle-hooks).

## <a name="extend"></a> Wrapping an existing decoration

`{ extend: true }` replaces an existing decoration with a wrapped version. Your function receives the current decoration and returns the new one. A common use is adding data to another plugin's decoration without changing its code. This wraps vision's `h.view()` so every template receives the logged-in user:

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

The plugin that defines the decoration has to be registered first; extending a decoration that does not exist yet throws. Handler decorations cannot be extended.

## <a name="rules"></a> Rules hapi enforces

Decorations belong to the whole server, not to the plugin that added them. A decoration added inside a plugin is visible to the root server and to every other plugin. hapi throws as soon as a decoration or a route breaks one of these rules:

| Mistake                                      | Error                                                             |
| -------------------------------------------- | ----------------------------------------------------------------- |
| Two plugins decorate the same name           | `Server decoration already defined: todos`                        |
| Name starts with an underscore               | `Property name cannot begin with an underscore: _cache`           |
| Name is a built-in property                  | `Cannot override the built-in request interface decoration: auth` |
| A route uses a handler type nobody decorated | `Unknown handler: moved`                                          |
| `extend: true` on a name that does not exist | `Cannot extend missing toolkit decoration: view`                  |

Because names are global, give decorations from reusable plugins a specific name, or let users configure it, as @hapi/cookie does with its `requestDecoratorName` option. [`server.decorations`](/api#server-decorations) lists the names already in use.

Server decorations are copied to each plugin's own `server` object, so inside a decoration `this` is the server of the plugin that calls it. vision relies on this: `server.render()` looks up the views configured in the caller's plugin, so two plugins can each have their own templates.

## <a name="bootstrap"></a> Bootstrapping with decorations

Plugins usually decorate inside `register()`, so the decoration exists as soon as `server.register()` resolves. A plugin that uses another plugin's decoration only in handlers can be registered in any order, since handlers run after the server starts. One that uses it inside its own `register()` must be registered after the plugin that adds it.

- A plugin's `dependencies: ['todo-store']` property only makes hapi check, at [`server.initialize()`](/api#await-server-initialize) or `server.start()`, that the other plugin was registered. It does not change the order plugins are registered in.
- Code that uses another plugin's decoration while the server boots, such as warming a cache or creating tables, belongs in a [`server.dependency()`](/api#server-dependency-dependencies-after) callback. hapi runs it in the `onPreStart` phase, after the plugins it depends on, regardless of registration order:

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

The full startup order is in [Dependencies](/tutorials/en_US/plugins#dependencies) in the Plugins tutorial and in [Server hooks](/tutorials/en_US/lifecycle-hooks#server-hooks).

## <a name="typescript"></a> TypeScript

hapi exports an interface for each object you can decorate. Add your decoration to it with a `declare module '@hapi/hapi'` block, in the same file as the `server.decorate()` call, so the type and the code stay together:

| `type`      | Interface to extend  | Example                                                                                       |
| ----------- | -------------------- | --------------------------------------------------------------------------------------------- |
| `'server'`  | `Server`             | `interface Server { todos: TodoStore }`                                                       |
| `'request'` | `Request`            | `interface Request { loadAccount: () => Promise<Account \| null> }`                           |
| `'toolkit'` | `ResponseToolkit`    | `interface ResponseToolkit { paginated: (items: object[], total: number) => ResponseObject }` |
| `'handler'` | `HandlerDecorations` | `interface HandlerDecorations { moved?: MovedOptions }`                                       |

Handler decoration properties must be optional, or every route would have to set them. hapi's own types use the same mechanism for other app-specific data: `ServerApplicationState` types `server.app`, `RequestApplicationState` types `request.app`, `PluginProperties` types `server.plugins`, and `PluginsStates` types `request.plugins`.

See the [plugins tutorial](/tutorials/en_US/plugins) for packaging these decorations as a plugin, and the [API reference](/api#server-decorate-type-property-method-options) for the complete `server.decorate()` signature.
