<script setup>
import PillarCard from './PillarCard.vue';
import QuoteBlock from './QuoteBlock.vue';
import SectionHead from './SectionHead.vue';
</script>

<template>
  <main class="home-main">
    <!-- Hero (full bleed) -->
    <section class="hero">
      <div class="hero-pattern" aria-hidden="true"></div>
      <div class="hero-inner">
        <img src="/img/hapi.svg" alt="hapi" class="hero-logo" />
        <h1 class="hero-title">
          The <span class="hero-accent">Simple, Secure</span> Framework<br />
          Developers Trust
        </h1>
        <p class="hero-sub">
          Build <strong>powerful</strong>, <strong>scalable applications</strong> with
          <strong>minimal overhead</strong> and full <strong>out-of-the-box</strong> functionality.
          <span class="hero-underline">Your code, your way</span>.
        </p>
        <div class="hero-cta-row">
          <a class="btn btn-primary" href="/tutorials/getting-started">Get started with hapi →</a>
          <a class="btn btn-ghost" href="/api">Read the API docs</a>
        </div>
        <p class="hero-note">
          Originally developed to handle Walmart's <strong>Black Friday scale</strong>, hapi continues to be the
          <strong>proven</strong> choice for <strong>enterprise-grade</strong> backend needs.
        </p>
      </div>
    </section>

    <div class="page-container">
      <!-- Trusted-by logo strip -->
      <section class="trusted">
        <div class="trusted-label">Trusted in production by teams at</div>
        <div class="trusted-logos">
          <img src="/img/quotes/brave.svg" alt="Brave" class="logo-light-only" style="height: 36px" />
          <img src="/img/quotes/brave-dark.svg" alt="Brave" class="logo-dark-only" style="height: 36px" />
          <img src="/img/quotes/auth0.svg" alt="Auth0" class="logo-light-only" style="height: 32px" />
          <img src="/img/quotes/auth0-dark.svg" alt="Auth0" class="logo-dark-only" style="height: 32px" />
          <img src="/img/quotes/beats.svg" alt="Beats" class="logo-light-only" style="height: 40px" />
          <img src="/img/quotes/beats-dark.svg" alt="Beats" class="logo-dark-only" style="height: 40px" />
          <img src="/img/quotes/vrbo.svg" alt="Vrbo" class="logo-light-only" style="height: 28px" />
          <img src="/img/quotes/vrbo-dark.svg" alt="Vrbo" class="logo-dark-only" style="height: 28px" />
          <img src="/img/quotes/conde-nast.svg" alt="Condé Nast" class="logo-light-only" style="height: 26px" />
          <img src="/img/quotes/conde-nast-dark.svg" alt="Condé Nast" class="logo-dark-only" style="height: 26px" />
        </div>
      </section>

      <!-- Pillar grid -->
      <section class="pillars">
        <h2 class="pillars-eyebrow">Why teams pick hapi</h2>
        <div class="pillar-grid">
          <PillarCard
            href="#security"
            title="Security"
            description="Zero external dependencies. Secure defaults. Built by an OAuth co-author."
          >
            <template #icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                /></svg
            ></template>
          </PillarCard>
          <PillarCard
            href="#quality"
            title="Quality"
            description="100% code coverage across every dependency, since day one."
          >
            <template #icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 6 9 17l-5-5" /></svg
            ></template>
          </PillarCard>
          <PillarCard
            href="#developers-first"
            title="Developers First"
            description="No magic. Intuitive internals. Top developer satisfaction scores year after year."
          >
            <template #icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m18 16 4-4-4-4" />
                <path d="m6 8-4 4 4 4" />
                <path d="m14.5 4-5 16" /></svg
            ></template>
          </PillarCard>
          <PillarCard
            href="#predictability"
            title="Predictability"
            description="Strong guarantees for plugins, ordering, and routing. No middleware hell."
          >
            <template #icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" /></svg
            ></template>
          </PillarCard>
          <PillarCard
            href="#extensibility"
            title="Extensibility"
            description="The most mature extension model in Node. Composable, namespaced, validated."
          >
            <template #icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
                <rect x="3" y="3" width="6" height="6" rx="1" />
                <rect x="15" y="15" width="6" height="6" rx="1" /></svg
            ></template>
          </PillarCard>
          <PillarCard
            href="/policies/support"
            title="Support"
            description="Reliable ownership and a strict, well defined security protocol."
          >
            <template #icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg
            ></template>
          </PillarCard>
        </div>
      </section>

      <!-- Security -->
      <section class="home-section vp-doc" id="security">
        <QuoteBlock
          text="At Brave, developing web services with hapi allows us to focus on the many problems to be solved, not on the details of the tool being used. hapi provides the right set of core APIs and extensible plugins to support the requirements of a modern service — session management, security, connectivity, and testing."
          author="Brendan Eich"
          company="Creator of JavaScript &amp; CEO, Brave"
          logo="brave"
          logo-alt="Brave"
          logo-height="40px"
        />

        <SectionHead
          icon="/img/icons/icon_helmets_security.svg"
          title="Trusted for Simplicity, Security, and Satisfaction"
        />
        <p>83% of developers* are concerned with the security of open-source code. You're probably among that 83%.</p>
        <p class="footnote">* npm Inc. 2019 Trends in JavaScript report</p>

        <h3 class="section-heading">You've got nothing to worry about with hapi.</h3>
        <p>
          When you <code>npm install @hapi/hapi</code>, every single line of code you get has been verified. You never
          have to worry about some deep dependency being poorly maintained (or handed over to someone sketchy). hapi is
          the only leading node framework without any external code dependencies. None.
        </p>

        <h3 class="section-heading">How do we keep hapi secure?</h3>
        <ul>
          <li>
            <strong>End-to-end Code Hygiene</strong> — hapi requires the most secure settings to manage, control, and
            distribute code, including 2FA for all contributors.
          </li>
          <li>
            <strong>Secure Defaults, Updated Regularly</strong> — every hapi component comes with the most secure
            defaults out-of-the-box. Along with protecting server load with payload limits and request timeouts, hapi
            blocks error messages that could leak information or echo back exploits.
          </li>
          <li>
            <strong>Integrated Authorization and Authentication Architecture</strong> — the most comprehensive
            authorization and authentication API available in a Node framework.
          </li>
          <li>
            <strong>Advanced Features</strong> — with encrypted and signed cookies, secret or key rotation, and HTTP
            security headers, there are no excuses for building insecure applications.
          </li>
          <li>
            <strong>Reliable, Predictable Ownership</strong> — when something goes wrong, you know who to contact.
            Security updates are handled under a strict, well-defined protocol.
          </li>
          <li>
            <strong>Rich ecosystem</strong> — hapi's extensive set of official plugins means no more blindly trusting
            some middleware you found for critical functionality just because it has a high count on npm.
          </li>
          <li>
            <strong>In-house Security Expertise</strong> — created by Eran Hammer, the author of the OAuth
            specifications and other identity protocols.
          </li>
        </ul>
      </section>

      <!-- Quality -->
      <section class="home-section vp-doc" id="quality">
        <QuoteBlock
          text="We love hapi's clear structure. In particular, its plugin system and request lifecycle — they make it easy for us to separate cross-cutting concerns from our API business logic. It allows us to add features and fix bugs at a fast pace. The hapi ecosystem provides a consistent and secure building block to develop HTTP services at scale."
          author="Damian Schenkelman"
          company="Director of Engineering, Auth0"
          logo="auth0"
          logo-alt="Auth0"
        />

        <SectionHead
          icon="/img/icons/icon_helmets_quality.svg"
          title="Recognized for Industry Leading Quality Standards"
        />
        <p>
          hapi has been <strong>pushing the envelope</strong> on quality from day one. It was the first node framework
          to require and achieve 100% code coverage across every dependency — when everyone thought it was crazy.
        </p>
        <p>
          When quality and performance are in conflict, most frameworks choose wrongly and sacrifice quality for
          performance. <strong>It might save them a millisecond, but it will cost you days</strong>. hapi always chooses
          readability. Machines keep getting faster and cheaper. Humans only get slower and more expensive.
        </p>
        <p>On practically every measurable quality metric, <strong>hapi scores at the very top</strong>:</p>
        <ul>
          <li>
            <strong>Code Readability</strong> — if you cannot open the source code of your framework and understand how
            it works, sooner or later you are going to be in trouble.
          </li>
          <li>
            <strong>Coverage and Style</strong> — 100% code coverage using strict coverage rules and a coding style
            optimized to reduce bugs and increase comprehension — always end-to-end.
          </li>
          <li>
            <strong>Open Issues</strong> — hapi and its official plugins are actively kept with only a handful of open
            issues or pull requests. Few other ecosystems can claim this low level of outstanding issues end-to-end
            across every single dependency.
          </li>
        </ul>
      </section>

      <!-- Developers First -->
      <section class="home-section vp-doc" id="developers-first">
        <QuoteBlock
          text="With a well-planned interface and selection of patterns, hapi has allowed us to get started on business logic on day one of each new project, knowing that we have a solid, yet extendable code base with great test coverage to build off of."
          author="Johnny Megahan"
          company="Beats Music"
          logo="beats"
          logo-alt="Beats"
          logo-height="50px"
        />

        <SectionHead
          icon="/img/icons/icon_devs_greylines.svg"
          title="Relied on for Friction-Free Development and Intuitive Internals"
        />
        <p>The question we care most about is, <strong>"Are you happy?"</strong></p>
        <p><strong>hapi is developer-first</strong> — so you can spend your brainpower on the places that matter.</p>
        <p>
          Every hapi feature is designed to make the platform <strong>easier and more intuitive</strong> to use. That
          means there's no need to hack things together, experiment to see what *might* work, or try to figure out
          hidden internals. <strong>There is no "magic"</strong> — the code does what you expect with easy to follow
          internal logic.
        </p>
        <p>
          hapi's <strong>clean and easy-to-learn interface</strong> doesn't take up too much space. It is designed for a
          small surface area, allowing you to build your applications as you see fit,
          <strong>using your style</strong> and the technologies of your choosing.
        </p>
        <p>
          And hapi users certainly are. In survey after survey, hapi scores at the very top for developer satisfaction.
        </p>
      </section>

      <!-- Predictability -->
      <section class="home-section vp-doc" id="predictability">
        <QuoteBlock
          text="hapi allows us to develop loosely coupled capabilities in a distributed development environment. It is easy to test and has excellent documentation. hapi is the enterprise grade foundation that drives our next generation web applications."
          author="Patrick Ritchie"
          company="Director of Engineering, Vrbo"
          logo="vrbo"
          logo-alt="Vrbo"
          logo-height="32px"
        />

        <SectionHead
          icon="/img/icons/icon_helmets_predictability.svg"
          title="Keeps Large Distributed Teams on the Same Page"
        />
        <p>
          hapi was designed from the ground-up to <strong>support large, distributed, and remote teams</strong>
          — allowing them to effectively work together on common code. No more toe stepping.
        </p>

        <h3 class="section-heading">Say goodbye to middleware hell</h3>
        <p>
          hapi was the first node framework (and in some ways, still the only) to provide
          <strong>strong guarantees</strong>. The order in which parallel or unrelated components are configured should
          never produce unexpected results.
        </p>
        <ul>
          <li>
            <strong>Plugin dependencies</strong> — plugins can safely rely on other plugins, including the order in
            which they must execute, no matter the order in which you register them.
          </li>
          <li>
            <strong>Extension priorities</strong> — request lifecycle extensions can specify their relative order so
            future extensions won't disrupt the existing balance.
          </li>
          <li>
            <strong>Namespace protection</strong> — caches, plugins, decorators, and server methods are all protected
            and cannot be implicitly overridden.
          </li>
          <li>
            <strong>Zero routing conflicts</strong> — paths will never conflict, and will always result in the same
            priority order — no matter what order they're added in.
          </li>
        </ul>
      </section>

      <!-- Extensibility -->
      <section class="home-section vp-doc" id="extensibility">
        <QuoteBlock
          text="hapi's extensive plugin system allows us to quickly build, extend, and compose brand-specific features on top of its rock-solid architecture. It has become our secret weapon for powerful API services."
          author="Paul Fryzel"
          company="Principal Engineer, Condé Nast"
          logo="conde-nast"
          logo-alt="Condé Nast"
          logo-height="30px"
        />

        <SectionHead
          icon="/img/icons/icon_helmets_extensibility.svg"
          title="Provides True Extensibility and Customization, Safely and Predictably"
        />
        <p>
          hapi comes pretty loaded out-of-the-box, but it also has the most <strong>mature and complete</strong> set of
          <strong>extension points at every step</strong> — including <strong>authentication</strong>,
          <strong>authorization</strong>, and <strong>validation</strong>.
        </p>

        <h3 class="section-heading">Middleware is just another name for bad design.</h3>
        <p>
          hapi doesn't use middleware, because it's a bad pattern. Instead of a generic, one-size-fits-all approach
          taken by almost every other framework, hapi provides a rich, laser-focused extensibility model that puts
          <strong>security and predictability first</strong>.
        </p>

        <h3 class="section-heading">Make it Yours.</h3>
        <p>
          hapi has always led the way with tools to make the server yours. It was the first to introduce these (often
          imitated but poorly executed) features:
        </p>
        <ul>
          <li>
            <strong>Framework plugins</strong> — a <strong>truly composable</strong> way of breaking your application
            into logical components with a <strong>super-thin abstraction layer</strong>.
          </li>
          <li>
            <strong>Request lifecycle</strong> — the exact order in which "stuff happens," allowing you to choose the
            specific spot to extend or modify how your application operates.
          </li>
          <li>
            <strong>Server methods</strong> — reusable, cacheable functions accessible throughout the application.
          </li>
          <li>
            <strong>API Decorations</strong> — user-defined API that lives, safely, side-by-side the official API.
          </li>
        </ul>
        <p>
          Plus, everything is properly namespaced, which makes extensions safe and easy to use. You'll never have to
          worry about your application failing in production because of a runtime conflict between two extensions or
          plugins. Everything is validated at load-time so you can easily identify conflicts during development.
        </p>
      </section>

      <div class="final-cta">
        <a class="btn btn-primary" href="/tutorials/getting-started">Get started with hapi →</a>
      </div>
    </div>
    <!-- /.page-container -->
  </main>
