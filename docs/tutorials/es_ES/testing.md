---
title: Testing
---

<TutorialLang />

# Testing

_Este tutorial es compatible con hapi v21 y versiones posteriores_

## <a name="overview"></a> Introducción

hapi puede testear rutas sin abrir un puerto. `server.inject()` envía una petición simulada a través de todo el ciclo de vida de la petición (enrutamiento, autenticación, validación, el handler y la respuesta) y te devuelve la respuesta, sin que intervenga la red. Los tests se ejecutan rápido y nunca chocan por los puertos.

Este tutorial usa [lab](/module/lab) como test runner y [code](/module/code) para las aserciones, pero `server.inject()` funciona igual desde [Mocha](https://mochajs.org/), [Jest](https://jestjs.io/), [Vitest](https://vitest.dev/) o el test runner de Node.js.

```sh
npm install --save-dev @hapi/lab @hapi/code
```

## <a name="server"></a> Preparar el servidor

Separa el código que construye el servidor del código que lo arranca. En producción el servidor se arranca en un puerto; los tests solo lo inicializan y envían peticiones con `server.inject()`:

```
myproject/
├── index.ts            # production entry point: calls start()
├── lib/
│   └── server.ts       # builds the server, exports init() and start()
├── test/
│   └── example.test.ts # calls init() and server.inject()
└── package.json
```

`lib/server.ts` construye un servidor nuevo en cada llamada, así que cada test tiene su propio servidor, sin estado heredado del test anterior:

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

El punto de entrada de producción solo arranca el servidor:

```ts
import { start } from './lib/server.ts';

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();
```

La diferencia entre las dos funciones:

|                                           | [`server.initialize()`](/api#await-server-initialize) | [`server.start()`](/api#await-server-start) |
| ----------------------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| Comprueba las dependencias de los plugins | sí                                                    | sí                                          |
| Arranca las cachés                        | sí                                                    | sí                                          |
| Ejecuta las extensiones `onPreStart`      | sí                                                    | sí                                          |
| Escucha en el puerto                      | no                                                    | sí                                          |
| Emite `'start'` y ejecuta `onPostStart`   | no                                                    | sí                                          |

Los tests usan `initialize()` para que las cachés y la preparación de `onPreStart` se ejecuten exactamente igual que en producción, sin ocupar un puerto.

## <a name="writingTest"></a> Escribir un test de una ruta

Crea `test/example.test.ts`:

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

- lab encuentra los tests a través del script `lab` exportado.
- `describe()` agrupa tests e `it()` define un test. `beforeEach()` y `afterEach()` se ejecutan antes y después de cada test.
- `server` tiene el tipo `Server` de hapi porque se asigna más tarde, en `beforeEach()`.
- `server.stop()` después de cada test detiene las cachés y ejecuta las extensiones `onPreStop` y `onPostStop`, para que nada se filtre de un test a otro.

### <a name="what-server-inject-gives-you"></a> Qué te da `server.inject()`

`server.inject()` recibe la petición como un objeto y devuelve la respuesta:

| Opción de la petición | Para qué sirve                                                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `method`, `url`       | La ruta a la que se llama.                                                                                                    |
| `payload`             | El cuerpo de la petición. Los objetos se envían como JSON.                                                                    |
| `headers`             | Cabeceras de la petición, como `authorization` o `cookie`.                                                                    |
| `auth`                | `{ strategy, credentials }` para saltarse la strategy de autenticación y testear una ruta protegida como un usuario concreto. |

| Propiedad de la respuesta | Contiene                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------- |
| `statusCode`              | El código de estado HTTP.                                                              |
| `headers`                 | Las cabeceras de la respuesta.                                                         |
| `payload`                 | El cuerpo de la respuesta como string, exactamente como lo recibiría un cliente.       |
| `result`                  | El valor que devolvió el handler, antes de serializarlo. Compara los objetos con este. |
| `request`                 | El objeto request de hapi, para comprobar `request.auth`, `request.app`, etc.          |

Consulta [`server.inject()`](/api#await-server-inject-options) para ver todas las opciones.

## <a name="running"></a> Ejecutar los tests

lab solo descubre por sí mismo ficheros `.js`, `.mjs` y `.cjs`, así que pasa los ficheros de test de TypeScript como argumentos. Añade un script a `package.json`:

```json
{
    "scripts": {
        "test": "lab -v test/*.test.ts"
    }
}
```

Después ejecuta `npm test`. Node.js elimina los tipos cuando lab importa los ficheros, así que no hay paso de compilación.

- Ejecuta lab sin `--typescript`, `-t` ni `-c`; Node.js ya se encarga de TypeScript.
- Para medir la cobertura, instala [c8](https://github.com/bcoe/c8) con `npm install --save-dev c8` y ejecuta lab con él: `c8 lab test/*.test.ts`.
