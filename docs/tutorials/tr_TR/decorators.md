---
title: Decorator'lar
---

<TutorialLang />

# Decorator'lar

_Bu eğitim hapi v21 ve sonraki sürümlerle uyumludur_

## <a name="overview"></a> Genel Bakış

Bir decoration, hapi'nin nesnelerinden birine kendi özelliğini ekler. Decorate ettiğin anda uygulamanın her parçası yeni özelliği kullanabilir: bir plugin'de `server.todos`, bir handler'da `request.loadAccount()`, bir yanıt oluştururken `h.paginated()`.

hapi plugin'lerinin çoğu decoration'lar üzerine kuruludur. `@hapi/vision` kaydettiğinde `h.view()` vardır, çünkü vision response toolkit'i decorate etmiştir. `@hapi/inert` kaydettiğinde `handler: { file: 'index.html' }` çalışır, çünkü inert route handler'larını decorate etmiştir.

Decoration'ları [`server.decorate(type, property, method, [options])`](/api#server-decorate-type-property-method-options) ile eklersin. `type`, ekleme yaptığın nesneyi seçer:

| `type`       | Nereye ekler                                   | Gerçek örnekler                                                                                                    |
| ------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `'server'`   | `server` nesnesine                             | vision'ın `server.views()` ve `server.render()` metotları, nes'in `server.publish()`, yar'ın `server.yar`          |
| `'request'`  | her `request` nesnesine                        | vision'ın `request.render()`, @hapi/cookie'nin `request.cookieAuth`, yar'ın `request.yar`, nes'in `request.socket` |
| `'toolkit'`  | response toolkit `h` nesnesine                 | vision'ın `h.view()`, inert'in `h.file()`, h2o2'nun `h.proxy()`                                                    |
| `'handler'`  | bir route'un kullanabileceği handler tiplerine | vision'ın `{ view }`, inert'in `{ file }` ve `{ directory }`, h2o2'nun `{ proxy }`                                 |
| `'response'` | her response nesnesine                         | yukarıdaki hapi plugin'lerinin hiçbiri; nadiren gerekir                                                            |

Decoration'lar çoğu zaman [yaşam döngüsü hook'larıyla](/tutorials/tr_TR/lifecycle-hooks) birlikte çalışır: örneğin @hapi/cookie, `request.cookieAuth` özelliğini bir decoration ile ekler ve bir `onPreAuth` hook'uyla doldurur.

## <a name="server"></a> Sunucu decoration'ları: bir servisi paylaşmak

En yaygın decoration, bir veritabanı client'ı, bir e-posta gönderici ya da bir servis gibi tek bir nesneyi tüm uygulamayla paylaşır. Bir plugin onu bir kez oluşturur ve sunucuyu onunla decorate eder. Handler'lar ona `request.server` üzerinden, diğer plugin'ler de kendi `server` argümanları üzerinden erişir.

```ts
import Hapi from '@hapi/hapi';

import type { Plugin } from '@hapi/hapi';

interface Todo {
    id: number;
    title: string;
}

class TodoStore {
    #todos = new Map<number, Todo>();

    add(title: string) {
        const todo = { id: this.#todos.size + 1, title };
        this.#todos.set(todo.id, todo);
        return todo;
    }

    list() {
        return [...this.#todos.values()];
    }
}

declare module '@hapi/hapi' {
    interface Server {
        todos: TodoStore;
    }
}

const storePlugin: Plugin<void> = {
    name: 'todo-store',
    register: (server) => {
        server.decorate('server', 'todos', new TodoStore());
    },
};

const routesPlugin: Plugin<void> = {
    name: 'todo-routes',
    dependencies: ['todo-store'],
    register: (server) => {
        server.route({
            method: 'GET',
            path: '/todos',
            handler: (request, h) => request.server.todos.list(),
        });

        server.route<{ Payload: { title: string } }>({
            method: 'POST',
            path: '/todos',
            handler: (request, h) => request.server.todos.add(request.payload.title),
        });
    },
};

const server = Hapi.server({ port: 4000 });

await server.register([storePlugin, routesPlugin]);
await server.start();
```

