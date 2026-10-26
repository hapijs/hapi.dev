---
title: Servir ficheros
---

<TutorialLang />

# Servir contenido estático

_Este tutorial es compatible con hapi v21 y versiones posteriores_

## <a name="overview"></a> Introducción

hapi sirve ficheros del disco a través del plugin [inert](/module/inert). Instálalo:

```sh
npm install @hapi/inert
```

## <a name="inert"></a> Inert

Al registrar inert tienes tres formas de enviar ficheros:

| Qué                 | Para qué sirve                                                     |
| ------------------- | ------------------------------------------------------------------ |
| `h.file(path)`      | enviar un fichero desde dentro de un handler, después de tu lógica |
| handler `file`      | una ruta que siempre sirve un mismo fichero                        |
| handler `directory` | una ruta que sirve todos los ficheros de una carpeta               |

Importar `@hapi/inert` también añade todo esto a los tipos de TypeScript de hapi, así que `h.file()` y los handlers `file` y `directory` pasan la comprobación de tipos.

## <a name="path"></a> Rutas relativas

Configura `routes.files.relativeTo` una vez en el servidor, y todas las rutas de ficheros de tus rutas se resolverán a partir de esa carpeta:

```ts
import Path from 'node:path';
import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';

const server = Hapi.server({
    routes: {
        files: {
            relativeTo: Path.join(import.meta.dirname, 'public'),
        },
    },
});

await server.register(Inert);

server.route({
    method: 'GET',
    path: '/picture.jpg',
    handler: (request, h) => {
        return h.file('picture.jpg');
    },
});

await server.start();
console.log('Server running at:', server.info.uri);
```

Por defecto, `routes.files.relativeTo` es el directorio de trabajo del proceso. Cualquier opción bajo `routes` del servidor se aplica a todas las rutas, y una ruta puede sobrescribirla en sus propias `options.files`.

## <a name="hfile"></a> `h.file(path, [options])`

