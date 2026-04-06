## Version 26 {#v26}

### [26.0.1](https://github.com/hapijs/lab/milestone/202) {#26.0.1}

- [#1087](https://github.com/hapijs/lab/pull/1087) fix: guard parent access in `addTsEsmHook` for ESM-to-CJS sub-dependency resolution
- [#1086](https://github.com/hapijs/lab/issues/1086) `@hapi/lab` crashes when TypeScript tests depend on ESM packages

### [26.0.0](https://github.com/hapijs/lab/milestone/201) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/1080" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#26.0.0}

- [#1081](https://github.com/hapijs/lab/pull/1081) chore: report node 18+ support
- [#1080](https://github.com/hapijs/lab/issues/1080) 26.0.0 Release Notes
- [#1079](https://github.com/hapijs/lab/pull/1079) chore: next version
- [#1076](https://github.com/hapijs/lab/pull/1076) feat: target ESLint v9
- [#1071](https://github.com/hapijs/lab/pull/1071) Tighten type checking config

## Version 25 {#v25}

### [25.3.2](https://github.com/hapijs/lab/milestone/200) {#25.3.2}

- [#1078](https://github.com/hapijs/lab/pull/1078) Ignore new TypeScript global leak

### [25.3.1](https://github.com/hapijs/lab/milestone/199) {#25.3.1}

- [#1075](https://github.com/hapijs/lab/pull/1075) fix: coverage for arrow functions returning literals
- [#1074](https://github.com/hapijs/lab/pull/1074) fix: lint typescript files

### [25.3.0](https://github.com/hapijs/lab/milestone/198) {#25.3.0}

- [#1073](https://github.com/hapijs/lab/pull/1073) feat: add explicit extension support when using Typescript and ESM

### [25.2.0](https://github.com/hapijs/lab/milestone/197) {#25.2.0}

- [#1069](https://github.com/hapijs/lab/pull/1069) Always lint .ts
- [#1065](https://github.com/hapijs/lab/issues/1065) Add `.ts` to the default `extensions` for `--lint`

### [25.1.4](https://github.com/hapijs/lab/milestone/196) {#25.1.4}

- [#1070](https://github.com/hapijs/lab/pull/1070) Make report an allow list

### [25.1.2](https://github.com/hapijs/lab/milestone/195) {#25.1.2}

- [#1061](https://github.com/hapijs/lab/pull/1061) Fix: add more typescript leaks

### [25.1.1](https://github.com/hapijs/lab/milestone/194) {#25.1.1}

- [#1060](https://github.com/hapijs/lab/pull/1060) chore: bump hoek

### [25.1.0](https://github.com/hapijs/lab/milestone/193) {#25.1.0}

- [#1059](https://github.com/hapijs/lab/pull/1059) Bump @types/node
- [#1058](https://github.com/hapijs/lab/pull/1058) Deal with `Symbol(undici.globalDispatcher.1)` in Node.js 18+
- [#1057](https://github.com/hapijs/lab/pull/1057) Enable linting of _.cjs and _.mjs files
- [#1052](https://github.com/hapijs/lab/pull/1052) Add missing space after colon

### [25.0.1](https://github.com/hapijs/lab/milestone/192) {#25.0.1}

- [#1051](https://github.com/hapijs/lab/pull/1051) Add check for TS error 2820

### [25.0.0](https://github.com/hapijs/lab/milestone/190) <span class="breaking-badge"></span> {#25.0.0}

- [#1050](https://github.com/hapijs/lab/pull/1050) Upgrade dependences
- [#1048](https://github.com/hapijs/lab/pull/1048) Update target to ES2020 to match node 14+
- [#1045](https://github.com/hapijs/lab/pull/1045) Support node v18
- [#1037](https://github.com/hapijs/lab/pull/1037) Remove undocumented --coverage-module option
- [#1035](https://github.com/hapijs/lab/pull/1035) Upgrade to eslint v8
- [#1034](https://github.com/hapijs/lab/pull/1034) Drop support for node v12
- [#1021](https://github.com/hapijs/lab/issues/1021) Update linter to work with ESLint 8

## Version 24 {#v24}

### [24.7.0](https://github.com/hapijs/lab/milestone/189) {#24.7.0}

- [#1044](https://github.com/hapijs/lab/pull/1044) Revise leak detection to use fresh node globals
- [#1043](https://github.com/hapijs/lab/pull/1043) New --coverage-predicates option
- [#1042](https://github.com/hapijs/lab/pull/1042) Remove node 8 compat fix
- [#1041](https://github.com/hapijs/lab/pull/1041) feat: 🎸 depedencies cli option
- [#1038](https://github.com/hapijs/lab/pull/1038) Update sindresorhus deps to pre ESM versions
- [#1036](https://github.com/hapijs/lab/pull/1036) Coverage for nullish coalescing operator
- [#1033](https://github.com/hapijs/lab/issues/1033) tsconfig paths alias

### [24.6.0](https://github.com/hapijs/lab/milestone/188) {#24.6.0}

- [#1032](https://github.com/hapijs/lab/pull/1032) add Node.js 18 globals
- [#1031](https://github.com/hapijs/lab/pull/1031) Support for ES modules

### [24.5.1](https://github.com/hapijs/lab/milestone/187) {#24.5.1}

- [#1029](https://github.com/hapijs/lab/pull/1029) Add inline typescript sources to transformed output
- [#1028](https://github.com/hapijs/lab/pull/1028) Skip coverage on non-mapped transpiled code
- [#1018](https://github.com/hapijs/lab/pull/1018) Add @hapi/eslint-plugin as peer dependency
- [#1017](https://github.com/hapijs/lab/issues/1017) Using the coverage reporter requires "@hapi/eslint-plugin" to be installed, even if it’s not used.
- [#1002](https://github.com/hapijs/lab/issues/1002) Code coverage reports on transpiled JavaScript, instead of TypeScript source
- [#972](https://github.com/hapijs/lab/issues/972) Original files in HTML reporter

### [24.5.0](https://github.com/hapijs/lab/milestone/186) {#24.5.0}

- [#1026](https://github.com/hapijs/lab/pull/1026) Add TypeScript support. Closes #1025
- [#1001](https://github.com/hapijs/lab/pull/1001) Introduce an upper limit to how much actual vs. expected is diffed

### [24.2.1](https://github.com/hapijs/lab/milestone/181) {#24.2.1}

- [#1007](https://github.com/hapijs/lab/pull/1007) Report on private/protected class type errors
- [#1006](https://github.com/hapijs/lab/issues/1006) Incorrect type error detection

### [24.2.0](https://github.com/hapijs/lab/milestone/180) {#24.2.0}

- [#1004](https://github.com/hapijs/lab/pull/1004) Add new globals for node v16

### [24.1.1](https://github.com/hapijs/lab/milestone/178) {#24.1.1}

- [#1000](https://github.com/hapijs/lab/pull/1000) Fix retrying of passing tests

### [24.1.0](https://github.com/hapijs/lab/milestone/177) {#24.1.0}

- [#997](https://github.com/hapijs/lab/pull/997) lib: add new globals from Node.js 15.x

### [24.0.0](https://github.com/hapijs/lab/milestone/176) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/996" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#24.0.0}

- [#996](https://github.com/hapijs/lab/issues/996) 24.0.0 Release Notes
- [#995](https://github.com/hapijs/lab/pull/995) Wait for pending ticks started by test
- [#993](https://github.com/hapijs/lab/pull/993) Shallow clone context
- [#992](https://github.com/hapijs/lab/pull/992) Allow typescript to be updated by clients
- [#990](https://github.com/hapijs/lab/pull/990) Use eslint-plugin-hapi embedded config
- [#987](https://github.com/hapijs/lab/pull/987) throw error if an async experiment function is provided

## Version v24 {#vv24}

### [v24.4.0](https://github.com/hapijs/lab/milestone/185) {#v24.4.0}

- [#1023](https://github.com/hapijs/lab/pull/1023) Cleanup flaky tests, lint CLI scripts
- [#1020](https://github.com/hapijs/lab/pull/1020) Add DOMException and structuredClone globals to leaks module
- [#1019](https://github.com/hapijs/lab/issues/1019) DOMException will be a global in Node.js 17+

### [v24.3.2](https://github.com/hapijs/lab/milestone/184) {#v24.3.2}

- [#1016](https://github.com/hapijs/lab/pull/1016) fix: never instrument eslint configs for coverage

### [v24.3.1](https://github.com/hapijs/lab/milestone/183) {#v24.3.1}

- [#1015](https://github.com/hapijs/lab/pull/1015) fix: correct semver range for @hapi/eslint-plugin

### [v24.3.0](https://github.com/hapijs/lab/milestone/182) {#v24.3.0}

- [#1014](https://github.com/hapijs/lab/pull/1014) Add eslint configuration
- [#1013](https://github.com/hapijs/lab/pull/1013) Add eslint-plugin module config to lint/coverage feature
- [#1012](https://github.com/hapijs/lab/issues/1012) Use the new module ESLint configuration

## Version 22 {#v22}

### [22.0.4](https://github.com/hapijs/lab/milestone/175) {#22.0.4}

- [#975](https://github.com/hapijs/lab/pull/975) Replace mkdirp with Fs.mkdirSync with recursive: true
- [#974](https://github.com/hapijs/lab/issues/974) Vulnerability in a dep of mkdirp

### [22.0.3](https://github.com/hapijs/lab/milestone/174) {#22.0.3}

- [#968](https://github.com/hapijs/lab/issues/968) Update deps

### [22.0.2](https://github.com/hapijs/lab/milestone/173) <span class="breaking-badge"></span> {#22.0.2}

- [#963](https://github.com/hapijs/lab/issues/963) Record retries
- [#962](https://github.com/hapijs/lab/issues/962) Replace Espree with babel-eslint

### [22.0.1](https://github.com/hapijs/lab/milestone/172) {#22.0.1}

- [#961](https://github.com/hapijs/lab/issues/961) Update es lint version

### [22.0.0](https://github.com/hapijs/lab/milestone/171) <span class="breaking-badge"></span> {#22.0.0}

- [#960](https://github.com/hapijs/lab/issues/960) Drop node 10
- [#959](https://github.com/hapijs/lab/issues/959) Update lint rules
- [#957](https://github.com/hapijs/lab/pull/957) update test assertion for node core changes
- [#955](https://github.com/hapijs/lab/pull/955) TS: String object type -&gt; string literal type
- [#954](https://github.com/hapijs/lab/pull/954) TS: Uses an inferred generic on flags.mustCall

## Version 21 {#v21}

### [21.0.0](https://github.com/hapijs/lab/milestone/170) <span class="breaking-badge"></span> {#21.0.0}

- [#950](https://github.com/hapijs/lab/issues/950) Update types
- [#949](https://github.com/hapijs/lab/issues/949) Drop node 8

## Version 20 {#v20}

### [20.4.0](https://github.com/hapijs/lab/milestone/169) {#20.4.0}

- [#948](https://github.com/hapijs/lab/issues/948) Tags to skip types test line execution
- [#945](https://github.com/hapijs/lab/issues/945) coverage-all option triggers TypeError: Cannot set property 'source' of undefined

### [20.3.2](https://github.com/hapijs/lab/milestone/168) {#20.3.2}

- [#943](https://github.com/hapijs/lab/issues/943) Fails to load npm modules in ts tests

### [20.3.1](https://github.com/hapijs/lab/milestone/167) {#20.3.1}

- [#942](https://github.com/hapijs/lab/issues/942) Support types test execution on windows

### [20.3.0](https://github.com/hapijs/lab/milestone/166) {#20.3.0}

- [#941](https://github.com/hapijs/lab/issues/941) External modules coverage fails on windows due to path
- [#940](https://github.com/hapijs/lab/issues/940) Run TS tests, not just validate them
- [#924](https://github.com/hapijs/lab/issues/924) New diff is broken
- [#856](https://github.com/hapijs/lab/issues/856) coverage analysis modifies a function return

### [20.2.2](https://github.com/hapijs/lab/milestone/165) {#20.2.2}

- [#938](https://github.com/hapijs/lab/issues/938) Stupid typescript

### [20.2.1](https://github.com/hapijs/lab/milestone/164) {#20.2.1}

- [#937](https://github.com/hapijs/lab/issues/937) Support coverage of external modules with own coverage reports

### [20.1.0](https://github.com/hapijs/lab/milestone/162) {#20.1.0}

- [#936](https://github.com/hapijs/lab/issues/936) Ignore symbol leaks

### [20.0.0](https://github.com/hapijs/lab/milestone/163) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/933" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#20.0.0}

- [#933](https://github.com/hapijs/lab/issues/933) Update to eslint 6
- [#932](https://github.com/hapijs/lab/issues/932) Single line coverage ignore

## Version 19 {#v19}

### [19.1.0](https://github.com/hapijs/lab/milestone/161) {#19.1.0}

- [#926](https://github.com/hapijs/lab/pull/926) Implement coverage bypass stack
- [#923](https://github.com/hapijs/lab/pull/923) Support multiple "only" flags
- [#922](https://github.com/hapijs/lab/issues/922) Support for multiple "only"
- [#904](https://github.com/hapijs/lab/issues/904) Add affordance for coverage flag stack

### [19.0.1](https://github.com/hapijs/lab/milestone/160) {#19.0.1}

- [#921](https://github.com/hapijs/lab/issues/921) Handle ts "Cannot find name" error when expected

### [19.0.0](https://github.com/hapijs/lab/milestone/159) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/920" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#19.0.0}

- [#920](https://github.com/hapijs/lab/issues/920) 19.0.0 Release Notes
- [#919](https://github.com/hapijs/lab/issues/919) Change console reporter labels
- [#918](https://github.com/hapijs/lab/issues/918) Typescript test support
- [#917](https://github.com/hapijs/lab/issues/917) Remove debug-brk
- [#916](https://github.com/hapijs/lab/issues/916) Global leak detector skips Symbol() properties
- [#915](https://github.com/hapijs/lab/pull/915) Use util.inspect() for console reporter
- [#914](https://github.com/hapijs/lab/issues/914) "console" reporter crashes if object contains a BigInt
- [#572](https://github.com/hapijs/lab/issues/572) No mismatch highlighted on -0 !== 0 deep equality mismatch

## Version 18 {#v18}

### [18.1.2](https://github.com/hapijs/lab/milestone/158) {#18.1.2}

- [#913](https://github.com/hapijs/lab/issues/913) Update lint rules modules
- [#912](https://github.com/hapijs/lab/issues/912) Add globalThis to symbols

### [18.1.1](https://github.com/hapijs/lab/milestone/157) {#18.1.1}

- [#911](https://github.com/hapijs/lab/issues/911) Update code

### [18.1.0](https://github.com/hapijs/lab/milestone/156) {#18.1.0}

- [#910](https://github.com/hapijs/lab/issues/910) Change module namespace

### [18.0.2](https://github.com/hapijs/lab/milestone/155) {#18.0.2}

- [#905](https://github.com/hapijs/lab/issues/905) Update deps

### [18.0.1](https://github.com/hapijs/lab/milestone/154) {#18.0.1}

- [#898](https://github.com/hapijs/lab/pull/898) Switch back to Hoek.clone from lodash.deepClone.
- [#895](https://github.com/hapijs/lab/pull/895) Fix coverage with sourcemaps inlined via Transform API.

### [18.0.0](https://github.com/hapijs/lab/milestone/152) <span class="breaking-badge"></span> {#18.0.0}

- [#894](https://github.com/hapijs/lab/pull/894) Have correct exit code with multiple reporters
- [#893](https://github.com/hapijs/lab/pull/893) Properly propagate term sig to child lab process
- [#892](https://github.com/hapijs/lab/pull/892) Add note about how to get a tests ID
- [#891](https://github.com/hapijs/lab/pull/891) Update eslint version
- [#890](https://github.com/hapijs/lab/pull/890) Remove deprecated espree option
- [#889](https://github.com/hapijs/lab/pull/889) Remove docs about custom linter option
- [#888](https://github.com/hapijs/lab/pull/888) Compare coverage pattern to canonical path
- [#885](https://github.com/hapijs/lab/pull/885) Centralize espree options
- [#884](https://github.com/hapijs/lab/pull/884) Remove old parallel flag from test
- [#883](https://github.com/hapijs/lab/pull/883) Use correct gray color code
- [#882](https://github.com/hapijs/lab/pull/882) Add missing coverage and remove unnecessary checks
- [#878](https://github.com/hapijs/lab/pull/878) Fix false-positive coverage of if statements (REDUCES REPORTED COVERAGE!)
- [#855](https://github.com/hapijs/lab/issues/855) Update linter configuration?
- [#852](https://github.com/hapijs/lab/issues/852) Console reporter: "gray" is actually light green
- [#842](https://github.com/hapijs/lab/issues/842) Coverage fails for multiple conditionals on same line (logical operators)
- [#788](https://github.com/hapijs/lab/issues/788) Documentation on using --id
- [#762](https://github.com/hapijs/lab/issues/762) Request to consolidate parsers
- [#758](https://github.com/hapijs/lab/issues/758) CLI failure test doesn't appear to test what it claims

## Version 17 {#v17}

### [17.3.0](https://github.com/hapijs/lab/milestone/153) {#17.3.0}

- [#881](https://github.com/hapijs/lab/pull/881) Add coverage-pattern option
- [#880](https://github.com/hapijs/lab/issues/880) Remove engines
- [#853](https://github.com/hapijs/lab/issues/853) Coverage being analized on the test file

### [17.2.0](https://github.com/hapijs/lab/milestone/151) {#17.2.0}

- [#879](https://github.com/hapijs/lab/pull/879) Check file pattern on coverage traversal
- [#877](https://github.com/hapijs/lab/pull/877) Add --coverage-all option
- [#710](https://github.com/hapijs/lab/issues/710) setting coverage-path doesn't include all code in path

### [17.1.0](https://github.com/hapijs/lab/milestone/150) {#17.1.0}

- [#876](https://github.com/hapijs/lab/pull/876) Update dependencies
- [#875](https://github.com/hapijs/lab/pull/875) Revert console cov report truncation
- [#871](https://github.com/hapijs/lab/pull/871) Improve console coverage report readability

### [17.0.4](https://github.com/hapijs/lab/milestone/149) {#17.0.4}

- [#874](https://github.com/hapijs/lab/issues/874) Update hoek v6

### [17.0.3](https://github.com/hapijs/lab/milestone/148) {#17.0.3}

- [#873](https://github.com/hapijs/lab/issues/873) Fails to handle non-Error errors
- [#870](https://github.com/hapijs/lab/pull/870) Update type definitions to match documented API

### [17.0.2](https://github.com/hapijs/lab/milestone/147) {#17.0.2}

- [#869](https://github.com/hapijs/lab/pull/869) [ENHANCEMENT] Nullified test context on finish to prevent memory leaks
- [#868](https://github.com/hapijs/lab/issues/868) Possible context memory leak?

### [17.0.1](https://github.com/hapijs/lab/milestone/146) {#17.0.1}

- [#867](https://github.com/hapijs/lab/pull/867) No longer skip scripts when multiple only

### [17.0.0](https://github.com/hapijs/lab/milestone/145) <span class="breaking-badge"></span> {#17.0.0}

- [#866](https://github.com/hapijs/lab/pull/866) Add node 11 to travis
- [#865](https://github.com/hapijs/lab/pull/865) handle queueMicrotask global added in Node 11
- [#864](https://github.com/hapijs/lab/pull/864) Add testsuites output to junit
- [#863](https://github.com/hapijs/lab/pull/863) Upgrade source-map and support limited sourcemap descriptors
- [#860](https://github.com/hapijs/lab/pull/860) Fixed skipped console output color
- [#846](https://github.com/hapijs/lab/pull/846) Only is no longer limited to 1 test
- [#845](https://github.com/hapijs/lab/issues/845) junit report generated has both classname and the name as "classname + ' ' + name".
- [#750](https://github.com/hapijs/lab/issues/750) html reporter errors when encountering sourcemap chunks with typescript

## Version 16 {#v16}

### [16.1.0](https://github.com/hapijs/lab/milestone/144) {#16.1.0}

- [#858](https://github.com/hapijs/lab/pull/858) Update ecmaversion in eslint
- [#851](https://github.com/hapijs/lab/pull/851) Fix stack trace trimming
- [#850](https://github.com/hapijs/lab/pull/850) Document `paths` parameter in .labrc.js

### [16.0.0](https://github.com/hapijs/lab/milestone/143) <span class="breaking-badge"></span> {#16.0.0}

- [#849](https://github.com/hapijs/lab/pull/849) Update to eslint v5
- [#844](https://github.com/hapijs/lab/pull/844) Disable dep timeout, which is doc default
- [#843](https://github.com/hapijs/lab/pull/843) Allow custom handling for global errors/rejections
- [#840](https://github.com/hapijs/lab/pull/840) update eslint-config-hapi dependency
- [#782](https://github.com/hapijs/lab/issues/782) Disable "uncaughtException" handler for tests
- [#729](https://github.com/hapijs/lab/issues/729) -M, --context-timeout is ignored; test passed even it is not triggered

## Version 15 {#v15}

### [15.5.0](https://github.com/hapijs/lab/milestone/142) {#15.5.0}

- [#838](https://github.com/hapijs/lab/pull/838) Support test context from befores
- [#837](https://github.com/hapijs/lab/pull/837) Add BigInt globals
- [#836](https://github.com/hapijs/lab/pull/836) Update coverage ECMA version to 9 (2018).

### [15.4.5](https://github.com/hapijs/lab/milestone/141) {#15.4.5}

- [#833](https://github.com/hapijs/lab/pull/833) Add WHATWG Encoding API globals

### [15.4.4](https://github.com/hapijs/lab/milestone/140) {#15.4.4}

- [#831](https://github.com/hapijs/lab/pull/831) Revert "Wait for stdout to stop writing to exit"

### [15.4.3](https://github.com/hapijs/lab/milestone/139) {#15.4.3}

- [#829](https://github.com/hapijs/lab/pull/829) Wait for stdout to stop writing to exit
- [#824](https://github.com/hapijs/lab/pull/824) Calculate relative filename using node's path
- [#823](https://github.com/hapijs/lab/issues/823) Transforming files does not work with yarn workspaces

### [15.4.2](https://github.com/hapijs/lab/milestone/138) {#15.4.2}

- [#830](https://github.com/hapijs/lab/pull/830) Fix coverage on transformed files. Fixes #826.

### [15.4.1](https://github.com/hapijs/lab/milestone/137) {#15.4.1}

- [#821](https://github.com/hapijs/lab/pull/821) Update eslint
- [#820](https://github.com/hapijs/lab/pull/820) Ignore default-plan-threshold for anything else than tests

### [15.4.0](https://github.com/hapijs/lab/milestone/135) {#15.4.0}

- [#819](https://github.com/hapijs/lab/pull/819) Implement minimum assertions threshold. Closes #690.
- [#690](https://github.com/hapijs/lab/issues/690) Allow to specify minimum number of executed assertions

### [15.3.1](https://github.com/hapijs/lab/milestone/134) {#15.3.1}

- [#816](https://github.com/hapijs/lab/pull/816) Bump diff to 3.5

### [15.3.0](https://github.com/hapijs/lab/milestone/133) {#15.3.0}

- [#815](https://github.com/hapijs/lab/pull/815) Update eslint dep
- [#813](https://github.com/hapijs/lab/pull/813) Fail test if a falsy value is thrown by the test
- [#812](https://github.com/hapijs/lab/issues/812) awaiting a rejected promise can still pass test
- [#811](https://github.com/hapijs/lab/pull/811) Can exclude files from coverage

### [15.2.2](https://github.com/hapijs/lab/milestone/132) {#15.2.2}

- [#810](https://github.com/hapijs/lab/pull/810) Write CLI errors to stderr
- [#809](https://github.com/hapijs/lab/pull/809) Update eslint version
- [#808](https://github.com/hapijs/lab/pull/808) add URL and URLSearchParams to global variables
- [#399](https://github.com/hapijs/lab/issues/399) Missing exports.lab causes error when generating html coverage report

### [15.2.1](https://github.com/hapijs/lab/milestone/131) {#15.2.1}

- [#807](https://github.com/hapijs/lab/pull/807) Report correct exit code with multiple reporters
- [#806](https://github.com/hapijs/lab/pull/806) Add multiple reporter tests
- [#805](https://github.com/hapijs/lab/pull/805) Update eslint version
- [#804](https://github.com/hapijs/lab/issues/804) Using multiple reporters results into wrong exit code if test fails

### [15.2.0](https://github.com/hapijs/lab/milestone/129) {#15.2.0}

- [#803](https://github.com/hapijs/lab/pull/803) Update eslint
- [#802](https://github.com/hapijs/lab/pull/802) Support object rest/spread under eslint
- [#801](https://github.com/hapijs/lab/pull/801) update to use expect from code
- [#797](https://github.com/hapijs/lab/pull/797) Update TypeScript typings
- [#794](https://github.com/hapijs/lab/pull/794) Fix usage example of flags.onCleanup
- [#793](https://github.com/hapijs/lab/pull/793) Added index.d.ts to npmignore
- [#786](https://github.com/hapijs/lab/pull/786) Add mustCall feature
- [#784](https://github.com/hapijs/lab/pull/784) Updated readme to include alias of ignore
- [#641](https://github.com/hapijs/lab/issues/641) ignore setting not supported in .labrc.js

### [15.1.2](https://github.com/hapijs/lab/milestone/128) {#15.1.2}

- [#783](https://github.com/hapijs/lab/pull/783) Fix for node 9
- [#779](https://github.com/hapijs/lab/pull/779) Remove outdated assert statements
- [#778](https://github.com/hapijs/lab/issues/778) assertion library "code" is not set by default / documentation is wrong
- [#748](https://github.com/hapijs/lab/issues/748) New globals are coming

### [15.1.1](https://github.com/hapijs/lab/milestone/127) {#15.1.1}

- [#776](https://github.com/hapijs/lab/pull/776) Fix test script error duplicates

### [15.1.0](https://github.com/hapijs/lab/milestone/126) {#15.1.0}

- [#774](https://github.com/hapijs/lab/pull/774) Update eslint
- [#772](https://github.com/hapijs/lab/pull/772) Remove code as default assertion library. Resolves #771
- [#769](https://github.com/hapijs/lab/pull/769) Display parser errors when requiring scripts
- [#768](https://github.com/hapijs/lab/pull/768) Update README.md

### [15.0.0](https://github.com/hapijs/lab/milestone/125) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/770" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#15.0.0}

- [#770](https://github.com/hapijs/lab/issues/770) 15.0.0 Release Notes
- [#766](https://github.com/hapijs/lab/pull/766) Remove domains and callbacks
- [#765](https://github.com/hapijs/lab/issues/765) Use of onCleanup() when test returns a promise
- [#752](https://github.com/hapijs/lab/issues/752) Remove domains in favor of try/catch on async/await

## Version 14 {#v14}

### [14.3.3](https://github.com/hapijs/lab/milestone/130) {#14.3.3}

- [#817](https://github.com/hapijs/lab/pull/817) Bump diff to 3.5 (v14.x.x)

### [14.3.2](https://github.com/hapijs/lab/milestone/124) {#14.3.2}

- [#792](https://github.com/hapijs/lab/pull/792) Fix for node 9
- [#763](https://github.com/hapijs/lab/pull/763) Update deps: eslint, source-map
- [#760](https://github.com/hapijs/lab/pull/760) Helpful message when path not found
- [#759](https://github.com/hapijs/lab/issues/759) More helpful message when test path not found

### [14.3.1](https://github.com/hapijs/lab/milestone/123) {#14.3.1}

- [#755](https://github.com/hapijs/lab/pull/755) Fix RangeError for --id when skipping a large number of tests

### [14.3.0](https://github.com/hapijs/lab/milestone/122) {#14.3.0}

- [#749](https://github.com/hapijs/lab/pull/749) update eslint parser version to 8
- [#746](https://github.com/hapijs/lab/pull/746) #647 add example of multiple reporters in .labrc.js

### [14.2.2](https://github.com/hapijs/lab/milestone/121) {#14.2.2}

- [#745](https://github.com/hapijs/lab/pull/745) Update deps: eslint/supports-color
- [#744](https://github.com/hapijs/lab/pull/744) Better color detection

### [14.2.1](https://github.com/hapijs/lab/milestone/120) {#14.2.1}

- [#743](https://github.com/hapijs/lab/pull/743) Document verbosity value
- [#742](https://github.com/hapijs/lab/pull/742) Fix readme linting issues
- [#740](https://github.com/hapijs/lab/pull/740) add object spread option
- [#739](https://github.com/hapijs/lab/issues/739) Coverage is broken when using object spread operator
- [#737](https://github.com/hapijs/lab/issues/737) Please add an explanation of verbosity; what does 'verbosity: 3.00' mean?

### [14.2.0](https://github.com/hapijs/lab/milestone/119) {#14.2.0}

- [#735](https://github.com/hapijs/lab/pull/735) Document definition file
- [#734](https://github.com/hapijs/lab/pull/734) Add TypeScript definition file
- [#731](https://github.com/hapijs/lab/issues/731) Typescript support

### [14.1.2](https://github.com/hapijs/lab/milestone/118) {#14.1.2}

- [#733](https://github.com/hapijs/lab/pull/733) Update dependencies: eslint, espree
- [#732](https://github.com/hapijs/lab/pull/732) Be explicit about errors thrown in before/afters
- [#728](https://github.com/hapijs/lab/issues/728) Help: Multiple callbacks error with mongo AND lab.before

### [14.1.1](https://github.com/hapijs/lab/milestone/117) {#14.1.1}

- [#727](https://github.com/hapijs/lab/pull/727) Fix failing test
- [#726](https://github.com/hapijs/lab/pull/726) Fix npm 5.2 error

### [14.1.0](https://github.com/hapijs/lab/milestone/116) {#14.1.0}

- [#722](https://github.com/hapijs/lab/pull/722) Expose Code features directly on script
- [#721](https://github.com/hapijs/lab/pull/721) Failed befores properly fail related tests
- [#370](https://github.com/hapijs/lab/issues/370) Fail conditions documentation is unclear

### [14.0.1](https://github.com/hapijs/lab/milestone/115) {#14.0.1}

- [#720](https://github.com/hapijs/lab/pull/720) Support eslint 4 ignore path

### [14.0.0](https://github.com/hapijs/lab/milestone/114) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/719" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#14.0.0}

- [#719](https://github.com/hapijs/lab/issues/719) 14.0.0 Release Notes
- [#718](https://github.com/hapijs/lab/pull/718) Error on tests with both promise and callback
- [#717](https://github.com/hapijs/lab/pull/717) Update eslint/code versions
- [#715](https://github.com/hapijs/lab/issues/715) Upgrade to ESLint v4
- [#713](https://github.com/hapijs/lab/pull/713) Bundle code as default assertion library
- [#712](https://github.com/hapijs/lab/issues/712) Include code assertion library
- [#580](https://github.com/hapijs/lab/issues/580) Confusing warning when mixing Promise and callback style

## Version 13 {#v13}

### [13.1.0](https://github.com/hapijs/lab/milestone/113) {#13.1.0}

- [#707](https://github.com/hapijs/lab/pull/707) Update espree version
- [#706](https://github.com/hapijs/lab/pull/706) upgrade eslint to 3.19.x
- [#705](https://github.com/hapijs/lab/issues/705) Error when doing code coverage: "ecmaVersion must be 3, 5, 6, or 7."
- [#704](https://github.com/hapijs/lab/pull/704) Add WebAssembly to allowed globals
- [#697](https://github.com/hapijs/lab/issues/697) Node 8 will add `WebAssembly` global

### [13.0.4](https://github.com/hapijs/lab/milestone/112) {#13.0.4}

- [#701](https://github.com/hapijs/lab/pull/701) Ignore while a promise returns inside a test with a value. Only watch for rejection
- [#700](https://github.com/hapijs/lab/issues/700) Promises that return values now error on finished

### [13.0.3](https://github.com/hapijs/lab/milestone/111) {#13.0.3}

- [#699](https://github.com/hapijs/lab/pull/699) Fix a domain leak and onCleanup failures

### [13.0.2](https://github.com/hapijs/lab/milestone/110) {#13.0.2}

- [#698](https://github.com/hapijs/lab/pull/698) Improve bail strategy not to execute next befores/afters
- [#696](https://github.com/hapijs/lab/issues/696) Extending linting
- [#693](https://github.com/hapijs/lab/issues/693) plan and Lab.assertions not working
- [#689](https://github.com/hapijs/lab/pull/689) Fix test
- [#688](https://github.com/hapijs/lab/pull/688) Add failing test for conditional value

### [13.0.1](https://github.com/hapijs/lab/milestone/109) {#13.0.1}

- [#686](https://github.com/hapijs/lab/pull/686) Fix coverage of zero-comment scripts
- [#685](https://github.com/hapijs/lab/issues/685) TypeError: Reduce of empty array with no initial value

### [13.0.0](https://github.com/hapijs/lab/milestone/108) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/684" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#13.0.0}

- [#684](https://github.com/hapijs/lab/issues/684) 13.0.0 Release Notes
- [#683](https://github.com/hapijs/lab/pull/683) Minor cleanup
- [#681](https://github.com/hapijs/lab/pull/681) Reduce leaked memory via domains and timers
- [#677](https://github.com/hapijs/lab/pull/677) Update eslint version
- [#648](https://github.com/hapijs/lab/pull/648) Original files in HTML reporter
- [#614](https://github.com/hapijs/lab/issues/614) Test coverage shows untransformed output

## Version 12 {#v12}

### [12.1.0](https://github.com/hapijs/lab/milestone/107) {#12.1.0}

- [#674](https://github.com/hapijs/lab/pull/674) Typos and inspect supports port
- [#673](https://github.com/hapijs/lab/pull/673) Add support for Node.js and WebStorm debuggers
- [#651](https://github.com/hapijs/lab/issues/651) Implement --inspect so debugging inside a test is possible?

### [12.0.0](https://github.com/hapijs/lab/milestone/106) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/672" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#12.0.0}

- [#672](https://github.com/hapijs/lab/issues/672) 12.0.0 Release Notes
- [#671](https://github.com/hapijs/lab/pull/671) Add --bail support
- [#670](https://github.com/hapijs/lab/pull/670) upgrade espree parser to use ECMAScript latest 8
- [#668](https://github.com/hapijs/lab/issues/668) .labrc.js with --harmony options execute failed
- [#640](https://github.com/hapijs/lab/issues/640) cli `--help` command showing incorrect commands
- [#214](https://github.com/hapijs/lab/issues/214) Stop Tests On First Failure

## Version 11 {#v11}

### [11.2.2](https://github.com/hapijs/lab/milestone/105) {#11.2.2}

- [#666](https://github.com/hapijs/lab/pull/666) Update eslint
- [#665](https://github.com/hapijs/lab/pull/665) Fix test and deprecation warning
- [#664](https://github.com/hapijs/lab/pull/664) Update eslint version

### [11.2.1](https://github.com/hapijs/lab/milestone/104) {#11.2.1}

- [#662](https://github.com/hapijs/lab/pull/662) fix: don't show seed when shuffle was not enabled

### [11.2.0](https://github.com/hapijs/lab/milestone/103) {#11.2.0}

- [#659](https://github.com/hapijs/lab/pull/659) Node 7, update deps
- [#658](https://github.com/hapijs/lab/pull/658) Added a flag (-R, --rejections) to make the test fail if an unhandled Promise rejection happened during its execution
- [#657](https://github.com/hapijs/lab/pull/657) feat: allow to set the seed for --shuffle with --seed.
- [#656](https://github.com/hapijs/lab/issues/656) when tests fail with `--shuffle`, how to run tests in the failing order?
- [#654](https://github.com/hapijs/lab/pull/654) Update eslint to 3.9.x
- [#653](https://github.com/hapijs/lab/pull/653) fixes logic for lab.before timeout #652
- [#652](https://github.com/hapijs/lab/issues/652) disable lab before timeout
- [#649](https://github.com/hapijs/lab/issues/649) Make the test fail on a Promise unhandled rejection

### [11.1.0](https://github.com/hapijs/lab/milestone/102) {#11.1.0}

- [#646](https://github.com/hapijs/lab/pull/646) Update deps: eslint, diff
- [#645](https://github.com/hapijs/lab/pull/645) Update eslint
- [#644](https://github.com/hapijs/lab/pull/644) fixing invalid markup on filter checkboxes
- [#643](https://github.com/hapijs/lab/pull/643) Docs: Fix URL in CONTRIBUTING.md
- [#639](https://github.com/hapijs/lab/pull/639) Docs: Added documentation for the assert argument
- [#634](https://github.com/hapijs/lab/issues/634) The `assert` command line flag should be properly documented

### [11.0.1](https://github.com/hapijs/lab/milestone/101) {#11.0.1}

- [#630](https://github.com/hapijs/lab/pull/630) Disable debug mode by default
- [#629](https://github.com/hapijs/lab/issues/629) Failed tests reported twice

### [11.0.0](https://github.com/hapijs/lab/milestone/100) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/624" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#11.0.0}

- [#624](https://github.com/hapijs/lab/issues/624) 11.0.0 Release Notes
- [#622](https://github.com/hapijs/lab/pull/622) Test entire node range before bypassing
- [#621](https://github.com/hapijs/lab/pull/621) Update eslint dep
- [#620](https://github.com/hapijs/lab/pull/620) Ensure we're not bypassing loc that should be covered
- [#619](https://github.com/hapijs/lab/pull/619) update to eslint-config-hapi@10.x.x
- [#459](https://github.com/hapijs/lab/issues/459) `/* `$lab:coverage:(off|on)$` */` disables coverage for a whole module

## Version 10 {#v10}

### [10.9.0](https://github.com/hapijs/lab/milestone/99) {#10.9.0}

- [#615](https://github.com/hapijs/lab/issues/615) Upgrade eslint to v3
- [#613](https://github.com/hapijs/lab/pull/613) labrc.js can override all cli options
- [#611](https://github.com/hapijs/lab/pull/611) closes #610
- [#610](https://github.com/hapijs/lab/issues/610) Upgrade to eslint@2.13.x
- [#609](https://github.com/hapijs/lab/issues/609) some options can't be configured with .labrc.js

### [10.8.2](https://github.com/hapijs/lab/milestone/98) {#10.8.2}

- [#608](https://github.com/hapijs/lab/pull/608) Fix NODE_ENV not being set (fixes #606)
- [#606](https://github.com/hapijs/lab/issues/606) NODE_ENV is no longer defaulting to 'test'

### [10.8.1](https://github.com/hapijs/lab/milestone/97) {#10.8.1}

- [#603](https://github.com/hapijs/lab/pull/603) Display a warning for failed patterns
- [#511](https://github.com/hapijs/lab/issues/511) Show better error message when -P fails to find matching patterns

### [10.8.0](https://github.com/hapijs/lab/milestone/96) {#10.8.0}

- [#601](https://github.com/hapijs/lab/pull/601) Support .labrc.js for configuration
- [#599](https://github.com/hapijs/lab/pull/599) Cleanup leak harmony checks
- [#598](https://github.com/hapijs/lab/issues/598) Support .labrc files for configuration defaults

### [10.7.1](https://github.com/hapijs/lab/milestone/95) {#10.7.1}

- [#597](https://github.com/hapijs/lab/pull/597) Add space after failed test x
- [#596](https://github.com/hapijs/lab/pull/596) Adjust gray to comply with solarized dark theme

### [10.7.0](https://github.com/hapijs/lab/milestone/94) {#10.7.0}

- [#595](https://github.com/hapijs/lab/pull/595) Update eslint to v2.10.x
- [#594](https://github.com/hapijs/lab/pull/594) Cleanup lint-fix setting
- [#593](https://github.com/hapijs/lab/pull/593) Support ability to add notes to a test
- [#591](https://github.com/hapijs/lab/pull/591) Add --lint-fix option.
- [#402](https://github.com/hapijs/lab/issues/402) Add ability to attach notes to test results

### [10.6.1](https://github.com/hapijs/lab/milestone/93) {#10.6.1}

- [#589](https://github.com/hapijs/lab/pull/589) Update to code v3
- [#588](https://github.com/hapijs/lab/pull/588) Make coverage excludes more explicit
- [#587](https://github.com/hapijs/lab/pull/587) Support the same test name in diff experiments
- [#461](https://github.com/hapijs/lab/issues/461) File Name Coverage Issue
- [#375](https://github.com/hapijs/lab/issues/375) Experiment description not showing in output

### [10.6.0](https://github.com/hapijs/lab/milestone/92) {#10.6.0}

- [#586](https://github.com/hapijs/lab/pull/586) Default output to stdout
- [#585](https://github.com/hapijs/lab/pull/585) Document how to only run linting
- [#584](https://github.com/hapijs/lab/pull/584) Don't execute before/after on experiments that lack tests
- [#583](https://github.com/hapijs/lab/pull/583) Better documentation for schedule
- [#559](https://github.com/hapijs/lab/issues/559) Run linting only
- [#440](https://github.com/hapijs/lab/issues/440) before and after blocks
- [#390](https://github.com/hapijs/lab/issues/390) Enable output for single-file usage
- [#337](https://github.com/hapijs/lab/issues/337) Skipped tests should have their beforeEach() skipped too?
- [#288](https://github.com/hapijs/lab/issues/288) self-run scripts don't generate output or respect CLI arguments

### [10.5.1](https://github.com/hapijs/lab/milestone/91) {#10.5.1}

- [#579](https://github.com/hapijs/lab/issues/579) Promise test check should allow more than one argument

### [10.5.0](https://github.com/hapijs/lab/milestone/90) {#10.5.0}

- [#578](https://github.com/hapijs/lab/pull/578) Post test cleanup. Closes #577
- [#577](https://github.com/hapijs/lab/issues/577) Post test cleanup
- [#576](https://github.com/hapijs/lab/pull/576) Support bossy 3

### [10.4.0](https://github.com/hapijs/lab/milestone/89) {#10.4.0}

- [#575](https://github.com/hapijs/lab/pull/575) Update dependencies
- [#574](https://github.com/hapijs/lab/pull/574) id-557: Error thrown when I use --coverage-exclude
- [#573](https://github.com/hapijs/lab/pull/573) use stable stringify for better objects diff
- [#557](https://github.com/hapijs/lab/issues/557) Error thrown when I use --coverage-exclude

### [10.3.2](https://github.com/hapijs/lab/milestone/88) {#10.3.2}

- [#570](https://github.com/hapijs/lab/pull/570) Works correctly with node v6
- [#569](https://github.com/hapijs/lab/pull/569) Add Reflect to whitelist
- [#568](https://github.com/hapijs/lab/issues/568) leaks detected:Reflect using node v6.0.0

### [10.3.1](https://github.com/hapijs/lab/milestone/87) {#10.3.1}

- [#556](https://github.com/hapijs/lab/pull/556) Code coverage: Always surround expressions in ternary operator with parenthesis
- [#555](https://github.com/hapijs/lab/issues/555) Code coverage for conditional operator with comma operator isn't handled correctly
- [#554](https://github.com/hapijs/lab/pull/554) Update eslint to v2.5
- [#548](https://github.com/hapijs/lab/pull/548) Update README.md

### [10.3.0](https://github.com/hapijs/lab/milestone/86) {#10.3.0}

- [#545](https://github.com/hapijs/lab/pull/545) Update deps and fix flushing to stdout
- [#544](https://github.com/hapijs/lab/pull/544) Feature/silent skips
- [#541](https://github.com/hapijs/lab/pull/541) Allow stdout to flush

### [10.2.0](https://github.com/hapijs/lab/milestone/85) {#10.2.0}

- [#538](https://github.com/hapijs/lab/pull/538) Add `plan` option for tests
- [#257](https://github.com/hapijs/lab/issues/257) Set expected number of assertions

### [10.1.0](https://github.com/hapijs/lab/milestone/84) {#10.1.0}

- [#537](https://github.com/hapijs/lab/pull/537) Feature: promises
- [#536](https://github.com/hapijs/lab/issues/536) Support promises in tests and setup / teardown
- [#534](https://github.com/hapijs/lab/pull/534) Fix "multiple only" error with multiple outputs
- [#533](https://github.com/hapijs/lab/pull/533) Update readme for global only

### [10.0.0](https://github.com/hapijs/lab/milestone/83) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/530" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#10.0.0}

- [#530](https://github.com/hapijs/lab/issues/530) 10.0.0 Release Notes
- [#527](https://github.com/hapijs/lab/pull/527) Global "only" (#524)
- [#524](https://github.com/hapijs/lab/issues/524) Add a global `only` flag to improve TDD experience

## Version 9 {#v9}

### [9.1.0](https://github.com/hapijs/lab/milestone/82) {#9.1.0}

- [#525](https://github.com/hapijs/lab/pull/525) Support shuffling execution of scripts

### [9.0.0](https://github.com/hapijs/lab/milestone/81) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/523" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#9.0.0}

- [#523](https://github.com/hapijs/lab/issues/523) 9.0.0 Release Notes
- [#522](https://github.com/hapijs/lab/pull/522) Remove jslint and support custom linters
- [#507](https://github.com/hapijs/lab/issues/507) Add JavaScript Standard Style (`standard`) as a linter option
- [#282](https://github.com/hapijs/lab/issues/282) Make linter pluggable? (PR offer)

## Version 8 {#v8}

### [8.4.0](https://github.com/hapijs/lab/milestone/80) {#8.4.0}

- [#521](https://github.com/hapijs/lab/pull/521) Fix coverage of trailing function declaration
- [#520](https://github.com/hapijs/lab/pull/520) Fix coverage report for single-line functions and single-expression arrow functions
- [#274](https://github.com/hapijs/lab/issues/274) Single line functions are not property tested for coverage

### [8.3.0](https://github.com/hapijs/lab/milestone/79) {#8.3.0}

- [#519](https://github.com/hapijs/lab/pull/519) update to eslint@2.x.x

### [8.2.0](https://github.com/hapijs/lab/milestone/78) {#8.2.0}

- [#516](https://github.com/hapijs/lab/pull/516) upgrade to espree@3.x.x

### [8.1.0](https://github.com/hapijs/lab/milestone/77) {#8.1.0}

- [#515](https://github.com/hapijs/lab/pull/515) enable parsing the spread operator
- [#514](https://github.com/hapijs/lab/issues/514) use of the spread operator breaks coverage

### [8.0.2](https://github.com/hapijs/lab/milestone/76) {#8.0.2}

- [#510](https://github.com/hapijs/lab/pull/510) Fix coverage when require cache is reset
- [#508](https://github.com/hapijs/lab/issues/508) --coverage-exclude should support multiple paths
- [#505](https://github.com/hapijs/lab/issues/505) Coverage calculated wrong.

### [8.0.1](https://github.com/hapijs/lab/milestone/75) {#8.0.1}

- [#504](https://github.com/hapijs/lab/issues/504) Lab .eslintrc rules overrides local eslint rules.
- [#503](https://github.com/hapijs/lab/pull/503) Fix eslint configuration file format support.
- [#500](https://github.com/hapijs/lab/pull/500) fix diff text visibility for console reporter
- [#493](https://github.com/hapijs/lab/issues/493) Diff colors render diff text unreadable

### [8.0.0](https://github.com/hapijs/lab/milestone/74) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/499" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#8.0.0}

- [#499](https://github.com/hapijs/lab/issues/499) 8.0.0 release notes
- [#498](https://github.com/hapijs/lab/pull/498) Update dependencies
- [#496](https://github.com/hapijs/lab/pull/496) update to eslint-config-hapi@8.x.x
- [#495](https://github.com/hapijs/lab/pull/495) Add objectLiteralShorthandMethods to supported ES6 features
- [#492](https://github.com/hapijs/lab/pull/492) Update dependencies items and eslint
- [#491](https://github.com/hapijs/lab/issues/491) Coverage reporting does not support parsing ES6 objectLiteralComputedProperties
- [#487](https://github.com/hapijs/lab/pull/487) Es6-ify the README examples
- [#479](https://github.com/hapijs/lab/issues/479) Update hapijs/items to 2.0.0 from 1.1.1

## Version 7 {#v7}

### [7.3.0](https://github.com/hapijs/lab/milestone/73) {#7.3.0}

- [#484](https://github.com/hapijs/lab/pull/484) Update linter to include for loop rules

### [7.2.0](https://github.com/hapijs/lab/milestone/72) {#7.2.0}

- [#480](https://github.com/hapijs/lab/pull/480) Update hapi linter dependencies

### [7.1.0](https://github.com/hapijs/lab/milestone/71) {#7.1.0}

- [#478](https://github.com/hapijs/lab/pull/478) Update to use ES6 style and lint rules
- [#477](https://github.com/hapijs/lab/pull/477) Es6
- [#476](https://github.com/hapijs/lab/issues/476) ES6 linting rules
- [#475](https://github.com/hapijs/lab/issues/475) consider testing arg passed to done is an error object

### [7.0.0](https://github.com/hapijs/lab/milestone/70) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/474" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#7.0.0}

- [#474](https://github.com/hapijs/lab/issues/474) 7.0.0 release notes
- [#473](https://github.com/hapijs/lab/pull/473) Remove node 0.10 support
- [#471](https://github.com/hapijs/lab/pull/471) Do not add tracking code before "var" in "for(var x of xs)"
- [#470](https://github.com/hapijs/lab/issues/470) for(var x of xs) is not handled correctly when coverage is turned on

## Version 6 {#v6}

### [6.2.0](https://github.com/hapijs/lab/milestone/69) {#6.2.0}

- [#460](https://github.com/hapijs/lab/pull/460) Add objectLiteralShorthandMethods to supported ES6 features

### [6.1.0](https://github.com/hapijs/lab/milestone/68) {#6.1.0}

- [#457](https://github.com/hapijs/lab/pull/457) Error data

### [6.0.0](https://github.com/hapijs/lab/milestone/67) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/455" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#6.0.0}

- [#455](https://github.com/hapijs/lab/issues/455) 6.0.0 release notes
- [#454](https://github.com/hapijs/lab/pull/454) Update to eslint-config-hapi@3.x.x
- [#453](https://github.com/hapijs/lab/issues/453) Lint warning for unused variables except internals
- [#452](https://github.com/hapijs/lab/pull/452) -V/--version flag to show version
- [#449](https://github.com/hapijs/lab/issues/449) Add --version to CLI

## Version 5 {#v5}

### [5.18.1](https://github.com/hapijs/lab/milestone/66) {#5.18.1}

- [#451](https://github.com/hapijs/lab/pull/451) Rename template for npm publish

### [5.18.0](https://github.com/hapijs/lab/milestone/65) {#5.18.0}

- [#448](https://github.com/hapijs/lab/pull/448) Add linting information and test failures to html
- [#447](https://github.com/hapijs/lab/pull/447) Upgrade deps and avoid relying on unix commands
- [#439](https://github.com/hapijs/lab/issues/439) Document html coverage report source markup

### [5.17.0](https://github.com/hapijs/lab/milestone/64) {#5.17.0}

- [#445](https://github.com/hapijs/lab/pull/445) JSON reporter now supports lint output
- [#443](https://github.com/hapijs/lab/issues/443) add lint results to json reporter

### [5.16.2](https://github.com/hapijs/lab/milestone/63) {#5.16.2}

- [#442](https://github.com/hapijs/lab/pull/442) Update insecure dependencies (eslint, handlebars)
- [#441](https://github.com/hapijs/lab/pull/441) Document coverage ignore syntax, fixes #438

### [5.16.1](https://github.com/hapijs/lab/milestone/62) {#5.16.1}

- [#437](https://github.com/hapijs/lab/issues/437) Drop camelcase lint rule
- [#436](https://github.com/hapijs/lab/pull/436) Update to eslint-config-hapi@2.x.x
- [#433](https://github.com/hapijs/lab/pull/433) Add Infinity to stringify
- [#432](https://github.com/hapijs/lab/pull/432) Updated eslint version

### [5.16.0](https://github.com/hapijs/lab/milestone/61) {#5.16.0}

- [#431](https://github.com/hapijs/lab/pull/431) Add docs for extending lab's linter
- [#429](https://github.com/hapijs/lab/pull/429) Use a shareable config for ESLint
- [#372](https://github.com/hapijs/lab/issues/372) .eslintrc files should build on default settings

### [5.15.2](https://github.com/hapijs/lab/milestone/60) {#5.15.2}

- [#428](https://github.com/hapijs/lab/pull/428) Show invisible tokens on stringify
- [#424](https://github.com/hapijs/lab/pull/424) Fix stack traces when using transforms

### [5.15.1](https://github.com/hapijs/lab/milestone/59) {#5.15.1}

- [#421](https://github.com/hapijs/lab/pull/421) Fix circular JSON for console reporter

### [5.15.0](https://github.com/hapijs/lab/milestone/58) {#5.15.0}

- [#420](https://github.com/hapijs/lab/pull/420) Add command line options to override coverage path and excludes

### [5.14.1](https://github.com/hapijs/lab/milestone/57) {#5.14.1}

- [#416](https://github.com/hapijs/lab/pull/416) Allow custom reporters from CLI
- [#415](https://github.com/hapijs/lab/issues/415) Custom reporters not allowed from cli
- [#414](https://github.com/hapijs/lab/pull/414) Fix test for equal call with extra param
- [#413](https://github.com/hapijs/lab/issues/413) Fix extra params passed to equal that are invalid
- [#412](https://github.com/hapijs/lab/pull/412) Update eslint to 1.0.x

### [5.14.0](https://github.com/hapijs/lab/milestone/56) {#5.14.0}

- [#406](https://github.com/hapijs/lab/pull/406) Fix exit code when multiple reporters encounter a failure
- [#404](https://github.com/hapijs/lab/pull/404) enable more es6 features for Espree
- [#397](https://github.com/hapijs/lab/pull/397) Attach sub-reporters to the multiple reporter
- [#393](https://github.com/hapijs/lab/issues/393) Exit code always 0 with multiple reporters

### [5.13.0](https://github.com/hapijs/lab/milestone/55) {#5.13.0}

- [#395](https://github.com/hapijs/lab/pull/395) Support filename pattern matching in CLI
- [#384](https://github.com/hapijs/lab/issues/384) File name matching glob pattern

### [5.12.1](https://github.com/hapijs/lab/milestone/54) {#5.12.1}

- [#394](https://github.com/hapijs/lab/pull/394) Revert lint rule on spaced comments

### [5.12.0](https://github.com/hapijs/lab/milestone/53) {#5.12.0}

- [#392](https://github.com/hapijs/lab/pull/392) Attach results to the reporter
- [#389](https://github.com/hapijs/lab/pull/389) Multiple reporters and multiple outputs
- [#387](https://github.com/hapijs/lab/pull/387) Update to eslint 0.24.x and add array bracket spacing linting rule
- [#386](https://github.com/hapijs/lab/pull/386) enable code coverage support with ES6
- [#381](https://github.com/hapijs/lab/pull/381) Added space after comment rule

### [5.11.1](https://github.com/hapijs/lab/milestone/52) {#5.11.1}

- [#385](https://github.com/hapijs/lab/pull/385) Support more relaxed no-shadow rule
- [#380](https://github.com/hapijs/lab/pull/380) Update source-map-support to 0.3.x
- [#379](https://github.com/hapijs/lab/issues/379) Shadow lint error going too far

### [5.11.0](https://github.com/hapijs/lab/milestone/51) {#5.11.0}

- [#377](https://github.com/hapijs/lab/pull/377) Remove lint rule for line around comments
- [#376](https://github.com/hapijs/lab/issues/376) Lint too aggressive with empty lines before comments
- [#371](https://github.com/hapijs/lab/pull/371) Use no-shadow lint rule
- [#369](https://github.com/hapijs/lab/issues/369) no-catch-shadow

### [5.10.0](https://github.com/hapijs/lab/milestone/50) {#5.10.0}

- [#368](https://github.com/hapijs/lab/pull/368) Enforce capitalization of imported module variable names
- [#366](https://github.com/hapijs/lab/pull/366) Linting update
- [#365](https://github.com/hapijs/lab/pull/365) Update license attribute
- [#364](https://github.com/hapijs/lab/pull/364) Cleanup repo style

### [5.9.0](https://github.com/hapijs/lab/milestone/49) {#5.9.0}

- [#362](https://github.com/hapijs/lab/pull/362) Default both linting thresholds to 0.
- [#361](https://github.com/hapijs/lab/issues/361) Lint option -L should fail test if any linting problems are found
- [#360](https://github.com/hapijs/lab/pull/360) Use global handle for \_\_$$labCov for use strict.
- [#359](https://github.com/hapijs/lab/pull/359) Change afterEaches to run in more natural order
- [#358](https://github.com/hapijs/lab/issues/358) unable to test when employing template strings
- [#357](https://github.com/hapijs/lab/issues/357) afterEach's run in unnatural order

### [5.8.1](https://github.com/hapijs/lab/milestone/48) {#5.8.1}

- [#356](https://github.com/hapijs/lab/pull/356) Fix coverage on loop labels. Fixes #355.
- [#355](https://github.com/hapijs/lab/issues/355) Error when running lab with coverage on babel compiled code
- [#354](https://github.com/hapijs/lab/pull/354) Fix coverage modifying "use strict" statements.

### [5.8.0](https://github.com/hapijs/lab/milestone/47) {#5.8.0}

- [#352](https://github.com/hapijs/lab/pull/352) Fix #351. Add message about threshold and npm error message.
- [#351](https://github.com/hapijs/lab/issues/351) npm ERR! Exit status 1 when threshold is not met
- [#350](https://github.com/hapijs/lab/pull/350) Lint thresholds

### [5.7.0](https://github.com/hapijs/lab/milestone/46) {#5.7.0}

- [#349](https://github.com/hapijs/lab/pull/349) Add 4 space indent rule
- [#348](https://github.com/hapijs/lab/issues/348) Add some more rules to ESLint
- [#347](https://github.com/hapijs/lab/pull/347) Added two eslint rules to lab to enforce the hapi code style.

### [5.6.1](https://github.com/hapijs/lab/milestone/45) {#5.6.1}

- [#345](https://github.com/hapijs/lab/pull/345) Switch to espree
- [#344](https://github.com/hapijs/lab/pull/344) Update dependencies
- [#332](https://github.com/hapijs/lab/issues/332) using `espree` or `acorn` instead of esprima

### [5.6.0](https://github.com/hapijs/lab/milestone/44) {#5.6.0}

- [#341](https://github.com/hapijs/lab/pull/341) Fix HTML reporter when using live-transformed code
- [#339](https://github.com/hapijs/lab/pull/339) Add ESLint rule for blank line at beginning of function scope

### [5.5.1](https://github.com/hapijs/lab/milestone/43) {#5.5.1}

- [#327](https://github.com/hapijs/lab/pull/327) [DEP] eslint 0.14 to 0.17
- [#326](https://github.com/hapijs/lab/issues/326) Update eslint to 0.17.0

### [5.5.0](https://github.com/hapijs/lab/milestone/42) {#5.5.0}

- [#324](https://github.com/hapijs/lab/pull/324) Allow test files to have different extensions with transform
- [#323](https://github.com/hapijs/lab/pull/323) Fix EventEmitter bug
- [#322](https://github.com/hapijs/lab/pull/322) Fix domain not exited
- [#317](https://github.com/hapijs/lab/pull/317) Support custom reporters - closes #216 & closes #309

### [5.4.0](https://github.com/hapijs/lab/milestone/41) {#5.4.0}

- [#321](https://github.com/hapijs/lab/pull/321) Allow --lint-options to be passed to configure linters
- [#320](https://github.com/hapijs/lab/pull/320) Fixes #319: Instructs --output to create given directory recursively.
- [#319](https://github.com/hapijs/lab/issues/319) --output should create given directory tree
- [#318](https://github.com/hapijs/lab/pull/318) add debug option to show domain error stack
- [#316](https://github.com/hapijs/lab/pull/316) Properly support sourcemaps when using the transform option

### [5.3.0](https://github.com/hapijs/lab/milestone/40) {#5.3.0}

- [#311](https://github.com/hapijs/lab/pull/311) Add live transform of source code before coverage analysis
- [#308](https://github.com/hapijs/lab/pull/308) Remove Makefile and advice about it. Closes #284.
- [#307](https://github.com/hapijs/lab/pull/307) Linting update

### [5.2.1](https://github.com/hapijs/lab/milestone/39) {#5.2.1}

- [#297](https://github.com/hapijs/lab/issues/297) Add Intl global
- [#295](https://github.com/hapijs/lab/pull/295) Ignore Intl global
- [#280](https://github.com/hapijs/lab/issues/280) Ignoring files in linting

### [5.2.0](https://github.com/hapijs/lab/milestone/38) {#5.2.0}

- [#290](https://github.com/hapijs/lab/pull/290) make linter pluggable
- [#286](https://github.com/hapijs/lab/pull/286) Avoid double timeout on before/after

### [5.1.0](https://github.com/hapijs/lab/milestone/37) {#5.1.0}

- [#278](https://github.com/hapijs/lab/pull/278) Fix before/after exceptions to be reported
- [#277](https://github.com/hapijs/lab/issues/277) Errors thrown in after & afterEach can cause immediate exit with code 0

### [5.0.3](https://github.com/hapijs/lab/milestone/36) {#5.0.3}

- [#276](https://github.com/hapijs/lab/issues/276) (true ? true : false) ? 'x' : false === true when coverage enabled (should be 'x')

### [5.0.2](https://github.com/hapijs/lab/milestone/35) {#5.0.2}

- [#271](https://github.com/hapijs/lab/pull/271) Add Map, Set, and WeakSet to the Harmony globals and improve testing
- [#262](https://github.com/hapijs/lab/pull/262) Fix console reporting

### [5.0.1](https://github.com/hapijs/lab/milestone/34) {#5.0.1}

- [#261](https://github.com/hapijs/lab/issues/261) Remove extra hoek typo in package.json
- [#260](https://github.com/hapijs/lab/pull/260) Add verbosity index

### [5.0.0](https://github.com/hapijs/lab/milestone/33) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/259" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#5.0.0}

- [#259](https://github.com/hapijs/lab/issues/259) 5.0.0 Release Notes
- [#258](https://github.com/hapijs/lab/pull/258) Remove extra line breaks in lint report
- [#256](https://github.com/hapijs/lab/pull/256) Assertions library option
- [#254](https://github.com/hapijs/lab/issues/254) Fix documentation to exclude chai
- [#253](https://github.com/hapijs/lab/pull/253) Remove Chai
- [#252](https://github.com/hapijs/lab/issues/252) Lint report formatting
- [#250](https://github.com/hapijs/lab/issues/250) Remove chai

## Version 4 {#v4}

### [4.7.0](https://github.com/hapijs/lab/milestone/32) {#4.7.0}

- [#249](https://github.com/hapijs/lab/pull/249) Fix #217: throw on invalid function declaration
- [#247](https://github.com/hapijs/lab/pull/247) Run linting in child process
- [#246](https://github.com/hapijs/lab/pull/246) Remove extra line breaks in report
- [#245](https://github.com/hapijs/lab/issues/245) Spawn linting in child process
- [#244](https://github.com/hapijs/lab/issues/244) Remove extra line breaks

### [4.6.2](https://github.com/hapijs/lab/milestone/31) {#4.6.2}

- [#243](https://github.com/hapijs/lab/pull/243) Remove brace-style rule
- [#242](https://github.com/hapijs/lab/issues/242) Remove brace-style lint rule
- [#241](https://github.com/hapijs/lab/pull/241) Lint arg is now a boolean
- [#240](https://github.com/hapijs/lab/pull/240) Removing consistent-return
- [#239](https://github.com/hapijs/lab/issues/239) Drop consistent-return lint rule
- [#238](https://github.com/hapijs/lab/pull/238) Remove no-lonely-if
- [#237](https://github.com/hapijs/lab/issues/237) Switch -L to be boolean and only use eslint
- [#236](https://github.com/hapijs/lab/issues/236) Remove no-lonely-if

### [4.6.1](https://github.com/hapijs/lab/milestone/30) {#4.6.1}

- [#234](https://github.com/hapijs/lab/pull/234) Ignore tests for lab
- [#233](https://github.com/hapijs/lab/issues/233) Add eslintignore for labs tests
- [#232](https://github.com/hapijs/lab/pull/232) Fixing lint rules and only showing files when issues
- [#231](https://github.com/hapijs/lab/issues/231) Only show linted files if there are issues

### [4.6.0](https://github.com/hapijs/lab/milestone/29) {#4.6.0}

- [#213](https://github.com/hapijs/lab/pull/213) WIP - Add linting support

### [4.5.2](https://github.com/hapijs/lab/milestone/28) {#4.5.2}

- [#226](https://github.com/hapijs/lab/pull/226) Support windows console output
- [#225](https://github.com/hapijs/lab/issues/225) Console reporter doesn't display well on windows

### [4.5.1](https://github.com/hapijs/lab/milestone/27) {#4.5.1}

- [#219](https://github.com/hapijs/lab/pull/219) Fix mistakes on previous pull requests

### [4.5.0](https://github.com/hapijs/lab/milestone/26) {#4.5.0}

- [#215](https://github.com/hapijs/lab/pull/215) Add optional timeouts on before(Each), after(Each)
- [#207](https://github.com/hapijs/lab/pull/207) Fix #178: Add sourcemaps support
- [#178](https://github.com/hapijs/lab/issues/178) Code coverage with sourcemaps support

### [4.4.4](https://github.com/hapijs/lab/milestone/25) {#4.4.4}

- [#212](https://github.com/hapijs/lab/pull/212) Fix #209: omit undefined options
- [#209](https://github.com/hapijs/lab/issues/209) code error results in all tests passing

### [4.4.3](https://github.com/hapijs/lab/milestone/24) {#4.4.3}

- [#208](https://github.com/hapijs/lab/pull/208) Support multiple tests from the command line.

### [4.4.2](https://github.com/hapijs/lab/milestone/23) {#4.4.2}

- [#205](https://github.com/hapijs/lab/pull/205) Output and leaks are honored
- [#204](https://github.com/hapijs/lab/issues/204) CLI: -o not honored

### [4.4.1](https://github.com/hapijs/lab/milestone/22) {#4.4.1}

- [#203](https://github.com/hapijs/lab/pull/203) Support junit as reporter on cli
- [#200](https://github.com/hapijs/lab/issues/200) junit reporter unavailable

### [4.4.0](https://github.com/hapijs/lab/milestone/21) {#4.4.0}

- [#199](https://github.com/hapijs/lab/pull/199) Add --ignore option and document alias arguments
- [#198](https://github.com/hapijs/lab/pull/198) Add test for unknown arguments
- [#197](https://github.com/hapijs/lab/pull/197) Restrict CLI reporter checks and add usage on errors
- [#196](https://github.com/hapijs/lab/issues/196) Globals
- [#193](https://github.com/hapijs/lab/pull/193) Upping to bossy 1.0.0
- [#192](https://github.com/hapijs/lab/pull/192) Switching from optimist to bossy
- [#191](https://github.com/hapijs/lab/issues/191) Switch from optimist to bossy
- [#187](https://github.com/hapijs/lab/pull/187) Added clover reporter

### [4.3.0](https://github.com/hapijs/lab/milestone/20) {#4.3.0}

- [#182](https://github.com/hapijs/lab/pull/182) Adding lcov format reporter
- [#180](https://github.com/hapijs/lab/issues/180) Stray asterisk in README
- [#179](https://github.com/hapijs/lab/pull/179) Add tests for coverage that throws
- [#109](https://github.com/hapijs/lab/issues/109) Option to output coverage in lcov format

### [4.2.0](https://github.com/hapijs/lab/milestone/19) {#4.2.0}

- [#176](https://github.com/hapijs/lab/pull/176) Adding test run data to html report
- [#175](https://github.com/hapijs/lab/pull/175) Cleanup tests for timeout overrides
- [#174](https://github.com/hapijs/lab/pull/174) Add lines covered and not covered to the CC report
- [#118](https://github.com/hapijs/lab/issues/118) Way to get coverage report in HTML at the same time as console

### [4.1.0](https://github.com/hapijs/lab/milestone/18) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/171" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> {#4.1.0}

- [#172](https://github.com/hapijs/lab/pull/172) Upping to version 4.1.0
- [#171](https://github.com/hapijs/lab/issues/171) 4.1.0 Release Notes
- [#168](https://github.com/hapijs/lab/pull/168) updated README to cover JUnit reporter
- [#167](https://github.com/hapijs/lab/issues/167) Document JUnit reporter
- [#166](https://github.com/hapijs/lab/pull/166) Added junit reporter
- [#165](https://github.com/hapijs/lab/issues/165) Junit output
- [#164](https://github.com/hapijs/lab/pull/164) Feature - Prevent clobbered timer globals from interfering with runner
- [#163](https://github.com/hapijs/lab/pull/163) Updating TAP reporter to specification version 13
- [#162](https://github.com/hapijs/lab/pull/162) cli override. Closes #161
- [#161](https://github.com/hapijs/lab/issues/161) Allow setting CLI options programatically
- [#159](https://github.com/hapijs/lab/pull/159) Detect missing exports.lab in the cli runner
- [#157](https://github.com/hapijs/lab/issues/157) Handle tests without a "exports.lab" gracefully
- [#119](https://github.com/hapijs/lab/issues/119) Duration of tests shown via TAP

### [4.0.2](https://github.com/hapijs/lab/milestone/17) {#4.0.2}

- [#156](https://github.com/hapijs/lab/pull/156) Remove skipped tests from total run count
- [#155](https://github.com/hapijs/lab/issues/155) Clarify how `only` behaves
- [#154](https://github.com/hapijs/lab/issues/154) Skipped tests still reported on console reporter as being run
- [#152](https://github.com/hapijs/lab/pull/152) Set env variable immediately in cli
- [#151](https://github.com/hapijs/lab/issues/151) Environment not set before require when using CLI
- [#150](https://github.com/hapijs/lab/pull/150) Default to test environment
- [#149](https://github.com/hapijs/lab/pull/149) Changed session errors to script errors.
- [#148](https://github.com/hapijs/lab/issues/148) Environment set too late
- [#147](https://github.com/hapijs/lab/pull/147) Replace async with items
- [#146](https://github.com/hapijs/lab/issues/146) Reword session errors to test script errors
- [#145](https://github.com/hapijs/lab/issues/145) Replace use of async with items

### [4.0.1](https://github.com/hapijs/lab/milestone/15) {#4.0.1}

- [#144](https://github.com/hapijs/lab/pull/144) Fixing issue with missing labCov reference
- [#143](https://github.com/hapijs/lab/issues/143) lab throws with ReferenceError: \_\_$$labCov is not defined when run with coverage enabled and no code to cover
- [#141](https://github.com/hapijs/lab/pull/141) Add test for while coverage
- [#140](https://github.com/hapijs/lab/pull/140) Default to null for colors on cli for using tty capabilities
- [#139](https://github.com/hapijs/lab/issues/139) CLI colors aren't defaulted to tty capabilities

### [4.0.0](https://github.com/hapijs/lab/milestone/13) <a class="release-notes-link" href="https://github.com/hapijs/lab/issues/138" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#4.0.0}

- [#138](https://github.com/hapijs/lab/issues/138) 4.0.0 Release Notes
- [#137](https://github.com/hapijs/lab/pull/137) Moving to authors file and adding my name
- [#136](https://github.com/hapijs/lab/pull/136) Notebook updates
- [#135](https://github.com/hapijs/lab/pull/135) Fix for paths with hyphens and increase timeout
- [#133](https://github.com/hapijs/lab/pull/133) Cli tests
- [#132](https://github.com/hapijs/lab/issues/132) Update readme to reflect all the latest cli options
- [#130](https://github.com/hapijs/lab/issues/130) Add lib/cli.js to coverage tests
- [#129](https://github.com/hapijs/lab/issues/129) Expose notebook.errors in console reporter
- [#128](https://github.com/hapijs/lab/pull/128) Refactor to test lab with lab
- [#126](https://github.com/hapijs/lab/pull/126) Checking leaks on non-enumerable properties
- [#124](https://github.com/hapijs/lab/issues/124) 4.0 Breaking Change
- [#123](https://github.com/hapijs/lab/issues/123) Add new ES6 types to knownGlobals
- [#117](https://github.com/hapijs/lab/issues/117) "Infinite" Timeout
- [#116](https://github.com/hapijs/lab/pull/116) Add describe.skip/only and it.skip/only
- [#113](https://github.com/hapijs/lab/pull/113) Repeat failure count at end of errors listing.
- [#110](https://github.com/hapijs/lab/issues/110) Lab.test.only and Lab.test.skip
- [#108](https://github.com/hapijs/lab/issues/108) Adding coverage tests skew the line-numbers in stack statements.
- [#107](https://github.com/hapijs/lab/issues/107) Lab doesn't show the assertion message when an assertion fails
- [#104](https://github.com/hapijs/lab/pull/104) Display Test duration once completed (even with errors)
- [#103](https://github.com/hapijs/lab/issues/103) tests should fail if before etc call back with an error or crash
- [#100](https://github.com/hapijs/lab/pull/100) Fix #99: ignore custom globals in leak detection
- [#98](https://github.com/hapijs/lab/issues/98) Add total missing lines to the coverage reporter
- [#60](https://github.com/hapijs/lab/issues/60) Add tests

## Version 3 {#v3}

### [3.2.3](https://github.com/hapijs/lab/milestone/14) {#3.2.3}

- [#131](https://github.com/hapijs/lab/issues/131) Rename spumko to hapijs

### [3.2.1](https://github.com/hapijs/lab/milestone/12) {#3.2.1}

### [3.2.0](https://github.com/hapijs/lab/milestone/11) {#3.2.0}

- [#96](https://github.com/hapijs/lab/pull/96) simplify package.json example
- [#94](https://github.com/hapijs/lab/pull/94) Add chai optional message to output
- [#90](https://github.com/hapijs/lab/issues/90) Allow ability to execute specific subset of tests

### [3.1.4](https://github.com/hapijs/lab/milestone/10) {#3.1.4}

- [#92](https://github.com/hapijs/lab/pull/92) Prints execution time for each test on console
- [#91](https://github.com/hapijs/lab/pull/91) Coverage file filter function modified to support Windows paths #32
- [#32](https://github.com/hapijs/lab/issues/32) Coverage not working on Windows

### [3.1.1](https://github.com/hapijs/lab/milestone/9) {#3.1.1}

- [#88](https://github.com/hapijs/lab/pull/88) updated double call check on done to provide error to internals.output

### [3.1.0](https://github.com/hapijs/lab/milestone/8) {#3.1.0}

- [#83](https://github.com/hapijs/lab/issues/83) Ability to skip coverage for a code section
- [#81](https://github.com/hapijs/lab/pull/81) Add command like option to force color output
- [#78](https://github.com/hapijs/lab/pull/78) Support passing 'done' as async callback
- [#77](https://github.com/hapijs/lab/issues/77) Show error message not just for boom
- [#76](https://github.com/hapijs/lab/pull/76) Expose Chai's assert flavour. Closes #75.

### [3.0.0](https://github.com/hapijs/lab/milestone/7) <span class="breaking-badge"></span> {#3.0.0}

- [#71](https://github.com/hapijs/lab/issues/71) Todo tests
- [#70](https://github.com/hapijs/lab/issues/70) Skip test or experiment
- [#69](https://github.com/hapijs/lab/issues/69) Allow setting per test of experiment timeout
- [#68](https://github.com/hapijs/lab/issues/68) Allow setting parallel execution
- [#67](https://github.com/hapijs/lab/issues/67) Combine spec+console+summary with -s/-v flags
- [#66](https://github.com/hapijs/lab/issues/66) before/beforeEach/afterEach/after not run in correct order when using nested experiments
- [#65](https://github.com/hapijs/lab/issues/65) Rename -g to -l and make it disable detection
- [#64](https://github.com/hapijs/lab/issues/64) Remove coverage reporter
- [#63](https://github.com/hapijs/lab/issues/63) Remove verbose mode
- [#62](https://github.com/hapijs/lab/issues/62) Tap reporter
- [#56](https://github.com/hapijs/lab/pull/56) spec style formatting
- [#55](https://github.com/hapijs/lab/pull/55) fixed failure count so that non-zero exit code is return on test failure
- [#53](https://github.com/hapijs/lab/pull/53) Support verbose mode for console
- [#48](https://github.com/hapijs/lab/pull/48) Adding spec reporter

## Version 2 {#v2}

### [2.47.1](https://github.com/hapijs/lab/milestone/191) {#2.47.1}

- [#1047](https://github.com/hapijs/lab/pull/1047) Fix coverage ignore flag when ts comments are removed
- [#1046](https://github.com/hapijs/lab/issues/1046) Report "Type T has no properties in common with type U" as a type error

### [2.0.2](https://github.com/hapijs/lab/milestone/6) {#2.0.2}

- [#61](https://github.com/hapijs/lab/issues/61) Remove SwitchCase from statement coverage

### [2.0.0](https://github.com/hapijs/lab/milestone/5) <span class="breaking-badge"></span> {#2.0.0}

- [#54](https://github.com/hapijs/lab/issues/54) Move coverage functionality internally

## Version 1 {#v1}

### [1.9.0](https://github.com/hapijs/lab/milestone/4) {#1.9.0}

- [#51](https://github.com/hapijs/lab/pull/51) update chai dependency, fix deprecation warning in chai

### [1.8.0](https://github.com/hapijs/lab/milestone/2) {#1.8.0}

- [#49](https://github.com/hapijs/lab/issues/49) Allow specifying tests by id
- [#41](https://github.com/hapijs/lab/issues/41) Support beforeEach() (and afterEach())

### [1.7.1](https://github.com/hapijs/lab/milestone/3) {#1.7.1}

- [#47](https://github.com/hapijs/lab/pull/47) Fixed branch checking

### [1.7.0](https://github.com/hapijs/lab/milestone/1) {#1.7.0}

- [#46](https://github.com/hapijs/lab/pull/46) update readme
- [#45](https://github.com/hapijs/lab/issues/45) Fix double domain implicit enter()
- [#43](https://github.com/hapijs/lab/issues/43) fix for readme
- [#42](https://github.com/hapijs/lab/pull/42) add beforeEach() and afterEach()
