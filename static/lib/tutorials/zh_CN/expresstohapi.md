# Express 迁移

_当前文献适用于 hapi v17 或者更新的版本_


## <a name="overview" ></a> 总揽

这个Express 到 hapi的指南将向您展示如何使用Express中的知识，以及如何在hapi中做到这一点。 Express的大部分功能都严重依赖中间件，而hapi则更多地内置于核心中。 正文解析 (Body Parsing)，cookie的处理，输入/输出验证以及HTTP友好错误处理对象已内置在hapi的框架中。 为了获得更多功能，hapi在其核心生态系统中提供了丰富的插件选择。 hapi也是唯一一个不依赖外部依赖项的框架。每个依赖项均由核心hapi团队进行管理，这使安全性和可靠性成为了hapi的最大优势。

## <a name="setup" ></a> 配置

### <a name="installation" ></a> 安装

Express:
`npm install express`


hapi:
`npm install @hapi/hapi`


### <a name="server" ></a> 创建一个 `Server`

Express:
```js
var express = require('express');
var app = express();

app.listen(3000, function () {
  console.log('Server is running on port 3000');
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
    console.log('Server running on port 3000');
};

init();
```
与Express不同，在hapi中，您创建了一个服务器对象，它将成为您应用程序的焦点。 服务器对象中设置的属性将确定您的应用程序的行为。 创建服务器对象后，您可以通过调用以下命令启动服务器。

## <a name="routes" ></a> 路由 `Routes`

hapi中的路由以特定顺序被调用，因此，两条路由之间相互冲突的问题将永远不会出现。 路由从最具体到最不具体。 例如，路径为 `'/ home'` 的路径将在 `'/{any*}'` 之前被调用。

让我们来看一下如何在hapi中设置一个基本的路由：

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
要创建路由，Express的结构为`app.METHOD(PATH, HANDLER)`，而hapi的结构为`server.route({METHOD, PATH, HANDLER})`。该方法，路径和处理程序作为对象传递给hapi服务器。 如您所见，要在Express中返回字符串，需要调用`res.send（）`，而在hapi中，您只需简单的返回字符串。

### <a name="methods" ></a> 方法

除了 `HEAD` 之外，hapi可以使用所有Express可以使用的所有路由方法。hapi还可以在单个路由对象上使用多种方法。 例如：

```js
server.route({
    method: ['PUT', 'POST'],
    path: '/',
    handler: function (request, h) {

        return 'I did something!';
    }
});
```
如需使用所有可用的方法，像Express使用 `app.all()` 一样，使用 `method: '*'`。

### <a name="path" ></a> 路径

与在Express中一样，hapi中的path选项必须是字符串，也可以包含参数。 Express中的参数以`：`开头，例如：`'/users/:userId'`。 在hapi中，您可以将参数放在花括号中，例如：`path: '/users/{userId}'`。

### <a name="parameters" ></a> 参数

与Express相比，您已经在上面看到了hapi是如何处理简单参数的。 hapi和Express都以相同方式处理可选参数。与Express一样，要使参数在hapi中成为可选参数，只需在参数后添加一个 `?`：`path: '/hello/{user?}`。

在hapi中访问参数与Express非常相似。 如您所知，在Express中，参数填充在 `req.params` 对象中。 在hapi中，可通过 `request.params` 对象获得参数。 这是两个示例：

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

在两个框架中，查询参数也相似。 在Express中，它们可以通过 `req.query` 获得，而hapi它们可以通过 `request.query` 获得。

### <a name="handler" ></a> Handler

Express和hapi构造其路由处理程序的方式有所不同。 与Express的处理程序的参数为 `req` 和 `res` 不同，hapi的处理程序的参数为 `request` 和 `h`。 第二个参数 `h` 是响应工具包，它是一个具有几种用于响应请求的方法的对象。

这里是一个关于使用Express和hapi的路由和handler用来重定向到一个新的路由的用例：

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

