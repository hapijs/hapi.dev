<template>
  <div class="page-container">
    <div class="predict-upper-wrapper" id="predictability">
        <div class="quote-wrapper">
          <div class="quote">"hapi allows us to develop loosely coupled capabilities
                in a distributed development environment. It is easy to test and has 
                excellent documentation. hapi is the enterprise grade foundation that 
                drives our next generation web applications."</div>
          <div class="quote-container">
            <div class="quote-text">
              <div class="quote-author">- Patrick Ritchie</div>
              <div class="quote-company">Director of Engineering, Vrbo</div>
            </div>
            <div class="quote-img-container">
              <img class="quote-img" src="/img/vrbo-logo.png" alt="vrbo-logo">
            </div>
          </div>
        </div>
      <h2 class="predict-heading">Keeps Large Distributed Teams on the Same Page</h2>
      <div class="predict-content">
        hapi was designed from the group-up to
        <span
          class="bold"
        >support large, distributed, and remote teams</span> – allowing
        them to effectively work together on common code. No more toe stepping.
      </div>
    </div>
    <div class="predict-middle-wrapper">
      <h3 class="predict-heading">Say goodbye to middleware hell.</h3>
      <div class="predict-content">
        hapi was the first node framework (and in some ways, still the only) to provide
        <span
          class="bold"
        >strong guarantees</span> .
        The order in which parallel or unrelated components are configured should never produce
        unexpected results.
      </div>
    </div>
    <div class="predict-lower-wrapper">
      <ul class="predict-list">
        <li class="content-list">
          <span class="bold">Plugin dependencies</span> — plugins can safely rely on other plugins, including the order in which they
          must be execute, no matter the order in which you register them.
        </li>
        <li class="content-list">
          <span class="bold">Extension priorities</span> — request lifecycle extensions can specify their relative order so future
          extensions won’t disrupt the existing balance.
        </li>
        <li class="content-list">
          <span class="bold">Namespace protection</span> — caches, plugins, decorators, and server methods are all protected and
          cannot be implicitly overridden.
        </li>
        <li class="content-list">
          <span class="bold">Zero routing conflicts</span> — paths will never conflict, and will always result in the same priority order —
          no matter what order they’re added in.
        </li>
      </ul>
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

.predict-middle-wrapper {
  margin: 30px 0;
}

.predict-heading {
  text-align: center;
  font-weight: 900;
  margin: 40px 0;
}
</style>