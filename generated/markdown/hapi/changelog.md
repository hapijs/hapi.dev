## Version 21 {#v21}

### [21.4.8](https://github.com/hapijs/hapi/milestone/329) {#21.4.8}

- [#4568](https://github.com/hapijs/hapi/pull/4568) chore: bump deps

### [21.4.7](https://github.com/hapijs/hapi/milestone/328) {#21.4.7}

- [#4559](https://github.com/hapijs/hapi/pull/4559) fix: 🐛 request.url getter fails when using IPv6 and HTTP2 [#4560]

### [21.4.6](https://github.com/hapijs/hapi/milestone/327) {#21.4.6}

- [#4564](https://github.com/hapijs/hapi/pull/4564) Fix invalid hostname parsing for ipv6 formatted host header

### [21.4.5](https://github.com/hapijs/hapi/milestone/326) {#21.4.5}

- [#4562](https://github.com/hapijs/hapi/pull/4562) fix: auth typings and reduced type ambiguity
- [#4561](https://github.com/hapijs/hapi/issues/4561) Possible typing regression between v21.3.12 and v21.4.4

### [21.4.4](https://github.com/hapijs/hapi/milestone/325) {#21.4.4}

- [#4557](https://github.com/hapijs/hapi/pull/4557) chore: update deps

### [21.4.3](https://github.com/hapijs/hapi/milestone/324) {#21.4.3}

- [#4553](https://github.com/hapijs/hapi/pull/4553) chore: bump dependencies
- [#4552](https://github.com/hapijs/hapi/pull/4552) Handle stream.destroy() called before stream end

### [21.4.2](https://github.com/hapijs/hapi/milestone/323) {#21.4.2}

- [#4550](https://github.com/hapijs/hapi/pull/4550) Correct type for state object

### [21.4.1](https://github.com/hapijs/hapi/milestone/322) {#21.4.1}

### [21.4.0](https://github.com/hapijs/hapi/milestone/321) {#21.4.0}

- [#4545](https://github.com/hapijs/hapi/pull/4545) feat: add support for cookie partition
- [#4543](https://github.com/hapijs/hapi/pull/4543) Update event tags in documentation
- [#4542](https://github.com/hapijs/hapi/issues/4542) `request` `closed` `error` tags
- [#4540](https://github.com/hapijs/hapi/pull/4540) fix: 🐛 less ambigious plugin types
- [#4538](https://github.com/hapijs/hapi/pull/4538) fix: 🐛 typings around server.decorate
- [#4523](https://github.com/hapijs/hapi/pull/4523) fix: 🐛 accurate auth typings
- [#4515](https://github.com/hapijs/hapi/pull/4515) fix: 🐛 allow typed server methods access cache methods

### [21.3.12](https://github.com/hapijs/hapi/milestone/320) {#21.3.12}

- [#4533](https://github.com/hapijs/hapi/pull/4533) chore: bump hoek

### [21.3.11](https://github.com/hapijs/hapi/milestone/319) {#21.3.11}

- [#4532](https://github.com/hapijs/hapi/pull/4532) chore: bump all modules to their latest compatible version
- [#4531](https://github.com/hapijs/hapi/issues/4531) Asserts (and probably other Bounce.isSystem) loose stack trace
- [#4530](https://github.com/hapijs/hapi/pull/4530) Don't destroy incoming requests during the stopping phase
- [#4488](https://github.com/hapijs/hapi/pull/4488) Improve expect 100-continue handling

### [21.3.10](https://github.com/hapijs/hapi/milestone/318) {#21.3.10}

- [#4507](https://github.com/hapijs/hapi/pull/4507) fix: 🐛 route payload options missing types
- [#4501](https://github.com/hapijs/hapi/issues/4501) Missing maxParts type in route.d.ts

### [21.3.9](https://github.com/hapijs/hapi/milestone/317) {#21.3.9}

- [#4496](https://github.com/hapijs/hapi/pull/4496) types: allow server.match to receive lowercased methods

### [21.3.8](https://github.com/hapijs/hapi/milestone/316) {#21.3.8}

- [#4493](https://github.com/hapijs/hapi/pull/4493) Cleanup http methods typings
- [#4492](https://github.com/hapijs/hapi/issues/4492) HTTP_METHODS_PARTIAL_LOWERCASE is missing `head`

### [21.3.7](https://github.com/hapijs/hapi/milestone/315) {#21.3.7}

- [#4490](https://github.com/hapijs/hapi/pull/4490) Make content encoder and options explicitly typed and extensible

### [21.3.6](https://github.com/hapijs/hapi/milestone/314) {#21.3.6}

- [#4486](https://github.com/hapijs/hapi/pull/4486) Revert "fix(types): enhance reusability of pres"

### [21.3.5](https://github.com/hapijs/hapi/milestone/313) {#21.3.5}

- [#4471](https://github.com/hapijs/hapi/pull/4471) Don't return error response when clientError is a pipelined HPE_INVALID_METHOD
- [#4363](https://github.com/hapijs/hapi/issues/4363) Server crash: Error: Unknown error

### [21.3.4](https://github.com/hapijs/hapi/milestone/312) {#21.3.4}

- [#4470](https://github.com/hapijs/hapi/pull/4470) fix(types): enhance reusability of pres

### [21.3.3](https://github.com/hapijs/hapi/milestone/311) {#21.3.3}

- [#4473](https://github.com/hapijs/hapi/pull/4473) Node 20 fixes
- [#4460](https://github.com/hapijs/hapi/pull/4460) FIX add compressed to ResponseObject type
- [#4446](https://github.com/hapijs/hapi/pull/4446) failAction loses stacktrace context

### [21.3.2](https://github.com/hapijs/hapi/milestone/310) {#21.3.2}

- [#4449](https://github.com/hapijs/hapi/pull/4449) chore: use new statehood types

### [21.3.1](https://github.com/hapijs/hapi/milestone/309) {#21.3.1}

- [#4413](https://github.com/hapijs/hapi/pull/4413) Pass ServerApplicationState to server extensions

### [21.3.0](https://github.com/hapijs/hapi/milestone/308) <span class="breaking-badge"></span> {#21.3.0}

- [#4425](https://github.com/hapijs/hapi/issues/4425) Add option to limit maxParts in multipart payloads

### [21.2.2](https://github.com/hapijs/hapi/milestone/306) {#21.2.2}

- [#4417](https://github.com/hapijs/hapi/pull/4417) chore: bump hoek

### [21.2.1](https://github.com/hapijs/hapi/milestone/304) {#21.2.1}

- [#4422](https://github.com/hapijs/hapi/pull/4422) Update README.md
- [#4421](https://github.com/hapijs/hapi/pull/4421) adding colin to tsc members
- [#4415](https://github.com/hapijs/hapi/pull/4415) Correct the ResponseObject type

### [21.2.0](https://github.com/hapijs/hapi/milestone/303) {#21.2.0}

- [#4407](https://github.com/hapijs/hapi/pull/4407) Add type for preflight status code in cors options
- [#4402](https://github.com/hapijs/hapi/pull/4402) Updates to TypeScript definitions
- [#4401](https://github.com/hapijs/hapi/pull/4401) update types for xss
- [#4400](https://github.com/hapijs/hapi/pull/4400) Enhance plugin types

### [21.1.0](https://github.com/hapijs/hapi/milestone/302) {#21.1.0}

- [#4398](https://github.com/hapijs/hapi/pull/4398) Move TypeScript definition from DT (as-is)
- [#4396](https://github.com/hapijs/hapi/pull/4396) Fix handling of no remoteAddress available
- [#4391](https://github.com/hapijs/hapi/pull/4391) Fix node version requirement

### [21.0.0](https://github.com/hapijs/hapi/milestone/300) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/4386" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#21.0.0}

- [#4386](https://github.com/hapijs/hapi/issues/4386) 21.0.0 Release Notes
- [#4366](https://github.com/hapijs/hapi/pull/4366) Allow matching prereleases when validating plugin version requirements
- [#4361](https://github.com/hapijs/hapi/pull/4361) Upgrade production deps for hapi v21 and node v18
- [#4357](https://github.com/hapijs/hapi/pull/4357) Change default host to be IPv6-friendly
- [#4352](https://github.com/hapijs/hapi/pull/4352) Change XSS header default to '0'
- [#4351](https://github.com/hapijs/hapi/pull/4351) Change default CORS preflight status code w/ configuration
- [#4350](https://github.com/hapijs/hapi/pull/4350) Make default error available in validation failAction
- [#4349](https://github.com/hapijs/hapi/pull/4349) Enforce that response streams are always Stream.Readable
- [#4348](https://github.com/hapijs/hapi/pull/4348) Ignore return value from generateResponse() prepare method
- [#4346](https://github.com/hapijs/hapi/pull/4346) Drop node v12 support
- [#4288](https://github.com/hapijs/hapi/issues/4288) Add support for event loop utilization based load limit
- [#4271](https://github.com/hapijs/hapi/pull/4271) Remove JSONP support
- [#4229](https://github.com/hapijs/hapi/issues/4229) failAction: detailedError to log, defaultError to response

## Version 20 {#v20}

### [20.3.0](https://github.com/hapijs/hapi/milestone/307) {#20.3.0}

### [20.2.2](https://github.com/hapijs/hapi/milestone/299) {#20.2.2}

- [#4347](https://github.com/hapijs/hapi/issues/4347) Update hapijs/statehood to 7.0.4 from 7.0.3
- [#4345](https://github.com/hapijs/hapi/pull/4345) Fix memory leaks from teamwork long standing notes
- [#4314](https://github.com/hapijs/hapi/pull/4314) Fix tests for node v17
- [#4302](https://github.com/hapijs/hapi/pull/4302) Soft deprecate returning a new object from generateResponse()

### [20.2.1](https://github.com/hapijs/hapi/milestone/298) {#20.2.1}

- [#4295](https://github.com/hapijs/hapi/pull/4295) Revised request / inject abort handling
- [#4294](https://github.com/hapijs/hapi/issues/4294) Server crashes if a requested aborted during sending a response.
- [#4289](https://github.com/hapijs/hapi/pull/4289) Update server load default options on documentation
- [#4286](https://github.com/hapijs/hapi/pull/4286) Initialize server settings defaults

### [20.2.0](https://github.com/hapijs/hapi/milestone/297) {#20.2.0}

- [#4283](https://github.com/hapijs/hapi/pull/4283) Fix tests for node@16 error format change
- [#4281](https://github.com/hapijs/hapi/pull/4281) Fix handling of auth scheme/strategy realms
- [#4274](https://github.com/hapijs/hapi/pull/4274) Add optional payload authentication skip on credentials injection

### [20.1.5](https://github.com/hapijs/hapi/milestone/296) {#20.1.5}

- [#4264](https://github.com/hapijs/hapi/pull/4264) Fix req end during response transmission
- [#4262](https://github.com/hapijs/hapi/issues/4262) Streaming uploads cause truncated responses in node 16

### [20.1.4](https://github.com/hapijs/hapi/milestone/295) {#20.1.4}

- [#4257](https://github.com/hapijs/hapi/pull/4257) Add response lifecycle tracking and checks
- [#4256](https://github.com/hapijs/hapi/issues/4256) inert + hapi may be leaking file descriptors

### [20.1.3](https://github.com/hapijs/hapi/milestone/294) {#20.1.3}

- [#4250](https://github.com/hapijs/hapi/pull/4250) Update to mimos v6

### [20.1.2](https://github.com/hapijs/hapi/milestone/293) {#20.1.2}

- [#4239](https://github.com/hapijs/hapi/pull/4239) Fix abort test timing to be consistent from node v12 through v16
- [#4231](https://github.com/hapijs/hapi/pull/4231) Update dependencies version range
- [#4225](https://github.com/hapijs/hapi/pull/4225) Future-proof hapi for node v16, rely on res close rather than req
- [#4095](https://github.com/hapijs/hapi/pull/4095) Rely on stream.destroy() whenever available

### [20.1.1](https://github.com/hapijs/hapi/milestone/291) {#20.1.1}

- [#4234](https://github.com/hapijs/hapi/pull/4234) Allow for res to have already closed during transmission

### [20.1.0](https://github.com/hapijs/hapi/milestone/290) {#20.1.0}

- [#4221](https://github.com/hapijs/hapi/pull/4221) Fix tests for citgm
- [#4219](https://github.com/hapijs/hapi/pull/4219) Add policy event
- [#4203](https://github.com/hapijs/hapi/pull/4203) Add closing event
- [#4194](https://github.com/hapijs/hapi/issues/4194) Add a 'closing' event
- [#4104](https://github.com/hapijs/hapi/issues/4104) Track cache policies

### [20.0.3](https://github.com/hapijs/hapi/milestone/289) {#20.0.3}

- [#4191](https://github.com/hapijs/hapi/pull/4191) Preserve original response status on error after write, fix status message
- [#4182](https://github.com/hapijs/hapi/issues/4182) server.inject does not reflect actual HTTP response in case of stream error

### [20.0.2](https://github.com/hapijs/hapi/milestone/288) {#20.0.2}

- [#4167](https://github.com/hapijs/hapi/pull/4167) upgrade to labv24
- [#4089](https://github.com/hapijs/hapi/pull/4089) [default-scope] Accept default scope as a valid route scope
- [#4083](https://github.com/hapijs/hapi/issues/4083) Default auth scope not compatible with route auth scope

### [20.0.1](https://github.com/hapijs/hapi/milestone/287) {#20.0.1}

- [#4162](https://github.com/hapijs/hapi/pull/4162) Use response instead of request when marshalling
- [#4161](https://github.com/hapijs/hapi/pull/4161) fix: check if \_isPayloadSupported is set
- [#4156](https://github.com/hapijs/hapi/pull/4156) update handlebars dependency version

### [20.0.0](https://github.com/hapijs/hapi/milestone/286) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/4138" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#20.0.0}

- [#4140](https://github.com/hapijs/hapi/pull/4140) update to travis templates
- [#4139](https://github.com/hapijs/hapi/pull/4139) update most out of date dependencies
- [#4138](https://github.com/hapijs/hapi/issues/4138) 20.0.0 Release Notes
- [#4134](https://github.com/hapijs/hapi/pull/4134) headers: avoid sending null content-type
- [#4133](https://github.com/hapijs/hapi/issues/4133) Content-type header is null when empty response is returned
- [#4132](https://github.com/hapijs/hapi/pull/4132) README needs this change to parse the slogan for site
- [#4130](https://github.com/hapijs/hapi/pull/4130) fixed teamwork version
- [#4123](https://github.com/hapijs/hapi/pull/4123) Removing the route timeout validation
- [#4122](https://github.com/hapijs/hapi/issues/4122) Payload timeout must be shorter than socket timeout
- [#4117](https://github.com/hapijs/hapi/pull/4117) Implement `isInjected` read-only request property to indicate request…
- [#4116](https://github.com/hapijs/hapi/issues/4116) Improved injected request detection
- [#4115](https://github.com/hapijs/hapi/pull/4115) Replace joi with validate
- [#4113](https://github.com/hapijs/hapi/issues/4113) The future of the hapi project

## Version 19 {#v19}

### [19.2.0](https://github.com/hapijs/hapi/milestone/278) {#19.2.0}

- [#4077](https://github.com/hapijs/hapi/issues/4077) Decorate response object
- [#4073](https://github.com/hapijs/hapi/pull/4073) Add new ext onPostResponse
- [#4072](https://github.com/hapijs/hapi/issues/4072) Response Event For Aborted Requests Has Status Code Of 200
- [#4051](https://github.com/hapijs/hapi/issues/4051) Expose (likely?) Content-Type on response object
- [#4041](https://github.com/hapijs/hapi/issues/4041) How to access catbox client instances through the framework?

### [19.1.1](https://github.com/hapijs/hapi/milestone/277) {#19.1.1}

- [#4043](https://github.com/hapijs/hapi/issues/4043) Update deps
- [#4027](https://github.com/hapijs/hapi/issues/4027) Problem with settings global request.payload.multipart to true in Hapi v19

### [19.1.0](https://github.com/hapijs/hapi/milestone/276) {#19.1.0}

- [#4034](https://github.com/hapijs/hapi/issues/4034) request.info.remoteAddress / request.info.remotePort undefined after connection closed (request aborted)

### [19.0.5](https://github.com/hapijs/hapi/milestone/275) {#19.0.5}

- [#4026](https://github.com/hapijs/hapi/issues/4026) Update deps

### [19.0.4](https://github.com/hapijs/hapi/milestone/274) {#19.0.4}

- [#4022](https://github.com/hapijs/hapi/issues/4022) Revert #4021

### [19.0.3](https://github.com/hapijs/hapi/milestone/273) {#19.0.3}

- [#4021](https://github.com/hapijs/hapi/issues/4021) Retain '' result in inject in 204 response

### [19.0.2](https://github.com/hapijs/hapi/milestone/272) {#19.0.2}

- [#4020](https://github.com/hapijs/hapi/pull/4020) support JSON.stringify() of request.info
- [#4019](https://github.com/hapijs/hapi/issues/4019) Feature request: custom toJSON() method for request.info

### [19.0.1](https://github.com/hapijs/hapi/milestone/271) {#19.0.1}

- [#4018](https://github.com/hapijs/hapi/issues/4018) Override request.url in setUrl()

### [19.0.0](https://github.com/hapijs/hapi/milestone/254) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/4017" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#19.0.0}

- [#4017](https://github.com/hapijs/hapi/issues/4017) 19.0.0 Release Notes
- [#4015](https://github.com/hapijs/hapi/issues/4015) Do not override request.payload if set manually in onRequest
- [#4013](https://github.com/hapijs/hapi/issues/4013) Use private class fields
- [#4012](https://github.com/hapijs/hapi/issues/4012) Drop node 10
- [#4011](https://github.com/hapijs/hapi/issues/4011) Change scoped plugins name handling
- [#4006](https://github.com/hapijs/hapi/issues/4006) server.validator()
- [#4002](https://github.com/hapijs/hapi/pull/4002) fix(auth): properly populate request.auth on failed auth
- [#4000](https://github.com/hapijs/hapi/issues/4000) auth scheme artifacts are dropped when mode is not 'try'
- [#3996](https://github.com/hapijs/hapi/pull/3996) Decorate requests with symbols with apply=true
- [#3995](https://github.com/hapijs/hapi/issues/3995) Fix ? in fragment part
- [#3987](https://github.com/hapijs/hapi/issues/3987) Support SameSite=None for cookies
- [#3977](https://github.com/hapijs/hapi/issues/3977) Remove request queue (options.load.concurrent)
- [#3976](https://github.com/hapijs/hapi/issues/3976) Update hapijs/joi to 16.0.1 from 15.1.1
- [#3920](https://github.com/hapijs/hapi/issues/3920) Change routes.payload.multipart to false by default
- [#3919](https://github.com/hapijs/hapi/issues/3919) Change emptyStatusCode to 204 by default
- [#3910](https://github.com/hapijs/hapi/issues/3910) Drop support for node v8

## Version 18 {#v18}

### [18.4.2](https://github.com/hapijs/hapi/milestone/279) {#18.4.2}

- [#4110](https://github.com/hapijs/hapi/issues/4110) Update deps

### [18.4.1](https://github.com/hapijs/hapi/milestone/270) {#18.4.1}

- [#4046](https://github.com/hapijs/hapi/issues/4046) Update deps

### [18.4.0](https://github.com/hapijs/hapi/milestone/269) {#18.4.0}

- [#3975](https://github.com/hapijs/hapi/issues/3975) Support joi v16
- [#3974](https://github.com/hapijs/hapi/issues/3974) Handle errors thrown during error response transmit
- [#3971](https://github.com/hapijs/hapi/pull/3971) Fix some corner case client errors
- [#3965](https://github.com/hapijs/hapi/issues/3965) Multiple leading slashes in path causes hostname to be parsed incorrectly
- [#3964](https://github.com/hapijs/hapi/issues/3964) Custom "content-encoding" without vary header
- [#3956](https://github.com/hapijs/hapi/issues/3956) ETags behind gateway that compresses responses
- [#3946](https://github.com/hapijs/hapi/pull/3946) Add support for Chrome Apps and WebExtensions

### [18.3.2](https://github.com/hapijs/hapi/milestone/267) {#18.3.2}

- [#3968](https://github.com/hapijs/hapi/pull/3968) v18.3.2
- [#3967](https://github.com/hapijs/hapi/issues/3967) Update deps

### [18.3.1](https://github.com/hapijs/hapi/milestone/266) {#18.3.1}

- [#3943](https://github.com/hapijs/hapi/issues/3943) Revise list of hop-by-hop headers

### [18.3.0](https://github.com/hapijs/hapi/milestone/264) {#18.3.0}

- [#3945](https://github.com/hapijs/hapi/issues/3945) Support ext method timeout
- [#3944](https://github.com/hapijs/hapi/issues/3944) server.stop timeout does not apply to onPreStop extension point

### [18.2.0](https://github.com/hapijs/hapi/milestone/259) <span class="breaking-badge"></span> {#18.2.0}

- [#3941](https://github.com/hapijs/hapi/issues/3941) Change module namespace

### [18.1.0](https://github.com/hapijs/hapi/milestone/257) {#18.1.0}

- [#3922](https://github.com/hapijs/hapi/issues/3922) Update hapijs/bourne to 1.1.1 from 1.0.0
- [#3917](https://github.com/hapijs/hapi/issues/3917) Expose bourne options

### [18.0.1](https://github.com/hapijs/hapi/milestone/253) {#18.0.1}

- [#3914](https://github.com/hapijs/hapi/issues/3914) Update hapijs/statehood to 6.0.9 from 6.0.8
- [#3912](https://github.com/hapijs/hapi/issues/3912) Update hapijs/subtext to 6.0.12 from 6.0.11
- [#3909](https://github.com/hapijs/hapi/issues/3909) Route validation should throw AssertionError

### [18.0.0](https://github.com/hapijs/hapi/milestone/251) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/3871" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#18.0.0}

- [#3908](https://github.com/hapijs/hapi/issues/3908) Update hapijs/vise to 3.0.2 from 3.0.1
- [#3907](https://github.com/hapijs/hapi/issues/3907) Update hapijs/teamwork to 3.0.3 from 3.0.2
- [#3906](https://github.com/hapijs/hapi/issues/3906) Update hapijs/joi to 14.3.1 from 14.0.4
- [#3905](https://github.com/hapijs/hapi/issues/3905) Update hapijs/boom to 7.3.0 from 7.2.2
- [#3904](https://github.com/hapijs/hapi/issues/3904) Update hapijs/catbox to 10.0.6 from 10.0.5
- [#3901](https://github.com/hapijs/hapi/issues/3901) Change request.info.responded to indicate success and add request.info.completed
- [#3900](https://github.com/hapijs/hapi/pull/3900) fix(transmit test): add missing await on team.work
- [#3898](https://github.com/hapijs/hapi/issues/3898) Error tag incorrectly set (node 11)
- [#3897](https://github.com/hapijs/hapi/pull/3897) Return credentials and artifacts from server.auth.test()
- [#3891](https://github.com/hapijs/hapi/issues/3891) No Content-Type header when returning a stream
- [#3887](https://github.com/hapijs/hapi/issues/3887) Change inject auth to object and require strategy name
- [#3884](https://github.com/hapijs/hapi/issues/3884) "Cannot set headers after they are sent to the client" after returning h.abandon
- [#3882](https://github.com/hapijs/hapi/pull/3882) Add validation for cookies (alt impl)
- [#3879](https://github.com/hapijs/hapi/pull/3879) Set cookie autoValue only when no value received
- [#3878](https://github.com/hapijs/hapi/issues/3878) Aborted requests show status code 200 in response event
- [#3876](https://github.com/hapijs/hapi/issues/3876) Rework cache provisioning apis
- [#3875](https://github.com/hapijs/hapi/issues/3875) Update hapijs/bounce to 1.2.3 from 1.2.2
- [#3874](https://github.com/hapijs/hapi/issues/3874) Update hapijs/hoek to 6.1.2 from 6.0.2
- [#3873](https://github.com/hapijs/hapi/issues/3873) Update hapijs/podium to 3.2.0 from 3.1.4
- [#3871](https://github.com/hapijs/hapi/issues/3871) 18.0.0 Release Notes
- [#3870](https://github.com/hapijs/hapi/issues/3870) Update hapijs/catbox-memory to 4.0.1 from 3.1.3
- [#3832](https://github.com/hapijs/hapi/issues/3832) Feature: built in cookie validation
- [#3831](https://github.com/hapijs/hapi/issues/3831) State autoValue function overwrites existing cookie value
- [#3822](https://github.com/hapijs/hapi/pull/3822) Use WHATWG URL for request.url

## Version 17 {#v17}

### [17.9.4](https://github.com/hapijs/hapi/milestone/292) {#17.9.4}

- [#4226](https://github.com/hapijs/hapi/issues/4226) v17 fails to include response payload in POST requests

### [17.9.3](https://github.com/hapijs/hapi/milestone/280) {#17.9.3}

- [#4109](https://github.com/hapijs/hapi/issues/4109) Update deps

### [17.9.2](https://github.com/hapijs/hapi/milestone/265) {#17.9.2}

- [#4047](https://github.com/hapijs/hapi/issues/4047) Update deps
- [#4025](https://github.com/hapijs/hapi/issues/4025) Update deps

### [17.9.0](https://github.com/hapijs/hapi/milestone/261) {#17.9.0}

- [#3942](https://github.com/hapijs/hapi/issues/3942) Change module namespace v17

### [17.8.5](https://github.com/hapijs/hapi/milestone/260) {#17.8.5}

- [#3903](https://github.com/hapijs/hapi/pull/3903) Handle signals in onRequest. Closes #3884

### [17.8.4](https://github.com/hapijs/hapi/milestone/258) {#17.8.4}

- [#3921](https://github.com/hapijs/hapi/issues/3921) Update hapijs/bourne to 1.1.1 from 1.0.0

### [17.8.3](https://github.com/hapijs/hapi/milestone/256) {#17.8.3}

- [#3915](https://github.com/hapijs/hapi/issues/3915) Shrinkwrap typo

### [17.8.2](https://github.com/hapijs/hapi/milestone/255) {#17.8.2}

- [#3913](https://github.com/hapijs/hapi/issues/3913) Update hapijs/statehood to 6.0.9 from 6.0.8
- [#3911](https://github.com/hapijs/hapi/issues/3911) Update hapijs/subtext to 6.0.12 from 6.0.11

### [17.8.1](https://github.com/hapijs/hapi/milestone/252) {#17.8.1}

- [#3886](https://github.com/hapijs/hapi/issues/3886) Protect against invalid strategy name in server.auth.verify()

### [17.8.0](https://github.com/hapijs/hapi/milestone/250) {#17.8.0}

- [#3885](https://github.com/hapijs/hapi/issues/3885) Support credentials verficiation

### [17.7.0](https://github.com/hapijs/hapi/milestone/247) {#17.7.0}

- [#3867](https://github.com/hapijs/hapi/issues/3867) Specify node, hapi, and plugin version requirements

### [17.6.4](https://github.com/hapijs/hapi/milestone/245) {#17.6.4}

- [#3863](https://github.com/hapijs/hapi/issues/3863) Remove engines

### [17.6.3](https://github.com/hapijs/hapi/milestone/244) {#17.6.3}

- [#3860](https://github.com/hapijs/hapi/issues/3860) Update hapijs/subtext to 6.0.10 from 6.0.9

### [17.6.2](https://github.com/hapijs/hapi/milestone/243) {#17.6.2}

- [#3857](https://github.com/hapijs/hapi/issues/3857) Include shrinkwrap file in dist

### [17.6.1](https://github.com/hapijs/hapi/milestone/242) {#17.6.1}

- [#3856](https://github.com/hapijs/hapi/issues/3856) Update hapijs/vise to 3.0.1 from 3.0.0
- [#3855](https://github.com/hapijs/hapi/issues/3855) Update hapijs/topo to 3.0.2 from 3.0.1
- [#3854](https://github.com/hapijs/hapi/issues/3854) Update hapijs/subtext to 6.0.9 from 6.0.7
- [#3853](https://github.com/hapijs/hapi/issues/3853) Update hapijs/statehood to 6.0.7 from 6.0.6
- [#3852](https://github.com/hapijs/hapi/issues/3852) Update hapijs/shot to 4.0.6 from 4.0.5
- [#3851](https://github.com/hapijs/hapi/issues/3851) Update hapijs/podium to 3.1.4 from 3.1.2
- [#3850](https://github.com/hapijs/hapi/issues/3850) Update jshttp/mime-db to 1.37.0 from 1.35.0
- [#3849](https://github.com/hapijs/hapi/issues/3849) Update hapijs/nigel to 3.0.3 from 3.0.1
- [#3848](https://github.com/hapijs/hapi/issues/3848) Update hapijs/mimos to 4.0.1 from 4.0.0
- [#3847](https://github.com/hapijs/hapi/issues/3847) Update hapijs/joi to 14.0.3 from 13.5.2
- [#3846](https://github.com/hapijs/hapi/issues/3846) Update hueniverse/iron to 5.0.5 from 5.0.3
- [#3845](https://github.com/hapijs/hapi/issues/3845) Update hapijs/heavy to 6.1.1 from 6.1.0
- [#3844](https://github.com/hapijs/hapi/issues/3844) Update hapijs/catbox-memory to 3.1.3 from 3.1.2
- [#3843](https://github.com/hapijs/hapi/issues/3843) Update hapijs/catbox to 10.0.4 from 10.0.3
- [#3842](https://github.com/hapijs/hapi/issues/3842) Update hapijs/call to 5.0.2 from 5.0.1
- [#3841](https://github.com/hapijs/hapi/issues/3841) Update hapijs/bounce to 1.2.1 from 1.2.0
- [#3840](https://github.com/hapijs/hapi/issues/3840) Update hapijs/boom to 7.2.1 from 7.2.0
- [#3839](https://github.com/hapijs/hapi/issues/3839) Update hapijs/b64 to 4.1.1 from 4.0.0
- [#3838](https://github.com/hapijs/hapi/issues/3838) Update hapijs/ammo to 3.0.2 from 3.0.1
- [#3837](https://github.com/hapijs/hapi/issues/3837) Update hapijs/accept to 3.1.2 from 3.0.2
- [#3836](https://github.com/hapijs/hapi/issues/3836) Update hapijs/wreck to 14.1.2 from 14.0.2
- [#3835](https://github.com/hapijs/hapi/issues/3835) Update hapijs/pez to 4.0.4 from 4.0.2
- [#3834](https://github.com/hapijs/hapi/issues/3834) Update hapijs/nigel to 3.0.3 from 3.0.1

### [17.6.0](https://github.com/hapijs/hapi/milestone/241) {#17.6.0}

- [#3827](https://github.com/hapijs/hapi/issues/3827) Expose request active status
- [#3826](https://github.com/hapijs/hapi/issues/3826) Update hapijs/catbox to 10.0.3 from 10.0.2

### [17.5.5](https://github.com/hapijs/hapi/milestone/240) {#17.5.5}

- [#3821](https://github.com/hapijs/hapi/issues/3821) onPreResponse not called when error returned/rethrown from failAction of error resp validation

### [17.5.4](https://github.com/hapijs/hapi/milestone/239) {#17.5.4}

- [#3813](https://github.com/hapijs/hapi/issues/3813) redirecting in onRequest throws Cannot read property 'isOriginMatch' of null

### [17.5.3](https://github.com/hapijs/hapi/milestone/238) <span class="breaking-badge"></span> {#17.5.3}

- [#3808](https://github.com/hapijs/hapi/issues/3808) Update jshttp/mime-db to 1.35.0 from 1.33.0
- [#3807](https://github.com/hapijs/hapi/issues/3807) Update hapijs/joi to 13.5.2 from 13.2.0
- [#3792](https://github.com/hapijs/hapi/issues/3792) Global cors and security options not respected in 404
- [#3782](https://github.com/hapijs/hapi/issues/3782) Content type on empty string payloads
- [#3728](https://github.com/hapijs/hapi/issues/3728) request.response should be null when response failed to transmit

### [17.5.2](https://github.com/hapijs/hapi/milestone/237) {#17.5.2}

- [#3801](https://github.com/hapijs/hapi/issues/3801) Update hapijs/cryptiles to 4.1.2 from 4.1.1

### [17.5.1](https://github.com/hapijs/hapi/milestone/236) {#17.5.1}

- [#3796](https://github.com/hapijs/hapi/pull/3796) do not attach request decorations to a shared prototype, alternative approach.
- [#3718](https://github.com/hapijs/hapi/issues/3718) Request decorations leak across server instances in same process

### [17.5.0](https://github.com/hapijs/hapi/milestone/235) {#17.5.0}

- [#3791](https://github.com/hapijs/hapi/pull/3791) support symbol properties in server.decorate()

### [17.4.0](https://github.com/hapijs/hapi/milestone/234) {#17.4.0}

- [#3786](https://github.com/hapijs/hapi/issues/3786) Update hapijs/joi to 13.2.0 from 13.1.2
- [#3785](https://github.com/hapijs/hapi/issues/3785) Update hapijs/ammo to 3.0.1 from 3.0.0
- [#3784](https://github.com/hapijs/hapi/issues/3784) Update arb/big-time to 2.0.1 from 2.0.0
- [#3775](https://github.com/hapijs/hapi/pull/3775) Add support for Referrer-Policy header

### [17.3.1](https://github.com/hapijs/hapi/milestone/233) {#17.3.1}

- [#3766](https://github.com/hapijs/hapi/pull/3766) Add PATCH to `created` status, better error msg
- [#3765](https://github.com/hapijs/hapi/pull/3765) Respect a response status schema of true

### [17.3.0](https://github.com/hapijs/hapi/milestone/232) {#17.3.0}

- [#3772](https://github.com/hapijs/hapi/issues/3772) Update hapijs/catbox-memory to 3.1.2 from 3.1.1
- [#3771](https://github.com/hapijs/hapi/issues/3771) Update hapijs/nigel to 3.0.1 from 3.0.2
- [#3770](https://github.com/hapijs/hapi/issues/3770) Update hapijs/pez to 4.0.2 from 4.0.1
- [#3769](https://github.com/hapijs/hapi/issues/3769) Update hapijs/statehood to 6.0.6 from 6.0.5
- [#3768](https://github.com/hapijs/hapi/issues/3768) Update hapijs/content to 4.0.5 from 4.0.4
- [#3767](https://github.com/hapijs/hapi/issues/3767) server.control()

### [17.2.3](https://github.com/hapijs/hapi/milestone/231) {#17.2.3}

- [#3760](https://github.com/hapijs/hapi/issues/3760) Fix checksums

### [17.2.2](https://github.com/hapijs/hapi/milestone/230) {#17.2.2}

- [#3758](https://github.com/hapijs/hapi/issues/3758) Request log with function data sends incorrect data
- [#3741](https://github.com/hapijs/hapi/pull/3741) Replace new Buffer()

### [17.2.1](https://github.com/hapijs/hapi/milestone/229) <span class="breaking-badge"></span> {#17.2.1}

- [#3756](https://github.com/hapijs/hapi/issues/3756) Update hapijs/shot to 4.0.5 from 4.0.3
- [#3755](https://github.com/hapijs/hapi/issues/3755) Update hapijs/joi to 13.1.2 from 13.0.1
- [#3754](https://github.com/hapijs/hapi/issues/3754) Update jshttp/mime-db to 1.33.0 from 1.31.0
- [#3753](https://github.com/hapijs/hapi/issues/3753) Update hapijs/hoek to 5.0.3 from 5.0.2
- [#3752](https://github.com/hapijs/hapi/issues/3752) Update hapijs/content to 4.0.4 from 4.0.3
- [#3751](https://github.com/hapijs/hapi/issues/3751) Update hueniverse/bounce to 1.2.0 from 1.0.3
- [#3750](https://github.com/hapijs/hapi/issues/3750) Update hapijs/boom to 7.2.0 from 7.1.1
- [#3717](https://github.com/hapijs/hapi/pull/3717) Prefer user added encoding over built-in
- [#3701](https://github.com/hapijs/hapi/issues/3701) Enable registered encoders to have higher priority than built-in

### [17.2.0](https://github.com/hapijs/hapi/milestone/228) {#17.2.0}

- [#3715](https://github.com/hapijs/hapi/issues/3715) Basic concurrent load queue
- [#3714](https://github.com/hapijs/hapi/issues/3714) Update hapijs/heavy to 6.1.0 from 6.0.0
- [#3712](https://github.com/hapijs/hapi/issues/3712) Missing return in dispatch()
- [#3711](https://github.com/hapijs/hapi/issues/3711) Cache stop() errors are not handled
- [#3708](https://github.com/hapijs/hapi/issues/3708) Errors in "onPostStart" ext leave listener active forever
- [#3702](https://github.com/hapijs/hapi/pull/3702) Fix server method registered as object without options

### [17.1.1](https://github.com/hapijs/hapi/milestone/227) {#17.1.1}

- [#3688](https://github.com/hapijs/hapi/issues/3688) Hapi v17.0.2 cors origin

### [17.1.0](https://github.com/hapijs/hapi/milestone/226) {#17.1.0}

- [#3691](https://github.com/hapijs/hapi/issues/3691) Route rules
- [#3689](https://github.com/hapijs/hapi/pull/3689) Include method name in error
- [#3125](https://github.com/hapijs/hapi/issues/3125) Allow decoration overrides with parent access support

### [17.0.2](https://github.com/hapijs/hapi/milestone/225) {#17.0.2}

- [#3686](https://github.com/hapijs/hapi/issues/3686) Log errors thrown in custom response close method
- [#3679](https://github.com/hapijs/hapi/pull/3679) [enhancement] https accept-encoding header brotli for chrome
- [#3675](https://github.com/hapijs/hapi/issues/3675) Optimize accept-encoding for the most common headers
- [#3674](https://github.com/hapijs/hapi/issues/3674) Update hapijs/cryptiles to 4.1.1 from 4.1.0

### [17.0.1](https://github.com/hapijs/hapi/milestone/224) {#17.0.1}

- [#3668](https://github.com/hapijs/hapi/issues/3668) Bypass authorization when authentication bypassed

### [17.0.0](https://github.com/hapijs/hapi/milestone/221) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/3658" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#17.0.0}

- [#3665](https://github.com/hapijs/hapi/issues/3665) Rename route 'config' with 'options'
- [#3663](https://github.com/hapijs/hapi/pull/3663) Loosen sample and modify peer validator in the routeBase schema
- [#3662](https://github.com/hapijs/hapi/issues/3662) prerequisite returning empty string yields null on the pre object of request
- [#3658](https://github.com/hapijs/hapi/issues/3658) 17.0.0 Release Notes
- [#3657](https://github.com/hapijs/hapi/issues/3657) Update hapijs/vise to 3.0.0 from 2.0.2
- [#3656](https://github.com/hapijs/hapi/issues/3656) Update hapijs/topo to 3.0.0 from 2.0.2
- [#3655](https://github.com/hapijs/hapi/issues/3655) Update hapijs/podium to 3.1.2 from 1.3.0
- [#3653](https://github.com/hapijs/hapi/issues/3653) Update hapijs/nigel to 3.0.0 from 2.0.2
- [#3652](https://github.com/hapijs/hapi/issues/3652) Update hapijs/mimos to 4.0.0 from 3.0.3
- [#3651](https://github.com/hapijs/hapi/issues/3651) Update jshttp/mime-db to 1.31.0 from 1.29.0
- [#3650](https://github.com/hapijs/hapi/issues/3650) Update hueniverse/iron to 5.0.4 from 4.0.5
- [#3649](https://github.com/hapijs/hapi/issues/3649) Update hapijs/hoek to 5.0.2 from 4.2.0
- [#3648](https://github.com/hapijs/hapi/issues/3648) Update hapijs/cryptiles to 4.1.0 from 3.1.2
- [#3647](https://github.com/hapijs/hapi/issues/3647) Update hapijs/content to 4.0.3 from 3.0.6
- [#3646](https://github.com/hapijs/hapi/issues/3646) Update hapijs/catbox-memory to 3.1.1 from 2.0.4
- [#3645](https://github.com/hapijs/hapi/issues/3645) Update hapijs/catbox to 10.0.2 from 7.1.5
- [#3644](https://github.com/hapijs/hapi/issues/3644) Update hapijs/call to 5.0.1 from 4.0.2
- [#3643](https://github.com/hapijs/hapi/issues/3643) Update hapijs/boom to 7.1.1 from 5.2.0
- [#3642](https://github.com/hapijs/hapi/issues/3642) Update hapijs/b64 to 4.0.0 from 3.0.2
- [#3641](https://github.com/hapijs/hapi/issues/3641) Update hapijs/ammo to 3.0.0 from 2.0.4
- [#3640](https://github.com/hapijs/hapi/issues/3640) Update hapijs/accept to 3.0.2 from 2.1.4
- [#3639](https://github.com/hapijs/hapi/issues/3639) Update hapijs/statehood to 6.0.5 from 5.0.3
- [#3638](https://github.com/hapijs/hapi/issues/3638) Update hapijs/shot to 4.0.3 from 3.4.2
- [#3637](https://github.com/hapijs/hapi/issues/3637) Update hapijs/heavy to 6.0.0 from 4.0.4
- [#3636](https://github.com/hapijs/hapi/issues/3636) Update hapijs/wreck to 14.0.2 from 13.0.3
- [#3635](https://github.com/hapijs/hapi/issues/3635) Expose payload and credentials to dynamic scopes
- [#3634](https://github.com/hapijs/hapi/issues/3634) onCredentials ext point
- [#3633](https://github.com/hapijs/hapi/issues/3633) Separate authorization (403) from authentication (401)
- [#3632](https://github.com/hapijs/hapi/pull/3632) Add negative test on registering plugin twice without `once`
- [#3631](https://github.com/hapijs/hapi/issues/3631) When event data is an error, field name is error
- [#3630](https://github.com/hapijs/hapi/issues/3630) Replace events 'internal` bool with 'channel' property
- [#3629](https://github.com/hapijs/hapi/issues/3629) Remove request.getLog() method
- [#3628](https://github.com/hapijs/hapi/issues/3628) Combine all request events into single event
- [#3627](https://github.com/hapijs/hapi/issues/3627) Remove server argument from 'route' event
- [#3626](https://github.com/hapijs/hapi/issues/3626) Update hapijs/subtext to 6.0.7 from 6.0.3
- [#3625](https://github.com/hapijs/hapi/issues/3625) Update hapijs/pez to 4.0.1 from 2.1.5
- [#3624](https://github.com/hapijs/hapi/issues/3624) Send 400 bad request on parse error
- [#3621](https://github.com/hapijs/hapi/issues/3621) Remove certain passThrough headers
- [#3618](https://github.com/hapijs/hapi/issues/3618) Replace plugin interface to object
- [#3616](https://github.com/hapijs/hapi/issues/3616) Change validation errors
- [#3615](https://github.com/hapijs/hapi/issues/3615) Normalize server methods to always return plain value
- [#3614](https://github.com/hapijs/hapi/issues/3614) Remove envelope from server.table()
- [#3613](https://github.com/hapijs/hapi/issues/3613) Combine server.handler() with server.decorate()
- [#3612](https://github.com/hapijs/hapi/issues/3612) Remove mode support from server.auth.strategy()
- [#3609](https://github.com/hapijs/hapi/issues/3609) Update hapijs/joi to 13.0.1 from 11.1.0
- [#3607](https://github.com/hapijs/hapi/issues/3607) Normalize failAction across the entire framework
- [#3605](https://github.com/hapijs/hapi/issues/3605) Remove source argument from validation failAction method
- [#3604](https://github.com/hapijs/hapi/issues/3604) request.auth.strategy is not documented
- [#3602](https://github.com/hapijs/hapi/pull/3602) exclude connection header in response passThrough
- [#3599](https://github.com/hapijs/hapi/issues/3599) Provide a way to flush compression stream on demand
- [#3598](https://github.com/hapijs/hapi/pull/3598) Implement wildcardIgnoresOrigin CORS option
- [#3597](https://github.com/hapijs/hapi/issues/3597) Rename reply interface to toolkit
- [#3596](https://github.com/hapijs/hapi/issues/3596) Move request.id to request.info.id
- [#3595](https://github.com/hapijs/hapi/issues/3595) Explicit Context
- [#3594](https://github.com/hapijs/hapi/issues/3594) Support compression minimum length
- [#3592](https://github.com/hapijs/hapi/issues/3592) Change reply interface from function to object
- [#3591](https://github.com/hapijs/hapi/issues/3591) Normalize lifecycle
- [#3590](https://github.com/hapijs/hapi/issues/3590) Remove HTML escaping of joi errors
- [#3589](https://github.com/hapijs/hapi/issues/3589) Move request and server events to `events` getter
- [#3583](https://github.com/hapijs/hapi/issues/3583) Reduce request internal logging
- [#3580](https://github.com/hapijs/hapi/issues/3580) Remove server methods string handlers shortcut
- [#3579](https://github.com/hapijs/hapi/pull/3579) v17 rc 4
- [#3574](https://github.com/hapijs/hapi/issues/3574) Move all server events to server.events
- [#3573](https://github.com/hapijs/hapi/issues/3573) Remove domains
- [#3572](https://github.com/hapijs/hapi/issues/3572) Remove support for multiple connection in a single server
- [#3571](https://github.com/hapijs/hapi/issues/3571) Drop support for request tails
- [#3567](https://github.com/hapijs/hapi/issues/3567) response validate options for 'modify' and 'sample' is too strict
- [#3509](https://github.com/hapijs/hapi/issues/3509) Return 413 when payload is too big
- [#3434](https://github.com/hapijs/hapi/issues/3434) Validate params rules against path params
- [#3423](https://github.com/hapijs/hapi/issues/3423) CDN friendly CORS: remove "Vary: Origin" for wildcard CORS origins
- [#3334](https://github.com/hapijs/hapi/issues/3334) Handle multiple parallel registrations
- [#3297](https://github.com/hapijs/hapi/issues/3297) Pass plugin's server rather than root server to route config function
- [#3152](https://github.com/hapijs/hapi/issues/3152) reply.code(value) ignored when payload is empty and emptyStatusCode is set
- [#3150](https://github.com/hapijs/hapi/issues/3150) server.method doesn't resolve promise with cache options
- [#3066](https://github.com/hapijs/hapi/issues/3066) Allow access to parent realm

## Version 16 {#v16}

### [16.8.3](https://github.com/hapijs/hapi/milestone/281) {#16.8.3}

- [#4108](https://github.com/hapijs/hapi/issues/4108) Support node 12

### [16.8.2](https://github.com/hapijs/hapi/milestone/268) {#16.8.2}

- [#4048](https://github.com/hapijs/hapi/issues/4048) Update deps

### [16.8.1](https://github.com/hapijs/hapi/milestone/263) {#16.8.1}

- [#3960](https://github.com/hapijs/hapi/issues/3960) Send 400 bad request on parse error

### [16.8.0](https://github.com/hapijs/hapi/milestone/262) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/3937" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#16.8.0}

- [#3937](https://github.com/hapijs/hapi/issues/3937) 16.8.0-Commercial Release Notes
- [#3933](https://github.com/hapijs/hapi/issues/3933) v16 commercial license version
- [#3932](https://github.com/hapijs/hapi/issues/3932) Discontinued support for hapi v16
- [#3899](https://github.com/hapijs/hapi/issues/3899) v16: look into compatibility with node 10

### [16.7.0](https://github.com/hapijs/hapi/milestone/249) {#16.7.0}

- [#3869](https://github.com/hapijs/hapi/issues/3869) Specify node, hapi, and plugin version requirements (#3867)

### [16.6.5](https://github.com/hapijs/hapi/milestone/248) {#16.6.5}

- [#3866](https://github.com/hapijs/hapi/issues/3866) Remove engines

### [16.6.4](https://github.com/hapijs/hapi/milestone/246) <span class="breaking-badge"></span> {#16.6.4}

- [#3862](https://github.com/hapijs/hapi/issues/3862) Remove support for node 4
- [#3861](https://github.com/hapijs/hapi/issues/3861) Remove shrinkwrap

### [16.6.2](https://github.com/hapijs/hapi/milestone/223) {#16.6.2}

- [#3586](https://github.com/hapijs/hapi/issues/3586) Remove per-response events emitter validation

### [16.6.1](https://github.com/hapijs/hapi/milestone/222) {#16.6.1}

- [#3585](https://github.com/hapijs/hapi/issues/3585) Update hapijs/joi to 11.1.0 from 10.6.0
- [#3582](https://github.com/hapijs/hapi/pull/3582) Support joi 11 paths arrays. Fixes #3581.

### [16.6.0](https://github.com/hapijs/hapi/milestone/220) {#16.6.0}

- [#3570](https://github.com/hapijs/hapi/issues/3570) Update hapijs/content to 3.0.6 from 3.0.5
- [#3560](https://github.com/hapijs/hapi/pull/3560) fix response.message(httpMessage)
- [#3506](https://github.com/hapijs/hapi/pull/3506) Add json escape option

### [16.5.2](https://github.com/hapijs/hapi/milestone/219) {#16.5.2}

- [#3561](https://github.com/hapijs/hapi/issues/3561) Aborted responses return 200 code in inject

### [16.5.1](https://github.com/hapijs/hapi/milestone/218) {#16.5.1}

- [#3552](https://github.com/hapijs/hapi/issues/3552) Updating from 16.4.3 to 16.5.0: Podium.decorate is not a function error
- [#3528](https://github.com/hapijs/hapi/issues/3528) "disconnect" event on the "request" object is never emitted

### [16.5.0](https://github.com/hapijs/hapi/milestone/217) {#16.5.0}

- [#3551](https://github.com/hapijs/hapi/issues/3551) Update hapijs/statehood to 5.0.3 from 5.0.2
- [#3550](https://github.com/hapijs/hapi/issues/3550) Update hapijs/content to 3.0.5 from 3.0.4
- [#3548](https://github.com/hapijs/hapi/issues/3548) Update hapijs/boom to 5.2.0 from 5.1.0
- [#3545](https://github.com/hapijs/hapi/issues/3545) Update hapijs/joi to 10.6.0 from 10.5.2
- [#3544](https://github.com/hapijs/hapi/issues/3544) Update jshttp/mime-db to 1.29.0 from 1.28.0
- [#3543](https://github.com/hapijs/hapi/issues/3543) Update hapijs/catbox to 7.1.5 from 7.1.4
- [#3542](https://github.com/hapijs/hapi/issues/3542) Update hapijs/podium to 1.3.0 from 1.2.5
- [#3541](https://github.com/hapijs/hapi/issues/3541) Update hapijs/hoek to 4.2.0 from 4.1.1
- [#3539](https://github.com/hapijs/hapi/pull/3539) Add payload fail action custom handler
- [#3533](https://github.com/hapijs/hapi/issues/3533) Update hapijs/subtext to 5.0.0 from 4.4.1
- [#3532](https://github.com/hapijs/hapi/issues/3532) Remove joi validation when creating request podium events
- [#3531](https://github.com/hapijs/hapi/pull/3531) Return 413 when payload too large.
- [#3526](https://github.com/hapijs/hapi/pull/3526) Consider wildcard filtering for debug options
- [#3523](https://github.com/hapijs/hapi/pull/3523) Update lab and fix indentation
- [#3520](https://github.com/hapijs/hapi/pull/3520) Fixed validation of server's Joi options
- [#3519](https://github.com/hapijs/hapi/pull/3519) allow decoration of reply with non functions
- [#3516](https://github.com/hapijs/hapi/issues/3516) Invalid cookie header despite strictHeader: false, ignoreErrors: true
- [#3483](https://github.com/hapijs/hapi/issues/3483) Filename detecting problem on uploading file with apostrophes
- [#3480](https://github.com/hapijs/hapi/issues/3480) RST packet instead of a FIN packet to close the response on Heroku
- [#3464](https://github.com/hapijs/hapi/issues/3464) Throwing inside response event breaks new events

### [16.4.3](https://github.com/hapijs/hapi/milestone/216) {#16.4.3}

- [#3514](https://github.com/hapijs/hapi/issues/3514) TypeError: Cannot set property 'hostname' of undefined

### [16.4.2](https://github.com/hapijs/hapi/milestone/215) {#16.4.2}

- [#3517](https://github.com/hapijs/hapi/issues/3517) Restore npm-shrinkwrap.json file

### [16.4.1](https://github.com/hapijs/hapi/milestone/214) {#16.4.1}

- [#3512](https://github.com/hapijs/hapi/issues/3512) Remove npm-shrinkwrap

### [16.4.0](https://github.com/hapijs/hapi/milestone/213) {#16.4.0}

- [#3511](https://github.com/hapijs/hapi/issues/3511) Update hapijs/joi to 10.5.2 from 10.5.1
- [#3505](https://github.com/hapijs/hapi/issues/3505) Remove isemail deps from shrinkwrap
- [#3486](https://github.com/hapijs/hapi/pull/3486) Provide cover for unhandled rejections
- [#3429](https://github.com/hapijs/hapi/issues/3429) Better support for async handlers

### [16.3.1](https://github.com/hapijs/hapi/milestone/212) {#16.3.1}

- [#3510](https://github.com/hapijs/hapi/issues/3510) Update hapijs/shot to 3.4.2 from 3.4.0
- [#3507](https://github.com/hapijs/hapi/pull/3507) Node 8 fixes

### [16.3.0](https://github.com/hapijs/hapi/milestone/211) {#16.3.0}

- [#3461](https://github.com/hapijs/hapi/pull/3461) explicitly destroy sockets on clientError
- [#3441](https://github.com/hapijs/hapi/pull/3441) Fix several request.url property issues on setUrl()
- [#3409](https://github.com/hapijs/hapi/pull/3409) Adding server.inspect to list decorated framework interfaces

### [16.2.0](https://github.com/hapijs/hapi/milestone/210) {#16.2.0}

- [#3502](https://github.com/hapijs/hapi/issues/3502) Update hapijs/wreck to 12.2.2 from 10.0.0
- [#3501](https://github.com/hapijs/hapi/issues/3501) Update hapijs/subtext to 4.4.1 from 4.3.0
- [#3500](https://github.com/hapijs/hapi/issues/3500) Update hapijs/statehood to 5.0.2 from 5.0.1
- [#3499](https://github.com/hapijs/hapi/issues/3499) Update hapijs/pez to 2.1.5 from 2.1.4
- [#3498](https://github.com/hapijs/hapi/issues/3498) Update jshttp/mime-db to 1.28.0 from 1.25.0
- [#3497](https://github.com/hapijs/hapi/issues/3497) Update hapijs/joi to 10.5.1 from 10.1.0
- [#3496](https://github.com/hapijs/hapi/issues/3496) Update hueniverse/iron to 4.0.5 from 4.0.4
- [#3495](https://github.com/hapijs/hapi/issues/3495) Update hapijs/hoek to 4.1.1 from 4.1.0
- [#3494](https://github.com/hapijs/hapi/issues/3494) Update hapijs/heavy to 4.0.4 from 4.0.3
- [#3493](https://github.com/hapijs/hapi/issues/3493) Update hapijs/cryptiles to 3.1.2 from 3.1.1
- [#3492](https://github.com/hapijs/hapi/issues/3492) Update hapijs/content to 3.0.4 from 3.0.3
- [#3491](https://github.com/hapijs/hapi/issues/3491) Update hapijs/catbox to 7.1.3 from 7.1.4
- [#3490](https://github.com/hapijs/hapi/issues/3490) Update hapijs/call to 4.0.2 from 4.0.0
- [#3489](https://github.com/hapijs/hapi/issues/3489) Update hapijs/boom to 5.1.0 from 4.2.0
- [#3488](https://github.com/hapijs/hapi/issues/3488) Update hapijs/ammo to 2.0.4 from 2.0.3
- [#3487](https://github.com/hapijs/hapi/issues/3487) Update hapijs/accept to 2.1.4 from 2.1.3
- [#3472](https://github.com/hapijs/hapi/pull/3472) Send connection close when there is unconsumed payload
- [#3470](https://github.com/hapijs/hapi/pull/3470) Defer 100-continue signalling until payload parsing
- [#3451](https://github.com/hapijs/hapi/issues/3451) Have access to request.app in Joi validation context
- [#3448](https://github.com/hapijs/hapi/pull/3448) Bind request continuation methods to current domain
- [#3447](https://github.com/hapijs/hapi/issues/3447) one server is always leaked
- [#3431](https://github.com/hapijs/hapi/issues/3431) when failAction is log or ignored, the error is assigned to request.preResponse but not request.pre
- [#3427](https://github.com/hapijs/hapi/issues/3427) reply.entity() will always return null for correct etags

### [16.1.1](https://github.com/hapijs/hapi/milestone/209) {#16.1.1}

- [#3466](https://github.com/hapijs/hapi/issues/3466) Non-handling of accept-encoding header when the value does not conform to the specification
- [#3446](https://github.com/hapijs/hapi/pull/3446) remove extra closure

### [16.1.0](https://github.com/hapijs/hapi/milestone/208) <span class="breaking-badge"></span> {#16.1.0}

- [#3416](https://github.com/hapijs/hapi/issues/3416) Update hapijs/joi to 10.1.0 from 10.0.1
- [#3415](https://github.com/hapijs/hapi/issues/3415) Allow creating multiple connections in a single server.connection() call

### [16.0.3](https://github.com/hapijs/hapi/milestone/207) {#16.0.3}

- [#3414](https://github.com/hapijs/hapi/issues/3414) Connectionless plugin fails inside connection-full plugin

### [16.0.2](https://github.com/hapijs/hapi/milestone/206) {#16.0.2}

- [#3411](https://github.com/hapijs/hapi/issues/3411) Falsey payload returns null

### [16.0.1](https://github.com/hapijs/hapi/milestone/205) {#16.0.1}

- [#3401](https://github.com/hapijs/hapi/pull/3401) Attempt to fix #3399 where it crashes on route prerequisites when no domain is present
- [#3399](https://github.com/hapijs/hapi/issues/3399) Regression on 16, lib/handlers.js

### [16.0.0](https://github.com/hapijs/hapi/milestone/204) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/3398" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#16.0.0}

- [#3398](https://github.com/hapijs/hapi/issues/3398) 16.0.0 Release Notes
- [#3397](https://github.com/hapijs/hapi/issues/3397) Update hapijs/ammo to 2.0.3 from 2.0.2
- [#3396](https://github.com/hapijs/hapi/issues/3396) Update hapijs/call to 4.0.0 from 3.0.3
- [#3395](https://github.com/hapijs/hapi/issues/3395) Update hapijs/catbox to 7.1.3 from 7.1.2
- [#3394](https://github.com/hapijs/hapi/issues/3394) Update hapijs/heavy to 4.0.3 from 4.0.2
- [#3393](https://github.com/hapijs/hapi/issues/3393) Update hapijs/podium to 1.2.5 from 1.2.3
- [#3392](https://github.com/hapijs/hapi/issues/3392) Update hapijs/shot to 3.4.0 from 3.3.2
- [#3391](https://github.com/hapijs/hapi/issues/3391) Update hapijs/statehood to 5.0.1 from 5.0.0
- [#3390](https://github.com/hapijs/hapi/issues/3390) Update jshttp/mime-db to 1.25.0 from 1.23.0
- [#3389](https://github.com/hapijs/hapi/issues/3389) Update hapijs/content to 3.0.3 from 3.0.2
- [#3388](https://github.com/hapijs/hapi/issues/3388) Update hapijs/pez to 2.1.4 from 2.1.2
- [#3387](https://github.com/hapijs/hapi/issues/3387) Update hapijs/accept to 2.1.3 from 2.1.2
- [#3386](https://github.com/hapijs/hapi/issues/3386) Update hapijs/catbox-memory to 2.0.4 from 2.0.3
- [#3385](https://github.com/hapijs/hapi/issues/3385) Update hapijs/joi to 10.0.1 from 9.0.4
- [#3384](https://github.com/hapijs/hapi/issues/3384) Update hapijs/cryptiles to 3.1.1 from 3.0.2
- [#3383](https://github.com/hapijs/hapi/issues/3383) Update hapijs/boom to 4.2.0 from 4.0.0
- [#3381](https://github.com/hapijs/hapi/issues/3381) problems with Promise error handling in plugin registration
- [#3380](https://github.com/hapijs/hapi/pull/3380) Ensure Boom objects can be reused - Fix for issue #3378
- [#3378](https://github.com/hapijs/hapi/issues/3378) Server fails to reuse Boom object
- [#3372](https://github.com/hapijs/hapi/pull/3372) Allow HTTPS long poll requests
- [#3369](https://github.com/hapijs/hapi/issues/3369) Deprecation Warning in Node v7.0.0 for call to os.tmpDir
- [#3368](https://github.com/hapijs/hapi/pull/3368) change deprecated os.tmpDir call to os.tmpdir
- [#3359](https://github.com/hapijs/hapi/issues/3359) Shrinkwrap fails with hapi version 15.1.1
- [#3358](https://github.com/hapijs/hapi/pull/3358) fix server not propagating errors on prehandler(promise) + handler error (#3242)
- [#3347](https://github.com/hapijs/hapi/issues/3347) Major performance issue with hapi.js 15.x
- [#3242](https://github.com/hapijs/hapi/issues/3242) Using promises in prehandlers causes exceptions to be swallowed in handlers.

## Version 15 {#v15}

### [15.2.0](https://github.com/hapijs/hapi/milestone/203) {#15.2.0}

- [#3366](https://github.com/hapijs/hapi/issues/3366) Update hapijs/subtext to 4.3.0 from 4.2.2
- [#3355](https://github.com/hapijs/hapi/issues/3355) Update hapijs/wreck to 10.0.0 from 9.0.0
- [#3354](https://github.com/hapijs/hapi/issues/3354) Update hapijs/subtext to 4.2.2 from 4.2.1
- [#3352](https://github.com/hapijs/hapi/issues/3352) npm shrinkwrap produces error with hapi
- [#3351](https://github.com/hapijs/hapi/pull/3351) Fix subtext shrinkwrap
- [#3051](https://github.com/hapijs/hapi/issues/3051) payload output inconsistent for single payload vs multipart

### [15.1.0](https://github.com/hapijs/hapi/milestone/202) {#15.1.0}

- [#3350](https://github.com/hapijs/hapi/issues/3350) Conditional plugin connection-less mode
- [#3342](https://github.com/hapijs/hapi/pull/3342) Update hapijs/shot to 3.3.2 from 3.3.1
- [#3341](https://github.com/hapijs/hapi/issues/3341) Update hapijs/shot to 3.3.2 from 3.3.1
- [#3339](https://github.com/hapijs/hapi/pull/3339) Restore npm-shrinkwrap.json to package. Closes #3338
- [#3338](https://github.com/hapijs/hapi/issues/3338) `npm-shrinkwrap.json` not included in published `hapi` package

### [15.0.3](https://github.com/hapijs/hapi/milestone/201) {#15.0.3}

- [#3332](https://github.com/hapijs/hapi/issues/3332) Update hapijs/podium to 1.2.3 from 1.2.1
- [#3330](https://github.com/hapijs/hapi/issues/3330) Events not emitted when route handler throws

### [15.0.2](https://github.com/hapijs/hapi/milestone/200) <span class="breaking-badge"></span> {#15.0.2}

- [#3325](https://github.com/hapijs/hapi/issues/3325) Allow initializing server without connections
- [#3324](https://github.com/hapijs/hapi/issues/3324) Verify plugin dependencies for connections added after initialize() or start()

### [15.0.1](https://github.com/hapijs/hapi/milestone/199) {#15.0.1}

### [15.0.0](https://github.com/hapijs/hapi/milestone/198) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/3323" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#15.0.0}

- [#3323](https://github.com/hapijs/hapi/issues/3323) 15.0.0 Release Notes
- [#3322](https://github.com/hapijs/hapi/pull/3322) Bump hapijs/boom version to 4.0.0 from 3.2.2
- [#3320](https://github.com/hapijs/hapi/issues/3320) Update hapijs/boom to 4.0.0 from 3.2.2
- [#3318](https://github.com/hapijs/hapi/issues/3318) Update hapijs/statehood to 5.0.0 from 4.0.3
- [#3317](https://github.com/hapijs/hapi/issues/3317) Update hueniverse/iron to 4.0.3 from 4.0.2
- [#3316](https://github.com/hapijs/hapi/issues/3316) Update hapijs/wreck to 9.0.0 from 8.0.1
- [#3315](https://github.com/hapijs/hapi/issues/3315) Update hapijs/call to 3.0.3 from 3.0.2
- [#3314](https://github.com/hapijs/hapi/issues/3314) Update hapijs/ammo to 2.0.2 from 2.0.1
- [#3313](https://github.com/hapijs/hapi/issues/3313) Expose request to server.encode() and decode() generators
- [#3308](https://github.com/hapijs/hapi/pull/3308) Response validation custom handler
- [#3307](https://github.com/hapijs/hapi/issues/3307) Update hapijs/shot to 3.3.1 from 3.1.1
- [#3306](https://github.com/hapijs/hapi/issues/3306) Disable request getLog() by default
- [#3304](https://github.com/hapijs/hapi/issues/3304) Errors when reply.continue() is called with an non-auth argument
- [#3303](https://github.com/hapijs/hapi/issues/3303) Error when reply() is called with a third argument (non-auth)
- [#3302](https://github.com/hapijs/hapi/issues/3302) Access to scope errors list from a Forbidden error
- [#3300](https://github.com/hapijs/hapi/issues/3300) Support custom content-type payload decoders
- [#3299](https://github.com/hapijs/hapi/issues/3299) Update hapijs/subtext to 4.2.0 from 4.0.5
- [#3298](https://github.com/hapijs/hapi/issues/3298) Allow extending server encoding support
- [#3296](https://github.com/hapijs/hapi/issues/3296) Custom events
- [#3295](https://github.com/hapijs/hapi/issues/3295) server.register callback handling does not enforce process.nextTick
- [#3294](https://github.com/hapijs/hapi/issues/3294) Replace node's EventEmitter interface
- [#3292](https://github.com/hapijs/hapi/issues/3292) The "Vary: accept-encoding" header is not always set
- [#3291](https://github.com/hapijs/hapi/pull/3291) Ensure that 206 responses are never compressed
- [#3275](https://github.com/hapijs/hapi/issues/3275) Support for route authorization
- [#3243](https://github.com/hapijs/hapi/issues/3243) Content type charset handling
- [#3237](https://github.com/hapijs/hapi/issues/3237) Set response status message.
- [#3227](https://github.com/hapijs/hapi/pull/3227) Set route validation bind context
- [#3214](https://github.com/hapijs/hapi/issues/3214) Support failAction function on validation response failures
- [#3201](https://github.com/hapijs/hapi/pull/3201) handle more types of promise rejection, for #3102
- [#3194](https://github.com/hapijs/hapi/issues/3194) output validation error pass source along
- [#3179](https://github.com/hapijs/hapi/pull/3179) Send correct response for HEAD requests
- [#3122](https://github.com/hapijs/hapi/issues/3122) Logging improvement
- [#3102](https://github.com/hapijs/hapi/issues/3102) Rejected promises are returned as successful status codes
- [#3065](https://github.com/hapijs/hapi/issues/3065) Move HTTP response header validation to node
- [#3061](https://github.com/hapijs/hapi/issues/3061) Bug with using Joi.object() for route validation
- [#3055](https://github.com/hapijs/hapi/issues/3055) Allow onPreResponse to override response and execute other extensions
- [#3030](https://github.com/hapijs/hapi/issues/3030) Server stop timeout and multiple connections

## Version 14 {#v14}

### [14.2.0](https://github.com/hapijs/hapi/milestone/197) {#14.2.0}

- [#3286](https://github.com/hapijs/hapi/issues/3286) Support unmodified early return

### [14.1.0](https://github.com/hapijs/hapi/milestone/196) {#14.1.0}

- [#3277](https://github.com/hapijs/hapi/issues/3277) Route config function

### [14.0.0](https://github.com/hapijs/hapi/milestone/195) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/3272" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#14.0.0}

- [#3272](https://github.com/hapijs/hapi/issues/3272) 14.0.0 Release Notes
- [#3271](https://github.com/hapijs/hapi/issues/3271) hapi 13.5.1 (and 13.5.2) break if routes still use joi 8.x

## Version 13 {#v13}

### [13.5.2](https://github.com/hapijs/hapi/milestone/194) {#13.5.2}

- [#3249](https://github.com/hapijs/hapi/issues/3249) Update hapijs/catbox to 7.1.2 from 7.1.1

### [13.5.1](https://github.com/hapijs/hapi/milestone/193) {#13.5.1}

- [#3270](https://github.com/hapijs/hapi/issues/3270) Update hapijs/topo to 2.0.2 from 2.0.1
- [#3269](https://github.com/hapijs/hapi/issues/3269) Update hapijs/wreck to 8.0.1 from 7.2.1
- [#3268](https://github.com/hapijs/hapi/issues/3268) Update hapijs/vise to 2.0.2 from 2.0.1
- [#3267](https://github.com/hapijs/hapi/issues/3267) Update hapijs/nigel to 2.0.2 from 2.0.1
- [#3266](https://github.com/hapijs/hapi/issues/3266) Update hapijs/b64 to 3.0.2 from 3.0.1
- [#3265](https://github.com/hapijs/hapi/issues/3265) Update hapijs/pez to 2.1.2 from 2.1.1
- [#3264](https://github.com/hapijs/hapi/issues/3264) Update hapijs/context to 3.0.2 from 3.0.1
- [#3263](https://github.com/hapijs/hapi/issues/3263) Update hapijs/subtext to 4.0.5 from 4.0.3
- [#3262](https://github.com/hapijs/hapi/issues/3262) Update hapijs/statehood to 4.0.3 from 4.0.1
- [#3261](https://github.com/hapijs/hapi/issues/3261) Update hapijs/shot to 3.1.1 from 3.1.0
- [#3260](https://github.com/hapijs/hapi/issues/3260) Update hapijs/peekaboo to 2.0.2 from 2.0.1
- [#3259](https://github.com/hapijs/hapi/issues/3259) Update hapijs/mimos to 3.0.3 from 3.0.2
- [#3258](https://github.com/hapijs/hapi/issues/3258) Update hapijs/kilt to 2.0.2 from 2.0.1
- [#3257](https://github.com/hapijs/hapi/issues/3257) Update moment/moment to 2.14.1 from 2.13.0
- [#3256](https://github.com/hapijs/hapi/issues/3256) Update hapijs/isemail to 2.2.1 from 2.1.0
- [#3255](https://github.com/hapijs/hapi/issues/3255) Update hapijs/joi to 9.0.4 from 8.1.0
- [#3254](https://github.com/hapijs/hapi/issues/3254) Update hapijs/items to 2.1.1 from 2.1.0
- [#3253](https://github.com/hapijs/hapi/issues/3253) Update hueniverse/iron to 4.0.2 from 4.0.1
- [#3252](https://github.com/hapijs/hapi/issues/3252) Update hapijs/heavy to 4.0.2 from 4.0.1
- [#3251](https://github.com/hapijs/hapi/issues/3251) Update hapijs/cryptiles to 3.0.2 from 3.0.1
- [#3250](https://github.com/hapijs/hapi/issues/3250) Update hapijs/catbox-memory to 2.0.3 from 2.0.2
- [#3248](https://github.com/hapijs/hapi/issues/3248) Update hapijs/call to 3.0.3 from 3.0.2
- [#3247](https://github.com/hapijs/hapi/issues/3247) Update hapijs/ammo to 2.0.2 from 2.0.1
- [#3246](https://github.com/hapijs/hapi/issues/3246) Update hapijs/hoek to 4.0.2 from 4.0.0
- [#3245](https://github.com/hapijs/hapi/issues/3245) Update hapijs/boom to 3.2.2 from 3.2.0
- [#3244](https://github.com/hapijs/hapi/issues/3244) Update hapijs/accept to 2.1.2 from 2.1.1

### [13.5.0](https://github.com/hapijs/hapi/milestone/192) {#13.5.0}

- [#3206](https://github.com/hapijs/hapi/issues/3206) override default cache headers for error pages
- [#3178](https://github.com/hapijs/hapi/pull/3178) Handle thrown error from res.setHeader() and res.writeHead()
- [#3174](https://github.com/hapijs/hapi/pull/3174) Fixes #3155 - Calling reply without a payload on a JSONP route throws

### [13.4.2](https://github.com/hapijs/hapi/milestone/191) {#13.4.2}

- [#3228](https://github.com/hapijs/hapi/issues/3228) Update hapijs/call to 3.0.2 from 3.0.1
- [#3216](https://github.com/hapijs/hapi/pull/3216) Update hapijs/shot to 3.1.0 from 3.0.1

### [13.4.1](https://github.com/hapijs/hapi/milestone/190) {#13.4.1}

- [#3173](https://github.com/hapijs/hapi/issues/3173) Update hapijs/nigel to 2.0.1 from 2.0.0
- [#3172](https://github.com/hapijs/hapi/issues/3172) Update hapijs/b64 to 3.0.1 from 3.0.0
- [#3171](https://github.com/hapijs/hapi/issues/3171) Update hapijs/pez to 2.1.1 from 2.1.0
- [#3170](https://github.com/hapijs/hapi/issues/3170) Update hapijs/subtext to 4.0.3 from 4.0.1
- [#3169](https://github.com/hapijs/hapi/issues/3169) Update hapijs/statehood to 4.0.1 from 4.0.0
- [#3168](https://github.com/hapijs/hapi/issues/3168) Update hapijs/peekaboo to 2.0.1 from 2.0.0
- [#3167](https://github.com/hapijs/hapi/issues/3167) Update hapijs/mimos to 3.0.1 from 3.0.0
- [#3166](https://github.com/hapijs/hapi/issues/3166) Update hapijs/kilt to 2.0.1 from 2.0.0
- [#3165](https://github.com/hapijs/hapi/issues/3165) Update hapijs/isemail to 2.1.0 from 2.1.2
- [#3164](https://github.com/hapijs/hapi/issues/3164) Update hueniverse/iron to 4.0.1 from 4.0.0
- [#3163](https://github.com/hapijs/hapi/issues/3163) Update hapijs/cryptiles to 3.0.1 from 3.0.0
- [#3162](https://github.com/hapijs/hapi/issues/3162) Update hapijs/catbox-memory to 2.0.2 from 2.0.1
- [#3161](https://github.com/hapijs/hapi/issues/3161) Update hapijs/catbox to 7.1.1 from 7.1.0
- [#3160](https://github.com/hapijs/hapi/issues/3160) Update hapijs/call to 3.0.1 from 3.0.0
- [#3159](https://github.com/hapijs/hapi/issues/3159) Update hapijs/boom to 3.2.0 from 3.1.3
- [#3158](https://github.com/hapijs/hapi/issues/3158) Update hapijs/ammo to 2.0.1 from 2.0.0
- [#3157](https://github.com/hapijs/hapi/issues/3157) Update hapijs/topo to 2.0.1 from 2.0.0
- [#3156](https://github.com/hapijs/hapi/issues/3156) Update hapijs/wreck to 7.2.1 from 7.2.0
- [#3121](https://github.com/hapijs/hapi/pull/3121) allow array as valid validate config on headers, params, query and payload
- [#3119](https://github.com/hapijs/hapi/issues/3119) Support [] as payload validation

### [13.4.0](https://github.com/hapijs/hapi/milestone/189) <span class="breaking-badge"></span> {#13.4.0}

- [#3147](https://github.com/hapijs/hapi/issues/3147) Pass original validation error if boom
- [#3146](https://github.com/hapijs/hapi/issues/3146) Update hapijs/wreck to 7.2.0 from 7.0.2
- [#3145](https://github.com/hapijs/hapi/issues/3145) Update hapijs/vise to 2.0.1 from 2.0.0
- [#3144](https://github.com/hapijs/hapi/issues/3144) Update hapijs/content to 3.0.1 from 3.0.0
- [#3143](https://github.com/hapijs/hapi/issues/3143) Update jshttp/mime-db to 1.23.0 from 1.22.0
- [#3142](https://github.com/hapijs/hapi/issues/3142) Update moment/moment to 2.13.0 from 2.12.0
- [#3141](https://github.com/hapijs/hapi/issues/3141) Update hapijs/joi to 8.1.0 from 8.0.4
- [#3140](https://github.com/hapijs/hapi/issues/3140) Update hapijs/items to 2.1.0 from 2.0.0
- [#3139](https://github.com/hapijs/hapi/issues/3139) Update hapijs/hoek to 4.0.0 from 3.0.4
- [#3138](https://github.com/hapijs/hapi/issues/3138) Update hapijs/heavy to 4.0.1 from 4.0.0
- [#3137](https://github.com/hapijs/hapi/issues/3137) Update hapijs/boom to 3.1.3 from 3.1.2
- [#3136](https://github.com/hapijs/hapi/issues/3136) Update hapijs/accept to 2.1.1 from 2.1.0
- [#3115](https://github.com/hapijs/hapi/issues/3115) Update hapijs/pez to 2.1.0 from 2.0.1
- [#3111](https://github.com/hapijs/hapi/pull/3111) Update hapijs/subtext to 4.0.1 from 4.0.0

### [13.3.0](https://github.com/hapijs/hapi/milestone/188) {#13.3.0}

- [#3107](https://github.com/hapijs/hapi/issues/3107) Permit validation on any payload type
- [#3068](https://github.com/hapijs/hapi/pull/3068) Fast server shutdown

### [13.2.2](https://github.com/hapijs/hapi/milestone/187) {#13.2.2}

- [#3101](https://github.com/hapijs/hapi/issues/3101) Auth entity error reports the wrong credential type used

### [13.2.1](https://github.com/hapijs/hapi/milestone/186) {#13.2.1}

- [#3044](https://github.com/hapijs/hapi/pull/3044) Enable disabling cache-control headers
- [#2979](https://github.com/hapijs/hapi/issues/2979) `.charset(charset)` doesn't work on its own in ext

### [13.1.0](https://github.com/hapijs/hapi/milestone/185) {#13.1.0}

- [#3083](https://github.com/hapijs/hapi/issues/3083) Allow provisioning server cache after construction
- [#3082](https://github.com/hapijs/hapi/issues/3082) Update hapijs/wreck to 7.0.2 from 7.0.0
- [#3081](https://github.com/hapijs/hapi/issues/3081) Update hapijs/shot to 3.0.1 from 3.0.0
- [#3080](https://github.com/hapijs/hapi/issues/3080) Update jshttp/mime-db to 1.22.0 from 1.20.0
- [#3079](https://github.com/hapijs/hapi/issues/3079) Update moment/momemt to 2.12.0 from 2.11.0
- [#3078](https://github.com/hapijs/hapi/issues/3078) Update hapijs/joi to 8.0.4 from 7.1.0
- [#3077](https://github.com/hapijs/hapi/issues/3077) Update hapijs/boom to 3.1.2 from 3.1.1
- [#3069](https://github.com/hapijs/hapi/pull/3069) Pass through cookie options when calling reply.unstate()
- [#3057](https://github.com/hapijs/hapi/pull/3057) Don't re-initialize the server
- [#3042](https://github.com/hapijs/hapi/issues/3042) Moment - Regular Expression Denial of Service
- [#3015](https://github.com/hapijs/hapi/issues/3015) Can not change/remove the "accept-ranges" response header
- [#3014](https://github.com/hapijs/hapi/pull/3014) Update JSON response stringify for better performance

### [13.0.0](https://github.com/hapijs/hapi/milestone/184) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/3040" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#13.0.0}

- [#3040](https://github.com/hapijs/hapi/issues/3040) 13.0.0 Release Notes
- [#3039](https://github.com/hapijs/hapi/issues/3039) Update hueniverse/iron to 4.0.0 from 3.0.1
- [#3038](https://github.com/hapijs/hapi/issues/3038) Update hapijs/statehood to 4.0.0 from 3.1.0

## Version 12 {#v12}

### [12.1.0](https://github.com/hapijs/hapi/milestone/183) {#12.1.0}

- [#3018](https://github.com/hapijs/hapi/issues/3018) Allow auth strategies to expose an api

### [12.0.1](https://github.com/hapijs/hapi/milestone/182) {#12.0.1}

- [#3013](https://github.com/hapijs/hapi/pull/3013) Fix hapijs/shot dependency

### [12.0.0](https://github.com/hapijs/hapi/milestone/178) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/2985" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#12.0.0}

- [#3012](https://github.com/hapijs/hapi/issues/3012) Update hapijs/catbox to 7.1.0 from 7.0.0
- [#3011](https://github.com/hapijs/hapi/issues/3011) Update hapijs/shot to 3.0.0 from 2.0.1
- [#3010](https://github.com/hapijs/hapi/issues/3010) Update jshttp/mime-db to 1.20.0 from 1.19.0
- [#3009](https://github.com/hapijs/hapi/issues/3009) Update moment/moment to 2.11.0 from 2.10.6
- [#3008](https://github.com/hapijs/hapi/issues/3008) Update hapijs/isemail to 2.1.0 from 2.0.0
- [#3007](https://github.com/hapijs/hapi/issues/3007) Update hapijs/joi to 7.1.0 from 7.0.0
- [#3006](https://github.com/hapijs/hapi/issues/3006) Update hapijs/hoek to 3.0.4 from 3.0.0
- [#3005](https://github.com/hapijs/hapi/issues/3005) Update hapijs/boom to 3.1.1 from 3.0.0
- [#3004](https://github.com/hapijs/hapi/issues/3004) Update hapijs/accept to 2.1.0 from 2.0.0
- [#3002](https://github.com/hapijs/hapi/issues/3002) Remove request.session and request.auth.session placeholders
- [#3001](https://github.com/hapijs/hapi/issues/3001) Update hapijs/statehood to 3.1.0 from 3.0.0
- [#3000](https://github.com/hapijs/hapi/issues/3000) Return a promise when callback missing
- [#2999](https://github.com/hapijs/hapi/issues/2999) Support required scope with + prefix
- [#2998](https://github.com/hapijs/hapi/issues/2998) Support multiple access combinations per route
- [#2994](https://github.com/hapijs/hapi/issues/2994) Dynamic scope does not work with auth.default()
- [#2993](https://github.com/hapijs/hapi/issues/2993) Support forbidden scope with ! prefix
- [#2992](https://github.com/hapijs/hapi/issues/2992) Normalize auth scope and entity settings under new access option
- [#2988](https://github.com/hapijs/hapi/pull/2988) Handle invalid date exceptions
- [#2985](https://github.com/hapijs/hapi/issues/2985) 12.0.0. Release Notes
- [#2983](https://github.com/hapijs/hapi/issues/2983) Update hapijs/subtext to 4.0.0 from 3.0.1
- [#2972](https://github.com/hapijs/hapi/pull/2972) Add validation check for stripUnknown route response option
- [#2966](https://github.com/hapijs/hapi/issues/2966) request.raw.res.end() method is called twice
- [#2957](https://github.com/hapijs/hapi/issues/2957) nameless cookie causing hapi fail parsing
- [#2936](https://github.com/hapijs/hapi/issues/2936) Expose origin matching status
- [#2886](https://github.com/hapijs/hapi/issues/2886) Add entire auth object to validation context options

## Version 11 {#v11}

### [11.1.4](https://github.com/hapijs/hapi/milestone/181) {#11.1.4}

- [#2990](https://github.com/hapijs/hapi/pull/2990) Fix cors config cascade. Closes #2980
- [#2980](https://github.com/hapijs/hapi/issues/2980) Route level CORS config overrides connection level defaults

### [11.1.3](https://github.com/hapijs/hapi/milestone/179) {#11.1.3}

- [#2987](https://github.com/hapijs/hapi/issues/2987) Catch invalid date exceptions

### [11.1.2](https://github.com/hapijs/hapi/milestone/177) {#11.1.2}

- [#2953](https://github.com/hapijs/hapi/pull/2953) Tests for issue #2950
- [#2950](https://github.com/hapijs/hapi/issues/2950) Access-Control-Expose-Headers response header duplicate values
- [#2940](https://github.com/hapijs/hapi/pull/2940) Fails to set a global route auth config

### [11.1.1](https://github.com/hapijs/hapi/milestone/176) {#11.1.1}

- [#2944](https://github.com/hapijs/hapi/pull/2944) Update hapijs/subtext to 3.0.1 from 3.0.0
- [#2931](https://github.com/hapijs/hapi/pull/2931) Lookup route during OPTIONS by using request.info.hostname. Closes #2930
- [#2930](https://github.com/hapijs/hapi/issues/2930) Route not correctly looked up during CORS OPTIONS request when using vhost

### [11.1.0](https://github.com/hapijs/hapi/milestone/174) {#11.1.0}

- [#2929](https://github.com/hapijs/hapi/issues/2929) Allow setting request app and plugins via inject
- [#2928](https://github.com/hapijs/hapi/issues/2928) Support per-request decoration

### [11.0.5](https://github.com/hapijs/hapi/milestone/173) {#11.0.5}

- [#2894](https://github.com/hapijs/hapi/issues/2894) CORS headers to include 'Origin'

### [11.0.4](https://github.com/hapijs/hapi/milestone/172) {#11.0.4}

- [#2923](https://github.com/hapijs/hapi/issues/2923) Update hapijs/vise to 2.0.0 from 1.0.0
- [#2922](https://github.com/hapijs/hapi/issues/2922) Update hapijs/nigel to 2.0.0 from 1.0.1
- [#2921](https://github.com/hapijs/hapi/issues/2921) Update hapijs/pez to 2.0.1 from 1.0.0
- [#2920](https://github.com/hapijs/hapi/issues/2920) Update hapijs/context to 3.0.0 from 1.0.2
- [#2919](https://github.com/hapijs/hapi/issues/2919) Update hapijs/subtext to 3.0.0 from 2.0.2
- [#2918](https://github.com/hapijs/hapi/issues/2918) Update hapijs/statehood to 3.0.0 from 2.1.1
- [#2917](https://github.com/hapijs/hapi/issues/2917) Update hapijs/shot to 2.0.1 from 1.7.0
- [#2916](https://github.com/hapijs/hapi/issues/2916) Update hapijs/qs to 6.0.0 from 5.2.0
- [#2915](https://github.com/hapijs/hapi/issues/2915) Update hapijs/peekaboo to 2.0.0 from 1.0.0
- [#2914](https://github.com/hapijs/hapi/issues/2914) Update hapijs/mimos to 3.0.0 from 2.0.2
- [#2913](https://github.com/hapijs/hapi/issues/2913) Update hapijs/kilt to 2.0.0 from 1.1.1
- [#2912](https://github.com/hapijs/hapi/issues/2912) Update hueniverse/iron to 3.0.1 from 2.1.3
- [#2911](https://github.com/hapijs/hapi/issues/2911) Update hapijs/heavy to 4.0.0 from 3.0.1
- [#2910](https://github.com/hapijs/hapi/issues/2910) Update hapijs/cryptiles to 3.0.0 from 2.0.5
- [#2909](https://github.com/hapijs/hapi/issues/2909) Update hapijs/catbox-memory to 2.0.1 from 1.1.2
- [#2908](https://github.com/hapijs/hapi/issues/2908) Update hapijs/isemail to 2.0.0 from 1.2.0
- [#2907](https://github.com/hapijs/hapi/issues/2907) Update hapijs/topo to 2.0.0 from 1.1.0
- [#2906](https://github.com/hapijs/hapi/issues/2906) Update hapijs/joi to 7.0.0 from 6.8.1
- [#2905](https://github.com/hapijs/hapi/issues/2905) Update hapijs/catbox to 7.0.0 from 6.0.0
- [#2904](https://github.com/hapijs/hapi/issues/2904) Update hapijs/call to 3.0.0 from 2.0.2
- [#2903](https://github.com/hapijs/hapi/issues/2903) Update hapijs/ammo to 2.0.0 from 1.0.1
- [#2902](https://github.com/hapijs/hapi/issues/2902) Update hapijs/accept to 2.0.0 from 1.1.0
- [#2901](https://github.com/hapijs/hapi/issues/2901) Update hapijs/wreck to 7.0.0 from 6.2.0
- [#2900](https://github.com/hapijs/hapi/issues/2900) Update hapijs/b64 to 3.0.0 from 2.0.1
- [#2899](https://github.com/hapijs/hapi/issues/2899) Update hapijs/items to 2.0.0 from 1.1.0
- [#2898](https://github.com/hapijs/hapi/issues/2898) Update hapijs/boom to 3.0.0 from 2.9.0
- [#2897](https://github.com/hapijs/hapi/issues/2897) Update hapijs/hoek to 3.0.1 from 2.16.3

### [11.0.3](https://github.com/hapijs/hapi/milestone/171) <span class="breaking-badge"></span> {#11.0.3}

- [#2885](https://github.com/hapijs/hapi/pull/2885) Update hapijs/subtext to 2.0.2 from 2.0.1
- [#2877](https://github.com/hapijs/hapi/issues/2877) Replace all functions inside functions with arrow functions
- [#2875](https://github.com/hapijs/hapi/issues/2875) Style change: replace for(i, il) with length in test
- [#2874](https://github.com/hapijs/hapi/issues/2874) Replace var with let
- [#2873](https://github.com/hapijs/hapi/issues/2873) Use const where possible
- [#2872](https://github.com/hapijs/hapi/issues/2872) Add strict mode
- [#2870](https://github.com/hapijs/hapi/pull/2870) Fix empty content-length handling for gzip and 204 responses
- [#2869](https://github.com/hapijs/hapi/issues/2869) Gzip compression is skipped when content-length is unknown
- [#2868](https://github.com/hapijs/hapi/issues/2868) CORS: Is 404 on OPTIONS request the right thing to do?
- [#2867](https://github.com/hapijs/hapi/issues/2867) Skip extensions for notFound and badRequest
- [#2862](https://github.com/hapijs/hapi/issues/2862) Update hapijs/subtext to 2.0.2 from 2.0.0

### [11.0.2](https://github.com/hapijs/hapi/milestone/170) {#11.0.2}

- [#2866](https://github.com/hapijs/hapi/pull/2866) Fixed an issue with mixed-case headers not being matched correctly in CORS
- [#2852](https://github.com/hapijs/hapi/issues/2852) request.params undefined when route not found

### [11.0.1](https://github.com/hapijs/hapi/milestone/169) <span class="breaking-badge"></span> {#11.0.1}

- [#2859](https://github.com/hapijs/hapi/pull/2859) Add error messages to 404's caused by cors closes #2857
- [#2858](https://github.com/hapijs/hapi/pull/2858) Add 'Accept' to default header per #2855

### [11.0.0](https://github.com/hapijs/hapi/milestone/168) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/2850" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#11.0.0}

- [#2850](https://github.com/hapijs/hapi/issues/2850) 11.0.0 Release Notes
- [#2849](https://github.com/hapijs/hapi/issues/2849) Add 204 to statuses cached by default
- [#2848](https://github.com/hapijs/hapi/issues/2848) Allow response validation of non-objects
- [#2847](https://github.com/hapijs/hapi/issues/2847) Update hapijs/qs to 5.2.0 from 4.0.0
- [#2845](https://github.com/hapijs/hapi/issues/2845) Allow empty response to default to 204
- [#2840](https://github.com/hapijs/hapi/issues/2840) CORS route-specific override can conflict with connection defaults
- [#2814](https://github.com/hapijs/hapi/issues/2814) Remove server.after()
- [#2807](https://github.com/hapijs/hapi/issues/2807) Remove id from request received event

## Version 10 {#v10}

### [10.5.0](https://github.com/hapijs/hapi/milestone/167) <span class="breaking-badge"></span> {#10.5.0}

- [#2844](https://github.com/hapijs/hapi/issues/2844) Server new route event
- [#2829](https://github.com/hapijs/hapi/pull/2829) Expanded `registrations` API. Added test. Updated docs.
- [#2491](https://github.com/hapijs/hapi/issues/2491) CORS pre-fetch not respecting per-route config

### [10.4.1](https://github.com/hapijs/hapi/milestone/164) {#10.4.1}

- [#2836](https://github.com/hapijs/hapi/issues/2836) Update hapijs/heavy to 3.0.1 from 3.0.0

### [10.4.0](https://github.com/hapijs/hapi/milestone/163) <span class="breaking-badge"></span> {#10.4.0}

- [#2828](https://github.com/hapijs/hapi/issues/2828) Update hapijs/shot to 1.7.0 from 1.6.1
- [#2827](https://github.com/hapijs/hapi/issues/2827) Enhance server.ext() to accept an array of event objects
- [#2826](https://github.com/hapijs/hapi/issues/2826) Update hapijs/topo to 1.1.0 from 1.0.3
- [#2824](https://github.com/hapijs/hapi/issues/2824) request.info.host - Host header wrong in server.inject
- [#2823](https://github.com/hapijs/hapi/issues/2823) Skip empty extension points in request lifecycle
- [#2822](https://github.com/hapijs/hapi/issues/2822) Plugin schema too restrictive
- [#2819](https://github.com/hapijs/hapi/issues/2819) Replace single connection server decorations with assertions
- [#2818](https://github.com/hapijs/hapi/issues/2818) Support plugin level once attribute
- [#2566](https://github.com/hapijs/hapi/issues/2566) Lifecycle hooks on routes

### [10.3.0](https://github.com/hapijs/hapi/milestone/162) {#10.3.0}

- [#2754](https://github.com/hapijs/hapi/issues/2754) Add connections inside a plugin

### [10.2.1](https://github.com/hapijs/hapi/milestone/161) {#10.2.1}

- [#2817](https://github.com/hapijs/hapi/issues/2817) Multiple connectionless plugin exceptions

### [10.2.0](https://github.com/hapijs/hapi/milestone/160) <span class="breaking-badge"></span> {#10.2.0}

- [#2815](https://github.com/hapijs/hapi/issues/2815) Cleanup after() options
- [#2813](https://github.com/hapijs/hapi/issues/2813) Update server root methods when adding 2nd connection
- [#2812](https://github.com/hapijs/hapi/issues/2812) Prevent adding server extensions once initialize() is called
- [#2811](https://github.com/hapijs/hapi/issues/2811) Support connectionless plugins
- [#2809](https://github.com/hapijs/hapi/issues/2809) Return plugin dependency errors via callback instead of throwing
- [#2808](https://github.com/hapijs/hapi/issues/2808) Pass start() and initialize() errors via callback, not throw
- [#2806](https://github.com/hapijs/hapi/issues/2806) Update hapijs/isemail to 1.2.0 from 1.1.1
- [#2805](https://github.com/hapijs/hapi/issues/2805) Update hapijs/joi to 6.8.0 from 6.6.1
- [#2804](https://github.com/hapijs/hapi/issues/2804) Apply arguments schema more consistently
- [#2796](https://github.com/hapijs/hapi/pull/2796) don't duplicate accept-encoding in vary header
- [#2790](https://github.com/hapijs/hapi/pull/2790) Add cache stats to server methods
- [#2788](https://github.com/hapijs/hapi/issues/2788) Option to turn off domains
- [#2777](https://github.com/hapijs/hapi/issues/2777) Public API for Registered Plugins
- [#2773](https://github.com/hapijs/hapi/pull/2773) Detects and rejects malformed response headers
- [#2763](https://github.com/hapijs/hapi/issues/2763) get cache stats for a server method?
- [#2761](https://github.com/hapijs/hapi/issues/2761) Conditional register() for skipping already registered plugins
- [#2736](https://github.com/hapijs/hapi/issues/2736) Stopping the server while starting it
- [#2733](https://github.com/hapijs/hapi/issues/2733) CORS Headers
- [#2352](https://github.com/hapijs/hapi/issues/2352) setting undefined headers on transmit
- [#1850](https://github.com/hapijs/hapi/issues/1850) Set per-plugin registration options when registering an array of plugins

### [10.1.0](https://github.com/hapijs/hapi/milestone/159) {#10.1.0}

- [#2787](https://github.com/hapijs/hapi/issues/2787) Update hapijs/wreck to 6.2.0 from 6.1.0
- [#2786](https://github.com/hapijs/hapi/issues/2786) Update hapijs/b64 to 2.0.1 from 2.0.0
- [#2785](https://github.com/hapijs/hapi/issues/2785) Update hapijs/shot to 1.6.1 from 1.6.0
- [#2784](https://github.com/hapijs/hapi/issues/2784) Update jshttp/mime-db to 1.19.0 from 1.18.0
- [#2783](https://github.com/hapijs/hapi/issues/2783) Update hapijs/hoek to 2.16.3 from 2.14.0
- [#2782](https://github.com/hapijs/hapi/issues/2782) Update hapijs/cryptiles to 2.0.5 from 2.0.4
- [#2776](https://github.com/hapijs/hapi/pull/2776) Add preload flag to HSTS header and fix casing for includeSubDomains.
- [#2505](https://github.com/hapijs/hapi/issues/2505) request.state occasionally null

### [10.0.1](https://github.com/hapijs/hapi/milestone/158) {#10.0.1}

- [#2779](https://github.com/hapijs/hapi/issues/2779) Flaky test? "Request does not return an error when server is responding when the timeout occurs"

### [10.0.0](https://github.com/hapijs/hapi/milestone/157) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/2764" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#10.0.0}

- [#2765](https://github.com/hapijs/hapi/issues/2765) node v4
- [#2764](https://github.com/hapijs/hapi/issues/2764) 10.0.0 Release Notes

## Version 9 {#v9}

### [9.5.1](https://github.com/hapijs/hapi/milestone/180) {#9.5.1}

- [#2989](https://github.com/hapijs/hapi/issues/2989) Handle Date parsing error

### [9.5.0](https://github.com/hapijs/hapi/milestone/175) {#9.5.0}

### [9.4.1](https://github.com/hapijs/hapi/milestone/166) {#9.4.1}

- [#2835](https://github.com/hapijs/hapi/issues/2835) hapi-lts requiring node 4 and no updates to hapi 9?

### [9.4.0](https://github.com/hapijs/hapi/milestone/165) {#9.4.0}

- [#2834](https://github.com/hapijs/hapi/issues/2834) 9.4.0 LTS

### [9.3.1](https://github.com/hapijs/hapi/milestone/156) {#9.3.1}

- [#2760](https://github.com/hapijs/hapi/issues/2760) Decorators fail with nested require calls

### [9.3.0](https://github.com/hapijs/hapi/milestone/155) <span class="breaking-badge"></span> {#9.3.0}

- [#2757](https://github.com/hapijs/hapi/issues/2757) Require allowInternals option on server.inject() to call isInternal routes

### [9.2.0](https://github.com/hapijs/hapi/milestone/154) {#9.2.0}

- [#2756](https://github.com/hapijs/hapi/issues/2756) Expose route active authentication configuration
- [#2755](https://github.com/hapijs/hapi/issues/2755) Update jshttp/mime-db to 1.18.0 from 1.17.0

### [9.1.0](https://github.com/hapijs/hapi/milestone/153) {#9.1.0}

- [#2750](https://github.com/hapijs/hapi/issues/2750) Route config for internal access only routes

### [9.0.4](https://github.com/hapijs/hapi/milestone/152) {#9.0.4}

- [#2739](https://github.com/hapijs/hapi/pull/2739) Updated error when calling server.start with no callback
- [#2727](https://github.com/hapijs/hapi/issues/2727) Decorations not propagated to sibling plugins

### [9.0.3](https://github.com/hapijs/hapi/milestone/151) {#9.0.3}

- [#2725](https://github.com/hapijs/hapi/pull/2725) Update hapijs/catbox-memory to 1.1.2 from 1.1.1
- [#2723](https://github.com/hapijs/hapi/issues/2723) Tape and server.inject problem

### [9.0.2](https://github.com/hapijs/hapi/milestone/150) {#9.0.2}

- [#2717](https://github.com/hapijs/hapi/issues/2717) Update jshttp/mime-db to 1.17.0 from 1.16.0
- [#2714](https://github.com/hapijs/hapi/issues/2714) Setting server method cache generateTimeout to false results in error

### [9.0.1](https://github.com/hapijs/hapi/milestone/149) {#9.0.1}

- [#2699](https://github.com/hapijs/hapi/issues/2699) npm install hapi misses wreck sub-dependency

### [9.0.0](https://github.com/hapijs/hapi/milestone/141) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/2682" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#9.0.0}

- [#2718](https://github.com/hapijs/hapi/issues/2718) Breaking change with query string validation from 8.6.0 to 9.0.2
- [#2698](https://github.com/hapijs/hapi/issues/2698) Update hapijs/content to 1.0.2 from 1.0.1
- [#2697](https://github.com/hapijs/hapi/issues/2697) Update moment/moment to 2.10.6 from 2.10.3
- [#2696](https://github.com/hapijs/hapi/issues/2696) Update hapijs/joi to 6.6.1 from 6.4.1
- [#2695](https://github.com/hapijs/hapi/issues/2695) Update hueniverse/iron to 2.1.3 from 2.1.2
- [#2694](https://github.com/hapijs/hapi/issues/2694) Update hapijs/call to 2.0.2 from 2.0.1
- [#2693](https://github.com/hapijs/hapi/issues/2693) Update hapijs/boom to 2.8.0 from 2.7.2
- [#2692](https://github.com/hapijs/hapi/issues/2692) Update hapijs/ammo to 1.0.1 from 1.0.0
- [#2691](https://github.com/hapijs/hapi/issues/2691) Update hapijs/accept to 1.1.0 from 1.0.0
- [#2689](https://github.com/hapijs/hapi/issues/2689) Update hapijs/subtext from 1.1.1 to 2.0.0
- [#2688](https://github.com/hapijs/hapi/issues/2688) Add server.initialize()
- [#2687](https://github.com/hapijs/hapi/issues/2687) Set plugin options in realm
- [#2686](https://github.com/hapijs/hapi/issues/2686) Require callback in start() and end()
- [#2685](https://github.com/hapijs/hapi/issues/2685) Allow server.ext() to extend server actions (start, stop)
- [#2684](https://github.com/hapijs/hapi/issues/2684) Update hapijs/catbox to 6.0.0 from 4.3.0
- [#2683](https://github.com/hapijs/hapi/issues/2683) Update jshttp/mime-db to 1.16.0 from 1.14.0
- [#2682](https://github.com/hapijs/hapi/issues/2682) 9.0.0 Release Notes
- [#2681](https://github.com/hapijs/hapi/issues/2681) Remove server files settings
- [#2675](https://github.com/hapijs/hapi/pull/2675) Update hapijs/shot to 1.6.0 from 1.5.3
- [#2673](https://github.com/hapijs/hapi/issues/2673) 304 response sends: no-cache regardless of routes.cache settings
- [#2665](https://github.com/hapijs/hapi/issues/2665) Server breaks when using cached server method
- [#2662](https://github.com/hapijs/hapi/pull/2662) Added schema validation when creating a server method using object
- [#2661](https://github.com/hapijs/hapi/pull/2661) No longer removing response validation from route object if sample = 0
- [#2645](https://github.com/hapijs/hapi/pull/2645) Add failing test for #2628
- [#2641](https://github.com/hapijs/hapi/issues/2641) Vary accept-encoding header not always set for compressible content
- [#2628](https://github.com/hapijs/hapi/issues/2628) Multiple etag problems with directory handler causing browser use outdated cached content.
- [#2626](https://github.com/hapijs/hapi/issues/2626) Remove inert, h2o2, and vision from core
- [#2616](https://github.com/hapijs/hapi/issues/2616) Strange behaviour with throw in handlers
- [#2576](https://github.com/hapijs/hapi/issues/2576) Parsing requests with no payload
- [#2520](https://github.com/hapijs/hapi/issues/2520) API wart: server.dependency after method lacks options
- [#2517](https://github.com/hapijs/hapi/issues/2517) Means to force plugin registration to complete prior to server.inject
- [#2516](https://github.com/hapijs/hapi/issues/2516) Assert when server.start() is called before server.register() is done
- [#2449](https://github.com/hapijs/hapi/issues/2449) Isn't there any api document to disable compression? (gzip)
- [#2432](https://github.com/hapijs/hapi/issues/2432) TLS certificate errors are not surfaced in logs
- [#2389](https://github.com/hapijs/hapi/issues/2389) Support plugin shutdown

## Version 8 {#v8}

### [8.8.1](https://github.com/hapijs/hapi/milestone/148) {#8.8.1}

- [#2671](https://github.com/hapijs/hapi/pull/2671) Update hapijs/topo to 1.0.3 from 1.0.2
- [#2670](https://github.com/hapijs/hapi/issues/2670) Update hapijs/topo to 1.0.3 from 1.0.2
- [#2664](https://github.com/hapijs/hapi/pull/2664) allow for proto inherit with Server ("instanceof" instead of "===")
- [#2663](https://github.com/hapijs/hapi/issues/2663) internals.Server does not allow proto inheritance
- [#2657](https://github.com/hapijs/hapi/issues/2657) `server.ext` dependencies not ordered using `before` as array
- [#2642](https://github.com/hapijs/hapi/pull/2642) Failing test for `server.ext` with complex deps.
- [#2631](https://github.com/hapijs/hapi/pull/2631) Update hapijs/inert to 2.1.6 from 2.1.5

### [8.8.0](https://github.com/hapijs/hapi/milestone/147) {#8.8.0}

- [#2627](https://github.com/hapijs/hapi/issues/2627) Update hapijs/subtext to 1.1.1 from 1.1.0
- [#2625](https://github.com/hapijs/hapi/issues/2625) Update hapijs/wreck to 6.0.0 from 5.5.1
- [#2623](https://github.com/hapijs/hapi/issues/2623) Update hapijs/qs to 4.0.0 from 2.4.2
- [#2622](https://github.com/hapijs/hapi/issues/2622) Support qs options in payload and query parsing
- [#2613](https://github.com/hapijs/hapi/issues/2613) Update jshttp/mime-db to 1.14.0 from 1.11.0
- [#2612](https://github.com/hapijs/hapi/issues/2612) Update hapijs/vision to 2.0.1 from 2.0.0
- [#2480](https://github.com/hapijs/hapi/issues/2480) Ability to pass options to qs for payload parsing

### [8.7.0](https://github.com/hapijs/hapi/milestone/146) {#8.7.0}

- [#2587](https://github.com/hapijs/hapi/issues/2587) Update hapijs/catbox to 4.3.0 from 4.2.2

### [8.6.1](https://github.com/hapijs/hapi/milestone/145) <span class="breaking-badge"></span> {#8.6.1}

- [#2586](https://github.com/hapijs/hapi/issues/2586) Update hapijs/shot to 1.5.1 from 1.5.0
- [#2584](https://github.com/hapijs/hapi/issues/2584) Update jshttp/mime-db to 1.11.0 from 1.10.0
- [#2583](https://github.com/hapijs/hapi/issues/2583) Update hapijs/statehood to 2.1.1 from 2.0.0

### [8.6.0](https://github.com/hapijs/hapi/milestone/144) {#8.6.0}

- [#2573](https://github.com/hapijs/hapi/pull/2573) allow returning a response object inside a promise
- [#2570](https://github.com/hapijs/hapi/pull/2570) Added "error" event listener

### [8.5.3](https://github.com/hapijs/hapi/milestone/143) {#8.5.3}

- [#2571](https://github.com/hapijs/hapi/issues/2571) Update hapijs/h2o2 to 4.0.1 from 4.0.0
- [#2569](https://github.com/hapijs/hapi/pull/2569) Make sure auth filter passes on request auth artifacts when injecting, too

### [8.5.2](https://github.com/hapijs/hapi/milestone/142) {#8.5.2}

- [#2564](https://github.com/hapijs/hapi/issues/2564) Auth error log should not report missing or try as error

### [8.5.1](https://github.com/hapijs/hapi/milestone/140) {#8.5.1}

- [#2555](https://github.com/hapijs/hapi/pull/2555) fix dynamic scopes
- [#2554](https://github.com/hapijs/hapi/issues/2554) Dynamic scope uses undefined request.payload
- [#2553](https://github.com/hapijs/hapi/issues/2553) Update hapijs/hoek to 2.14.0 from 2.13.0

### [8.5.0](https://github.com/hapijs/hapi/milestone/139) {#8.5.0}

- [#2552](https://github.com/hapijs/hapi/issues/2552) Update hapijs/wreck to 5.5.1 from 5.2.0
- [#2551](https://github.com/hapijs/hapi/issues/2551) Update jshttp/mime-db to 1.10.0 from 1.9.1
- [#2550](https://github.com/hapijs/hapi/issues/2550) Update moment/moment to 2.10.3 from 2.9.0
- [#2549](https://github.com/hapijs/hapi/issues/2549) Update hapijs/joi to 6.4.1 from 6.0.8
- [#2548](https://github.com/hapijs/hapi/issues/2548) Update hapijs/hoek to 2.13.0 from 2.11.1
- [#2547](https://github.com/hapijs/hapi/issues/2547) Update hapijs/boom to 2.7.2 from 2.6.1
- [#2546](https://github.com/hapijs/hapi/issues/2546) Update hapijs/inert to 2.1.5 from 2.1.4
- [#2545](https://github.com/hapijs/hapi/issues/2545) Update isaacs/node-lru-cache to 2.6.4 from 2.5.0
- [#2544](https://github.com/hapijs/hapi/pull/2544) Retain content-length header for HEAD requests
- [#2538](https://github.com/hapijs/hapi/pull/2538) closes #2480: Ability to pass options to qs for payload parsing
- [#2532](https://github.com/hapijs/hapi/pull/2532) Dynamic authentication scopes
- [#2509](https://github.com/hapijs/hapi/issues/2509) Update jshttp/mime-db to 1.9.1 from 1.7.0
- [#2503](https://github.com/hapijs/hapi/issues/2503) Update hapijs/shot to 1.5.0 from 1.4.2
- [#2502](https://github.com/hapijs/hapi/pull/2502) Fix Hapi Issue #2501, pass on auth artifacts object in server.inject
- [#2501](https://github.com/hapijs/hapi/issues/2501) server.inject does not allow me to set auth artifacts, only auth credentials
- [#2481](https://github.com/hapijs/hapi/issues/2481) Feature: server.decorate('request' ... )
- [#2472](https://github.com/hapijs/hapi/issues/2472) Update hapijs/qs to 2.4.2 from 2.4.0

### [8.4.0](https://github.com/hapijs/hapi/milestone/138) {#8.4.0}

- [#2470](https://github.com/hapijs/hapi/issues/2470) JSONP requests not always returning wrapped response
- [#2469](https://github.com/hapijs/hapi/issues/2469) Update hapijs/qs to 2.4.0 from 2.3.3
- [#2468](https://github.com/hapijs/hapi/issues/2468) Proxy handler not forwarding request payload
- [#2465](https://github.com/hapijs/hapi/issues/2465) Update hapijs/catbox to 4.2.2 from 4.2.1
- [#2464](https://github.com/hapijs/hapi/issues/2464) Update hapijs/joi to 6.0.8 from 6.0.5
- [#2463](https://github.com/hapijs/hapi/pull/2463) Update shrinkwrap to joi 6.0.7

### [8.3.1](https://github.com/hapijs/hapi/milestone/137) {#8.3.1}

- [#2461](https://github.com/hapijs/hapi/issues/2461) Missing dependency in 8.3

### [8.3.0](https://github.com/hapijs/hapi/milestone/136) <span class="breaking-badge"></span> {#8.3.0}

- [#2459](https://github.com/hapijs/hapi/issues/2459) Fix for node 0.10 for changes in #2429
- [#2457](https://github.com/hapijs/hapi/issues/2457) Update hapijs/inert to 2.1.4 from 2.1.3
- [#2455](https://github.com/hapijs/hapi/issues/2455) Update hapijs/shot to 1.4.2 from 1.4.1
- [#2454](https://github.com/hapijs/hapi/issues/2454) Update moment/moment to 2.9.0 from 2.8.4
- [#2453](https://github.com/hapijs/hapi/issues/2453) Update hapijs/joi to 6.0.5 from 5.0.2
- [#2452](https://github.com/hapijs/hapi/issues/2452) Update hapijs/hoek to 2.11.1 from 2.10.0
- [#2446](https://github.com/hapijs/hapi/issues/2446) Update hapijs/wreck to 5.2.0 from 5.0.1
- [#2439](https://github.com/hapijs/hapi/pull/2439) pass context to response schema validation
- [#2429](https://github.com/hapijs/hapi/pull/2429) Fix for #2427
- [#2427](https://github.com/hapijs/hapi/issues/2427) Issue uploading file with io.js or node &gt; 0.11.6
- [#2423](https://github.com/hapijs/hapi/pull/2423) Update mime-db to 1.7.0 from 1.6.1
- [#2420](https://github.com/hapijs/hapi/issues/2420) Update hapijs/shot to 1.4.1 from 1.4.0
- [#2418](https://github.com/hapijs/hapi/pull/2418) Add regex to allow leading $ and \_
- [#2411](https://github.com/hapijs/hapi/issues/2411) Update jshttp/mime-db to 1.7.0 from 1.6.1
- [#2405](https://github.com/hapijs/hapi/pull/2405) Support inline dependencies on plugins
- [#2402](https://github.com/hapijs/hapi/pull/2402) Improved validation of route method label
- [#2401](https://github.com/hapijs/hapi/issues/2401) Method name RegExp
- [#2382](https://github.com/hapijs/hapi/pull/2382) Return explicit error when trying to stream a non-Readable stream
- [#2368](https://github.com/hapijs/hapi/issues/2368) response.streamify assumes stream has attribute \_readableState
- [#2332](https://github.com/hapijs/hapi/issues/2332) Replacing plugin.dependency() with attributes key
- [#2326](https://github.com/hapijs/hapi/issues/2326) request-error logged before `onPostHandler` or `onPreResponse`

### [8.2.0](https://github.com/hapijs/hapi/milestone/135) {#8.2.0}

- [#2398](https://github.com/hapijs/hapi/issues/2398) Update hapijs/inert to 2.1.3 from 2.1.2
- [#2397](https://github.com/hapijs/hapi/pull/2397) throw when attaching route handlers without a connection
- [#2396](https://github.com/hapijs/hapi/pull/2396) Inert 2.1.3 update
- [#2395](https://github.com/hapijs/hapi/issues/2395) Update jshttp/mime-db to 1.6.1 from 1.5.0
- [#2392](https://github.com/hapijs/hapi/issues/2392) No Payload Validation
- [#2374](https://github.com/hapijs/hapi/issues/2374) Server methods context not available in route prerequisites
- [#2373](https://github.com/hapijs/hapi/issues/2373) Update hapijs/inert to 2.1.2 from 2.1.0
- [#2372](https://github.com/hapijs/hapi/pull/2372) inert 2.1.2
- [#2370](https://github.com/hapijs/hapi/pull/2370) Add xss protection to validation response
- [#2367](https://github.com/hapijs/hapi/issues/2367) Update hapijs/inert to 2.1.0 from 2.0.0
- [#2366](https://github.com/hapijs/hapi/issues/2366) Update hapijs/catbox to 4.2.1 from 4.2.0
- [#2363](https://github.com/hapijs/hapi/pull/2363) Refuse to handle incoming request after server is stopped
- [#2362](https://github.com/hapijs/hapi/pull/2362) Don't respond to connections until listening is started
- [#2359](https://github.com/hapijs/hapi/pull/2359) Remove '{}' payload from cors OPTIONS response
- [#2355](https://github.com/hapijs/hapi/pull/2355) Fix table labels
- [#2354](https://github.com/hapijs/hapi/pull/2354) Update API.md for inert 2.1.0
- [#2347](https://github.com/hapijs/hapi/issues/2347) Improve error message when validation.payload is set but type is GET
- [#2309](https://github.com/hapijs/hapi/pull/2309) Fixes #2308 by logging boom error object instead of just message
- [#2308](https://github.com/hapijs/hapi/issues/2308) Logging boom errors from handlers should send boom error to log not just message

### [8.1.0](https://github.com/hapijs/hapi/milestone/133) {#8.1.0}

- [#2335](https://github.com/hapijs/hapi/issues/2335) Expose the request object in inject()
- [#2331](https://github.com/hapijs/hapi/pull/2331) Revise range tests to not depend on the inert module
- [#2324](https://github.com/hapijs/hapi/pull/2324) Remove catch call for promise replies
- [#2323](https://github.com/hapijs/hapi/issues/2323) Promise support
- [#2316](https://github.com/hapijs/hapi/issues/2316) Update jshttp/mime-db to 1.5.0 from 1.3.1
- [#2302](https://github.com/hapijs/hapi/pull/2302) allow replying with a stream as returned by node core http client methods
- [#2301](https://github.com/hapijs/hapi/issues/2301) can't reply with stream returned by node core http client methods
- [#2300](https://github.com/hapijs/hapi/pull/2300) Bumped mime-db version
- [#2291](https://github.com/hapijs/hapi/issues/2291) external listener protocol issue
- [#2277](https://github.com/hapijs/hapi/pull/2277) Fix invalid response for empty reply() (v8.x regression)

### [8.0.0](https://github.com/hapijs/hapi/milestone/127) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/2186" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#8.0.0}

- [#2271](https://github.com/hapijs/hapi/issues/2271) Update jshttp/mime-db to 1.3.0 from 1.2.0
- [#2270](https://github.com/hapijs/hapi/issues/2270) Update hapijs/boom to 2.6.1 from 2.6.0
- [#2269](https://github.com/hapijs/hapi/issues/2269) Update hapijs/shot to 1.4.0 from 1.3.5
- [#2268](https://github.com/hapijs/hapi/issues/2268) Update hapijs/joi to 5.0.2 from 5.0.0
- [#2264](https://github.com/hapijs/hapi/issues/2264) How to blacklist all routes to use a plugin config?
- [#2262](https://github.com/hapijs/hapi/issues/2262) Change server.table() result from object to array
- [#2255](https://github.com/hapijs/hapi/issues/2255) Throw when calling reply() with objectMode stream
- [#2249](https://github.com/hapijs/hapi/issues/2249) Add 'uri' connection option
- [#2247](https://github.com/hapijs/hapi/issues/2247) Split debug settings per event type
- [#2246](https://github.com/hapijs/hapi/issues/2246) plugin dependencies error message changed
- [#2244](https://github.com/hapijs/hapi/pull/2244) Fix reply.continue() in prerequisite. Closes #2243
- [#2243](https://github.com/hapijs/hapi/issues/2243) Fix reply.continue() in prerequisite.
- [#2242](https://github.com/hapijs/hapi/issues/2242) Uncaught error: Cannot read property 'isBoom' of null in hapi/lib/handler.js
- [#2241](https://github.com/hapijs/hapi/issues/2241) Remove string notation method logging when cache not setup
- [#2240](https://github.com/hapijs/hapi/issues/2240) Cached method in string notation bypasses cache
- [#2238](https://github.com/hapijs/hapi/issues/2238) Conditional Validation Rules based on Auth
- [#2237](https://github.com/hapijs/hapi/issues/2237) Support bare server (no files, proxy, views)
- [#2235](https://github.com/hapijs/hapi/issues/2235) Expose realm as public interface
- [#2234](https://github.com/hapijs/hapi/issues/2234) Support views in auth schemes
- [#2233](https://github.com/hapijs/hapi/issues/2233) Populate connection.info.uri before start when port 0
- [#2231](https://github.com/hapijs/hapi/issues/2231) Change request.route to a wrapper object containing settings
- [#2230](https://github.com/hapijs/hapi/issues/2230) Replace server.config with server.realm.modifiers
- [#2229](https://github.com/hapijs/hapi/issues/2229) plugin.expose() only sets server.plugins, not connection.plugins
- [#2228](https://github.com/hapijs/hapi/issues/2228) Update hapijs/joi to 5.0.0 from 4.9.0
- [#2227](https://github.com/hapijs/hapi/issues/2227) Update moment to 2.8.4
- [#2226](https://github.com/hapijs/hapi/issues/2226) When using string shorthand in pre it does not provide reply interface
- [#2224](https://github.com/hapijs/hapi/issues/2224) Cleanup connection.info settings and introduce 'address' config
- [#2220](https://github.com/hapijs/hapi/issues/2220) A method to test a string against the routes table
- [#2219](https://github.com/hapijs/hapi/issues/2219) Update hapijs/hoek to 2.10.0 from 2.9.0
- [#2217](https://github.com/hapijs/hapi/issues/2217) Disable scope checking on a route
- [#2216](https://github.com/hapijs/hapi/issues/2216) Invalid deep cloning of bind context
- [#2215](https://github.com/hapijs/hapi/issues/2215) Revert change to trailing slash behavior
- [#2209](https://github.com/hapijs/hapi/issues/2209) Not possible to add route in plugins
- [#2206](https://github.com/hapijs/hapi/issues/2206) Change server.bind() and server.path() to apply only to routes that follow
- [#2205](https://github.com/hapijs/hapi/issues/2205) Rename plugin register() `route` option to `routes`
- [#2203](https://github.com/hapijs/hapi/issues/2203) Move connection route config to route with connections defaults
- [#2201](https://github.com/hapijs/hapi/issues/2201) Rename cacheControlStatus to cache.statuses
- [#2200](https://github.com/hapijs/hapi/issues/2200) Validation failAction and custom function are not protected
- [#2199](https://github.com/hapijs/hapi/pull/2199) add missing variety handler for promises returning a object
- [#2198](https://github.com/hapijs/hapi/issues/2198) Update hapijs/call to 2.0.1 from 1.0.0
- [#2195](https://github.com/hapijs/hapi/issues/2195) Override timeout values at a route level
- [#2192](https://github.com/hapijs/hapi/issues/2192) Rename connection to listener or similar
- [#2191](https://github.com/hapijs/hapi/issues/2191) Change defaults for router
- [#2190](https://github.com/hapijs/hapi/issues/2190) Log heavy load reason when check() is false
- [#2186](https://github.com/hapijs/hapi/issues/2186) 8.0.0 Release Notes
- [#2185](https://github.com/hapijs/hapi/issues/2185) Update hapijs/catbox to 4.2.0 from 4.1.0
- [#2181](https://github.com/hapijs/hapi/issues/2181) Remove server method cache key 'h' prefix
- [#2179](https://github.com/hapijs/hapi/issues/2179) server.register() doesn't work with direct require of plugins (-rc1)
- [#2178](https://github.com/hapijs/hapi/issues/2178) Update hapijs/mimos to 2.0.2 from 1.0.1
- [#2177](https://github.com/hapijs/hapi/issues/2177) Return select() on server.connection()
- [#2175](https://github.com/hapijs/hapi/issues/2175) Update jshttp/mime-db to 1.2.0 from 1.1.2
- [#2174](https://github.com/hapijs/hapi/issues/2174) Update hapijs/qs to 2.3.3 from 2.3.2
- [#2173](https://github.com/hapijs/hapi/issues/2173) Update hapijs/catbox-memory to 1.1.1 from 1.1.0
- [#2172](https://github.com/hapijs/hapi/issues/2172) Update hapijs/boom to 2.6.0 from 2.5.1
- [#2170](https://github.com/hapijs/hapi/issues/2170) Spin off range header parser
- [#2167](https://github.com/hapijs/hapi/issues/2167) Add response 'close' processor
- [#2166](https://github.com/hapijs/hapi/issues/2166) ETag vary modification not applied to content-encoding set elsewhere
- [#2165](https://github.com/hapijs/hapi/issues/2165) Expose request.paramsArray
- [#2164](https://github.com/hapijs/hapi/issues/2164) Bypass compression on empty payload
- [#2163](https://github.com/hapijs/hapi/issues/2163) ETag vary modification is incorrect
- [#2160](https://github.com/hapijs/hapi/issues/2160) Add cors.override setting
- [#2158](https://github.com/hapijs/hapi/issues/2158) How to get default auth strategy from server object?
- [#2157](https://github.com/hapijs/hapi/issues/2157) Link mentions of methods to their reference
- [#2156](https://github.com/hapijs/hapi/issues/2156) Rewrite reply() interface section
- [#2155](https://github.com/hapijs/hapi/issues/2155) Cleanup and document all internal request logs
- [#2154](https://github.com/hapijs/hapi/issues/2154) Rename response object option marshall to marshal
- [#2153](https://github.com/hapijs/hapi/issues/2153) Change etag based on vary header by default
- [#2152](https://github.com/hapijs/hapi/issues/2152) Change server method generateKey() to only take the arguments
- [#2150](https://github.com/hapijs/hapi/pull/2150) argument Object Optimizations
- [#2149](https://github.com/hapijs/hapi/issues/2149) Support server methods without callback
- [#2148](https://github.com/hapijs/hapi/issues/2148) Optimize use of arguments
- [#2146](https://github.com/hapijs/hapi/issues/2146) Deep copy app and plugins configurations
- [#2145](https://github.com/hapijs/hapi/issues/2145) Split request log events into request and request-internal
- [#2144](https://github.com/hapijs/hapi/issues/2144) Rename server event internalError to `request-error`
- [#2143](https://github.com/hapijs/hapi/issues/2143) Replace log 'hapi' tag with event.internal flag
- [#2142](https://github.com/hapijs/hapi/issues/2142) Rename request.responses to request.preResponses
- [#2137](https://github.com/hapijs/hapi/issues/2137) Remove auth authenticate() `log` option in result
- [#2136](https://github.com/hapijs/hapi/pull/2136) Here comes 8
- [#2135](https://github.com/hapijs/hapi/issues/2135) Remove Hapi.version
- [#2131](https://github.com/hapijs/hapi/issues/2131) Simplify server.register() to only accept register() or { register, options }
- [#2129](https://github.com/hapijs/hapi/issues/2129) Support promises in server.method()
- [#2128](https://github.com/hapijs/hapi/issues/2128) Change server.method() object key from fn to method
- [#2126](https://github.com/hapijs/hapi/issues/2126) Change server.cache() to take only options
- [#2125](https://github.com/hapijs/hapi/issues/2125) Remove .hapi references
- [#2124](https://github.com/hapijs/hapi/issues/2124) Server-level connection defaults
- [#2122](https://github.com/hapijs/hapi/issues/2122) Pass the reply() interface everywhere a response can be returned
- [#2118](https://github.com/hapijs/hapi/issues/2118) Cleanup register() to accept a plugin or { plugin, options }
- [#2117](https://github.com/hapijs/hapi/issues/2117) Update hapijs/joi to 4.8.0 from 4.7.0
- [#2116](https://github.com/hapijs/hapi/issues/2116) Move peek logic to Peekaboo
- [#2113](https://github.com/hapijs/hapi/issues/2113) Missing host will default to hostname or 'localhost' instead of '0.0.0.0' pre start()
- [#2112](https://github.com/hapijs/hapi/issues/2112) Switch unix domain socket and windows named pipe to use options.port
- [#2111](https://github.com/hapijs/hapi/issues/2111) CORS matchOrigin should echo origin when config doesn't specify
- [#2109](https://github.com/hapijs/hapi/issues/2109) Remove request aborted listener
- [#2104](https://github.com/hapijs/hapi/issues/2104) Apply `reply.continue()` to auth interfaces
- [#2103](https://github.com/hapijs/hapi/issues/2103) Change ext continuation method from `reply()` to `reply.continue()`
- [#2099](https://github.com/hapijs/hapi/issues/2099) ETags never match with varyEtag setting
- [#2097](https://github.com/hapijs/hapi/issues/2097) Support Promises in reply() interface
- [#2096](https://github.com/hapijs/hapi/issues/2096) Skip onPreResponse when connection closes prematurely
- [#2095](https://github.com/hapijs/hapi/issues/2095) Rework composer format
- [#2093](https://github.com/hapijs/hapi/pull/2093) Include ETag and Last-Modified in 304 response
- [#2092](https://github.com/hapijs/hapi/issues/2092) Change default port to 0
- [#2090](https://github.com/hapijs/hapi/issues/2090) Remove plugin.version
- [#2089](https://github.com/hapijs/hapi/issues/2089) Server method `generateKey` no longer supports returning null as valid no caching indicator
- [#2086](https://github.com/hapijs/hapi/issues/2086) Remove bin/hapi
- [#2085](https://github.com/hapijs/hapi/issues/2085) Remove server.compose()
- [#2084](https://github.com/hapijs/hapi/issues/2084) Remove Hapi.state.prepareValue()
- [#2083](https://github.com/hapijs/hapi/issues/2083) Remove Hapi.error
- [#2082](https://github.com/hapijs/hapi/issues/2082) Remove Hapi.createServer()
- [#2080](https://github.com/hapijs/hapi/issues/2080) app config no longer copied over to server.app or connection.app
- [#2077](https://github.com/hapijs/hapi/issues/2077) Rename .server -&gt; .connection and .pack -&gt; .server
- [#2076](https://github.com/hapijs/hapi/issues/2076) Move files.etagsCacheMaxSize to pack level
- [#2074](https://github.com/hapijs/hapi/issues/2074) server.auth.default is not exposed at plugin.auth.default
- [#2073](https://github.com/hapijs/hapi/issues/2073) Split process load from server load limits
- [#2072](https://github.com/hapijs/hapi/issues/2072) Remove debug from server configuration
- [#2071](https://github.com/hapijs/hapi/issues/2071) Move proxy handler to use local maxSocket config
- [#2066](https://github.com/hapijs/hapi/issues/2066) Configure auth scheme to require payload validation
- [#2065](https://github.com/hapijs/hapi/issues/2065) failing to generate a method key should generate an error somewhere
- [#2053](https://github.com/hapijs/hapi/issues/2053) Change plugin.servers to plugin.connections
- [#2052](https://github.com/hapijs/hapi/issues/2052) Remove plugin.length
- [#2048](https://github.com/hapijs/hapi/issues/2048) New Event for request.log
- [#2040](https://github.com/hapijs/hapi/issues/2040) Improve request ID generator to prevent collisions
- [#2003](https://github.com/hapijs/hapi/issues/2003) Stop cache client when pack stops
- [#1994](https://github.com/hapijs/hapi/issues/1994) Pass meta data from a joi object to a failAction
- [#1977](https://github.com/hapijs/hapi/issues/1977) Throw when route() is called with multiple arguments
- [#1971](https://github.com/hapijs/hapi/issues/1971) Allow plugins to extend Server
- [#1965](https://github.com/hapijs/hapi/issues/1965) Need to know when response was sent in `server.on(tail)`
- [#1963](https://github.com/hapijs/hapi/issues/1963) Extensible reply() interface
- [#1945](https://github.com/hapijs/hapi/issues/1945) IE &lt;=8 doesn't accept application/javascript as a mimetype
- [#1939](https://github.com/hapijs/hapi/issues/1939) Reverse Routing a URL
- [#1926](https://github.com/hapijs/hapi/issues/1926) Remove special handling of the HTTP Location header
- [#1902](https://github.com/hapijs/hapi/issues/1902) reply.redirect() and reply.file() not working in server extensions
- [#1866](https://github.com/hapijs/hapi/issues/1866) Throw error when trying to reply twice
- [#1864](https://github.com/hapijs/hapi/issues/1864) Feature Request: Validation of non-200/ok responses.
- [#1815](https://github.com/hapijs/hapi/issues/1815) spdy support
- [#1723](https://github.com/hapijs/hapi/issues/1723) Allow response object stripping according to schema
- [#1686](https://github.com/hapijs/hapi/issues/1686) Don't report request closed on redirect payload write
- [#1672](https://github.com/hapijs/hapi/issues/1672) Enable starting the server listener externally

## Version 7 {#v7}

### [7.5.3](https://github.com/hapijs/hapi/milestone/134) {#7.5.3}

- [#2290](https://github.com/hapijs/hapi/issues/2290) Update hapijs/inert to 1.1.1 from 1.1.0

### [7.5.2](https://github.com/hapijs/hapi/milestone/132) {#7.5.2}

- [#2123](https://github.com/hapijs/hapi/issues/2123) Upgrade hoek to 2.9.0

### [7.5.1](https://github.com/hapijs/hapi/milestone/131) {#7.5.1}

- [#2120](https://github.com/hapijs/hapi/issues/2120) TypeError: Cannot read property 'get' of undefined

### [7.5.0](https://github.com/hapijs/hapi/milestone/130) {#7.5.0}

- [#2105](https://github.com/hapijs/hapi/pull/2105) Added ability to pass option into unstate.
- [#2068](https://github.com/hapijs/hapi/issues/2068) it is not possible to unstate a cookie that was stated with options
- [#1916](https://github.com/hapijs/hapi/issues/1916) Temp file is not deleted when request is aborted by client

### [7.4.0](https://github.com/hapijs/hapi/milestone/129) {#7.4.0}

- [#2108](https://github.com/hapijs/hapi/issues/2108) Upgrade qs to version 2.3.2
- [#2107](https://github.com/hapijs/hapi/issues/2107) Upgrade mime-db to 1.1.2
- [#2100](https://github.com/hapijs/hapi/pull/2100) Global view context.
- [#2027](https://github.com/hapijs/hapi/issues/2027) JPG vs jpg

### [7.3.0](https://github.com/hapijs/hapi/milestone/128) {#7.3.0}

- [#2098](https://github.com/hapijs/hapi/issues/2098) Catbox 4.1

### [7.2.0](https://github.com/hapijs/hapi/milestone/126) <span class="breaking-badge"></span> {#7.2.0}

- [#2069](https://github.com/hapijs/hapi/pull/2069) Isolate server in its own pack
- [#2061](https://github.com/hapijs/hapi/pull/2061) Second phase of server/pack/plugin refactor
- [#2057](https://github.com/hapijs/hapi/pull/2057) Pack refactor
- [#2056](https://github.com/hapijs/hapi/issues/2056) Enhance Pack to have the full plugin API directly
- [#2055](https://github.com/hapijs/hapi/issues/2055) Move plugin dependency validation to start()
- [#2054](https://github.com/hapijs/hapi/issues/2054) Move composer logic to glue

### [7.1.1](https://github.com/hapijs/hapi/milestone/125) {#7.1.1}

- [#2046](https://github.com/hapijs/hapi/issues/2046) Fix shrinkwrap

### [7.1.0](https://github.com/hapijs/hapi/milestone/124) <span class="breaking-badge"></span> {#7.1.0}

- [#2039](https://github.com/hapijs/hapi/issues/2039) Added npm-shrinkwrap

### [7.0.1](https://github.com/hapijs/hapi/milestone/123) {#7.0.1}

- [#2038](https://github.com/hapijs/hapi/issues/2038) Move cli logic to rejoice
- [#2036](https://github.com/hapijs/hapi/issues/2036) Move lru-cache to inert
- [#2035](https://github.com/hapijs/hapi/pull/2035) lab 5.0 features. Closes #2034
- [#2034](https://github.com/hapijs/hapi/issues/2034) Lab 5.0
- [#2029](https://github.com/hapijs/hapi/pull/2029) Fixes #2028. Updated error message for invalid scope to explain that any of the specified are sufficient
- [#2028](https://github.com/hapijs/hapi/issues/2028) Improve error message when auth scope is insufficient
- [#2024](https://github.com/hapijs/hapi/pull/2024) Resolve undefined environment variables to the empty string in the cli.

### [7.0.0](https://github.com/hapijs/hapi/milestone/117) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/2023" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#7.0.0}

- [#2023](https://github.com/hapijs/hapi/issues/2023) 7.0.0 Release Notes
- [#2022](https://github.com/hapijs/hapi/issues/2022) Spin off file and directory to inert
- [#2021](https://github.com/hapijs/hapi/issues/2021) Override server files.relativeTo config per route
- [#2020](https://github.com/hapijs/hapi/issues/2020) h2o2 2.0
- [#2019](https://github.com/hapijs/hapi/issues/2019) Catbox 4.0
- [#2017](https://github.com/hapijs/hapi/pull/2017) Initial 7.0 changes
- [#2016](https://github.com/hapijs/hapi/issues/2016) Remove $env support from pack.compose()
- [#2011](https://github.com/hapijs/hapi/issues/2011) Hapi should not override `cache-control` header if it's manually set by user's code
- [#2007](https://github.com/hapijs/hapi/issues/2007) Remove server views config
- [#1960](https://github.com/hapijs/hapi/issues/1960) Remove support for tos authentication setting
- [#1955](https://github.com/hapijs/hapi/pull/1955) Use environment variables in CLI configuration json file
- [#1954](https://github.com/hapijs/hapi/issues/1954) Remove support for catbox getOrGenerate()
- [#1941](https://github.com/hapijs/hapi/issues/1941) Remove route from handler registration arguments
- [#1913](https://github.com/hapijs/hapi/issues/1913) Change proxy localStatePassThrough setting default to false

## Version 6 {#v6}

### [6.11.1](https://github.com/hapijs/hapi/milestone/122) {#6.11.1}

- [#2010](https://github.com/hapijs/hapi/pull/2010) Heavy
- [#2009](https://github.com/hapijs/hapi/issues/2009) Setting event loop delay max lower than sample interval leads to false positive
- [#2008](https://github.com/hapijs/hapi/issues/2008) Break load handler implementation into separate module
- [#2002](https://github.com/hapijs/hapi/pull/2002) show route method in error message

### [6.11.0](https://github.com/hapijs/hapi/milestone/121) {#6.11.0}

- [#2005](https://github.com/hapijs/hapi/pull/2005) Replace negotiator
- [#2004](https://github.com/hapijs/hapi/issues/2004) Default accept-encoding '\*' to 'identity', not 'gzip'
- [#2001](https://github.com/hapijs/hapi/pull/2001) Keep the options of server.inject untouched #2000
- [#1995](https://github.com/hapijs/hapi/issues/1995) Adding route with multiple methods overrides route config
- [#1984](https://github.com/hapijs/hapi/issues/1984) All non 200 responses get cache-control=no-cache header
- [#1845](https://github.com/hapijs/hapi/issues/1845) Replace negotiator

### [6.10.0](https://github.com/hapijs/hapi/milestone/120) {#6.10.0}

- [#1998](https://github.com/hapijs/hapi/pull/1998) Migrate payload parsing to subtext with multipart support via pez
- [#1997](https://github.com/hapijs/hapi/issues/1997) Allow payload parsing timeout override per route
- [#1996](https://github.com/hapijs/hapi/issues/1996) Apply payload failAction to maxBytes and invalid content type
- [#1993](https://github.com/hapijs/hapi/pull/1993) Replaced optimist with bossy
- [#1928](https://github.com/hapijs/hapi/pull/1928) Handle empty or falsy charset in response
- [#1923](https://github.com/hapijs/hapi/issues/1923) Replace multiparty
- [#1843](https://github.com/hapijs/hapi/issues/1843) Replace optimist

### [6.9.0](https://github.com/hapijs/hapi/milestone/119) {#6.9.0}

- [#1973](https://github.com/hapijs/hapi/issues/1973) Move proxy decorations to h2o2
- [#1972](https://github.com/hapijs/hapi/issues/1972) Move view decorations to vision
- [#1969](https://github.com/hapijs/hapi/issues/1969) Move mime to mimos
- [#1968](https://github.com/hapijs/hapi/pull/1968) Vision / Mimos
- [#1967](https://github.com/hapijs/hapi/issues/1967) Move views code to vision
- [#1959](https://github.com/hapijs/hapi/pull/1959) Fix server/plugin ext views conflict
- [#1958](https://github.com/hapijs/hapi/pull/1958) Move proxy handler to h2o2
- [#1957](https://github.com/hapijs/hapi/issues/1957) Move proxy handler to h2o2
- [#1956](https://github.com/hapijs/hapi/pull/1956) Fix Content-Type overriding
- [#1944](https://github.com/hapijs/hapi/pull/1944) Move router to Call
- [#1943](https://github.com/hapijs/hapi/issues/1943) Move routing login out to call
- [#1934](https://github.com/hapijs/hapi/pull/1934) Fix non-spec compliant Last-Modified header in response
- [#1932](https://github.com/hapijs/hapi/pull/1932) handle empty CORS expose-headers header response
- [#1924](https://github.com/hapijs/hapi/issues/1924) Unable to provide views override in onPreResponse

### [6.8.1](https://github.com/hapijs/hapi/milestone/118) <span class="breaking-badge"></span> {#6.8.1}

- [#1922](https://github.com/hapijs/hapi/issues/1922) Handle server methods without cache as special case

### [6.8.0](https://github.com/hapijs/hapi/milestone/116) <span class="breaking-badge"></span> {#6.8.0}

- [#1935](https://github.com/hapijs/hapi/issues/1935) server.method breaking change
- [#1919](https://github.com/hapijs/hapi/pull/1919) Log method pre string notation
- [#1917](https://github.com/hapijs/hapi/issues/1917) Log cache info when using server method short hand calls
- [#1915](https://github.com/hapijs/hapi/pull/1915) Issue/1911
- [#1914](https://github.com/hapijs/hapi/issues/1914) catbox 3.2
- [#1911](https://github.com/hapijs/hapi/issues/1911) Exclude configured cookies from proxy passthrough
- [#1905](https://github.com/hapijs/hapi/pull/1905) Replaced mime-type with mime.
- [#1890](https://github.com/hapijs/hapi/issues/1890) Use mime-db
- [#1889](https://github.com/hapijs/hapi/pull/1889) Upgrade to wreck v5
- [#1888](https://github.com/hapijs/hapi/issues/1888) Upgrade to Wreck v5
- [#1828](https://github.com/hapijs/hapi/issues/1828) Disable compression on file types already compressed (png, jpg)

### [6.7.1](https://github.com/hapijs/hapi/milestone/115) {#6.7.1}

- [#1885](https://github.com/hapijs/hapi/issues/1885) Handler timeout with onPreResponse asserts on bad protect

### [6.7.0](https://github.com/hapijs/hapi/milestone/114) {#6.7.0}

- [#1884](https://github.com/hapijs/hapi/issues/1884) Improve protect logging
- [#1881](https://github.com/hapijs/hapi/pull/1881) update qs dependency

### [6.6.0](https://github.com/hapijs/hapi/milestone/113) {#6.6.0}

- [#1878](https://github.com/hapijs/hapi/issues/1878) Rename private route members
- [#1877](https://github.com/hapijs/hapi/issues/1877) Move state.js to statehood module
- [#1875](https://github.com/hapijs/hapi/issues/1875) Session scope does not match one to many auth.scope on route.
- [#1871](https://github.com/hapijs/hapi/issues/1871) Switch to wreck
- [#1863](https://github.com/hapijs/hapi/pull/1863) Allow agent to be set on proxy options and passed into Nipple.
- [#1858](https://github.com/hapijs/hapi/pull/1858) Fix typo in defaults.js
- [#1856](https://github.com/hapijs/hapi/pull/1856) Allow view options override on handler object

### [6.5.1](https://github.com/hapijs/hapi/milestone/112) {#6.5.1}

- [#1857](https://github.com/hapijs/hapi/issues/1857) Manifest validation tests server config before defaults applies

### [6.5.0](https://github.com/hapijs/hapi/milestone/111) {#6.5.0}

- [#1851](https://github.com/hapijs/hapi/pull/1851) Updated route documentation.
- [#1844](https://github.com/hapijs/hapi/issues/1844) Replace async
- [#1842](https://github.com/hapijs/hapi/pull/1842) Lab 4.00
- [#1840](https://github.com/hapijs/hapi/issues/1840) No longer possible to load caches using CLI?
- [#1835](https://github.com/hapijs/hapi/issues/1835) server.state ttl must be a number
- [#1832](https://github.com/hapijs/hapi/issues/1832) Replace mime with mime-type
- [#1822](https://github.com/hapijs/hapi/pull/1822) Added joi validation to manifest.
- [#1795](https://github.com/hapijs/hapi/issues/1795) request.server.\_views in plugin
- [#1722](https://github.com/hapijs/hapi/issues/1722) Validate compose manifest

### [6.4.0](https://github.com/hapijs/hapi/milestone/110) <span class="breaking-badge"></span> {#6.4.0}

- [#1831](https://github.com/hapijs/hapi/issues/1831) Upgrade to qs 1.0.0
- [#1810](https://github.com/hapijs/hapi/pull/1810) set X-Content-Type-Options to nosnif for jsonp responses

### [6.3.0](https://github.com/hapijs/hapi/milestone/109) {#6.3.0}

- [#1827](https://github.com/hapijs/hapi/issues/1827) Cannot call setTimeout with non-integer msec value
- [#1826](https://github.com/hapijs/hapi/issues/1826) Support cache generateTimeout setting

### [6.2.2](https://github.com/hapijs/hapi/milestone/108) {#6.2.2}

- [#1820](https://github.com/hapijs/hapi/issues/1820) Rename spumko to hapijs

### [6.2.1](https://github.com/hapijs/hapi/milestone/107) {#6.2.1}

- [#1801](https://github.com/hapijs/hapi/issues/1801) Stale dependencies

### [6.2.0](https://github.com/hapijs/hapi/milestone/106) {#6.2.0}

- [#1790](https://github.com/hapijs/hapi/issues/1790) Expose authentication mode
- [#1767](https://github.com/hapijs/hapi/issues/1767) plugin.location

### [6.1.0](https://github.com/hapijs/hapi/milestone/105) {#6.1.0}

- [#1788](https://github.com/hapijs/hapi/issues/1788) Last-Modified comparison needs to account for 1 second precision
- [#1783](https://github.com/hapijs/hapi/issues/1783) Change etag when content-encoding is used
- [#1782](https://github.com/hapijs/hapi/issues/1782) server.inject() res.result does not reflect actual payload sent on 304/204
- [#1781](https://github.com/hapijs/hapi/issues/1781) Send empty payload on 204
- [#1778](https://github.com/hapijs/hapi/pull/1778) Do not create a duplicate Content-Type header on proxy passthrough
- [#1777](https://github.com/hapijs/hapi/issues/1777) Duplicated "Content-Type" header on proxy requests
- [#1776](https://github.com/hapijs/hapi/issues/1776) Proxy pass-through with onResponse fails to preserve vary header values
- [#1774](https://github.com/hapijs/hapi/pull/1774) Style fixes
- [#1773](https://github.com/hapijs/hapi/issues/1773) Windows path fails on trailing slash on view helpers
- [#1772](https://github.com/hapijs/hapi/issues/1772) HEAD requests should retail etag header
- [#1771](https://github.com/hapijs/hapi/issues/1771) Open open one file stream when using precompressed file
- [#1769](https://github.com/hapijs/hapi/issues/1769) Plugin X missing dependency Y in server if manifest.plugins key order not carefully managed
- [#1766](https://github.com/hapijs/hapi/pull/1766) prepend jsonp callbacks with a comment to prevent the rosetta-flash vulnerability
- [#1763](https://github.com/hapijs/hapi/pull/1763) fixes #1755 - stripTrailingSlash doesn't work when query variables are used
- [#1762](https://github.com/hapijs/hapi/pull/1762) fix content-type overriding issue #1760.
- [#1760](https://github.com/hapijs/hapi/issues/1760) How can I set Content-Type header to the content generated from reply.view?
- [#1756](https://github.com/hapijs/hapi/pull/1756) Follow coding conventions concerning semicolons; Don't initialize variab...
- [#1755](https://github.com/hapijs/hapi/issues/1755) Server Options for Router: stripTrailingSlash doesn't work with query string
- [#1754](https://github.com/hapijs/hapi/issues/1754) File handler to handle 206 Partial Content?
- [#1752](https://github.com/hapijs/hapi/pull/1752) Adding helpful error message when pack.register is missing a callback
- [#1751](https://github.com/hapijs/hapi/issues/1751) Calling pack.register without a callback has an unfriendly error
- [#1745](https://github.com/hapijs/hapi/pull/1745) Add joi validation of pack options
- [#1733](https://github.com/hapijs/hapi/pull/1733) log function should only emit once if \_server object
- [#1728](https://github.com/hapijs/hapi/issues/1728) 6.x breaks plugin modules exporting functions
- [#1721](https://github.com/hapijs/hapi/issues/1721) Validate pack options
- [#1676](https://github.com/hapijs/hapi/issues/1676) Problem serving precompressed files with directory handler
- [#1407](https://github.com/hapijs/hapi/issues/1407) Skip opening file or rendering view on head or 304

### [6.0.2](https://github.com/hapijs/hapi/milestone/104) {#6.0.2}

- [#1720](https://github.com/hapijs/hapi/issues/1720) No way to handle root routes with `route: {prefix: '...'}`
- [#1719](https://github.com/hapijs/hapi/pull/1719) Fixes undefined error in `plugin.dependency`

### [6.0.1](https://github.com/hapijs/hapi/milestone/103) {#6.0.1}

- [#1710](https://github.com/hapijs/hapi/issues/1710) Buffer based passwords fail schema validation (6.0 regression)

### [6.0.0](https://github.com/hapijs/hapi/milestone/102) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/1707" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#6.0.0}

- [#1841](https://github.com/hapijs/hapi/issues/1841) Missing plugin error on migrating from 5.0 provides no useful information
- [#1708](https://github.com/hapijs/hapi/issues/1708) Hapi 6.0 no longer invalidates auth strategy on registration of route
- [#1707](https://github.com/hapijs/hapi/issues/1707) 6.0.0 Release Notes
- [#1703](https://github.com/hapijs/hapi/issues/1703) Catbox 3.0 and drop internal require support
- [#1701](https://github.com/hapijs/hapi/issues/1701) MODULE_NOT_FOUND on Windows when requirePath is absolute
- [#1700](https://github.com/hapijs/hapi/issues/1700) Change the order of actions when starting a pack
- [#1696](https://github.com/hapijs/hapi/issues/1696) Non-Error auth err responses are ignored in try mode
- [#1695](https://github.com/hapijs/hapi/issues/1695) Preserve auth error on try
- [#1694](https://github.com/hapijs/hapi/issues/1694) Minor error tweaks
- [#1693](https://github.com/hapijs/hapi/issues/1693) Enhance setting authentication defaults
- [#1692](https://github.com/hapijs/hapi/issues/1692) Allow testing a request against any configured authentication strategy
- [#1691](https://github.com/hapijs/hapi/pull/1691) V6.0
- [#1688](https://github.com/hapijs/hapi/issues/1688) Bring back reply.redirect()
- [#1687](https://github.com/hapijs/hapi/issues/1687) Don't log auth non-error responses with 'error' tag
- [#1679](https://github.com/hapijs/hapi/issues/1679) Allow cookie-specific settings for failAction, strictHeader, and clearInvalid
- [#1678](https://github.com/hapijs/hapi/issues/1678) Expose the location header logic
- [#1677](https://github.com/hapijs/hapi/issues/1677) Enhance manifest format to support registration options (select, prefix, vhost)
- [#1675](https://github.com/hapijs/hapi/issues/1675) Remove pack.list
- [#1674](https://github.com/hapijs/hapi/issues/1674) Make plugin register() and dependency() selectable
- [#1673](https://github.com/hapijs/hapi/issues/1673) Make plugin.events selectable
- [#1668](https://github.com/hapijs/hapi/issues/1668) Delete 'Accept-Encoding' header on proxy requests
- [#1666](https://github.com/hapijs/hapi/issues/1666) Allow loading different plugins (or same plugins) to different servers in pack
- [#1665](https://github.com/hapijs/hapi/issues/1665) duplicate require calls in hapi/lib/views.js
- [#1664](https://github.com/hapijs/hapi/issues/1664) Upgrading plugins to hapi 6.0 (preview)
- [#1663](https://github.com/hapijs/hapi/issues/1663) Allow register to pre-select servers
- [#1662](https://github.com/hapijs/hapi/issues/1662) Config clones bind, app, and plugins
- [#1661](https://github.com/hapijs/hapi/issues/1661) View manager clones engines including modules
- [#1659](https://github.com/hapijs/hapi/issues/1659) plugin.view() modifies options' basePath
- [#1658](https://github.com/hapijs/hapi/issues/1658) Set route path prefix when loading plugin
- [#1656](https://github.com/hapijs/hapi/issues/1656) Remove pack.require() and plugin.require()
- [#1655](https://github.com/hapijs/hapi/issues/1655) Remove support for string view engine config
- [#1653](https://github.com/hapijs/hapi/issues/1653) Move Composer into Pack.compose()
- [#1652](https://github.com/hapijs/hapi/issues/1652) Remove composer support for multiple packs
- [#1651](https://github.com/hapijs/hapi/issues/1651) 6.0.0 Breaking Changes
- [#1499](https://github.com/hapijs/hapi/issues/1499) Composer not resolving plugins correctly
- [#1490](https://github.com/hapijs/hapi/issues/1490) Feature Request: composer.log
- [#1471](https://github.com/hapijs/hapi/issues/1471) pack.requirePath vs view engine loader
- [#981](https://github.com/hapijs/hapi/issues/981) Scope plugin routes to a virtual host

## Version 5 {#v5}

### [5.1.0](https://github.com/hapijs/hapi/milestone/101) {#5.1.0}

- [#1581](https://github.com/hapijs/hapi/issues/1581) Authentication throws are treated as valid reply()
- [#1579](https://github.com/hapijs/hapi/issues/1579) Add option to remove trailing slashes to router
- [#1574](https://github.com/hapijs/hapi/issues/1574) Document the best way to implement a 404 from the directory handler when using path callback
- [#1573](https://github.com/hapijs/hapi/issues/1573) Server throttling controls do not log execution
- [#1508](https://github.com/hapijs/hapi/issues/1508) Escaped error message with regex validation
- [#1477](https://github.com/hapijs/hapi/issues/1477) proxy xforward option will set bad headers in some cases

### [5.0.0](https://github.com/hapijs/hapi/milestone/100) <a class="release-notes-link" href="https://github.com/hapijs/hapi/issues/1645" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> <span class="breaking-badge"></span> {#5.0.0}

- [#1645](https://github.com/hapijs/hapi/issues/1645) 5.0.0 Release Notes
- [#1644](https://github.com/hapijs/hapi/issues/1644) request.params contains empty strings for missing optional params
- [#1643](https://github.com/hapijs/hapi/issues/1643) Expose cross inputs as validation context
- [#1642](https://github.com/hapijs/hapi/pull/1642) Cjihrig header validation
- [#1641](https://github.com/hapijs/hapi/pull/1641) Upgrade to joi 4.x
- [#1640](https://github.com/hapijs/hapi/issues/1640) Rename route `config.validate.path` to `config.validate.params`
- [#1639](https://github.com/hapijs/hapi/issues/1639) Response validation modifies payload
- [#1622](https://github.com/hapijs/hapi/pull/1622) Extend Hapi cli to enable loading a module before loading hapi
- [#1589](https://github.com/hapijs/hapi/pull/1589) Added validation for request headers.
- [#1588](https://github.com/hapijs/hapi/issues/1588) Validation for cookies and other headers

## Version 4 {#v4}

### [4.1.4](https://github.com/hapijs/hapi/milestone/99) {#4.1.4}

- [#1638](https://github.com/hapijs/hapi/issues/1638) Unahndled Exception when a request is aborted

### [4.1.3](https://github.com/hapijs/hapi/milestone/98) {#4.1.3}

### [4.1.2](https://github.com/hapijs/hapi/milestone/97) {#4.1.2}

- [#1635](https://github.com/hapijs/hapi/pull/1635) Remove reference to request in domain. Closes #1634
- [#1634](https://github.com/hapijs/hapi/issues/1634) Request domain leaks request object

### [4.1.1](https://github.com/hapijs/hapi/milestone/96) {#4.1.1}

- [#1633](https://github.com/hapijs/hapi/pull/1633) Rework domains to single entry
- [#1632](https://github.com/hapijs/hapi/pull/1632) Clean response objects for aborted requests
- [#1619](https://github.com/hapijs/hapi/pull/1619) Avoid async operations while protect is running

### [4.1.0](https://github.com/hapijs/hapi/milestone/93) {#4.1.0}

- [#1583](https://github.com/hapijs/hapi/pull/1583) Support JSON-derived media types
- [#1461](https://github.com/hapijs/hapi/pull/1461) Security headers

### [4.0.3](https://github.com/hapijs/hapi/milestone/95) {#4.0.3}

- [#1604](https://github.com/hapijs/hapi/issues/1604) response emitter fails to retain custom event listeners once sent
- [#1597](https://github.com/hapijs/hapi/issues/1597) Template helpers fail on relative paths

### [4.0.2](https://github.com/hapijs/hapi/milestone/94) {#4.0.2}

- [#1598](https://github.com/hapijs/hapi/issues/1598) Throws when response does not have \_close()

### [4.0.1](https://github.com/hapijs/hapi/milestone/92) {#4.0.1}

- [#1594](https://github.com/hapijs/hapi/issues/1594) Can jsonp be optional?
- [#1591](https://github.com/hapijs/hapi/issues/1591) Find better way to drain non file/socket stream than read()
- [#1590](https://github.com/hapijs/hapi/issues/1590) RSS leak occurs when request does not read entire stream response
- [#1575](https://github.com/hapijs/hapi/issues/1575) Precompile joi response validation
- [#1569](https://github.com/hapijs/hapi/issues/1569) Move ext topo sort to its own module
- [#1567](https://github.com/hapijs/hapi/pull/1567) allow defaultExtension
- [#1566](https://github.com/hapijs/hapi/issues/1566) Precompile joi validation

### [4.0.0](https://github.com/hapijs/hapi/milestone/91) <span class="breaking-badge"></span> {#4.0.0}

- [#1560](https://github.com/hapijs/hapi/issues/1560) 4.0.0
- [#1559](https://github.com/hapijs/hapi/issues/1559) joi 3.0
- [#1558](https://github.com/hapijs/hapi/issues/1558) Change Hapi.utils.version() to Hapi.version and remove Hoek alias
- [#1554](https://github.com/hapijs/hapi/pull/1554) coverage, closes #1524
- [#1551](https://github.com/hapijs/hapi/pull/1551) add an insecureAgent when maxSockets is set, closes #1512
- [#1548](https://github.com/hapijs/hapi/pull/1548) wip: fix windows bugs
- [#1547](https://github.com/hapijs/hapi/pull/1547) Make certain that path is relative before joining it to relativeTo
- [#1524](https://github.com/hapijs/hapi/issues/1524) Coverage after lab partial condition result coverage
- [#1521](https://github.com/hapijs/hapi/pull/1521) Allow plugins to register handler types

## Version 3 {#v3}

### [3.1.0](https://github.com/hapijs/hapi/milestone/90) <span class="breaking-badge"></span> {#3.1.0}

- [#1541](https://github.com/hapijs/hapi/issues/1541) Clarify that statusCode key of stream response passed in response
- [#1540](https://github.com/hapijs/hapi/issues/1540) Pre-gzipped source stream not properly tested for being the active source
- [#1538](https://github.com/hapijs/hapi/issues/1538) Passing Error objects can leak message in 500 response
- [#1536](https://github.com/hapijs/hapi/issues/1536) maxEventLoopDelay fails to catch when load is too high to reach next sample interval
- [#1535](https://github.com/hapijs/hapi/issues/1535) Cannot set maxSockets to node default
- [#1533](https://github.com/hapijs/hapi/issues/1533) Proxy without passThrough fails to set cache-control header
- [#1532](https://github.com/hapijs/hapi/issues/1532) Multipart payload to files with multiple files skips second file when large
- [#1531](https://github.com/hapijs/hapi/issues/1531) pack.log() doesn't retain server debug false setting
- [#1530](https://github.com/hapijs/hapi/issues/1530) plugin.method() should use method bind before plugin bind
- [#1525](https://github.com/hapijs/hapi/pull/1525) expose filename and headers for streams in a multipart form
- [#1523](https://github.com/hapijs/hapi/issues/1523) Question: How to validate payload with templated response properly ?
- [#1520](https://github.com/hapijs/hapi/issues/1520) server.table() mis-documented, missing args, and route.table() is wrong
- [#1518](https://github.com/hapijs/hapi/issues/1518) Server timeout config allows invalid values
- [#1517](https://github.com/hapijs/hapi/issues/1517) Proxy handler payload config validation using incorrect variable
- [#1515](https://github.com/hapijs/hapi/issues/1515) Coverage to 100% after lab logical statement support
- [#1514](https://github.com/hapijs/hapi/issues/1514) Server allows duplicate lables
- [#1513](https://github.com/hapijs/hapi/issues/1513) Authentication userland code not protected by domain

### [3.0.2](https://github.com/hapijs/hapi/milestone/89) {#3.0.2}

- [#1507](https://github.com/hapijs/hapi/issues/1507) request.setUrl('') throws

### [3.0.1](https://github.com/hapijs/hapi/milestone/88) {#3.0.1}

- [#1503](https://github.com/hapijs/hapi/issues/1503) plugin.method(name, fn, [options]) fails

### [3.0.0](https://github.com/hapijs/hapi/milestone/86) <span class="breaking-badge"></span> {#3.0.0}

- [#1485](https://github.com/hapijs/hapi/issues/1485) Bring coverage back to 100% after lab fix
- [#1483](https://github.com/hapijs/hapi/issues/1483) server.helper cache hit causing the object type to be different
- [#1479](https://github.com/hapijs/hapi/issues/1479) Less major version drama
- [#1478](https://github.com/hapijs/hapi/issues/1478) Use joi 2.8 alternatives()
- [#1476](https://github.com/hapijs/hapi/pull/1476) add PATCH to default cors methods, closes #1475
- [#1475](https://github.com/hapijs/hapi/issues/1475) Include PATCH method in options/cors/methods default
- [#1474](https://github.com/hapijs/hapi/issues/1474) v3.0.0 Breaking Changes
- [#1473](https://github.com/hapijs/hapi/issues/1473) Drop dtrace support
- [#1466](https://github.com/hapijs/hapi/issues/1466) Drop support for server helpers
- [#1465](https://github.com/hapijs/hapi/issues/1465) Migrate to catbox 2.0
- [#1464](https://github.com/hapijs/hapi/issues/1464) When in a route config, Joi.any.rename(, {move:true}) doesnt move item in the payload
- [#1458](https://github.com/hapijs/hapi/pull/1458) Removed Http(s) globalAgent settings

## Version 2 {#v2}

### [2.6.0](https://github.com/hapijs/hapi/milestone/85) <span class="breaking-badge"></span> {#2.6.0}

- [#1455](https://github.com/hapijs/hapi/issues/1455) Print to console server logs based on debug config
- [#1453](https://github.com/hapijs/hapi/pull/1453) Include prerequisites in default view context. #1452
- [#1452](https://github.com/hapijs/hapi/issues/1452) Perhaps include `request.pre` in handler view context
- [#1451](https://github.com/hapijs/hapi/issues/1451) Objects created in plugin.dependency or plugin.after are monitored by the wrong domain
- [#1450](https://github.com/hapijs/hapi/issues/1450) Enable handlers to use the prerequisite method string notation
- [#1449](https://github.com/hapijs/hapi/issues/1449) Allow server methods names to include '.' (nested)
- [#1448](https://github.com/hapijs/hapi/issues/1448) Prerequisite string notation parsing errors
- [#1447](https://github.com/hapijs/hapi/issues/1447) Allow prerequisites string notation to use method name without ()
- [#1446](https://github.com/hapijs/hapi/issues/1446) Document server method callback 'isUncacheable' argument
- [#1445](https://github.com/hapijs/hapi/issues/1445) Server method bind option
- [#1442](https://github.com/hapijs/hapi/pull/1442) Response 304
- [#1437](https://github.com/hapijs/hapi/issues/1437) Safari 6 reload bug using directory handler

### [2.5.0](https://github.com/hapijs/hapi/milestone/84) <span class="breaking-badge"></span> {#2.5.0}

- [#1440](https://github.com/hapijs/hapi/issues/1440) Redirecting from within an Auth.Scheme generates a Circular Reference
- [#1439](https://github.com/hapijs/hapi/pull/1439) proper etag formatting
- [#1434](https://github.com/hapijs/hapi/pull/1434) Allow overriding the filename in content-disposition headers
- [#1432](https://github.com/hapijs/hapi/issues/1432) Replace server helpers with server methods
- [#1418](https://github.com/hapijs/hapi/issues/1418) normalise callback API usage OR outsmart callback API inconsistency
- [#1299](https://github.com/hapijs/hapi/issues/1299) thrown errors inside server.inject does not propagate

### [2.4.0](https://github.com/hapijs/hapi/milestone/83) {#2.4.0}

- [#1430](https://github.com/hapijs/hapi/issues/1430) Server fails to parse "" cookie value
- [#1428](https://github.com/hapijs/hapi/issues/1428) request.getLog() includes same event multiple times when using multiple tags
- [#1425](https://github.com/hapijs/hapi/pull/1425) return a reference to the server when adding via pack.server
- [#1424](https://github.com/hapijs/hapi/issues/1424) Searching actual working SSE example (#1008 does not work for me)
- [#1419](https://github.com/hapijs/hapi/issues/1419) Send newline \n after all responses

### [2.3.0](https://github.com/hapijs/hapi/milestone/82) <span class="breaking-badge"></span> {#2.3.0}

- [#1341](https://github.com/hapijs/hapi/issues/1341) Cookie validation does not respect the "strict" option
- [#1320](https://github.com/hapijs/hapi/issues/1320) Add support for asynchronous view rendering

### [2.2.0](https://github.com/hapijs/hapi/milestone/81) <span class="breaking-badge"></span> {#2.2.0}

- [#1427](https://github.com/hapijs/hapi/issues/1427) File descriptor leak can cause DoS vulnerability in v2.0 and v2.1
- [#1414](https://github.com/hapijs/hapi/issues/1414) Sending incorrect status code (200) when file fails to open before transmit
- [#1413](https://github.com/hapijs/hapi/issues/1413) File stream is opened before necessary (e.g. if replaced by another response in ext)
- [#1412](https://github.com/hapijs/hapi/issues/1412) Missing file (404) not captured by onPreResponse
- [#1411](https://github.com/hapijs/hapi/issues/1411) Wasteful encoder prep when response is 304 or head
- [#1410](https://github.com/hapijs/hapi/issues/1410) passThrough statusCode overrides manual code value
- [#1409](https://github.com/hapijs/hapi/issues/1409) Status code set from upstream without passThrough flag
- [#1408](https://github.com/hapijs/hapi/issues/1408) precompressed file handle not closed when using head or 304
- [#1405](https://github.com/hapijs/hapi/issues/1405) Call parseInt() for Joi-validated integers
- [#1404](https://github.com/hapijs/hapi/issues/1404) Protect JSON.stringify from throwing.
- [#1401](https://github.com/hapijs/hapi/issues/1401) route.payload.allow as Array never matches
- [#1400](https://github.com/hapijs/hapi/issues/1400) Question: Can you get a log of requests that don't pass validation?
- [#1395](https://github.com/hapijs/hapi/issues/1395) JSON circular structure error in authentication error logging
- [#1393](https://github.com/hapijs/hapi/pull/1393) add `gunzip` as third option to `parse`; resolves #1391
- [#1391](https://github.com/hapijs/hapi/issues/1391) Disable autoparsing without losing gzip
- [#1387](https://github.com/hapijs/hapi/issues/1387) EMFILE error when hapi serves static files over period of time in hapi 2.1.2
- [#1382](https://github.com/hapijs/hapi/issues/1382) Make joi optional for route validation
- [#1380](https://github.com/hapijs/hapi/pull/1380) Allow bind context for view handler
- [#1379](https://github.com/hapijs/hapi/issues/1379) plugin.bind does not apply to proxy handlers
- [#1378](https://github.com/hapijs/hapi/pull/1378) add failureResponse option to proxy handler
- [#1372](https://github.com/hapijs/hapi/issues/1372) test that handler isn't called when a request is interrupted
- [#1362](https://github.com/hapijs/hapi/issues/1362) (cookies) TypeError: Cannot call method 'match' of undefined
- [#1357](https://github.com/hapijs/hapi/pull/1357) specify hoek minor version
- [#1354](https://github.com/hapijs/hapi/pull/1354) Use configuration objects to register helpers
- [#1333](https://github.com/hapijs/hapi/issues/1333) Clarification on 'stream' changes from 1.20.x to 2.0.x
- [#1328](https://github.com/hapijs/hapi/issues/1328) How to handle custom POST content-types

### [2.1.2](https://github.com/hapijs/hapi/milestone/80) {#2.1.2}

- [#1359](https://github.com/hapijs/hapi/issues/1359) Ext reply(null).state() race condition
- [#1351](https://github.com/hapijs/hapi/issues/1351) Prepare for node 0.12

### [2.1.1](https://github.com/hapijs/hapi/milestone/79) {#2.1.1}

- [#1347](https://github.com/hapijs/hapi/issues/1347) Views should not use basePath when path is absolute

### [2.1.0](https://github.com/hapijs/hapi/milestone/78) <span class="breaking-badge"></span> {#2.1.0}

- [#1344](https://github.com/hapijs/hapi/issues/1344) Use the plugin loader when configured to load view engines
- [#1336](https://github.com/hapijs/hapi/issues/1336) Allow custom view layout folder
- [#1335](https://github.com/hapijs/hapi/issues/1335) Allow view layout to contain a string and boolean
- [#1245](https://github.com/hapijs/hapi/issues/1245) Replace request with nipple in tests

### [2.0.0](https://github.com/hapijs/hapi/milestone/69) <span class="breaking-badge"></span> {#2.0.0}

- [#1332](https://github.com/hapijs/hapi/issues/1332) Payload always logging an error regardless of error state
- [#1331](https://github.com/hapijs/hapi/pull/1331) Fix query(string) regression
- [#1327](https://github.com/hapijs/hapi/pull/1327) Better debug support for object data
- [#1324](https://github.com/hapijs/hapi/issues/1324) When no query params are sent, request.params is null instead of {}.
- [#1322](https://github.com/hapijs/hapi/issues/1322) Does Hapi support multiple view templates?
- [#1317](https://github.com/hapijs/hapi/issues/1317) Cannot Parse form-encoded arrays
- [#1314](https://github.com/hapijs/hapi/issues/1314) Replace old payload try mode with failAction
- [#1313](https://github.com/hapijs/hapi/issues/1313) Change redirectToSlash default value to true
- [#1312](https://github.com/hapijs/hapi/issues/1312) Remove special values for server config 'files.relativeTo'
- [#1311](https://github.com/hapijs/hapi/issues/1311) Implement saving payload to file when not using mutlipart
- [#1309](https://github.com/hapijs/hapi/issues/1309) Migrate all the plugins to 2.0
- [#1304](https://github.com/hapijs/hapi/issues/1304) Request 'peek' event
- [#1301](https://github.com/hapijs/hapi/pull/1301) `querystring` =&gt; `qs`, adds support for nested objects
- [#1300](https://github.com/hapijs/hapi/issues/1300) Do not overwrite Access-Control-Allow-Origin
- [#1297](https://github.com/hapijs/hapi/pull/1297) Document validation option in settings
- [#1296](https://github.com/hapijs/hapi/issues/1296) Possible to overwrite plugin options on a per server scope?
- [#1295](https://github.com/hapijs/hapi/issues/1295) Replace route payload.mode with payload.output and payload.parse
- [#1294](https://github.com/hapijs/hapi/issues/1294) Allow 'domain' option in cookie authentication scheme config
- [#1292](https://github.com/hapijs/hapi/issues/1292) Skip loading entire multipart to memory and stream directly to multiparty
- [#1291](https://github.com/hapijs/hapi/issues/1291) Remove server config normalizeRequestPath and default to true
- [#1290](https://github.com/hapijs/hapi/issues/1290) Partial path param match /a{b}c does not apply isCaseSensitive
- [#1289](https://github.com/hapijs/hapi/issues/1289) Problem in very large file upload
- [#1288](https://github.com/hapijs/hapi/issues/1288) Move auth schemes to plugins
- [#1287](https://github.com/hapijs/hapi/issues/1287) Split server.auth() into server.auth.scheme() and server.auth.strategy()
- [#1286](https://github.com/hapijs/hapi/issues/1286) Expose response preview as public API
- [#1285](https://github.com/hapijs/hapi/issues/1285) Change authenticate() callback to reply interface
- [#1284](https://github.com/hapijs/hapi/issues/1284) Expose request.response and change it to direct ref from func
- [#1282](https://github.com/hapijs/hapi/issues/1282) Security tests using reply().setState() which throws
- [#1281](https://github.com/hapijs/hapi/issues/1281) Change authenticate() callback signature
- [#1280](https://github.com/hapijs/hapi/issues/1280) Support node callback pattern (err, result) for reply()
- [#1279](https://github.com/hapijs/hapi/issues/1279) Convert ext method signature to handler
- [#1277](https://github.com/hapijs/hapi/issues/1277) Emit 'internalError' for every 500, not just the one sent back
- [#1276](https://github.com/hapijs/hapi/issues/1276) Retain headers in 304 response
- [#1275](https://github.com/hapijs/hapi/issues/1275) Boom 2.0
- [#1274](https://github.com/hapijs/hapi/pull/1274) Fixed code example in README to comply with 2.0.x
- [#1272](https://github.com/hapijs/hapi/issues/1272) Redo reply.close()
- [#1270](https://github.com/hapijs/hapi/issues/1270) Apply encoding to Response.Payload operations consistently
- [#1269](https://github.com/hapijs/hapi/issues/1269) Manage state all in the request
- [#1268](https://github.com/hapijs/hapi/issues/1268) Expose more response properties
- [#1267](https://github.com/hapijs/hapi/issues/1267) Add 'app' and 'plugins' to response object
- [#1266](https://github.com/hapijs/hapi/issues/1266) Remove 'response.variety' support
- [#1264](https://github.com/hapijs/hapi/issues/1264) requesting url that is not encoded correctly should return 400, not 404
- [#1262](https://github.com/hapijs/hapi/issues/1262) Remove response.getTtl()
- [#1261](https://github.com/hapijs/hapi/issues/1261) Rename response.uri() to response.location()
- [#1259](https://github.com/hapijs/hapi/issues/1259) onPreResponse not getting 404 for missing directory files
- [#1258](https://github.com/hapijs/hapi/issues/1258) Default Buffer responses to application/octet-stream
- [#1257](https://github.com/hapijs/hapi/issues/1257) Validate all examples
- [#1256](https://github.com/hapijs/hapi/issues/1256) Remove access to internal response types
- [#1254](https://github.com/hapijs/hapi/issues/1254) File response leaks fd if gzipped stream used instead and the other way.
- [#1253](https://github.com/hapijs/hapi/pull/1253) in directory, fix the listing of subdirs that reside in a subdirs that have spaces
- [#1252](https://github.com/hapijs/hapi/issues/1252) Protect response payload stream wrapper from multiple replays
- [#1251](https://github.com/hapijs/hapi/issues/1251) Replace File from response type to reply.file() helper
- [#1249](https://github.com/hapijs/hapi/issues/1249) Cleanup use of request.\_route.cache and request.route.cache
- [#1248](https://github.com/hapijs/hapi/issues/1248) Review proxy upstream ttl passing
- [#1247](https://github.com/hapijs/hapi/issues/1247) Clean up postResponse in proxy config
- [#1246](https://github.com/hapijs/hapi/issues/1246) Allow zero key helpers with cache
- [#1242](https://github.com/hapijs/hapi/issues/1242) Remove server-side route caching
- [#1241](https://github.com/hapijs/hapi/issues/1241) Add user/private flag to state variable
- [#1239](https://github.com/hapijs/hapi/issues/1239) Disable cache when Authorization header is included
- [#1238](https://github.com/hapijs/hapi/issues/1238) Special handling for '\*' Vary response header
- [#1236](https://github.com/hapijs/hapi/issues/1236) Review lru-cache settings
- [#1235](https://github.com/hapijs/hapi/issues/1235) Vary support in internal routes cache
- [#1234](https://github.com/hapijs/hapi/issues/1234) Move client out to separate module
- [#1233](https://github.com/hapijs/hapi/issues/1233) Clarify server app config usage
- [#1231](https://github.com/hapijs/hapi/issues/1231) request.log() no longer adds 'error' tag if data is Error
- [#1230](https://github.com/hapijs/hapi/issues/1230) Remove plugin permissions
- [#1229](https://github.com/hapijs/hapi/issues/1229) Add req.on('error'/'close') to request object processing
- [#1228](https://github.com/hapijs/hapi/issues/1228) Client request timeout and downstream listener not set when payload is a stream
- [#1223](https://github.com/hapijs/hapi/issues/1223) views.helpersPath requires .js files
- [#1222](https://github.com/hapijs/hapi/issues/1222) Proxy passthrough does not allow for cookie domain modification
- [#1219](https://github.com/hapijs/hapi/issues/1219) `pack.require` doc is somewhat incorrect
- [#1216](https://github.com/hapijs/hapi/issues/1216) Remove support for `notFound` handler string
- [#1215](https://github.com/hapijs/hapi/issues/1215) Content-type charset attribute not added to streams
- [#1214](https://github.com/hapijs/hapi/issues/1214) Allow specifying a list of method in route config
- [#1211](https://github.com/hapijs/hapi/issues/1211) Move all response payload processing to \_prepare
- [#1209](https://github.com/hapijs/hapi/issues/1209) Duplicate parameter error is missing route information
- [#1208](https://github.com/hapijs/hapi/issues/1208) Route error message does not include information about which route failed
- [#1207](https://github.com/hapijs/hapi/issues/1207) Accessing the response stream.
- [#1205](https://github.com/hapijs/hapi/issues/1205) Honor options.bind in ext
- [#1204](https://github.com/hapijs/hapi/issues/1204) Rename handler/ext context to bind
- [#1202](https://github.com/hapijs/hapi/issues/1202) Move handler and ext context to use this
- [#1200](https://github.com/hapijs/hapi/pull/1200) Removing confidence, alce from composer and CLI
- [#1199](https://github.com/hapijs/hapi/issues/1199) Remove confidence and alce dependency
- [#1195](https://github.com/hapijs/hapi/issues/1195) Move request.context to request.reply.context
- [#1194](https://github.com/hapijs/hapi/issues/1194) Remove support for decorating request with reply()
- [#1192](https://github.com/hapijs/hapi/issues/1192) Change pre type to always use handler mode
- [#1191](https://github.com/hapijs/hapi/issues/1191) Cannot use multiple parallel pre methods in handler mode
- [#1190](https://github.com/hapijs/hapi/issues/1190) Move Obj stringify step to \_prepare
- [#1189](https://github.com/hapijs/hapi/issues/1189) Attaching a websocket to a server in a pack
- [#1187](https://github.com/hapijs/hapi/issues/1187) Change pre to use nested arrays instead of mode (serial, parallel)
- [#1185](https://github.com/hapijs/hapi/pull/1185) be more careful about options in \_provisionCache
- [#1183](https://github.com/hapijs/hapi/issues/1183) Remove use of removeAllListeners()
- [#1182](https://github.com/hapijs/hapi/issues/1182) Error transformation does not work when serving static files
- [#1178](https://github.com/hapijs/hapi/issues/1178) 2.0 Breaking Changes
- [#1176](https://github.com/hapijs/hapi/pull/1176) Unify stream and buffer responses
- [#1168](https://github.com/hapijs/hapi/issues/1168) Save stream to file like {mode: 'file' ...}
- [#1155](https://github.com/hapijs/hapi/issues/1155) 404 not being caught by onPreResponse function
- [#1134](https://github.com/hapijs/hapi/issues/1134) Joi 2.0 integration feedback
- [#1059](https://github.com/hapijs/hapi/issues/1059) Allow route prerequisites to takeover() and preempt handler
- [#1049](https://github.com/hapijs/hapi/issues/1049) Validate pre config schema

## Version 1 {#v1}

### [1.20.0](https://github.com/hapijs/hapi/milestone/77) {#1.20.0}

- [#1175](https://github.com/hapijs/hapi/issues/1175) Allow disabling CORS for individual route
- [#1174](https://github.com/hapijs/hapi/issues/1174) Adjust CORS origin header options
- [#1171](https://github.com/hapijs/hapi/pull/1171) Only emit vary origin for CORS wildcard mode

### [1.19.5](https://github.com/hapijs/hapi/milestone/76) <span class="breaking-badge"></span> {#1.19.5}

- [#1169](https://github.com/hapijs/hapi/issues/1169) Remove load samples and add protection against interval sample falling behind
- [#1165](https://github.com/hapijs/hapi/issues/1165) Switch benchmarks to use Hoek.Bench instead of Date.now()

### [1.19.4](https://github.com/hapijs/hapi/milestone/75) {#1.19.4}

- [#1163](https://github.com/hapijs/hapi/issues/1163) CORS response doesn't set Vary header in all cases

### [1.19.3](https://github.com/hapijs/hapi/milestone/74) {#1.19.3}

- [#1161](https://github.com/hapijs/hapi/issues/1161) Schema issues

### [1.19.2](https://github.com/hapijs/hapi/milestone/73) {#1.19.2}

- [#1160](https://github.com/hapijs/hapi/issues/1160) Missing null test

### [1.19.1](https://github.com/hapijs/hapi/milestone/72) {#1.19.1}

- [#1159](https://github.com/hapijs/hapi/issues/1159) Allow multiple provisions of the same segment per cache

### [1.19.0](https://github.com/hapijs/hapi/milestone/71) {#1.19.0}

- [#1157](https://github.com/hapijs/hapi/issues/1157) route cache config does not allow specifying name
- [#1156](https://github.com/hapijs/hapi/pull/1156) Honor upstream ttl when proxying
- [#1021](https://github.com/hapijs/hapi/issues/1021) Configure proxy handlers to cache according to upstream policy

### [1.18.0](https://github.com/hapijs/hapi/milestone/70) {#1.18.0}

- [#1152](https://github.com/hapijs/hapi/pull/1152) Load sampling and limits
- [#1151](https://github.com/hapijs/hapi/issues/1151) Max load configuration
- [#1150](https://github.com/hapijs/hapi/pull/1150) Support multiple cache instances
- [#1149](https://github.com/hapijs/hapi/issues/1149) Allow multiple cache containers
- [#1148](https://github.com/hapijs/hapi/issues/1148) Return 401 when allowEmptyUsername is false and username missing

### [1.17.0](https://github.com/hapijs/hapi/milestone/68) {#1.17.0}

- [#1147](https://github.com/hapijs/hapi/pull/1147) Add request.reply.proxy()
- [#1146](https://github.com/hapijs/hapi/issues/1146) Expose proxy functionality as a utility
- [#1145](https://github.com/hapijs/hapi/issues/1145) Proxy errors should use 502 and 504 instead of 500 for most errors
- [#1144](https://github.com/hapijs/hapi/pull/1144) Support pre-compressed files
- [#1142](https://github.com/hapijs/hapi/pull/1142) Fix ext function plugin env binding
- [#1140](https://github.com/hapijs/hapi/issues/1140) Not able to login after attempting without user name
- [#1139](https://github.com/hapijs/hapi/issues/1139) Auth validator does not log useful information
- [#1138](https://github.com/hapijs/hapi/issues/1138) Apply plugin views during onRequest phase when route is not yet setup
- [#1137](https://github.com/hapijs/hapi/issues/1137) generateView at 'onRequest' extension point
- [#1126](https://github.com/hapijs/hapi/issues/1126) serve pre-compressed files when available
- [#1102](https://github.com/hapijs/hapi/issues/1102) How to exclude views from layout
- [#1070](https://github.com/hapijs/hapi/issues/1070) TypeError when validate.\* is set to false

### [1.16.1](https://github.com/hapijs/hapi/milestone/67) {#1.16.1}

- [#1136](https://github.com/hapijs/hapi/issues/1136) Handlebars 1.1.x uses prototype for registerPartials which breaks its use in Hapi
- [#1135](https://github.com/hapijs/hapi/issues/1135) Formatting problem in Reference.md

### [1.16.0](https://github.com/hapijs/hapi/milestone/66) {#1.16.0}

- [#1133](https://github.com/hapijs/hapi/pull/1133) Joi 2.0
- [#1132](https://github.com/hapijs/hapi/issues/1132) Migrate to joi 2.0
- [#1131](https://github.com/hapijs/hapi/issues/1131) Debug mode should log thrown and returned errors similarly
- [#1129](https://github.com/hapijs/hapi/pull/1129) support for iisnode and windows named pipes
- [#1128](https://github.com/hapijs/hapi/issues/1128) Server fails ot start when debug is defined as array
- [#1127](https://github.com/hapijs/hapi/issues/1127) Add ability to listen listen on windows named pipe
- [#1124](https://github.com/hapijs/hapi/pull/1124) Use ALCE for manifest loading.
- [#1123](https://github.com/hapijs/hapi/pull/1123) add ability to listen on unix domain socket

### [1.15.0](https://github.com/hapijs/hapi/milestone/65) <span class="breaking-badge"></span> {#1.15.0}

- [#1122](https://github.com/hapijs/hapi/issues/1122) Turns multipart processing off by default
- [#1119](https://github.com/hapijs/hapi/issues/1119) Would it be worth adding a pretty print option to all JSON payloads?
- [#1116](https://github.com/hapijs/hapi/pull/1116) CORS origin bug fixes and enhancements
- [#1114](https://github.com/hapijs/hapi/issues/1114) What is the best way to access request headers?
- [#1113](https://github.com/hapijs/hapi/pull/1113) updates plugin.views Reference.md entry to a clear and working example
- [#1112](https://github.com/hapijs/hapi/issues/1112) Too strict cookie parsing?
- [#1111](https://github.com/hapijs/hapi/issues/1111) Allow safe CORS origins list
- [#1103](https://github.com/hapijs/hapi/pull/1103) allow arrays of scopes on routes
- [#1101](https://github.com/hapijs/hapi/issues/1101) Multipart configuration options (upload dir, hash)
- [#1094](https://github.com/hapijs/hapi/issues/1094) 404 not being caught by onPreResponse function
- [#1091](https://github.com/hapijs/hapi/pull/1091) Only set access-control-allow-origin if the origin header value matches (or '\*' is allowed)

### [1.14.0](https://github.com/hapijs/hapi/milestone/64) <span class="breaking-badge"></span> {#1.14.0}

- [#1098](https://github.com/hapijs/hapi/issues/1098) Add criteria support to CLI
- [#1097](https://github.com/hapijs/hapi/issues/1097) Initial (internal) confidence integration
- [#1092](https://github.com/hapijs/hapi/issues/1092) Empty path parameter should have empty string value, not undefined
- [#1028](https://github.com/hapijs/hapi/issues/1028) Expose requests content-type/mime & accept
- [#1024](https://github.com/hapijs/hapi/issues/1024) Hapi.Composer.compose() requires "plugins" but won't warn if it's not there
- [#995](https://github.com/hapijs/hapi/issues/995) Block response.created() from methods other than POST and PUT

### [1.13.0](https://github.com/hapijs/hapi/milestone/63) {#1.13.0}

- [#1090](https://github.com/hapijs/hapi/pull/1090) Support partial path segment parameter
- [#1061](https://github.com/hapijs/hapi/issues/1061) POST requests with Content-Type=text/plain
- [#1012](https://github.com/hapijs/hapi/issues/1012) Escaped error responses
- [#1000](https://github.com/hapijs/hapi/issues/1000) Routing using file extensions

### [1.12.0](https://github.com/hapijs/hapi/milestone/62) <span class="breaking-badge"></span> {#1.12.0}

- [#1088](https://github.com/hapijs/hapi/pull/1088) Plugin dependencies
- [#1086](https://github.com/hapijs/hapi/issues/1086) Allow plugins to specify code executed once a plugin dependency has been loaded
- [#1085](https://github.com/hapijs/hapi/pull/1085) Validation options
- [#1084](https://github.com/hapijs/hapi/issues/1084) Restructure validation route configuration
- [#1083](https://github.com/hapijs/hapi/issues/1083) Normalize response headers to lowercase field name
- [#1081](https://github.com/hapijs/hapi/issues/1081) Migrate to Iron 1.0
- [#1077](https://github.com/hapijs/hapi/pull/1077) Add compileMode to schema.js
- [#1076](https://github.com/hapijs/hapi/pull/1076) Test for both formats of Content-Encoding header
- [#1074](https://github.com/hapijs/hapi/pull/1074) Route-specific validation error handler
- [#1055](https://github.com/hapijs/hapi/issues/1055) Migrate to new method of configuring joi
- [#1009](https://github.com/hapijs/hapi/issues/1009) Validation fail response status code
- [#1004](https://github.com/hapijs/hapi/issues/1004) validation fails when using Hapi.types.Object() at the root

### [1.11.1](https://github.com/hapijs/hapi/milestone/61) {#1.11.1}

- [#1067](https://github.com/hapijs/hapi/pull/1067) Bug fix for loading ext auth scheme into multiple servers
- [#1065](https://github.com/hapijs/hapi/issues/1065) plugin.auth fails to load the same ext into multiple servers

### [1.11.0](https://github.com/hapijs/hapi/milestone/60) {#1.11.0}

- [#1064](https://github.com/hapijs/hapi/pull/1064) Helper cache drop interface
- [#1063](https://github.com/hapijs/hapi/issues/1063) Provide interface to drop internal cache records for helpers

### [1.10.0](https://github.com/hapijs/hapi/milestone/59) {#1.10.0}

- [#1058](https://github.com/hapijs/hapi/pull/1058) Closes #1056 and #1057
- [#1057](https://github.com/hapijs/hapi/issues/1057) '/{p*}' is sorted ahead of '/{a}/b/{p*}'
- [#1056](https://github.com/hapijs/hapi/issues/1056) Allow directory paths to include multiple params and use last for resource selection
- [#1054](https://github.com/hapijs/hapi/pull/1054) Enhance prerequisites configuration options
- [#1030](https://github.com/hapijs/hapi/issues/1030) Problems with routes

### [1.9.7](https://github.com/hapijs/hapi/milestone/58) {#1.9.7}

- [#1050](https://github.com/hapijs/hapi/issues/1050) Memory leak due to missing stream destroy
- [#1044](https://github.com/hapijs/hapi/pull/1044) Reverting changes to generic/stream responses

### [1.9.6](https://github.com/hapijs/hapi/milestone/57) {#1.9.6}

- [#1037](https://github.com/hapijs/hapi/pull/1037) Stream responses emit response event
- [#1036](https://github.com/hapijs/hapi/issues/1036) Stream responses don't emit response event

### [1.9.5](https://github.com/hapijs/hapi/milestone/56) {#1.9.5}

- [#1034](https://github.com/hapijs/hapi/pull/1034) Upping shot dep version
- [#1033](https://github.com/hapijs/hapi/issues/1033) Node 0.11 bug fixes
- [#1032](https://github.com/hapijs/hapi/pull/1032) Updating boom version to 1.0.0
- [#1019](https://github.com/hapijs/hapi/pull/1019) Depend on Joi v1.1.x

### [1.9.4](https://github.com/hapijs/hapi/milestone/55) {#1.9.4}

- [#1029](https://github.com/hapijs/hapi/pull/1029) Using latest hoek and moved to AUTHORS file
- [#1017](https://github.com/hapijs/hapi/issues/1017) Overrides Cache-Control in proxy even when no local policy is defined

### [1.9.3](https://github.com/hapijs/hapi/milestone/54) {#1.9.3}

- [#1016](https://github.com/hapijs/hapi/issues/1016) Adding helper with cache to pack with multiple server crash

### [1.9.2](https://github.com/hapijs/hapi/milestone/53) {#1.9.2}

- [#1015](https://github.com/hapijs/hapi/issues/1015) Undo #1014

### [1.9.1](https://github.com/hapijs/hapi/milestone/52) {#1.9.1}

- [#1014](https://github.com/hapijs/hapi/issues/1014) plugin.helper should be selectable
- [#1005](https://github.com/hapijs/hapi/pull/1005) Improve server constructor argument validation error reporting
- [#1003](https://github.com/hapijs/hapi/pull/1003) Ensure request.response function exists before response event
- [#1001](https://github.com/hapijs/hapi/pull/1001) Pack event handlers now support correct args

### [1.9.0](https://github.com/hapijs/hapi/milestone/51) <span class="breaking-badge"></span> {#1.9.0}

- [#998](https://github.com/hapijs/hapi/pull/998) Adding dtrace probes
- [#996](https://github.com/hapijs/hapi/pull/996) Remove Directory and View from cacheable responses
- [#994](https://github.com/hapijs/hapi/pull/994) Server level cache
- [#993](https://github.com/hapijs/hapi/pull/993) Plugin context
- [#991](https://github.com/hapijs/hapi/issues/991) Configurable shared context in plugins
- [#987](https://github.com/hapijs/hapi/issues/987) View routes caching empty payload (with redis)
- [#983](https://github.com/hapijs/hapi/issues/983) Response method terms - encoding() vs charset()
- [#980](https://github.com/hapijs/hapi/issues/980) Add interface to register local `require` function with plugin api
- [#979](https://github.com/hapijs/hapi/issues/979) Confusing error message when configuring auth using default strategy when none configured
- [#978](https://github.com/hapijs/hapi/issues/978) Change plugin `ext` permission default to true
- [#976](https://github.com/hapijs/hapi/pull/976) plugin.require support
- [#975](https://github.com/hapijs/hapi/issues/975) Allow plugins to require other plugins
- [#974](https://github.com/hapijs/hapi/pull/974) Pack start/stop events
- [#973](https://github.com/hapijs/hapi/issues/973) Expose pack start/stop events
- [#972](https://github.com/hapijs/hapi/issues/972) Add dtrace probes to hapi
- [#959](https://github.com/hapijs/hapi/pull/959) Adding foundation for dtrace probe support
- [#954](https://github.com/hapijs/hapi/issues/954) Question: Is it OK to use \_cache as general purpose cache?

### [1.8.3](https://github.com/hapijs/hapi/milestone/50) {#1.8.3}

- [#971](https://github.com/hapijs/hapi/issues/971) Use instanceof Error + isBoom to replace instanceof Boom
- [#970](https://github.com/hapijs/hapi/pull/970) Removing complexity-report
- [#968](https://github.com/hapijs/hapi/pull/968) Changes to `plugin.hapi` and the `cookie` scheme
- [#967](https://github.com/hapijs/hapi/issues/967) Authentication defaultMode allowed invalid values
- [#966](https://github.com/hapijs/hapi/issues/966) Expose the hapi module on the request object
- [#965](https://github.com/hapijs/hapi/pull/965) Change parameter name pack to plugin to resolve #963
- [#963](https://github.com/hapijs/hapi/issues/963) Question: should pack.register's register pack parameter should be renamed to plugin?
- [#962](https://github.com/hapijs/hapi/issues/962) Server config schema does not allow single string labels
- [#960](https://github.com/hapijs/hapi/pull/960) Updates to case sensitive routing
- [#958](https://github.com/hapijs/hapi/pull/958) Path params are no longer lowercased in router
- [#955](https://github.com/hapijs/hapi/pull/955) Update Reference.md plugin.lenght to plugin.length
- [#953](https://github.com/hapijs/hapi/issues/953) Path Parameters case changed when setting isCaseSensitive to false
- [#952](https://github.com/hapijs/hapi/issues/952) Document the importance of using hapi.error over separate Boom module
- [#951](https://github.com/hapijs/hapi/pull/951) use .isBoom instead of instanceof Boom
- [#949](https://github.com/hapijs/hapi/pull/949) Error when hawk payload validation is required but the request contains no hash
- [#948](https://github.com/hapijs/hapi/pull/948) reference multiparty instead of formidable
- [#946](https://github.com/hapijs/hapi/pull/946) Updating example to be clearer
- [#944](https://github.com/hapijs/hapi/pull/944) Found some small typos/formatting issues in Reference.md
- [#940](https://github.com/hapijs/hapi/issues/940) Proxy response gets truncated

### [1.8.2](https://github.com/hapijs/hapi/milestone/49) {#1.8.2}

- [#943](https://github.com/hapijs/hapi/pull/943) Updating version
- [#942](https://github.com/hapijs/hapi/pull/942) Layouts work correctly in jade
- [#941](https://github.com/hapijs/hapi/pull/941) No longer destroying request socket
- [#939](https://github.com/hapijs/hapi/issues/939) JSON response body truncated
- [#938](https://github.com/hapijs/hapi/pull/938) Fixed the code example to get Hapi's version
- [#936](https://github.com/hapijs/hapi/pull/936) Allow omitting trailing slash when last segment is an optional parameter
- [#935](https://github.com/hapijs/hapi/issues/935) Path matching should allow omitting trailing slash before an optional path parameter
- [#926](https://github.com/hapijs/hapi/issues/926) 'layout' option seems broken when using jade as template engine

### [1.8.1](https://github.com/hapijs/hapi/milestone/48) {#1.8.1}

- [#933](https://github.com/hapijs/hapi/pull/933) Updating version to 1.8.1
- [#928](https://github.com/hapijs/hapi/pull/928) Removing listeners on domain when exiting
- [#927](https://github.com/hapijs/hapi/pull/927) Removing global variable

### [1.8.0](https://github.com/hapijs/hapi/milestone/47) {#1.8.0}

- [#925](https://github.com/hapijs/hapi/pull/925) Fixing edge case where bad path can cause issues with url.parse
- [#924](https://github.com/hapijs/hapi/pull/924) Issue/922
- [#923](https://github.com/hapijs/hapi/pull/923) remove connection event listeners when server stops
- [#922](https://github.com/hapijs/hapi/issues/922) Handling directory routes that end both with and without a trailing slash

### [1.7.3](https://github.com/hapijs/hapi/milestone/46) {#1.7.3}

- [#920](https://github.com/hapijs/hapi/pull/920) Upping version to 1.7.3
- [#919](https://github.com/hapijs/hapi/pull/919) Client now handles downstreamRes close event
- [#918](https://github.com/hapijs/hapi/issues/918) Handle potential edge cases in client errors

### [1.7.2](https://github.com/hapijs/hapi/milestone/45) {#1.7.2}

- [#915](https://github.com/hapijs/hapi/issues/915) custom cache engine support

### [1.7.1](https://github.com/hapijs/hapi/milestone/44) {#1.7.1}

- [#913](https://github.com/hapijs/hapi/issues/913) Remove duplicated listener

### [1.7.0](https://github.com/hapijs/hapi/milestone/43) {#1.7.0}

- [#912](https://github.com/hapijs/hapi/pull/912) Fixing aborted causing duplicate res.ends issue with incoming request
- [#911](https://github.com/hapijs/hapi/issues/911) Allow client.request calls without a callback (ignoring response)
- [#910](https://github.com/hapijs/hapi/issues/910) Client does not destroy request on redirection error
- [#907](https://github.com/hapijs/hapi/pull/907) Adding test
- [#795](https://github.com/hapijs/hapi/issues/795) Request support for HEAD routes

### [1.6.2](https://github.com/hapijs/hapi/milestone/42) {#1.6.2}

- [#906](https://github.com/hapijs/hapi/pull/906) Proxy requests are closed when server response already sent

### [1.6.1](https://github.com/hapijs/hapi/milestone/41) {#1.6.1}

- [#904](https://github.com/hapijs/hapi/pull/904) Issue/902
- [#903](https://github.com/hapijs/hapi/pull/903) Fixing issue where timeout occurs after socket close in client
- [#902](https://github.com/hapijs/hapi/issues/902) Handle socket errors after done working with the socket
- [#901](https://github.com/hapijs/hapi/pull/901) Performance tweaks
- [#897](https://github.com/hapijs/hapi/pull/897) Hapi node_modules_path now supports symlinks
- [#896](https://github.com/hapijs/hapi/issues/896) resolve the real path of node_modules_path

### [1.6.0](https://github.com/hapijs/hapi/milestone/40) {#1.6.0}

- [#892](https://github.com/hapijs/hapi/issues/892) Expose internal Client to plugins
- [#891](https://github.com/hapijs/hapi/pull/891) Exposing rejectUnauthorized property on proxy

### [1.5.0](https://github.com/hapijs/hapi/milestone/39) <span class="breaking-badge"></span> {#1.5.0}

- [#889](https://github.com/hapijs/hapi/issues/889) Plugin view engine required from hapi's module path, not plugin
- [#887](https://github.com/hapijs/hapi/issues/887) Default auth scheme only works when scheme is added with 'default' name
- [#886](https://github.com/hapijs/hapi/issues/886) Cookie auth -- unknown auth strategy: default

### [1.4.0](https://github.com/hapijs/hapi/milestone/38) {#1.4.0}

- [#885](https://github.com/hapijs/hapi/pull/885) Fix plugin.path
- [#883](https://github.com/hapijs/hapi/pull/883) Cleanup pack requirePath
- [#876](https://github.com/hapijs/hapi/issues/876) Leading "."s should be removed before matching against domainLabelLenRegx in state.js
- [#873](https://github.com/hapijs/hapi/issues/873) using a plugin with a package in node_modules doesn't work if cwd other than the main directory
- [#872](https://github.com/hapijs/hapi/issues/872) Test for invalid incoming path without leading '/'
- [#870](https://github.com/hapijs/hapi/issues/870) Response treats objects as errors based on too trivial keys
- [#869](https://github.com/hapijs/hapi/issues/869) Request.\_replyInterface called twice but does not share wasProcessed state
- [#868](https://github.com/hapijs/hapi/issues/868) Potential leak when aborting reading a payload if max size reached
- [#857](https://github.com/hapijs/hapi/issues/857) pack.path sometimes not ending in a '/'

### [1.3.0](https://github.com/hapijs/hapi/milestone/37) <span class="breaking-badge"></span> {#1.3.0}

- [#880](https://github.com/hapijs/hapi/pull/880) Performance and hawk options
- [#879](https://github.com/hapijs/hapi/issues/879) Support all Hawk and Bewit options
- [#878](https://github.com/hapijs/hapi/pull/878) Adding Client request socket timeout
- [#871](https://github.com/hapijs/hapi/issues/871) \* allowed in path but used as special character in route fingerprint
- [#863](https://github.com/hapijs/hapi/pull/863) Absolute paths now work correctly with hapi command
- [#862](https://github.com/hapijs/hapi/pull/862) Minor performance tweaks
- [#861](https://github.com/hapijs/hapi/issues/861) hapi -p argument no longer supports absolute path to node_modules
- [#860](https://github.com/hapijs/hapi/pull/860) Adding hapi bin test and fixing issue with no plugins
- [#859](https://github.com/hapijs/hapi/pull/859) Fixing test
- [#858](https://github.com/hapijs/hapi/pull/858) Added missing done() call in test
- [#856](https://github.com/hapijs/hapi/issues/856) Remove \_log() wrapper

### [1.2.0](https://github.com/hapijs/hapi/milestone/36) <span class="breaking-badge"></span> {#1.2.0}

- [#854](https://github.com/hapijs/hapi/pull/854) Move to use multiparty
- [#853](https://github.com/hapijs/hapi/pull/853) New internal proxy handler
- [#852](https://github.com/hapijs/hapi/issues/852) Replace internal proxy implementation
- [#851](https://github.com/hapijs/hapi/issues/851) warning about formidable during npm install
- [#850](https://github.com/hapijs/hapi/pull/850) Increasing allowed sockets to 10 for client
- [#848](https://github.com/hapijs/hapi/pull/848) Template settings override fix
- [#847](https://github.com/hapijs/hapi/issues/847) POST to routes with payload 'parse' doesn't work with NODE 0.10.0 and 0.10.1
- [#846](https://github.com/hapijs/hapi/issues/846) Request: View configuration to autoload helepers
- [#845](https://github.com/hapijs/hapi/issues/845) Generic response fails to account for all possible res events
- [#844](https://github.com/hapijs/hapi/issues/844) Proxy to outside site fails due to request's old stream api and node 0.10 wrap()
- [#843](https://github.com/hapijs/hapi/issues/843) Allow setting custom headers via proxy mapUri

### [1.1.0](https://github.com/hapijs/hapi/milestone/32) {#1.1.0}

- [#839](https://github.com/hapijs/hapi/pull/839) Cleanup listeners
- [#838](https://github.com/hapijs/hapi/pull/838) Issue/808
- [#837](https://github.com/hapijs/hapi/pull/837) Issue/812
- [#835](https://github.com/hapijs/hapi/pull/835) `Pack`: Automatically resolve the `requirePath` if provided
- [#834](https://github.com/hapijs/hapi/issues/834) `Pack` throws an `AssertionError` if the `requirePath` is not absolute
- [#833](https://github.com/hapijs/hapi/pull/833) closes #832
- [#832](https://github.com/hapijs/hapi/issues/832) Allow route.payload config to be an object with `mode`
- [#831](https://github.com/hapijs/hapi/pull/831) Closes #830
- [#830](https://github.com/hapijs/hapi/issues/830) Add payload 'try' parsing mode
- [#828](https://github.com/hapijs/hapi/pull/828) Add HttpOnly support to cookie auth
- [#827](https://github.com/hapijs/hapi/pull/827) request debug printout format and condition
- [#824](https://github.com/hapijs/hapi/pull/824) Issue/821
- [#821](https://github.com/hapijs/hapi/issues/821) Allow to render templates asynchronously
- [#820](https://github.com/hapijs/hapi/pull/820) Clarified the format of payload in server.inject in the Reference doc
- [#812](https://github.com/hapijs/hapi/issues/812) Allow specifying the supported content-type of each route
- [#809](https://github.com/hapijs/hapi/issues/809) Error Stack Trace is not printed to the console
- [#808](https://github.com/hapijs/hapi/issues/808) Add an override config to route.payload
- [#807](https://github.com/hapijs/hapi/issues/807) Allow HttpOnly Flag for authentication cookies
- [#801](https://github.com/hapijs/hapi/issues/801) Switch view from using sync file ready to async

### [1.0.3](https://github.com/hapijs/hapi/milestone/35) {#1.0.3}

- [#823](https://github.com/hapijs/hapi/pull/823) Issue/822
- [#822](https://github.com/hapijs/hapi/issues/822) JSONP doesn't seem to be working
- [#818](https://github.com/hapijs/hapi/pull/818) Tiny composer documentation fix
- [#817](https://github.com/hapijs/hapi/pull/817) Payload bugfix for PATCH method
- [#814](https://github.com/hapijs/hapi/pull/814) Fixed jade compile issues and updated tests to verify fix.
- [#804](https://github.com/hapijs/hapi/issues/804) Remove restriction on params in path for static file handler

### [1.0.2](https://github.com/hapijs/hapi/milestone/34) {#1.0.2}

- [#815](https://github.com/hapijs/hapi/issues/815) Using TLS settings with Buffer
- [#813](https://github.com/hapijs/hapi/issues/813) text/\* content-type always echo back the received content

### [1.0.1](https://github.com/hapijs/hapi/milestone/33) {#1.0.1}

- [#811](https://github.com/hapijs/hapi/issues/811) Does not work with formidable 1.0.14

### [1.0.0](https://github.com/hapijs/hapi/milestone/26) <span class="breaking-badge"></span> {#1.0.0}

- [#796](https://github.com/hapijs/hapi/issues/796) Allow unencoded double quote and backslash in the cookie value
- [#793](https://github.com/hapijs/hapi/issues/793) Use new assert with passed parameters instead of concat string
- [#792](https://github.com/hapijs/hapi/issues/792) Allow validation of any type, not just objects (except errors, still ignored)
- [#791](https://github.com/hapijs/hapi/issues/791) Test fails: Auth Hawk includes authorization header in response when the response is a stream
- [#789](https://github.com/hapijs/hapi/issues/789) Streams not properly being closed for static files when browser gets cache hit
- [#788](https://github.com/hapijs/hapi/issues/788) Need more detailed documentation for "next" callback for event handlers
- [#787](https://github.com/hapijs/hapi/issues/787) Expose Plugin File Path
- [#786](https://github.com/hapijs/hapi/issues/786) View handlers uses `request.querystring` instead of `request.query`
- [#784](https://github.com/hapijs/hapi/issues/784) Change server helper options.generateKey to receive the same arguments as the helper method
- [#782](https://github.com/hapijs/hapi/issues/782) Payload parsing should be based on request method, not path method
- [#781](https://github.com/hapijs/hapi/issues/781) Do not set request.state[name] when value is invalid regardless of failAction
- [#780](https://github.com/hapijs/hapi/issues/780) Relative path redirection should have vhost support
- [#779](https://github.com/hapijs/hapi/issues/779) Add server config `location` for Location header prefix
- [#776](https://github.com/hapijs/hapi/issues/776) Streamline request.reply()
- [#775](https://github.com/hapijs/hapi/issues/775) Log cookie errors when failAction set to 'error'
- [#771](https://github.com/hapijs/hapi/issues/771) Multipart upload issue
- [#769](https://github.com/hapijs/hapi/issues/769) View handler example
- [#768](https://github.com/hapijs/hapi/issues/768) Directory handler example
- [#767](https://github.com/hapijs/hapi/issues/767) Verify every example works with 1.0
- [#765](https://github.com/hapijs/hapi/issues/765) Refactor views manager configuration
- [#761](https://github.com/hapijs/hapi/issues/761) Hapi.Types is undefined
- [#759](https://github.com/hapijs/hapi/pull/759) Feature/misc
- [#758](https://github.com/hapijs/hapi/issues/758) cookie authentication example fails with 1.0.0
- [#755](https://github.com/hapijs/hapi/pull/755) Views now render without child path
- [#754](https://github.com/hapijs/hapi/issues/754) Allow server config to contain uri and not override it if set
- [#752](https://github.com/hapijs/hapi/issues/752) Shared config for plugins
- [#751](https://github.com/hapijs/hapi/issues/751) Cleanup Unmonitored error
- [#749](https://github.com/hapijs/hapi/issues/749) Debug stack trace
- [#748](https://github.com/hapijs/hapi/issues/748) request.reply.redirect going to '0.0.0.0'
- [#745](https://github.com/hapijs/hapi/issues/745) Basic Authentication callback with no username/password returns 500
- [#744](https://github.com/hapijs/hapi/issues/744) Basic Authentication
- [#742](https://github.com/hapijs/hapi/issues/742) Remove built-in Oz support
- [#741](https://github.com/hapijs/hapi/issues/741) Remove Raw response type
- [#739](https://github.com/hapijs/hapi/pull/739) Adding server.stop support for destroying connections after a timeout
- [#738](https://github.com/hapijs/hapi/pull/738) Support for Access-Control-Expose-Headers in the CORS options
- [#736](https://github.com/hapijs/hapi/pull/736) Node v0.10
- [#735](https://github.com/hapijs/hapi/issues/735) 1.0.0 Breaking Changes
- [#651](https://github.com/hapijs/hapi/issues/651) node 0.10
- [#582](https://github.com/hapijs/hapi/issues/582) Require.js support

## Version 0 {#v0}

### [0.16.0](https://github.com/hapijs/hapi/milestone/24) <span class="breaking-badge"></span> {#0.16.0}

- [#728](https://github.com/hapijs/hapi/issues/728) Hawk 0.11
- [#727](https://github.com/hapijs/hapi/pull/727) Fix hawk response header edge cases
- [#726](https://github.com/hapijs/hapi/pull/726) Misc features
- [#725](https://github.com/hapijs/hapi/pull/725) Debug enhancements
- [#724](https://github.com/hapijs/hapi/pull/724) Route validation is now using payload instead of schema
- [#721](https://github.com/hapijs/hapi/issues/721) Rename the route validate.schema to validate.payload
- [#720](https://github.com/hapijs/hapi/issues/720) Auth.responseHeader not called if error returned pre handler
- [#718](https://github.com/hapijs/hapi/issues/718) Automatically set a cookie if none present
- [#716](https://github.com/hapijs/hapi/pull/716) Errors when preparing a response now emit internalError correctly
- [#715](https://github.com/hapijs/hapi/pull/715) Auth api refactor
- [#714](https://github.com/hapijs/hapi/pull/714) Adding remote address and referrer information to request.info
- [#713](https://github.com/hapijs/hapi/issues/713) internalError event not emitted on view error.
- [#711](https://github.com/hapijs/hapi/issues/711) Add environment variable support when using composer
- [#707](https://github.com/hapijs/hapi/issues/707) internalError event returns error handler stack trace not thrown trace
- [#706](https://github.com/hapijs/hapi/issues/706) Hawk's Authorization Response Header
- [#705](https://github.com/hapijs/hapi/issues/705) Hawk's timestamp using Hapi
- [#703](https://github.com/hapijs/hapi/issues/703) taking a look at http data posted before 400 response
- [#702](https://github.com/hapijs/hapi/issues/702) Client IP Address
- [#701](https://github.com/hapijs/hapi/issues/701) A newbie question about Cookie Authentication example
- [#700](https://github.com/hapijs/hapi/pull/700) Adding security tests and fixing security bugs
- [#698](https://github.com/hapijs/hapi/issues/698) Reformat errors ability
- [#697](https://github.com/hapijs/hapi/issues/697) Protect all error responses from echo attacks
- [#696](https://github.com/hapijs/hapi/issues/696) Provide easier debugging defaults
- [#694](https://github.com/hapijs/hapi/issues/694) Normalize handler signature (always bind this, and pass same args)
- [#693](https://github.com/hapijs/hapi/issues/693) file handler includes internal information in the response
- [#692](https://github.com/hapijs/hapi/issues/692) Missing handler error should provide more debug information
- [#686](https://github.com/hapijs/hapi/pull/686) Pack auth api
- [#685](https://github.com/hapijs/hapi/issues/685) How to use State and Cookie Authentication?
- [#684](https://github.com/hapijs/hapi/issues/684) Enable plugin registration of auth schemes
- [#683](https://github.com/hapijs/hapi/pull/683) Pack and cache API refactor
- [#673](https://github.com/hapijs/hapi/issues/673) 0.16.0 Breaking Changes
- [#656](https://github.com/hapijs/hapi/issues/656) Support for virtual hosts
- [#605](https://github.com/hapijs/hapi/issues/605) Plugin-level cache setup
- [#578](https://github.com/hapijs/hapi/issues/578) Graceful Restart

### [0.15.8](https://github.com/hapijs/hapi/milestone/31) {#0.15.8}

- [#723](https://github.com/hapijs/hapi/issues/723) Global autoValue cookie overwrites other cookies
- [#722](https://github.com/hapijs/hapi/issues/722) Proxy shares cookies across different sessions

### [0.15.7](https://github.com/hapijs/hapi/milestone/30) {#0.15.7}

- [#717](https://github.com/hapijs/hapi/pull/717) Auto cookie value

### [0.15.6](https://github.com/hapijs/hapi/milestone/29) {#0.15.6}

- [#687](https://github.com/hapijs/hapi/issues/687) Proxy is double encoding gziped responses

### [0.15.4](https://github.com/hapijs/hapi/milestone/28) {#0.15.4}

- [#682](https://github.com/hapijs/hapi/pull/682) Bypass node http bug in writeHead
- [#681](https://github.com/hapijs/hapi/issues/681) CORS headers need to override proxy CORS headers
- [#679](https://github.com/hapijs/hapi/issues/679) Add test for proxy with passThrough and server caching
- [#678](https://github.com/hapijs/hapi/pull/678) Updating tutorials and adding a plugins list doc
- [#674](https://github.com/hapijs/hapi/pull/674) Adding missing branch tests

### [0.15.3](https://github.com/hapijs/hapi/milestone/27) {#0.15.3}

- [#677](https://github.com/hapijs/hapi/pull/677) Fix ext() with function array bug

### [0.15.2](https://github.com/hapijs/hapi/milestone/25) <span class="breaking-badge"></span> {#0.15.2}

- [#672](https://github.com/hapijs/hapi/issues/672) Emit 'internalError' on 500 responses
- [#671](https://github.com/hapijs/hapi/issues/671) Emit 'internalError' on 500 responses
- [#670](https://github.com/hapijs/hapi/pull/670) internalError event
- [#669](https://github.com/hapijs/hapi/pull/669) Optimize prerequisites and protect
- [#668](https://github.com/hapijs/hapi/issues/668) Run prerequisites inside a domain
- [#667](https://github.com/hapijs/hapi/issues/667) Ensure all assertions inside request handling result in 500 response
- [#666](https://github.com/hapijs/hapi/issues/666) Asserts throw instead of exit
- [#665](https://github.com/hapijs/hapi/issues/665) 0.15.2 Breaking Changes
- [#644](https://github.com/hapijs/hapi/issues/644) Log but ignore cookie errors

### [0.15.1](https://github.com/hapijs/hapi/milestone/23) {#0.15.1}

- [#663](https://github.com/hapijs/hapi/pull/663) Full plugin deps
- [#662](https://github.com/hapijs/hapi/pull/662) Plugin deps
- [#659](https://github.com/hapijs/hapi/pull/659) handler interface api styles
- [#657](https://github.com/hapijs/hapi/issues/657) Route prerequisite detection for route handler request object.
- [#653](https://github.com/hapijs/hapi/pull/653) Add request defensive protection
- [#652](https://github.com/hapijs/hapi/issues/652) Plugin dependencies
- [#650](https://github.com/hapijs/hapi/issues/650) Document plugin API
- [#649](https://github.com/hapijs/hapi/pull/649) Migrate to lab (from mocha)
- [#646](https://github.com/hapijs/hapi/issues/646) Replace mocha with lab
- [#642](https://github.com/hapijs/hapi/pull/642) Adding hawk response auth header
- [#641](https://github.com/hapijs/hapi/issues/641) Question: generic internal error handler
- [#623](https://github.com/hapijs/hapi/issues/623) Hawk 0.10 server response authentication
- [#361](https://github.com/hapijs/hapi/issues/361) Node domains

### [0.15.0](https://github.com/hapijs/hapi/milestone/22) <span class="breaking-badge"></span> {#0.15.0}

- [#638](https://github.com/hapijs/hapi/pull/638) Event tags
- [#637](https://github.com/hapijs/hapi/issues/637) Parsing the request form-encoded payload using qs
- [#636](https://github.com/hapijs/hapi/issues/636) Add event tags object in callback
- [#635](https://github.com/hapijs/hapi/pull/635) Cleanup
- [#634](https://github.com/hapijs/hapi/pull/634) Domains
- [#633](https://github.com/hapijs/hapi/pull/633) pack interface cleanup
- [#632](https://github.com/hapijs/hapi/pull/632) Adding example of cookie failAction
- [#630](https://github.com/hapijs/hapi/pull/630) shot 0.1.0, Buffer response type, encoding
- [#628](https://github.com/hapijs/hapi/issues/628) Support text/\* encoding for incoming payloads
- [#627](https://github.com/hapijs/hapi/issues/627) Allow unknown content-type when not parsing
- [#626](https://github.com/hapijs/hapi/issues/626) shot 0.1.0
- [#625](https://github.com/hapijs/hapi/issues/625) Buffer response type
- [#622](https://github.com/hapijs/hapi/issues/622) Document response object header method
- [#621](https://github.com/hapijs/hapi/issues/621) Setting charset to UTF-8
- [#619](https://github.com/hapijs/hapi/pull/619) hawk 0.10, payload cleanup, text/\* parse support
- [#618](https://github.com/hapijs/hapi/issues/618) Support parsing text/\* mime types
- [#617](https://github.com/hapijs/hapi/pull/617) Upgrade to Hawk 0.9.0
- [#616](https://github.com/hapijs/hapi/pull/616) Cookie Max-Age is in seconds, not msec
- [#615](https://github.com/hapijs/hapi/pull/615) Using path.join where possible
- [#614](https://github.com/hapijs/hapi/issues/614) Cookie MaxAge set incorrectly
- [#613](https://github.com/hapijs/hapi/pull/613) Fix proxy mapUri query bug, allow pack.api to specify key
- [#612](https://github.com/hapijs/hapi/pull/612) Remove monitor
- [#611](https://github.com/hapijs/hapi/pull/611) Adding vhost tests
- [#610](https://github.com/hapijs/hapi/pull/610) Cleaning up test and stream response
- [#609](https://github.com/hapijs/hapi/pull/609) Virtual hosts support
- [#608](https://github.com/hapijs/hapi/issues/608) Random test fails: Response Stream returns a deflated stream reply without a content-length header when accept-encoding is deflate
- [#607](https://github.com/hapijs/hapi/pull/607) Adding basic crumb CSRF information to reference guide
- [#606](https://github.com/hapijs/hapi/pull/606) Handling request and response errors
- [#604](https://github.com/hapijs/hapi/issues/604) Move good log utils back in, turn rest (monitor) to plugin
- [#603](https://github.com/hapijs/hapi/issues/603) Move batch to a plugin
- [#602](https://github.com/hapijs/hapi/pull/602) Relative paths
- [#601](https://github.com/hapijs/hapi/issues/601) Use Path.join where possible
- [#600](https://github.com/hapijs/hapi/issues/600) 0.15.0 Breaking Changes
- [#599](https://github.com/hapijs/hapi/issues/599) proxy with mapUri, example
- [#598](https://github.com/hapijs/hapi/issues/598) Make resources references in a given plugin relative to that plugin
- [#597](https://github.com/hapijs/hapi/issues/597) Create grunt template for scaffolding hapi plugin development
- [#596](https://github.com/hapijs/hapi/pull/596) Adding request payload section
- [#595](https://github.com/hapijs/hapi/pull/595) Fixing gzip stream test to use simple stream
- [#594](https://github.com/hapijs/hapi/pull/594) Adding deflate support to stream response
- [#593](https://github.com/hapijs/hapi/pull/593) Adding graceful shutdown from QUIT signal event
- [#592](https://github.com/hapijs/hapi/pull/592) refactor router
- [#591](https://github.com/hapijs/hapi/pull/591) Fixing test to be isolated
- [#589](https://github.com/hapijs/hapi/pull/589) Sending a gzipped proxy response now works correctly
- [#588](https://github.com/hapijs/hapi/issues/588) Support an array of directories in order of priority
- [#585](https://github.com/hapijs/hapi/pull/585) Server.stop now stops gracefully
- [#583](https://github.com/hapijs/hapi/issues/583) CSRF support
- [#581](https://github.com/hapijs/hapi/issues/581) Enhanced HTML Form support for webdevs
- [#580](https://github.com/hapijs/hapi/issues/580) Command line / ENV param to send Boom.Internal calls to (stdout || stderr)
- [#579](https://github.com/hapijs/hapi/issues/579) Proper Request.flash support in Blammo/yar
- [#566](https://github.com/hapijs/hapi/issues/566) Better documentation for Cookie and Session handling.
- [#565](https://github.com/hapijs/hapi/issues/565) Graceful shutdown
- [#534](https://github.com/hapijs/hapi/issues/534) Document multipart/form-data
- [#495](https://github.com/hapijs/hapi/issues/495) Document new 'try' auth mode
- [#437](https://github.com/hapijs/hapi/issues/437) Support passport.js

### [0.14.2](https://github.com/hapijs/hapi/milestone/21) {#0.14.2}

- [#587](https://github.com/hapijs/hapi/pull/587) Composer config options
- [#577](https://github.com/hapijs/hapi/pull/577) Beef up file etag tests
- [#569](https://github.com/hapijs/hapi/issues/569) Minor: Is 'description' still a valid attribute of the 'config' object when doing route configuration?
- [#562](https://github.com/hapijs/hapi/issues/562) getRouteSourceFilePath doesn't work correctly on windows
- [#538](https://github.com/hapijs/hapi/issues/538) Show a color error on config snippet when invalid
- [#536](https://github.com/hapijs/hapi/issues/536) Support other encoding methods (deflate)
- [#378](https://github.com/hapijs/hapi/issues/378) Hawk bewit support as a new authentication scheme

### [0.14.0](https://github.com/hapijs/hapi/milestone/18) <span class="breaking-badge"></span> {#0.14.0}

- [#563](https://github.com/hapijs/hapi/pull/563) Using memory instead of redis for test
- [#561](https://github.com/hapijs/hapi/pull/561) Composer
- [#554](https://github.com/hapijs/hapi/issues/554) Support node server socket timeout override
- [#553](https://github.com/hapijs/hapi/pull/553) Pack server event and socket timeout override
- [#549](https://github.com/hapijs/hapi/issues/549) "Hello static server" sample does not working on windows
- [#543](https://github.com/hapijs/hapi/pull/543) Fix scoping bug when using multiple helper prerequisites
- [#537](https://github.com/hapijs/hapi/pull/537) Update docs/Reference.md
- [#535](https://github.com/hapijs/hapi/issues/535) Optimize Generic gzip to reduce memory copies of payload.join()
- [#533](https://github.com/hapijs/hapi/issues/533) Add make for generating complexity report
- [#532](https://github.com/hapijs/hapi/issues/532) Validate route config schema
- [#531](https://github.com/hapijs/hapi/pull/531) JSONP
- [#529](https://github.com/hapijs/hapi/issues/529) favicon example
- [#527](https://github.com/hapijs/hapi/issues/527) Support Buffer response
- [#523](https://github.com/hapijs/hapi/pull/523) Set CORS origin header to incoming request origin if allowed
- [#522](https://github.com/hapijs/hapi/pull/522) rename helmet to tv
- [#519](https://github.com/hapijs/hapi/issues/519) Add coverage for 304 response logic
- [#516](https://github.com/hapijs/hapi/issues/516) Auth scheme request extension interface
- [#515](https://github.com/hapijs/hapi/issues/515) Option to automatically clear invalid cookies
- [#514](https://github.com/hapijs/hapi/issues/514) Not found (404) handler method is case sensitive
- [#513](https://github.com/hapijs/hapi/issues/513) Add server.api and request.api for storing application-specific state
- [#512](https://github.com/hapijs/hapi/pull/512) Direct use of Boom (0.3.0)
- [#507](https://github.com/hapijs/hapi/issues/507) Fix incorrect use of applyToDefaults in server constructor
- [#506](https://github.com/hapijs/hapi/issues/506) Add route.config.plugins for plugin-specific config
- [#505](https://github.com/hapijs/hapi/issues/505) Allow Location header with custom URI schemes
- [#504](https://github.com/hapijs/hapi/issues/504) Refactor responses to make it easier to create external responses or manipulate
- [#503](https://github.com/hapijs/hapi/issues/503) Expose request private properties
- [#502](https://github.com/hapijs/hapi/issues/502) Remove server config format options
- [#501](https://github.com/hapijs/hapi/pull/501) Response refactor, bug fixes
- [#500](https://github.com/hapijs/hapi/issues/500) Cookie parsing fails if encoding set to 'none'
- [#499](https://github.com/hapijs/hapi/issues/499) Random test fails: Server Timeout doesn't return an error when server is responding when the timeout occurs
- [#498](https://github.com/hapijs/hapi/pull/498) Adding code coverage support using blanket
- [#497](https://github.com/hapijs/hapi/issues/497) Document policy regarding undocumented features
- [#496](https://github.com/hapijs/hapi/pull/496) Distributable cache for files
- [#494](https://github.com/hapijs/hapi/pull/494) fix typo from issue/491
- [#493](https://github.com/hapijs/hapi/pull/493) Fixing test that would fail periodically
- [#491](https://github.com/hapijs/hapi/issues/491) Example code is wrong
- [#489](https://github.com/hapijs/hapi/issues/489) Setting ttl(0) on cookie with definition with non zero ttl
- [#488](https://github.com/hapijs/hapi/issues/488) Allow setting empty cookie
- [#486](https://github.com/hapijs/hapi/issues/486) Fails sometimes: Payload stream mode doesn't set the request payload when streaming data in and the connection is interrupted
- [#485](https://github.com/hapijs/hapi/issues/485) Add authentication 'try' mode
- [#483](https://github.com/hapijs/hapi/issues/483) CORS support for multiple origins
- [#482](https://github.com/hapijs/hapi/pull/482) Parse cookies before authentication
- [#481](https://github.com/hapijs/hapi/pull/481) Adding log tag filtering information to readme
- [#480](https://github.com/hapijs/hapi/pull/480) Cleaning up this. use
- [#479](https://github.com/hapijs/hapi/issues/479) Review every 'this' to make sure it points to the right context
- [#478](https://github.com/hapijs/hapi/pull/478) Cleanup ext options and error handling
- [#477](https://github.com/hapijs/hapi/issues/477) Return error if received from onRequest
- [#476](https://github.com/hapijs/hapi/issues/476) 0.14.0 Breaking Changes
- [#475](https://github.com/hapijs/hapi/pull/475) Simplify path regex
- [#459](https://github.com/hapijs/hapi/issues/459) Add socket.io example
- [#451](https://github.com/hapijs/hapi/issues/451) JSONP support
- [#441](https://github.com/hapijs/hapi/issues/441) Configuration strict mode checking for any unknown config options
- [#438](https://github.com/hapijs/hapi/pull/438) Adding support for payload authentication validation
- [#428](https://github.com/hapijs/hapi/issues/428) Session authentication strategy
- [#403](https://github.com/hapijs/hapi/issues/403) Try out some new coverage tools
- [#379](https://github.com/hapijs/hapi/issues/379) Hawk payload validation settings
- [#243](https://github.com/hapijs/hapi/issues/243) Rework Readme into tutorial and reference guides

### [0.13.2](https://github.com/hapijs/hapi/milestone/20) {#0.13.2}

- [#474](https://github.com/hapijs/hapi/pull/474) 0.13.2
- [#472](https://github.com/hapijs/hapi/pull/472) Fix matching of wildcard path param with trailing /
- [#471](https://github.com/hapijs/hapi/issues/471) /{p\*} doesn't match /path/
- [#466](https://github.com/hapijs/hapi/pull/466) Directory listing at top level folders now link correctly
- [#465](https://github.com/hapijs/hapi/issues/465) directory list using the directory handler produces wrong URLs
- [#464](https://github.com/hapijs/hapi/issues/464) index option for directory module doesn't work on subdirs
- [#463](https://github.com/hapijs/hapi/pull/463) Typo: req.session.used -&gt; req.session.user

### [0.13.1](https://github.com/hapijs/hapi/milestone/19) <span class="breaking-badge"></span> {#0.13.1}

- [#467](https://github.com/hapijs/hapi/issues/467) 0.13.1 Change pack package.json version location

### [0.13.0](https://github.com/hapijs/hapi/milestone/17) <span class="breaking-badge"></span> {#0.13.0}

- [#457](https://github.com/hapijs/hapi/issues/457) Remove server creation log messages
- [#456](https://github.com/hapijs/hapi/issues/456) Bypass cache logic when not using cache around handler
- [#455](https://github.com/hapijs/hapi/issues/455) Reintroduce the removed request.reply.close() method
- [#454](https://github.com/hapijs/hapi/issues/454) Support wildcard HTTP method routing
- [#452](https://github.com/hapijs/hapi/issues/452) Test server format.error config option
- [#450](https://github.com/hapijs/hapi/pull/450) typo
- [#448](https://github.com/hapijs/hapi/pull/448) Fixed typos
- [#447](https://github.com/hapijs/hapi/issues/447) Replace config.ext with Server.ext()
- [#446](https://github.com/hapijs/hapi/issues/446) Replace setNotFound with wildcard method support
- [#445](https://github.com/hapijs/hapi/issues/445) Streamline Server API
- [#444](https://github.com/hapijs/hapi/issues/444) Server Packs
- [#443](https://github.com/hapijs/hapi/issues/443) Add a link to find breaking changes by release
- [#440](https://github.com/hapijs/hapi/issues/440) 0.13.0 Breaking Changes

### [0.12.0](https://github.com/hapijs/hapi/milestone/14) <span class="breaking-badge"></span> {#0.12.0}

- [#442](https://github.com/hapijs/hapi/issues/442) 0.12.0 Breaking Changes
- [#435](https://github.com/hapijs/hapi/pull/435) Prerequisite helper shortcut interface
- [#434](https://github.com/hapijs/hapi/pull/434) Bound handler to request, bump to 0.12.0
- [#431](https://github.com/hapijs/hapi/issues/431) Response validation fails on response errors
- [#427](https://github.com/hapijs/hapi/pull/427) CORS cleanup and Monitor defaults
- [#426](https://github.com/hapijs/hapi/issues/426) CORS off by default, using catch-all instead of synthetic route
- [#425](https://github.com/hapijs/hapi/pull/425) Route sorting rewrite
- [#422](https://github.com/hapijs/hapi/issues/422) Allow raw (direct) responses to bail if header fails
- [#421](https://github.com/hapijs/hapi/issues/421) onPostRoute called before response is sent
- [#420](https://github.com/hapijs/hapi/pull/420) Goodies
- [#416](https://github.com/hapijs/hapi/pull/416) Auth cleanup
- [#409](https://github.com/hapijs/hapi/issues/409) Error: listen EADDRNOTAVAIL when starting hapi server with foreman
- [#407](https://github.com/hapijs/hapi/pull/407) Adding support for basic auth password hashing
- [#406](https://github.com/hapijs/hapi/pull/406) Update auth dependencies
- [#405](https://github.com/hapijs/hapi/issues/405) For basic auth run password through hashPassword function first
- [#402](https://github.com/hapijs/hapi/pull/402) Use fixed time password comparison
- [#401](https://github.com/hapijs/hapi/pull/401) Enable more than one jade template file to be used in hapi.
- [#397](https://github.com/hapijs/hapi/issues/397) Arrange routes in descending order of specificity
- [#396](https://github.com/hapijs/hapi/issues/396) Accept cache mode 'client+server' as 'server+client'
- [#387](https://github.com/hapijs/hapi/issues/387) Create contributing guidelines
- [#377](https://github.com/hapijs/hapi/issues/377) Document and add examples for the authentication interface
- [#376](https://github.com/hapijs/hapi/issues/376) Switch all tests that listen on a port to use automatically allocated port
- [#374](https://github.com/hapijs/hapi/issues/374) Test Content-Length vs. actual payload size mismatch behaviour
- [#373](https://github.com/hapijs/hapi/issues/373) Add support for private cache-control flag
- [#367](https://github.com/hapijs/hapi/issues/367) Potential headers duplication when mixing sources due to case
- [#363](https://github.com/hapijs/hapi/pull/363) Adding server + client timeout feature
- [#360](https://github.com/hapijs/hapi/issues/360) Timeout server response if taking too long with 503 response
- [#359](https://github.com/hapijs/hapi/issues/359) Timeout client connections taking too long and return 408
- [#358](https://github.com/hapijs/hapi/issues/358) Support other view engines, including multiple engines per server
- [#357](https://github.com/hapijs/hapi/issues/357) Make Views cache usage configurable (per Manager)
- [#347](https://github.com/hapijs/hapi/issues/347) Signed and encrypted state support
- [#325](https://github.com/hapijs/hapi/issues/325) Console output appears even when not configured
- [#307](https://github.com/hapijs/hapi/issues/307) Support multiple authentication strategies per route with preferences
- [#239](https://github.com/hapijs/hapi/issues/239) Test regular and stream payload transmission while request closes

### [0.11.2](https://github.com/hapijs/hapi/milestone/16) {#0.11.2}

- [#370](https://github.com/hapijs/hapi/issues/370) Support 'Access-Control-Allow-Credentials'

### [0.11.1](https://github.com/hapijs/hapi/milestone/15) {#0.11.1}

- [#366](https://github.com/hapijs/hapi/issues/366) Stream response not calling Headers.cors, location, or cache
- [#365](https://github.com/hapijs/hapi/issues/365) Stream response always passing proxy headers through
- [#364](https://github.com/hapijs/hapi/issues/364) Proxy handler doesn't set default value for passThrough settings

### [0.11.0](https://github.com/hapijs/hapi/milestone/13) {#0.11.0}

- [#310](https://github.com/hapijs/hapi/issues/310) Cross-platform monitor
- [#251](https://github.com/hapijs/hapi/issues/251) Support Content-Disposition header in File response
- [#242](https://github.com/hapijs/hapi/issues/242) Cookies support
- [#235](https://github.com/hapijs/hapi/issues/235) View response
- [#169](https://github.com/hapijs/hapi/issues/169) Add response validation settings

### [0.10.0](https://github.com/hapijs/hapi/milestone/9) {#0.10.0}

- [#329](https://github.com/hapijs/hapi/pull/329) Add redirection response
- [#326](https://github.com/hapijs/hapi/pull/326) Adding support for hapi-log
- [#322](https://github.com/hapijs/hapi/pull/322) Docs handler refactor
- [#319](https://github.com/hapijs/hapi/issues/319) Doc configuration should let you set the auth mode
- [#314](https://github.com/hapijs/hapi/pull/314) Multiple auth schemes
- [#309](https://github.com/hapijs/hapi/issues/309) Bring monitor/\* to 100% test coverage
- [#303](https://github.com/hapijs/hapi/issues/303) Handle %-encoding of '/' in route and request paths
- [#302](https://github.com/hapijs/hapi/issues/302) Consider object key name sizes in calculating object memory usage in memory cache
- [#270](https://github.com/hapijs/hapi/issues/270) Multiple auth scheme support
- [#253](https://github.com/hapijs/hapi/issues/253) Support redirection responses

### [0.9.3](https://github.com/hapijs/hapi/milestone/12) {#0.9.3}

- [#317](https://github.com/hapijs/hapi/pull/317) Test helpers, mongo auth test
- [#312](https://github.com/hapijs/hapi/pull/312) Misc cleanup

### [0.9.2](https://github.com/hapijs/hapi/milestone/10) {#0.9.2}

- [#305](https://github.com/hapijs/hapi/pull/305) Hidden files can now optionally be served
- [#301](https://github.com/hapijs/hapi/pull/301) Merge, payload tests
- [#299](https://github.com/hapijs/hapi/pull/299) Fix issue with case-insensitive route conflic
- [#298](https://github.com/hapijs/hapi/pull/298) Prevent use of encoded non-reserved characters in path
- [#297](https://github.com/hapijs/hapi/pull/297) Refactor request path normalization
- [#296](https://github.com/hapijs/hapi/issues/296) Fix route path fingerprint when using cases-insensitive paths
- [#295](https://github.com/hapijs/hapi/issues/295) Prevent directory from showing or serving hidden files (configurable)
- [#294](https://github.com/hapijs/hapi/pull/294) Refactor responses, auth, payload
- [#293](https://github.com/hapijs/hapi/issues/293) Fix multipart parsing
- [#290](https://github.com/hapijs/hapi/issues/290) Improve batch example to include a request
- [#289](https://github.com/hapijs/hapi/issues/289) Add a unique request id for each incoming request
- [#287](https://github.com/hapijs/hapi/issues/287) Forbid using %encoded in route path of unreserved characters
- [#274](https://github.com/hapijs/hapi/issues/274) Add Hawk authentication support
- [#272](https://github.com/hapijs/hapi/issues/272) Normalize %-encoded paths to match incoming requests
- [#271](https://github.com/hapijs/hapi/issues/271) Strict cache mode
- [#254](https://github.com/hapijs/hapi/issues/254) Cleanup handling of response headers / options
- [#241](https://github.com/hapijs/hapi/issues/241) Add static files support

### [0.9.1](https://github.com/hapijs/hapi/milestone/8) {#0.9.1}

- [#277](https://github.com/hapijs/hapi/pull/277) Changed matching rule of {param\*}, Oz tests
- [#275](https://github.com/hapijs/hapi/pull/275) Prevent basic routes collision
- [#268](https://github.com/hapijs/hapi/pull/268) Tests, extension auth schemes
- [#265](https://github.com/hapijs/hapi/issues/265) Document new path option {param\*n}
- [#264](https://github.com/hapijs/hapi/issues/264) Bring all individual file test coverage to over 90%
- [#263](https://github.com/hapijs/hapi/issues/263) Add tests to /test/unit/route.js
- [#262](https://github.com/hapijs/hapi/pull/262) Support /path/{param\*} syntax
- [#260](https://github.com/hapijs/hapi/issues/260) Extension auth schemes
- [#258](https://github.com/hapijs/hapi/pull/258) Adding support for etag and last-modified headers
- [#256](https://github.com/hapijs/hapi/issues/256) Don't cache responses other than 200
- [#255](https://github.com/hapijs/hapi/pull/255) Adding support for gzip responses
- [#232](https://github.com/hapijs/hapi/issues/232) Support sending gzip responses

### [0.9.0](https://github.com/hapijs/hapi/milestone/3) {#0.9.0}

- [#250](https://github.com/hapijs/hapi/pull/250) Direct response support
- [#245](https://github.com/hapijs/hapi/pull/245) Basic auth
- [#240](https://github.com/hapijs/hapi/issues/240) Basic auth scheme
- [#238](https://github.com/hapijs/hapi/issues/238) Document new request.reply interface
- [#237](https://github.com/hapijs/hapi/pull/237) Response refactor
- [#234](https://github.com/hapijs/hapi/pull/234) Oz
- [#233](https://github.com/hapijs/hapi/issues/233) Partial/streaming responses
- [#229](https://github.com/hapijs/hapi/pull/229) Initial 0.9.0
- [#168](https://github.com/hapijs/hapi/issues/168) Move query and schema into a single validation config
- [#167](https://github.com/hapijs/hapi/issues/167) Replace OAuth authentication with OZ

### [0.8.4](https://github.com/hapijs/hapi/milestone/7) {#0.8.4}

- [#222](https://github.com/hapijs/hapi/pull/222) Fix bug where /docs crashes if no POST routes are defined
- [#221](https://github.com/hapijs/hapi/pull/221) Adding parsing of multipart form-data content-type
- [#219](https://github.com/hapijs/hapi/issues/219) cannot bind ephemeral ports
- [#186](https://github.com/hapijs/hapi/issues/186) Unsupported content-type: multipart/form-data

### [0.8.3](https://github.com/hapijs/hapi/milestone/6) {#0.8.3}

- [#212](https://github.com/hapijs/hapi/pull/212) Adding proxy tests and doing a little refactoring
- [#211](https://github.com/hapijs/hapi/pull/211) Cache tests, Fix response processing header order
- [#201](https://github.com/hapijs/hapi/issues/201) Document proxy handler interface
- [#185](https://github.com/hapijs/hapi/issues/185) Turn cache memory strategy into a useful feature

### [0.8.2](https://github.com/hapijs/hapi/milestone/5) {#0.8.2}

- [#210](https://github.com/hapijs/hapi/pull/210) 0.8.2
- [#209](https://github.com/hapijs/hapi/pull/209) Tests
- [#207](https://github.com/hapijs/hapi/pull/207) Error refactor, custom error support (passThrough)
- [#206](https://github.com/hapijs/hapi/pull/206) Fixing issue with error responses being cached + test

### [0.8.1](https://github.com/hapijs/hapi/milestone/4) {#0.8.1}

- [#204](https://github.com/hapijs/hapi/pull/204) Add postResponse method to proxy
- [#200](https://github.com/hapijs/hapi/pull/200) Fix tls config settings
- [#191](https://github.com/hapijs/hapi/issues/191) Pass all TLS options to createServer

### [0.8.0](https://github.com/hapijs/hapi/milestone/2) {#0.8.0}

- [#193](https://github.com/hapijs/hapi/issues/193) Support for gzip'd payloads
- [#183](https://github.com/hapijs/hapi/pull/183) Cache segment validation
- [#172](https://github.com/hapijs/hapi/issues/172) Check if Redis and MongoDB are ready before running tests
- [#165](https://github.com/hapijs/hapi/issues/165) Add route response validation to endpoint documentation
- [#164](https://github.com/hapijs/hapi/pull/164) Server helpers, initial response validation, Mongo support

### [0.6.0](https://github.com/hapijs/hapi/milestone/1) {#0.6.0}

- [#102](https://github.com/hapijs/hapi/pull/102) v0.6.0 merge
- [#101](https://github.com/hapijs/hapi/pull/101) modified new validation fns to use Utils.assert
- [#100](https://github.com/hapijs/hapi/pull/100) New Query Validation Fns Added
- [#99](https://github.com/hapijs/hapi/pull/99) Simplified request log interface
- [#96](https://github.com/hapijs/hapi/pull/96) Small utils
- [#94](https://github.com/hapijs/hapi/pull/94) debug interface, log interface
- [#93](https://github.com/hapijs/hapi/pull/93) fix error on subsequent url accesses for queryval
- [#92](https://github.com/hapijs/hapi/pull/92) Fix example
- [#91](https://github.com/hapijs/hapi/pull/91) QueryValidation fixes, add default behavior for unspecified params, added small tests
- [#63](https://github.com/hapijs/hapi/pull/63) Added in SSL cert passphrase to https server creation from settings.