这两个路由都将重定向到 `'/'` 路由。 Express使用响应方法 `res.redirect`，而hapi使用 `h.redirect`，它是响应工具包的一部分。 hapi可以通过使用`return`来完成Express响应方法。 其中一些方法包括`res.send`和`res.json`。 以下是hapi如何使用JSON数据进行响应的示例：

```js
server.route({
    method: 'GET',
    path: '/user',
    handler: function (request, h) {

        const user = {
            firstName: 'John',
            lastName: 'Doe',
            userName: 'JohnDoe',
            id: 123
        }

        return user;
    }
});
```
hapi具有默认情况下响应JSON数据的功能。唯一要做的就是返回一个有效的JavaScript对象，而hapi将为您处理其余的工作。

## <a name="plugins" ></a> 中间件 vs 插件和扩展 `Middleware vs Plugins and Extensions`

为了扩展其功能，Express使用中间件。中间件实质上是一系列使用回调执行下一个功能的功能。问题在于，随着您的应用程序规模和复杂性的增长，中间件的执行顺序变得越来越重要，也更加难以维护。 在依赖中间件之前执行中间件会导致您的应用程序失败。hapi通过其强大的插件和扩展系统解决了此问题。

插件使您可以将应用程序逻辑分解为孤立的业务逻辑和可重用的实用程序。每个插件都有其自己的依赖性，这些依赖性在插件本身中明确指定。这意味着您不必自己安装依赖项即可使插件正常工作。 您可以添加现有的hapi插件，也可以编写自己的插件。有关插件的更详细的教程，请参见[plugins](/tutorials/plugins/?lang=en_US)教程。

