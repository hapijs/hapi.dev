## Version 6 {#v6}

### [6.0.2](https://github.com/hapijs/shot/milestone/55) {#6.0.2}

- [#151](https://github.com/hapijs/shot/pull/151) Improve argument validation and messaging
- [#150](https://github.com/hapijs/shot/pull/150) Support handlers calling res.destroy() to abort sending a response

### [6.0.1](https://github.com/hapijs/shot/milestone/54) {#6.0.1}

- [#147](https://github.com/hapijs/shot/pull/147) chore: bump hoek

### [6.0.0](https://github.com/hapijs/shot/milestone/53) <span class="breaking-badge"></span> {#6.0.0}

- [#145](https://github.com/hapijs/shot/pull/145) More realistic request socket interface
- [#144](https://github.com/hapijs/shot/pull/144) Drop node v12 support
- [#140](https://github.com/hapijs/shot/pull/140) Add initial typescript support

## Version 5 {#v5}

### [5.0.5](https://github.com/hapijs/shot/milestone/51) {#5.0.5}

- [#139](https://github.com/hapijs/shot/pull/139) When simulating close, ensure res emits close.
- [#137](https://github.com/hapijs/shot/pull/137) remove unused lib/schema.js
- [#134](https://github.com/hapijs/shot/pull/134) upgrade lab to v24

### [5.0.4](https://github.com/hapijs/shot/milestone/50) {#5.0.4}

- [#133](https://github.com/hapijs/shot/pull/133) Another attempt at #129
- [#132](https://github.com/hapijs/shot/pull/132) fix: do not auto destroy request stream

### [5.0.3](https://github.com/hapijs/shot/milestone/49) {#5.0.3}

- [#130](https://github.com/hapijs/shot/pull/130) Revert "Fix cleanup to be consistent across node releases"

### [5.0.2](https://github.com/hapijs/shot/milestone/48) {#5.0.2}

- [#129](https://github.com/hapijs/shot/pull/129) Fix cleanup to be consistent across node releases

### [5.0.1](https://github.com/hapijs/shot/milestone/47) {#5.0.1}

- [#127](https://github.com/hapijs/shot/pull/127) test on node 14
- [#124](https://github.com/hapijs/shot/pull/124) Replace joi with validate

### [5.0.0](https://github.com/hapijs/shot/milestone/46) <span class="breaking-badge"></span> {#5.0.0}

- [#120](https://github.com/hapijs/shot/issues/120) Only node 12

## Version 4 {#v4}

### [4.1.2](https://github.com/hapijs/shot/milestone/44) {#4.1.2}

- [#112](https://github.com/hapijs/shot/issues/112) Update joi

### [4.1.1](https://github.com/hapijs/shot/milestone/43) {#4.1.1}

- [#109](https://github.com/hapijs/shot/pull/109) work around Node's DEP0066

### [4.1.0](https://github.com/hapijs/shot/milestone/40) {#4.1.0}

- [#108](https://github.com/hapijs/shot/issues/108) Node V12 deprecation warning [DEP0066] OutgoingMessage.prototype.\_headers is deprecated
- [#106](https://github.com/hapijs/shot/issues/106) Change module name

### [4.0.7](https://github.com/hapijs/shot/milestone/39) {#4.0.7}

- [#101](https://github.com/hapijs/shot/issues/101) Remove engines

### [4.0.6](https://github.com/hapijs/shot/milestone/38) {#4.0.6}

- [#100](https://github.com/hapijs/shot/issues/100) Update deps

### [4.0.5](https://github.com/hapijs/shot/milestone/37) {#4.0.5}

- [#99](https://github.com/hapijs/shot/pull/99) Updated lab to v17 to pass on Node v11
- [#92](https://github.com/hapijs/shot/pull/92) skip not covered lines on node master

### [4.0.4](https://github.com/hapijs/shot/milestone/36) {#4.0.4}

### [4.0.3](https://github.com/hapijs/shot/milestone/35) {#4.0.3}

- [#90](https://github.com/hapijs/shot/issues/90) Update joi

### [4.0.2](https://github.com/hapijs/shot/milestone/34) {#4.0.2}

- [#89](https://github.com/hapijs/shot/issues/89) Replace instanceof with symbol

### [4.0.1](https://github.com/hapijs/shot/milestone/33) {#4.0.1}

- [#88](https://github.com/hapijs/shot/issues/88) Update deps

### [4.0.0](https://github.com/hapijs/shot/milestone/32) {#4.0.0}

## Version 3 {#v3}

### [3.5.1](https://github.com/hapijs/shot/milestone/42) {#3.5.1}

- [#122](https://github.com/hapijs/shot/issues/122) Support node 12

### [3.5.0](https://github.com/hapijs/shot/milestone/41) {#3.5.0}

- [#105](https://github.com/hapijs/shot/issues/105) Commercial version of v3 branch

### [3.4.2](https://github.com/hapijs/shot/milestone/31) {#3.4.2}

- [#85](https://github.com/hapijs/shot/pull/85) Fix for node 8

### [3.4.1](https://github.com/hapijs/shot/milestone/30) {#3.4.1}

- [#84](https://github.com/hapijs/shot/pull/84) Fix node 8 issues

### [3.4.0](https://github.com/hapijs/shot/milestone/29) <span class="breaking-badge"></span> {#3.4.0}

- [#83](https://github.com/hapijs/shot/issues/83) Update deps
- [#81](https://github.com/hapijs/shot/pull/81) Handle streams of utf8 encoded strings
- [#79](https://github.com/hapijs/shot/pull/79) Remove custom output parsing and buffer payload chunks via write()
- [#76](https://github.com/hapijs/shot/pull/76) Updated API docs to reflect new validate flag

### [3.3.1](https://github.com/hapijs/shot/milestone/28) {#3.3.1}

### [3.3.0](https://github.com/hapijs/shot/milestone/27) {#3.3.0}

- [#75](https://github.com/hapijs/shot/issues/75) Cleanup validation and make it optional

### [3.2.1](https://github.com/hapijs/shot/milestone/26) {#3.2.1}

- [#73](https://github.com/hapijs/shot/pull/73) Add status message to response object
- [#71](https://github.com/hapijs/shot/pull/71) add validation schema to shot

### [3.2.0](https://github.com/hapijs/shot/milestone/25) {#3.2.0}

- [#74](https://github.com/hapijs/shot/issues/74) Include statusMessage

### [3.1.1](https://github.com/hapijs/shot/milestone/24) {#3.1.1}

- [#72](https://github.com/hapijs/shot/issues/72) npmignore

### [3.1.0](https://github.com/hapijs/shot/milestone/23) {#3.1.0}

- [#69](https://github.com/hapijs/shot/pull/69) Update code to 3.x.x
- [#68](https://github.com/hapijs/shot/pull/68) Test on node 6, update lab and fix tests
- [#67](https://github.com/hapijs/shot/pull/67) Support stream payloads
- [#65](https://github.com/hapijs/shot/pull/65) Adds quotes around node versions in travis file

### [3.0.1](https://github.com/hapijs/shot/milestone/22) {#3.0.1}

- [#63](https://github.com/hapijs/shot/pull/63) Add default port to host header when no port specified. Fixes #62
- [#61](https://github.com/hapijs/shot/pull/61) Reduce function generation
- [#60](https://github.com/hapijs/shot/pull/60) Refactor index.js into separate files

### [3.0.0](https://github.com/hapijs/shot/milestone/21) <span class="breaking-badge"></span> {#3.0.0}

- [#59](https://github.com/hapijs/shot/issues/59) Update README with ES6 styles
- [#58](https://github.com/hapijs/shot/pull/58) Updated README for ES6 styles closes #59
- [#57](https://github.com/hapijs/shot/pull/57) Set trailers in res.trailers rather than res.headers. Fixes #56
- [#56](https://github.com/hapijs/shot/issues/56) Trailers should be added to res.trailers, not res.headers

## Version 2 {#v2}

### [2.0.1](https://github.com/hapijs/shot/milestone/20) {#2.0.1}

- [#55](https://github.com/hapijs/shot/issues/55) Fix broken tests

### [2.0.0](https://github.com/hapijs/shot/milestone/19) <span class="breaking-badge"></span> {#2.0.0}

- [#52](https://github.com/hapijs/shot/issues/52) Node &gt;= 4 / es2015 updates
- [#51](https://github.com/hapijs/shot/pull/51) Upgrade lab to 7.x.x. Closes #50

## Version 1 {#v1}

### [1.7.0](https://github.com/hapijs/shot/milestone/17) {#1.7.0}

- [#47](https://github.com/hapijs/shot/pull/47) Add authority option. Closes #46
- [#46](https://github.com/hapijs/shot/issues/46) Add authority option for overriding default host header

### [1.6.1](https://github.com/hapijs/shot/milestone/16) {#1.6.1}

- [#44](https://github.com/hapijs/shot/pull/44) Always include a host header. Closes #43
- [#43](https://github.com/hapijs/shot/issues/43) host header is not always set

### [1.6.0](https://github.com/hapijs/shot/milestone/15) {#1.6.0}

- [#36](https://github.com/hapijs/shot/pull/36) Inject request with specified the remote client IP address
- [#35](https://github.com/hapijs/shot/issues/35) Client IP address

### [1.5.4](https://github.com/hapijs/shot/milestone/14) {#1.5.4}

### [1.5.3](https://github.com/hapijs/shot/milestone/13) {#1.5.3}

- [#33](https://github.com/hapijs/shot/issues/33) Inconsistent assignment of rawPayload

### [1.5.2](https://github.com/hapijs/shot/milestone/12) {#1.5.2}

- [#32](https://github.com/hapijs/shot/pull/32) use rawPayload, convert to UTF8 after the whole buffer is available

### [1.5.1](https://github.com/hapijs/shot/milestone/11) {#1.5.1}

- [#30](https://github.com/hapijs/shot/pull/30) fix #7
- [#7](https://github.com/hapijs/shot/issues/7) deprecated encoding 'binary' is used

### [1.5.0](https://github.com/hapijs/shot/milestone/10) {#1.5.0}

- [#28](https://github.com/hapijs/shot/pull/28) Add 'content-length' header matching payload length if none set

### [1.4.2](https://github.com/hapijs/shot/milestone/9) {#1.4.2}

- [#27](https://github.com/hapijs/shot/pull/27) add -L to test and test-cov

### [1.4.1](https://github.com/hapijs/shot/milestone/8) {#1.4.1}

- [#24](https://github.com/hapijs/shot/pull/24) Added Hoek.applyToDefaults.
- [#23](https://github.com/hapijs/shot/pull/23) Use Hoek to assign defaults to options passed to inject. Fixes #22
- [#22](https://github.com/hapijs/shot/issues/22) Use hoek to assign defaults to options passed to inject

### [1.4.0](https://github.com/hapijs/shot/milestone/7) {#1.4.0}

- [#19](https://github.com/hapijs/shot/pull/19) optionally accept an object as the `url`

### [1.3.5](https://github.com/hapijs/shot/milestone/6) {#1.3.5}

- [#14](https://github.com/hapijs/shot/issues/14) lab 4.0

### [1.3.4](https://github.com/hapijs/shot/milestone/4) {#1.3.4}

- [#12](https://github.com/hapijs/shot/pull/12) Remove repeated assignment

### [1.3.3](https://github.com/hapijs/shot/milestone/5) {#1.3.3}

- [#11](https://github.com/hapijs/shot/issues/11) Bring coverage back to 100%

### [1.3.2](https://github.com/hapijs/shot/milestone/3) {#1.3.2}

- [#10](https://github.com/hapijs/shot/issues/10) Bring coverage back to 100% after lab fix

### [1.3.1](https://github.com/hapijs/shot/milestone/2) {#1.3.1}

- [#9](https://github.com/hapijs/shot/issues/9) Support node 0.11

### [1.0.0](https://github.com/hapijs/shot/milestone/1) {#1.0.0}
