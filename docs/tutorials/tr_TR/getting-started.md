---
title: Başlarken
---

<TutorialLang />

# Başlarken

_Bu eğitim hapi v21 ve sonraki sürümlerle uyumludur_

## <a name="overview"></a> Genel Bakış

Bu eğitimde, tarayıcında "Hello World!" gösteren basit bir hapi sunucusu kuracağız.

## <a name="installing"></a> hapi Kurulumu

```sh
mkdir myproject
cd myproject
npm init -y               # creates package.json
npm pkg set type=module   # makes Node.js treat your files as ES modules
npm install @hapi/hapi
```

Bu eğitimlerdeki örnekler TypeScript ile yazılmıştır, ama TypeScript zorunlu değildir. hapi düz JavaScript ile de aynı şekilde çalışır: bir örnekten tip açıklamalarını, `import type` satırlarını, `interface` ve `declare module` bloklarını ve `server.route<...>` gibi tip argümanlarını çıkar, sonra dosyayı `.js` uzantısıyla kaydet. Tip denetimini kurmak için [TypeScript Kullanımı](#typescript) bölümüne bak.

## <a name="server"></a> Sunucu Oluşturma

Çok basit bir hapi sunucusu şöyle görünür:

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

`Hapi.server()` sunucuyu oluşturur, `server.start()` ise dinlemeye başlar. `unhandledRejection` handler'ı, `init()` başarısız olursa (örneğin port zaten kullanımdaysa) süreci durdurur.

`host`, sunucunun hangi ağ arayüzünü dinleyeceğini belirler:

| `host`        | Nereden erişilebilir                                         |
| ------------- | ------------------------------------------------------------ |
| `'localhost'` | yalnızca bu makineden; geliştirme için en güvenli varsayılan |
| `'0.0.0.0'`   | tüm arayüzlerden; Docker container içinde gereklidir         |
| belirtilmezse | tüm arayüzlerden (hapi'nin varsayılanı)                      |

Bir Unix soketini veya Windows named pipe'ı da dinleyebilirsin; bkz. [`server.options.port`](/api#server-options-port).

## <a name="routes"></a> Route Ekleme

"Hello World!" döndüren bir route ekle:

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

Yukarıdaki kodu `index.ts` olarak kaydet ve sunucuyu başlat:

```sh
node index.ts
```

Node.js 22.18 ve sonrası `.ts` dosyalarını derleme adımı olmadan doğrudan çalıştırır. Bu örnekte tip açıklaması olmadığı için dosyayı `index.js` olarak kaydedip `node index.js` ile çalıştırmak da işe yarar. `http://localhost:3000` adresini açtığında `Hello World!` yazısını göreceksin.

Bir route'un üç zorunlu özelliği vardır:

| Özellik   | Ne yapar                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------- |
| `method`  | HTTP metodu: `'GET'`, `'POST'`, `['GET', 'POST']` gibi bir dizi ya da herhangi bir metot için `'*'`.    |
| `path`    | URL yolu. `/users/{id}` gibi parametreler içerebilir; bkz. [Routing](/tutorials/tr_TR/routing) eğitimi. |
| `handler` | Yanıtı üreten fonksiyon. Bir değer döndürür, bir promise döndürür ya da hata fırlatır.                  |

## <a name="typescript"></a> TypeScript Kullanımı

Bu bölüm isteğe bağlıdır. hapi kendi TypeScript tiplerini içerir, yani kurulması gereken bir `@types/hapi__hapi` paketi yoktur.

Node.js örnekleri tipleri ayıklayarak çalıştırır; bu işlem tipleri yalnızca siler, denetlemez. Tipleri denetlemek için TypeScript derleyicisini ve Node.js tiplerini kur:

```sh
npm install --save-dev typescript @types/node
```

Ardından bir `tsconfig.json` ekle:

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

Tiplerini denetlemek istediğinde `npx tsc` komutunu çalıştır. `erasableSyntaxOnly` ve `verbatimModuleSyntax`, Node.js'in ayıklayamadığı TypeScript özelliklerini reddeder; örneğin `enum` ve `type` anahtar sözcüğü olmadan yazılmış tip import'ları.

Yukarıdaki route'ta `request` ve `h` için tip açıklaması gerekmez: TypeScript bunları `server.route()` imzasından hapi'nin `Request` ve `ResponseToolkit` tipleri olarak çıkarır. Bunları yalnızca bir handler'ı route yapılandırmasının dışında yazdığında, `@hapi/hapi` paketinin dışa aktardığı tiplerle açıkla:

```ts
import type { Request, ResponseToolkit } from '@hapi/hapi';

const hello = (request: Request, h: ResponseToolkit) => {
    return 'Hello World!';
};
```

## <a name="everything"></a> Geri Kalan Her Şey

Bu eğitim bilerek kısa tutuldu. Sonraki adımlar için iyi seçenekler:

- [Plugin'ler](/tutorials/tr_TR/plugins): uygulamanı yeniden kullanılabilir parçalara böl.
- [Routing](/tutorials/tr_TR/routing): yol parametreleri, metotlar ve route seçenekleri.
- [Yaşam Döngüsü Hook'ları](/tutorials/tr_TR/lifecycle-hooks): bir isteğin her adımında, ayrıca sunucu başlarken ve kapanırken kod çalıştır.
- [Decorator'lar](/tutorials/tr_TR/decorators): sunucuya, isteğe ve response toolkit'e kendi metotlarını ekle.
- [Yanıt Hazırlama](/tutorials/tr_TR/response-marshalling): bir handler'ın dönüş değerinin nasıl HTTP yanıtına dönüştüğü.
- [Test](/tutorials/tr_TR/testing): route'ları port açmadan test et.

Geri kalan her şey [API referansında](/api) belgelenmiştir. Sorularını [GitHub](https://github.com/hapijs/hapi/issues) üzerinden ya da [hapi Slack](https://join.slack.com/t/hapihour/shared_invite/zt-g5ortpsk-ErlnRA2rUcPIWES21oXBOg) kanalında sorabilirsin.
