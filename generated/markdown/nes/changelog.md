## Version 14 {#v14}

### [14.0.1](https://github.com/hapijs/nes/milestone/86) {#14.0.1}

- [#338](https://github.com/hapijs/nes/pull/338) Declare correct `ws` options type

### [14.0.0](https://github.com/hapijs/nes/milestone/85) <a class="release-notes-link" href="https://github.com/hapijs/nes/issues/335" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#14.0.0}

- [#335](https://github.com/hapijs/nes/issues/335) v14.0.0 Release Notes
- [#334](https://github.com/hapijs/nes/pull/334) Release next version as 14.0.0
- [#333](https://github.com/hapijs/nes/pull/333) chore: set min node version
- [#330](https://github.com/hapijs/nes/pull/330) chore: 🤖 import and improve outdate typings from DT
- [#329](https://github.com/hapijs/nes/issues/329) Upgrade to ws@8.x
- [#327](https://github.com/hapijs/nes/pull/327) chore: change CI target for next

## Version 13 {#v13}

### [13.0.1](https://github.com/hapijs/nes/milestone/84) {#13.0.1}

- [#325](https://github.com/hapijs/nes/pull/325) chore: bump hoek

### [13.0.0](https://github.com/hapijs/nes/milestone/82) <span class="breaking-badge"></span> {#13.0.0}

- [#322](https://github.com/hapijs/nes/pull/322) Support node v18 and hapi v21, drop node v12 and hapi v18/19

## Version 12 {#v12}

### [12.0.5](https://github.com/hapijs/nes/milestone/83) {#12.0.5}

- [#323](https://github.com/hapijs/nes/pull/323) Fix client reconnect retry attempts
- [#318](https://github.com/hapijs/nes/pull/318) client - _reconnect update, single reconnection timer

### [12.0.4](https://github.com/hapijs/nes/milestone/81) {#12.0.4}

- [#313](https://github.com/hapijs/nes/pull/313) migrate to new travis format
- [#312](https://github.com/hapijs/nes/pull/312) upgrade to hapi 20
- [#311](https://github.com/hapijs/nes/pull/311) switch to validate and other package updates

### [12.0.3](https://github.com/hapijs/nes/milestone/80) {#12.0.3}

- [#307](https://github.com/hapijs/nes/pull/307) Upgrade deprecated `@hapi/call@6.x.x`
- [#306](https://github.com/hapijs/nes/pull/306) fix: pass remoteAddress when injecting request
- [#305](https://github.com/hapijs/nes/issues/305) request.info.remoteAddress is always 127.0.0.1 in request handler

### [12.0.2](https://github.com/hapijs/nes/milestone/79) {#12.0.2}

- [#304](https://github.com/hapijs/nes/pull/304) Prevent beat timeout from disconnecting newly connecting sockets

### [12.0.1](https://github.com/hapijs/nes/milestone/78) {#12.0.1}

- [#303](https://github.com/hapijs/nes/pull/303) Remove unused dep

### [12.0.0](https://github.com/hapijs/nes/milestone/77) <span class="breaking-badge"></span> {#12.0.0}

- [#301](https://github.com/hapijs/nes/issues/301) Change plugin name to @hapi/nes
- [#300](https://github.com/hapijs/nes/issues/300) Require hapi 19
- [#299](https://github.com/hapijs/nes/issues/299) Only node 12

## Version 11 {#v11}

### [11.2.2](https://github.com/hapijs/nes/milestone/76) {#11.2.2}

- [#285](https://github.com/hapijs/nes/issues/285) Unknown authentication strategy

### [11.2.1](https://github.com/hapijs/nes/milestone/75) {#11.2.1}

- [#289](https://github.com/hapijs/nes/issues/289) Update deps

### [11.2.0](https://github.com/hapijs/nes/milestone/74) {#11.2.0}

- [#284](https://github.com/hapijs/nes/pull/284) Add ability to revoke a socket ignoring if it is already closed
- [#283](https://github.com/hapijs/nes/issues/283) cleanup called twice if there is an onUnsubscribe handler

### [11.1.0](https://github.com/hapijs/nes/milestone/73) {#11.1.0}

- [#278](https://github.com/hapijs/nes/pull/278) Passing remoteAddress and x-forwarded-for is in whitelist when connect

### [11.0.1](https://github.com/hapijs/nes/milestone/72) {#11.0.1}

- [#279](https://github.com/hapijs/nes/issues/279) Fix name

### [11.0.0](https://github.com/hapijs/nes/milestone/71) <span class="breaking-badge"></span> {#11.0.0}

- [#276](https://github.com/hapijs/nes/issues/276) Remove client dist
- [#248](https://github.com/hapijs/nes/issues/248) eachSocket behaves as synchronous without filter, but async with filter

## Version 10 {#v10}

### [10.1.0](https://github.com/hapijs/nes/milestone/70) {#10.1.0}

- [#275](https://github.com/hapijs/nes/issues/275) Change module namespace

### [10.0.2](https://github.com/hapijs/nes/milestone/69) {#10.0.2}

- [#270](https://github.com/hapijs/nes/issues/270) Error in the browser with 10.0.1

### [10.0.1](https://github.com/hapijs/nes/milestone/68) {#10.0.1}

- [#269](https://github.com/hapijs/nes/issues/269) Update dependencies

### [10.0.0](https://github.com/hapijs/nes/milestone/67) <span class="breaking-badge"></span> {#10.0.0}

- [#265](https://github.com/hapijs/nes/issues/265) hapi v18

## Version 9 {#v9}

### [9.1.0](https://github.com/hapijs/nes/milestone/66) {#9.1.0}

- [#263](https://github.com/hapijs/nes/pull/263) Document minAuthVerifyInterval and make it less restrictive
- [#262](https://github.com/hapijs/nes/pull/262) Close the socket when authentication verification fails
- [#260](https://github.com/hapijs/nes/issues/260) Close the socket when authentication expires

### [9.0.2](https://github.com/hapijs/nes/milestone/65) {#9.0.2}

- [#256](https://github.com/hapijs/nes/issues/256) Cleanup

### [9.0.1](https://github.com/hapijs/nes/milestone/64) {#9.0.1}

- [#247](https://github.com/hapijs/nes/pull/247) Reconnect on error

## Version 8 {#v8}

### [8.1.0](https://github.com/hapijs/nes/milestone/63) {#8.1.0}

- [#243](https://github.com/hapijs/nes/pull/243) Add client.onHeartbeatTimeout hook

### [8.0.0](https://github.com/hapijs/nes/milestone/62) <span class="breaking-badge"></span> {#8.0.0}

- [#229](https://github.com/hapijs/nes/pull/229) Update ws to 5.x.x

## Version 7 {#v7}

### [7.2.0](https://github.com/hapijs/nes/milestone/61) {#7.2.0}

- [#228](https://github.com/hapijs/nes/pull/228) Mark NesErrors as coming from nes

### [7.1.0](https://github.com/hapijs/nes/milestone/60) {#7.1.0}

- [#224](https://github.com/hapijs/nes/pull/224) Add socket.info object
- [#223](https://github.com/hapijs/nes/pull/223) Delay heartbeats until server is started
- [#222](https://github.com/hapijs/nes/pull/222) Allow isSameSite cookie option to be passed

### [7.0.4](https://github.com/hapijs/nes/milestone/59) {#7.0.4}

- [#221](https://github.com/hapijs/nes/pull/221) Update hapijs/call to 5.x.x
- [#220](https://github.com/hapijs/nes/pull/220) Ignore node network errors after opening client socket

### [7.0.3](https://github.com/hapijs/nes/milestone/58) {#7.0.3}

- [#214](https://github.com/hapijs/nes/pull/214) Do not replace message for all sockets with override from filter

### [7.0.2](https://github.com/hapijs/nes/milestone/55) {#7.0.2}

- [#206](https://github.com/hapijs/nes/issues/206) Handle ws socket error events

### [7.0.1](https://github.com/hapijs/nes/milestone/54) {#7.0.1}

- [#198](https://github.com/hapijs/nes/issues/198) Better error handling

### [7.0.0](https://github.com/hapijs/nes/milestone/53) <span class="breaking-badge"></span> {#7.0.0}

- [#196](https://github.com/hapijs/nes/issues/196) hapi v17
- [#195](https://github.com/hapijs/nes/issues/195) Update ws
- [#194](https://github.com/hapijs/nes/issues/194) Update babel script

## Version 6 {#v6}

### [6.5.1](https://github.com/hapijs/nes/milestone/57) {#6.5.1}

- [#202](https://github.com/hapijs/nes/issues/202) Fix test

### [6.5.0](https://github.com/hapijs/nes/milestone/56) {#6.5.0}

- [#201](https://github.com/hapijs/nes/issues/201) Update ws

### [6.4.3](https://github.com/hapijs/nes/milestone/52) {#6.4.3}

- [#179](https://github.com/hapijs/nes/issues/179) `maximum call stack exceeded` if web socket gets disconnected while nes is sending packets

### [6.4.2](https://github.com/hapijs/nes/milestone/51) {#6.4.2}

- [#156](https://github.com/hapijs/nes/issues/156) Handle undefined payloads from server in client

### [6.4.1](https://github.com/hapijs/nes/milestone/50) {#6.4.1}

- [#171](https://github.com/hapijs/nes/issues/171) server falls with bad cookie header

### [6.4.0](https://github.com/hapijs/nes/milestone/49) {#6.4.0}

- [#169](https://github.com/hapijs/nes/issues/169) Expose server and connection on socket

### [6.3.2](https://github.com/hapijs/nes/milestone/48) {#6.3.2}

- [#168](https://github.com/hapijs/nes/issues/168) Update deps

### [6.3.1](https://github.com/hapijs/nes/milestone/47) {#6.3.1}

- [#145](https://github.com/hapijs/nes/issues/145) Disable inject() validate

### [6.3.0](https://github.com/hapijs/nes/milestone/46) {#6.3.0}

- [#144](https://github.com/hapijs/nes/pull/144) Verify request Origin

### [6.2.5](https://github.com/hapijs/nes/milestone/45) {#6.2.5}

- [#142](https://github.com/hapijs/nes/issues/142) Reconnection timeout conflicts

### [6.2.4](https://github.com/hapijs/nes/milestone/44) {#6.2.4}

- [#141](https://github.com/hapijs/nes/pull/141) Add client.js and dist/ to npm tarball -Closes #140
- [#140](https://github.com/hapijs/nes/issues/140) Missing root client.js and dist

### [6.2.3](https://github.com/hapijs/nes/milestone/43) {#6.2.3}

- [#139](https://github.com/hapijs/nes/issues/139) Update deps

### [6.2.2](https://github.com/hapijs/nes/milestone/42) {#6.2.2}

- [#138](https://github.com/hapijs/nes/issues/138) Always call onConnection before onSubscribe

### [6.2.1](https://github.com/hapijs/nes/milestone/41) {#6.2.1}

- [#136](https://github.com/hapijs/nes/issues/136) Reuse pre-stringified hapi response

### [6.2.0](https://github.com/hapijs/nes/milestone/40) {#6.2.0}

- [#135](https://github.com/hapijs/nes/issues/135) Cookie auth fails to register socket
- [#134](https://github.com/hapijs/nes/issues/134) Per user connection limit
- [#133](https://github.com/hapijs/nes/issues/133) Timeout sockets if hello takes too long

### [6.1.2](https://github.com/hapijs/nes/milestone/39) {#6.1.2}

- [#132](https://github.com/hapijs/nes/issues/132) Client indicates wasRequested when calling disconnect() on dead socket

### [6.1.1](https://github.com/hapijs/nes/milestone/38) {#6.1.1}

- [#131](https://github.com/hapijs/nes/issues/131) Incorrectly reports wasRequested when internally disconnects

### [6.1.0](https://github.com/hapijs/nes/milestone/37) {#6.1.0}

- [#129](https://github.com/hapijs/nes/issues/129) Include reason disconnected in log object

### [6.0.2](https://github.com/hapijs/nes/milestone/36) {#6.0.2}

- [#127](https://github.com/hapijs/nes/pull/127) Test on node v6

### [6.0.1](https://github.com/hapijs/nes/milestone/35) {#6.0.1}

- [#126](https://github.com/hapijs/nes/issues/126) Handle cases when client._ws is null

### [6.0.0](https://github.com/hapijs/nes/milestone/34) <span class="breaking-badge"></span> {#6.0.0}

- [#125](https://github.com/hapijs/nes/issues/125) Connect fails to check for previous internal socket when connecting.

## Version 5 {#v5}

### [5.0.3](https://github.com/hapijs/nes/milestone/33) {#5.0.3}

- [#124](https://github.com/hapijs/nes/issues/124) Adjust unsub processing timing on server

### [5.0.2](https://github.com/hapijs/nes/milestone/32) {#5.0.2}

- [#123](https://github.com/hapijs/nes/issues/123) Check is socket is still around while disconnecting

### [5.0.1](https://github.com/hapijs/nes/milestone/31) {#5.0.1}

- [#122](https://github.com/hapijs/nes/issues/122) Prevent server from sending data when stopping

### [5.0.0](https://github.com/hapijs/nes/milestone/30) <span class="breaking-badge"></span> {#5.0.0}

- [#121](https://github.com/hapijs/nes/issues/121) Properly clean up sockets and subscriptions on server stop

## Version 4 {#v4}

### [4.6.0](https://github.com/hapijs/nes/milestone/29) {#4.6.0}

- [#120](https://github.com/hapijs/nes/issues/120) Support user filter in eachSocket()

### [4.5.0](https://github.com/hapijs/nes/milestone/28) {#4.5.0}

- [#119](https://github.com/hapijs/nes/issues/119) Subscription revoke()
- [#118](https://github.com/hapijs/nes/issues/118) Keep separate subscription per connection

### [4.4.1](https://github.com/hapijs/nes/milestone/27) {#4.4.1}

- [#117](https://github.com/hapijs/nes/issues/117) Race condition between unsubscribe and disconnect when using auth index on sub

### [4.4.0](https://github.com/hapijs/nes/milestone/26) {#4.4.0}

- [#116](https://github.com/hapijs/nes/issues/116) User-specific broadcast
- [#115](https://github.com/hapijs/nes/issues/115) User-specific publish

### [4.3.0](https://github.com/hapijs/nes/milestone/25) {#4.3.0}

- [#112](https://github.com/hapijs/nes/issues/112) Expose socket and support publish override
- [#109](https://github.com/hapijs/nes/pull/109) Typo: listners -&gt; listeners

### [4.2.1](https://github.com/hapijs/nes/milestone/24) {#4.2.1}

- [#108](https://github.com/hapijs/nes/pull/108) Fix UMD global handling
- [#105](https://github.com/hapijs/nes/issues/105) Client.js getting root as undefined

### [4.2.0](https://github.com/hapijs/nes/milestone/23) {#4.2.0}

- [#107](https://github.com/hapijs/nes/issues/107) Expose params on unsubscribe callback

### [4.1.0](https://github.com/hapijs/nes/milestone/22) {#4.1.0}

- [#104](https://github.com/hapijs/nes/issues/104) Provide a way to replace auth credentials before an automatic reconnect

### [4.0.0](https://github.com/hapijs/nes/milestone/21) <span class="breaking-badge"></span> {#4.0.0}

- [#100](https://github.com/hapijs/nes/issues/100) Add required callback to subscription onSubscribe option

## Version 3 {#v3}

### [3.1.2](https://github.com/hapijs/nes/milestone/20) {#3.1.2}

- [#99](https://github.com/hapijs/nes/issues/99) Pause heartbeat disconnect while sending

### [3.1.1](https://github.com/hapijs/nes/milestone/19) {#3.1.1}

- [#98](https://github.com/hapijs/nes/issues/98) Server disconnects client after a long message transmission

### [3.1.0](https://github.com/hapijs/nes/milestone/18) <span class="breaking-badge"></span> {#3.1.0}

- [#97](https://github.com/hapijs/nes/issues/97) Break large messages into smaller chunks
- [#94](https://github.com/hapijs/nes/issues/94) Support sending initial subscription update

### [3.0.0](https://github.com/hapijs/nes/milestone/17) <span class="breaking-badge"></span> {#3.0.0}

- [#96](https://github.com/hapijs/nes/issues/96) Update Iron and increase auto-generated password to 32 characters

## Version 2 {#v2}

### [2.3.1](https://github.com/hapijs/nes/milestone/16) {#2.3.1}

- [#95](https://github.com/hapijs/nes/issues/95) Emit error when disconnecting due to missing server heartbeat

### [2.3.0](https://github.com/hapijs/nes/milestone/15) {#2.3.0}

- [#93](https://github.com/hapijs/nes/issues/93) Client requests fail if the request response takes longer than heartbeat timeout

### [2.2.0](https://github.com/hapijs/nes/milestone/14) {#2.2.0}

- [#92](https://github.com/hapijs/nes/issues/92) Return close event reason in onDisconnect
- [#90](https://github.com/hapijs/nes/issues/90) NesError breaks if passed an error event from onerror.
- [#76](https://github.com/hapijs/nes/issues/76) Pass the onclose information to onDisconnect

### [2.1.0](https://github.com/hapijs/nes/milestone/13) {#2.1.0}

- [#89](https://github.com/hapijs/nes/issues/89) Decorate errors with source type
- [#88](https://github.com/hapijs/nes/issues/88) onDisconnect() reports reconnect state incorrectly

### [2.0.2](https://github.com/hapijs/nes/milestone/12) {#2.0.2}

- [#87](https://github.com/hapijs/nes/issues/87) The update to ws 1.0.x introduces breaking changes

### [2.0.1](https://github.com/hapijs/nes/milestone/11) {#2.0.1}

- [#86](https://github.com/hapijs/nes/pull/86) update ws to 1.0.x

### [2.0.0](https://github.com/hapijs/nes/milestone/10) <span class="breaking-badge"></span> {#2.0.0}

- [#84](https://github.com/hapijs/nes/issues/84) Change client.subscribe() to require a callback
- [#83](https://github.com/hapijs/nes/issues/83) Add version check in hello

## Version 1 {#v1}

### [1.2.2](https://github.com/hapijs/nes/milestone/9) {#1.2.2}

- [#81](https://github.com/hapijs/nes/pull/81) Fix illegal invocation error when using default onError handler.

### [1.2.1](https://github.com/hapijs/nes/milestone/8) {#1.2.1}

- [#79](https://github.com/hapijs/nes/issues/79) Possible to subscribe, unsubscribe, and resubscribe? v1.2.0

### [1.2.0](https://github.com/hapijs/nes/milestone/7) <span class="breaking-badge"></span> {#1.2.0}

- [#72](https://github.com/hapijs/nes/pull/72) Update to create a es5 client artifact
- [#71](https://github.com/hapijs/nes/issues/71) Add socket.app
- [#70](https://github.com/hapijs/nes/issues/70) Decorate request with socket
- [#69](https://github.com/hapijs/nes/issues/69) ES6 style changes

### [1.1.2](https://github.com/hapijs/nes/milestone/6) {#1.1.2}

- [#67](https://github.com/hapijs/nes/pull/67) Use internal auth endpoint id for lookup
- [#66](https://github.com/hapijs/nes/issues/66) Plugin route prefix cause mismatch with default internal auth endpoint

### [1.1.1](https://github.com/hapijs/nes/milestone/5) {#1.1.1}

- [#65](https://github.com/hapijs/nes/issues/65) Return auth error message in response

### [1.1.0](https://github.com/hapijs/nes/milestone/4) {#1.1.0}

- [#64](https://github.com/hapijs/nes/pull/64) Implement internal data for filtering messages
- [#63](https://github.com/hapijs/nes/issues/63) Add message metadata for publish
- [#62](https://github.com/hapijs/nes/pull/62) Implement eachSocket iterator
- [#61](https://github.com/hapijs/nes/pull/61) Implement per-subscription lifecycle
- [#60](https://github.com/hapijs/nes/pull/60) Add onDisconnection callback
- [#56](https://github.com/hapijs/nes/issues/56) Add disconnection callback

### [1.0.0](https://github.com/hapijs/nes/milestone/3) <span class="breaking-badge"></span> {#1.0.0}

- [#46](https://github.com/hapijs/nes/issues/46) socket.send()
- [#45](https://github.com/hapijs/nes/issues/45) Rename onBroadcast to onUpdate
- [#44](https://github.com/hapijs/nes/issues/44) Max reconnect retries
- [#43](https://github.com/hapijs/nes/issues/43) Connection timeout
- [#22](https://github.com/hapijs/nes/issues/22) Add heartbeat
- [#19](https://github.com/hapijs/nes/issues/19) Allow for custom callback data to Client.connect()
- [#8](https://github.com/hapijs/nes/issues/8) Request timeout

## Version 0 {#v0}

### [0.4.0](https://github.com/hapijs/nes/milestone/2) <span class="breaking-badge"></span> {#0.4.0}

- [#42](https://github.com/hapijs/nes/issues/42) Remove duplicated statusCode in errors
- [#41](https://github.com/hapijs/nes/issues/41) Filter headers in responses
- [#40](https://github.com/hapijs/nes/issues/40) Consistent error transmission
- [#38](https://github.com/hapijs/nes/issues/38) Prevent client from including a request authorization header
- [#34](https://github.com/hapijs/nes/issues/34) Prevent client from subscribing multiple times to same path
- [#32](https://github.com/hapijs/nes/issues/32) Change server onConnect to onConnection and delay until after auth when required
- [#30](https://github.com/hapijs/nes/issues/30) Block all client requests when channel requires auth
- [#29](https://github.com/hapijs/nes/pull/29) Fix typo
- [#28](https://github.com/hapijs/nes/issues/28) Implement unsubscribe on the server
- [#27](https://github.com/hapijs/nes/issues/27) Expose socket authentication state
- [#26](https://github.com/hapijs/nes/issues/26) Ability to force disconnect for specific clients
- [#25](https://github.com/hapijs/nes/issues/25) 'data' vs 'message' for incoming data
- [#24](https://github.com/hapijs/nes/issues/24) Subscriptions are not cleaned on client disconnect

### [0.3.0](https://github.com/hapijs/nes/milestone/1) {#0.3.0}

- [#21](https://github.com/hapijs/nes/issues/21) Drop support for non-protocol messages
- [#20](https://github.com/hapijs/nes/issues/20) Change default auth method to direct
- [#18](https://github.com/hapijs/nes/issues/18) Race condition exists in client reconnect logic
- [#17](https://github.com/hapijs/nes/pull/17) Allow for custom messages
- [#16](https://github.com/hapijs/nes/issues/16) Turn auth on by default
- [#15](https://github.com/hapijs/nes/pull/15) Add onConnect callback option
- [#14](https://github.com/hapijs/nes/issues/14) Add event callback for client connection
- [#12](https://github.com/hapijs/nes/pull/12) Add browser packaging entry points
- [#11](https://github.com/hapijs/nes/issues/11) Initial publish/subscribe interface
- [#9](https://github.com/hapijs/nes/issues/9) Use console.error() when no onError handler
- [#6](https://github.com/hapijs/nes/issues/6) Re-auth on reconnect
- [#5](https://github.com/hapijs/nes/issues/5) Allow any authentication method when using token auth
- [#4](https://github.com/hapijs/nes/issues/4) Allow handler to handle unknown message types
- [#3](https://github.com/hapijs/nes/issues/3) How will adding additional functionality work?
