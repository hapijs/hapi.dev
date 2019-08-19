<template>
  <div class="support-wrapper">
    <howToHelp />
  </div>
</template>

<script>
import howToHelp from "~/components/support/howToHelp.vue";

export default {
  layout: "noSide",
  components: {
    howToHelp
  },
  head() {
    return {
      title: "hapi.js - Help"
    };
  },
  created() {
    this.$store.commit("setDisplay", "help");
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/markdown.scss";

.support-wrapper {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 0 60px;
  font-size: 1.2rem;
}

.support-main-heading {
  text-align: center;
  font-weight: 900;
  margin: 40px 0;
}

.support-minor-heading {
  text-align: center;
  font-weight: 900;
  margin: 40px 0 0 0;
}

.support-content {
  margin: 10px 0;
}

.support-button-wrapper {
  margin: 30px auto 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.support-button {
  border-radius: 10px;
  border: none;
  background: $orange;
  padding: 7px 15px;
  font-size: 0.9em;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  border: 4px solid rgba(0, 0, 0, 0);
}

.support-button:hover {
  border: 4px solid $orange;
  background: #fff;
  color: $orange;
  text-decoration: none;
  transition: all 0.3s ease 0s;
}

@media screen and (max-width: 900px) {
  .help-wrapper {
    padding: 10px 20px;
  }
}
</style>
