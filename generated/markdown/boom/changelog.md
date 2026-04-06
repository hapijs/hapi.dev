## Version 10 {#v10}

### [10.0.1](https://github.com/hapijs/boom/milestone/69) {#10.0.1}

- [#299](https://github.com/hapijs/boom/pull/299) chore: bump hoek and lab
- [#297](https://github.com/hapijs/boom/pull/297) Document 1st arg can be an Error

### [10.0.0](https://github.com/hapijs/boom/milestone/68) <span class="breaking-badge"></span> {#10.0.0}

- [#295](https://github.com/hapijs/boom/pull/295) Support node v18, drop node v12

## Version 9 {#v9}

### [9.1.4](https://github.com/hapijs/boom/milestone/66) {#9.1.4}

- [#289](https://github.com/hapijs/boom/pull/289) fix: make reformat configurable in initialize

### [9.1.3](https://github.com/hapijs/boom/milestone/64) {#9.1.3}

- [#286](https://github.com/hapijs/boom/pull/286) Don't mess with instanceof checks called on subclasses
- [#285](https://github.com/hapijs/boom/issues/285) Extending Boom and unexpected instanceof behavior

### [9.1.2](https://github.com/hapijs/boom/milestone/63) {#9.1.2}

- [#281](https://github.com/hapijs/boom/pull/281) Add proper index type to headers property

### [9.1.1](https://github.com/hapijs/boom/milestone/62) {#9.1.1}

- [#279](https://github.com/hapijs/boom/pull/279) TypeScript: Allow custom properties on output.payload
- [#278](https://github.com/hapijs/boom/pull/278) Clean up d.ts comments
- [#277](https://github.com/hapijs/boom/issues/277) output.payload.attributes is not exposed in the .d.ts file
- [#275](https://github.com/hapijs/boom/pull/275) Make isBoom type definition laxer
- [#273](https://github.com/hapijs/boom/pull/273) upgrade lab to v24 and devDependency of typescript

### [9.1.0](https://github.com/hapijs/boom/milestone/61) {#9.1.0}

- [#266](https://github.com/hapijs/boom/pull/266) Add optional statusCode parameter to Boom.isBoom
- [#265](https://github.com/hapijs/boom/issues/265) Optional second param for Boom.isBoom() to verify status code

### [9.0.0](https://github.com/hapijs/boom/milestone/60) <span class="breaking-badge"></span> {#9.0.0}

- [#262](https://github.com/hapijs/boom/issues/262) Support only node 12
- [#261](https://github.com/hapijs/boom/pull/261) Add HTTP code 425 Too Early
- [#260](https://github.com/hapijs/boom/issues/260) boom.unathorized adds extra space to string value scheme in WWW-Authenticate header

## Version 8 {#v8}

### [8.0.1](https://github.com/hapijs/boom/milestone/58) <span class="breaking-badge"></span> {#8.0.1}

- [#253](https://github.com/hapijs/boom/issues/253) change new Boom() to new Boom.Boom()
- [#252](https://github.com/hapijs/boom/issues/252) Drop support for node 8
- [#251](https://github.com/hapijs/boom/issues/251) Add types
- [#246](https://github.com/hapijs/boom/issues/246) boom doesn't consider message not set directly on error object when deciding whether it is a compatible error

## Version 7 {#v7}

### [7.4.12](https://github.com/hapijs/boom/milestone/65) {#7.4.12}

- [#282](https://github.com/hapijs/boom/issues/282) Latest v7-commercial release (v7.4.11) is broken

### [7.4.11](https://github.com/hapijs/boom/milestone/56) {#7.4.11}

- [#248](https://github.com/hapijs/boom/issues/248) Error TS2709: Cannot use namespace 'Boom' as a type.

### [7.4.10](https://github.com/hapijs/boom/milestone/55) {#7.4.10}

- [#245](https://github.com/hapijs/boom/pull/245) Fix default export. Fixes #244.
- [#244](https://github.com/hapijs/boom/issues/244) Typescript - can't extend Boom

### [7.4.9](https://github.com/hapijs/boom/milestone/54) {#7.4.9}

- [#243](https://github.com/hapijs/boom/issues/243) Improve types

### [7.4.8](https://github.com/hapijs/boom/milestone/53) {#7.4.8}

- [#242](https://github.com/hapijs/boom/issues/242) Typescript definitions missing internal()
- [#241](https://github.com/hapijs/boom/pull/241) Ts fix
- [#240](https://github.com/hapijs/boom/pull/240) Fix types: Update static isBoom to be a type guard.

### [7.4.7](https://github.com/hapijs/boom/milestone/52) {#7.4.7}

- [#239](https://github.com/hapijs/boom/issues/239) Missing error properties

### [7.4.6](https://github.com/hapijs/boom/milestone/51) {#7.4.6}

- [#238](https://github.com/hapijs/boom/pull/238) Fix types: serviceUnavailable -&gt; serverUnavailable.
- [#237](https://github.com/hapijs/boom/issues/237) Types have typo: serverUnavailable -&gt; serviceUnavailable

### [7.4.5](https://github.com/hapijs/boom/milestone/50) <span class="breaking-badge"></span> {#7.4.5}

- [#216](https://github.com/hapijs/boom/issues/216) Handle case of message property with getter-only
- [#215](https://github.com/hapijs/boom/issues/215) `typeof` and `reformat` should not be enumerable

### [7.4.4](https://github.com/hapijs/boom/milestone/49) {#7.4.4}

- [#233](https://github.com/hapijs/boom/pull/233) Added TS declarations

### [7.4.3](https://github.com/hapijs/boom/milestone/48) {#7.4.3}

- [#229](https://github.com/hapijs/boom/issues/229) Update deps

### [7.4.2](https://github.com/hapijs/boom/milestone/47) {#7.4.2}

- [#221](https://github.com/hapijs/boom/issues/221) Update deps

### [7.4.1](https://github.com/hapijs/boom/milestone/46) {#7.4.1}

- [#220](https://github.com/hapijs/boom/issues/220) Fix dependency

### [7.4.0](https://github.com/hapijs/boom/milestone/42) {#7.4.0}

- [#219](https://github.com/hapijs/boom/issues/219) Change module namespace

### [7.3.0](https://github.com/hapijs/boom/milestone/41) {#7.3.0}

- [#211](https://github.com/hapijs/boom/pull/211) add debug mode to reformat()

### [7.2.2](https://github.com/hapijs/boom/milestone/40) {#7.2.2}

- [#208](https://github.com/hapijs/boom/issues/208) Remove engines

### [7.2.1](https://github.com/hapijs/boom/milestone/39) {#7.2.1}

- [#206](https://github.com/hapijs/boom/issues/206) Update hoek v6

### [7.2.0](https://github.com/hapijs/boom/milestone/38) {#7.2.0}

- [#188](https://github.com/hapijs/boom/pull/188) 424 Failed dependency implementation

### [7.1.1](https://github.com/hapijs/boom/milestone/37) <span class="breaking-badge"></span> {#7.1.1}

- [#173](https://github.com/hapijs/boom/issues/173) Support instanceof

### [7.1.0](https://github.com/hapijs/boom/milestone/36) {#7.1.0}

- [#172](https://github.com/hapijs/boom/issues/172) Add decorate option

### [7.0.0](https://github.com/hapijs/boom/milestone/35) <span class="breaking-badge"></span> {#7.0.0}

- [#171](https://github.com/hapijs/boom/issues/171) Remove wrap() and create()

## Version 6 {#v6}

### [6.0.0](https://github.com/hapijs/boom/milestone/34) <span class="breaking-badge"></span> {#6.0.0}

- [#165](https://github.com/hapijs/boom/issues/165) Node v8

## Version 5 {#v5}

### [5.3.1](https://github.com/hapijs/boom/milestone/44) {#5.3.1}

- [#218](https://github.com/hapijs/boom/issues/218) Load the commercial version of hoek

### [5.3.0](https://github.com/hapijs/boom/milestone/43) {#5.3.0}

- [#217](https://github.com/hapijs/boom/issues/217) Commercial version of v5 branch

### [5.2.0](https://github.com/hapijs/boom/milestone/33) {#5.2.0}

- [#160](https://github.com/hapijs/boom/issues/160) Allow decorating a boom error

### [5.1.0](https://github.com/hapijs/boom/milestone/32) {#5.1.0}

- [#157](https://github.com/hapijs/boom/issues/157) Hide message on 500 when error is provided as data
- [#156](https://github.com/hapijs/boom/pull/156) Added typeOf functionality

### [5.0.0](https://github.com/hapijs/boom/milestone/31) <span class="breaking-badge"></span> {#5.0.0}

- [#154](https://github.com/hapijs/boom/issues/154) Boom.wrap with a provided message doesn't format the payload
- [#152](https://github.com/hapijs/boom/issues/152) Boom.badGateway( string, Boom.anything() )

## Version 4 {#v4}

### [4.3.1](https://github.com/hapijs/boom/milestone/30) {#4.3.1}

- [#149](https://github.com/hapijs/boom/pull/149) fix #148 when Boom supplied to wrapper
- [#148](https://github.com/hapijs/boom/issues/148) Remove line from wrap function

### [4.3.0](https://github.com/hapijs/boom/milestone/29) {#4.3.0}

- [#147](https://github.com/hapijs/boom/pull/147) Unauthorized extension for #146
- [#146](https://github.com/hapijs/boom/issues/146) Unauthorized
- [#142](https://github.com/hapijs/boom/issues/142) Boom.wrap never sends custom message to client
- [#139](https://github.com/hapijs/boom/pull/139) Adds support for `Boom.someMethod(err)`, closes #138
- [#138](https://github.com/hapijs/boom/issues/138) Preservation of `err.name` via `Boom.create` or `Boom[someMethod]`
- [#78](https://github.com/hapijs/boom/pull/78) Add Boom.teapot() method with documentation and tests

### [4.2.0](https://github.com/hapijs/boom/milestone/28) {#4.2.0}

- [#133](https://github.com/hapijs/boom/pull/133) Add 'allow' parameter to methodNotAllowed for setting 'Allow' header
- [#132](https://github.com/hapijs/boom/issues/132) 405 Method Not Allowed should provide an argument for specifying "Allow" header

### [4.1.0](https://github.com/hapijs/boom/milestone/27) {#4.1.0}

- [#130](https://github.com/hapijs/boom/pull/130) Add 402 payment required
- [#129](https://github.com/hapijs/boom/pull/129) Add Boom.internal() to API docs fixes #127

### [4.0.0](https://github.com/hapijs/boom/milestone/26) <span class="breaking-badge"></span> {#4.0.0}

- [#125](https://github.com/hapijs/boom/pull/125) Remove deprecated serverTimeout
- [#118](https://github.com/hapijs/boom/issues/118) Remove serverTimeout()

## Version 3 {#v3}

### [3.2.2](https://github.com/hapijs/boom/milestone/25) {#3.2.2}

- [#121](https://github.com/hapijs/boom/pull/121) Added .npmignore file.
- [#119](https://github.com/hapijs/boom/pull/119) Rename serverTimeout to serverUnavailable
- [#117](https://github.com/hapijs/boom/issues/117) serverTimeout() should be aliased to serverUnavailable()
- [#108](https://github.com/hapijs/boom/pull/108) Create .npmignore

### [3.2.1](https://github.com/hapijs/boom/milestone/24) {#3.2.1}

- [#113](https://github.com/hapijs/boom/pull/113) Updated to code 3.

### [3.2.0](https://github.com/hapijs/boom/milestone/23) {#3.2.0}

- [#112](https://github.com/hapijs/boom/pull/112) Added HTTP code 423 Locked
- [#111](https://github.com/hapijs/boom/issues/111) HTTP Error 423 (Locked)

### [3.1.3](https://github.com/hapijs/boom/milestone/22) {#3.1.3}

- [#110](https://github.com/hapijs/boom/pull/110) Added node 6.

### [3.1.2](https://github.com/hapijs/boom/milestone/21) {#3.1.2}

- [#97](https://github.com/hapijs/boom/pull/97) Use quotes instead of backticks

### [3.1.1](https://github.com/hapijs/boom/milestone/20) {#3.1.1}

- [#95](https://github.com/hapijs/boom/pull/95) Changed prototype logic.

### [3.1.0](https://github.com/hapijs/boom/milestone/19) {#3.1.0}

- [#94](https://github.com/hapijs/boom/pull/94) Cleanup for 254593fd1d09e79049692675a4f9b7b5108b36d8
- [#93](https://github.com/hapijs/boom/issues/93) Document Illegal
- [#92](https://github.com/hapijs/boom/issues/92) Status Code Hash
- [#91](https://github.com/hapijs/boom/pull/91) Add new 451 Unavailable For Legal Reasons

### [3.0.0](https://github.com/hapijs/boom/milestone/18) <span class="breaking-badge"></span> {#3.0.0}

- [#83](https://github.com/hapijs/boom/pull/83) es6 style. Closes #77
- [#77](https://github.com/hapijs/boom/issues/77) Node 4 Updates

## Version 2 {#v2}

### [2.10.1](https://github.com/hapijs/boom/milestone/17) {#2.10.1}

- [#81](https://github.com/hapijs/boom/pull/81) Upgrade to lab 7.x.x
- [#80](https://github.com/hapijs/boom/pull/80) Fix ctor passing in serverError helper
- [#79](https://github.com/hapijs/boom/issues/79) Stack trace filtering not working for serverError constructors

### [2.10.0](https://github.com/hapijs/boom/milestone/16) {#2.10.0}

- [#75](https://github.com/hapijs/boom/pull/75) Support Precondition Required
- [#74](https://github.com/hapijs/boom/issues/74) Precondition required is not supported

### [2.9.0](https://github.com/hapijs/boom/milestone/15) {#2.9.0}

- [#68](https://github.com/hapijs/boom/pull/68) Call captureStackTrace to filter boom from traces
- [#67](https://github.com/hapijs/boom/issues/67) Use captureStackTrace to remove boom artifacts from stack traces

### [2.8.0](https://github.com/hapijs/boom/milestone/14) {#2.8.0}

- [#63](https://github.com/hapijs/boom/pull/63) Unauthorized
- [#62](https://github.com/hapijs/boom/issues/62) Expose unauthorized attributes in payload
- [#60](https://github.com/hapijs/boom/issues/60) Style Cleanup

### [2.7.2](https://github.com/hapijs/boom/milestone/13) {#2.7.2}

- [#59](https://github.com/hapijs/boom/pull/59) Update license attribute

### [2.7.1](https://github.com/hapijs/boom/milestone/12) {#2.7.1}

- [#52](https://github.com/hapijs/boom/pull/52) Coerse statusCode to an Integer
- [#51](https://github.com/hapijs/boom/issues/51) Make sure Boom initialize method auto cast string statusCode to Integer if possible

### [2.7.0](https://github.com/hapijs/boom/milestone/11) {#2.7.0}

- [#45](https://github.com/hapijs/boom/pull/45) Added isServer
- [#41](https://github.com/hapijs/boom/issues/41) Easy way to determine if the client or server is at fault

### [2.6.1](https://github.com/hapijs/boom/milestone/10) {#2.6.1}

- [#40](https://github.com/hapijs/boom/issues/40) Lab 5.0, code 1.0

### [2.6.0](https://github.com/hapijs/boom/milestone/9) {#2.6.0}

- [#33](https://github.com/hapijs/boom/pull/33) Added status code 429 Too Many Requests.

### [2.5.1](https://github.com/hapijs/boom/milestone/8) {#2.5.1}

- [#27](https://github.com/hapijs/boom/pull/27) Update to lab 4.x.x. Bumped version.

### [2.5.0](https://github.com/hapijs/boom/milestone/7) {#2.5.0}

- [#26](https://github.com/hapijs/boom/issues/26) Rename spumko to hapijs
- [#25](https://github.com/hapijs/boom/pull/25) Add a 422 badData method

### [2.4.2](https://github.com/hapijs/boom/milestone/5) {#2.4.2}

- [#23](https://github.com/hapijs/boom/issues/23) Default message to http status

### [2.4.1](https://github.com/hapijs/boom/milestone/6) {#2.4.1}

- [#22](https://github.com/hapijs/boom/issues/22) Upgrade dependencies

### [2.4.0](https://github.com/hapijs/boom/milestone/4) {#2.4.0}

- [#21](https://github.com/hapijs/boom/issues/21) Allow every helper to set data property

### [2.3.0](https://github.com/hapijs/boom/milestone/2) {#2.3.0}

- [#20](https://github.com/hapijs/boom/issues/20) Internal errors (500) should never expose err.message

### [2.2.2](https://github.com/hapijs/boom/milestone/3) {#2.2.2}

- [#19](https://github.com/hapijs/boom/issues/19) Bring coverage back to 100% after lab fix

### [2.2.1](https://github.com/hapijs/boom/milestone/1) {#2.2.1}

- [#17](https://github.com/hapijs/boom/pull/17) Don't override data if user error already have a data attribute