hapi中的每个请求都遵循预定义的路径，即请求生命周期。hapi具有扩展点，可让您在生命周期中创建自定义功能。hapi中的扩展点让您知道应用程序运行的确切顺序。有关更多信息，请参见hapi [request lifecycle](/api/#request-lifecycle)。

### <a name="extension" ></a> 延伸点

hapi在请求周期内一共具有7个扩展点。 按顺序，它们分别都是 `onRequest`, `onPreAuth`, `onCredentials`, `onPostAuth`, `onPreHandler`, `onPostHandler` 以及 `onPreResponse`。要将功能添加到扩展点，请调用 `server.ext()`。让我们看一个例子：

```js
server.ext('onRequest', function (request, h) {

    request.setUrl('/test');
    return h.continue;
});
```

该函数将在第一个扩展点 `onRequest`处运行。 在服务器接收到请求对象之后，即在路由查找之前，将运行 `onRequest`。此功能将执行的操作是将所有请求重新路由到 `'/test'` 路由。

### <a name="creating" ></a> 制作一个插件

如您所知，您可以在Express中编写自己的中间件。 hapi插件也是如此。 插件是具有必需的 `name` 和 `register` 属性的对象。`register` 属性是一个带有 `async function (server, option)` 签名的功能。 让我们看一下如何创建一个基本的插件：

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
hapi插件会将当前日期保存在 `h.getDate()` 中。然后，我们可以在任何路由处理程序中使用它。

### <a name="load" ></a> 加载一个插件

在Express中，您可以通过调用 `app.use()` 方法来加载中间件。 在hapi中，您可以调用 `server.register()` 方法。 让我们加载上一节中创建的插件：

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
您还可以通过在 `server.register()` 上设置 `options` 属性来为插件提供选项。

### <a name="options" ></a> 选项

您可以通过导出接受options参数的函数来向Express中间件添加选项，该函数随后返回中间件。在hapi中，您可以在注册插件时设置选项。我们来看一下：

Express:
```js
module.exports = function (options) {
    return function getDate(req, res, next) {

        req.getDate = function() {

            const date = 'Hello ' + options.name + ', the date is ' + new Date();
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
        name: 'Tom'
    }
})
```
要访问hapi中的选项，只需在创建插件时引用 `options` 对象即可：

Express:
```js
const getDate = require('./mw/getDate.js');

app.use(getDate({ name: Tom }));
```

hapi:
```js
const getDate = {
    name: 'getDate',
    version: '1.0.0',
    register: async function (server, options) {

        const currentDate = function() {

            const date = 'Hello ' + options.name + ', the date is ' + new Date();
            return date;
        };

        server.decorate('toolkit', 'getDate', currentDate);
    }
};
```

## <a name="bodyParser" ></a> body-parser

hapi的核心具有解析能力。与Express不同，您不需要中间件来解析有效载荷数据。实际上，根据要解析的数据类型，您可能需要在Express中最多安装四个附加的中间件。在hapi中，有效载荷数据（无论是JSON还是纯文本）都可以在 `request.payload` 对象中获得。这是解析简单有效负载数据的并排比较：

Express:
```js
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extend: true}));

app.post('/hello', function (req, res) {  

  var name = req.body.name
  res.send('Hello ' + name);  
});
```

hapi:
```js
server.route({
    method: 'POST',
    path: '/hello',
    handler: function (request, h) {

        const name = request.payload.name;
        return `Hello ` + name;
    }
});
```
要解析express中的JSON对象，您必须指定它：
```js
app.use(bodyParser.json());
```

JSON解析内置于hapi中，因此不需要其他的步骤。

## <a name="config" ></a> cookie-parser

在Express中设置和解析cookie要求您安装 `cookie-parser` 中间件。hapi的核心已经内置了cookie功能，因此无需安装其他中间件。 要在hapi中使用cookie，首先要使用 `server.state()` 配置cookie。 我们来看一下：

```js
const Hapi = require('@hapi/hapi');

const server = Hapi.server({ port: 8000 });

server.state('data', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true
});
```

### <a name="setCookie" ></a> 设定 Cookie
设置cookie一旦配置了cookie，就可以使用 `h.state()` 设置cookie。这里有一个例子：

Express:
```js
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', function(req, res) {
    
    res.cookie('username', 'tom', { maxAge: null, secure: true, httpOnly: true });
    res.send('Hello');
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

        h.state('username', 'tom');
        return h.response('Hello');
    }
});
```

明确地说，您可以使用 `res.cookie` 中的 `options` 对象配置cookie。在hapi中，cookie配置使用 `server.state` 保存到服务器对象。然后，您可以使用 `h.state()` 将数据附加到cookie。

### <a name="getCookie" ></a> 得到一个 Cookie 的值

要获取hapi中的cookie值，请调用 `request.state`。让我们看看：

Express:
```js
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser);

app.use(cookieParser());

app.get('/', (req, res) => {
    
    res.cookie('username', 'tom', { maxAge: null, secure: true, httpOnly: true })
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

        h.state('username', 'tom');
        return h.response(request.state.username);
    }
});
```

## <a name="bell" ></a> Passport -> bell

在Express中，第三方身份验证是通过Passport处理的。在hapi中，您可以使用 [bell](/module/bell) 模块进行第三方身份验证。`bell` 为OAuth提供者提供了30多种预定义的配置，包括Twitter，Facebook，Google，GitHub等。 它还将允许您设置自己的自定义提供程序。 有关完整列表，请参阅 [bell providers documentation](https://github.com/hapijs/bell/blob/master/Providers.md)。 `bell` 是由核心hapi团队开发并维护的，因此您知道稳定性和可靠性不会成为问题。 让我们看看如何使用您的Twitter凭据进行身份验证：

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
    path: '/auth/twitter',            // The callback endpoint registered with the provider
    handler: function (request, h) {

        if (!request.auth.isAuthenticated) {
            return `Authentication failed due to: ${request.auth.error.message}`;
        }
        
        // Perform any account lookup or registration, setup local session,
        // and redirect to the application. The third-party credentials are
        // stored in request.auth.credentials. Any query parameters from
        // the initial request are passed back via request.auth.credentials.query.

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
要使用bell，只需注册插件并使用 `server.auth.strategy` 配置策略。

`provider` 是第三方的名称。

`password` 是cookie加密密码。

`clientId` 是OAuth客户端标识符，可从提供商处获得。

`clientSecret` 是OAuth客户端机密，可以从提供商处获得。

`isSecure` 设置 cookie 安全 flag。 对于产品，应将其设置为 `true`，这也是默认设置。

## <a name="joi" ></a> express-validator -> joi

要在Express中验证数据，您可以使用 `express-validator` 插件。`express-validator` 的最大缺点之一是尽管您可以验证请求，但没有明确的方法来验证响应。在hapi中，可以使用 [joi](/module/joi) 模块，该模块可以轻松地验证请求和响应。Joi允许您使用简单干净的对象语法创建自己的验证。 要更深入地了解hapi中的验证，请参见 [validation](/tutorials/validation/?lang=en_US) 教程。

### <a name="input" ></a> 输入验证

输入验证使您可以验证任何输入到服务器的输入数据，包括其参数，有效负载等。下面介绍如何验证Express和hapi中的博客文章条目：

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

  req.check('post', 'Post too long').isLength({ max: 140 });

  let errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
  } else {
    res.send('Blog post added!') 
  }
});
```

hapi:
```
npm install @hapi/joi
```
<br />

```js
const Joi = require('@hapi/joi')

