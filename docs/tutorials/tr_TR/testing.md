---
title: Test
---

<TutorialLang />

# Test

_Bu eğitim hapi v21 ve sonraki sürümlerle uyumludur_

## <a name="overview"></a> Genel Bakış

hapi, route'ları bir port açmadan test edebilir. `server.inject()` sahte bir isteği tüm istek yaşam döngüsünden (routing, kimlik doğrulama, doğrulama, handler ve yanıt) geçirir ve yanıtı sana verir; araya hiç ağ girmez. Testler hızlı çalışır ve portlar yüzünden asla çakışmaz.

Bu eğitim test çalıştırıcısı olarak [lab](/module/lab), assertion'lar için de [code](/module/code) kullanıyor; ama `server.inject()` [Mocha](https://mochajs.org/), [Jest](https://jestjs.io/), [Vitest](https://vitest.dev/) ya da Node.js test çalıştırıcısından da aynı şekilde çalışır.

```sh
npm install --save-dev @hapi/lab @hapi/code
```

## <a name="server"></a> Sunucu Kurulumu

Sunucuyu oluşturan kodu, onu başlatan koddan ayrı tut. Production sunucuyu bir portta başlatır; testler ise onu yalnızca initialize eder ve `server.inject()` ile istek gönderir:

```
myproject/
├── index.ts            # production entry point: calls start()
├── lib/
│   └── server.ts       # builds the server, exports init() and start()
├── test/
│   └── example.test.ts # calls init() and server.inject()
└── package.json
```

`lib/server.ts` her çağrıda yeni bir sunucu oluşturur, böylece her test bir önceki testten kalan hiçbir durum olmadan kendi sunucusunu alır:

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

Production giriş noktası yalnızca sunucuyu başlatır:

```ts
import { start } from './lib/server.ts';

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();
```

İki fonksiyon arasındaki fark:

|                                           | [`server.initialize()`](/api#await-server-initialize) | [`server.start()`](/api#await-server-start) |
| ----------------------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| Plugin bağımlılıklarını kontrol eder      | evet                                                  | evet                                        |
| Önbellekleri başlatır                     | evet                                                  | evet                                        |
| `onPreStart` extension'larını çalıştırır  | evet                                                  | evet                                        |
| Portu dinler                              | hayır                                                 | evet                                        |
| `'start'` yayar, `onPostStart` çalıştırır | hayır                                                 | evet                                        |

Testler `initialize()` kullanır; böylece önbellekler ve `onPreStart` kurulumu, port bağlamadan tam olarak production'daki gibi çalışır.

## <a name="writingTest"></a> Route Testi Yazmak

`test/example.test.ts` dosyasını oluştur:

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

- lab testleri export edilen `lab` script'i üzerinden bulur.
- `describe()` testleri gruplar, `it()` bir test tanımlar. `beforeEach()` ve `afterEach()` her testin öncesinde ve sonrasında çalışır.
- `server`, daha sonra `beforeEach()` içinde atandığı için hapi'nin `Server` tipiyle tiplenmiştir.
- Her testten sonra çağrılan `server.stop()` önbellekleri durdurur ve `onPreStop` ile `onPostStop` extension'larını çalıştırır, böylece testler arasında hiçbir şey sızmaz.

### <a name="what-server-inject-gives-you"></a> `server.inject()` sana ne verir

`server.inject()` isteği bir nesne olarak alır ve yanıtı döndürür:

| İstek seçeneği  | Ne için kullanılır                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `method`, `url` | Çağrılacak route.                                                                                                                    |
| `payload`       | İstek gövdesi. Nesneler JSON olarak gönderilir.                                                                                      |
| `headers`       | `authorization` ya da `cookie` gibi istek header'ları.                                                                               |
| `auth`          | Kimlik doğrulama stratejisini atlayıp korumalı bir route'u belirli bir kullanıcı olarak test etmek için `{ strategy, credentials }`. |

| Yanıt özelliği | İçeriği                                                                                |
| -------------- | -------------------------------------------------------------------------------------- |
| `statusCode`   | HTTP durum kodu.                                                                       |
| `headers`      | Yanıt header'ları.                                                                     |
| `payload`      | Yanıt gövdesi; tam olarak bir istemcinin alacağı şekilde, string olarak.               |
| `result`       | Handler'ın serileştirilmeden önce döndürdüğü değer. Nesneleri bununla karşılaştır.     |
| `request`      | `request.auth`, `request.app` ve benzerlerini kontrol etmek için hapi request nesnesi. |

Tüm seçenekler için [`server.inject()`](/api#await-server-inject-options) referansına bak.

## <a name="running"></a> Testleri Çalıştırmak

lab kendi başına yalnızca `.js`, `.mjs` ve `.cjs` dosyalarını bulur, bu yüzden TypeScript test dosyalarını argüman olarak ver. `package.json`'a bir script ekle:

```json
{
    "scripts": {
        "test": "lab -v test/*.test.ts"
    }
}
```

Sonra `npm test` çalıştır. lab dosyaları import ettiğinde Node.js tipleri siler, yani bir build adımı yoktur.

- lab'ı `--typescript`, `-t` ya da `-c` olmadan çalıştır; TypeScript'i zaten Node.js hallediyor.
- Coverage ölçmek için [c8](https://github.com/bcoe/c8)'i `npm install --save-dev c8` ile kur ve lab'ı onun altında çalıştır: `c8 lab test/*.test.ts`.
