# @hapi/sse

SSE (Server-Sent Events) plugin for hapi. WHATWG spec-compliant with subscription-based pub/sub, event replay, backpressure, built-in stats, and lifecycle hooks.

## Install

```
npm install @hapi/sse
```

Peer dependencies: `@hapi/hapi` ^21, `@hapi/boom` ^10.

## Quick Start

```typescript
import Hapi from '@hapi/hapi';
import { SsePlugin } from '@hapi/sse';

const server = Hapi.server({ port: 3000 });

await server.register({ plugin: SsePlugin });

server.sse.subscription('/chat/{room}');

await server.start();

// Publish from anywhere
await server.sse.publish(
    '/chat/general',
    { text: 'hello', user: 'alice' },
    { event: 'message' },
);
```

## Plugin Options

```typescript
await server.register({
    plugin: SsePlugin,
    options: {
        retry: 2000,                            // retry interval in ms (default: 2000, null to disable)
        keepAlive: { interval: 15_000 },         // keep-alive comment interval (default: 15s, false to disable)
        headers: { 'X-Custom': 'value' },        // extra headers on every SSE response
        backpressure: { maxBytes: 65536, strategy: 'drop' },  // optional
        hooks: { ... },                          // optional, see Hooks section
        completion: {                            // optional, see Stream completion section
            cache: 'my-redis-cache',             //   named cache engine (default: hapi default)
            segment: 'completed-sessions',       //   segment name
            expiresIn: 5 * 60 * 1000,            //   TTL for completion tokens (default: 5 min)
        },
    },
});
```

## API

### `server.sse.subscription(path, config?)`

Registers a subscription route. Clients connect via `GET <path>`.

```typescript
server.sse.subscription('/chat/{room}', {
    auth: 'jwt',
    retry: 5000,
    keepAlive: { interval: 10_000 },
    refuse: (request) => server.app.shuttingDown || circuitBreaker.isOpen(),
    filter: async (path, message, { credentials, params, internal }) => {
        if (params.room !== internal.targetRoom) {
            return false; // don't deliver
        }
        return { override: { ...message, filtered: true } }; // or transform
    },
    onSubscribe: async (session, path, params) => {},
    onUnsubscribe: (session, path, params) => {},
    onReconnect: async (session, path, params) => {},
    replay: new FiniteReplayer({ size: 100 }), // optional, see Replay section
});
```

**Config options:**

| Option          | Type                                                               | Description                                                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auth`          | `RouteOptions['auth']`                                             | hapi auth config for the route                                                                                                                                                                |
| `retry`         | `number \| null`                                                   | Override plugin-level retry                                                                                                                                                                   |
| `keepAlive`     | `{ interval: number } \| false`                                    | Override plugin-level keep-alive                                                                                                                                                              |
| `refuse`        | `(request) => boolean \| Promise<boolean>`                         | Server-state predicate. Runs before the session is created. Returning `true` responds with `204 No Content`, telling the EventSource not to reconnect.                                        |
| `filter`        | `(path, message, opts) => boolean \| { override } \| Promise<...>` | Per-session delivery filter                                                                                                                                                                   |
| `onSubscribe`   | `(session, path, params) => void \| Promise<void>`                 | Fires before SSE headers are sent. Throwing a Boom error returns that HTTP error to the client.                                                                                               |
| `onUnsubscribe` | `(session, path, params) => void`                                  | Fires on client disconnect                                                                                                                                                                    |
| `onReconnect`   | `(session, path, params) => void \| Promise<void>`                 | Fires when `Last-Event-ID` is present (after replay). Errors close the session gracefully.                                                                                                    |
| `replay`        | `Replayer`                                                         | Replay provider for automatic reconnection replay                                                                                                                                             |
| `maxSessions`   | `number`                                                           | Maximum concurrent sessions for this subscription. Excess connections receive a 503 response.                                                                                                 |
| `maxDuration`   | `number`                                                           | Maximum connection lifetime in ms. Sessions are closed after this duration (with ±10% jitter to prevent thundering herd reconnections). A `: session expired` comment is sent before closing. |

### `server.sse.publish(path, data, opts?)`

Publishes an event to all matching subscribers. Returns the number of sessions that received the event.

```typescript
const delivered = await server.sse.publish(
    '/chat/general',
    { text: 'hello everyone', user: 'alice' },
    {
        event: 'message',
        id: 'msg-42',
        internal: { targetRoom: 'general' }, // passed to filter
        matchMode: 'literal', // 'pattern' (default) or 'literal'
    },
);

