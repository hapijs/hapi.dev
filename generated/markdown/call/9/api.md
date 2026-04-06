## Introduction

`call` is a simple node.js HTTP Router. It is used by popular [hapi.js](https://github.com/hapijs/hapi) web framework. It implements predictable and easy to use routing. Even if it is designed to work with Hapi.js, you can still use it as an independent router in your app.

## Example

```js
const Call = require('@hapi/call');

// Create new router
const router = new Call.Router();

// Add route
router.add({ method: 'get', path: '/' }, { label: 'root-path' });

// Add another route
router.add({ method: 'post', path: '/users' }, 'route specific data');

// Add another route with dynamic path
router.add({ method: 'put', path: '/users/{userId}' }, () => {
  /* ...handler... */
});

// Match route
router.route('post', '/users');
/* If matching route is found, it returns an object containing
    {
        params: {},                     // All dynamic path parameters as key/value
        paramsArray: [],                // All dynamic path parameter values in order
        route: 'route specific data';   // routeData
    }
*/

// Match route
router.route('put', '/users/1234');
/* returns
    {
        params: { userId: '1234' },
        paramsArray: [ '1234' ],
        route: [Function]
    }
*/
```

## Paths matching

### Exact match

`{param}`: If path contains `/users/{user}` then it matches `/users/john` or `/users/1234` but not `/users`.

### Optional parameters

`{param?}`: ? means parameter is optional . If path contains `/users/{user?}` It matches `/users/john` as well as `/users`.

It is important to be aware that only the last named parameter in a path can be optional. That means that `/{one?}/{two}/` is an invalid path, since in this case there is another parameter after the optional one. You may also have a named parameter covering only part of a segment of the path, but you may only have one named parameter per segment. That means that /`{filename}.jpg` is valid while `/{filename}.{ext}` is not.

### Multi-segment parameters

`{params*n}`: With path configuration `/users/{user*2}`, it matches `/users/john/doe` or `/users/harshal/patil` but not `/users/john`. Number **n** after asterisk sign specifies the multiplier.

Like the optional parameters, a wildcard parameter (for example `/{users*}`) may only appear as the last parameter in your path.

### Catch all

`{params*}`: Using this option, it matches anything. So `/users/{user*}` with match `/users/`, `/users/john`, `/users/john/doe`, `/users/john/doe/smith`

For more details about path parameters, [read hapi.js docs](https://github.com/hapijs/hapi/blob/master/API.md#path-parameters).

## Routing order

When determining what handler to use for a particular request, router searches paths in order from most specific to least specific. That means if you have two routes, one with the path `/filename.jpg` and a second route `/filename.{ext}` a request to /filename.jpg will match the first route, and not the second. This also means that a route with the path `/{files*}` will be the last route tested, and will only match if all other routes fail.

**Call** router has deterministic order than other routers and because of this deterministic order, `call` is able to detect conflicting routes and throw exception accordingly. In comparison, Express.js has different routing mechanism based on simple RegEx pattern matching making it faster (probably it only matters in theory) but unable to catch route conflicts.

## Method

### `new Router([options])`

Constructor to create a new router instance where:

- `options` - an optional configuration object with the following fields:
  - `isCaseSensitive` - specifies if the paths should case sensitive. If set to `true`,
    `/users` and `/USERS` are considered as two different paths. Defaults to `true`.

```js
const router = new Call.Router();
```

### `add(options, [data])`

Adds a new route to the router where:

- `options` - a configuration object with the following fields:
  - `method` - the HTTP method (`'get'`, `'put'`, `'post'`, `'delete'`, etc.) or the wildcard
    character (`'*'`) to match any methods. The method must be lowercase.
  - `path` - the URL path to be used for route matching. The path segment can be static like
    `'/users/1234'` or it can be a [dynamic path](#path-matching).
- `data` - the application data to retrieve when a route match is found during lookup. This is
  typically the route handler or other metadata about what to do when a route is matched.

Throws on invalid route configuration or on a conflict with existing routes.

### `route(method, path)`

Finds a matching route where:

- `method` - the requested route method.
- `path` - the requested route path.

Returns an object with the following when a match is found:

- `params` - an object containing all path parameters where each **key** is path name and
  **value** is the corresponding parameter value in the requested `path`.
- `paramsArray` - an array of the parameter values in order.
- `route` - the `data` value provided when the route was added.

If no match is found, returns (not throws) an error.
