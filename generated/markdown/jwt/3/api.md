## Introduction

**jwt** is part of the **hapi** ecosystem and was designed to work seamlessly with the [hapi web framework](https://hapi.dev) and its other components (but works great on its own or with other frameworks). If you are using a different web framework and find this module useful, check out [hapi](https://hapi.dev) – they work even better together.

## Usage

```js
// Load modules

const Jwt = require('@hapi/jwt');
const Hapi = require('@hapi/hapi');

// Declare internals

const internals = {};

internals.start = async function () {
    const server = Hapi.server({ port: 8000 });

    // Register jwt with the server

    await server.register(Jwt);

    // Declare an authentication strategy using the jwt scheme.
    // Use keys: with a shared secret key OR json web key set uri.
    // Use verify: To determine how key contents are verified beyond signature.
    // If verify is set to false, the keys option is not required and ignored.
    // The verify: { aud, iss, sub } options are required if verify is not set to false.
    // The verify: { exp, nbf, timeSkewSec, maxAgeSec } parameters have defaults.
    // Use validate: To create a function called after token validation.

    server.auth.strategy('my_jwt_strategy', 'jwt', {
        keys: 'some_shared_secret',
        verify: {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400, // 4 hours
            timeSkewSec: 15,
        },
        validate: (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: { user: artifacts.decoded.payload.user },
            };
        },
    });

    // Set the strategy

    server.auth.default('my_jwt_strategy');
};

internals.start();
```

### server.auth.strategy

Declares a named strategy using the jwt scheme.

`server.auth.strategy('my_jwt_strategy', 'jwt', options)`

#### options

- `options` - Config object containing keys to define your jwt authentication and response with the following:
    - `keys` - Object or array of objects containing the key method to be used for jwt verification. The keys object can be expressed in many ways. See [keys option examples](#keys-option-examples) for a handful of ways to express this option.

##### keys

There are many ways you can do keys and here is an extensive list of all the key options.

###### HMAC algorithms

You can do HMAC algorithms a couple of different ways. You can do it either like:

- `keys` - `'some_shared_secret'` - a string that is used for shared secret.

OR with optional algorithm and key ID header (kid) like:

- `keys`
    - `key` - String that is used for shared secret.
    - `algorithms` - Array of accepted [algorithms](#Key-algorithms-supported-by-jwt) (optional).
    - `kid` - String representing the key ID header (optional).

###### Public algorithms

Similar to the HMAC algorithms you can do it like:

- `key` - Binary data of the public key. Often retrieve via `Fs.readFileSync('public.pem')`.

OR with optional algorithm and key ID header (kid) like:

- `keys`
    - `key` - Binary data of the public key. Often retrieve via `Fs.readFileSync('public.pem')`.
    - `algorithms` - Array of accepted [algorithms](#Key-algorithms-supported-by-jwt) (optional).
    - `kid` - String representing the key ID header (optional).

###### Public and RSA algorithms using JWKS

- `keys`
    - `uri` - String that defines your json web key set uri.
    - `rejectUnauthorized` - Boolean that determines if TLS flag indicating whether the client should reject a response from a server with invalid certificates. Default is `true`.
    - `headers` - Object containing the request headers to send to the uri (optional).
    - `algorithms` - Array of accepted [algorithms](#Key-algorithms-supported-by-jwt) (optional).

###### No algorithms

- `keys`
    - `algorithms` - `['none']`

###### Custom Function

- `keys` - `(param) => { return key; }` - Custom function that derives the key.

###### Keys Option Examples

```js
    // Single shared secret
    {
        keys: 'some_shared_secret'
    }
    ...

    // Single shared secret with algorithms and key ID header
    {
        keys: {
            key: 'some_shared_secret',
            algorithms: ['HS256', 'HS512'],
            kid: 'someKid'
        }
    }
    ...

    // Multiple shared secret
    {
        keys: ['some_shared_secret_1', 'shared_secret_2', 'shared_secret_3']
    }
    ...

    // Multiple shared secret with algorithm and key ID header
    {
        keys: [
            {
                key: 'some_shared_secret'
                algorithms: ['HS256', 'HS512'],
                kid: 'someKid'
            },
            {
                key: 'shared_secret2'
                algorithms: ['HS512'],
                kid: 'someKid2'
            }
        ]
    }
    ...

    // Single Public Key
    {
        keys: fs.readFileSync('public.pem')
    }
    ...

    // Single EdDSA key with algorithms
    {
        keys: {
            key: Mock.pair('EdDSA', 'ed25519').public,
            algorithms: ['EdDSA']
        }
    }

    ...
    // Single JWKS with headers and algorithms
    {
        keys: {
            uri: 'https://jwks-provider.com/.well-known/jwks.json',
            headers: {'x-org-name': 'my_company'},
            algorithms: ['RS256', 'RS512']
        }
    }
    ...

    // No algorithms
    {
        keys: ['none']
    }
    ...

    // Single custom function
    // This function accomplishes the same thing as Single shared secret
    {
        keys: () => { return 'some_shared_secret'; }
    }
```

###### Important Security Note

It is not advisable to put shared secrets in your source code, use environment variables and/or other encryption methods to encrypt/decrypt your shared secret. It is also not advisable to use no algorithms. Both of these practices are ideal for local testing and should be used with caution.

##### verify

In addition to keys you can provide other options.

- `verify` - Object to determine how key contents are verified beyond key signature. Set to `false` to do no verification. This includes the `keys` even if they are defined.
    - `aud` - String or `RegExp` **or** array of strings or `RegExp` that matches the audience of the token. Set to boolean `false` to not verify aud. Required if `verify` is not `false`.
    - `iss` - String or array of strings that matches the issuer of the token. Set to boolean `false` to not verify iss. Required if `verify` is not `false`.
    - `sub` - String or array of strings that matches the subject of the token. Set to boolean `false` to not verify sub. Required if `verify` is not `false`.
    - `nbf` - Boolean to determine if the "Not Before" [NumericDate](#registered-claim-names) of the token should be validated. Default is `true`.
    - `exp` - Boolean to determine if the "Expiration Time" [NumericDate](#registered-claim-names) of the token should be validated. Default is `true`.
    - `maxAgeSec` - Integer to determine the maximum age of the token in seconds. Default is `0`. This is time validation using the "Issued At" [NumericDate](#registered-claim-names) (`iat`). Please note that `0` effectively disables this validation, it does not make the maximum age of the token 0 seconds. Also if `maxAgeSec` is not `0` and `exp` is `true`, both will be validated and if either validation fails, the token validation will fail.
    - `timeSkewSec` - Integer to adust `exp` and `maxAgeSec` to account for server time drift in seconds. Default is `0`.

##### headless

- `headless` - String representing `base64` header **or** an Object to use as a header on headless tokens. If this is set, tokens that contain a header section will return `401`.

##### httpAuthScheme

- `httpAuthScheme` - String the represents the Authentication Scheme. Default is `'Bearer'`.

##### unauthorizedAttributes

- `unauthorizedAttributes` - String passed directly to `Boom.unauthorized` if no custom err is thrown. Useful for setting realm attribute in WWW-Authenticate header. Defaults to `undefined`.

##### validate

- `validate` - Function that allows additional validation based on the decoded payload and to put specific credentials in the request object. Can be set to `false` if no additional validation is needed. Setting this to `false` will also set the credentials to be the exact payload of the token, including the [Registered Claim Names](#registered-claim-names).

The validate function has a signature of `[async] function (artifacts, request, h)` where:

- `artifacts` - An object that contains information from the token.
    - `token` - The complete token that was sent.
    - `decoded` - An object that contains decoded token.
        - `header` - An object that contain the header information.
            - `alg` - The algorithm used to sign the token.
            - `typ` - The token type (should be `'JWT'` if present) (optional).
        - `payload` - An object containing the payload.
        - `signature` - The signature string of the token.
    - `raw` - An object that contains the token that was sent broken out by `header`, `payload`, and `signature`.
    - `keys` - An array of information about key(s) used for authentication
        - `key` - The key.
        - `algorithm` - The algorithm used to sign the token.
        - `kid` - The key ID header. `undefined` if none was set.
- `request` - Is the hapi request object of the request which is being authenticated.
- `h` - The response toolkit.
- Returns an object `{ isValid, credentials, response }` where:
    - `isValid` - Boolean that should be set to `true` if additional validation passed, otherwise `false`.
    - `credentials` - Object passed back to the application in `request.auth.credentials`.
    - `response` - Will be used immediately as a takeover response. `isValid` and `credentials` are ignored if provided.
- Throwing an error from this function will replace default `message` in the `Boom.unauthorized` error.
- Typically, `credentials` are only included when `isValid` is `true`, but there are cases when the application needs to know who tried to authenticate even when it fails (e.g. with authentication mode `'try'`).

###### validate example

Token payload:

```js
{
    user: 'some_user_name',
    group: 'hapi_community'
}
```

Function:

```js
validate: (artifacts, request, h) => {
    if (artifacts.decoded.payload.user === 'help') {
        return { response: h.redirect('https://hapi.dev/module/jwt/') }; // custom response
    }

    if (artifacts.decoded.payload.user === 'crash') {
        throw new Error('We hit a tree!'); // custom message in Boom.unauthorized
    }

    let isValid;
    if (artifacts.decoded.payload.group === 'hapi_community') {
        isValid = true;
    } else {
        isValid = false;
    }

    // Return isValid value based on group
    // Set credentials object to have the key username with a value of the user value from the payload

    return {
        isValid,
        credentials: { username: artifacts.decoded.payload.user },
    };
};
```

##### headerName

- `headerName` - Tells the jwt plugin to read the token from the header specified. Default is `'authorization'`.

##### cookieName

- `cookieName` - Tells the jwt plugin to read the token from the cookie specified. Note that the plugin does not allow you to read from cookie and header at the same time, either read from a header or from a cookie. If you want to read from cookie and header you must use multiple strategies with in which one will have `headerName` config and other will have `cookieName` config. Defaults to `undefined`.

## token

In addition to creating an auth strategy, the `jwt` module can be used directly even if you aren't using hapi, to run token based functions.

```js
// Load modules

const Jwt = require('@hapi/jwt');

// Generate a Token

const token = Jwt.token.generate(
    {
        aud: 'urn:audience:test',
        iss: 'urn:issuer:test',
        user: 'some_user_name',
        group: 'hapi_community',
    },
    {
        key: 'some_shared_secret',
        algorithm: 'HS512',
    },
    {
        ttlSec: 14400, // 4 hours
    },
);

// Decode a token

const decodedToken = Jwt.token.decode(token);

// Create function to verify a token

const verifyToken = (artifact, secret, options = {}) => {
    try {
        Jwt.token.verify(artifact, secret, options);
        return { isValid: true };
    } catch (err) {
        return {
            isValid: false,
            error: err.message,
        };
    }
};

// Get response of a successful verification

const validResponse = verifyToken(decodedToken, 'some_shared_secret');

// Get response of a unsuccessful verification due to wrong shared secret

const badSecretResponse = verifyToken(decodedToken, 'some_unshared_secret');

// Get response of a unsuccessful verification due to wrong iss

const badIssResponse = verifyToken(decodedToken, 'some_shared_secret', {
    iss: 'urn:issuer:different_test',
});

// Display results to console

console.dir(
    {
        token,
        decodedToken,
        validResponse,
        badSecretResponse,
        badIssResponse,
    },
    { depth: null },
);
```

Displays the following to the console:

```js
{
  token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46YXVka...', // Will vary based on time
  decodedToken: {
    token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46YXVka...', // Will vary based on time
    decoded: {
      header: { alg: 'HS512', typ: 'JWT' },
      payload: {
        aud: 'urn:audience:test',
        iss: 'urn:issuer:test',
        user: 'some_user_name',
        group: 'hapi_community',
        iat: 1600604562, // Will vary based on time
        exp: 1600618962 // Will vary based on time
      },
      signature: 'yh3ASEIrgNJZn...' // Will vary based on time
    },
    raw: {
      header: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9',
      payload: 'eyJhdWQiOiJ1cm46YXVka...', // Will vary based on time
      signature: 'yh3ASEIrgNJZn...' // Will vary based on time
    }
  },
  validResponse: { isValid: true },
  badSecretResponse: { isValid: false, error: 'Invalid token signature' },
  badIssResponse: { isValid: false, error: 'Token payload iss value not allowed' }
}
```

### generate

`generate(payload, secret, [options])`

Generates a token as a string where:

- `payload` - Object that contains [Registered Claim Names](#registered-claim-names) (optional) and additional credentials (optional). While both [Registered Claim Names](#registered-claim-names) and additional credentials are optional, an empty payload `{}`, would result in a key that only has an `iat` of now. This would make a token that is valid for one second and containing no other information.
- `secret` - String or buffer that creates signature **or** object where:
    - `key` - String or buffer that creates signature.
    - `algorithm`- String containing an accepted [algorithm](#Key-algorithms-supported-by-jwt) to be used. Default is `'HS256'`.
- `options` - Optional configuration object with the following:
    - `header` - Object to put additional key/value pairs in the header of the token in addition to `alg` and `typ`.
    - `typ` Boolean if set to `false` `typ: 'JWT'` is not included in the header.
    - `now` - Integer as an alternative way to set `iat` claim. Takes JavaScript style epoch time (with ms). `iat` claim must not be set and `iat` option must not be `false`. Milliseconds are truncated, not rounded.
    - `ttlSec` - Integer as an alternative way to set `exp` claim. `exp` is set to be `iat` + `ttlSec`. `exp` claim must not be set.
    - `iat` - Boolean if set to `false` to turn off default behavior of creating an `iat` claim.
    - `headless` - Boolean if set to `true` will create a headless token. Default is `false`.

### decode

`decode(token, [options])`

Returns an Object of a decoded token in the format of `artifacts` described in the [`validate`](#more-on-the-validate-function) section above. This does not verify the token, it only decodes it where:

- `token` - String of encoded token.
- `options` - Optional configuration object with the following:
    - `headless`: String representing `base64` header **or** an Object to use as a header on headless tokens. If this is set, tokens that contain a header section will create an error. Default is `null`.

### verify

`verify(artifacts, secret, [options])`

A function that will complete if verification passes or throw an error if verification fails where:

- `artifacts` - Object of a decoded token in the format of `artifacts` described in the [`validate`](#more-on-the-validate-function) section above.
- `secret` - String or buffer that creates signature **or** object where:
    - `key` - String or buffer that creates signature.
    - `algorithm`- String containing an accepted [algorithm](#Key-algorithms-supported-by-jwt) to be used. Default is `'HS256'`.
- `options` - Optional configuration object with the following:
    - `aud`- String or `RegExp` **or** array of strings or `RegExp` that matches the audience of the token.
    - `iss` - String or array of strings that matches the issuer of the token.
    - `sub` - String or array of strings that matches the subject of the token.
    - `jti` - String or array of strings that matches the JWT ID of the token.
    - `nonce` - String or array of strings that matches the `nonce` of the token. `nonce` is used on [Open ID](https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes) for the ID Tokens.
    - `nbf` - Integer that represents the "Not Before" [NumericDate](#registered-claim-names) of the token.
    - `exp` - Integer that represents the "Expiration Time" [NumericDate](#registered-claim-names) of the token.
    - `now` - Integer that represents the current time in JavaScript epoch format (with msecs). When evaluated the msecs are truncated, not rounded.
    - `maxAgeSec` - Integer to determine the maximum age of the token in seconds. This is time validation using the "Issued At" [NumericDate](#registered-claim-names) (`iat`).
    - `timeSkewSec` - Integer to adust `exp` and `maxAgeSec` to account for server time drift in seconds.

### verifySignature

`verifySignature({ decoded, raw }, secret)`

A function that will complete if the signature is valid or throw an error if invalid. This does not do verification on the payload. An expired token will not throw an error if the signature is valid, where:

- `decoded` - Object of decoded token in the format of `artifacts.decoded` described in the [`validate`](#more-on-the-validate-function) section above.
- `raw` - Object of decoded token in the format of `artifacts.raw` described in the [`validate`](#more-on-the-validate-function) section above.
- `secret` - String or buffer that creates signature **or** object where:
    - `key` - String or buffer that creates signature.
    - `algorithm`- String containing an accepted [algorithm](#Key-algorithms-supported-by-jwt) to be used. Default is `'HS256'`.

### verifyPayload

`verifyPayload({ decoded }, [options])`

A function that will complete if payload verification passes or throw an error if payload verification fails. This does not do verification on the signature, where:

- `decoded` - Object of decoded token in the format of `artifacts.decoded` described in the [`validate`](#more-on-the-validate-function) section above.
- `options` - Optional configuration object in format of `options` described in the [`verify`](<#verify(artifacts,-secret,-[options])>) section above.

### verifyTime

`verifyTime({ decoded }, [options, nowSec])`

A function that will complete if `iat` and `exp` verification pass and throw an error if verification fails. This is a subset of `verifyPayload` for only `iat` and `exp` where:

- `decoded` - Object of decoded token in the format of `artifacts.decoded` described in the [`validate`](#more-on-the-validate-function) section above.
- `options` - Optional configuration object with the following:
    - `now` - Integer that represents the current time in JavaScript epoch format (with msecs). When evaluated the msecs are truncated, not rounded. Either this or `nowSec` need to be defined.
    - `exp` - Integer that represents the "Expiration Time" [NumericDate](#registered-claim-names) of the token.
    - `maxAgeSec` - Integer to determine the maximum age of the token in seconds. This is time validation using the "Issued At" [NumericDate](#registered-claim-names) (`iat`).
    - `timeSkewSec` - Integer to adust `exp` and `maxAgeSec` to account for server time drift in seconds.

## Additional Information

### Registered Claim Names

List and explanation of Registered Claim Names according to [RFC 7519](https://tools.ietf.org/html/rfc7519#section-4.1). Please note that `NumericDate` refers to a timestamp in UNIX epoch time, without milliseconds. Whereas Javascript integer timestamps include milliseconds.

- `iss` - The "iss" (issuer) claim identifies the principal that issued the
  JWT. Expressed in a string.
- `sub`- The "sub" (subject) claim identifies the principal that is the
  subject of the JWT. Expressed in a string.
- `aud` - The "aud" (audience) claim identifies the recipients that the JWT is
  intended for. Expressed in a string.
- `exp` - The "exp" (expiration time) claim identifies the expiration time on
  or after which the JWT MUST NOT be accepted for processing. Expressed in `NumericDate`.
- `nbf` - The "nbf" (not before) claim identifies the time before which the JWT
  MUST NOT be accepted for processing. Expressed in `NumericDate`.
- `iat` - The "iat" (issued at) claim identifies the time at which the JWT was
  issued. Expressed in `NumericDate`.
- `jti` - The "jti" (JWT ID) claim provides a unique identifier for the JWT. Expressed in a string.
- `nonce` - While `nonce` is not an [RFC 7519](https://tools.ietf.org/html/rfc7519#section-4.1) Registered Claim, it is used on [Open ID](https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes) for the ID Tokens.

### Key algorithms supported by jwt

- Public: `['RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512', 'ES256', 'ES384', 'ES512', 'EdDSA']`
- RSA: `['RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512']`
- HMAC: `['HS256', 'HS384', 'HS512']`
- No Algorithm: `['none']`
