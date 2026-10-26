---
title: Primeros pasos
---

<TutorialLang />

# Primeros pasos

_Este tutorial es compatible con hapi v21 y versiones posteriores_

## <a name="overview"></a> Introducción

Este tutorial monta un servidor hapi básico que muestra "Hello World!" en el navegador.

## <a name="installing"></a> Instalar hapi

```sh
mkdir myproject
cd myproject
npm init -y               # creates package.json
npm pkg set type=module   # makes Node.js treat your files as ES modules
npm install @hapi/hapi
```

Los ejemplos de estos tutoriales están escritos en TypeScript, pero TypeScript es opcional. hapi funciona igual desde JavaScript puro: quita de un ejemplo las anotaciones de tipo, las líneas `import type`, los bloques `interface` y `declare module` y los argumentos de tipo como `server.route<...>`, y guárdalo como fichero `.js`. Consulta [Usar TypeScript](#typescript) para configurar la comprobación de tipos.

## <a name="server"></a> Crear un servidor

Un servidor hapi muy básico tiene este aspecto:

```ts
import Hapi from '@hapi/hapi';

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
```

`Hapi.server()` crea el servidor y `server.start()` lo pone a escuchar. El listener de `unhandledRejection` detiene el proceso si `init()` falla, por ejemplo cuando el puerto ya está en uso.

`host` decide en qué interfaz de red escucha el servidor:

| `host`        | Accesible desde                                                |
| ------------- | -------------------------------------------------------------- |
| `'localhost'` | solo esta máquina; la opción más segura para desarrollo        |
| `'0.0.0.0'`   | todas las interfaces; necesario dentro de un contenedor Docker |
| sin indicar   | todas las interfaces (el valor por defecto de hapi)            |

También puedes escuchar en un socket Unix o en una tubería con nombre (named pipe) de Windows; consulta [`server.options.port`](/api#server-options-port).

## <a name="routes"></a> Añadir rutas

Añade una ruta que devuelva "Hello World!":

```ts
import Hapi from '@hapi/hapi';

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        },
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
```

Guarda lo anterior como `index.ts` y arranca el servidor:

```sh
node index.ts
```

Node.js 22.18 y posteriores ejecutan ficheros `.ts` directamente, sin paso de compilación. Este ejemplo no tiene anotaciones de tipo, así que también funciona guardarlo como `index.js` y ejecutar `node index.js`. Abre `http://localhost:3000` y verás `Hello World!`.

Una ruta tiene tres propiedades obligatorias:

| Propiedad | Qué hace                                                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `method`  | El método HTTP: `'GET'`, `'POST'`, un array como `['GET', 'POST']` o `'*'` para cualquier método.                                  |
| `path`    | La ruta de la URL. Puede contener parámetros como `/users/{id}`; consulta el [tutorial de enrutamiento](/tutorials/es_ES/routing). |
| `handler` | La función que genera la respuesta. Devuelve un valor, devuelve una promesa o lanza un error.                                      |

## <a name="typescript"></a> Usar TypeScript

Esta sección es opcional. hapi incluye sus propios tipos de TypeScript, así que no hay ningún paquete `@types/hapi__hapi` que instalar.

Node.js ejecuta los ejemplos eliminando los tipos, cosa que solo los quita; no los comprueba. Para comprobarlos, instala el compilador de TypeScript y los tipos de Node.js:

```sh
npm install --save-dev typescript @types/node
```

Después añade un `tsconfig.json`:

```json
{
    "compilerOptions": {
        "target": "esnext",
        "module": "nodenext",
        "strict": true,
        "noEmit": true,
        "erasableSyntaxOnly": true,
        "verbatimModuleSyntax": true,
        "allowImportingTsExtensions": true
    }
}
```

Ejecuta `npx tsc` cuando quieras comprobar los tipos. `erasableSyntaxOnly` y `verbatimModuleSyntax` rechazan las características de TypeScript que Node.js no puede eliminar, como `enum` y las importaciones de tipos escritas sin la palabra clave `type`.

En la ruta anterior, `request` y `h` no necesitan anotaciones de tipo: TypeScript los infiere como `Request` y `ResponseToolkit` de hapi a partir de la firma de `server.route()`. Anótalos solo cuando escribas un handler fuera de la configuración de una ruta, usando los tipos que exporta `@hapi/hapi`:

```ts
import type { Request, ResponseToolkit } from '@hapi/hapi';

const hello = (request: Request, h: ResponseToolkit) => {
    return 'Hello World!';
};
```

## <a name="everything"></a> Todo lo demás

Este tutorial es mínimo a propósito. Buenos siguientes pasos:

- [Plugins](/tutorials/es_ES/plugins): divide tu aplicación en piezas reutilizables.
- [Enrutamiento](/tutorials/es_ES/routing): parámetros de ruta, métodos y opciones de ruta.
- [Hooks del ciclo de vida](/tutorials/es_ES/lifecycle-hooks): ejecuta código en cada paso de una petición y al arrancar y detener el servidor.
- [Decoradores](/tutorials/es_ES/decorators): añade tus propios métodos al servidor, a la petición y al response toolkit.
- [Serialización de respuestas](/tutorials/es_ES/response-marshalling): cómo el valor que devuelve un handler se convierte en una respuesta HTTP.
- [Testing](/tutorials/es_ES/testing): prueba rutas sin abrir un puerto.

Todo lo demás está documentado en la [referencia de la API](/api). Haz tus preguntas en [GitHub](https://github.com/hapijs/hapi/issues) o en el [Slack de hapi](https://join.slack.com/t/hapihour/shared_invite/zt-g5ortpsk-ErlnRA2rUcPIWES21oXBOg).
