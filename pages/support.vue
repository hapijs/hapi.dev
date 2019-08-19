<template>
  <div class="support-wrapper">
    <h2 class="support-main-heading">How can we help?</h2>
    <div class="support-content">
      Got a question or a problem with your hapi application? Not to worry!
      The
      <span
        class="underline"
      >hapi Developer Portal</span> contains plenty of resources to help you get
      started and use hapi. But when that’s not enough…
    </div>
    <h4 class="support-minor-heading">Curious about commercial support plans?</h4>
    <div class="support-content">
      A hapi commercial license means you control your
      upgrade timeline, access priority support, and build applications on a sustainable,
      predictable, and secure foundation.
      <span
        class="bold"
      >Plans start as low as $95/month</span>.
    </div>
    <div class="support-button-wrapper">
      <a
        class="support-button"
        href="#plans"
        aria-label="plans-button"
      >Choose the plan that fits your team</a>
    </div>
    <h4 class="support-minor-heading">No worries, we're here to help!</h4>
    <div class="support-content">
      <span class="bold">Free support</span> is always available on GitHub.
      Just open an issue with your question and a community member will try to help. For faster response,
      join the <span class="underline">hapi Slack channel</span> – it’s where many community members hang out and help each other.
    </div>
    <div class="security-content">
      Like all open source projects, free support is constrained by the availability
      of volunteer resources. When free support is not enough, commercial licensing and support plans are available.
    </div>
    <div class="support-button-wrapper">
      <a
        class="support-button"
        href="#plans"
        aria-label="github-button"
      >Open an issue on GitHub</a>
    </div>
  </div>
</template>

<script>
export default {
  layout: "noSide",
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
