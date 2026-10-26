---
title: 테스트
---

<TutorialLang />

# 테스트

_이 튜토리얼은 hapi v21 이상과 호환됩니다_

## <a name="overview"></a> 개요

hapi는 포트를 열지 않고도 라우트를 테스트할 수 있습니다. `server.inject()`는 가짜 요청을 전체 요청 라이프사이클(라우팅, 인증, 검증, 핸들러, 응답)에 통과시키고 응답을 돌려줍니다. 네트워크는 전혀 거치지 않습니다. 테스트가 빠르고 포트 충돌도 일어나지 않습니다.

이 튜토리얼은 테스트 러너로 [lab](/module/lab)을, 어서션에 [code](/module/code)를 사용하지만, `server.inject()`는 [Mocha](https://mochajs.org/), [Jest](https://jestjs.io/), [Vitest](https://vitest.dev/), Node.js 테스트 러너에서도 똑같이 동작합니다.

```sh
npm install --save-dev @hapi/lab @hapi/code
```

## <a name="server"></a> 서버 설정

서버를 만드는 코드와 서버를 시작하는 코드를 분리하세요. 프로덕션에서는 서버를 포트에서 시작하고, 테스트에서는 서버를 초기화만 한 뒤 `server.inject()`로 요청을 보냅니다:

```
myproject/
├── index.ts            # production entry point: calls start()
├── lib/
│   └── server.ts       # builds the server, exports init() and start()
├── test/
│   └── example.test.ts # calls init() and server.inject()
└── package.json
```

`lib/server.ts`는 호출할 때마다 새 서버를 만들기 때문에, 각 테스트는 이전 테스트의 상태가 남아 있지 않은 자신만의 서버를 받습니다:

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

프로덕션 진입점은 서버를 시작하기만 합니다:

```ts
import { start } from './lib/server.ts';

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();
```

두 함수의 차이:

|                                           | [`server.initialize()`](/api#await-server-initialize) | [`server.start()`](/api#await-server-start) |
| ----------------------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| 플러그인 의존성 검사                      | 예                                                    | 예                                          |
| 캐시 시작                                 | 예                                                    | 예                                          |
| `onPreStart` 확장 실행                    | 예                                                    | 예                                          |
| 포트에서 리슨                             | 아니요                                                | 예                                          |
| `'start'` 이벤트 발생, `onPostStart` 실행 | 아니요                                                | 예                                          |

테스트에서는 `initialize()`를 사용합니다. 그러면 포트를 바인딩하지 않고도 캐시와 `onPreStart` 설정이 프로덕션과 똑같이 실행됩니다.

## <a name="writingTest"></a> 라우트 테스트 작성

`test/example.test.ts`를 만드세요:

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

- lab은 export된 `lab` 스크립트를 통해 테스트를 찾습니다.
- `describe()`는 테스트를 묶고, `it()`은 테스트 하나를 정의합니다. `beforeEach()`와 `afterEach()`는 각 테스트의 전후에 실행됩니다.
- `server`는 나중에 `beforeEach()`에서 할당되므로 hapi의 `Server` 타입으로 지정합니다.
- 각 테스트 후의 `server.stop()`은 캐시를 멈추고 `onPreStop`과 `onPostStop` 확장을 실행해서 테스트 사이에 아무것도 새어 나가지 않게 합니다.

### <a name="what-server-inject-gives-you"></a> `server.inject()`가 돌려주는 것

`server.inject()`는 요청을 객체로 받고 응답을 반환합니다:

| 요청 옵션       | 용도                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------- |
| `method`, `url` | 호출할 라우트.                                                                                |
| `payload`       | 요청 본문. 객체는 JSON으로 전송됩니다.                                                        |
| `headers`       | `authorization`이나 `cookie` 같은 요청 헤더.                                                  |
| `auth`          | `{ strategy, credentials }`. 인증 전략을 건너뛰고 보호된 라우트를 특정 사용자로 테스트합니다. |

| 응답 속성    | 내용                                                              |
| ------------ | ----------------------------------------------------------------- |
| `statusCode` | HTTP 상태 코드.                                                   |
| `headers`    | 응답 헤더.                                                        |
| `payload`    | 클라이언트가 받는 그대로의 응답 본문 문자열.                      |
| `result`     | 직렬화되기 전에 핸들러가 반환한 값. 객체는 이 값으로 비교하세요.  |
| `request`    | `request.auth`, `request.app` 등을 확인할 수 있는 hapi 요청 객체. |

모든 옵션은 [`server.inject()`](/api#await-server-inject-options)를 참고하세요.

## <a name="running"></a> 테스트 실행

lab은 `.js`, `.mjs`, `.cjs` 파일만 스스로 찾으므로 TypeScript 테스트 파일은 인자로 넘겨야 합니다. `package.json`에 스크립트를 추가하세요:

```json
{
    "scripts": {
        "test": "lab -v test/*.test.ts"
    }
}
```

그런 다음 `npm test`를 실행하세요. lab이 파일을 import할 때 Node.js가 타입을 제거하므로 빌드 단계가 없습니다.

- lab은 `--typescript`, `-t`, `-c` 없이 실행하세요. TypeScript는 이미 Node.js가 처리합니다.
- 커버리지를 측정하려면 `npm install --save-dev c8`로 [c8](https://github.com/bcoe/c8)을 설치하고 그 아래에서 lab을 실행하세요: `c8 lab test/*.test.ts`.
