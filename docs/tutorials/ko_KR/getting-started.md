---
title: 시작하기
---

<TutorialLang />

# 시작하기

_이 튜토리얼은 hapi v21 이상과 호환됩니다_

## <a name="overview"></a> 개요

이 튜토리얼에서는 브라우저에 "Hello World!"를 표시하는 기본 hapi 서버를 만듭니다.

## <a name="installing"></a> hapi 설치

```sh
mkdir myproject
cd myproject
npm init -y               # creates package.json
npm pkg set type=module   # makes Node.js treat your files as ES modules
npm install @hapi/hapi
```

이 튜토리얼의 예제는 TypeScript로 작성되어 있지만, TypeScript는 선택 사항입니다. hapi는 일반 JavaScript에서도 똑같이 동작합니다. 예제에서 타입 표기, `import type` 줄, `interface`와 `declare module` 블록, `server.route<...>` 같은 타입 인자를 지우고 `.js` 파일로 저장하면 됩니다. 타입 검사를 설정하려면 [TypeScript 사용하기](#typescript)를 참고하세요.

## <a name="server"></a> 서버 만들기

가장 기본적인 hapi 서버는 다음과 같습니다.

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

`Hapi.server()`가 서버를 만들고, `server.start()`가 요청 수신을 시작합니다. `unhandledRejection` 핸들러는 `init()`이 실패하면 프로세스를 종료합니다. 예를 들어 포트가 이미 사용 중일 때 그렇습니다.

`host`는 서버가 어느 네트워크 인터페이스에서 수신할지 정합니다.

| `host`        | 접근 가능한 곳                                   |
| ------------- | ------------------------------------------------ |
| `'localhost'` | 이 컴퓨터에서만. 개발용으로 가장 안전한 기본값   |
| `'0.0.0.0'`   | 모든 인터페이스. Docker 컨테이너 안에서는 필요함 |
| 생략          | 모든 인터페이스 (hapi의 기본값)                  |

Unix 소켓이나 Windows named pipe에서 수신할 수도 있습니다. [`server.options.port`](/api#server-options-port)를 참고하세요.

## <a name="routes"></a> 라우트 추가하기

"Hello World!"를 반환하는 라우트를 추가합니다.

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

위 코드를 `index.ts`로 저장하고 서버를 시작합니다.

```sh
node index.ts
```

Node.js 22.18 이상은 빌드 단계 없이 `.ts` 파일을 바로 실행합니다. 이 예제에는 타입 표기가 없으므로 `index.js`로 저장하고 `node index.js`로 실행해도 됩니다. `http://localhost:3000`에 접속하면 `Hello World!`가 보입니다.

라우트에는 필수 속성이 세 가지 있습니다.

| 속성      | 역할                                                                                                                 |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| `method`  | HTTP 메서드. `'GET'`, `'POST'`, `['GET', 'POST']` 같은 배열, 또는 모든 메서드를 뜻하는 `'*'`.                        |
| `path`    | URL 경로. `/users/{id}`처럼 파라미터를 포함할 수 있습니다. [라우팅 튜토리얼](/tutorials/ko_KR/routing)을 참고하세요. |
| `handler` | 응답을 만드는 함수. 값을 반환하거나, promise를 반환하거나, 에러를 던집니다.                                          |

## <a name="typescript"></a> TypeScript 사용하기

이 섹션은 선택 사항입니다. hapi는 자체 TypeScript 타입을 함께 제공하므로 별도로 설치할 `@types/hapi__hapi` 패키지가 없습니다.

Node.js는 타입을 제거(strip)하는 방식으로 예제를 실행합니다. 타입을 지우기만 할 뿐 검사하지는 않습니다. 타입을 검사하려면 TypeScript 컴파일러와 Node.js 타입을 설치하세요.

```sh
npm install --save-dev typescript @types/node
```

그런 다음 `tsconfig.json`을 추가합니다.

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

타입을 검사하고 싶을 때마다 `npx tsc`를 실행하세요. `erasableSyntaxOnly`와 `verbatimModuleSyntax`는 Node.js가 제거할 수 없는 TypeScript 기능을 거부합니다. `enum`이나 `type` 키워드 없이 작성한 타입 import가 그런 예입니다.

위 라우트에서 `request`와 `h`에는 타입 표기가 필요 없습니다. TypeScript가 `server.route()` 시그니처로부터 이 둘을 hapi의 `Request`와 `ResponseToolkit`으로 추론합니다. 라우트 설정 바깥에서 핸들러를 작성할 때만 `@hapi/hapi`가 내보내는 타입으로 표기하세요.

```ts
import type { Request, ResponseToolkit } from '@hapi/hapi';

const hello = (request: Request, h: ResponseToolkit) => {
    return 'Hello World!';
};
```

## <a name="everything"></a> 그 밖의 모든 것

이 튜토리얼은 일부러 최소한으로 구성했습니다. 다음으로 읽어 볼 만한 내용은 다음과 같습니다.

- [플러그인](/tutorials/ko_KR/plugins): 애플리케이션을 재사용 가능한 조각으로 나눕니다.
- [라우팅](/tutorials/ko_KR/routing): 경로 파라미터, 메서드, 라우트 옵션.
- [라이프사이클 훅](/tutorials/ko_KR/lifecycle-hooks): 요청의 각 단계, 그리고 서버 시작과 종료 시점에 코드를 실행합니다.
- [데코레이터](/tutorials/ko_KR/decorators): 서버, 요청, 응답 툴킷에 직접 만든 메서드를 추가합니다.
- [응답 마샬링](/tutorials/ko_KR/response-marshalling): 핸들러의 반환값이 HTTP 응답이 되는 과정.
- [테스트](/tutorials/ko_KR/testing): 포트를 열지 않고 라우트를 테스트합니다.

나머지는 모두 [API 레퍼런스](/api)에 문서화되어 있습니다. 질문은 [GitHub](https://github.com/hapijs/hapi/issues)이나 [hapi Slack](https://join.slack.com/t/hapihour/shared_invite/zt-g5ortpsk-ErlnRA2rUcPIWES21oXBOg)에 남겨 주세요.
