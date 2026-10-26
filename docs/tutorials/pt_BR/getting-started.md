---
title: Primeiros passos
---

<TutorialLang />

# Primeiros passos

_Este tutorial é compatível com hapi v21 e versões mais recentes_

## <a name="overview"></a> Visão geral

Este tutorial monta um servidor hapi básico que mostra "Hello World!" no seu navegador.

## <a name="installing"></a> Instalando o hapi

```sh
mkdir myproject
cd myproject
npm init -y               # creates package.json
npm pkg set type=module   # makes Node.js treat your files as ES modules
npm install @hapi/hapi
```

Os exemplos destes tutoriais são escritos em TypeScript, mas o TypeScript é opcional. O hapi funciona da mesma forma em JavaScript puro: remova do exemplo as anotações de tipo, as linhas `import type`, os blocos `interface` e `declare module` e os argumentos de tipo como `server.route<...>`, e salve o arquivo como `.js`. Veja [Usando TypeScript](#typescript) para configurar a checagem de tipos.

## <a name="server"></a> Criando um servidor

Um servidor hapi bem simples tem esta cara:

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

`Hapi.server()` cria o servidor e `server.start()` começa a escutar conexões. O handler de `unhandledRejection` encerra o processo se `init()` falhar, por exemplo quando a porta já está em uso.

`host` define em qual interface de rede o servidor escuta:

| `host`        | Acessível a partir de                                         |
| ------------- | ------------------------------------------------------------- |
| `'localhost'` | somente esta máquina; o padrão mais seguro em desenvolvimento |
| `'0.0.0.0'`   | todas as interfaces; necessário dentro de um container Docker |
| omitido       | todas as interfaces (o padrão do hapi)                        |

Também é possível escutar em um socket Unix ou em um named pipe do Windows; veja [`server.options.port`](/api#server-options-port).

## <a name="routes"></a> Adicionando rotas

Adicione uma rota que retorna "Hello World!":

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

Salve o código acima como `index.ts` e inicie o servidor:

```sh
node index.ts
```

O Node.js 22.18 e versões mais recentes executam arquivos `.ts` diretamente, sem etapa de build. Este exemplo não tem anotações de tipo, então salvá-lo como `index.js` e rodar `node index.js` também funciona. Acesse `http://localhost:3000` e você verá `Hello World!`.

Uma rota tem três propriedades obrigatórias:

| Propriedade | O que faz                                                                                                            |
| ----------- | -------------------------------------------------------------------------------------------------------------------- |
| `method`    | O método HTTP: `'GET'`, `'POST'`, um array como `['GET', 'POST']`, ou `'*'` para qualquer método.                    |
| `path`      | O caminho da URL. Pode conter parâmetros como `/users/{id}`; veja o tutorial [Roteamento](/tutorials/pt_BR/routing). |
| `handler`   | A função que produz a resposta. Ela retorna um valor, retorna uma promise ou lança um erro.                          |

## <a name="typescript"></a> Usando TypeScript

Esta seção é opcional. O hapi já vem com seus próprios tipos TypeScript, então não existe um pacote `@types/hapi__hapi` para instalar.

O Node.js executa os exemplos removendo os tipos, o que apenas os apaga; ele não os verifica. Para verificá-los, instale o compilador TypeScript e os tipos do Node.js:

```sh
npm install --save-dev typescript @types/node
```

Depois adicione um `tsconfig.json`:

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

Rode `npx tsc` sempre que quiser checar os tipos. `erasableSyntaxOnly` e `verbatimModuleSyntax` rejeitam os recursos do TypeScript que o Node.js não consegue remover, como `enum` e importações de tipo escritas sem a palavra-chave `type`.

Na rota acima, `request` e `h` não precisam de anotação de tipo: o TypeScript os infere como `Request` e `ResponseToolkit` do hapi a partir da assinatura de `server.route()`. Anote-os só quando escrever um handler fora da configuração de uma rota, usando os tipos exportados por `@hapi/hapi`:

```ts
import type { Request, ResponseToolkit } from '@hapi/hapi';

const hello = (request: Request, h: ResponseToolkit) => {
    return 'Hello World!';
};
```

## <a name="everything"></a> Todo o resto

Este tutorial foi mínimo de propósito. Bons próximos passos:

- [Plugins](/tutorials/pt_BR/plugins): divida sua aplicação em partes reutilizáveis.
- [Roteamento](/tutorials/pt_BR/routing): parâmetros de caminho, métodos e opções de rota.
- [Lifecycle hooks](/tutorials/pt_BR/lifecycle-hooks): execute código em cada etapa de uma requisição e na inicialização e no desligamento do servidor.
- [Decorators](/tutorials/pt_BR/decorators): adicione seus próprios métodos ao servidor, à requisição e ao response toolkit.
- [Marshalling de respostas](/tutorials/pt_BR/response-marshalling): como o valor retornado por um handler vira uma resposta HTTP.
- [Testes](/tutorials/pt_BR/testing): teste rotas sem abrir uma porta.

Todo o resto está documentado na [referência da API](/api). Tire dúvidas no [GitHub](https://github.com/hapijs/hapi/issues) ou no [Slack do hapi](https://join.slack.com/t/hapihour/shared_invite/zt-g5ortpsk-ErlnRA2rUcPIWES21oXBOg).
