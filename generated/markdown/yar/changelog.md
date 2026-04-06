## Version 11 {#v11}

### [11.0.3](https://github.com/hapijs/yar/milestone/25) {#11.0.3}

- [#169](https://github.com/hapijs/yar/pull/169) feat: 🎸 improve yar values and flash typings

### [11.0.2](https://github.com/hapijs/yar/milestone/24) {#11.0.2}

- [#168](https://github.com/hapijs/yar/pull/168) feat: 🎸 add types from DT

### [11.0.1](https://github.com/hapijs/yar/milestone/23) {#11.0.1}

- [#164](https://github.com/hapijs/yar/pull/164) chore: bump hoek

### [11.0.0](https://github.com/hapijs/yar/milestone/22) <span class="breaking-badge"></span> {#11.0.0}

- [#162](https://github.com/hapijs/yar/pull/162) Support hapi v21, drop hapi v19, test ESM support
- [#161](https://github.com/hapijs/yar/pull/161) Update deps, use null operator
- [#159](https://github.com/hapijs/yar/issues/159) Drop support for node v12
- [#157](https://github.com/hapijs/yar/pull/157) Use crypto.randomUUID as default session id
- [#156](https://github.com/hapijs/yar/issues/156) Use built-in crypto.randomUUID

## Version 10 {#v10}

### [10.1.1](https://github.com/hapijs/yar/milestone/20) {#10.1.1}

- [#148](https://github.com/hapijs/yar/pull/148) update to hapi v20
- [#147](https://github.com/hapijs/yar/pull/147) migrate to new travis format
- [#146](https://github.com/hapijs/yar/pull/146) upgrade lab and uuid dep
- [#145](https://github.com/hapijs/yar/pull/145) Update API.md

### [10.1.0](https://github.com/hapijs/yar/milestone/19) {#10.1.0}

- [#144](https://github.com/hapijs/yar/issues/144) Assign data in onPreResponse lifecycle extension with takeover

### [10.0.0](https://github.com/hapijs/yar/milestone/18) <span class="breaking-badge"></span> {#10.0.0}

- [#141](https://github.com/hapijs/yar/issues/141) Change plugin name to @hapi/yar
- [#140](https://github.com/hapijs/yar/issues/140) Require hapi 19
- [#139](https://github.com/hapijs/yar/issues/139) Only node 12

## Version 9 {#v9}

### [9.2.1](https://github.com/hapijs/yar/milestone/17) {#9.2.1}

- [#134](https://github.com/hapijs/yar/issues/134) Update dep

### [9.2.0](https://github.com/hapijs/yar/milestone/16) {#9.2.0}

- [#131](https://github.com/hapijs/yar/issues/131) Change module namespace

### [9.1.0](https://github.com/hapijs/yar/milestone/15) {#9.1.0}

- [#127](https://github.com/hapijs/yar/pull/127) chore: update dependencies
- [#126](https://github.com/hapijs/yar/pull/126) Add possibility to revoke specific session on the server side
- [#125](https://github.com/hapijs/yar/issues/125) Minor: Deprecated use of uuid
- [#123](https://github.com/hapijs/yar/issues/123) Delete a specific user's session

### [9.0.2](https://github.com/hapijs/yar/milestone/14) {#9.0.2}

- [#124](https://github.com/hapijs/yar/issues/124) Yar doesn't handle the session cookie multiple times correctly.
- [#122](https://github.com/hapijs/yar/pull/122) Do not cast all falsy values to null
- [#121](https://github.com/hapijs/yar/issues/121) Falsy values are converted to null

## Version 8 {#v8}

### [8.1.2](https://github.com/hapijs/yar/milestone/13) {#8.1.2}

- [#110](https://github.com/hapijs/yar/pull/110) Fix `main` in package.json

## Version 6 {#v6}

### [6.1.0](https://github.com/hapijs/yar/milestone/12) {#6.1.0}

- [#90](https://github.com/hapijs/yar/pull/90) add a route level config option to skip yar processing

### [6.0.0](https://github.com/hapijs/yar/milestone/11) <span class="breaking-badge"></span> {#6.0.0}

- [#89](https://github.com/hapijs/yar/pull/89) update yar to use request.yar instead of request.session
- [#88](https://github.com/hapijs/yar/issues/88) Decorate request with session key

## Version 4 {#v4}

### [4.3.0](https://github.com/hapijs/yar/milestone/10) {#4.3.0}

- [#83](https://github.com/hapijs/yar/pull/83) Option to skip exception on cache error

### [4.2.0](https://github.com/hapijs/yar/milestone/9) {#4.2.0}

- [#75](https://github.com/hapijs/yar/pull/75) Allow specification of whether to store blank sessions

### [4.0.0](https://github.com/hapijs/yar/milestone/8) <span class="breaking-badge"></span> {#4.0.0}

- [#80](https://github.com/hapijs/yar/pull/80) ignore invalid cookies so we don't get 400 errors on servers, which i…
- [#65](https://github.com/hapijs/yar/issues/65) "Invalid cookie value" after password change, but OK after refresh!

## Version 3 {#v3}

### [3.0.4](https://github.com/hapijs/yar/milestone/6) {#3.0.4}

- [#79](https://github.com/hapijs/yar/issues/79) Tests are failing

### [3.0.2](https://github.com/hapijs/yar/milestone/5) {#3.0.2}

### [3.0.0](https://github.com/hapijs/yar/milestone/4) <span class="breaking-badge"></span> {#3.0.0}

- [#61](https://github.com/hapijs/yar/issues/61) Can't install yar from npm
- [#57](https://github.com/hapijs/yar/pull/57) hapi 8.0. Closes #56
- [#56](https://github.com/hapijs/yar/issues/56) hapi 8.0 API

## Version 2 {#v2}

### [2.4.0](https://github.com/hapijs/yar/milestone/3) {#2.4.0}

- [#52](https://github.com/hapijs/yar/pull/52) properly drop session during session.reset
- [#46](https://github.com/hapijs/yar/pull/46) Hapi6
- [#45](https://github.com/hapijs/yar/pull/45) Update examples, examples/package.json to use Hapi 6.x
- [#44](https://github.com/hapijs/yar/pull/44) Updated readme to match hapi 6.x API
- [#43](https://github.com/hapijs/yar/pull/43) Update tests / package.json to use Hapi 6.x
- [#41](https://github.com/hapijs/yar/issues/41) errorhandling after cookie password changes

### [2.1.0](https://github.com/hapijs/yar/milestone/2) {#2.1.0}

- [#32](https://github.com/hapijs/yar/pull/32) Upgrade to Hapi 4.x

### [2.0.0](https://github.com/hapijs/yar/milestone/1) <span class="breaking-badge"></span> {#2.0.0}

- [#29](https://github.com/hapijs/yar/issues/29) Replace ttl and store with cache options
- [#28](https://github.com/hapijs/yar/pull/28) Update to hapi 3.x
