---
title: Decoradores
---

<TutorialLang />

# Decoradores

_Este tutorial es compatible con hapi v21 y versiones posteriores_

## <a name="overview"></a> Introducción

Una decoración añade una propiedad propia a uno de los objetos de hapi. Una vez decorado, cualquier parte de tu aplicación puede usar la nueva propiedad: `server.todos` en un plugin, `request.loadAccount()` en un handler, `h.paginated()` al construir una respuesta.

La mayoría de los plugins de hapi se basan en decoraciones. Cuando registras `@hapi/vision`, `h.view()` existe porque vision ha decorado el response toolkit. Cuando registras `@hapi/inert`, `handler: { file: 'index.html' }` funciona porque inert ha decorado los handlers de ruta.

Las decoraciones se añaden con [`server.decorate(type, property, method, [options])`](/api#server-decorate-type-property-method-options). `type` elige el objeto al que se añade:

| `type`       | Se añade a                                   | Ejemplos reales                                                                                                   |
| ------------ | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `'server'`   | el objeto `server`                           | `server.views()` y `server.render()` de vision, `server.publish()` de nes, `server.yar` de yar                    |
| `'request'`  | cada objeto `request`                        | `request.render()` de vision, `request.cookieAuth` de @hapi/cookie, `request.yar` de yar, `request.socket` de nes |
| `'toolkit'`  | el response toolkit `h`                      | `h.view()` de vision, `h.file()` de inert, `h.proxy()` de h2o2                                                    |
| `'handler'`  | los tipos de handler que puede usar una ruta | `{ view }` de vision, `{ file }` y `{ directory }` de inert, `{ proxy }` de h2o2                                  |
| `'response'` | cada objeto response                         | ninguno de los plugins anteriores; rara vez hace falta                                                            |

Las decoraciones suelen trabajar junto con los [hooks del ciclo de vida](/tutorials/es_ES/lifecycle-hooks): @hapi/cookie, por ejemplo, añade `request.cookieAuth` con una decoración y lo rellena con un hook `onPreAuth`.

## <a name="server"></a> Decoraciones de servidor: compartir un servicio

La decoración más habitual comparte un objeto con toda la aplicación, como un cliente de base de datos, un servicio de correo o cualquier otro servicio. Un plugin lo crea una vez y decora el servidor con él. Los handlers llegan a él a través de `request.server`, y los demás plugins a través de su propio argumento `server`.

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

El bloque `declare module` informa a TypeScript de la nueva propiedad. hapi exporta sus objetos como interfaces que puedes extender, y a partir de ahí `server.todos` y `request.server.todos` están tipados en todas partes. La [sección de TypeScript](#typescript) indica la interfaz de cada tipo de decoración.

### <a name="where"></a> ¿Dónde debe vivir un valor?

hapi tiene varios sitios donde guardar valores compartidos, y una decoración es solo uno de ellos:

| El valor es                                                                      | Guárdalo en                                                                                  | Ejemplo                        |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------ |
| un servicio con métodos que llaman las rutas y los plugins                       | una decoración de servidor                                                                   | `server.todos`                 |
| una función cuyos resultados merece la pena cachear por argumentos               | un [método de servidor](/tutorials/es_ES/server-methods)                                     | `server.methods.getWeather()`  |
| configuración o estado de toda la aplicación, que lee y escribe cualquier código | [`server.app`](/api#server-app)                                                              | `server.app.config`            |
| estado de un plugin que otros plugins solo leen de vez en cuando                 | [`server.expose()`](/api#server-expose-key-value-options), leído como `server.plugins[name]` | `server.plugins['todo-store']` |
| un helper que lee la petición actual                                             | una decoración de petición                                                                   | `request.clientIp()`           |
| estado por petición que se crea en el primer uso                                 | una decoración de petición con `apply: true`                                                 | `request.loadAccount()`        |
| datos por petición que fija un hook o un handler                                 | [`request.app`](/api#request-app), o [`request.plugins`](/api#request-plugins) en un plugin  | un id fijado en `onRequest`    |

Una decoración de servidor es la opción adecuada cuando el valor es un servicio con métodos, todas las rutas lo necesitan y quieres un nombre corto y tipado para él.

## <a name="request"></a> Decoraciones de petición

Una decoración de petición añade una propiedad a cada petición. Hay dos tipos, y la diferencia está en cuándo se crea el valor.

### <a name="methods-shared-by-every-request"></a> Métodos compartidos por todas las peticiones

Sin opciones, la decoración se coloca una sola vez en el prototipo de la petición, y todas las peticiones la comparten. Usa una `function` normal para que `this` sea la petición actual:

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

Esto lee la última entrada de `x-forwarded-for`, que es la dirección que ve un único proxy bajo tu control que añade su entrada a la cabecera, como nginx con `$proxy_add_x_forwarded_for` o un balanceador de carga de AWS. Las entradas anteriores vienen del cliente y se pueden falsificar. Si hay más proxies de confianza delante, retrocede una entrada por proxy; si no hay ninguno, ignora la cabecera, ya que cualquier cliente puede enviarla.

### <a name="per-request-values-with-apply-true"></a> Valores por petición con `apply: true`

Con `{ apply: true }`, hapi llama a tu función una vez por cada petición nueva, con la petición como argumento, y asigna el valor devuelto a la propiedad. Úsalo cuando cada petición necesite su propio estado, como una búsqueda cacheada:

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

Un pre-handler, un hook `onPostAuth` y el handler pueden llamar a `request.loadAccount()`, y la cuenta se busca una sola vez por petición. Sin `apply`, la decoración es una única función compartida por todas las peticiones, así que no hay un sitio por petición donde guardar `pending`; una variable fuera de la función filtraría la cuenta de la primera petición a todas las demás.

|                     | Sin opciones                              | Con `apply: true`                                           |
| ------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| Se crea             | una vez, en el prototipo de la petición   | una vez por petición, al construir el objeto de la petición |
| Estado por petición | ninguno, usa `this` para leer la petición | sí, guardado en el closure                                  |
| Coste por petición  | ninguno                                   | tu función se ejecuta en cada petición                      |
| Ejemplo real        | `request.render()` de vision              | `request.cookieAuth` de @hapi/cookie, `request.yar` de yar  |

Las funciones `apply` se ejecutan en cada petición, incluidas las de rutas que nunca usan el valor. Mantenlas ligeras: crea el closure y haz el trabajo la primera vez que se use el valor, como hace `loadAccount()`.

## <a name="toolkit"></a> Decoraciones del toolkit: helpers de respuesta

Una decoración del toolkit añade un método a `h`. Usa una `function` normal: `this` es el toolkit, así que `this.response()` construye una respuesta y `this.request` es la petición actual. Esta da a todas las rutas de listado la misma convención de paginación:

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

`h.paginated()` envía una página de elementos con una cabecera `x-total-count`, de modo que los clientes leen el total de la misma forma en todas las rutas de listado. Las decoraciones del toolkit son un buen sitio para las convenciones de respuesta que tu API repite, como esta cabecera o un formato común de error. Cómo convierte hapi el valor devuelto en bytes se explica en [serialización de respuestas](/tutorials/es_ES/response-marshalling).

## <a name="handler"></a> Decoraciones de handler: tipos de handler propios

Una decoración de handler permite que las rutas describan su handler como un objeto en lugar de escribir una función, como `handler: { file: 'index.html' }`. Úsala cuando muchas rutas compartan el mismo comportamiento y solo cambie la configuración.

La decoración es una función `(route, options)` a la que hapi llama una vez por ruta, cuando se añade la ruta. Devuelve el handler real. Esta redirige URLs antiguas:

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

La propiedad opcional `defaults` fija opciones de ruta para todas las rutas que usan el handler; aquí, las redirecciones nunca requieren autenticación. `defaults` también puede ser una función del método HTTP: h2o2 usa una para que las rutas `{ proxy }` se salten el análisis del payload y, en su lugar, transmitan el cuerpo en streaming al servidor de destino.

Como hapi construye el handler cuando se añade la ruta, la decoración de handler tiene que existir antes de que ninguna ruta la use. Registra primero el plugin que la define.

## <a name="response"></a> Decoraciones de respuesta

Las decoraciones `'response'` añaden un método a cada objeto response, incluidas las respuestas de error y las construidas con `request.generateResponse()`. Rara vez hacen falta. Para cambiar las respuestas en toda la aplicación, usa un [hook del ciclo de vida](/tutorials/es_ES/lifecycle-hooks) `onPreResponse`.

## <a name="extend"></a> Envolver una decoración existente

`{ extend: true }` sustituye una decoración existente por una versión envuelta. Tu función recibe la decoración actual y devuelve la nueva. Un uso habitual es añadir datos a la decoración de otro plugin sin cambiar su código. Esto envuelve `h.view()` de vision para que cada plantilla reciba el usuario autenticado:

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

El plugin que define la decoración tiene que registrarse primero; extender una decoración que todavía no existe lanza un error. Las decoraciones de handler no se pueden extender.

## <a name="rules"></a> Reglas que hapi impone

Las decoraciones pertenecen a todo el servidor, no al plugin que las añadió. Una decoración añadida dentro de un plugin es visible para el servidor raíz y para todos los demás plugins. hapi lanza un error en cuanto una decoración o una ruta incumple una de estas reglas:

| Error cometido                                        | Mensaje                                                           |
| ----------------------------------------------------- | ----------------------------------------------------------------- |
| Dos plugins decoran el mismo nombre                   | `Server decoration already defined: todos`                        |
| El nombre empieza por guion bajo                      | `Property name cannot begin with an underscore: _cache`           |
| El nombre es una propiedad integrada                  | `Cannot override the built-in request interface decoration: auth` |
| Una ruta usa un tipo de handler que nadie ha decorado | `Unknown handler: moved`                                          |
| `extend: true` sobre un nombre que no existe          | `Cannot extend missing toolkit decoration: view`                  |

Como los nombres son globales, da a las decoraciones de los plugins reutilizables un nombre específico, o deja que los usuarios lo configuren, como hace @hapi/cookie con su opción `requestDecoratorName`. [`server.decorations`](/api#server-decorations) lista los nombres que ya están en uso.

Las decoraciones de servidor se copian en el objeto `server` propio de cada plugin, así que dentro de una decoración `this` es el servidor del plugin que la llama. vision se apoya en esto: `server.render()` busca las vistas configuradas en el plugin que la llama, de modo que dos plugins pueden tener cada uno sus propias plantillas.

## <a name="bootstrap"></a> Arranque con decoraciones

Los plugins suelen decorar dentro de `register()`, así que la decoración existe en cuanto se resuelve `server.register()`. Un plugin que usa la decoración de otro plugin solo en los handlers puede registrarse en cualquier orden, ya que los handlers se ejecutan después de arrancar el servidor. Uno que la usa dentro de su propio `register()` debe registrarse después del plugin que la añade.

- La propiedad `dependencies: ['todo-store']` de un plugin solo hace que hapi compruebe, en [`server.initialize()`](/api#await-server-initialize) o `server.start()`, que el otro plugin se ha registrado. No cambia el orden en que se registran los plugins.
- El código que usa la decoración de otro plugin mientras arranca el servidor, como precargar una caché o crear tablas, va en un callback de [`server.dependency()`](/api#server-dependency-dependencies-after). hapi lo ejecuta en la fase `onPreStart`, después de los plugins de los que depende, sea cual sea el orden de registro:

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

El orden completo de arranque está en [Dependencias](/tutorials/es_ES/plugins#dependencies), en el tutorial de plugins, y en [Hooks del servidor](/tutorials/es_ES/lifecycle-hooks#server-hooks).

## <a name="typescript"></a> TypeScript

hapi exporta una interfaz por cada objeto que puedes decorar. Añade tu decoración con un bloque `declare module '@hapi/hapi'`, en el mismo fichero que la llamada a `server.decorate()`, para que el tipo y el código vayan juntos:

| `type`      | Interfaz que extender | Ejemplo                                                                                       |
| ----------- | --------------------- | --------------------------------------------------------------------------------------------- |
| `'server'`  | `Server`              | `interface Server { todos: TodoStore }`                                                       |
| `'request'` | `Request`             | `interface Request { loadAccount: () => Promise<Account \| null> }`                           |
| `'toolkit'` | `ResponseToolkit`     | `interface ResponseToolkit { paginated: (items: object[], total: number) => ResponseObject }` |
| `'handler'` | `HandlerDecorations`  | `interface HandlerDecorations { moved?: MovedOptions }`                                       |

Las propiedades de las decoraciones de handler tienen que ser opcionales; si no, todas las rutas tendrían que fijarlas. Los propios tipos de hapi usan el mismo mecanismo para otros datos específicos de la aplicación: `ServerApplicationState` tipa `server.app`, `RequestApplicationState` tipa `request.app`, `PluginProperties` tipa `server.plugins` y `PluginsStates` tipa `request.plugins`.

Consulta el [tutorial de plugins](/tutorials/es_ES/plugins) para empaquetar estas decoraciones como plugin, y la [referencia de la API](/api#server-decorate-type-property-method-options) para la firma completa de `server.decorate()`.
