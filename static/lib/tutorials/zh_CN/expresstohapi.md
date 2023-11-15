# Express 迁移

_本教程适用于 hapi v17 及以上_


## <a name="overview" ></a> 总览

本教程演示如何将 Express 迁移到 hapi。Express 的大部分功能都严重依赖中间件，而 hapi 则更多内置其于核心。正文解析 (Body Parsing)，cookie 处理，输入/输出确认以及 HTTP 友好错误处理对象，均已内置于 hapi 框架。hapi 在其核心生态系统中提供了丰富的插件选择，以扩展额外的功能。hapi 也是唯一没有外部依赖项的框架。每个依赖项均由 hapi 核心团队管理，这让 hapi 优势凸显，更安全、更可靠。

## <a name="setup" ></a> 配置

### <a name="installation" ></a> 安装

Express:
`npm install express`


hapi:
`npm install @hapi/hapi`


### <a name="server" ></a> 创建

Express:
```js
var express = require('express');
var app = express();

app.listen(3000, function () {
  console.log('服务器运行在 3000 端口');
}));
```

hapi:
```js
const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.start();
    console.log('服务器运行在 3000 端口');
};

init();
```
与 Express 不同，hapi 创建的服务器对象，为您应用程序的焦点。服务器对象中设置的属性将确定应用程序的行为。创建服务器对象后，可以通过调用 `server.start()` 命令启动服务器。

## <a name="routes" ></a> 路由

在 hapi 中，路由以特定顺序调用，因而两条路由永不冲突。其调用顺序为：从具体到模糊。例如，`'/home'` 路由先于 `'/{any*}'` 路由。

在 hapi 中设置一个基本的路由：

Express:
```js
app.get('/hello', function (req, res) { 
  res.send('Hello World!');
});
```

hapi:
```js
server.route({
    method: 'GET',
    path:'/hello',
    handler: (request, h) => {

      return 'Hello World!';
    }
});
```
要创建路由，Express 的结构为 `app.方法(路径, 处理函数)`，而hapi的结构为`server.route({方法, 路径, 处理函数})`。方法、路径、处理函数作为对象传递给 hapi 服务器。如上例，要在 Express 中返回字符串，需要调用 `res.send()`，而在 hapi 中，只需简单的返回字符串。

### <a name="methods" ></a> 方法

在 Express 中能用的路由方法，hapi 亦能用。且 hapi 更进一步，除了 `HEAD` 之外，还可以在单个路由对象上使用多种方法。 例如：

```js
server.route({
    method: ['PUT', 'POST'],
    path: '/',
    handler: function (request, h) {

        return 'I did something!';
    }
});
```
如需使用所有可用的方法，Express 用 `app.all()`，hapi 用 `method: '*'`。

### <a name="path" ></a> 路径

hapi 的路径（path）选项必须是字符串，也可以带参数，这与 Express 一样。Express 中的参数以 `:`开头，例如：`'/users/:userId'`。在 hapi 中，参数放在花括号中，例如：`path: '/users/{userId}'`。

### <a name="parameters" ></a> 参数

Express 与 hapi 处理普通参数，各不相同，但处理可选参数，两者相同。在参数后添加 `?` 即可：`path: '/hello/{user?}`。

在 hapi 中，获取参数与 Express 非常相似。Express 参数在 `req.params` 对象中。hapi 在 `request.params` 对象中。例：

Express:
```js
app.get('/hello/:name', function (req, res) {

    const name = req.params.name
    res.send('Hello ' + name);
});
```

hapi:
```js
server.route({
    method: 'GET',
    path: '/hello/{name}',
    handler: function (request, h) {

        const name = request.params.name;
        return 'Hello ' + name
    }
});
```

两框架查询参数也相似。Express 通过 `req.query` 获得，而 hapi 通过 `request.query` 获得。

### <a name="handler" ></a> 处理函数

Express 和 hapi 的路由处理函数的结构有所不同。Express 的处理函数参数为 `req` 和 `res`，hapi的处理程序参数为 `request` 和 `h`。其中，第二个参数 `h` 为响应工具包，是个对象，有几个方法，用来响应请求。

请看用例，用路由处理函数来重定向到新路由：

Express:
```js
app.get('/home', function (req, res) {

    res.redirect('/');
});
```