console.log(`Delivered to ${delivered} sessions`);
```

**`matchMode`:**

- `'pattern'` (default) — delivers to all sessions on a matching subscription pattern (e.g. `/chat/{room}`)
- `'literal'` — only delivers to sessions whose actual connected path equals `path` exactly. Useful for parameterized subscriptions where you want to target `/chat/general` but not `/chat/random`.

**Note:** Only events published with an explicit `id` are recorded by the replayer. Events without an `id` are delivered but not stored for replay.

### `server.sse.broadcast(data, opts?)`

Sends an event to every connected session across all subscriptions. Returns the delivery count.

```typescript
const count = await server.sse.broadcast(
    { text: 'Server restarting in 5 minutes', user: 'system' },
    { event: 'system' },
);
```

### `server.sse.eachSession(fn, opts?)`

Iterates over connected sessions. Optionally filter by subscription pattern.

```typescript
await server.sse.eachSession(
    async (session) => {
        session.push({ text: 'ping', user: 'system' });
    },
    { subscription: '/chat/{room}' },
);
```

### `server.sse.subscriptions()`

Returns a snapshot of all registered subscriptions with active session counts.

```typescript
const subs = server.sse.subscriptions();
// [{ pattern: '/chat/{room}', activeSessions: 12 }]
```

### `server.sse.closeSessions(pattern)`

Closes all sessions for a specific subscription pattern.

```typescript
server.sse.closeSessions('/chat/{room}');
```

### `server.sse.sessionCount`

Total number of active sessions across all subscriptions.

```typescript
console.log(server.sse.sessionCount); // 42
```

### `server.sse.stats()`

Returns built-in metrics tracked by the plugin. No configuration needed.

```typescript
const stats = server.sse.stats();
// {
//     totalConnections: 150,
//     totalDisconnections: 108,
//     totalPublishes: 5230,
//     totalBroadcasts: 12,
//     totalEventsDelivered: 48700,
//     activeSessions: 42,
// }
```

| Stat                   | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| `totalConnections`     | Cumulative subscription connections since server start              |
| `totalDisconnections`  | Cumulative disconnections since server start                        |
| `totalPublishes`       | Number of `publish()` calls                                         |
| `totalBroadcasts`      | Number of `broadcast()` calls                                       |
| `totalEventsDelivered` | Sum of all individual event deliveries across publish and broadcast |
| `activeSessions`       | Current connected session count (same as `sessionCount`)            |

## Session

The `Session` object represents a single SSE connection.

```typescript
session.push(data, event?, id?)   // Send an event. Returns boolean (false if dropped/closed).
session.comment(text?)            // Send a comment (invisible to EventSource)
session.close()                   // End the connection (client will reconnect)
session.complete()                // Mark the stream as done; next reconnect gets HTTP 204
session.id                        // UUID generated at construction; used as the completion token
session.isOpen                    // true if connection is still active
session.connectedAt               // Unix timestamp (ms) when the session was created
session.lastEventId               // Value of Last-Event-ID header (empty string if absent)
session.request                   // The original hapi Request object
```

**Stream completion** — when the stream has done its work and the client should not reconnect, call `session.complete()` instead of `session.close()`:

```typescript
server.route({
    method: 'GET',
    path: '/jobs/{id}/progress',
    handler: {
        sse: {
            stream: async (request, session) => {
                for await (const update of jobProgress(request.params.id)) {
                    session.push(update, 'progress', update.eventId);
                }
                await session.complete(); // emits a final event with a token id, closes the stream
            },
        },
    },
});
```

`complete()` writes a final SSE event of type `complete` with `session.id` as its `id` field. The browser saves that UUID as its `Last-Event-ID`. If the EventSource reconnects, the plugin sees the token in the `Last-Event-ID` header and responds `204 No Content`. Per the [WHATWG SSE spec](https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events-intro), a 204 response makes the EventSource stop reconnecting.

Clients can react to completion via `eventSource.addEventListener('complete', handler)`.

**Completion cache** — tokens live in a hapi server cache (default: in-process catbox-memory, 5 minute TTL). Each token is consumed on first redemption. Use the `completion` plugin option to customize:

```typescript
const server = Hapi.server({
    port: 3000,
    cache: [
        {
            name: 'redis-cache',
            provider: {
                constructor: require('@hapi/catbox-redis'),
                options: { host: '127.0.0.1' },
            },
        },
    ],
});

