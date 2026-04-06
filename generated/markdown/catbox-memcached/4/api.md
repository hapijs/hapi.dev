### `new CatboxMemcached.Engine(options)`

- `host` - the Memcache server hostname. Defaults to `127.0.0.1`. **Cannot be used with `server`.**
- `port` - the Memcache server port. Defaults to `11211`. **Cannot be used with `server`.**
- `server` - the Memcache server hostname and port. Defaults to `127.0.0.1:11211`. Can be a string or an object as per [memcache-client server specification](https://github.com/electrode-io/memcache/tree/3dd8e7cc3da3ec78ac45c4a69379e810cb25f6c7/packages/memcache-client#client-options).
