## Version 18 {#v18}

### [18.1.2](https://github.com/hapijs/wreck/milestone/80) {#18.1.2}

- [#313](https://github.com/hapijs/wreck/pull/313) fix: cross-origin redirect should also remove sensitive headers

### [18.1.1](https://github.com/hapijs/wreck/milestone/79) {#18.1.1}

- [#312](https://github.com/hapijs/wreck/pull/312) fix: strip proxy-authorization header on redirect

### [18.1.0](https://github.com/hapijs/wreck/milestone/78) {#18.1.0}

- [#309](https://github.com/hapijs/wreck/issues/309) support custom lookup function in request()
- [#308](https://github.com/hapijs/wreck/pull/308) support custom lookup function in request()

### [18.0.2](https://github.com/hapijs/wreck/milestone/77) {#18.0.2}

- [#310](https://github.com/hapijs/wreck/pull/310) Optimize header toLowerCasing

### [18.0.1](https://github.com/hapijs/wreck/milestone/76) {#18.0.1}

- [#299](https://github.com/hapijs/wreck/pull/299) chore: bump hoek

### [18.0.0](https://github.com/hapijs/wreck/milestone/75) <span class="breaking-badge"></span> {#18.0.0}

- [#296](https://github.com/hapijs/wreck/pull/296) Support node v18 and drop node v12

## Version 17 {#v17}

### [17.2.0](https://github.com/hapijs/wreck/milestone/73) <span class="breaking-badge"></span> {#17.2.0}

- [#295](https://github.com/hapijs/wreck/pull/295) [CI] Cancel redirect request
- [#292](https://github.com/hapijs/wreck/pull/292) strip authorization and cookie headers when redirecting to a new hostname
- [#287](https://github.com/hapijs/wreck/pull/287) Cancel redirect request

### [17.1.0](https://github.com/hapijs/wreck/milestone/71) {#17.1.0}

- [#283](https://github.com/hapijs/wreck/pull/283) Create ci-module.yml
- [#281](https://github.com/hapijs/wreck/pull/281) added IPv6 support
- [#280](https://github.com/hapijs/wreck/pull/280) upgrade lab to v24 and devDependency of typescript
- [#276](https://github.com/hapijs/wreck/issues/276) Unable to GET a server that listens to IPv6 address. ETIMEDOUT

### [17.0.0](https://github.com/hapijs/wreck/milestone/70) <span class="breaking-badge"></span> {#17.0.0}

- [#270](https://github.com/hapijs/wreck/issues/270) Only node 12
- [#267](https://github.com/hapijs/wreck/pull/267) Refactor early abort detection to use the 'abort' event
- [#266](https://github.com/hapijs/wreck/pull/266) Don't set redirected host header

## Version 16 {#v16}

### [16.0.1](https://github.com/hapijs/wreck/milestone/68) {#16.0.1}

- [#264](https://github.com/hapijs/wreck/issues/264) Allow any readable stream in read()

### [16.0.0](https://github.com/hapijs/wreck/milestone/67) <span class="breaking-badge"></span> {#16.0.0}

- [#263](https://github.com/hapijs/wreck/issues/263) Add types
- [#262](https://github.com/hapijs/wreck/issues/262) Drop node 8

## Version 15 {#v15}

### [15.1.0](https://github.com/hapijs/wreck/milestone/64) <span class="breaking-badge"></span> {#15.1.0}

- [#254](https://github.com/hapijs/wreck/issues/254) 'abort' event
- [#252](https://github.com/hapijs/wreck/pull/252) Respect uri parameter when using socketPath
- [#250](https://github.com/hapijs/wreck/pull/250) memory leak issue
- [#248](https://github.com/hapijs/wreck/issues/248) Change redirect method in `beforeRedirect`
- [#247](https://github.com/hapijs/wreck/pull/247) Return an empty buffer payload on text content-type rather than `null`

### [15.0.2](https://github.com/hapijs/wreck/milestone/63) {#15.0.2}

- [#256](https://github.com/hapijs/wreck/issues/256) Update deps

### [15.0.1](https://github.com/hapijs/wreck/milestone/62) {#15.0.1}

- [#246](https://github.com/hapijs/wreck/pull/246) Explicit host header trumps host implied in url
- [#245](https://github.com/hapijs/wreck/issues/245) An explicit host header is ignored if the request url has no implicit host

### [15.0.0](https://github.com/hapijs/wreck/milestone/59) <a class="release-notes-link" href="https://github.com/hapijs/wreck/issues/244" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#15.0.0}

- [#244](https://github.com/hapijs/wreck/issues/244) 15.0.0 Release Notes
- [#243](https://github.com/hapijs/wreck/issues/243) Change module namespace
- [#242](https://github.com/hapijs/wreck/pull/242) Remove usage of deprecated url.Parse
- [#235](https://github.com/hapijs/wreck/pull/235) Introduce new preRequest event and emit request on request event
- [#209](https://github.com/hapijs/wreck/issues/209) Shouldn't request event emit request object?

## Version 14 {#v14}

### [14.2.0](https://github.com/hapijs/wreck/milestone/58) {#14.2.0}

- [#240](https://github.com/hapijs/wreck/pull/240) Update eslint md dev dep
- [#239](https://github.com/hapijs/wreck/pull/239) Whatwg url
- [#238](https://github.com/hapijs/wreck/issues/238) Can Wreck parse urls with the WHATWG Url?

### [14.1.4](https://github.com/hapijs/wreck/milestone/57) {#14.1.4}

- [#236](https://github.com/hapijs/wreck/issues/236) Protect against prototype poisoning

### [14.1.3](https://github.com/hapijs/wreck/milestone/56) {#14.1.3}

- [#231](https://github.com/hapijs/wreck/issues/231) Remove engines

### [14.1.2](https://github.com/hapijs/wreck/milestone/55) {#14.1.2}

- [#230](https://github.com/hapijs/wreck/issues/230) Update hoek v6

### [14.1.1](https://github.com/hapijs/wreck/milestone/54) {#14.1.1}

- [#229](https://github.com/hapijs/wreck/issues/229) Cleanup

### [14.1.0](https://github.com/hapijs/wreck/milestone/53) {#14.1.0}

- [#226](https://github.com/hapijs/wreck/pull/226) Handle edge cases introduced with deferred payload piping
- [#225](https://github.com/hapijs/wreck/pull/225) Handle stream payload errors before socket connection
- [#224](https://github.com/hapijs/wreck/pull/224) Workaround node 10 regression
- [#223](https://github.com/hapijs/wreck/pull/223) Defer piping of options.payload until socket connection
- [#222](https://github.com/hapijs/wreck/issues/222) Investigate only piping the payload after a connection is established
- [#218](https://github.com/hapijs/wreck/pull/218) Remove new Buffer usage
- [#215](https://github.com/hapijs/wreck/pull/215) test(request) correct tests to check errors for boom instance

### [14.0.2](https://github.com/hapijs/wreck/milestone/52) {#14.0.2}

- [#208](https://github.com/hapijs/wreck/issues/208) Fix new Boom

### [14.0.1](https://github.com/hapijs/wreck/milestone/51) {#14.0.1}

- [#207](https://github.com/hapijs/wreck/issues/207) Update deps
- [#206](https://github.com/hapijs/wreck/pull/206) Upgrade to lab 15

### [14.0.0](https://github.com/hapijs/wreck/milestone/50) <span class="breaking-badge"></span> {#14.0.0}

- [#205](https://github.com/hapijs/wreck/pull/205) Change maxBytes error to 413
- [#204](https://github.com/hapijs/wreck/pull/204) Cleanup and lint readme

## Version 13 {#v13}

### [13.0.3](https://github.com/hapijs/wreck/milestone/48) {#13.0.3}

- [#202](https://github.com/hapijs/wreck/issues/202) Update deps

### [13.0.2](https://github.com/hapijs/wreck/milestone/47) {#13.0.2}

- [#199](https://github.com/hapijs/wreck/pull/199) Return errors for partial payload transfers

### [13.0.1](https://github.com/hapijs/wreck/milestone/46) {#13.0.1}

- [#198](https://github.com/hapijs/wreck/issues/198) Retain boom errors from response stream on read()

### [13.0.0](https://github.com/hapijs/wreck/milestone/45) <span class="breaking-badge"></span> {#13.0.0}

- [#197](https://github.com/hapijs/wreck/pull/197) Move to use async functions
- [#196](https://github.com/hapijs/wreck/issues/196) Migrate to async/await

## Version 12 {#v12}

### [12.6.1](https://github.com/hapijs/wreck/milestone/61) {#12.6.1}

- [#258](https://github.com/hapijs/wreck/issues/258) Backport #250

### [12.6.0](https://github.com/hapijs/wreck/milestone/60) {#12.6.0}

- [#241](https://github.com/hapijs/wreck/issues/241) Commercial version of v12 branch

### [12.5.1](https://github.com/hapijs/wreck/milestone/49) {#12.5.1}

- [#201](https://github.com/hapijs/wreck/issues/201) Return errors for partial payload transfers
- [#200](https://github.com/hapijs/wreck/pull/200) version 12.5.1

### [12.5.0](https://github.com/hapijs/wreck/milestone/44) {#12.5.0}

- [#195](https://github.com/hapijs/wreck/pull/195) closes #194 - support for a list of TLS ciphers
- [#194](https://github.com/hapijs/wreck/issues/194) Add support for specifying the TLS ciphers list

### [12.4.0](https://github.com/hapijs/wreck/milestone/43) {#12.4.0}

- [#193](https://github.com/hapijs/wreck/pull/193) Add onRequest to request options

### [12.3.0](https://github.com/hapijs/wreck/milestone/42) {#12.3.0}

- [#192](https://github.com/hapijs/wreck/pull/192) Add a gunzipping option
- [#190](https://github.com/hapijs/wreck/pull/190) Add "strict" json option
- [#186](https://github.com/hapijs/wreck/issues/186) Add "strict" json option

### [12.2.3](https://github.com/hapijs/wreck/milestone/41) {#12.2.3}

- [#189](https://github.com/hapijs/wreck/pull/189) Fix possible content-type header duplication
- [#188](https://github.com/hapijs/wreck/issues/188) Possible `content-type` header duplication
- [#184](https://github.com/hapijs/wreck/pull/184) Upgrade lab

### [12.2.2](https://github.com/hapijs/wreck/milestone/40) {#12.2.2}

- [#183](https://github.com/hapijs/wreck/issues/183) Fix tests for node 7.10.0

### [12.2.1](https://github.com/hapijs/wreck/milestone/39) {#12.2.1}

- [#182](https://github.com/hapijs/wreck/issues/182) Update deps.

### [12.2.0](https://github.com/hapijs/wreck/milestone/38) {#12.2.0}

- [#177](https://github.com/hapijs/wreck/pull/177) fix(json): allow numbers in mime fixes #176
- [#175](https://github.com/hapijs/wreck/pull/175) Include full response with the HTTP error
- [#173](https://github.com/hapijs/wreck/issues/173) Return full response with the Boom HTTP error
- [#170](https://github.com/hapijs/wreck/issues/170) 4XX is now an error

### [12.1.0](https://github.com/hapijs/wreck/milestone/37) {#12.1.0}

- [#174](https://github.com/hapijs/wreck/pull/174) Tidy code around default agents
- [#172](https://github.com/hapijs/wreck/pull/172) Update README.md
- [#169](https://github.com/hapijs/wreck/pull/169) Pass an Error object to Boom.create for #168
- [#156](https://github.com/hapijs/wreck/pull/156) Preserve `agents` across .defaults({...})

### [12.0.0](https://github.com/hapijs/wreck/milestone/36) <a class="release-notes-link" href="https://github.com/hapijs/wreck/issues/165" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#12.0.0}

- [#165](https://github.com/hapijs/wreck/issues/165) 12.0.0 Release Notes
- [#164](https://github.com/hapijs/wreck/pull/164) Fix boom response error handling
- [#163](https://github.com/hapijs/wreck/pull/163) Keep request on error status

## Version 11 {#v11}

### [11.0.0](https://github.com/hapijs/wreck/milestone/35) <a class="release-notes-link" href="https://github.com/hapijs/wreck/issues/162" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#11.0.0}

- [#162](https://github.com/hapijs/wreck/issues/162) 11.0.0 Release Notes
- [#161](https://github.com/hapijs/wreck/pull/161) Fix redirection method for 301, 302
- [#160](https://github.com/hapijs/wreck/pull/160) Update lab dep
- [#159](https://github.com/hapijs/wreck/pull/159) Add example https agent setting
- [#158](https://github.com/hapijs/wreck/pull/158) Wrap error response with Boom
- [#157](https://github.com/hapijs/wreck/pull/157) Change response event signature
- [#155](https://github.com/hapijs/wreck/pull/155) Update code dep
- [#154](https://github.com/hapijs/wreck/pull/154) Clarify state of response in shortcuts
- [#153](https://github.com/hapijs/wreck/issues/153) Question about responses as readable streams
- [#138](https://github.com/hapijs/wreck/issues/138) Redirect 302 changes method from POST to GET
- [#83](https://github.com/hapijs/wreck/issues/83) Change "response" Payload
- [#82](https://github.com/hapijs/wreck/issues/82) Option to convert 4xx and 5xx to errors
- [#66](https://github.com/hapijs/wreck/issues/66) Add certificate options for requests

## Version 10 {#v10}

### [10.0.0](https://github.com/hapijs/wreck/milestone/34) <a class="release-notes-link" href="https://github.com/hapijs/wreck/issues/150" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#10.0.0}

- [#150](https://github.com/hapijs/wreck/issues/150) 10.0.0 Release Notes
- [#149](https://github.com/hapijs/wreck/pull/149) Update boom and lab deps
- [#148](https://github.com/hapijs/wreck/pull/148) Refactor event propagation
- [#147](https://github.com/hapijs/wreck/pull/147) Fix tests to timeout quicker

## Version 9 {#v9}

### [9.0.0](https://github.com/hapijs/wreck/milestone/33) <a class="release-notes-link" href="https://github.com/hapijs/wreck/issues/144" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#9.0.0}

- [#144](https://github.com/hapijs/wreck/issues/144) 9.0.0 Release Notes
- [#143](https://github.com/hapijs/wreck/pull/143) Stringify payload objects
- [#142](https://github.com/hapijs/wreck/pull/142) Fix redirect with different host on default options
- [#131](https://github.com/hapijs/wreck/issues/131) Fail to redirect to different host
- [#113](https://github.com/hapijs/wreck/issues/113) Suggestion: Allow json objects as payload

## Version 8 {#v8}

### [8.0.1](https://github.com/hapijs/wreck/milestone/32) {#8.0.1}

- [#141](https://github.com/hapijs/wreck/issues/141) npmignore
- [#137](https://github.com/hapijs/wreck/pull/137) add node version badge

### [8.0.0](https://github.com/hapijs/wreck/milestone/31) <a class="release-notes-link" href="https://github.com/hapijs/wreck/issues/135" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#8.0.0}

- [#136](https://github.com/hapijs/wreck/pull/136) Upgrade to code v3
- [#135](https://github.com/hapijs/wreck/issues/135) 8.0.0 Release Notes
- [#134](https://github.com/hapijs/wreck/issues/134) Expose response headers on redirect
- [#133](https://github.com/hapijs/wreck/pull/133) Redirect 303 and expose headers
- [#132](https://github.com/hapijs/wreck/issues/132) Support 303 Redirection

## Version 7 {#v7}

### [7.2.1](https://github.com/hapijs/wreck/milestone/30) {#7.2.1}

- [#130](https://github.com/hapijs/wreck/pull/130) A missing callback on request still allows client requests to work
- [#129](https://github.com/hapijs/wreck/pull/129) Use node 6 on travis

### [7.2.0](https://github.com/hapijs/wreck/milestone/29) {#7.2.0}

- [#127](https://github.com/hapijs/wreck/pull/127) Add global request event
- [#126](https://github.com/hapijs/wreck/issues/126) Add `request` emit
- [#125](https://github.com/hapijs/wreck/pull/125) Use a global event emitter for wreck events

### [7.1.0](https://github.com/hapijs/wreck/milestone/28) {#7.1.0}

- [#123](https://github.com/hapijs/wreck/pull/123) Add support for Unix sockets

### [7.0.2](https://github.com/hapijs/wreck/milestone/27) {#7.0.2}

- [#121](https://github.com/hapijs/wreck/pull/121) Content-Length header check is now case insensitive
- [#120](https://github.com/hapijs/wreck/pull/120) lowercase the content-length header

### [7.0.1](https://github.com/hapijs/wreck/milestone/26) {#7.0.1}

- [#119](https://github.com/hapijs/wreck/pull/119) Update deps and fix tests
- [#118](https://github.com/hapijs/wreck/pull/118) Add tests for defaults
- [#117](https://github.com/hapijs/wreck/issues/117) Wreck#request's options are overridden by Defaults

### [7.0.0](https://github.com/hapijs/wreck/milestone/25) <span class="breaking-badge"></span> {#7.0.0}

- [#109](https://github.com/hapijs/wreck/issues/109) ES6 style and node v4

## Version 6 {#v6}

### [6.3.0](https://github.com/hapijs/wreck/milestone/24) {#6.3.0}

- [#108](https://github.com/hapijs/wreck/pull/108) Add a beforeRedirect callback option
- [#106](https://github.com/hapijs/wreck/pull/106) Fix code coverage
- [#105](https://github.com/hapijs/wreck/pull/105) Workaround node issue in test
- [#104](https://github.com/hapijs/wreck/issues/104) Fails on node v4

### [6.2.0](https://github.com/hapijs/wreck/milestone/23) {#6.2.0}

- [#102](https://github.com/hapijs/wreck/pull/102) add 'PATCH' convenience method.

### [6.1.0](https://github.com/hapijs/wreck/milestone/22) {#6.1.0}

- [#97](https://github.com/hapijs/wreck/pull/97) Add a redirected callback request option
- [#91](https://github.com/hapijs/wreck/issues/91) Can't read redirected URI

### [6.0.0](https://github.com/hapijs/wreck/milestone/21) <a class="release-notes-link" href="https://github.com/hapijs/wreck/issues/96" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#6.0.0}

- [#96](https://github.com/hapijs/wreck/issues/96) 6.0.0 Release notes
- [#95](https://github.com/hapijs/wreck/pull/95) Payload returns as a buffer. Fixes Issue #75
- [#75](https://github.com/hapijs/wreck/issues/75) Read automatically converts payload from Buffer to UTF-8 String

## Version 5 {#v5}

### [5.6.1](https://github.com/hapijs/wreck/milestone/20) {#5.6.1}

- [#94](https://github.com/hapijs/wreck/pull/94) Skip res.destroy() when not present. Closes #71
- [#93](https://github.com/hapijs/wreck/pull/93) Fix missing options when redirecting
- [#71](https://github.com/hapijs/wreck/issues/71) Attempt to call `destroy()` on `Gunzip` object

### [5.6.0](https://github.com/hapijs/wreck/milestone/19) {#5.6.0}

- [#92](https://github.com/hapijs/wreck/pull/92) More robust baseUrl and uri merging
- [#89](https://github.com/hapijs/wreck/pull/89) support for detecting/parsing +json suffix types i.e. application/*+json
- [#88](https://github.com/hapijs/wreck/pull/88) Maintenance
- [#87](https://github.com/hapijs/wreck/pull/87) Update license attribute
- [#86](https://github.com/hapijs/wreck/pull/86) Add support for the `baseUrl` option
- [#85](https://github.com/hapijs/wreck/pull/85) add support for defaults

### [5.5.0](https://github.com/hapijs/wreck/milestone/17) {#5.5.0}

- [#81](https://github.com/hapijs/wreck/pull/81) Added uri to event payloads.

### [5.4.0](https://github.com/hapijs/wreck/milestone/16) {#5.4.0}

- [#79](https://github.com/hapijs/wreck/pull/79) Add start time to response event
- [#78](https://github.com/hapijs/wreck/issues/78) Add start time to response event

### [5.3.0](https://github.com/hapijs/wreck/milestone/15) {#5.3.0}

- [#77](https://github.com/hapijs/wreck/pull/77) Add event for response and logging
- [#76](https://github.com/hapijs/wreck/pull/76) Adding log support
- [#74](https://github.com/hapijs/wreck/pull/74) implement debugging to file and console. Fixes #72
- [#73](https://github.com/hapijs/wreck/pull/73) Fix issues with node 0.12
- [#72](https://github.com/hapijs/wreck/issues/72) Add logging to req/res details for debug mode

### [5.2.0](https://github.com/hapijs/wreck/milestone/14) {#5.2.0}

- [#70](https://github.com/hapijs/wreck/pull/70) Added 'smart' and 'force' modes to json option.

### [5.1.0](https://github.com/hapijs/wreck/milestone/13) {#5.1.0}

- [#69](https://github.com/hapijs/wreck/pull/69) Dont try to parse JSON if the statusCode is 204 (No Content)
- [#56](https://github.com/hapijs/wreck/issues/56) Add secureProtocol for setting SSL method version
- [#55](https://github.com/hapijs/wreck/pull/55) Added ability to set secureProtocol to a value.

### [5.0.1](https://github.com/hapijs/wreck/milestone/12) {#5.0.1}

- [#52](https://github.com/hapijs/wreck/pull/52) Fixing leak in options.agent
- [#51](https://github.com/hapijs/wreck/issues/51) Shouldn't assign agent back to options.agent, it can leak

### [5.0.0](https://github.com/hapijs/wreck/milestone/11) <a class="release-notes-link" href="https://github.com/hapijs/wreck/issues/50" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#5.0.0}

- [#50](https://github.com/hapijs/wreck/issues/50) 5.0.0 Release Notes
- [#49](https://github.com/hapijs/wreck/pull/49) Requests can be aborted
- [#47](https://github.com/hapijs/wreck/pull/47) rejectUnauthorized works in node 0.10
- [#46](https://github.com/hapijs/wreck/issues/46) rejectUnauthorized isn't honored on node 0.10
- [#40](https://github.com/hapijs/wreck/issues/40) Allow requests to be aborted

## Version 4 {#v4}

### [4.0.0](https://github.com/hapijs/wreck/milestone/10) <a class="release-notes-link" href="https://github.com/hapijs/wreck/issues/45" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#4.0.0}

- [#45](https://github.com/hapijs/wreck/issues/45) 4.0.0 Release Notes
- [#44](https://github.com/hapijs/wreck/pull/44) Support disabling agent pooling
- [#43](https://github.com/hapijs/wreck/issues/43) Support agent = false for disabled pooling
- [#42](https://github.com/hapijs/wreck/pull/42) Override default maxSockets to Infinity
- [#41](https://github.com/hapijs/wreck/issues/41) Default maxSockets to Infinity
- [#39](https://github.com/hapijs/wreck/pull/39) Now working on v3.0.2

## Version 3 {#v3}

### [3.0.0](https://github.com/hapijs/wreck/milestone/9) <span class="breaking-badge"></span> {#3.0.0}

- [#37](https://github.com/hapijs/wreck/pull/37) Adding shortcut wrapper for helping with optimization
- [#33](https://github.com/hapijs/wreck/pull/33) Read now requires 3 arguments
- [#32](https://github.com/hapijs/wreck/issues/32) Refactor `internals.shortcut` to have a fixed signature.
- [#31](https://github.com/hapijs/wreck/issues/31) Refactor `read` API to have a fixed signature.
- [#30](https://github.com/hapijs/wreck/pull/30) Clarify optional options argument.
- [#28](https://github.com/hapijs/wreck/issues/28) Nipple.request `options` are only optional if callback is omitted as well.

## Version 2 {#v2}

### [2.5.5](https://github.com/hapijs/wreck/milestone/8) {#2.5.5}

- [#27](https://github.com/hapijs/wreck/pull/27) Correct copypasta errors in convenience method docs.
- [#26](https://github.com/hapijs/wreck/pull/26) Document API, parameters, and helper methods.
- [#25](https://github.com/hapijs/wreck/pull/25) Update to use lab v4
- [#24](https://github.com/hapijs/wreck/pull/24) Breaking out code into separate modules

### [2.5.4](https://github.com/hapijs/wreck/milestone/7) {#2.5.4}

- [#23](https://github.com/hapijs/wreck/pull/23) allow for unicode characters in string payloads, closes #20
- [#20](https://github.com/hapijs/wreck/issues/20) Usage of post

### [2.5.3](https://github.com/hapijs/wreck/milestone/6) {#2.5.3}

- [#18](https://github.com/hapijs/wreck/issues/18) Set content-length on string or buffer payload

### [2.5.2](https://github.com/hapijs/wreck/milestone/5) {#2.5.2}

- [#13](https://github.com/hapijs/wreck/pull/13) respect size in _read for toReadableStream

### [2.5.1](https://github.com/hapijs/wreck/milestone/4) {#2.5.1}

- [#16](https://github.com/hapijs/wreck/pull/16) Prevent starvation due to timeout requests

### [2.5.0](https://github.com/hapijs/wreck/milestone/3) {#2.5.0}

- [#11](https://github.com/hapijs/wreck/pull/11) Hoek version bump to 2.x.x
- [#10](https://github.com/hapijs/wreck/pull/10) match() -&gt; test()
- [#9](https://github.com/hapijs/wreck/pull/9) coverage to 100% with Lab v3.0
- [#8](https://github.com/hapijs/wreck/issues/8) get code coverage to 100% under Lab v3.0
- [#7](https://github.com/hapijs/wreck/pull/7) Fixed Shortcut test grouping

### [2.4.0](https://github.com/hapijs/wreck/milestone/2) {#2.4.0}

- [#6](https://github.com/hapijs/wreck/pull/6) Added support for automatic JSON response parsing.

### [2.3.0](https://github.com/hapijs/wreck/milestone/1) {#2.3.0}

- [#5](https://github.com/hapijs/wreck/issues/5) Bring coverage back to 100% after lab fix
- [#4](https://github.com/hapijs/wreck/pull/4) maxSockets Support