hapi:
```js
server.route({
    method: 'GET',
    path: '/home',
    handler: function (request, h) {

        return h.redirect('/');
    }
});
```

这两个路由都重定向到 `'/'`。 Express 使用响应方法 `res.redirect`，而hapi用响应工具包 `h.redirect`。但有一些 Express 的响应方法，hapi 只需 `return` 即可。诸如 `res.send`、`res.json`。 以下例子，hapi 响应 JSON 数据：

```js
server.route({
    method: 'GET',
    path: '/user',
    handler: function (request, h) {

        const user = {
            lastName: '张',
            firstName: '三',
            userName: '张三',
            id: 123
        }

        return user;
    }
});
```
hapi 默认响应 JSON。只要返回有效的 JavaScript 对象，hapi 自动处理剩余工作。

## <a name="plugins" ></a> 中间件与插件和扩展 `Middleware vs Plugins and Extensions`

Express 用中间件来扩展功能。中间件本质上是一系列回调函数。但应用程序上规模后，中间件执行顺序难以维护。若某中间件在前，其依赖中间件执行在后，会出问题。hapi 强大的插件和扩展系统可解决此问题。

插件可将程序逻辑分解，以复用。各插件依赖项彼此独立，依赖明确于插件内。换言之，不必额外安装插件的依赖项。可以添加已有的插件，亦能自己编写。欲知详情，参见[插件教程](/tutorials/plugins/?lang=zh_CN)。

