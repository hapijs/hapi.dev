---
title: Servindo arquivos
---

<TutorialLang />

# Servindo conteúdo estático

_Este tutorial é compatível com o hapi v21 e versões mais recentes_

## <a name="overview"></a> Visão geral

O hapi serve arquivos do disco por meio do plugin [inert](/module/inert). Instale-o:

```sh
npm install @hapi/inert
```

## <a name="inert"></a> Inert

Registrar o inert adiciona três formas de enviar arquivos:

| O quê               | Use para                                                        |
| ------------------- | --------------------------------------------------------------- |
| `h.file(path)`      | enviar um arquivo de dentro de um handler, depois da sua lógica |
| handler `file`      | uma rota que sempre serve um único arquivo                      |
| handler `directory` | uma rota que serve todos os arquivos de uma pasta               |

Importar `@hapi/inert` também adiciona esses recursos aos tipos TypeScript do hapi, então `h.file()` e os handlers `file` e `directory` passam na verificação de tipos.

## <a name="path"></a> Caminhos relativos

Defina `routes.files.relativeTo` uma vez no servidor, e todo caminho de arquivo nas suas rotas é resolvido a partir dessa pasta:

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

O padrão de `routes.files.relativeTo` é o diretório de trabalho do processo. Qualquer opção em `routes` do servidor se aplica a todas as rotas, e uma rota pode sobrescrevê-la nas suas próprias `options.files`.

## <a name="hfile"></a> `h.file(path, [options])`

[`h.file()`](/module/inert#h-file-path-options) envia um arquivo como resposta. Os caminhos ficam confinados à pasta `relativeTo`: um caminho que resolve para fora dela, como `'../secrets.json'` ou um caminho absoluto em outro lugar do disco, responde `403 Forbidden`. Isso impede que um parâmetro da requisição leia arquivos arbitrários:

```ts
server.route<{ Params: { filename: string } }>({
    method: 'GET',
    path: '/download/{filename}',
    handler: (request, h) => {
        return h.file(request.params.filename, { mode: 'attachment' });
    },
});
```

`/download/report.pdf` envia `public/report.pdf` como download, e `/download/..%2Fserver.ts` recebe `403`. Para enviar de propósito um arquivo de fora da pasta, passe `confine: false`, e nunca com um caminho montado a partir de entrada do usuário.

## <a name="filehandler"></a> Handler de arquivo

Quando uma rota sempre serve o mesmo arquivo, use o handler `file` em vez de escrever uma função handler:

```ts
server.route({
    method: 'GET',
    path: '/picture.jpg',
    handler: {
        file: 'picture.jpg',
    },
});
```

### <a name="fileoptions"></a> Opções do handler de arquivo

A forma de objeto aceita as mesmas opções de `h.file()`:

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

| Opção              | Efeito                                                                                                                                                                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`             | o arquivo a enviar; também aceita uma função `(request) => path`                                                                                                                                                                                                                        |
| `mode`             | `'attachment'` (download) ou `'inline'`; define o header `Content-Disposition`                                                                                                                                                                                                          |
| `filename`         | o nome do arquivo em `Content-Disposition`, aqui `client.js` em vez de `script.js`                                                                                                                                                                                                      |
| `lookupCompressed` | serve `script.js.gz` quando ele existe e o cliente aceita gzip; `lookupMap` substitui o padrão `{ gzip: '.gz' }`, então liste todas as codificações, como `{ gzip: '.gz', br: '.br' }` (`br` também precisa de [`server.encoder()`](/tutorials/pt_BR/response-marshalling#compression)) |
| `confine`          | `true` (padrão) mantém os caminhos dentro de `relativeTo`; `false` permite qualquer caminho                                                                                                                                                                                             |
| `etagMethod`       | `'hash'` (padrão), `'simple'` (tamanho e data de modificação, mais barato) ou `false`                                                                                                                                                                                                   |

A lista completa está na [API do inert](/module/inert#the-file-handler).

## <a name="directoryhandler"></a> Handler de diretório

O handler `directory` serve uma pasta inteira a partir de uma única rota. O caminho precisa terminar com um parâmetro, e o valor do parâmetro é o arquivo a procurar. O parâmetro define a profundidade que a rota serve: `{param}` serve um nível, `{param?}` também serve a raiz da pasta, `{param*}` serve qualquer profundidade e `{param*2}` serve exatamente dois níveis:

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

### <a name="directoryoptions"></a> Opções do handler de diretório

Para cada requisição, o inert resolve o arquivo assim:

```mermaid
flowchart TD
    R["requisição /docs"] --> F{"é um arquivo?"}
    F -->|sim| S[envia o arquivo]
    F -->|"não encontrado"| E{"defaultExtension definida?"}
    E -->|sim| X["tenta /docs.html"]
    E -->|não| N[404]
    F -->|"um diretório"| T{"barra no final?"}
    T -->|não| RD["302 para /docs/"]
    T -->|sim| I{"o arquivo index existe?"}
    I -->|sim| SI[envia index.html]
    I -->|não| L{"listing: true?"}
    L -->|sim| HL[envia a listagem HTML]
    L -->|não| FB[403]
```

| Opção              | Padrão      | Efeito                                                                                                   |
| ------------------ | ----------- | -------------------------------------------------------------------------------------------------------- |
| `path`             | obrigatório | a pasta, um array de pastas testadas em ordem, ou uma função `(request) => path`                         |
| `index`            | `true`      | serve `index.html` para um diretório; uma string ou array define outros arquivos index; `false` desativa |
| `listing`          | `false`     | mostra uma listagem HTML para um diretório sem arquivo index                                             |
| `showHidden`       | `false`     | inclui arquivos ocultos nas listagens e os serve                                                         |
| `redirectToSlash`  | `true`      | redireciona `/docs` para `/docs/` quando `docs` é um diretório                                           |
| `defaultExtension` | nenhum      | quando `/about` não é encontrado, tenta `/about.html`                                                    |
| `lookupCompressed` | `false`     | serve arquivos `.gz` pré-comprimidos, igual à opção do handler `file`                                    |

Com `index: ['index.html', 'default.html']`, uma requisição de diretório tenta primeiro `index.html` e depois `default.html`.

## <a name="fileserver"></a> Servidor de arquivos estáticos

Um servidor completo que serve a pasta `public` na raiz do site:

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

- `path: '.'` aponta o handler para `relativeTo`, a pasta `public`.
- `/` serve `public/index.html`, e `/docs` redireciona para `/docs/`, que serve `public/docs/index.html`.
- `defaultExtension: 'html'` faz `/about` servir `public/about.html`, então suas URLs não precisam de `.html`.
- Como `/{param*}` é o caminho menos específico possível, qualquer outra rota que você adicionar, como `/api/users`, continua respondendo às próprias requisições. Veja [qual rota vence](/tutorials/pt_BR/routing#specificity).
