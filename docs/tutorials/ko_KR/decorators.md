---
title: 데코레이터
---

<TutorialLang />

# 데코레이터

_이 튜토리얼은 hapi v21 이상과 호환됩니다_

## <a name="overview"></a> 개요

데코레이션은 hapi 객체 중 하나에 여러분이 정의한 속성을 추가합니다. 한 번 데코레이트하면 앱의 모든 곳에서 새 속성을 사용할 수 있습니다. 플러그인에서는 `server.todos`, 핸들러에서는 `request.loadAccount()`, 응답을 만들 때는 `h.paginated()`처럼요.

대부분의 hapi 플러그인은 데코레이션을 기반으로 만들어집니다. `@hapi/vision`을 등록하면 `h.view()`가 생기는 것은 vision이 응답 툴킷을 데코레이트했기 때문입니다. `@hapi/inert`를 등록하면 `handler: { file: 'index.html' }`이 동작하는 것은 inert가 라우트 핸들러를 데코레이트했기 때문입니다.

데코레이션은 [`server.decorate(type, property, method, [options])`](/api#server-decorate-type-property-method-options)로 추가합니다. `type`은 무엇에 추가할지 정합니다.

| `type`       | 추가 대상                         | 실제 예                                                                                                       |
| ------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `'server'`   | `server` 객체                     | vision의 `server.views()`와 `server.render()`, nes의 `server.publish()`, yar의 `server.yar`                   |
| `'request'`  | 모든 `request` 객체               | vision의 `request.render()`, @hapi/cookie의 `request.cookieAuth`, yar의 `request.yar`, nes의 `request.socket` |
| `'toolkit'`  | 응답 툴킷 `h`                     | vision의 `h.view()`, inert의 `h.file()`, h2o2의 `h.proxy()`                                                   |
| `'handler'`  | 라우트에서 쓸 수 있는 핸들러 유형 | vision의 `{ view }`, inert의 `{ file }`과 `{ directory }`, h2o2의 `{ proxy }`                                 |
| `'response'` | 모든 응답 객체                    | 위 hapi 플러그인 중에는 없음. 필요한 경우가 드묾                                                              |

데코레이션은 [라이프사이클 훅](/tutorials/ko_KR/lifecycle-hooks)과 함께 쓰이는 경우가 많습니다. 예를 들어 @hapi/cookie는 데코레이션으로 `request.cookieAuth`를 추가하고 `onPreAuth` 훅에서 값을 채웁니다.

## <a name="server"></a> 서버 데코레이션: 서비스 공유하기

가장 흔한 데코레이션은 데이터베이스 클라이언트, 메일 발송기, 서비스처럼 객체 하나를 앱 전체에 공유하는 것입니다. 플러그인이 객체를 한 번 만들고 그 객체로 서버를 데코레이트합니다. 핸들러는 `request.server`를 통해, 다른 플러그인은 각자의 `server` 인자를 통해 이 객체에 접근합니다.

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

`declare module` 블록은 새 속성을 TypeScript에 알려 줍니다. hapi는 자신의 객체를 확장 가능한 인터페이스로 내보내며, 이렇게 확장하면 어디서든 `server.todos`와 `request.server.todos`에 타입이 붙습니다. 데코레이션 유형별 인터페이스는 [TypeScript 섹션](#typescript)에 정리되어 있습니다.

### <a name="where"></a> 값은 어디에 두어야 할까?

hapi에는 공유 값을 둘 곳이 여러 군데 있으며, 데코레이션은 그중 하나일 뿐입니다.

| 값의 성격                                         | 둘 곳                                                                                       | 예                             |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------ |
| 라우트와 플러그인이 호출하는 메서드를 가진 서비스 | 서버 데코레이션                                                                             | `server.todos`                 |
| 인자별로 결과를 캐싱할 가치가 있는 함수           | [서버 메서드](/tutorials/ko_KR/server-methods)                                              | `server.methods.getWeather()`  |
| 어떤 코드든 읽고 쓰는 앱 전역 설정이나 상태       | [`server.app`](/api#server-app)                                                             | `server.app.config`            |
| 다른 플러그인이 가끔 읽기만 하는 플러그인 상태    | [`server.expose()`](/api#server-expose-key-value-options), `server.plugins[name]`으로 읽음  | `server.plugins['todo-store']` |
| 현재 요청을 읽는 헬퍼                             | 요청 데코레이션                                                                             | `request.clientIp()`           |
| 처음 사용할 때 만들어지는 요청별 상태             | `apply: true`를 사용한 요청 데코레이션                                                      | `request.loadAccount()`        |
| 훅이나 핸들러가 설정하는 요청별 데이터            | [`request.app`](/api#request-app), 플러그인에서는 [`request.plugins`](/api#request-plugins) | `onRequest`에서 설정한 id      |

값이 메서드를 가진 서비스이고, 모든 라우트가 필요로 하며, 짧고 타입이 지정된 이름으로 쓰고 싶다면 서버 데코레이션이 알맞습니다.

## <a name="request"></a> 요청 데코레이션

요청 데코레이션은 모든 요청에 속성을 추가합니다. 두 종류가 있으며, 차이는 값이 언제 만들어지느냐에 있습니다.

### <a name="methods-shared-by-every-request"></a> 모든 요청이 공유하는 메서드

옵션 없이 데코레이트하면 데코레이션은 요청 프로토타입에 한 번만 올라가고, 모든 요청이 이를 공유합니다. `this`가 현재 요청이 되도록 일반 `function`을 사용하세요.

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

이 코드는 `x-forwarded-for`의 마지막 항목을 읽습니다. 이는 헤더에 주소를 덧붙이는, 여러분이 관리하는 프록시 하나가 본 주소입니다. `$proxy_add_x_forwarded_for`를 쓰는 nginx나 AWS 로드 밸런서가 그런 예입니다. 그 앞의 항목은 클라이언트가 보낸 것이므로 위조될 수 있습니다. 신뢰하는 프록시가 더 있다면 프록시 하나당 한 항목씩 거슬러 세고, 프록시가 없다면 누구나 보낼 수 있는 헤더이므로 무시하세요.

### <a name="per-request-values-with-apply-true"></a> `apply: true`로 요청별 값 만들기

`{ apply: true }`를 지정하면 hapi는 새 요청마다 요청을 인자로 함수를 한 번 호출하고, 반환값을 속성에 할당합니다. 캐싱된 조회처럼 요청마다 고유한 상태가 필요할 때 사용하세요.

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

pre-handler, `onPostAuth` 훅, 핸들러 모두 `request.loadAccount()`를 호출할 수 있으며, 계정은 요청당 한 번만 조회됩니다. `apply`가 없으면 데코레이션은 모든 요청이 공유하는 함수 하나이므로 `pending`을 요청별로 둘 곳이 없습니다. 함수 바깥의 변수를 쓰면 첫 요청의 계정이 다른 모든 요청으로 새어 나갑니다.

|             | 옵션 없음                   | `apply: true`                                            |
| ----------- | --------------------------- | -------------------------------------------------------- |
| 생성 시점   | 요청 프로토타입에 한 번     | 요청마다 한 번, 요청 객체가 만들어질 때                  |
| 요청별 상태 | 없음. 요청은 `this`로 읽음  | 있음. 클로저에 보관                                      |
| 요청당 비용 | 없음                        | 매 요청마다 함수가 실행됨                                |
| 실제 예     | vision의 `request.render()` | @hapi/cookie의 `request.cookieAuth`, yar의 `request.yar` |

`apply` 함수는 값을 전혀 쓰지 않는 라우트의 요청을 포함해 모든 요청에서 실행됩니다. 가볍게 유지하세요. `loadAccount()`처럼 클로저만 만들어 두고, 실제 작업은 값을 처음 사용할 때 하는 것이 좋습니다.

## <a name="toolkit"></a> 툴킷 데코레이션: 응답 헬퍼

툴킷 데코레이션은 `h`에 메서드를 추가합니다. 일반 `function`을 사용하세요. `this`가 툴킷이므로 `this.response()`로 응답을 만들 수 있고 `this.request`는 현재 요청입니다. 다음 예는 모든 목록 라우트에 같은 페이지네이션 규칙을 적용합니다.

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

`h.paginated()`는 항목 한 페이지를 `x-total-count` 헤더와 함께 보내므로, 클라이언트는 모든 목록 라우트에서 같은 방식으로 전체 개수를 읽습니다. 이 헤더나 에러 응답 형식처럼 API에서 반복되는 응답 규칙은 툴킷 데코레이션으로 두기 좋습니다. hapi가 반환값을 바이트로 바꾸는 과정은 [응답 마샬링](/tutorials/ko_KR/response-marshalling)에서 다룹니다.

## <a name="handler"></a> 핸들러 데코레이션: 사용자 정의 핸들러 유형

핸들러 데코레이션을 사용하면 라우트가 함수를 작성하는 대신 `handler: { file: 'index.html' }`처럼 객체로 핸들러를 기술할 수 있습니다. 여러 라우트가 같은 동작을 공유하고 설정만 다를 때 사용하세요.

데코레이션은 `(route, options)` 함수이며, hapi는 라우트가 추가될 때 라우트마다 한 번 이 함수를 호출합니다. 이 함수가 실제 핸들러를 반환합니다. 다음 예는 예전 URL을 리다이렉트합니다.

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

선택 속성인 `defaults`는 이 핸들러를 사용하는 모든 라우트의 라우트 옵션을 설정합니다. 여기서는 리다이렉트에 인증이 필요 없게 합니다. `defaults`는 HTTP 메서드를 받는 함수일 수도 있습니다. h2o2는 이 방식으로 `{ proxy }` 라우트가 페이로드 파싱을 건너뛰고 본문을 업스트림 서버로 스트리밍하게 합니다.

hapi는 라우트를 추가할 때 핸들러를 만들기 때문에, 핸들러 데코레이션은 어떤 라우트가 사용하기 전에 존재해야 합니다. 이를 정의하는 플러그인을 먼저 등록하세요.

## <a name="response"></a> 응답 데코레이션

`'response'` 데코레이션은 에러 응답과 `request.generateResponse()`로 만든 응답을 포함해 모든 응답 객체에 메서드를 추가합니다. 필요한 경우는 드뭅니다. 앱 전체에서 응답을 바꾸려면 `onPreResponse` [라이프사이클 훅](/tutorials/ko_KR/lifecycle-hooks)을 사용하세요.

## <a name="extend"></a> 기존 데코레이션 감싸기

`{ extend: true }`는 기존 데코레이션을 감싼 버전으로 교체합니다. 함수는 현재 데코레이션을 받아 새 데코레이션을 반환합니다. 다른 플러그인의 코드를 바꾸지 않고 그 데코레이션에 데이터를 추가할 때 흔히 씁니다. 다음 예는 vision의 `h.view()`를 감싸서 모든 템플릿이 로그인한 사용자를 받게 합니다.

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

데코레이션을 정의하는 플러그인을 먼저 등록해야 합니다. 아직 없는 데코레이션을 확장하면 에러가 발생합니다. 핸들러 데코레이션은 확장할 수 없습니다.

## <a name="rules"></a> hapi가 강제하는 규칙

데코레이션은 추가한 플러그인이 아니라 서버 전체에 속합니다. 플러그인 안에서 추가한 데코레이션은 루트 서버와 다른 모든 플러그인에서도 보입니다. 데코레이션이나 라우트가 다음 규칙 중 하나를 어기면 hapi는 즉시 에러를 던집니다.

| 실수                                                 | 에러                                                              |
| ---------------------------------------------------- | ----------------------------------------------------------------- |
| 두 플러그인이 같은 이름을 데코레이트함               | `Server decoration already defined: todos`                        |
| 이름이 밑줄로 시작함                                 | `Property name cannot begin with an underscore: _cache`           |
| 이름이 내장 속성임                                   | `Cannot override the built-in request interface decoration: auth` |
| 라우트가 아무도 데코레이트하지 않은 핸들러 유형을 씀 | `Unknown handler: moved`                                          |
| 존재하지 않는 이름에 `extend: true`를 씀             | `Cannot extend missing toolkit decoration: view`                  |

이름은 전역이므로, 재사용할 플러그인의 데코레이션에는 구체적인 이름을 붙이거나, @hapi/cookie의 `requestDecoratorName` 옵션처럼 사용자가 이름을 정할 수 있게 하세요. 이미 사용 중인 이름은 [`server.decorations`](/api#server-decorations)에서 볼 수 있습니다.

서버 데코레이션은 각 플러그인의 `server` 객체로 복사되므로, 데코레이션 안에서 `this`는 그 데코레이션을 호출한 플러그인의 서버입니다. vision은 이 점을 활용합니다. `server.render()`는 호출한 플러그인에 설정된 뷰를 찾으므로, 두 플러그인이 각자의 템플릿을 가질 수 있습니다.

## <a name="bootstrap"></a> 데코레이션으로 부트스트랩하기

플러그인은 보통 `register()` 안에서 데코레이트하므로, `server.register()`가 끝나는 즉시 데코레이션이 존재합니다. 다른 플러그인의 데코레이션을 핸들러에서만 사용하는 플러그인은 등록 순서가 상관없습니다. 핸들러는 서버가 시작된 뒤에 실행되기 때문입니다. 반면 자신의 `register()` 안에서 사용하는 플러그인은 그 데코레이션을 추가하는 플러그인 다음에 등록해야 합니다.

- 플러그인의 `dependencies: ['todo-store']` 속성은 [`server.initialize()`](/api#await-server-initialize)나 `server.start()` 시점에 다른 플러그인이 등록되었는지 hapi가 확인하게 할 뿐입니다. 플러그인이 등록되는 순서를 바꾸지는 않습니다.
- 캐시 예열이나 테이블 생성처럼 서버가 부팅되는 동안 다른 플러그인의 데코레이션을 사용하는 코드는 [`server.dependency()`](/api#server-dependency-dependencies-after) 콜백에 두어야 합니다. hapi는 등록 순서와 관계없이, 의존하는 플러그인 다음에 `onPreStart` 단계에서 이 콜백을 실행합니다.

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

전체 시작 순서는 플러그인 튜토리얼의 [의존성](/tutorials/ko_KR/plugins#dependencies)과 [서버 훅](/tutorials/ko_KR/lifecycle-hooks#server-hooks)에 나와 있습니다.

## <a name="typescript"></a> TypeScript

hapi는 데코레이트할 수 있는 객체마다 인터페이스를 내보냅니다. `server.decorate()` 호출과 같은 파일에서 `declare module '@hapi/hapi'` 블록으로 데코레이션을 인터페이스에 추가하면, 타입과 코드가 함께 유지됩니다.

| `type`      | 확장할 인터페이스    | 예                                                                                            |
| ----------- | -------------------- | --------------------------------------------------------------------------------------------- |
| `'server'`  | `Server`             | `interface Server { todos: TodoStore }`                                                       |
| `'request'` | `Request`            | `interface Request { loadAccount: () => Promise<Account \| null> }`                           |
| `'toolkit'` | `ResponseToolkit`    | `interface ResponseToolkit { paginated: (items: object[], total: number) => ResponseObject }` |
| `'handler'` | `HandlerDecorations` | `interface HandlerDecorations { moved?: MovedOptions }`                                       |

핸들러 데코레이션 속성은 선택 속성이어야 합니다. 그렇지 않으면 모든 라우트가 이를 설정해야 합니다. hapi 자체 타입도 앱별 데이터에 같은 방식을 씁니다. `ServerApplicationState`는 `server.app`, `RequestApplicationState`는 `request.app`, `PluginProperties`는 `server.plugins`, `PluginsStates`는 `request.plugins`의 타입을 지정합니다.

이 데코레이션들을 플러그인으로 묶는 방법은 [플러그인 튜토리얼](/tutorials/ko_KR/plugins)을, `server.decorate()`의 전체 시그니처는 [API 레퍼런스](/api#server-decorate-type-property-method-options)를 참고하세요.
