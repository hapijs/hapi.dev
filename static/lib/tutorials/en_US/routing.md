# Routing

_This tutorial is compatible with hapi v17 and newer_
        

## <a name="overview"></a> Overview

When defining a route in hapi, you need three basic elements: the path, the method, and a handler. These are passed to your server as an object, and can be as simple as the following:

```js
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        return 'Hello World!';
    }
});
```

## <a name="methods"></a> Methods

The route above responds to a `GET` request to `/` with the string `Hello World!`. The method option can be any valid HTTP method, or an array of methods. Let's say you want the same response when your user sends either a `PUT` or a `POST` request, you could do that with the following:

```js
server.route({
    method: ['PUT', 'POST'],
    path: '/',
    handler: function (request, h) {

        return 'I did something!';
    }
});
```

## <a name="path"></a> Path

The path option must be a string, though it can contain named parameters. To name a parameter in a path, simply wrap it with `{}`. For example:

```js
server.route({
    method: 'GET',
    path: '/hello/{user}',
    handler: function (request, h) {

        return `Hello ${request.params.user}!`;
    }
});
```

Note: It is best practice to always to return escaped and validated user inputs such as query/path parameters. This is done to prevent echo or XSS attacks. One way to do this is to use [Hoek](/module/hoek) `escapeHtml()` method. With escaping in place, the above example would look like the following:

```js
return `Hello ${Hoek.escapeHtml(request.params.user)}!`
```

As you can see above, you have the string `{user}` in your path, which means you're asking for that segment of the path to be assigned to a named parameter. These parameters are stored in the object `request.params` within the handler. Since you named your parameter user, you are able to access the value with the property `request.params.user`, after URI encoding it so as to prevent content injection attacks. For example, going to `/hello/ferris` in your browser, you will see `Hello ferris!`.

## <a name="optionalParameters"></a> Optional Parameters

In the above example, the user parameter is required: a request to `/hello/bob` or `/hello/susan` will work, but a request to `/hello` will not. In order to make a parameter optional, put a question mark at the end of the parameter's name. Here is the same route, but updated to make the `user` parameter optional:

```js
server.route({
    method: 'GET',
    path: '/hello/{user?}',
    handler: function (request, h) {

        const user = request.params.user ? request.params.user : 'stranger';

        return `Hello ${user}!`;
    }
});
```
Now a request to `/hello/sloan` will reply with `Hello sloan!` and a request to just `/hello` will reply with `Hello stranger!`. It is important to be aware that only the last named parameter in a path can be optional. That means that `/{one?}/{two}/` is an invalid path, since in this case there is another parameter after the optional one. You may also have a named parameter covering only part of a segment of the path for instance `/{filename}.jpg` is valid. You may also have multiple parameters per segment provided there is non-parameter separator between them, meaning `/{filename}.{ext}` is valid whereas `/{filename}{ext}` is not.

## <a name="multiParameters"></a> Multi-Segment Parameters

Along with optional path parameters, you can also allow parameters that match multiple segments. In order to do this, you use an asterisk and a number. For example:

```js
server.route({
    method: 'GET',
    path: '/hello/{user*2}',
    handler: function (request, h) {

        const userParts = request.params.user.split('/');

        return `Hello ${userParts[0]} ${userParts[1]}!`;
    }
});
```
With this configuration, a request to `/hello/john/doe` will reply with the string `Hello john doe!`. The important thing to note here is that the parameter is actually the string `"john/doe"`. That's why you did a split on that character to get the two separate parts. The number after the asterisk represents how many path segments should be assigned to the parameter. You can also omit the number entirely, and the parameter will match any number of segments available. Like the optional parameters, a wildcard parameter (for example `/{files*}`) may only appear as the last parameter in your path.

When determining what handler to use for a particular request, hapi searches paths in order from most specific to least specific. That means if you have two routes, one with the path `/filename.jpg` and a second route `/filename.{ext}` a request to `/filename.jpg` will match the first route, and not the second. This also means that a route with the path `/{files*}` will be the last route tested, and will only match if all other routes fail.

## <a name="query"></a> Query Parameters

Query parameters are common way of sending data to the server. Query parameters are sent via the URL in a `key=value` format. For example:

`localhost:3000?name=ferris&location=chicago`

There are two query parameters here, `name=ferris` and `location=chicago`. In hapi, you can access query parameters by the `request.query` object.

```js
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        return `Hello ${request.query.name}!`;
    }
});
```
Here, you simply access the `name` query parameter and return it in the handler, which would read `Hello ferris!`.

For more complex query structures, you may opt to use the `qs` module. Consider the following:

```js
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        return request.query;
    }
});
```
If you sent the request `localhost:3000?foo[bar]=baz`, hapi, by default would return `{ "foo[bar]": "baz" }`.  

