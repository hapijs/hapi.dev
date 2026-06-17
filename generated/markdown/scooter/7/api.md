Scooter uses the [useragent] package to provide user-agent information. For
more details of what information scooter provides, please see the [useragent](https://www.npmjs.org/package/useragent).

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
            return request.plugins.scooter;
        },
    });

    await server.register(Scooter);
    await server.start();
    console.log(server.info.uri + '/user-agent');
};

start();
```