await server.register({
    plugin: SsePlugin,
    options: {
        completion: {
            cache: 'redis-cache', // share completion state across processes
            segment: 'sse-completions',
            expiresIn: 10 * 60 * 1000, // 10 minutes
        },
    },
});
```

**Metadata** — attach arbitrary key-value data to a session:

```typescript
session.set('userId', 'alice');
session.get('userId'); // 'alice'
session.has('userId'); // true
session.delete('userId'); // true
```

Metadata persists for the lifetime of the session. Useful for tagging sessions in `onSubscribe` and reading in filters or `eachSession`.

## Custom Handler Mode

For full control over the stream (e.g. AI-assisted chat responses), use the handler decorator instead of subscriptions:

```typescript
server.route({
    method: 'GET',
    path: '/chat/{room}/ai',
    handler: {
        sse: {
            stream: async (request, session) => {
                for (const token of tokens) {
                    session.push({ token, user: 'assistant' }, 'token');
                }
                session.close();
            },
            retry: 3000, // override plugin-level retry
            keepAlive: { interval: 10_000 }, // override plugin-level keep-alive
            headers: { 'X-Chat-Bot': 'true' }, // override plugin-level headers
            backpressure: { maxBytes: 32768, strategy: 'close' },
        },
    },
});
```

**Handler options:**

| Option         | Type                                          | Description                                                                           |
| -------------- | --------------------------------------------- | ------------------------------------------------------------------------------------- |
| `stream`       | `(request, session) => void \| Promise<void>` | Required. Called after SSE headers are sent. Errors close the session gracefully.     |
| `retry`        | `number \| null`                              | Override plugin-level retry (default: inherits from plugin)                           |
| `keepAlive`    | `{ interval: number } \| false`               | Override plugin-level keep-alive (default: inherits from plugin)                      |
| `headers`      | `Record<string, string>`                      | Override plugin-level headers (default: inherits from plugin)                         |
| `backpressure` | `BackpressureOptions`                         | Override plugin-level backpressure (default: inherits from plugin)                    |
| `maxDuration`  | `number`                                      | Maximum connection lifetime in ms (with ±10% jitter). Sends a comment before closing. |

## Event Replay

SSE clients automatically send a `Last-Event-ID` header when reconnecting after a dropped connection. When a replayer is configured, the plugin uses that ID to find where the client left off and pushes any events published after it — so the client catches up on what it missed while disconnected.

Only events published with an explicit `id` are recorded. Events without an `id` are delivered but not stored for replay — this prevents the buffer from filling with unaddressable entries.

Two built-in replayers:

### FiniteReplayer

Keeps the last N events in a fixed-size ring buffer. When full, the oldest entry is dropped to make room. Memory usage is predictable — bounded by `size`.

```typescript
import { FiniteReplayer } from '@hapi/sse';

const replayer = new FiniteReplayer({ size: 100, autoId: true });

server.sse.subscription('/chat/{room}', { replay: replayer });
```

### ValidReplayer

Keeps events for a fixed duration. A periodic cleanup timer removes expired entries, so memory usage varies with publish rate but replayed events are never older than `ttl`.

```typescript
import { ValidReplayer } from '@hapi/sse';

const replayer = new ValidReplayer({ ttl: 60_000, autoId: true });

server.sse.subscription('/chat/{room}', { replay: replayer });
```

Call `replayer.stop()` to clear the cleanup timer (handled automatically on server stop).

**Options:**

| Option   | Type      | Description                                                  |
| -------- | --------- | ------------------------------------------------------------ |
| `size`   | `number`  | (FiniteReplayer) Max entries to keep                         |
| `ttl`    | `number`  | (ValidReplayer) Entry lifetime in ms                         |
| `autoId` | `boolean` | Auto-generate sequential IDs when events have no explicit ID |

**Custom replayer** — implement the `Replayer` interface:

```typescript
import type { Replayer, ReplayEntry } from '@hapi/sse';

