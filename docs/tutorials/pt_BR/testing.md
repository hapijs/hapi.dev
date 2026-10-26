---
title: Testes
---

<TutorialLang />

# Testes

_Este tutorial é compatível com o hapi v21 e versões mais recentes_

## <a name="overview"></a> Visão geral

O hapi consegue testar rotas sem abrir uma porta. `server.inject()` envia uma requisição simulada por todo o ciclo de vida da requisição (roteamento, autenticação, validação, o handler e a resposta) e entrega a resposta para você, sem envolver a rede. Os testes rodam rápido e nunca disputam portas.

Este tutorial usa o [lab](/module/lab) como test runner e o [code](/module/code) para as asserções, mas `server.inject()` funciona do mesmo jeito com [Mocha](https://mochajs.org/), [Jest](https://jestjs.io/), [Vitest](https://vitest.dev/) ou o test runner do Node.js.

```sh
npm install --save-dev @hapi/lab @hapi/code
```

## <a name="server"></a> Configurando o servidor

Mantenha o código que monta o servidor separado do código que o inicia. Em produção, o servidor é iniciado em uma porta; os testes apenas o inicializam e enviam requisições com `server.inject()`:

```
myproject/
├── index.ts            # production entry point: calls start()
├── lib/
│   └── server.ts       # builds the server, exports init() and start()
├── test/
│   └── example.test.ts # calls init() and server.inject()
└── package.json
```

`lib/server.ts` monta um servidor novo a cada chamada, então cada teste recebe o próprio servidor, sem estado sobrando do teste anterior:

```ts
import Hapi from '@hapi/hapi';

const createServer = () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function () {
            return 'Hello World!';
        },
    });

    return server;
};

export const init = async () => {
    const server = createServer();
    await server.initialize();
    return server;
};

export const start = async () => {
    const server = createServer();
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};
```

O ponto de entrada de produção apenas inicia o servidor:

```ts
import { start } from './lib/server.ts';

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();
```

A diferença entre as duas funções:

|                                        | [`server.initialize()`](/api#await-server-initialize) | [`server.start()`](/api#await-server-start) |
| -------------------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| Verifica as dependências dos plugins   | sim                                                   | sim                                         |
| Inicia os caches                       | sim                                                   | sim                                         |
| Executa as extensões `onPreStart`      | sim                                                   | sim                                         |
| Escuta na porta                        | não                                                   | sim                                         |
| Emite `'start'`, executa `onPostStart` | não                                                   | sim                                         |

Os testes usam `initialize()` para que os caches e a configuração em `onPreStart` rodem exatamente como em produção, sem ocupar uma porta.

## <a name="writingTest"></a> Escrevendo um teste de rota

Crie `test/example.test.ts`:

```ts
import Lab from '@hapi/lab';
import { expect } from '@hapi/code';

import { init } from '../lib/server.ts';

import type { Server } from '@hapi/hapi';

export const lab = Lab.script();
const { afterEach, beforeEach, describe, it } = lab;

describe('GET /', () => {
    let server: Server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/',
        });

        expect(res.statusCode).to.equal(200);
        expect(res.payload).to.equal('Hello World!');
    });
});
```

- O lab encontra os testes pelo script `lab` exportado.
- `describe()` agrupa testes, e `it()` define um teste. `beforeEach()` e `afterEach()` rodam antes e depois de cada teste.
- `server` é tipado com o tipo `Server` do hapi porque só recebe o valor depois, em `beforeEach()`.
- `server.stop()` depois de cada teste para os caches e executa as extensões `onPreStop` e `onPostStop`, então nada vaza de um teste para outro.

### <a name="what-server-inject-gives-you"></a> O que `server.inject()` entrega

`server.inject()` recebe a requisição como um objeto e retorna a resposta:

| Opção da requisição | Use para                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `method`, `url`     | A rota a chamar.                                                                                                          |
| `payload`           | O corpo da requisição. Objetos são enviados como JSON.                                                                    |
| `headers`           | Headers da requisição, como `authorization` ou `cookie`.                                                                  |
| `auth`              | `{ strategy, credentials }` para pular a strategy de autenticação e testar uma rota protegida como um usuário específico. |

| Propriedade da resposta | Contém                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| `statusCode`            | O status code HTTP.                                                                              |
| `headers`               | Os headers da resposta.                                                                          |
| `payload`               | O corpo da resposta como string, exatamente como um cliente o receberia.                         |
| `result`                | O valor que o handler retornou, antes de ser serializado. Compare objetos com este.              |
| `request`               | O objeto de requisição do hapi, para verificar `request.auth`, `request.app` e assim por diante. |

Veja [`server.inject()`](/api#await-server-inject-options) para todas as opções.

## <a name="running"></a> Executando os testes

O lab só descobre sozinho arquivos `.js`, `.mjs` e `.cjs`, então passe os arquivos de teste TypeScript como argumentos. Adicione um script ao `package.json`:

```json
{
    "scripts": {
        "test": "lab -v test/*.test.ts"
    }
}
```

Depois rode `npm test`. O Node.js remove os tipos quando o lab importa os arquivos, então não há etapa de build.

- Rode o lab sem `--typescript`, `-t` ou `-c`; o Node.js já cuida do TypeScript.
- Para medir a cobertura, instale o [c8](https://github.com/bcoe/c8) com `npm install --save-dev c8` e rode o lab por meio dele: `c8 lab test/*.test.ts`.
