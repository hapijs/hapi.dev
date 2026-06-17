Scooter uses the [my-ua-parser](https://www.npmjs.com/package/my-ua-parser) package to provide user-agent information. For
more details of what information scooter provides, please see the [my-ua-parser](https://www.npmjs.com/package/my-ua-parser) documentation.

# Usage

```javascript
const Hapi = require('@hapi/hapi');
const Scooter = require('@hapi/scooter');

const start = async () => {
    const server = new Hapi.Server();

    server.route({
        method: 'GET',
        path: '/user-agent',
        handler: (request, h) => {
            return request.userAgent();
        },
    });

    await server.register(Scooter);
    await server.start();
    console.log(server.info.uri + '/user-agent');
};

start();
```

## `request.userAgent()`

A convenience decoration added to every request. Returns the same parsed user-agent object as `request.plugins.scooter`.

```javascript
// Both are equivalent
request.userAgent();
request.plugins.scooter;
```

The returned object has the following shape:

```
{
    family: string,       // browser name, e.g. 'Chrome'
    major:  string,       // major version, e.g. '91'
    minor:  string,       // minor version, e.g. '0'
    patch:  string,       // patch version, e.g. '4472'
    source: string,       // original user-agent header value
    os: {
        family: string,   // OS name, e.g. 'Windows'
        major:  string,
        minor:  string,
        patch:  string
    },
    device: {
        family: string,   // device model or type, e.g. 'iPhone'
        brand:  string,   // device vendor, e.g. 'Apple'
        model:  string    // device model, e.g. 'iPhone'
    }
}
```

Unknown values default to `'Other'` for family fields and `'0'` for version fields.