</template>

<style scoped>
.home-main {
  font-size: 1.05em;
  padding-bottom: 80px;
}

.page-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ---------- Hero ---------- */
.hero {
  position: relative;
  width: 100%;
  padding: 90px 24px 70px;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(180deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg-soft) 45%, var(--vp-c-bg) 100%);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--vp-c-text-1) 1px, transparent 1px),
    linear-gradient(90deg, var(--vp-c-text-1) 1px, transparent 1px);
  background-size: 44px 44px;
  background-position: -1px -1px;
  opacity: 0.06;
  mask-image: radial-gradient(ellipse 75% 65% at 50% 45%, #000 25%, transparent 78%);
  pointer-events: none;
}

.dark .hero-pattern {
  opacity: 0.09;
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-logo {
  height: 140px;
  margin-bottom: 28px;
  filter: drop-shadow(0 0 28px var(--vp-c-brand-soft));
}

.hero-title {
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.035em;
  margin: 0 0 22px;
}

.hero-accent {
  background: linear-gradient(120deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 50%, var(--vp-c-brand-3) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-sub {
  max-width: 680px;
  font-size: 1.15em;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 0 32px;
}

.hero-underline {
  border-bottom: 2px solid var(--vp-c-brand-1);
  padding-bottom: 1px;
}

.hero-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  margin-bottom: 28px;
}

.hero-note {
  max-width: 580px;
  font-size: 0.95em;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* ---------- Trusted by ---------- */
.trusted {
  text-align: center;
  margin: 20px 0 60px;
  padding: 28px 20px;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.trusted-label {
  font-size: 0.78em;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: var(--vp-c-text-3);
  margin-bottom: 22px;
}

.trusted-logos {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 40px 56px;
}

.trusted-logos img {
  object-fit: contain;
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.trusted-logos img:hover {
  opacity: 1;
}

.logo-dark-only {
  display: none;
}
.dark .logo-light-only {
  display: none;
}
.dark .logo-dark-only {
  display: inline-block;
}

/* ---------- Pillars ---------- */
.pillars {
  margin: 20px 0 60px;
}

.pillars-eyebrow {
  text-align: center;
  font-size: 1.6em;
  font-weight: 900;
  margin: 0 0 32px;
  letter-spacing: -0.01em;
}

.pillar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* ---------- Sections ----------
 * Layout only — typography (p/ul/li/code/h4-6) comes from .vp-doc.
 * Only exception: .section-heading keeps its brand-colored look.
 */
.home-section {
  max-width: 720px;
  margin: 0 auto 80px;
  scroll-margin-top: 80px;
}

.home-section :deep(h2) {
  border: none;
  padding-top: 0;
}

.home-section :deep(h3.section-heading) {
  font-size: 1.1em;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 2.4em 0 1em;
  letter-spacing: -0.015em;
  line-height: 1.3;
}

.footnote {
  font-size: 0.75em;
  text-align: right;
  opacity: 0.65;
}

.final-cta {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

/* ---------- Responsive ---------- */
@media screen and (max-width: 960px) {
  .pillar-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 900px) {
  .home-main {
    font-size: 1em;
  }

  .page-container {
    padding: 0 18px;
  }

  .hero {
    padding: 60px 18px 50px;
  }

  .hero-logo {
    height: 110px;
  }

  .trusted-logos {
    gap: 24px 36px;
  }
}

@media screen and (max-width: 560px) {
  .pillar-grid {
    grid-template-columns: 1fr;
  }
}
</style>
