# Express Migration

_This guide is compatible with hapi v17 and newer_

1. [Overview](#overview)
1. [Setup](#setup)
    1. [Installation](#installation)
    1. [Creating a Server](#server)
1. [Routes](#routes)
    1. [Methods](#methods)
    1. [Path](#path)
    1. [Parameters](#parameters)
    1. [Handler](#handler)
    1. [Parsing](#parsing)
1. [Middleware vs Plugins and Extensions](#plugins)
    1. [Extension Points](#extension)
    1. [Creating a Plugin](#creating)
    1. [Loading a Plugin](#load)
        1. [Options](#options)
1. [body-parser](#bodyParser)
1. [cookie-parser](#config)
    1. [Setting a Cookie](#settingCookie)
    1. [Getting a Cookie Value](#getCookie)
1. [Passport -> bell](#bell)
1. [express-validator -> joi](#joi)
    1. [Input Validation](#input)
    1. [Output Validation](#output)
1. [app.set('view engine') -> vision](#vision)
    1. [Setting the View Engine](#viewengine)
    1. [Rendering a View](#view)
1. [express.static() -> inert](#inert)
    1. [Serving Single Files](#single)
    1. [Static File Server](#static)
1. [Error handling -> boom](#boom)
    1. [Custom messages](#custom)


## <a name="overview" ></a> Overview

This Express to hapi guide will show you how to take what you know how to do in Express, and do it in hapi. While Express relies heavily on middleware for much of its functionality, hapi has more built into the core. Body parsing, cookie handling, input/output validation, and HTTP-friendly error objects are already built-in to the hapi framework. For additional functionality, hapi has a robust selection of plugins in its core ecosystem. hapi is also the only framework that doesn't rely on outside dependencies. Every dependency is managed by the core hapi team, which makes security and reliability some of hapi's greatest strengths. 

## <a name="setup" ></a> Setup

### <a name="installation" ></a> Installation

Express:
`npm install express`


hapi:
`npm install @hapi/hapi`


### <a name="server" ></a> Creating a Server

Express:
```js
var express = require('express');
var app = express();

app.listen(3000, function () {
  console.log('Server is running on port 3000')
}))
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
Unlike Express, in hapi you create a server object that will be the focal point of your application. The properties set in the server object will determine how your application behaves. Once you create your server object, you can start your server by calling `server.start()`.

## <a name="routes" ></a> Routes

Routes in hapi get called in a specific order, so you will never have an issue where two routes are conflicting with one another. Routes are called from most specific to least specific. For example, a route with a path `'/home'` will be called before `'/{any*}'`. 

Lets look at how to set up a basic route in hapi:

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
    path:'/',
    handler: (request, h) => {

      return 'Hello World!';
    }
});
```
To create a route, Express has the structure of `app.METHOD(PATH, HANDLER)` and  hapi has the structure `server.route({METHOD, PATH, HANDLER})`. The method, path, and handler are passed to the hapi server as an object. As you can see, to return a string in Express, you call `res.send()`, whereas in hapi, you simply return the string.

### <a name="methods" ></a> Methods

hapi can use all the route methods that Express can, except `HEAD`. hapi also has the ability to use multiple methods on a single route object. For example:

```js
server.route({
    method: ['PUT', 'POST'],
    path: '/',
    handler: function (request, h) {

        return 'I did something!';
    }
});
```
To use all available methods, like in Express `app.all()`, use `method: '*'`. 

### <a name="path" ></a> Path

Like in Express, the path option in hapi must be a string, which can also contain parameters. Parameters in Express are preceded by `:`, such as: `'/users/:userId'`. In hapi, you would put the parameter in curly braces, like: `path: '/users/{userId}'`. 

### <a name="parameters" ></a> Parameters

You saw above how hapi handles simple parameters as compared to Express. Both hapi and Express handle optional parameters the same way. Just like Express, to make a parameter optional in hapi, just include a `?` after the parameter: `path: '/hello/{user?}`.

Accessing the parameters in hapi is very similar to Express. As you know, in Express, the parameters are populated in the `req.params` object. In hapi, the parameters are available via the `request.params` object. Here is an example of both:

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
})
```

Query parameters are also similar in both frameworks. In Express, the are available via `req.query` and hapi they are available via `request.query`. 

### <a name="handler" ></a> Handler

There are differences in the way Express and hapi structure their route handlers. Unlike Express, which has a handler with parameters of `req` and `res`, hapi has a handler with parameters of `request` and `h`. The second parameter, `h` is the response toolkit, which is an object with several methods used to respond to the request. 

Here is an example of route with a handler that redirects to another route in Express and hapi:

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

        h.redirect('/');
    }
});
```
Both routes will redirect to the `'/'` route. Express uses the response method `res.redirect` whereas hapi uses `h.redirect` which is part of the response toolkit. There are Express response methods that hapi can accomplish by just using `return`. Some of these methods include `res.send` and `res.json`. Here is an example of how hapi will respond with JSON data:

```js
server.route({
    method: 'GET',
    path: '/user',
    handler: function (request, h) {

        const user = {
            firstName: John,
            lastName: Doe,
            userName: JohnDoe,
            id: 123
        }

        return user;
    }
});
```
hapi has the functionality to respond with JSON data by default. They only thing you have to do is just return a valid JavaScript object and hapi will take care of the rest for you.

## <a name="plugins" ></a> Middleware vs Plugins and Extensions

To extend its functionality, Express uses middleware. Middleware essentially is a sequence of functions using callbacks to execute the next function. The issue with this is as your application grows in size and complexity, the order at which middleware executes becomes more crucial and more difficult to maintain. Having a middleware execute before one it's dependant on will cause you application to fail. hapi fixes this issue with its robust plugin and extension system. 

Plugins allow you to break your application logic into isolated pieces of business logic, and reusable utilities. Each plugin comes with its own dependencies which are explicitly specified in the plugins themselves. This means you don't have to install dependencies yourself to make your plugins work. You can either add an existing hapi plugin, or write your own. For a more extensive tutorial on plugins, please see the [plugins](/tutorials/plugins/?lang=en_US) tutorial.  

Each request in hapi follows a predefined path, the request lifecycle. hapi has extension points that let you create custom functionlity along the lifecycle. Extension points in hapi let you know the precise order at which you application will run. For more info, please see the hapi [request lifecycle](/api/#request-lifecycle).

### <a name="extension" ></a> Extension Points

hapi has 7 extension points along the request lifecycle. In order, they are `onRequest`, `onPreAuth`, `onCredentials`, `onPostAuth`, `onPreHandler`, `onPostHandler`, and `onPreResponse`. To add a function to an extension point, you call `server.ext()`. Lets look at an example:

```js
server.ext('onRequest', function (request, h) {

    request.setUrl('/test');
    return h.continue
});
```

This function will run at `onRequest`, which is the first extension point. `onRequest` is run just after the server receives the request object, before the route lookup. What this function will do is reroute all requests to the `'/test'` route. 

### <a name="creating" ></a> Creating a Plugin

As you know, you can write you own middleware in Express. The same is true with hapi plugins. A plugin is an object with with required `name` and `register` properties. The `register` property is a function with the signature of `async function (server, option)`. Lets look at how to create a basic plugin:

Express:
```js
const getDate = function (req, res, next) {

    req.getDate = new Date();
    next()
}
```

hapi:
```js
const getDate = {
    name: 'getDate',
    version: '1.0.0',
    register: async function (server, options) {

        const currentDate = function() {

            const date = new Date();
            return date
        }

        server.decorate('toolkit', 'getDate', currentDate);
    }
}
```
The hapi plugin will save the current date in `h.getDate()`. We can then use this in any of our route handlers. 

### <a name="load" ></a> Loading a Plugin

In Express, you load middleware by calling the `app.use()` method. In hapi, you call the `server.register()` method. Lets load the plugin we created in the previous section:

Express:
```js
app.use(getDate);
```

hapi:
```js
server.register({
    plugin: getDate
})
```
You can all addition options for you plugin by setting the `options` property on `server.register()`.

### <a name="options" ></a> Options

You can add options to Express middleware by exporting a function that accepts an options parameter, which then returns the middleware. In hapi, you set the options when you register the plugin. Lets have a look:

Express:
```js
module.exports = function (options) {
    return function (req, res, next) {

        req.getDate = 'Hello ' + options.name + ', the date is ' + new Date();
        next()
    }
}
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
To get access to the options in hapi, you simply refer to the `options` object when you create the plugin:

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
            return date
        }

        server.decorate('toolkit', 'getDate', currentDate);
    }
}
```

## <a name="bodyParser" ></a> body-parser

hapi has parsing abilities built into its core. Unlike Express, you do not need middleware to parse payload data. In fact, you may need to install up to four additional middlewares in Express depending on what kind of data you would like to parse. In hapi the payload data, whether its JSON or plain text, is readily available in the `request.payload` object. Here is a side by side comparison of parsing simple payload data:

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

        const name = request.payload.name
        return `Hello ` + name;
    }
});
```

To parse a JSON object in express, you have to specify it:
```js
app.use(bodyParser.json())'
```

JSON parsing is built into hapi, so there are no further steps needed. 

## <a name="config" ></a> cookie-parser

Setting and parsing cookies in Express require you to install the `cookie-parser` middleware. hapi has cookie functionality built right into the core, so there is no need to install additional middleware. To use cookies in hapi, you first configure the cookie with `server.state()`. Lets have a look:

```js
const Hapi = require('@hapi/hapi');

const server = Hapi.server({ port: 8000 });

server.state('data', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true
});
```

### <a name="setCookie" ></a> Setting a Cookie
Once the cookie is configured, you can now set the cookie with `h.state()`. Here is an example:

Express:
```js
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser);

app.use(cookieParser());

app.get('/', function(req, res) {
    
    res.cookie('username', 'tom', { maxAge: null, secure: true, httpOnly: true})
    res.send('Hello');
});
```

hapi:
```js
const Hapi = require('@hapi/hapi');

const server = Hapi.server({ port: 8000 });

server.state('data', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        h.state('data', {username: 'tom'});
        return h.response('Hello');
    }
});
```
In express, you configure cookie with the `options` object in `res.cookie`. In hapi, the cookie config is saved to the server object with `server.state`. You then use `h.state()` to attach data to the cookie. 

### <a name="getCookie" ></a> Getting a Cookie Value

To get a cookie value in hapi, you call `request.state`. Lets have look:

Express:
```js
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser);

app.use(cookieParser());

app.get('/', async (req, res) => {
    
    await res.cookie('username', 'tom', { maxAge: null, secure: true, httpOnly: true})
    await res.send(req.cookies.username);
});
```

hapi:
```js
const Hapi = require('@hapi/hapi');

const server = Hapi.server({ port: 8000 });

server.state('data', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true
});

server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {

        await h.state('data', {username: 'tom'});
        return h.response(request.state.username);
    }
});
```

## <a name="bell" ></a> Passport -> bell

In Express, third party authentication is handled with Passport. In hapi, you use the [bell](https://github.com/hapijs/bell) module for third party authentication. `bell` has over 30 predefined configurations for OAuth providers including Twitter, Facebook, Google, Github, and more. It will also allow you to set up your own custom provider. For a complete list, please see the [bell providers documentation](https://github.com/hapijs/bell/blob/master/Providers.md). `bell` was developed and is maintained by the core hapi team, so you know stability and reliability won't be an issue. Lets look how to authenticate using your Twitter credentials:

Express:
```js
npm install passport passport-twitter
```
<br />

```js
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy

passport.user(new TwitterStrategy({
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
```js
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
        auth: 'twitter'
    }
});
```

To use bell, simply register the plugin and configure the strategy with `server.auth.strategy`. 

`provider` is the name of the third-party provider. 

`password` is the cookie encryption password. 

`clientId` is the OAuth client identifier, which is available from the provider.

`clientSecret` is the OAuth client secret, which is available from the provider.

`isSecure` sets the cookie secure flag. For production, this should be set to `true`, which is the default value. 

## <a name="joi" ></a> express-validator -> joi

To validate data in Express, you make use of the `express-validator` plugin. One of the biggest drawbacks to `express-validator` is that while you can validate a request, there is no clear way of validating a response. In hapi, you use the [joi](https://github.com/hapijs/joi) module, which can validate requests and responses with ease. Joi allows you to create your own validations with a simple and clean object syntax. For a more in-depth look at validation in hapi, please see the [validation](/tutorials/validation/?lang=en_US) tutorial.

### <a name="input" ></a> Input Validation

Input validation allows you to validate any input data coming into the server, whether its parameters, payload, etc. Here is a look at how to validate a blog post entry in Express and hapi:

Express:
```js
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
    res.send(errors);
  } else {
    res.send('Blog post added!') 
  }
});
```

hapi:
```js
npm install @hapi/joi
```
<br />

```js
const Joi = require('joi')

server.route({
    method: 'POST',
    path: '/post',
    handler: async (request, h) => {

        return 'Blog post added!';
    },
    options: {
        validate: {
            payload: {
                post: Joi.string().max(140)
            }
        }
    }
});
```

First you install `joi`, then require it in your project. To validate the input date, you specify what data type you are expecting, then set rules on that data. In this case, `post` will be a `string` with a maximum number of characters of 140. In `joi` you can string rules together like:

```js
Joi.string().min(1).max(140).
```

### <a name="output" ></a> Output Validation

As stated above, there is no clear way of doing response validation with `express-validator`. With `joi`, response validation is fast and simple. Lets have a look:

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
This route will return a list of books. In the `options` route property, we can specify what rules the list of books should follow. By setting the `failAction` to `log`, if there is an error, the server will log the error.

## <a name="vision" ></a> app.set('view engine') -> vision

hapi has extensive support for template rendering, including the ability to load and leverage multiple templating engines, partials, helpers (functions used in templates to manipulate data), and layouts. Express enables views capabilities by using `app.set('view engine)`, where hapi's capabilities are provided by the [vision](https://github.com/hapijs/vision) plugin. For a more extensive tutorial on views in hapi, please see the [views](/tutorials/views/?lang=en_US) tutorial.

### <a name="viewengine" ></a> Setting the View Engine

Setting the views engine in express looks like the following:

```js
app.set('view engine', 'pug');
```

To set the views engine in hapi, you first must register the vision plugin, then configure `server.views`:
```js
await server.register(require('vision'));

server.views({
    engines: {
        pug: require('pug')
    },
    relativeTo: __dirname,
    path: 'views'
});
```
By default, Express will look for views or templates in the `views` folder. In hapi, you specify where the views are located using the `relativeTo` and `path` properties. Like Express, hapi supports a wide variety of templating engines, such as pug, ejs, handlebars, etc.

hapi has many more configurable options in `server.views`. To see the full list of capabilities, please go to the [views](/tutorials/views/?lang=en_US) tutorial.

### <a name="view" ></a> Rendering a View

To render a view in Express, you would call `res.render()`. hapi, by way of vision, has two methods for rendering views, `h.view` and the view handler. Lets look at how to do both.
First, rendering a view in Express:

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
And using the view handler in hapi:

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
To pass context in `h.view`, you pass an object as the second parameter. To pass context in the view handler, you use the `context` key.

## <a name="inert" ></a> express.static() -> inert

hapi gets its ability to serve static content from a plugin called [inert](https://github.com/hapijs/inert). inert provides new handler methods for serving static files and directories, as well as adding a `h.file()` method to the response toolkit. For a more in-depth tutorial of server static files in hapi, please see the [serving static files](/tutorials/serving-files/?lang=en_US) tutorial.

### <a name="single" ></a> Serving Single Files

In Express, you would use the `res.sendFile` method to return a single file. In hapi, you can either use the `h.file()` method or the file handler, which is available via [inert](https://github.com/hapijs/inert). Once you register the inert plugin, you will be able to serve your static files:

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

await server.register(require('@hapi/inert');

server.route({
    method: 'GET',
    path: '/image',
    handler: function (request, h) {

        h.file('image.jpg');
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

await server.register(require('@hapi/inert');

server.route({
    method: 'GET',
    path: '/image',
    handler: {
        file: 'image.jpg'
    }
});
```

To serve static files in hapi, you first must tell hapi where the static files are located. You do this by configuring the `server.options.routes` object. You set the `relativeTo` to the folder where the files are located, much like you do in the options object of the `res.sendFile` in Express. Next, you need to register the inert plugin. This will give you access to the methods that allows you to serve static files. Now in your route handler, you can use the `h.file()` method or the file handler to server your static file.

### <a name="static" ></a> Static File Server

To set up a static file server in Express, you would use the `express.static()` middleware. In hapi, you use the file handler made available by the [inert](https://github.com/hapijs/inert) plugin. You would setup the server in the same what as you did to server a single static file, by telling where the files are located. You then would setup a route to catch all of the requests and return the correct files. Lets have a look:

Express:
```js
app.use(express.static('/public'))
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
Now, you can access any static files by going to `localhost:3000/filename`. [inert](https://github.com/hapijs/inert) has many other options and capabilities. To see what all it can do, please see the [serving static files](/tutorials/serving-files/?lang=en_US) tutorial.

## <a name="boom" ></a> Error Handling -> boom

hapi uses the [boom](https://github.com/hapijs/boom) module to handle errors. By default, boom will return the errors in JSON format. Express on the other hand will return a text response by default, which is suboptimal with a JSON API. Lets look a 404 error response with the default settings by submitting a `GET` request to `'/hello'`, which does not exists:

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

### <a name="custom" ></a> Custom Messages

`boom` allows you to easily change the error message for any status code. Lets take the 404 error above and return a new message:

Express:
```js
res.status(400).send({status: 404, error: "Page not found"});
```

hapi:
```js
Boom.notFound('Page not found');
```

In Express, you set the status code, then send the error message body. In this case we return a JSON object with the status code and the error message. In `boom`, there is no need to return a JSON object with the status code, it does this by default. In the example above, you call `Boom.notFound()` to set the error message. `boom` has a long list of 4xx and 5xx errors, such as `Boom.unauthorized()`, `Boom.badRequest()`, `Boom.badImplementation()`, etc. For a complete list, please see the [boom](https://github.com/hapijs/boom) documentation.