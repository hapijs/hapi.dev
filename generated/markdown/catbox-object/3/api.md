### Introduction

Memory object adapter for [catbox](https://github.com/hapijs/catbox).
This adapter is not designed to share a common cache between multiple processes (e.g. in a cluster
mode). It uses a single interval timeout to look for expired records and clean them from memory.
Unlike the **catbox-memory** cache, it does not clone objects stored (in either direction) or keep
track of memory usage.

### `new CatboxObject.Engine(options)`

- `maxSize` - sets an upper limit on the number of items that can be stored in the
  cache. Once this limit is reached no additional items will be added to the cache
  until some expire. Defaults to `1000`.
- `minCleanupIntervalMsec` - the minimum number of milliseconds in between each cache cleanup.
  Defaults to 1 second (`1000`).