hapi 中的每个请求都有请求生命周期。hapi 的请求生命周期扩展点，可创建自定义功能。经由扩展点，亦能明确应用程序运行顺序。详情请参见 hapi [请求生命周期](/api/#request-lifecycle)。

### <a name="extension" ></a> 扩展点

hapi 请求生命周期共有扩展点 7 个。依次是 `onRequest`、`onPreAuth`、`onCredentials`、`onPostAuth`、`onPreHandler`、`onPostHandler`、`onPreResponse`。要在扩展点上加功能，请调用 `server.ext()`。例：

```js
server.ext('onRequest', function (request, h) {

    request.setUrl('/test');
    return h.continue;
});
```

该扩展函数运行于 `onRequest`，此扩展点为第一个。在收到请求对象后，路由查询之前，运行 `onRequest`。此函数将全部请求重新路由到 `'/test'`。

### <a name="creating" ></a> 插件制作

众所周知，Express 可自定义中间件。hapi 插件也能。插件是个对象，包含必要属性 `name` 和 `register`。属性 `register` 是个方法， 其签名为 `async function (server, option)`。以下演示一个基础插件：

Express:
```js
const getDate = function (req, res, next) {

    req.getDate = function() {

        const date = new Date();
        return date;
    };

    next();
};
```

hapi:
```js
const getDate = {
    name: 'getDate',
    version: '1.0.0',
    register: async function (server, options) {

        const currentDate = function() {

            const date = new Date();
            return date;
        };

        server.decorate('toolkit', 'getDate', currentDate);
    }
};
```
hapi 插件将当前日期保存于 `h.getDate()`。然后，可以在任何路由处理程序中使用。

### <a name="load" ></a> 插件加载

在 Express 中，调用 `app.use()` 方法来加载中间件。在 hapi 中，调用 `server.register()` 方法。以下演示加载上一节创建的插件：

Express:
```js
app.use(getDate);
```

hapi:
```js
await server.register({
    plugin: getDate
});
```
此外，还可以在 `server.register()` 上设置属性 `options` 来为插件提供选项。

### <a name="options" ></a> 选项

Express 中，通过导出接受 options 参数的函数来向间件添加选项，该函数随后返回中间件。在 hapi 中，注册插件时设置选项。来看一下：

Express:
```js
module.exports = function (options) {
    return function getDate(req, res, next) {

        req.getDate = function() {

            const date = '你好 ' + options.name + ', 现在是 ' + new Date();
            return date;
        };

        next()
    };
};
```

hapi:
```js
server.register({
    plugin: getDate,
    options: {
        name: '张三'
    }
})
```
要访问 hapi 中的选项，只需在创建插件时引用 `options` 对象即可：

Express:
```js
const getDate = require('./mw/getDate.js');

app.use(getDate({ name: 'Tom' }));
```

hapi:
```js
const getDate = {
    name: 'getDate',
    version: '1.0.0',
    register: async function (server, options) {

        const currentDate = function() {

            const date = '你好 ' + options.name + ', 现在是 ' + new Date();
            return date;
        };

        server.decorate('toolkit', 'getDate', currentDate);
    }
};
```

## <a name="bodyParser" ></a> body-parser

hapi 在其核心内置了解析功能。不同于 Express，不需要中间件来解析负载数据。其实，要解析数据，Express 可能需要额外安装三四个中间件。而 hapi，负载数据，无论是 JSON 还是纯文本，都可以在 `request.payload` 对象中获得。例：

Express:
```js
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extend: true}));

app.post('/hello', function (req, res) {

  var name = req.body.name
  res.send('你好 ' + name);
});
```

hapi:
```js
server.route({
    method: 'POST',
    path: '/hello',
    handler: function (request, h) {

        const name = request.payload.name;
        return `你好 ` + name;
    }
});
```
express 中，解析 JSON，必须指明：
```js
app.use(bodyParser.json());
```

而 hapi，内置 JSON 解析。

## <a name="config" ></a> cookie-parser

在 Express 中，设置和解析 cookie，需安装 `cookie-parser` 中间件。hapi 直接内置了cookie 功能，因而无需其他中间件。要在 hapi 中使用 cookie，首先要用 `server.state()` 配置 cookie。例：

```js
const Hapi = require('@hapi/hapi');

const server = Hapi.server({ port: 8000 });

server.state('data', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true
});
```

### <a name="setCookie" ></a> Cookie 设置
配置了 cookie，就可以用 `h.state()` 设置 cookie。例：

Express:
```js
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', function(req, res) {

    res.cookie('username', '张三', { maxAge: null, secure: true, httpOnly: true });
    res.send('你好');
});
```

hapi:
```js
const Hapi = require('@hapi/hapi');

const server = Hapi.server({ port: 8000 });

server.state('username', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        h.state('username', '张三');
        return h.response('你好');
    }
});
```

Express 配置 cookie，用 `res.cookie` 中的 `options` 对象。hapi 用 `server.state` 保存配置到服务器对象。然后，用 `h.state()` 将数据附加到 cookie。

### <a name="getCookie" ></a> Cookie 获取

欲获取 hapi 中的 cookie，调用 `request.state`。例：

Express:
```js
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser);

app.use(cookieParser());

app.get('/', (req, res) => {

    res.cookie('username', '张三', { maxAge: null, secure: true, httpOnly: true })
    res.send(req.cookies.username);
});
```

hapi:
```js
const Hapi = require('@hapi/hapi');

const server = Hapi.server({ port: 8000 });

server.state('username', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true
});

server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {

        h.state('username', '张三');
        return h.response(request.state.username);
    }
});
```

## <a name="bell" ></a> Passport -> bell

Express 用 Passport 来确认第三方身份。在 hapi 中，可以使用 [bell](/module/bell) 模块。`bell` 预定义 OAuth 配置有 30 余种，包括 Twitter、Facebook、Google、GitHub等。也可以自定义。完整列表，请参阅 [bell 提供者](https://github.com/hapijs/bell/blob/master/Providers.md)。`bell` 由 hapi 核心团队开发并维护，因此十分稳定可靠。Twitter 例：

Express:
```
npm install passport passport-twitter
```
<br />

```js
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback'
},
    function(token, tokenSecret, profile, cb) {
        User.findOrCreate({ twitterId: profile.id }, function (err, user) {
            return cb(err, user);
        }
    }
));

passport.seralizeUser(function(user, cb) {
    cd(null, user);
})

passport.deserializeUser(function(user, cb) {
    cd(null, obj);
})

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login'}),
    function(req, res) {

        res.redirect('/');
    });
```

hapi:
```
npm install '@hapi/bell'
```
<br />

```js
const Hapi = require('@hapi/hapi');
const Bell = require('@hapi/bell');

const server = Hapi.server({ port: 8000 });

await server.register(Bell);

server.auth.strategy('twitter', 'bell', {
    provider: 'twitter',
    password: 'cookie_encryption_password_secure',
    clientId: TWITTER_CONSUMER_KEY,
    clientSecret: TWITTER_CONSUMER_SECRET,
    isSecure: false
});

server.route({
    method: '*',
    path: '/auth/twitter',            // 在提供者那里注册的回调端点
    handler: function (request, h) {

        if (!request.auth.isAuthenticated) {
            return `Authentication failed due to: ${request.auth.error.message}`;
        }

        // 执行账户查询或注册，设置本地会话，并重定向到应用程序。
        // 第三方凭证存储于 request.auth.credentials
        // 初始请求中的任何查询参数
        // 都通过 request.Auth.credentials.query 传回。

        return h.redirect('/home');
    },
    options: {
        auth: {
          strategy: 'twitter',
          mode: 'try'
        }
    }
});
```
要使用 bell，只需注册插件，并使用 `server.auth.strategy` 配置策略。

`provider` 是第三方名称。

`password` 是 cookie 加密密码。

`clientId` 是 OAuth 客户端标识符，可从提供商处获得。

`clientSecret` 是OAuth客户端密钥，可以从提供商处获得。

`isSecure` 设置 cookie 安全标志。生产环境，应将其置为 `true`，这也是默认设置。

## <a name="joi" ></a> express-validator -> joi

Express 确认数据，用`express-validator` 插件。`express-validator` 有个大缺点，可以确认请求，但没有明确的方法来确认响应。在 hapi 中，可以使用 [joi](https://joi.dev) 模块，用该模块确认请求和响应，更轻松方便。Joi 使用简单干净的对象语法创建确认。 要更深入了解，请参见 [确认教程](/tutorials/validation/?lang=zh_CN)。

### <a name="input" ></a> 输入确认

输入确认可以核实传到服务器的数据，包括其参数，有效负载等。下面介绍如何在 Express 和 hapi 中确认博文条目：

Express:
```
npm install express-validator
```
<br />

```js
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator())

app.post('/post', function (req, res) {

  req.check('post', '文章过长').isLength({ max: 140 });

  let errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
  } else {
    res.send('文章已添加！') 
  }
});
```

hapi:
```
npm install joi
```
<br />

```js
const Joi = require('joi')

server.route({
    method: 'POST',
    path: '/post',
    handler: (request, h) => {

        return '文章已添加！';
    },
    options: {
        validate: {
            payload: Joi.object({
                post: Joi.string().max(140)
            })
        }
    }
});
```

安装 `joi` 并引入。要确认输入数据，需指定数据类型，设置规则。此时，`post` 为 `string`，最长 140 个字符。在 `joi` 中，可以将规则链在一起，例如：

```js
Joi.string().min(1).max(140).
```

### <a name="output" ></a> 输出确认

如上所述，`express-validator` 没有明确方法来确认响应。而 `joi`，响应确认快速且简单。我们来看一下：

hapi:
```js
const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().length(10),
    pageCount: Joi.number(),
    datePublished: Joi.date().iso()
});

server.route({
    method: 'GET',
    path: '/books',
    handler: async function (request, h) {

        return await getBooks();
    },
    options: {
        response: {
            schema: Joi.array().items(bookSchema),
            failAction: 'log'
        }
    }
});
```
此路由返回书籍列表。在 `options` 中，指定书籍列表应遵循的规则。将 `failAction` 设置为 `log` 后，若出现错误，服务器会记录之。

## <a name="vision" ></a> app.set('view engine') -> vision

hapi 支持模板渲染，包括加载和利用各种模板引擎、参数，辅助函数（helpers，模板中用于操处理数据）、布局的能力。Express 使用 `app.set('view engine')` 启用视图功能，hapi由 [vision](/module/vision) 插件提供。有关 hapi 中视图的更详细的教程，请参见 [视图教程](/tutorials/views/?lang=zh_CN)。

### <a name="viewengine" ></a> 设置视图引擎

express 中设置视图引擎如下：

```js
app.set('view engine', 'pug');
```

要在 hapi 中设置视图引擎，注册 `vision` 插件，并配置 `server.views`：
```js
await server.register(require('@hapi/vision'));

server.views({
    engines: {
        pug: require('pug')
    },
    relativeTo: __dirname,
    path: 'views'
});
```
Express 默认在 `views` 文件夹中寻找视图或模板。hapi 中，可用 `relativeTo` 和 `path` 属性来指定视图的位置。像 Express 一样，hapi支持各种模板引擎(`template engines`)，例如 pug、ejs、handlebars等。

hapi 的 `server.views` 配置丰富。详情参见 [views 教程](/tutorials/views/?lang=zh_CN)。

### <a name="view" ></a> 渲染

Express 中渲染视图，调用 `res.render()`。hapi 则有两种方法：`h.view`、视图处理对象。例：

Express 中渲染：

```js
app.get('/', function (req, res) {

    res.render('index', { title: '主页', message: '欢迎' });
});
```
hapi 用 `h.view`:

```js
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        return h.view('index', { title: '主页', message: '欢迎' });
    }
});
```
或用视图处理对象:

```js
server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: {
            template: 'index',
            context: {
                title: '主页',
                message: '欢迎'
            }
        }
    }
});
```
欲在 `h.view` 中传递上下文，需要传递一个对象以为第二参数。要在视图处理对象中上下文，请使用 `context` 属性。

## <a name="inert" ></a> express.static() -> inert

hapi 静态文件服务用 [inert](/module/inert) 插件。inert 提供了用于处理静态文件和目录的新处理方法，并向响应工具包添加了 `h.file()` 方法。详情请参阅 [静态文件服务](/tutorials/servingfiles/?lang=zh_CN) 教程。

### <a name="single" ></a> 单文件服务

Express 用 `res.sendFile` 方法返回单个文件。在hapi中，使用 `h.file（）` 方法或文件处理对象，可以通过 [inert](/module/inert) 获得。一旦注册了 `inert` 插件，便可以提供静态文件服务：

Express:
```js
app.get('/image', function (req, res) {

    res.sendFile('image.jpg', {root: './public'});
});
```

hapi with `h.file()`:
```js
const server = new Hapi.Server({
    port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

await server.register(require('@hapi/inert'));

server.route({
    method: 'GET',
    path: '/image',
    handler: function (request, h) {

        return h.file('image.jpg');
    }
});
```
或文件处理对象:
```js
const server = new Hapi.Server({
    port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

await server.register(require('@hapi/inert'));

server.route({
    method: 'GET',
    path: '/image',
    handler: {
        file: 'image.jpg'
    }
});
```

要启用静态文件服务，须指明静态文件目录。其配置在 `server.options.routes` 中的 `files.relativeTo`，就像在 Express 中 `res.sendFile` 选项一样。接下来，注册 `inert` 插件，以添加访问静态文件的方法。而后，在路由处理函数中，用 `h.file()` 或文件处理对象来处理静态文件。

### <a name="static" ></a> 静态文件服务器

Express 中设置静态文件服务器，使用 `express.static()` 中间件。在 hapi 中，使用 [inert](/module/inert) 插件提供的文件处理程序。与上一节一样，配置目录。 而后，设置路由以捕获请求并返回文件。例：

Express:
```js
app.use(express.static('/public'));
```

hapi:
```js
const server = new Hapi.Server({
    port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

await server.register(require('@hapi/inert'));

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.'
        }
    }
});
```
访问 `localhost:3000/filename` 来查看静态文件。[inert](/module/inert) 选项丰富，功能多样，详情请参阅 [静态文件服务教程](/tutorials/servingfiles/?lang=zh_CN)。

## <a name="boom" ></a> Error Handling -> boom

hapi 用 [boom](/module/boom) 模块来处理错误。默认格式为 JSON。而 Express 默认返回文本响应，这对 JSON API 不友好。下面例子演示 404 错误响应，向未知路由 `/hello` 发请求：

Express:

```js
Cannot GET /hello
```

hapi:
```json
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "Not Found"
}
```

### <a name="custom" ></a> 消息自定义

`boom` 可自定义错误消息。继续上面的 404 错误并返回新消息：

Express:
```js
res.status(400).send({status: 404, error: "Page not found"});
```

hapi:
```js
throw Boom.notFound('Page not found');
```

Express 中，自定义报错信息，需以 json 对象形式指明状态码及报错信息。而 `boom` 无需如此。在上面的示例中，抛出 `Boom.notFound()` 来设置错误消息。`boom` 内置诸多 4xx、5xx 错误处理方法，例如 `Boom.unauthorized()`、`Boom.badRequest()`、`Boom.badImplementation()`等。详情请参见 [boom](/module/boom)。
