<template>
  <div class="page-container bottom-page-container">
    <div class="extensibility-upper-wrapper" id="extensibility">
        <div class="quote-wrapper">
            <div class="quote">"hapi's extensive plugin system allows us to quickly build,
                 extend, and compose brand-specific features on top of its rock-solid architecture.
                  It has become our secret weapon for powerful API services."</div>
          <div class="quote-container">
            <div class="quote-text">
              <div class="quote-author">- Paul Fryzel</div>
              <div class="quote-company">Principal Engineer, Condé Nast</div>
            </div>
            <div class="quote-img-container">
              <img class="quote-img conde-img" src="/img/conde-nast-logo.png" alt="conde-nast-logo">
            </div>
          </div>
        </div>
      <h2
        class="extensibility-heading"
      >Provides True Extensibility and Customization,<br class="break"> Safely and Predictably</h2>
      <div class="extensibility-content">
        hapi comes pretty loaded out-of-the-box, but it also has the most
        <span
          class="bold"
        >mature and complete</span> set of
        <span class="bold">extension points at every step</span> — including
        <span class="bold">authentication</span>,
        <span class="bold">authorization</span>, and
        <span class="bold">validation</span>.
      </div>
    </div>
    <h3 class="extensibility-heading">Middleware is just another name for bad design.</h3>
    <div class="extensibility-content">
      hapi doesn’t use middleware, because it’s a bad pattern. Instead of a generic, one-size-fits-all
      approach taken by almost every other framework, hapi provides a rich, laser-focused extensibility
      model that puts
      <span
        class="bold"
      >security and predictability first</span>.
    </div>
    <h3 class="extensibility-heading">Make it Yours.</h3>
    <div class="extensibility-content">
      hapi has always led the way with tools to make the server yours. It was the first to introduce these
      (often imitated but poorly executed) features:
    </div>
    <ul class="extensibility-list">
      <li class="content-list">
        <span class="bold">Framework plugins</span> — a
        <span class="bold">truly composable</span> way of breaking your application into logical components
        with a
        <span
          class="bold"
        >super-thin abstraction layer</span>.
      </li>
      <li class="content-list">
        <span class="bold">Request lifecycle</span> — the exact order in which “stuff happens,” allowing you to choose the specific
        spot to extend or modify how your application operates.
      </li>
      <li class="content-list">
        <span class="bold">Server methods</span> — reusable, cacheable functions accessible throughout the application.
      </li>
      <li class="content-list">
        <span class="bold">API Decorations</span> — user-defined API that lives, safely, side-by-side the official API.
      </li>
    </ul>
    <div class="extensibility-content">
      Plus, everything is properly namespaced, which makes extensions safe and easy to use. You’ll never
      have to worry about your application failing in production because of a runtime conflict between
      two extensions or plugins. Everything is validated in load-time so you can easily identify conflicts
      during development.
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/markdown.scss";

.extensibility-context {
  margin: 30px 0;
}

.extensibility-heading {
  text-align: center;
  font-weight: 900;
  margin: 40px 0;
}

.conde-img {
  width: 250px !important;
}

@media screen and (max-width: 900px) {
  .conde-img {
    width: 150px !important; 
  }
  
}
</style>
