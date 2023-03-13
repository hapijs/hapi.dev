# 视图

_本教程适用于 hapi v17 及以上、joi v16 及以上_

## <a name="overview"></a> 总览

hapi 支持模板渲染，且功能众多，包括加载使用多个模板引擎、部分渲染、辅助工具 (一系列函数，用于在模板中用于操作数据)、布局。这些由 [vision](/module/vision) 插件提供。

## <a name="vision"></a> Vision

模版渲染插件 [Vision](/module/vision)，是 hapi.js 提供的。`Vision` 扩展了 `server`、`request`、`h`响应工具包接口，增加了方法以管理视图引擎。`Vision` 还提供了一个内置的处理程序，用于创建模板响应。

`Vision` 开箱即用，与其他引擎蕾丝，如 ejs、handlebars、pug、twig，等等。不遵循常规 API 模式的引擎，仍然可以将其API映射到 [Vision API]（/module/vision）来使用。

详情参见[这儿](/module/vision)。

## <a name="server"></a> 服务器配置

要用视图，先配置模板引擎。可以用 vision 提供的 [`server.views()`](https://github.com/hapijs/vision/blob/master/API.md#serverviewsoptions) 方法:

```javascript
'use strict';

const Path = require('path');
const Hapi = require('@hapi/hapi');
const Hoek = require('@hapi/hoek');

const server = Hapi.server();

const start = async () => {

    await server.register(require('@hapi/vision'));

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });
};

start();
```

此处，先加载 [vision](/module/vision) 插件，以支持模板渲染。

接着，注册 `handlebars` 模块，以负责渲染扩展名为`.html`的模板。

最后，配置模板路径，位于 `templates` 目录。设置 `relativeTo` 选项，指明 `template` 位置。默认，hapi 再当前项目目录下寻找模板文件。

## <a name="options"></a> 视图选项

hapi 的视图引擎选项众多。完整文档请参阅 [vision 接口](/module/vision/api#serverviewsoptions)，这里只示例一部分。

这些选项可以全局配置，也可以配置给指定引擎，例如：

```javascript
server.views({
    engines: {
        html: {
            module: require('handlebars'),
            compileMode: 'sync' // 引擎特定配置
        }
    },
    compileMode: 'async' // 全局配置
});
```

### <a name="engines"></a> 引擎

要启用视图，至少要有一个模板引擎。引擎可以是同步的也可以是异步的，并且这个对象需要以 `compile` 为名导出。

同步引擎 `compile` 方法的签名为 `function (template, options)`。该方法应返回签名为 `function (context, options)` 的函数，该函数或抛出错误，或返回编译后的 html。

异步引擎 `compile` 方法的签名为 `function (template, options, callback)`。其以标准错误优先格式调用 `callback`，并返回签名为 `function (context，options，callback)` 的新函数。该函数也应该以错误优先格式调用 `callback`，而编译的 html 是第二个参数。

默认情况下 hapi 认为模板引擎是同步的 (即 `compileMode` 默认是 `sync`)，要使用异步引擎需要将 `compileMode` 设置为 `async`。

想要修改两种 `compile` 方法中的 `options` 参数或者返回方法，可以修改 `compileOptions` 和 `runtimeOptions`。这两个选项都默认为空对象 `{}`。

`compileOptions` 是 `compile` 的第二个参数, 而 `runtimeOptions` 传递给 `compile` 的返回函数。

如果只注册了一个模板引擎，会自动成为默认引擎，允许在渲染视图时，不使用文件扩展名。但是如果注册了多个模板引擎，则必须使用文件扩展名，或者将 `defaultExtension` 设置为最常用的引擎。对于不使用默认引擎视图，依然需要指定文件扩展名。

另外一个有用的选项是 `isCached`。如果设置为 `false`，hapi 将不缓存渲染结果，而每次都重新渲染。在开发阶段，这个设置非常方便，在处理模板，可以不用重启服务器。建议在生产环境中，将 `isCached` 设置为 `true`。

### <a name="paths"></a> 路径

由于视图文件可能在不同位置，因此 hapi 提供了一些选项，以配置多个路径用于内容查找:

- `path` : 主模板路径
- `partialsPath` : 组件路径
- `helpersPath` : 辅助工具路径
- `layoutPath` : 布局路径
- `relativeTo` : 用于指定其他路径前缀。当指定后，其余路径则都可以相对于此路径

此外，还有两个设置可以路径方式。默认情况下，不允许使用绝对路径和遍历 `path` 目录，但是可以将 `allowAbsolutePaths` 和 `allowInsecureAccess` 设置为 true 来开启这些功能。

例如，目录结构如下：

```
templates\
  index.html
  layout\
    layout.html
  helpers\
    getUser.js
    fortune.js
```

按如下配置：

```javascript
server.views({
    engines: {
        html: require('handlebars')
    },
    relativeTo: __dirname,
    path: './templates',
    layoutPath: './templates/layout',
    helpersPath: './templates/helpers'
});
```

### <a name="global"></a> 全局上下文

在[渲染视图](#render)处，了解如何将上下文直接传递到视图中。但如果有一些默认的上下文，要**始终**应用于所有模板上，该当如何呢？

最简单的方式是在调用 `server.views()` 使用 `context` 选项：

```javascript
const context = {
    title: 'My personal site'
};

server.views({
    engines: {
        html: {
            module: require('handlebars'),
            compileMode: 'sync' // engine specific
        }
    },
    context
});
```

这个默认的全局上下文，会以最低优先级合并到所有视图中。



### <a name="helpers"></a> 视图辅助函数

辅助函数目录定义在 `helpersPath`。下面例子中，将创建一个辅助函数 `fortune`，在模板中使用时，会从字符串数组中挑选并打印出一个元素。

下面的代码片段是完整的辅助函数，存储在 `helpers` 目录中，名为 `fortune.js` 的文件中。

```javascript
module.exports = function () {

    const fortunes = [
        '桃之夭夭，灼灼其华',
        '之子于归，宜其室家',
        '桃之夭夭，有蕡其实',
        '之子于归，宜其家室',
        '桃之夭夭，其叶蓁蓁',
        '之子于归，宜其家人',
    ];

    const x = Math.floor(Math.random() * fortunes.length);
    return fortunes[x];
};
```

现在，可以在模板中使用这个辅助函数。本例使用引擎 handlebars，渲染 `templates/index.html`:

```html
<h1>一言</h1>
<p>{{fortune}}</p>
```

现在，启动服务器，访问这个模板路由，会在标题下方看到一条随机段落。

完整例子：

```javascript
'use strict';

const Hapi = require('@hapi/hapi');

const server = Hapi.server({ port: 8080 });

const start = async () => {

    await server.register(require('@hapi/vision'));

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates',
        helpersPath: 'helpers'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {

            return h.view('index');
        }
    });
};

start();
```

### <a name="layouts"></a> 布局

`vision` 支持视图布局，默认关闭。因为，其他模板引擎也可能提供布局系统，二者可能会冲突。建议只使用一种布局系统。

如果要使用内建布局系统，首先需要设置视图引擎：

```javascript
server.views({
    // ...
    layout: true,
    layoutPath: 'templates/layout'
});
```

此设置开启布局功能，并且射者默认布局路径为 `templates/layout/layout.html` (或者用其他扩展名)。

在 `layout.html` 中设置一块内容区域:

```html
<html>
  <body>
    {{{content}}}
 </body>
</html>
```

之后你的视图应该只有:

```html
<div>Content</div>
```

渲染时，`{{{content}}}` 会替换为上述内容。

可以全局配置默认布局：

```javascript
server.views({
    // ...
    layout: 'another_default'
});
```

也可以为单独定制：

```javascript
return h.view('myview', null, { layout: 'another_layout' });
```

## <a name="render"></a> 视图渲染

视图渲染有两种选择：使用 [`h.view()`](/module/vision/api#hviewtemplate-context-options) 方法，这里的 `h` 是[响应工具包](/api#response-toolkit)。而另一种方法用视图处理对象（handler）。

### <a name="hview"></a> h.view()

首先来看一下如何使用 `h.view()` 渲染视图。路由配置如下：

```javascript
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        return h.view('index');
    }
});
```

可以向第二个参数 `h.view()` 传递要渲染的内容，如：

```javascript
return h.view('index', { title: '首页' });
```

### <a name="viewhandler"></a> 视图处理对象

第二种是使用 hapi 内建的视图处理函数来渲染。路由配置如下：

```javascript
server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: 'index'
    }
});
```

当使用视图处理对象时，内容当作 `context` 的值传入, 如：

```json5
handler: {
    view: {
        template: 'index',
        context: {
            title: '主页'
        }
    }
}
```
