## Arcgisonline

```js
'use strict';

const Bell = require('..');
const Hapi = require('@hapi/hapi');

const internals = {};

internals.start = async function () {
  const server = Hapi.server({ port: 8000 });
  await server.register(Bell);

  // You'll need to go to https://developers.arcgis.com/en/applications and set up an application to get started
  // Once you create your app you will get your ClientID and Client Secret.
  // Also be sure to set redirect URL as well at the bottom of the screen in Redirect URIs section.

  server.auth.strategy('arcgisonline', 'bell', {
    provider: 'arcgisonline',
    password: 'cookie_encryption_password_secure',
    isSecure: false,
    clientId: '',
    clientSecret: '',
    providerParams: {
      redirect_uri: server.info.uri + '/bell/door',
    },
  });

  server.route({
    method: '*',
    path: '/bell/door',
    options: {
      auth: 'arcgisonline',
      handler: function (request, h) {
        return (
          '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>'
        );
      },
    },
  });

  await server.start();
  console.log('Server started at:', server.info.uri);
};

internals.start();
```

## Discord

```js
'use strict';

const Bell = require('..');
const Hapi = require('@hapi/hapi');

const internals = {};

internals.start = async function () {
  const server = Hapi.server({ port: 8000 });
  await server.register(Bell);

  // Fill in your clientId and clientSecret: https://discord.com/developers/applications/me

  server.auth.strategy('discord', 'bell', {
    provider: 'discord',
    password: 'cookie_encryption_password_secure',
    isSecure: false,
    clientId: '',
    clientSecret: '',
  });

  server.route({
    method: '*',
    path: '/bell/door',
    options: {
      auth: 'discord',
      handler: function (request, h) {
        return (
          '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>'
        );
      },
    },
  });

  await server.start();
  console.log('Server started at:', server.info.uri);
};

internals.start();
```

## Facebook

```js
'use strict';

const Bell = require('..');
const Hapi = require('@hapi/hapi');

const internals = {};

internals.start = async function () {
  const server = Hapi.server({ host: 'localhost', port: 8000 });
  await server.register(Bell);

  // You'll need to go to https://developers.facebook.com/ and set up a
  // Website application to get started
  // Once you create your app, fill out Settings and set the App Domains
  // Under Settings >> Advanced, set the Valid OAuth redirect URIs to include http://<yourdomain.com>/bell/door
  // and enable Client OAuth Login

  server.auth.strategy('facebook', 'bell', {
    provider: 'facebook',
    password: 'cookie_encryption_password_secure',
    isSecure: false,
    clientId: '',
    clientSecret: '',
    location: server.info.uri,
  });

  server.route({
    method: '*',
    path: '/bell/door',
    options: {
      auth: {
        strategy: 'facebook',
        mode: 'try',
      },
      handler: function (request, h) {
        if (!request.auth.isAuthenticated) {
          return 'Authentication failed due to: ' + request.auth.error.message;
        }

        return (
          '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>'
        );
      },
    },
  });

  await server.start();
  console.log('Server started at:', server.info.uri);
};

internals.start();
```

## Github

```js
'use strict';

const Bell = require('..');
const Hapi = require('@hapi/hapi');

const internals = {};

internals.start = async function () {
  const server = Hapi.server({ port: 8000 });
  await server.register(Bell);

  // You will need github account for setting up an application and get a clientID and ClientSecret
  // This is a helpful tutorial for the whole process: https://developer.github.com/apps/building-github-apps/creating-a-github-app/
  // This guide will help you set up your app and generate ID and secret.

  server.auth.strategy('github', 'bell', {
    provider: 'github',
    password: 'cookie_encryption_password_secure',
    isSecure: false, // For testing or in environments secured via other means
    clientId: '',
    clientSecret: '',
    location: 'https://example.com',
    scope: [],
  });

  server.route({
    method: ['GET', 'POST'],
    path: '/login',
    options: {
      auth: {
        strategy: 'github',
        mode: 'try',
      },
      handler: function (request, h) {
        if (!request.auth.isAuthenticated) {
          return `Authentication failed due to: ${request.auth.error.message}`;
        }

        return (
          '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>'
        );
      },
    },
  });

  await server.start();
  console.log('Server started at:', server.info.uri);
};

internals.start();
```

## Google

