<template>
  <div class="page-container">
    <div class="quality-upper-wrapper" id="quality">
      <div class="quote-wrapper">
        <div class="quote">
          "We love hapi’s clear structure. In particular, its plugin
          system and request lifecycle - they make it easy for us to separate cross-cutting
          concerns from our API business logic. It allows us to add features and fix bugs
          at a fast pace. The hapi ecosystem provides a consistent and secure building
          block to develop HTTP services at scale."
        </div>
        <div class="quote-container">
          <div class="quote-text">
            <div class="quote-author">- Damian Schenkelman</div>
            <div class="quote-company">Director of Engineering, Auth0</div>
          </div>
          <div class="quote-img-container">
            <img class="quote-img" src="/img/auth0-logo.svg" alt="auth0-logo" />
          </div>
        </div>
      </div>
      <h2 class="home-text-heading">Recognized for Industry Leading Quality Standards</h2>
      <div class="quality-content"><img src="/img/icon_helmets_quality.svg" alt="securty helmet" class="qua-helmet" />
        hapi has been
        <span class="bold">pushing the envelope</span> on quality from day one. It was the first node framework to
        require and achieve 100% code coverage across every dependency – when everyone thought it was
        crazy.
      </div>
    </div>
    <div class="quality-middle-wrapper">
      <div class="quality-content">
        When quality and performance are in conflict, most frameworks choose wrongly and sacrifice
        quality for performance.
        <span
          class="bold"
        >It might save them a millisecond, but it will cost you days</span>. hapi always
        chooses readability. Machines keep getting faster and cheaper. Humans only get slower and more
        expensive.
      </div>
    </div>
    <div class="quality-lower-wrapper">
        <div class="quality-content">
          On practically every measurable quality metric,
          <span
            class="bold"
          >hapi scores at the very top</span>:
        </div>
      </div>
      <ul class="quality-list">
        <li class="content-list">
          <span class="bold">Code Readability</span> — if you cannot open the source code of your framework and understand how it
          works, sooner or later you are going to be in trouble.
        </li>
        <li class="content-list">
          <span class="bold">Coverage and Style</span> — 100% code coverage using strict coverage rules and a coding style optimized
          to reduce bugs and increase comprehension – always end-to-end.
        </li>
        <li class="content-list">
          <span class="bold">Open Issues</span> — hapi and its official plugins are actively kept with only a handful of open issues or pull
          requests. Few other ecosystems can claim this low level of outstanding issues end-to-end across
          every single dependency.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../../assets/styles/markdown.scss";

.quality-middle-wrapper {
  margin: 30px 0;
}

.quality-content {
  margin: 0;
}

.quality-heading {
  text-align: center;
  font-weight: 900;
  margin: 40px 0;
}
</style>
