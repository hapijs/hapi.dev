## Version 11 {#v11}

### [11.0.7](https://github.com/hapijs/hoek/milestone/108) {#11.0.7}

- [#402](https://github.com/hapijs/hoek/pull/402) Fix cloning Util.inherit() subclassed errors. Backports #401
- [#401](https://github.com/hapijs/hoek/pull/401) Fix cloning Util.inherit() subclassed errors
- [#400](https://github.com/hapijs/hoek/issues/400) Hoek.clone drop an error with axios errors in version @hapi/hoek 11.0.6+

### [11.0.6](https://github.com/hapijs/hoek/milestone/107) {#11.0.6}

- [#399](https://github.com/hapijs/hoek/pull/399) Fix Error clone() when structuredClone uses bad prototype

### [11.0.5](https://github.com/hapijs/hoek/milestone/106) {#11.0.5}

- [#398](https://github.com/hapijs/hoek/pull/398) fix: missing stack starting from node 21+
- [#396](https://github.com/hapijs/hoek/pull/396) Fix default values for `merge.Options` interface
- [#395](https://github.com/hapijs/hoek/issues/395) Incorrect default documented for `mergeArrays` option

### [11.0.4](https://github.com/hapijs/hoek/milestone/105) {#11.0.4}

- [#389](https://github.com/hapijs/hoek/pull/389) fix: provide reference to TS types for export map
- [#385](https://github.com/hapijs/hoek/issues/385) Missing types in typescript with module resolution nodenext

### [11.0.3](https://github.com/hapijs/hoek/milestone/104) {#11.0.3}

- [#392](https://github.com/hapijs/hoek/pull/392) Support the URL type

### [11.0.2](https://github.com/hapijs/hoek/milestone/102) {#11.0.2}

- [#384](https://github.com/hapijs/hoek/pull/384) chore: add individual module types

### [11.0.1](https://github.com/hapijs/hoek/milestone/101) <span class="breaking-badge"></span> {#11.0.1}

- [#380](https://github.com/hapijs/hoek/pull/380) Explicitly export modules

### [11.0.0](https://github.com/hapijs/hoek/milestone/100) <span class="breaking-badge"></span> {#11.0.0}

- [#382](https://github.com/hapijs/hoek/pull/382) Refactor AssertError

## Version 10 {#v10}

### [10.0.1](https://github.com/hapijs/hoek/milestone/98) {#10.0.1}

- [#383](https://github.com/hapijs/hoek/pull/383) Updates assert() type to declare condition to be true
- [#379](https://github.com/hapijs/hoek/pull/379) Fix version range

### [10.0.0](https://github.com/hapijs/hoek/milestone/97) <span class="breaking-badge"></span> {#10.0.0}

- [#377](https://github.com/hapijs/hoek/pull/377) Support node v18 and drop node v12

## Version 9 {#v9}

### [9.3.0](https://github.com/hapijs/hoek/milestone/96) {#9.3.0}

- [#373](https://github.com/hapijs/hoek/pull/373) Handle very long timeouts in Hoek.wait()
- [#372](https://github.com/hapijs/hoek/pull/372) Cleanup

### [9.2.1](https://github.com/hapijs/hoek/milestone/94) {#9.2.1}

- [#371](https://github.com/hapijs/hoek/pull/371) Fix reachTemplate() regex timing

### [9.2.0](https://github.com/hapijs/hoek/milestone/93) {#9.2.0}

- [#368](https://github.com/hapijs/hoek/pull/368) Support named imports when using node esm loader

### [9.1.1](https://github.com/hapijs/hoek/milestone/92) {#9.1.1}

- [#367](https://github.com/hapijs/hoek/pull/367) applyToDefaults: respect nullOverride when shallow is used
- [#365](https://github.com/hapijs/hoek/pull/365) Fix applyToDefaults to work better with non-object source values
- [#361](https://github.com/hapijs/hoek/pull/361) upgrade lab to v24 and devDependency of typescript

### [9.1.0](https://github.com/hapijs/hoek/milestone/91) {#9.1.0}

- [#360](https://github.com/hapijs/hoek/pull/360) Always call base class methods to inspect Map and Set
- [#359](https://github.com/hapijs/hoek/pull/359) Add returnValue option to wait()
- [#357](https://github.com/hapijs/hoek/issues/357) deepEqual() can fail on subclassed map

### [9.0.4](https://github.com/hapijs/hoek/milestone/90) {#9.0.4}

- [#351](https://github.com/hapijs/hoek/pull/351) Fix 'compare is not a function'

### [9.0.3](https://github.com/hapijs/hoek/milestone/88) {#9.0.3}

- [#352](https://github.com/hapijs/hoek/issues/352) Prevent prototype poisoning in clone()

### [9.0.2](https://github.com/hapijs/hoek/milestone/87) {#9.0.2}

- [#350](https://github.com/hapijs/hoek/issues/350) Clone fails to copy override array prototype

### [9.0.1](https://github.com/hapijs/hoek/milestone/86) {#9.0.1}

- [#349](https://github.com/hapijs/hoek/issues/349) Fix shallow defaults clone

### [9.0.0](https://github.com/hapijs/hoek/milestone/85) <span class="breaking-badge"></span> {#9.0.0}

- [#347](https://github.com/hapijs/hoek/issues/347) Support only node 12
- [#343](https://github.com/hapijs/hoek/pull/343) Safer and faster shallow handling

## Version 8 {#v8}

### [8.5.1](https://github.com/hapijs/hoek/milestone/84) {#8.5.1}

- [#353](https://github.com/hapijs/hoek/issues/353) Prevent prototype poisoning in clone() (v8)

### [8.5.0](https://github.com/hapijs/hoek/milestone/83) {#8.5.0}

- [#346](https://github.com/hapijs/hoek/issues/346) Add isPromise()

### [8.4.0](https://github.com/hapijs/hoek/milestone/82) {#8.4.0}

- [#345](https://github.com/hapijs/hoek/issues/345) Add ts.XOR&lt;&gt;

### [8.3.2](https://github.com/hapijs/hoek/milestone/81) {#8.3.2}

- [#344](https://github.com/hapijs/hoek/issues/344) Improve clone() performance

### [8.3.1](https://github.com/hapijs/hoek/milestone/80) {#8.3.1}

- [#342](https://github.com/hapijs/hoek/issues/342) contain() part option allows no matches

### [8.3.0](https://github.com/hapijs/hoek/milestone/79) {#8.3.0}

- [#341](https://github.com/hapijs/hoek/issues/341) Block once in contain() when subject is an object
- [#340](https://github.com/hapijs/hoek/issues/340) Error.captureStackTrace can't be used in Joi's browser build

### [8.2.5](https://github.com/hapijs/hoek/milestone/78) {#8.2.5}

- [#338](https://github.com/hapijs/hoek/issues/338) Export interfaces
- [#337](https://github.com/hapijs/hoek/issues/337) deepEqual with skip seems to ignore missing properties

### [8.2.4](https://github.com/hapijs/hoek/milestone/77) {#8.2.4}

- [#330](https://github.com/hapijs/hoek/issues/330) Remove deep limit on contain with object

### [8.2.3](https://github.com/hapijs/hoek/milestone/76) {#8.2.3}

- [#329](https://github.com/hapijs/hoek/issues/329) deepEqual() fails to compare errors when prototype is false
- [#327](https://github.com/hapijs/hoek/issues/327) contain() passes with extra values with only and not once

### [8.2.2](https://github.com/hapijs/hoek/milestone/73) {#8.2.2}

### [8.2.1](https://github.com/hapijs/hoek/milestone/72) {#8.2.1}

- [#324](https://github.com/hapijs/hoek/pull/324) Fix empty ref bug in contain when only is true
- [#323](https://github.com/hapijs/hoek/issues/323) contain() is always true for empty ref with only and not once

### [8.2.0](https://github.com/hapijs/hoek/milestone/71) {#8.2.0}

- [#322](https://github.com/hapijs/hoek/issues/322) Break methods for deep require
- [#321](https://github.com/hapijs/hoek/issues/321) Handle no Buffer support

### [8.1.0](https://github.com/hapijs/hoek/milestone/70) {#8.1.0}

- [#319](https://github.com/hapijs/hoek/issues/319) skip and deepFunction options for deepEqual()

### [8.0.2](https://github.com/hapijs/hoek/milestone/69) {#8.0.2}

- [#317](https://github.com/hapijs/hoek/issues/317) Restore ability to assert with pre-made error

### [8.0.1](https://github.com/hapijs/hoek/milestone/68) {#8.0.1}

- [#316](https://github.com/hapijs/hoek/issues/316) Make assert() generate a named Error so bounce can identify

### [8.0.0](https://github.com/hapijs/hoek/milestone/67) <a class="release-notes-link" href="https://github.com/hapijs/hoek/issues/315" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#8.0.0}

- [#315](https://github.com/hapijs/hoek/issues/315) v8.0.0 Release Notes
- [#314](https://github.com/hapijs/hoek/issues/314) Change assert() AssertionError to Error
- [#313](https://github.com/hapijs/hoek/issues/313) Remove uniqueFilename()

## Version 7 {#v7}

### [7.2.1](https://github.com/hapijs/hoek/milestone/66) {#7.2.1}

- [#312](https://github.com/hapijs/hoek/issues/312) Minor performance

### [7.2.0](https://github.com/hapijs/hoek/milestone/65) {#7.2.0}

- [#311](https://github.com/hapijs/hoek/issues/311) Support reach into Set and Map objects

### [7.1.0](https://github.com/hapijs/hoek/milestone/64) {#7.1.0}

- [#308](https://github.com/hapijs/hoek/issues/308) Shallow clone of entire object

### [7.0.0](https://github.com/hapijs/hoek/milestone/63) <a class="release-notes-link" href="https://github.com/hapijs/hoek/issues/306" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#7.0.0}

- [#306](https://github.com/hapijs/hoek/issues/306) v7.0.0 Release Notes
- [#305](https://github.com/hapijs/hoek/issues/305) Support symbols in merge()
- [#304](https://github.com/hapijs/hoek/issues/304) Replace applyToDefaultsWithShallow() with applyToDefaults(..., { shallow })
- [#303](https://github.com/hapijs/hoek/issues/303) Replace cloneWithShallow() with clone(value, { shallow })
- [#285](https://github.com/hapijs/hoek/issues/285) Change all individual option arguments to { options } object
- [#284](https://github.com/hapijs/hoek/issues/284) Default handling of symbols to true by default

## Version 6 {#v6}

### [6.2.6](https://github.com/hapijs/hoek/milestone/74) {#6.2.6}

- [#328](https://github.com/hapijs/hoek/issues/328) deepEqual() skip fails when number of keys is diff

### [6.2.4](https://github.com/hapijs/hoek/milestone/62) {#6.2.4}

- [#302](https://github.com/hapijs/hoek/pull/302) Fix clone of subclassed Set and Map
- [#301](https://github.com/hapijs/hoek/pull/301) Fix: Add map and set to seen map
- [#300](https://github.com/hapijs/hoek/issues/300) Stack overflow in clone in v6.2.3
- [#298](https://github.com/hapijs/hoek/pull/298) Typescript enhancements

### [6.2.3](https://github.com/hapijs/hoek/milestone/61) <span class="breaking-badge"></span> {#6.2.3}

- [#299](https://github.com/hapijs/hoek/issues/299) Set deepEqual() prototype option to true by default, not just when no options are passed
- [#297](https://github.com/hapijs/hoek/pull/297) Clone Map and Set
- [#228](https://github.com/hapijs/hoek/issues/228) Hoek.clone() issues

### [6.2.2](https://github.com/hapijs/hoek/milestone/60) {#6.2.2}

- [#295](https://github.com/hapijs/hoek/issues/295) Bootstrap types from @types
- [#294](https://github.com/hapijs/hoek/pull/294) Handle promises in deepEqual()

### [6.2.1](https://github.com/hapijs/hoek/milestone/58) {#6.2.1}

- [#291](https://github.com/hapijs/hoek/issues/291) Update deps

### [6.2.0](https://github.com/hapijs/hoek/milestone/55) {#6.2.0}

- [#289](https://github.com/hapijs/hoek/issues/289) Change module namespace

### [6.1.3](https://github.com/hapijs/hoek/milestone/59) {#6.1.3}

- [#290](https://github.com/hapijs/hoek/issues/290) Fix clone without prototype

### [6.1.2](https://github.com/hapijs/hoek/milestone/54) {#6.1.2}

- [#283](https://github.com/hapijs/hoek/issues/283) Revert cloning of symbols to false by default

### [6.1.1](https://github.com/hapijs/hoek/milestone/53) {#6.1.1}

- [#282](https://github.com/hapijs/hoek/issues/282) Ignore symbols by default in deepEqual()
- [#281](https://github.com/hapijs/hoek/pull/281) Symbol support

### [6.0.4](https://github.com/hapijs/hoek/milestone/52) {#6.0.4}

- [#278](https://github.com/hapijs/hoek/issues/278) Hoek.clone() defineProperty issue

### [6.0.3](https://github.com/hapijs/hoek/milestone/51) {#6.0.3}

- [#277](https://github.com/hapijs/hoek/pull/277) Don't apply part option to contain() by default

### [6.0.2](https://github.com/hapijs/hoek/milestone/50) {#6.0.2}

- [#276](https://github.com/hapijs/hoek/pull/276) Fix contain() with duplicates and only

### [6.0.1](https://github.com/hapijs/hoek/milestone/49) {#6.0.1}

- [#274](https://github.com/hapijs/hoek/issues/274) Remove engines

### [6.0.0](https://github.com/hapijs/hoek/milestone/48) <span class="breaking-badge"></span> {#6.0.0}

- [#268](https://github.com/hapijs/hoek/issues/268) API deprecations
- [#260](https://github.com/hapijs/hoek/issues/260) deepEqual does not check both sides in full
- [#254](https://github.com/hapijs/hoek/pull/254) Add Map and Set support to deepEqual()
- [#242](https://github.com/hapijs/hoek/pull/242) Rework deepEqual()
- [#238](https://github.com/hapijs/hoek/issues/238) deepEqual and array properties
- [#236](https://github.com/hapijs/hoek/issues/236) Hoek.deepEqual false positive

## Version 5 {#v5}

### [5.0.4](https://github.com/hapijs/hoek/milestone/47) {#5.0.4}

- [#269](https://github.com/hapijs/hoek/pull/269) Try object ref comparison first in deepClone()

### [5.0.3](https://github.com/hapijs/hoek/milestone/46) {#5.0.3}

- [#227](https://github.com/hapijs/hoek/pull/227) Don't use deprecated new Buffer() api

### [5.0.2](https://github.com/hapijs/hoek/milestone/45) {#5.0.2}

- [#221](https://github.com/hapijs/hoek/issues/221) Update deps
- [#220](https://github.com/hapijs/hoek/pull/220) Throw instances of AssertionError on asserts

### [5.0.1](https://github.com/hapijs/hoek/milestone/44) <span class="breaking-badge"></span> {#5.0.1}

- [#218](https://github.com/hapijs/hoek/issues/218) base64urlDecode() should throw, not return errors

### [5.0.0](https://github.com/hapijs/hoek/milestone/43) <span class="breaking-badge"></span> {#5.0.0}

- [#212](https://github.com/hapijs/hoek/issues/212) Remove nextTick()
- [#211](https://github.com/hapijs/hoek/issues/211) Remove Timer
- [#210](https://github.com/hapijs/hoek/issues/210) Require node v8
- [#206](https://github.com/hapijs/hoek/issues/206) Add a wait() method

## Version 4 {#v4}

### [4.3.0](https://github.com/hapijs/hoek/milestone/56) {#4.3.0}

- [#288](https://github.com/hapijs/hoek/issues/288) Commercial version for 4.x branch

### [4.2.0](https://github.com/hapijs/hoek/milestone/42) {#4.2.0}

- [#204](https://github.com/hapijs/hoek/pull/204) Add escape json

### [4.1.1](https://github.com/hapijs/hoek/milestone/41) {#4.1.1}

- [#203](https://github.com/hapijs/hoek/pull/203) Fix isInteger for unsafe integers

### [4.1.0](https://github.com/hapijs/hoek/milestone/40) {#4.1.0}

- [#197](https://github.com/hapijs/hoek/pull/197) Enhancement: Make contain see non-enumerable's

### [4.0.2](https://github.com/hapijs/hoek/milestone/39) {#4.0.2}

- [#195](https://github.com/hapijs/hoek/issues/195) npmignore

### [4.0.1](https://github.com/hapijs/hoek/milestone/38) {#4.0.1}

- [#191](https://github.com/hapijs/hoek/issues/191) update to code 3.x.x
- [#190](https://github.com/hapijs/hoek/pull/190) Use map for cloning memoizer

### [4.0.0](https://github.com/hapijs/hoek/milestone/37) <span class="breaking-badge"></span> {#4.0.0}

- [#186](https://github.com/hapijs/hoek/issues/186) update lab
- [#185](https://github.com/hapijs/hoek/pull/185) improve .unique to make use of es6 `Set` performance
- [#184](https://github.com/hapijs/hoek/issues/184) improve .unique performance
- [#183](https://github.com/hapijs/hoek/pull/183) Fix for issue #177
- [#181](https://github.com/hapijs/hoek/pull/181) removed isAbsolutePath method
- [#180](https://github.com/hapijs/hoek/pull/180) refactor(merge): use !== rather than ^
- [#179](https://github.com/hapijs/hoek/issues/179) isAbsolutePath obsolete?
- [#177](https://github.com/hapijs/hoek/issues/177) Assert when value is not a string
- [#124](https://github.com/hapijs/hoek/issues/124) transform method does not respect separator option

## Version 3 {#v3}

### [3.0.4](https://github.com/hapijs/hoek/milestone/36) {#3.0.4}

- [#152](https://github.com/hapijs/hoek/issues/152) Hoek.reach and non standard JS objects

### [3.0.3](https://github.com/hapijs/hoek/milestone/35) {#3.0.3}

- [#164](https://github.com/hapijs/hoek/issues/164) Hoek.deepEqual providing false positive result

### [3.0.2](https://github.com/hapijs/hoek/milestone/34) {#3.0.2}

- [#173](https://github.com/hapijs/hoek/issues/173) fix linting error
- [#171](https://github.com/hapijs/hoek/pull/171) fix mapToObject documentation

### [3.0.1](https://github.com/hapijs/hoek/milestone/33) {#3.0.1}

- [#169](https://github.com/hapijs/hoek/pull/169) Lint errors. Closes #168
- [#168](https://github.com/hapijs/hoek/issues/168) ES6 lint errors

### [3.0.0](https://github.com/hapijs/hoek/milestone/32) <span class="breaking-badge"></span> {#3.0.0}

- [#167](https://github.com/hapijs/hoek/pull/167) Es6
- [#166](https://github.com/hapijs/hoek/issues/166) ES6 style, node v4
- [#165](https://github.com/hapijs/hoek/pull/165) es6 updates WIP

## Version 2 {#v2}

### [2.16.3](https://github.com/hapijs/hoek/milestone/31) {#2.16.3}

- [#162](https://github.com/hapijs/hoek/issues/162) Hoek.clone on process.env

### [2.16.2](https://github.com/hapijs/hoek/milestone/30) {#2.16.2}

- [#161](https://github.com/hapijs/hoek/issues/161) hoek.reach should allow empty keys

### [2.16.1](https://github.com/hapijs/hoek/milestone/29) {#2.16.1}

- [#160](https://github.com/hapijs/hoek/issues/160) cleanup loop from #148

### [2.16.0](https://github.com/hapijs/hoek/milestone/28) {#2.16.0}

- [#159](https://github.com/hapijs/hoek/pull/159) Allow reach to work with falsy values (empty str)

### [2.15.0](https://github.com/hapijs/hoek/milestone/27) {#2.15.0}

- [#148](https://github.com/hapijs/hoek/pull/148) generalize Hoek.transform to accept an array of objects

### [2.14.0](https://github.com/hapijs/hoek/milestone/26) {#2.14.0}

- [#147](https://github.com/hapijs/hoek/pull/147) Reach template
- [#146](https://github.com/hapijs/hoek/issues/146) Add reachTemplate() to apply reach() functionality to a templatized string
- [#139](https://github.com/hapijs/hoek/issues/139) Clone fails on objects with null prototypes

### [2.13.1](https://github.com/hapijs/hoek/milestone/25) {#2.13.1}

- [#145](https://github.com/hapijs/hoek/issues/145) options for deepEqual don't pass on to recursive calls in arrays
- [#134](https://github.com/hapijs/hoek/pull/134) Allow for deep partial contain

### [2.13.0](https://github.com/hapijs/hoek/milestone/23) {#2.13.0}

- [#140](https://github.com/hapijs/hoek/pull/140) Add isNullOverride to applyToDefaults

### [2.12.0](https://github.com/hapijs/hoek/milestone/21) {#2.12.0}

- [#133](https://github.com/hapijs/hoek/pull/133) Added option parameter to deepEqual.

### [2.11.1](https://github.com/hapijs/hoek/milestone/19) {#2.11.1}

- [#131](https://github.com/hapijs/hoek/pull/131) Clone even non-enumerable properties.
- [#130](https://github.com/hapijs/hoek/issues/130) Hoek.deepEqual({a: 'foo'}, {a: 'foo', b: 'bar'}) return true
- [#128](https://github.com/hapijs/hoek/pull/128) Fix deepEqual on empty objects. Fixes #127.
- [#127](https://github.com/hapijs/hoek/issues/127) deepEqual behaving unexpectedly with empty object

### [2.11.0](https://github.com/hapijs/hoek/milestone/18) {#2.11.0}

- [#117](https://github.com/hapijs/hoek/pull/117) Throw error directly if it is the only thing passed in as the message
- [#116](https://github.com/hapijs/hoek/issues/116) Hoek.assert - throw error that is passed in as message
- [#115](https://github.com/hapijs/hoek/pull/115) Adds ability to do Hoek.reach with negative index

### [2.10.0](https://github.com/hapijs/hoek/milestone/17) {#2.10.0}

- [#110](https://github.com/hapijs/hoek/pull/110) enhance withShallow methods to support nested keys. Closes #109
- [#109](https://github.com/hapijs/hoek/issues/109) Enhance shallow clone methods to support nested keys

### [2.9.1](https://github.com/hapijs/hoek/milestone/16) {#2.9.1}

- [#108](https://github.com/hapijs/hoek/pull/108) Fix applyToDefaultsWithShallow default clone. Closes #107
- [#107](https://github.com/hapijs/hoek/issues/107) applyToDefaultsWithShallow() fail to retain defaults shallow key

### [2.9.0](https://github.com/hapijs/hoek/milestone/15) {#2.9.0}

- [#106](https://github.com/hapijs/hoek/pull/106) Clone, shallow, and stringify
- [#105](https://github.com/hapijs/hoek/issues/105) Move shallow and stringify from hapi
- [#104](https://github.com/hapijs/hoek/issues/104) Clone fails to copy object property if only setter used

### [2.8.1](https://github.com/hapijs/hoek/milestone/14) {#2.8.1}

- [#103](https://github.com/hapijs/hoek/pull/103) avoid hasOwnProperty so plain objects work
- [#102](https://github.com/hapijs/hoek/issues/102) Plain objects can't be compared.

### [2.8.0](https://github.com/hapijs/hoek/milestone/13) {#2.8.0}

- [#99](https://github.com/hapijs/hoek/issues/99) assert() adds whitespace even when arguments are empty
- [#97](https://github.com/hapijs/hoek/pull/97) Add contain()
- [#96](https://github.com/hapijs/hoek/issues/96) Add contain() comparison function for strings, objects, and arrays
- [#95](https://github.com/hapijs/hoek/issues/95) deepEqual() fails to compare arrays with non literal members

### [2.7.0](https://github.com/hapijs/hoek/milestone/12) {#2.7.0}

- [#94](https://github.com/hapijs/hoek/pull/94) deepEqual

### [2.6.0](https://github.com/hapijs/hoek/milestone/10) {#2.6.0}

- [#93](https://github.com/hapijs/hoek/pull/93) dont execute getters when cloning
- [#91](https://github.com/hapijs/hoek/pull/91) Added util.format
- [#89](https://github.com/hapijs/hoek/issues/89) Don't clone properties with getter by executing the getter

### [2.5.1](https://github.com/hapijs/hoek/milestone/11) {#2.5.1}

- [#88](https://github.com/hapijs/hoek/pull/88) Allow falsey values to be used as default value in Hoek.reach()

### [2.5.0](https://github.com/hapijs/hoek/milestone/9) {#2.5.0}

- [#84](https://github.com/hapijs/hoek/pull/84) Replaced **proto** with Object.create()
- [#82](https://github.com/hapijs/hoek/pull/82) uniqueFilename
- [#79](https://github.com/hapijs/hoek/issues/79) Update to lab 4.x
- [#76](https://github.com/hapijs/hoek/pull/76) Close #75, properly preform test
- [#75](https://github.com/hapijs/hoek/issues/75) Test 43 case for applyToDefaults not accurately testing

### [2.4.1](https://github.com/hapijs/hoek/milestone/8) {#2.4.1}

- [#71](https://github.com/hapijs/hoek/pull/71) Allow assert to be optimized

### [2.4.0](https://github.com/hapijs/hoek/milestone/7) {#2.4.0}

- [#72](https://github.com/hapijs/hoek/issues/72) Rename spumko to hapijs
- [#70](https://github.com/hapijs/hoek/pull/70) Protect against null prototypes
- [#68](https://github.com/hapijs/hoek/pull/68) Transform Function
- [#66](https://github.com/hapijs/hoek/pull/66) Default Value for Reach
- [#62](https://github.com/hapijs/hoek/issues/62) Cannot read property 'isImmutable' of null

### [2.2.0](https://github.com/hapijs/hoek/milestone/6) {#2.2.0}

- [#59](https://github.com/hapijs/hoek/issues/59) merge() shallow copies array members when merging
- [#58](https://github.com/hapijs/hoek/issues/58) Shallow copy objects with prototype.isImmutable flag
- [#57](https://github.com/hapijs/hoek/issues/57) clone() creates multiple copies of the same date, regex, or buffer object

### [2.1.1](https://github.com/hapijs/hoek/milestone/5) {#2.1.1}

- [#54](https://github.com/hapijs/hoek/issues/54) Detect [[Class]] instead of using instanceof

### [2.1.0](https://github.com/hapijs/hoek/milestone/4) {#2.1.0}

- [#51](https://github.com/hapijs/hoek/issues/51) Add isInteger()
- [#49](https://github.com/hapijs/hoek/pull/49) match() -&gt; test()

### [2.0.0](https://github.com/hapijs/hoek/milestone/1) <span class="breaking-badge"></span> {#2.0.0}

- [#48](https://github.com/hapijs/hoek/issues/48) Bring coverage back to 100% after lab logical statement support
- [#47](https://github.com/hapijs/hoek/issues/47) Add isAbsolutePath for unix and windows when using node &lt;0.11
- [#46](https://github.com/hapijs/hoek/issues/46) Cleanup API and remove/move unused functions

## Version 1 {#v1}

### [1.5.2](https://github.com/hapijs/hoek/milestone/3) {#1.5.2}

- [#45](https://github.com/hapijs/hoek/pull/45) Rename should throw an error for invalid property .

### [1.5.1](https://github.com/hapijs/hoek/milestone/2) {#1.5.1}

- [#44](https://github.com/hapijs/hoek/issues/44) Bring coverage back to 100% after lab fix
