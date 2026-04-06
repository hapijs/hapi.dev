## Version 12 {#v12}

### [12.0.1](https://github.com/hapijs/cookie/milestone/37) {#12.0.1}

- [#248](https://github.com/hapijs/cookie/pull/248) chore: bump hoek

### [12.0.0](https://github.com/hapijs/cookie/milestone/36) <span class="breaking-badge"></span> {#12.0.0}

- [#246](https://github.com/hapijs/cookie/pull/246) Support for hapi v21, node v18, ESM tests
- [#244](https://github.com/hapijs/cookie/pull/244) Drop support for node v12 and hapi v18
- [#236](https://github.com/hapijs/cookie/pull/236) Rename plugin options to be consistent across the hapi ecosystem
- [#235](https://github.com/hapijs/cookie/pull/235) Remove old repository name

## Version 11 {#v11}

### [11.0.2](https://github.com/hapijs/cookie/milestone/34) {#11.0.2}

- [#232](https://github.com/hapijs/cookie/pull/232) update to hapi v20
- [#231](https://github.com/hapijs/cookie/pull/231) migrate to new travis format
- [#229](https://github.com/hapijs/cookie/pull/229) change joi to validate and update lab

### [11.0.1](https://github.com/hapijs/cookie/milestone/33) {#11.0.1}

- [#228](https://github.com/hapijs/cookie/issues/228) Non system error in validateFunc will be swallowed

### [11.0.0](https://github.com/hapijs/cookie/milestone/32) <span class="breaking-badge"></span> {#11.0.0}

- [#227](https://github.com/hapijs/cookie/issues/227) Only node 12

## Version 10 {#v10}

### [10.1.2](https://github.com/hapijs/cookie/milestone/31) {#10.1.2}

- [#222](https://github.com/hapijs/cookie/issues/222) Update joi

### [10.1.1](https://github.com/hapijs/cookie/milestone/30) {#10.1.1}

- [#221](https://github.com/hapijs/cookie/issues/221) Update deps

### [10.1.0](https://github.com/hapijs/cookie/milestone/29) {#10.1.0}

- [#213](https://github.com/hapijs/cookie/issues/213) Change module namespace

### [10.0.0](https://github.com/hapijs/cookie/milestone/28) <a class="release-notes-link" href="https://github.com/hapijs/cookie/issues/209" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#10.0.0}

- [#210](https://github.com/hapijs/cookie/issues/210) Move all cookie settings to `cookie`
- [#209](https://github.com/hapijs/cookie/issues/209) 10.0.0 Release notes
- [#208](https://github.com/hapijs/cookie/issues/208) Remove ignoreIfDecorated
- [#207](https://github.com/hapijs/cookie/issues/207) No override of default cookie settings
- [#205](https://github.com/hapijs/cookie/pull/205) Upgrade to hapi 18
- [#204](https://github.com/hapijs/cookie/issues/204) Update for hapi 18
- [#193](https://github.com/hapijs/cookie/issues/193) Support password rotation

## Version 9 {#v9}

### [9.1.0](https://github.com/hapijs/cookie/milestone/27) {#9.1.0}

- [#196](https://github.com/hapijs/cookie/pull/196) referenced the raw request when setting next

### [9.0.0](https://github.com/hapijs/cookie/milestone/24) <span class="breaking-badge"></span> {#9.0.0}

- [#186](https://github.com/hapijs/cookie/pull/186) Respect auth mode for redirects

## Version 8 {#v8}

### [8.1.0](https://github.com/hapijs/cookie/milestone/23) {#8.1.0}

- [#176](https://github.com/hapijs/cookie/pull/176) Use options key for route configuration
- [#164](https://github.com/hapijs/cookie/pull/164) Issue 163

### [8.0.1](https://github.com/hapijs/cookie/milestone/25) {#8.0.1}

- [#183](https://github.com/hapijs/cookie/pull/183) Fix redirectTo function w/ blank to behave like blank redirectTo (fix)
- [#170](https://github.com/hapijs/cookie/pull/170) Drop session from cache in examples

### [8.0.0](https://github.com/hapijs/cookie/milestone/22) <span class="breaking-badge"></span> {#8.0.0}

- [#179](https://github.com/hapijs/cookie/issues/179) Update lead maintainer
- [#174](https://github.com/hapijs/cookie/pull/174) Upgraded module to hapi v17

## Version 7 {#v7}

### [7.1.0](https://github.com/hapijs/cookie/milestone/26) {#7.1.0}

- [#151](https://github.com/hapijs/cookie/pull/151) referenced the raw request when setting next

### [7.0.0](https://github.com/hapijs/cookie/milestone/21) {#7.0.0}

- [#152](https://github.com/hapijs/cookie/pull/152) Do not redecorate the request object if already decorated
- [#148](https://github.com/hapijs/cookie/pull/148) Allow redirectTo to be a function
- [#142](https://github.com/hapijs/cookie/pull/142) Add isSameSite to schema
- [#138](https://github.com/hapijs/cookie/pull/138) Options aren't required
- [#134](https://github.com/hapijs/cookie/pull/134) add note to readme about the 'ttl' option
- [#130](https://github.com/hapijs/cookie/pull/130) Test on node v6, update dependencies
- [#127](https://github.com/hapijs/cookie/pull/127) fix typo in readme
- [#124](https://github.com/hapijs/cookie/pull/124) Allow null to be passed for the ttl
- [#115](https://github.com/hapijs/cookie/pull/115) update readme with information/warning about cookie length

## Version 6 {#v6}

### [6.1.1](https://github.com/hapijs/cookie/milestone/20) {#6.1.1}

- [#118](https://github.com/hapijs/cookie/pull/118) decorator fix

### [6.1.0](https://github.com/hapijs/cookie/milestone/19) {#6.1.0}

- [#114](https://github.com/hapijs/cookie/pull/114) support many strategies

### [6.0.0](https://github.com/hapijs/cookie/milestone/18) {#6.0.0}

- [#107](https://github.com/hapijs/cookie/pull/107) Use server.decorate

## Version 5 {#v5}

### [5.0](https://github.com/hapijs/cookie/milestone/17) <span class="breaking-badge"></span> {#5.0}

- [#103](https://github.com/hapijs/cookie/pull/103) move away from request.auth.session
- [#101](https://github.com/hapijs/cookie/issues/101) Switch to use a request decoration instead of request.auth.session

## Version 4 {#v4}

### [4.0.0](https://github.com/hapijs/cookie/milestone/16) <span class="breaking-badge"></span> {#4.0.0}

- [#102](https://github.com/hapijs/cookie/pull/102) node 4 update
- [#93](https://github.com/hapijs/cookie/issues/93) Node &gt;= 4 / es6 updates

## Version 3 {#v3}

### [3.1.0](https://github.com/hapijs/cookie/milestone/15) {#3.1.0}

- [#83](https://github.com/hapijs/cookie/pull/83) allow buffer as password
- [#80](https://github.com/hapijs/cookie/issues/80) Buffer type should be allowed for "password" option

### [3.0.0](https://github.com/hapijs/cookie/milestone/14) <span class="breaking-badge"></span> {#3.0.0}

- [#75](https://github.com/hapijs/cookie/pull/75) validateFunc according to signature function
- [#74](https://github.com/hapijs/cookie/pull/74) Updated docs
- [#72](https://github.com/hapijs/cookie/pull/72) Pass request object to validation function

## Version 2 {#v2}

### [2.2.0](https://github.com/hapijs/cookie/milestone/13) {#2.2.0}

- [#69](https://github.com/hapijs/cookie/pull/69) 2.2.0 update
- [#68](https://github.com/hapijs/cookie/pull/68) Fix support for custom appendNext param
- [#67](https://github.com/hapijs/cookie/issues/67) `appendNext` no longer accepts a string
- [#65](https://github.com/hapijs/cookie/pull/65) allow null setting for domain
- [#64](https://github.com/hapijs/cookie/issues/64) domain is now required as a string, and null does not pass validation

### [2.1.0](https://github.com/hapijs/cookie/milestone/12) {#2.1.0}

- [#63](https://github.com/hapijs/cookie/pull/63) Version 2.1.0
- [#62](https://github.com/hapijs/cookie/pull/62) Allow environment variables to configure cookie scheme

### [2.0.0](https://github.com/hapijs/cookie/milestone/10) <span class="breaking-badge"></span> {#2.0.0}

- [#45](https://github.com/hapijs/cookie/pull/45) Version 2.0.0
- [#43](https://github.com/hapijs/cookie/pull/43) Use request.route.settings.plugin
- [#40](https://github.com/hapijs/cookie/issues/40) Invalid cookie should still return 401
- [#39](https://github.com/hapijs/cookie/issues/39) hapi 8.0 API

## Version 1 {#v1}

### [1.4.2](https://github.com/hapijs/cookie/milestone/11) {#1.4.2}

- [#42](https://github.com/hapijs/cookie/issues/42) Invalid cookie blocks scheme from redirecting

### [1.4.1](https://github.com/hapijs/cookie/milestone/9) {#1.4.1}

- [#37](https://github.com/hapijs/cookie/pull/37) Fix clearInvalid (for issue #34)
- [#34](https://github.com/hapijs/cookie/issues/34) Bad cookie value even with clearInvalid true

### [1.4.0](https://github.com/hapijs/cookie/milestone/8) {#1.4.0}

- [#35](https://github.com/hapijs/cookie/issues/35) Session keepAlive and ttl override
- [#30](https://github.com/hapijs/cookie/pull/30) add set/clear key for cookie
- [#29](https://github.com/hapijs/cookie/pull/29) Fix for handling multiple strategies
- [#26](https://github.com/hapijs/cookie/issues/26) Update key in auth.credentials
- [#22](https://github.com/hapijs/cookie/pull/22) Exposed path option for session cookie
- [#21](https://github.com/hapijs/cookie/issues/21) Expose 'path' in cookieOptions

### [1.3.2](https://github.com/hapijs/cookie/milestone/7) {#1.3.2}

- [#20](https://github.com/hapijs/cookie/pull/20) Update LICENSE
- [#19](https://github.com/hapijs/cookie/issues/19) Update License

### [1.3.1](https://github.com/hapijs/cookie/milestone/6) {#1.3.1}

- [#16](https://github.com/hapijs/cookie/issues/16) Fix hapi dev dep

### [1.3.0](https://github.com/hapijs/cookie/milestone/5) {#1.3.0}

- [#15](https://github.com/hapijs/cookie/issues/15) Skip redirection on try

### [1.2.0](https://github.com/hapijs/cookie/milestone/4) {#1.2.0}

- [#11](https://github.com/hapijs/cookie/issues/11) No way to use with 'try' mode if 'redirectTo' is set
- [#10](https://github.com/hapijs/cookie/issues/10) validateFunc credentials override session

### [1.1.0](https://github.com/hapijs/cookie/milestone/3) {#1.1.0}

- [#9](https://github.com/hapijs/cookie/pull/9) hapi 6.0

### [1.0.3](https://github.com/hapijs/cookie/milestone/2) {#1.0.3}

- [#6](https://github.com/hapijs/cookie/issues/6) Bring coverage back to 100%

### [1.0.2](https://github.com/hapijs/cookie/milestone/1) {#1.0.2}

- [#5](https://github.com/hapijs/cookie/issues/5) Bring coverage back to 100% after lab fix
- [#4](https://github.com/hapijs/cookie/issues/4) fix peerDependencies for hapi