server.route({
    method: 'POST',
    path: '/post',
    handler: (request, h) => {

        return 'Blog post added!';
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

首先安装 `joi`，然后在项目中需要它。 要验证输入日期，请指定所需的数据类型，然后在该数据上设置规则。在这种情况下，`post` 将是一个 `string`，最多包含140个字符。在 `joi` 中，您可以将规则串在一起，例如：

```js
Joi.string().min(1).max(140).
```

### <a name="output" ></a> 输出验证

如上所述，没有明确的方法可以使用 `express-validator` 进行响应验证。使用 `joi`，响应验证既快速又简单。我们来看一下：

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
此路线将返回书籍列表。 在 `options` 路线属性中，我们可以指定书籍清单应遵循的规则。 通过将 `failAction` 设置为 `log`，如果出现错误，服务器将记录该错误。

## <a name="vision" ></a> app.set('view engine') -> vision

hapi对模板渲染提供了广泛的支持，包括加载和利用多个模板引擎，局部函数，助手（模板中用于操纵数据的功能）和布局的能力。Express通过使用 `app.set('view engine')` 启用视图功能，其中hapi的功能由 [vision](/module/vision) 插件提供。有关hapi中视图的更详细的教程，请参见 [views](/tutorials/views/?lang=en_US) 教程。

### <a name="viewengine" ></a> 设置 View Engine

在 express 中设置 views engine 如下：

```js
app.set('view engine', 'pug');
```
要在hapi中设置view engine，首先必须注册vision plugin，然后配置 `server.views`：
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
默认情况下，Express将在 `views` 文件夹中寻找视图或模板。在hapi中，您可以使用 `relativeTo` 和 `path` 属性来指定视图的位置。像Express一样，hapi支持各种模板引擎(`template engines`)，例如pug，ejs，handbars等。
By default, Express will look for views or templates in the `views` folder. In hapi, you specify where the views are located using the `relativeTo` and `path` properties. Like Express, hapi supports a wide variety of templating engines, such as pug, ejs, handlebars, etc.

hapi在 `server.views` 中有更多可配置的选项。要查看功能的完整列表，请转到 [views](/tutorials/views/?lang=en_US) 教程。

### <a name="view" ></a> 渲染一个 View

要在Express中渲染视图，您可以调用 `res.render()`。 通过view，hapi有两种渲染view的方法：`h.view` 和view handler。 让我们看一下两者的用法。

第一个是在Express中渲染 view:

```js
app.get('/', function (req, res) {

    res.render('index', { title: 'Homepage', message: 'Welcome' });
});
```
Using `h.view` in hapi:

```js
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        return h.view('index', { title: 'Homepage', message: 'Welcome' });
    }
});
```
然后是在hapi中使用handler来渲染 view:

```js
server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: {
            template: 'index',
            context: {
                title: 'Homepage',
                message: 'Welcome'
            }
        }
    }
});
``` 
为了在 `h.view` 中传递上下文，您需要传递一个对象作为第二个参数。 要在 view 处理程序中传递 `context`，请使用 `context` 键。

## <a name="inert" ></a> express.static() -> inert

hapi可以从名为 [inert](/module/inert) 的插件中提供静态内容。inert提供了用于处理静态文件和目录的新处理程序方法，以及向响应工具箱中添加了 `h.file()` 方法。有关hapi中服务器静态文件的更深入的教程，请参阅 [serving static files](/tutorials/serving-files/?lang=en_US) 教程。

### <a name="single" ></a> 服务单个文件

在Express中，您可以使用 `res.sendFile` 方法返回单个文件。在hapi中，您可以使用 `h.file（）` 方法或文件处理程序，可以通过 [inert](/module/inert) 使用。一旦注册了插件，便可以提供静态文件：

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
hapi with file handler:
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

要在hapi中提供静态文件，您首先必须告诉hapi静态文件位于何处。您可以通过配置 `server.options.routes` 对象来实现。您将 `relativeTo` 设置为文件所在的文件夹，就像在Express中 `res.sendFile` 的 options 对象中所做的一样。接下来，您需要注册惰性插件。这将使您能够访问允许提供静态文件的方法。现在，在路由处理程序中，您可以使用 `h.file()` 方法或文件处理程序来处理您的静态文件。

### <a name="static" ></a> 静态文件服务器
要在Express中设置静态文件服务器，可以使用 `express.static()` 中间件。在hapi中，您使用 [inert](/module/inert) 插件提供的文件处理程序。您将通过告诉文件位于何处，以与服务单个静态文件相同的方式设置服务器。 然后，您将设置一条路由以捕获所有请求并返回正确的文件。 我们来看一下：

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
现在，您可以通过访问 `localhost:3000/filename` 来访问任何静态文件。 [inert](/module/inert) 具有许多其他选项和功能。要查看其所有功能，请参阅 [serving static files](/tutorials/serving-files/?lang=en_US) tutorial 教程。
Now, you can access any static files by going to `localhost:3000/filename`. [inert](/module/inert) has many other options and capabilities. To see what all it can do, please see the [serving static files](/tutorials/serving-files/?lang=en_US) tutorial.

## <a name="boom" ></a> Error Handling -> boom

hapi使用 [boom](/module/boom) 模块来处理错误。默认情况下，boom将以JSON格式返回错误。另一方面，Express默认情况下将返回文本响应，该响应在JSON API中并非最佳。通过向不存在的 `'/hello'` 提交 `GET` 请求，以默认设置查看404错误响应：

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

### <a name="custom" ></a> 自定义消息

`boom` 可让您轻松更改任何状态代码的错误消息。让我们使用上面的404错误并返回一条新消息：

Express:
```js
res.status(400).send({status: 404, error: "Page not found"});
```

hapi:
```js
throw Boom.notFound('Page not found');
```

在Express中，您设置状态代码，然后发送错误消息正文。在这种情况下，我们返回带有状态代码和错误消息的JSON对象。在 `boom` 中，不需要返回带有状态码的JSON对象，默认情况下会这样做。在上面的示例中，您抛出 `Boom.notFound()` 来设置错误消息。 `boom` 包含一长串4xx和5xx错误，例如 `Boom.unauthorized()`，`Boom.badRequest()`，`Boom.badImplementation()`等。有关完整列表，请参见 [boom](/module/boom) 文档。
