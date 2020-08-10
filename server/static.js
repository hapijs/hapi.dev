'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const start = async () => {

    const server = Hapi.server({
        host: process.env.HOST || "0.0.0.0",
        port: process.env.PORT || 3000,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '../dist')
            }
        }

    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '../dist',
                index: ['index.html']
            }
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

start();
