<template>
  <section class="container">
    <div class="index-header">
      <div class="index-header1">
        The Simple, Secure Framework
      </div>
      <div class="index-header2">
        Developers Trust
      </div>
    </div>
    <div class="index-description">
      Build
      <span class="bold">powerful</span>,
      <span class="bold">scalable applications</span>, with
      <span class="bold">minimal overhead</span> and full
      <span class="bold">out-of-the-box</span> functionality -
      <span class="bold">your code, your way</span>
    </div>
    <a class="index-button" href="/tutorials">
      Get started with hapi
    </a>
    <div>
      Originally developed to handle Walmart’s
      <span class="bold">Black Friday scale</span>, hapi continues to be the
      <span class="bold">proven</span> choice for
      <span class="bold">enterprise-grade</span> backend needs.
    </div>
    <div class="index-about-header">
      Continue to learn more about:
    </div>
    <div class="index-about">
      <a hfre="/security" class="index-about-link">Security</a>
      <span class="index-divider">|</span>
      <a hfre="/quality" class="index-about-link">Quality</a>
      <span class="index-divider">|</span>
      <a hfre="/developersfirst" class="index-about-link">Developers First</a>
      <span class="index-divider">|</span>
      <a hfre="/predictability" class="index-about-link">Predictability</a>
      <span class="index-divider">|</span>
      <a hfre="/Extensibility" class="index-about-link">Extensibility</a>
      <span class="index-divider">|</span>
      <a hfre="/Support" class="index-about-link">Support</a>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'home',
  components: {}
}

</script>

<style lang="scss">
@import "../assets/styles/main.scss";

.container {
  margin: 50px auto 0 auto;
  height: 100%;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: $black;
  font-size: 1.3em;
}

.index-header {
  font-size: 1.6em;
  font-weight: 700;
}

.index-description {
  margin-top: 50px;
}

.index-button {
  border-radius: 10px;
  border: none;
  background: $orange;
  padding: 15px;
  font-size: 0.9em;
  font-weight: 700;
  margin: 40px 0;
  color: #fff;
  cursor: pointer;
  border: 4px solid rgba(0, 0, 0, 0);
}

.index-button:hover {
  border: 4px solid $orange;
  background: #fff;
  color: $orange;
  transition: all 0.3s ease 0s;
}

.index-about-header {
  margin: 40px 0 20px 0;
}

.index-about {
  font-weight: 700;
  font-size: 0.85em;
  flex-wrap: wrap;
  margin-bottom: 50px;
  line-height: 30px;
}

.index-about-link:hover {
  color: $orange;
  text-decoration: underline;
}

.index-about:nth-child(-n + 5) {
  padding-right: 10px;
}

.index-about-link {
  cursor: pointer;
}

.index-divider {
  padding: 0 5px;
}

.bold {
  font-weight: 700;
}

@media screen and (max-width: 900px) {
  .container {
    margin-top: 70px;
    padding: 0 10px;
  }
}
</style>
