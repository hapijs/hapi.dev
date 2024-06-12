# 服务器方法（Server Methods）

_本教程适用于 hapi v17 及以上_

## <a name="overview"></a> 总览

服务器方法非常有用，其本身附加在服务器对象上，无需额外的公共模块，便于功能共享。服务器方法也多用于缓存，因其利用了 hapi 的本地缓存，可以将样板代码减到最少。要注册服务器，只需调用 [`server.method()`](/api#server.method()) 即可。调用方式有二：`server.method(name, method, [options])`、`server.method(method)`。其中，参数 `method` 是个对象或数组对象，其对象属性为：`name`、`method`、`options`。

## <a name="server.method"></a> server.method()

调用 `server.method()` 第一种方法是使用 `server.method(name, method, [options])`：

```javascript
const add = function (x, y) {

    return x + y;
};

server.method('add', add, {});
```

此处，创建函数 `add`，其接收两个参数，并相加之。然后调用 `server.method()`，方法的名是 `add`，欲注册的方法刚创建的函数 `add`，不带选项。

调用 `server.method()` 第二种方式，使用 `server.method(method)`：

```javascript
const add = function (x, y) {

    return x + y;
};

server.method({
    name: 'add',
    method: add,
    options: {}
});
```

再次声明相同函数，即 `add`。这次注册，配置 `method` 对象。其中，`name` 是方法名，`method` 是要注册的方法，`options` 是各种配置。

### <a name="name"></a> 名称（Name）

`name` 参数是个字符串，用于之后在服务器中通过 `server.methods[name]` 访问这个方法。注意，如果 `name` 含有字符 `.`, 会注册一个内嵌对象，而不是字符串字面量，如:

```javascript
server.method('math.add', add);
```

这个服务器方法就要用 `server.methods.math.add()` 来调用。

### <a name="method"></a> 方法（Method）

参数 `method` 是当服务器方法被执行时，实际调用的函数，其参数任意，也可以是一个 `async` 函数，例如:

```js
const add = async function (x, y) {

    const result = await someLongRunningFunction(x, y);
    return result;
};

server.method('add', add, {});
```

服务器方法函数应当有返回值，又或抛出错误。

## <a name="options"></a> 选项（Options）

注册 `server.method()` 时，可以配置三个 `选项(options)`：`cache`、`generateKey`、`bind`。

### <a name="cache"></a> 缓存（Cache）

服务器方法有个主要优势，是可以利用 hapi 的本地缓存。默认情况下不缓存，但如果注册方法时配置了，则方法返回值将会缓存之。之后的返回结果从缓存中获取，而不用每次重新调用该方法。配置如下所示:

```javascript
server.method('add', add, {
    cache: {
        expiresIn: 60000,
        expiresAt: '20:30',
        staleIn: 30000,
        staleTimeout: 10000,
        generateTimeout: 100
    }
});
```

参数：

* `expiresIn`：过期时间，单位毫秒。不能与 `expiresAt` 一同使用。
* `expiresAt`：过期时间，24 小时制，'HH:MM' 格式, 过了这个时间，路由所有缓存记录失效。这个时间使用本地时间，不能与 `expiresIn` 一同使用。
* `staleIn`：过了这个时间，缓存标记为失效，并尝试重新生成。必须小于 `expiresIn`。单位毫秒。
* `staleTimeout`：`staleIn` 超时后，调用 `generateFunc` 生成新值，若生成时间超过此时间，则返回被标记为过期的旧值。单位毫秒。
* `generateTimeout`: 当生成新值时间超过此时间，则抛出超时异常。但当随后新值最仍会获取并缓存。单位毫秒。
* `segment`: 用于隔离缓存项的分段名称。
* `cache`: 服务器上配置的缓存连接名。

更多关于缓存选项的信息可以查阅[相关接口](/api#server.methods)，以及 [catbox](/module/catbox#policy)。

还可以设置 `ttl` 标记，修改每次调用服务器方法结果的 `ttl` (生存时间)。例：

```js
const add = async function (x, y, flags) {

    const result = await someLongRunningFunction(x, y);

    flags.ttl = 5 * 60 * 1000; // 5 分钟

    return result;
};

server.method('add', add, {
    cache: {
        expiresIn: 2000,
        generateTimeout: 100
    }
});
```

此处，定义了服务器方法函数，比之前多传了个参数，这个参数 `flags` 由 hapi 提供。而后，只需更改 `ttl` 即可，单位毫秒。假若将其设为 `0`，则永不缓存。假若没有更改，则 `ttl` 从缓存的配置中获取。

### <a name="key"></a> 自定义缓存键

除上述选项，还可以写个方法，赋给 `generateKey`，来生成缓存键。如果绑定方法的参数是字符串、数字、布尔值的组合，hapi 会自动生成合适的键。但是，如果方法接受对象参数，则需要指定 `generateKey`，来明确按何种规则生成键：

```javascript
const sum = function (array) {

    let total = 0;

    array.forEach((item) => {

        total += item;
    });

    return total;
};

server.method('sum', sum, {
    generateKey: (array) => array.join(',')
});
```

这样，传递给方法参数都会传给 `generateKey`。

### <a name="bind"></a> 绑定（Bind）

服务器方法上还有一个配置项是 `bind`。`bind` 用以修改方法中的 `this` 上下文。注册方法时，默认为当前上下文。比如可以数据库上下文，就无需将其当作参数传递，而且不用自定义 `generateKey` 函数，如下:

```javascript
const lookup = async function (id) {

    // 调用 myDB.getOne

    return await this.getOne({ id });
};

server.method('lookup', lookup, { bind: myDB });
```

## <a name="server.methods"></a> server.methods

要调用上面注册的服务器方法，可以使用`server.methods()`。比如：


```js
// 定义
const add = function (x, y) {

    return x + y;
};

// 绑定
server.method({
    name: 'add',
    method: add,
    options: {}
});

// 调用
server.methods.add(1, 2);  // 3
```