```js
'use strict';

const Bell = require('..');
const Hapi = require('@hapi/hapi');

const internals = {};

internals.start = async function () {
  const server = Hapi.server({ host: 'localhost', port: 8000 });
  await server.register(Bell);

  // You'll need to go to https://console.developers.google.com and set up an application to get started
  // Once you create your app, fill out "APIs & auth >> Consent screen" and make sure to set the email field
  // Next, go to "APIs & auth >> Credentials and Create new Client ID
  // Select "web application" and set "AUTHORIZED JAVASCRIPT ORIGINS" and "AUTHORIZED REDIRECT URIS"
  // This will net you the clientId and the clientSecret needed.
  // Also be sure to pass the location as well. It must be in the list of "AUTHORIZED REDIRECT URIS"

  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: 'cookie_encryption_password_secure',
    isSecure: false,
    clientId: '',
    clientSecret: '',
    location: server.info.uri,
  });

  server.route({
    method: '*',
    path: '/bell/door',
    options: {
      auth: {
        strategy: 'google',
        mode: 'try',
      },
      handler: function (request, h) {
        if (!request.auth.isAuthenticated) {
          return 'Authentication failed due to: ' + request.auth.error.message;
        }

        return (
          '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>'
        );
      },
    },
  });

  await server.start();
  console.log('Server started at:', server.info.uri);
};

internals.start();
```

## Linkedin

```js
'use strict';

const Bell = require('..');
const Hapi = require('@hapi/hapi');

const internals = {};

internals.start = async function () {
  const server = Hapi.server({ port: 8000 });
  await server.register(Bell);

  // You'll need to go to https://www.linkedin.com/secure/developer?newapp= and set up an application to get started
  // Follow the instructions on https://developer.linkedin.com/docs/oauth2 to setup redirect_uri and default scopes

  server.auth.strategy('linkedin', 'bell', {
    provider: 'linkedin',
    password: 'cookie_encryption_password_secure',
    isSecure: false,
    clientId: '',
    clientSecret: '',
    providerParams: {
      redirect_uri: server.info.uri + '/bell/door',
    },
  });

  server.route({
    method: '*',
    path: '/bell/door',
    options: {
      auth: 'linkedin',
      handler: function (request, h) {
        return (
          '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>'
        );
      },
    },
  });

  await server.start();
  console.log('Server started at:', server.info.uri);
};

internals.start();
```

## Meetup

```js
'use strict';

const Bell = require('..');
const Hapi = require('@hapi/hapi');

const internals = {};

internals.start = async function () {
  const server = Hapi.server({ port: 8000 });
  await server.register(Bell);

  // Firstly give the meetup oauth docs a quick glance --> http://www.meetup.com/meetup_api/auth/#oauth2
  // Secondly you'll need to create an OAuth consumer --> https://secure.meetup.com/meetup_api/oauth_consumers/
  // Now you can fill in the required fields below and take this example for a test drive

  server.auth.strategy('meetup', 'bell', {
    provider: 'meetup',
    password: 'cookie_encryption_password_secure',
    isSecure: false,
    clientId: '',
    clientSecret: '',
    // scope: ['basic', 'ageless', 'group_edit', 'reporting']       // Uncomment for more scopes, if not you get the "basic" scope by default
  });

  server.route({
    method: '*',
    path: '/bell/door',
    options: {
      auth: 'meetup',
      handler: function (request, h) {
        return (
          '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>'
        );
      },
    },
  });

  await server.start();
  console.log('Server started at:', server.info.uri);
};

internals.start();
```

## Nest

```js
'use strict';

const Bell = require('..');
const Hapi = require('@hapi/hapi');

const internals = {};

internals.start = async function () {
  const server = Hapi.server({ port: 8000 });
  await server.register(Bell);

  server.auth.strategy('nest', 'bell', {
    provider: 'nest',
    password: 'cookie_encryption_password_secure',
    isSecure: false,
    clientId: '', // Fill in your clientId and clientSecret
    clientSecret: '',
  });

  server.route({
    method: '*',
    path: '/bell/door',
    options: {
      auth: 'nest',
      handler: function (request, h) {
        return (
          '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>'
        );
      },
    },
  });

  await server.start();
  console.log('Server started at:', server.info.uri);
};

internals.start();
```

## Office365

```js
'use strict';

const Bell = require('..');
const Hapi = require('@hapi/hapi');

const internals = {};

internals.start = async function () {
  const server = Hapi.server({ host: 'localhost', port: 8000 });
  await server.register(Bell);

  // You'll need an Office 365 account to set up an application and get a clientID and ClientSecret
  // This is a helpful tutorial for the whole process: https://dev.outlook.com/restapi/tutorial/node
  // Once you have an account, you can set up your app and generate an ID and Secret here:
  // https://apps.dev.microsoft.com/

  server.auth.strategy('office', 'bell', {
    provider: 'office365',
    clientId: '',
    clientSecret: '',
    providerParams: {
      response_type: 'code',
    },
    scope: ['openid', 'offline_access', 'profile'],
  });

  server.route({
    method: '*',
    path: '/bell/door',
    options: {
      auth: {
        strategy: 'office',
        mode: 'try',
      },
      handler: function (request, h) {
        if (!request.auth.isAuthenticated) {
          return 'Authentication failed due to: ' + request.auth.error.message;
        }

        return (
          '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>'
        );
      },
    },
  });

  await server.start();
  console.log('Server started at:', server.info.uri);
};

internals.start();
```