With the [qs](https://github.com/ljharb/qs) module, you can parse the query string out. An example: 

```js
const Hapi = require('@hapi/hapi');
const Qs = require('qs');

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    query: {
        parser: (query) => Qs.parse(query)
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        return request.query;
    }
});

const init = async () => {

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
```
Here, you first require the [qs](https://github.com/ljharb/qs) module.  

Second, you set the query parameters parser method by setting the `server.options.query.parser` value. In this case, you use the `Qs.parse()` method where `query` is an object containing the incoming `request.query` parameters. Now, anything coming into `request.query` will be parsed with `Qs.parse()`.

Lastly, you returned the parsed query string, which would now be:

```
{
    "foo": {
        "bar": "baz"
    }
}
```
Note: In the above example, you used the [qs](https://github.com/ljharb/qs) module to handle our parsing, but any parser will do, be it from `npm` or even custom. Just be aware that the method must return an object where each key is a parameter and matching value is the parameter value.  

## <a name="requestpayload"></a> Request Payload

Anytime you send request data to your API, you will be able to access this data in the route handler with `request.payload`. See the following:

```js
server.route({
    method: 'POST',
    path: '/signup',
    handler: function (request, h) {

        const payload = request.payload;

        return `Welcome ${payload.username}!`;
    }
});
```
In the above example, the handler receives data via `request.payload`. In this case, the `request.payload` contains an object that stores user sign up data:

`{ username: 'ferris', password: 'password' }`

Note: It's always best practice to validate the incoming payload, as it may contain unsafe data. See validation tutorial for more info.

## <a name="handler"></a> Handler

The handler option is a function that accepts two parameters, `request`, and `h`.

The `request` parameter is an object with details about the end user's request, such as path [parameters](#parameters), an [associated payload](#requestpayload), [query parameters](#query), authentication information, headers, etc. Full documentation on what the `request` object contains can be found in the [API reference](/api#request-properties).

The second parameter, `h`, is the response toolkit, an object with several methods used to respond to the request. As you've seen in the previous examples, if you wish to respond to a request with some value, you simply return it from the handler. The payload may be a string, a buffer, a JSON serializable object, a stream or a promise.

Alternatively you may pass the same value to `h.response(value)` and return that from the handler. The result of this call is a response object, that can be chained with additional methods to alter the response before it is sent. For example `h.response('created').code(201)` will send a payload of created with an HTTP status code of 201. You may also set headers, content type, content length, send a redirection response, and many other things that are documented in the [API reference](/api#response-toolkit).

The `handler` option must return a value, a promise, or throw an error.

Note: handlers using a fat arrow style function cannot be bound to any `server.bind()` property. Instead, the bound context is available under [`h.context`](/api#h.context).

## <a name="options"></a> Options

Aside from these three basic elements, you may also specify an `options` parameter for each route. This is where you configure things like validation, authentication, prerequisites, payload processing, and caching options. More details can be found in the linked tutorials, as well as the [API reference](/api#route-options).

Here we will look at some options of validating with Joi.

```js
server.route({
    method: 'POST',
    path: '/signup',
    handler: function (request, h) {

        const payload = request.payload;

        return `Welcome ${payload.username}!`;
    },
    options: {
        auth: false,
        validate: {
            payload: {
                username: Joi.string().min(1).max(20),
                password: Joi.string().min(7)
            }
        }
    }
});
```
The first property under `options` is `auth`. `auth` will set the authentication configuration for the route. Since this route is for a new user signing up, you will disable authentication.  

The second property is `validate`. This allows you to set validation rules for various request components, such as `headers`, `params`, `payload`, and `failAction`. You use the [joi](https://github.com/sideway/joi) package to validate the `request.payload`. For more info, please check the validation tutorial.

## <a name="missing"></a> 404 Handling

404 errors will happen whenever your server can't find what was the resource that was requested. It is best practice to handle these errors the proper way. This is easy to do in hapi, by just employing a route that will catch everything your other routes will not. The following example shows how to setup a route to return a custom `404` response.

```js
'use strict';

const Hapi = require('@hapi/hapi');

const internals = {};

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: '*',
        path: '/{any*}',
        handler: function (request, h) {

            return '404 Error! Page Not Found!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
```
First, you configure our server.

Next, you setup your route that return your custom 404 response. You use a wildcard, `*`, for the method, so it covers all available methods. Then, you use a very broad, generic path, `'/{any*}`. This will catch any route that our other routes do not.  hapi routes will go the the most specific path first, then get broader, till it finds a match.  For example, `localhost:3000/login` will go to the `/login` route and not the `/{any*}` route.  

Lastly, you return a custom 404 response in your handler, letting your users know that the resource they are asking for could not be found.
