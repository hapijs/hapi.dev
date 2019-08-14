<template>
  <main>
    <section class="home-container">
      <div class="index-header">
        <div class="index-header1">The Simple, Secure Framework</div>
        <div class="index-header2">Developers Trust</div>
      </div>
      <div class="index-description">
        Build
        <span class="bold">powerful</span>,
        <span class="bold">scalable applications</span>, with
        <span class="bold">minimal overhead</span> and full
        <span class="bold">out-of-the-box</span> functionality -
        <span class="underline">your code, your way</span>
      </div>
      <a
        class="index-button"
        href="/tutorials/?lang=en_US"
        aria-label="get-started-button"
      >Get started with hapi</a>
      <div>
        Originally developed to handle Walmart’s
        <span class="bold">Black Friday scale</span>,
        <br class="break" />hapi continues to be the
        <span class="bold">proven</span> choice for
        <span class="bold">enterprise-grade</span> backend needs.
      </div>
      <div class="index-about">
        <div class="index-about-top">
          <a href="#security" class="index-about-link">Security</a>
          <span class="index-divider">|</span>
          <a href="#quality" class="index-about-link">Quality</a>
          <span class="index-divider">|</span>
          <a href="#developersfirst" class="index-about-link">Developers First</a>
        </div>
        <div class="index-about-bottom">
          <a href="#predictability" class="index-about-link">Predictability</a>
          <span class="index-divider">|</span>
          <a href="#extensibility" class="index-about-link">Extensibility</a>
          <span class="index-divider">|</span>
          <a href="/support" class="index-about-link">Support</a>
        </div>
      </div>
      <Security />
      <Quality />
      <DevelopersFirst />
      <Predictability />
      <Extensibility />
      <a
        class="bottom-button"
        href="/tutorials/?lang=en_US"
        aria-label="get-started-button"
      >Get started with hapi</a>
    </section>
  </main>
</template>

<script>
import Security from "~/components/Security.vue";
import Quality from "~/components/Quality.vue";
import DevelopersFirst from "~/components/DevelopersFirst.vue";
import Predictability from "~/components/Predictability.vue";
import Extensibility from "~/components/Extensibility.vue";

export default {
  layout: "home",
  components: {
    Security,
    Quality,
    DevelopersFirst,
    Predictability,
    Extensibility
  },
  created() {
    this.$store.commit("setDisplay", "home");
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";

.home-container {
  margin: 50px auto 0 auto;
  height: 100%;
  width: 100%;
  max-width: 730px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: $black;
  font-size: 1.3em;
}

.navbar {
  max-width: 1100px;
}

.index-header {
  font-size: 1.45em;
  font-weight: 900;
}

.index-description {
  font-size: 1.15em;
  margin-top: 50px;
}

.index-button {
  border-radius: 10px;
  border: none;
  background: $orange;
  padding: 5px 15px;
  font-size: 0.9em;
  font-weight: 700;
  margin: 40px 0;
  color: #fff;
  cursor: pointer;
  border: 4px solid rgba(0, 0, 0, 0);
}

.index-button:hover,
.bottom-button:hover {
  border: 4px solid $orange;
  background: #fff;
  color: $orange;
  text-decoration: none;
  transition: all 0.3s ease 0s;
}

.bottom-button {
  border-radius: 10px;
  border: none;
  background: $orange;
  padding: 5px 15px;
  font-size: 0.9em;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  border: 4px solid rgba(0, 0, 0, 0);
  margin: 0 0 50px 0;
}

.index-about-header {
  margin: 40px 0 20px 0;
}

.index-about {
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 1em;
  flex-wrap: wrap;
  margin: 50px 0;
  line-height: 30px;
  width: 80%;
}

.index-about-top,
.index-about-bottom {
  display: flex;
}

.index-about-top {
  margin-bottom: 10px;
}

.index-about-link:hover {
  color: $orange;
  text-decoration: underline;
}

.index-about-link {
  cursor: pointer;
}

.index-divider {
  padding: 0 20px;
}

.underline {
  border-bottom: 2px solid $black;
}

.code {
  border: 1px solid $dark-white;
}

.page-container {
  position: relative;
  padding-bottom: 20px;
  text-align: left;
}

.bottom-page-container {
  padding-bottom: 50px;
}

.quote-wrapper {
  position: relative;
  background: #f3f3f3;
  padding: 20px 0 40px 0;
  text-align: left;
  margin: 30px 0 80px 0;
}

.quote-wrapper:before {
  content: "";
  background-color: #f3f3f3;
  position: absolute;
  height: 100%;
  top: 0;
  width: 5000px;
  left: -2500px;
  z-index: -1;
}

.quote-img-container {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 62px;
  margin: 0 20px 0 0;
}

.quote-img {
  position: relative;
  right: 0;
  width: 150px;
}

.quote-text {
  margin: 0;
}

.quote {
  padding: 20px 0;
}

.quote-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.quote-author {
  font-weight: 700;
}

@media screen and (max-width: 900px) {
  .home-container {
    margin-top: 70px;
    padding: 0 20px;
    font-size: 1.1em;
  }

  .index-about {
    width: 100%;
    font-size: 1.15rem;
  }

  .index-about-top {
    margin-bottom: 5px;
  }

  .index-button {
    margin: 20px 0;
    font-size: 1.1rem;
  }

  .underline {
    border-bottom: 1px solid $black;
  }

  .index-divider {
    padding: 0 10px;
  }

  .break {
    display: none;
  }

  .quote-wrapper {
    margin: 0;
  }

  .quote-container {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .quote-img-container {
    position: relative;
    left: 0;
    width: auto;
    height: auto;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 5px;
  }

  .quote-img {
    position: relative;
    top: 0;
    left: 0;
    margin: 0;
    width: 100px;
  }

  .bottom-page-container {
    padding-bottom: 20px;
  }

  .bottom-button {
    margin: 10px 0;
  }
}

@media screen and (max-width: 330px) {
  .index-about {
    width: 100%;
    font-size: 0.9rem;
  }
}
</style>
