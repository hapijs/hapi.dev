---
title: Decorators
---

<TutorialLang />

# Decorators

_Este tutorial é compatível com hapi v21 e versões mais recentes_

## <a name="overview"></a> Visão geral

Uma decoração adiciona uma propriedade sua a um dos objetos do hapi. Depois de decorar, qualquer parte da sua aplicação pode usar a nova propriedade: `server.todos` em um plugin, `request.loadAccount()` em um handler, `h.paginated()` ao montar uma resposta.

A maioria dos plugins do hapi é construída sobre decorações. Quando você registra o `@hapi/vision`, `h.view()` existe porque o vision decorou o response toolkit. Quando você registra o `@hapi/inert`, `handler: { file: 'index.html' }` funciona porque o inert decorou os handlers de rota.

Você adiciona decorações com [`server.decorate(type, property, method, [options])`](/api#server-decorate-type-property-method-options). `type` escolhe o objeto ao qual você está adicionando:

| `type`       | Adiciona a                                 | Exemplos reais                                                                                                    |
| ------------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `'server'`   | o objeto `server`                          | `server.views()` e `server.render()` do vision, `server.publish()` do nes, `server.yar` do yar                    |
| `'request'`  | todo objeto `request`                      | `request.render()` do vision, `request.cookieAuth` do @hapi/cookie, `request.yar` do yar, `request.socket` do nes |
| `'toolkit'`  | o response toolkit `h`                     | `h.view()` do vision, `h.file()` do inert, `h.proxy()` do h2o2                                                    |
| `'handler'`  | os tipos de handler que uma rota pode usar | `{ view }` do vision, `{ file }` e `{ directory }` do inert, `{ proxy }` do h2o2                                  |
| `'response'` | todo objeto de resposta                    | nenhum dos plugins do hapi acima; raramente necessário                                                            |

Decorações muitas vezes trabalham junto com [lifecycle hooks](/tutorials/pt_BR/lifecycle-hooks): o @hapi/cookie, por exemplo, adiciona `request.cookieAuth` com uma decoração e o preenche com um hook `onPreAuth`.

## <a name="server"></a> Decorações de server: compartilhando um serviço

A decoração mais comum compartilha um objeto com a aplicação inteira, como um cliente de banco de dados, um serviço de e-mail ou um serviço de domínio. Um plugin o cria uma vez e decora o servidor com ele. Os handlers o acessam por `request.server`, e outros plugins pelo seu próprio argumento `server`.

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

O bloco `declare module` informa o TypeScript sobre a nova propriedade. O hapi exporta seus objetos como interfaces que você pode estender, e depois disso `server.todos` e `request.server.todos` ficam tipados em todo lugar. A [seção de TypeScript](#typescript) lista a interface de cada tipo de decoração.

### <a name="where"></a> Onde um valor deve ficar?

O hapi tem vários lugares para guardar valores compartilhados, e uma decoração é só um deles:

| O valor é                                                                | Guarde em                                                                                    | Exemplo                        |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------ |
| um serviço com métodos que rotas e plugins chamam                        | uma decoração de server                                                                      | `server.todos`                 |
| uma função cujos resultados valem a pena guardar em cache por argumentos | um [método de servidor](/tutorials/pt_BR/server-methods)                                     | `server.methods.getWeather()`  |
| configuração ou estado da aplicação, lido e escrito por qualquer código  | [`server.app`](/api#server-app)                                                              | `server.app.config`            |
| estado de plugin que outros plugins só leem de vez em quando             | [`server.expose()`](/api#server-expose-key-value-options), lido como `server.plugins[name]`  | `server.plugins['todo-store']` |
| um helper que lê a requisição atual                                      | uma decoração de request                                                                     | `request.clientIp()`           |
| estado por requisição criado no primeiro uso                             | uma decoração de request com `apply: true`                                                   | `request.loadAccount()`        |
| dados por requisição que um hook ou handler define                       | [`request.app`](/api#request-app), ou [`request.plugins`](/api#request-plugins) em um plugin | um id definido em `onRequest`  |

Uma decoração de server é a escolha certa quando o valor é um serviço com métodos, todas as rotas precisam dele e você quer um nome curto e tipado para ele.

## <a name="request"></a> Decorações de request

Uma decoração de request adiciona uma propriedade a toda requisição. Existem dois tipos, e a diferença está em quando o valor é criado.

### <a name="methods-shared-by-every-request"></a> Métodos compartilhados por todas as requisições

Sem opções, a decoração é colocada no prototype de request uma única vez, e todas as requisições a compartilham. Use uma `function` comum para que `this` seja a requisição atual:

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

Isso lê a última entrada de `x-forwarded-for`, que é o endereço visto por um único proxy sob seu controle que adiciona entradas ao header, como o nginx com `$proxy_add_x_forwarded_for` ou um load balancer da AWS. As entradas anteriores vêm do cliente e podem ser forjadas. Com mais proxies confiáveis na frente, volte uma entrada por proxy; sem nenhum, ignore o header, já que qualquer cliente pode enviá-lo.

### <a name="per-request-values-with-apply-true"></a> Valores por requisição com `apply: true`

Com `{ apply: true }`, o hapi chama sua função uma vez para cada nova requisição, passando a requisição como argumento, e atribui o valor retornado à propriedade. Use quando cada requisição precisa do seu próprio estado, como uma busca em cache:

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

Um pre-handler, um hook `onPostAuth` e o handler podem todos chamar `request.loadAccount()`, e a conta é buscada uma vez por requisição. Sem `apply`, a decoração é uma única função compartilhada por todas as requisições, então não existe um lugar por requisição para guardar `pending`; uma variável fora da função vazaria a conta da primeira requisição para todas as outras.

|                       | Sem opções                               | Com `apply: true`                                               |
| --------------------- | ---------------------------------------- | --------------------------------------------------------------- |
| Criado                | uma vez, no prototype de request         | uma vez por requisição, quando o objeto de requisição é montado |
| Estado por requisição | nenhum, use `this` para ler a requisição | sim, guardado na closure                                        |
| Custo por requisição  | nenhum                                   | sua função roda em toda requisição                              |
| Exemplo real          | `request.render()` do vision             | `request.cookieAuth` do @hapi/cookie, `request.yar` do yar      |

Funções com `apply` rodam em toda requisição, inclusive em requisições para rotas que nunca usam o valor. Mantenha-as baratas: crie a closure e faça o trabalho na primeira vez que o valor for usado, como `loadAccount()` faz.

## <a name="toolkit"></a> Decorações de toolkit: helpers de resposta

Uma decoração de toolkit adiciona um método a `h`. Use uma `function` comum: `this` é o toolkit, então `this.response()` monta uma resposta e `this.request` é a requisição atual. Esta dá a todas as rotas de listagem a mesma convenção de paginação:

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

`h.paginated()` envia uma página de itens com um header `x-total-count`, então os clientes leem o total da mesma forma em todas as rotas de listagem. Decorações de toolkit são um bom lugar para convenções de resposta que sua API repete, como esse header ou um envelope de erro. Como o hapi transforma o valor retornado em bytes é assunto de [Marshalling de respostas](/tutorials/pt_BR/response-marshalling).

## <a name="handler"></a> Decorações de handler: tipos de handler customizados

Uma decoração de handler permite que as rotas descrevam seu handler como um objeto em vez de escrever uma função, como `handler: { file: 'index.html' }`. Use quando muitas rotas compartilham o mesmo comportamento e só mudam a configuração.

A decoração é uma função `(route, options)` que o hapi chama uma vez por rota, quando a rota é adicionada. Ela retorna o handler de fato. Esta redireciona URLs antigas:

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

A propriedade opcional `defaults` define opções de rota para todas as rotas que usam o handler; aqui, redirecionamentos nunca exigem autenticação. `defaults` também pode ser uma função do método HTTP: o h2o2 usa uma para que as rotas `{ proxy }` pulem o parsing do payload e repassem o corpo em stream para o servidor upstream.

Como o hapi monta o handler quando a rota é adicionada, a decoração de handler precisa existir antes de qualquer rota usá-la. Registre primeiro o plugin que a define.

## <a name="response"></a> Decorações de response

Decorações `'response'` adicionam um método a todo objeto de resposta, inclusive respostas de erro e as montadas com `request.generateResponse()`. Raramente são necessárias. Para alterar respostas na aplicação inteira, use um [lifecycle hook](/tutorials/pt_BR/lifecycle-hooks) `onPreResponse`.

## <a name="extend"></a> Envolvendo uma decoração existente

`{ extend: true }` substitui uma decoração existente por uma versão que a envolve. Sua função recebe a decoração atual e retorna a nova. Um uso comum é adicionar dados à decoração de outro plugin sem mudar o código dele. Este exemplo envolve o `h.view()` do vision para que todo template receba o usuário logado:

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

O plugin que define a decoração precisa ser registrado primeiro; estender uma decoração que ainda não existe lança um erro. Decorações de handler não podem ser estendidas.

## <a name="rules"></a> Regras que o hapi impõe

As decorações pertencem ao servidor inteiro, não ao plugin que as adicionou. Uma decoração adicionada dentro de um plugin fica visível para o servidor raiz e para todos os outros plugins. O hapi lança um erro assim que uma decoração ou uma rota quebra uma destas regras:

| Erro cometido                                       | Mensagem                                                          |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| Dois plugins decoram o mesmo nome                   | `Server decoration already defined: todos`                        |
| O nome começa com underscore                        | `Property name cannot begin with an underscore: _cache`           |
| O nome é uma propriedade nativa                     | `Cannot override the built-in request interface decoration: auth` |
| Uma rota usa um tipo de handler que ninguém decorou | `Unknown handler: moved`                                          |
| `extend: true` em um nome que não existe            | `Cannot extend missing toolkit decoration: view`                  |

Como os nomes são globais, dê às decorações de plugins reutilizáveis um nome específico, ou deixe o usuário configurá-lo, como o @hapi/cookie faz com sua opção `requestDecoratorName`. [`server.decorations`](/api#server-decorations) lista os nomes já em uso.

As decorações de server são copiadas para o objeto `server` de cada plugin, então dentro de uma decoração `this` é o servidor do plugin que a chama. O vision depende disso: `server.render()` busca as views configuradas no plugin de quem chama, então dois plugins podem ter, cada um, seus próprios templates.

## <a name="bootstrap"></a> Inicialização com decorações

Os plugins normalmente decoram dentro de `register()`, então a decoração existe assim que `server.register()` resolve. Um plugin que usa a decoração de outro plugin só nos handlers pode ser registrado em qualquer ordem, já que os handlers rodam depois que o servidor inicia. Um que a usa dentro do seu próprio `register()` precisa ser registrado depois do plugin que a adiciona.

- A propriedade `dependencies: ['todo-store']` de um plugin só faz o hapi verificar, em [`server.initialize()`](/api#await-server-initialize) ou `server.start()`, que o outro plugin foi registrado. Ela não muda a ordem em que os plugins são registrados.
- Código que usa a decoração de outro plugin enquanto o servidor inicializa, como aquecer um cache ou criar tabelas, deve ficar em um callback de [`server.dependency()`](/api#server-dependency-dependencies-after). O hapi o executa na fase `onPreStart`, depois dos plugins dos quais ele depende, independentemente da ordem de registro:

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

A ordem completa de inicialização está em [Dependências](/tutorials/pt_BR/plugins#dependencies), no tutorial Plugins, e em [Server hooks](/tutorials/pt_BR/lifecycle-hooks#server-hooks).

## <a name="typescript"></a> TypeScript

O hapi exporta uma interface para cada objeto que você pode decorar. Adicione sua decoração a ela com um bloco `declare module '@hapi/hapi'`, no mesmo arquivo da chamada a `server.decorate()`, para que o tipo e o código fiquem juntos:

| `type`      | Interface a estender | Exemplo                                                                                       |
| ----------- | -------------------- | --------------------------------------------------------------------------------------------- |
| `'server'`  | `Server`             | `interface Server { todos: TodoStore }`                                                       |
| `'request'` | `Request`            | `interface Request { loadAccount: () => Promise<Account \| null> }`                           |
| `'toolkit'` | `ResponseToolkit`    | `interface ResponseToolkit { paginated: (items: object[], total: number) => ResponseObject }` |
| `'handler'` | `HandlerDecorations` | `interface HandlerDecorations { moved?: MovedOptions }`                                       |

As propriedades de decorações de handler precisam ser opcionais, senão toda rota teria que defini-las. Os próprios tipos do hapi usam o mesmo mecanismo para outros dados específicos da aplicação: `ServerApplicationState` tipa `server.app`, `RequestApplicationState` tipa `request.app`, `PluginProperties` tipa `server.plugins` e `PluginsStates` tipa `request.plugins`.

Veja o tutorial [Plugins](/tutorials/pt_BR/plugins) para empacotar essas decorações como um plugin, e a [referência da API](/api#server-decorate-type-property-method-options) para a assinatura completa de `server.decorate()`.