class RedisReplayer implements Replayer {
    record(entry: ReplayEntry): void {
        /* store to Redis stream */
    }
    replay(lastEventId: string): ReplayEntry[] {
        /* read from Redis */
    }
    stop?(): void {
        /* cleanup */
    }
}
```

## Backpressure

Protects against slow consumers accumulating unbounded memory. Uses Node's `writableLength` to accurately measure bytes queued in the kernel buffer. Configurable at plugin level or per-handler.

```typescript
// Plugin level — applies to all subscription sessions
await server.register({
    plugin: SsePlugin,
    options: {
        backpressure: { maxBytes: 65536, strategy: 'close' },
    },
});

// Handler level — overrides plugin level
server.route({
    method: 'GET',
    path: '/chat/{room}/ai',
    handler: {
        sse: {
            stream: async (req, session) => { ... },
            backpressure: { maxBytes: 32768, strategy: 'drop' },
        },
    },
});
```

**Strategies:**

| Strategy  | Behavior                                                |
| --------- | ------------------------------------------------------- |
| `'close'` | Closes the session when pending bytes exceed `maxBytes` |
| `'drop'`  | Silently drops the event but keeps the session open     |

When backpressure triggers, `session.push()` returns `false`.

## Hooks

Optional lifecycle hooks for side effects (logging, external telemetry). All hooks are wrapped in try/catch — errors never break the stream.

```typescript
await server.register({
    plugin: SsePlugin,
    options: {
        hooks: {
            onSession: (session, path, params) => {
                console.log(`Joined: ${path}`);
            },
            onSessionClose: (session, path, params) => {
                console.log(`Left: ${path}`);
            },
            onPublish: (path, data, deliveryCount) => {
                console.log(`Message in ${path}: ${deliveryCount} recipients`);
            },
        },
    },
});
```

For metrics, prefer `server.sse.stats()` which tracks counters automatically. Use hooks for side effects like logging or pushing to external systems.

## Generics

Subscription config and publish are generic for type-safe event payloads:

```typescript
interface ChatMessage {
    text: string;
    user: string;
}

server.sse.subscription<ChatMessage>('/chat/{room}', {
    filter: (path, message) => {
        // message is typed as ChatMessage
        return message.user !== 'blocked';
    },
});

await server.sse.publish<ChatMessage>('/chat/general', {
    text: 'hello',
    user: 'alice',
});
```

## Security

The plugin includes several built-in defenses against known SSE attack vectors:

**Retry floor** — The `retry` value is silently clamped to a minimum of 1000ms. This prevents reconnection storm attacks where a malicious or misconfigured `retry: 0` causes clients to reconnect thousands of times per second. Setting `retry: null` disables the retry field entirely (no clamping).

**Last-Event-ID sanitization** — Control characters (`\x00`–`\x1f`) are stripped from the incoming `Last-Event-ID` header. This prevents null byte injection and CRLF attacks via the reconnection header.

**Connection limiting** — Use `maxSessions` on subscriptions to cap concurrent connections. Excess connections receive an HTTP 503 response before SSE headers are sent, preventing connection exhaustion.

**Connection TTL** — Use `maxDuration` to enforce a maximum connection lifetime. A ±10% jitter is applied to prevent thundering herd reconnections when many clients connect at the same time. Clients automatically reconnect via the standard SSE reconnection mechanism.

**CRLF injection protection** — The `EventBuffer` serializer strips or splits newlines in `event` and `id` fields, and splits `data` fields on line terminators. This prevents SSE event injection attacks (CVE-2026-33128, CVE-2026-22735, CVE-2026-29085 pattern).

**Backpressure** — Slow consumers are handled via configurable backpressure strategies (`drop` or `close`), preventing unbounded memory growth from write buffer accumulation.

**Not in scope** — Origin header validation, CSRF protection, and authentication are handled by hapi's auth system and middleware (`onPreAuth` extensions or reverse proxy configuration), not by the SSE plugin.

## Exports

```typescript
// Classes
export { EventBuffer, Session, SsePlugin, FiniteReplayer, ValidReplayer };

// Types
export type {
    SsePluginOptions,
    SseApi,
    SseHandlerOptions,
    SseHooks,
    SseStats,
    SubscriptionConfig,
    SubscriptionInfo,
    FilterOptions,
    BackpressureOptions,
    Replayer,
    ReplayEntry,
};
```