## Okta

```js
'use strict';

const Bell = require('..');
const Boom = require('@hapi/boom');
const Hapi = require('@hapi/hapi');

const internals = {};

internals.start = async function () {
  const server = Hapi.server({ port: 8000 });
  await server.register([require('@hapi/cookie'), Bell]);

  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: 'sid-okta-example', // Cookie name
      password: 'password-should-be-32-characters', // Use something more secure in production
      isSecure: false, // Should be set to true (which is the default) in production
    },
    redirectTo: '/auth/okta', // If there is no session, redirect here
  });

  server.auth.strategy('okta', 'bell', {
    provider: 'okta',
    config: { uri: 'https://your-organization.okta.com' },
    password: 'cookie_encryption_password_secure',
    isSecure: false,
    location: 'http://127.0.0.1:8000',
    clientId: 'IIA1yMR7IK4XGhfyfCno',
    clientSecret: 'PEh_HemJovaR-Zjs-unX8-cC9IhQgzF5M1RUrUgW',
  });

  server.route({
    method: 'GET',
    path: '/auth/okta',
    options: {
      auth: {
        strategy: 'okta',
        mode: 'try',
      },
      handler: function (request, h) {
        if (!request.auth.isAuthenticated) {
          throw Boom.unauthorized(
            'Authentication failed: ' + request.auth.error.message,
          );
        }

        // Just store the third party credentials in the session as an example. You could do something
        // more useful here - like loading or setting up an account (social signup).

        request.auth.session.set(request.auth.credentials);
        return h.redirect('/');
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    options: {
      auth: 'session',
      handler: function (request, h) {
        //Return a message using the information from the session

        return 'Hello, ' + request.auth.credentials.profile.email + '!';
      },
    },
  });

  await server.start();
  console.log('Server started at:', server.info.uri);
};

internals.start();
```

## Slack

```js
'use strict';

const Bell = require('..');
const Hapi = require('@hapi/hapi');

const internals = {};

internals.start = async function () {
  const server = Hapi.server({ port: 8000 });
  await server.register(Bell);
  server.auth.strategy('slack', 'bell', {
    provider: 'slack',
    password: 'cookie_encryption_password_secure',
    isSecure: false,
    clientId: '',
    clientSecret: '',
  });

  server.route({
    method: '*',
    path: '/bell/door',
    options: {
      auth: 'slack',
      handler: function (request, h) {
        return (
          '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>'
        );
      },
    },
  });

  await server.start();
};

internals.start();
```

## Twitch

```js
'use strict';

const Bell = require('..');
const Hapi = require('@hapi/hapi');

const internals = {};

internals.start = async function () {
  const server = Hapi.server({ port: 8000 });
  await server.register(Bell);

  // You need to register developer application with a Twitch account to obtain your clientId, clientSecret, and assign redirect URI

  server.auth.strategy('twitch', 'bell', {
    provider: 'twitch',
    password: 'cookie_encryption_password_secure',
    isSecure: false,
    clientId: '', // Set client id
    clientSecret: '', // Set client secret
    // scope: ['user_read', 'channel_read']         // Uncomment for more scopes (check Twitch API documentation), "user_read" scope is set as default
  });

  server.route({
    method: ['GET', 'POST'],
    path: '/bell/door',
    options: {
      auth: {
        strategy: 'twitch',
        mode: 'try',
      },
      handler: function (request, h) {
        if (!request.auth.isAuthenticated) {
          return 'Authentication failed due to: ' + request.auth.error.message;
        }

        return (
          '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>'
        );
      },
    },
  });

  await server.start();
  console.log('Server started at:', server.info.uri);
};

internals.start();
```

## Twitter

```js
'use strict';

const Bell = require('..');
const Hapi = require('@hapi/hapi');

const internals = {};

internals.start = async function () {
  const server = Hapi.server({ port: 8000 });
  await server.register(Bell);

  // Make sure to set a "Callback URL" and
  // check the "Allow this application to be used to Sign in with Twitter"
  // on the "Settings" tab in your Twitter application

  server.auth.strategy('twitter', 'bell', {
    provider: 'twitter',
    password: 'cookie_encryption_password_secure',
    isSecure: false,
    clientId: '', // Set client id
    clientSecret: '', // Set client secret
  });

  server.route({
    method: '*',
    path: '/bell/door',
    options: {
      auth: 'twitter',
      handler: function (request, h) {
        return (
          '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>'
        );
      },
    },
  });

  await server.start();
  console.log('Server started at:', server.info.uri);
};

internals.start();
```
