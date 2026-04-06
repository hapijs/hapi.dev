## Introduction

`subtext` parses the request body and returns it in a promise.

## Example

```javascript
const Http = require('http');
const Subtext = require('@hapi/subtext');

Http.createServer(async (request, response) => {
  const { payload, mime } = await Subtext.parse(request, null, {
    parse: true,
    output: 'data',
  });

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end(`Payload contains: ${JSON.stringify(payload)}`);
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
```

## Methods

### `Subtext.parse(request, tap, options)`

Parses the request body and returns it in a promise.

`options` are the following:

- `parse`: (required) boolean
- `output`: (required) 'data', 'stream', 'file'
- `maxBytes`: int
- `maxParts`: int
- `override`: string
- `defaultContentType`: string
- `allow`: string, only allow a certain media type
- `timeout`: integer, limit time spent buffering request
- `qs`: object, to pass into the qs module
- `uploads`: string, directory for file uploads
- `decoders`: an object mapping content-encoding names to their corresponding decoder functions
- `compression`: an object mapping content-encoding names to their corresponding options passed to the `decoders` functions

returns the following:

- `payload`: the parsed payload, or null if no payload
- `mime`: the content type of the request