`declare module` bloğu TypeScript'e yeni özelliği bildirir. hapi nesnelerini genişletebileceğin arayüzler olarak dışa aktarır ve bundan sonra `server.todos` ile `request.server.todos` her yerde tiplenmiş olur. [TypeScript bölümü](#typescript) her decoration tipi için ilgili arayüzü listeler.

### <a name="where"></a> Bir değer nerede tutulmalı?

hapi'de paylaşılan değerleri tutmak için birkaç yer vardır ve decoration bunlardan yalnızca biridir:

| Değer                                                                         | Nerede tutulmalı                                                                                | Örnek                               |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------- |
| route'ların ve plugin'lerin çağırdığı metotlara sahip bir servis              | bir sunucu decoration'ı                                                                         | `server.todos`                      |
| sonuçlarını argümanlara göre önbelleğe almaya değer bir fonksiyon             | bir [server method](/tutorials/tr_TR/server-methods)                                            | `server.methods.getWeather()`       |
| herhangi bir kodun okuyup yazdığı, uygulama genelinde yapılandırma veya durum | [`server.app`](/api#server-app)                                                                 | `server.app.config`                 |
| diğer plugin'lerin yalnızca ara sıra okuduğu plugin durumu                    | [`server.expose()`](/api#server-expose-key-value-options), `server.plugins[name]` olarak okunur | `server.plugins['todo-store']`      |
| mevcut isteği okuyan bir yardımcı                                             | bir request decoration'ı                                                                        | `request.clientIp()`                |
| ilk kullanımda oluşturulan istek başına durum                                 | `apply: true` ile bir request decoration'ı                                                      | `request.loadAccount()`             |
| bir hook'un ya da handler'ın ayarladığı istek başına veri                     | [`request.app`](/api#request-app), plugin içinde ise [`request.plugins`](/api#request-plugins)  | `onRequest` içinde ayarlanan bir id |

Değer metotlara sahip bir servis olduğunda, her route ona ihtiyaç duyduğunda ve ona kısa, tiplenmiş bir ad vermek istediğinde doğru seçim bir sunucu decoration'ıdır.

## <a name="request"></a> Request decoration'ları

Bir request decoration'ı her isteğe bir özellik ekler. İki türü vardır ve aralarındaki fark, değerin ne zaman oluşturulduğudur.

### <a name="methods-shared-by-every-request"></a> Tüm isteklerin paylaştığı metotlar

Seçenek verilmezse decoration request prototype'ına bir kez konur ve her istek onu paylaşır. `this` mevcut istek olsun diye normal bir `function` kullan:

```ts
declare module '@hapi/hapi' {
    interface Request {
        clientIp: () => string;
    }
}

server.decorate('request', 'clientIp', function () {
    const forwarded = this.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
        return forwarded.split(',').at(-1)?.trim() ?? this.info.remoteAddress;
    }

    return this.info.remoteAddress;
});

server.route({
    method: 'GET',
    path: '/whoami',
    handler: (request, h) => {
        return { ip: request.clientIp() };
    },
});
```

Bu kod `x-forwarded-for` header'ının son girdisini okur. Bu girdi, header'a ekleme yapan ve senin denetlediğin tek bir proxy'nin gördüğü adrestir; örneğin `$proxy_add_x_forwarded_for` ile nginx ya da bir AWS load balancer. Ondan önceki girdiler istemciden gelir ve sahte olabilir. Önünde daha fazla güvenilir proxy varsa her proxy için bir girdi geriye say; hiç yoksa header'ı yok say, çünkü herhangi bir istemci onu gönderebilir.

### <a name="per-request-values-with-apply-true"></a> `apply: true` ile istek başına değerler

`{ apply: true }` ile hapi, her yeni istek için fonksiyonunu isteği argüman olarak vererek bir kez çağırır ve dönüş değerini özelliğe atar. Her isteğin önbelleğe alınmış bir arama sonucu gibi kendi durumuna ihtiyaç duyduğu durumlarda bunu kullan:

```ts
interface Account {
    id: string;
    name: string;
}

declare module '@hapi/hapi' {
    interface Request {
        loadAccount: () => Promise<Account | null>;
    }
}

const accounts = new Map([['2133d32a', { id: '2133d32a', name: 'John Doe' }]]);

const findAccount = async (id: string) => accounts.get(id) ?? null;

server.decorate(
    'request',
    'loadAccount',
    (request) => {
        let pending: Promise<Account | null> | undefined;

        return () => {
            const id = request.headers['x-account-id'];
            pending ??= typeof id === 'string' ? findAccount(id) : Promise.resolve(null);
            return pending;
        };
    },
    { apply: true },
);
```

Bir pre-handler, bir `onPostAuth` hook'u ve handler'ın hepsi `request.loadAccount()` çağırabilir; hesap istek başına bir kez aranır. `apply` olmadan decoration tüm isteklerin paylaştığı tek bir fonksiyondur, yani `pending` değerini tutacak istek başına bir yer yoktur; fonksiyonun dışındaki bir değişken ilk isteğin hesabını diğer tüm isteklere sızdırırdı.

|                      | Seçeneksiz                            | `apply: true` ile                                           |
| -------------------- | ------------------------------------- | ----------------------------------------------------------- |
| Oluşturulma          | bir kez, request prototype'ında       | istek başına bir kez, request nesnesi oluşturulurken        |
| İstek başına durum   | yok, isteği okumak için `this` kullan | var, closure içinde tutulur                                 |
| İstek başına maliyet | yok                                   | fonksiyonun her istekte çalışır                             |
| Gerçek örnek         | vision'ın `request.render()`          | @hapi/cookie'nin `request.cookieAuth`, yar'ın `request.yar` |

`apply` fonksiyonları, değeri hiç kullanmayan route'lara gelenler de dahil her istekte çalışır. Bunları ucuz tut: closure'ı oluştur ve işi, `loadAccount()` örneğinde olduğu gibi, değer ilk kez kullanıldığında yap.

## <a name="toolkit"></a> Toolkit decoration'ları: yanıt yardımcıları

Bir toolkit decoration'ı `h` nesnesine bir metot ekler. Normal bir `function` kullan: `this` toolkit'in kendisidir, yani `this.response()` bir yanıt oluşturur ve `this.request` mevcut istektir. Bu örnek, her liste route'una aynı sayfalama kuralını verir:

```ts
import type { ResponseObject } from '@hapi/hapi';

declare module '@hapi/hapi' {
    interface ResponseToolkit {
        paginated: (items: object[], total: number) => ResponseObject;
    }
}

server.decorate('toolkit', 'paginated', function (items: object[], total: number) {
    return this.response(items).header('x-total-count', String(total));
});

server.route<{ Query: { page?: string } }>({
    method: 'GET',
    path: '/todos',
    handler: (request, h) => {
        const page = Number(request.query.page ?? 1);
        const todos = request.server.todos.list();
        return h.paginated(todos.slice((page - 1) * 20, page * 20), todos.length);
    },
});
```

`h.paginated()` bir sayfa öğeyi `x-total-count` header'ıyla gönderir; böylece istemciler toplam sayıyı her liste route'unda aynı şekilde okur. Toolkit decoration'ları, bu header ya da bir hata zarfı gibi API'nin tekrarladığı yanıt kuralları için iyi bir yerdir. hapi'nin döndürülen değeri nasıl baytlara dönüştürdüğü [Yanıt Hazırlama](/tutorials/tr_TR/response-marshalling) eğitiminde anlatılıyor.

## <a name="handler"></a> Handler decoration'ları: özel handler tipleri

Bir handler decoration'ı, route'ların bir fonksiyon yazmak yerine handler'larını `handler: { file: 'index.html' }` gibi bir nesneyle tanımlamasını sağlar. Birçok route aynı davranışı paylaşıp yalnızca yapılandırmada ayrıştığında bunu kullan.

Decoration, hapi'nin route eklenirken her route için bir kez çağırdığı `(route, options)` fonksiyonudur. Asıl handler'ı döndürür. Bu örnek eski URL'leri yönlendirir:

```ts
import type { HandlerDecorationMethod } from '@hapi/hapi';

interface MovedOptions {
    to: string;
    permanent?: boolean;
}

declare module '@hapi/hapi' {
    interface HandlerDecorations {
        moved?: MovedOptions;
    }
}

const moved: HandlerDecorationMethod = (route, options: MovedOptions) => {
    return (request, h) => h.redirect(options.to).permanent(options.permanent ?? false);
};

moved.defaults = { auth: false };

server.decorate('handler', 'moved', moved);

server.route({ method: 'GET', path: '/old-docs', handler: { moved: { to: '/docs', permanent: true } } });
server.route({ method: 'GET', path: '/blog/{slug}', handler: { moved: { to: '/articles' } } });
```

İsteğe bağlı `defaults` özelliği, handler'ı kullanan her route için route seçeneklerini ayarlar; burada yönlendirmeler hiçbir zaman kimlik doğrulama gerektirmez. `defaults`, HTTP metoduna bağlı bir fonksiyon da olabilir: h2o2 bunu, `{ proxy }` route'larının payload ayrıştırmayı atlayıp gövdeyi upstream sunucuya stream etmesi için kullanır.

hapi handler'ı route eklenirken oluşturduğu için handler decoration'ı, herhangi bir route onu kullanmadan önce var olmalıdır. Onu tanımlayan plugin'i önce kaydet.

## <a name="response"></a> Response decoration'ları

`'response'` decoration'ları, hata yanıtları ve `request.generateResponse()` ile oluşturulanlar dahil her response nesnesine bir metot ekler. Nadiren gerekirler. Uygulama genelinde yanıtları değiştirmek için bir `onPreResponse` [yaşam döngüsü hook'u](/tutorials/tr_TR/lifecycle-hooks) kullan.

## <a name="extend"></a> Mevcut bir decoration'ı sarmalamak

`{ extend: true }`, mevcut bir decoration'ı sarmalanmış bir sürümüyle değiştirir. Fonksiyonun mevcut decoration'ı alır ve yenisini döndürür. Yaygın bir kullanım, başka bir plugin'in decoration'ına onun kodunu değiştirmeden veri eklemektir. Bu örnek vision'ın `h.view()` metodunu sarmalar, böylece her şablon oturum açmış kullanıcıyı alır:

```ts
server.decorate(
    'toolkit',
    'view',
    (existing) => {
        return function (template: string, context: object = {}, options?: object) {
            const user = this.request.auth.credentials?.user;
            return existing.call(this, template, { user, ...context }, options);
        };
    },
    { extend: true },
);
```

Decoration'ı tanımlayan plugin önce kaydedilmelidir; henüz var olmayan bir decoration'ı genişletmek hata fırlatır. Handler decoration'ları genişletilemez.

## <a name="rules"></a> hapi'nin uyguladığı kurallar

Decoration'lar onları ekleyen plugin'e değil, sunucunun tamamına aittir. Bir plugin içinde eklenen decoration, kök sunucu ve diğer tüm plugin'ler tarafından görülür. Bir decoration ya da route bu kurallardan birini bozduğu anda hapi hata fırlatır:

| Hata                                                              | Hata mesajı                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| İki plugin aynı adı decorate ediyor                               | `Server decoration already defined: todos`                        |
| Ad alt çizgiyle başlıyor                                          | `Property name cannot begin with an underscore: _cache`           |
| Ad yerleşik bir özellik                                           | `Cannot override the built-in request interface decoration: auth` |
| Bir route, kimsenin decorate etmediği bir handler tipi kullanıyor | `Unknown handler: moved`                                          |
| Var olmayan bir ad üzerinde `extend: true`                        | `Cannot extend missing toolkit decoration: view`                  |

Adlar global olduğu için yeniden kullanılabilir plugin'lerin decoration'larına belirgin bir ad ver ya da @hapi/cookie'nin `requestDecoratorName` seçeneğiyle yaptığı gibi kullanıcıların adı yapılandırmasına izin ver. [`server.decorations`](/api#server-decorations) kullanımda olan adları listeler.

Sunucu decoration'ları her plugin'in kendi `server` nesnesine kopyalanır, bu yüzden bir decoration içinde `this`, onu çağıran plugin'in sunucusudur. vision buna dayanır: `server.render()`, çağıranın plugin'inde yapılandırılmış view'ları arar; böylece iki plugin'in her biri kendi şablonlarına sahip olabilir.

## <a name="bootstrap"></a> Decoration'larla başlatma

Plugin'ler genellikle `register()` içinde decorate eder, böylece decoration `server.register()` çözülür çözülmez var olur. Başka bir plugin'in decoration'ını yalnızca handler'larda kullanan bir plugin herhangi bir sırayla kaydedilebilir, çünkü handler'lar sunucu başladıktan sonra çalışır. Onu kendi `register()` fonksiyonu içinde kullanan bir plugin ise onu ekleyen plugin'den sonra kaydedilmelidir.

- Bir plugin'in `dependencies: ['todo-store']` özelliği yalnızca hapi'nin [`server.initialize()`](/api#await-server-initialize) ya da `server.start()` sırasında diğer plugin'in kaydedildiğini denetlemesini sağlar. Plugin'lerin kaydedilme sırasını değiştirmez.
- Sunucu açılırken başka bir plugin'in decoration'ını kullanan kod (örneğin bir önbelleği ısıtmak ya da tablolar oluşturmak) bir [`server.dependency()`](/api#server-dependency-dependencies-after) callback'ine aittir. hapi bunu, kayıt sırasından bağımsız olarak bağlı olduğu plugin'lerden sonra, `onPreStart` aşamasında çalıştırır:

```ts
import type { Plugin } from '@hapi/hapi';

const seedPlugin: Plugin<void> = {
    name: 'todo-seed',
    register: (server) => {
        server.dependency('todo-store', async (server) => {
            server.todos.add('Read the decorators tutorial');
        });
    },
};
```

Başlatma sırasının tamamı Plugin'ler eğitimindeki [Bağımlılıklar](/tutorials/tr_TR/plugins#dependencies) bölümünde ve [Sunucu hook'ları](/tutorials/tr_TR/lifecycle-hooks#server-hooks) bölümünde yer alır.

## <a name="typescript"></a> TypeScript

hapi, decorate edebileceğin her nesne için bir arayüz dışa aktarır. Decoration'ını bu arayüze, `server.decorate()` çağrısıyla aynı dosyada bir `declare module '@hapi/hapi'` bloğuyla ekle; böylece tip ve kod bir arada kalır:

| `type`      | Genişletilecek arayüz | Örnek                                                                                         |
| ----------- | --------------------- | --------------------------------------------------------------------------------------------- |
| `'server'`  | `Server`              | `interface Server { todos: TodoStore }`                                                       |
| `'request'` | `Request`             | `interface Request { loadAccount: () => Promise<Account \| null> }`                           |
| `'toolkit'` | `ResponseToolkit`     | `interface ResponseToolkit { paginated: (items: object[], total: number) => ResponseObject }` |
| `'handler'` | `HandlerDecorations`  | `interface HandlerDecorations { moved?: MovedOptions }`                                       |

Handler decoration özellikleri isteğe bağlı olmalıdır, yoksa her route onları ayarlamak zorunda kalırdı. hapi'nin kendi tipleri, uygulamaya özgü diğer veriler için de aynı mekanizmayı kullanır: `ServerApplicationState` `server.app` tipini, `RequestApplicationState` `request.app` tipini, `PluginProperties` `server.plugins` tipini ve `PluginsStates` `request.plugins` tipini belirler.

Bu decoration'ları bir plugin olarak paketlemek için [Plugin'ler](/tutorials/tr_TR/plugins) eğitimine, `server.decorate()` imzasının tamamı için [API referansına](/api#server-decorate-type-property-method-options) bak.
