<template>
  <div class="page-container">
    <div class="develop-upper-wrapper" id="developersfirst">
        <div class="quote-wrapper">
          <div class="quote">“With a well-planned interface
                and selection of patterns, hapi has allowed 
                us to get started on business logic on day one 
                of each new project, knowing that we have a solid,
                yet extendable code base with great test coverage 
                to build off of.”</div>
          <div class="quote-container">
            <div class="quote-text">
              <div class="quote-author">- Johnny Megahan</div>
              <div class="quote-company">Beats Music</div>
            </div>
            <div class="quote-img-container">
              <img class="quote-img beats-logo" src="/img/beats-logo.svg" alt="beats-logo">
            </div>
          </div>
        </div>
      <h2 class="develop-heading">Relied on for Friction-Free Development and Intuitive Internals</h2>
      <div class="develop-content">
        The question we care most about is,
        <span class="bold">“Are you happy?”</span>
      </div>
      <div class="develop-content">
        <span class="bold">hapi is developer-first</span> — so you can spend your brainpower on the places that matter.
      </div>
      <div class="develop-content">
        Every hapi feature is designed to make the platform
        <span
          class="bold"
        >easier and more intuitive</span> to use. That means
        there’s no need to hack things together, experiment to see what *might* work, or try to figure out
        hidden internals.
        <span
          class="bold"
        >There is no “magic”</span> – the code does what you expect with easy to follow internal
        logic.
      </div>
      <div class="develop-content">
        hapi's a
        <span class="bold">clean and easy-to-learn interface</span> doesn’t take up too much space. It is designed for a small
        surface area, allowing you to build your applications as you see fit,
        <span
          class="bold"
        >using your style</span> and the
        technologies of your choosing.
      </div>
      <div class="develop-content">
        And hapi users certainly are. In survey after survey, hapi scores at the very top for developer
        satisfaction.
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/markdown.scss";

.develop-content {
  margin: 30px 0;
}

.develop-heading {
  text-align: center;
  font-weight: 900;
  margin: 40px 0;
}

.beats-logo {
  width: 62px !important;
  margin: 0;
}

@media screen and (max-width: 900px) {
  .beats-logo {
    width: 46px !important; 
  }
  
}
</style>