[`h.file()`](/module/inert#h-file-path-options) envía un fichero como respuesta. Las rutas están confinadas a la carpeta `relativeTo`: una ruta que se resuelve fuera de ella, como `'../secrets.json'` o una ruta absoluta a otro sitio del disco, responde `403 Forbidden`. Eso impide que un parámetro de la petición lea ficheros arbitrarios:

```ts
server.route<{ Params: { filename: string } }>({
    method: 'GET',
    path: '/download/{filename}',
    handler: (request, h) => {
        return h.file(request.params.filename, { mode: 'attachment' });
    },
});
```

`/download/report.pdf` envía `public/report.pdf` como descarga, y `/download/..%2Fserver.ts` recibe un `403`. Para enviar a propósito un fichero de fuera de la carpeta, pasa `confine: false`, y nunca con una ruta construida a partir de datos del usuario.

## <a name="filehandler"></a> Handler file

Cuando una ruta siempre sirve el mismo fichero, usa el handler `file` en lugar de escribir una función handler:

```ts
server.route({
    method: 'GET',
    path: '/picture.jpg',
    handler: {
        file: 'picture.jpg',
    },
});
```

### <a name="fileoptions"></a> Opciones del handler file

La forma de objeto acepta las mismas opciones que `h.file()`:

```ts
server.route({
    method: 'GET',
    path: '/script.js',
    handler: {
        file: {
            path: 'script.js',
            filename: 'client.js',
            mode: 'attachment',
            lookupCompressed: true,
        },
    },
});
```

| Opción             | Efecto                                                                                                                                                                                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `path`             | el fichero que se envía; también acepta una función `(request) => path`                                                                                                                                                                                                                          |
| `mode`             | `'attachment'` (descarga) o `'inline'`; pone la cabecera `Content-Disposition`                                                                                                                                                                                                                   |
| `filename`         | el nombre del fichero en `Content-Disposition`, aquí `client.js` en lugar de `script.js`                                                                                                                                                                                                         |
| `lookupCompressed` | sirve `script.js.gz` cuando existe y el cliente acepta gzip; `lookupMap` sustituye al `{ gzip: '.gz' }` por defecto, así que enumera todas las codificaciones, como `{ gzip: '.gz', br: '.br' }` (`br` también necesita [`server.encoder()`](/tutorials/es_ES/response-marshalling#compression)) |
| `confine`          | `true` (por defecto) mantiene las rutas dentro de `relativeTo`; `false` permite cualquier ruta                                                                                                                                                                                                   |
| `etagMethod`       | `'hash'` (por defecto), `'simple'` (tamaño y fecha de modificación, más barato) o `false`                                                                                                                                                                                                        |

La lista completa está en la [API de inert](/module/inert#the-file-handler).

## <a name="directoryhandler"></a> Handler directory

El handler `directory` sirve una carpeta entera desde una sola ruta. El path tiene que terminar en un parámetro, y el valor del parámetro es el fichero que se busca. El parámetro determina a qué profundidad sirve la ruta: `{param}` sirve un nivel, `{param?}` sirve también la raíz de la carpeta, `{param*}` sirve cualquier profundidad y `{param*2}` sirve exactamente dos niveles:

```ts
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'directory-path-here',
        },
    },
});
```

### <a name="directoryoptions"></a> Opciones del handler directory

Para cada petición, inert resuelve el fichero así:

```mermaid
flowchart TD
    R["petición /docs"] --> F{"¿es un fichero?"}
    F -->|sí| S[envía el fichero]
    F -->|"no existe"| E{"¿hay defaultExtension?"}
    E -->|sí| X["prueba /docs.html"]
    E -->|no| N[404]
    F -->|"es un directorio"| T{"¿barra final?"}
    T -->|no| RD["302 a /docs/"]
    T -->|sí| I{"¿existe el fichero índice?"}
    I -->|sí| SI[envía index.html]
    I -->|no| L{"¿listing: true?"}
    L -->|sí| HL[envía un listado HTML]
    L -->|no| FB[403]
```

| Opción             | Por defecto | Efecto                                                                                                         |
| ------------------ | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `path`             | obligatoria | la carpeta, un array de carpetas que se prueban en orden, o una función `(request) => path`                    |
| `index`            | `true`      | sirve `index.html` para un directorio; un string o un array indica otros ficheros índice; `false` lo desactiva |
| `listing`          | `false`     | muestra un listado HTML para un directorio sin fichero índice                                                  |
| `showHidden`       | `false`     | incluye los ficheros ocultos en los listados y los sirve                                                       |
| `redirectToSlash`  | `true`      | redirige `/docs` a `/docs/` cuando `docs` es un directorio                                                     |
| `defaultExtension` | ninguna     | cuando no se encuentra `/about`, prueba `/about.html`                                                          |
| `lookupCompressed` | `false`     | sirve ficheros `.gz` precomprimidos, igual que la opción del handler `file`                                    |

Con `index: ['index.html', 'default.html']`, una petición a un directorio prueba primero `index.html` y después `default.html`.

## <a name="fileserver"></a> Servidor de ficheros estáticos

Un servidor completo que sirve la carpeta `public` en la raíz del sitio:

```ts
import Path from 'node:path';
import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';

const server = Hapi.server({
    port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(import.meta.dirname, 'public'),
        },
    },
});

await server.register(Inert);

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            defaultExtension: 'html',
        },
    },
});

await server.start();
console.log('Server running at:', server.info.uri);
```

- `path: '.'` hace que el handler apunte a `relativeTo`, la carpeta `public`.
- `/` sirve `public/index.html`, y `/docs` redirige a `/docs/`, que sirve `public/docs/index.html`.
- `defaultExtension: 'html'` hace que `/about` sirva `public/about.html`, así que tus URLs no necesitan `.html`.
- Como `/{param*}` es el path menos específico posible, cualquier otra ruta que añadas, como `/api/users`, sigue respondiendo a sus propias peticiones. Consulta [qué ruta gana](/tutorials/es_ES/routing#specificity).
