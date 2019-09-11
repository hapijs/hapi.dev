<template>
  <div>
    <h2 class="support-main-heading">How can we help?</h2>
    <div class="support-content">
      Got a question or a problem with your hapi application? Not to worry!
      The
      <span
        class="underline"
      >
        <a
          class="support-link"
          href="https://hapi.dev"
          title="hapi.dev"
          target="__blank"
        >hapi Developer Portal</a>
      </span> contains plenty of resources to help you get
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
      join the
      <span
        class="underline"
      >
        <a
          class="support-link"
          href="https://join.slack.com/t/hapihour/shared_invite/enQtNTA5MDUzOTAzOTU4LTUyZmFiYjkyMTBmNDcyMmI2MmRjMzg4Y2YzNTlmNzUzNjViN2U1NmYyY2NjYjhiYWU4MGE2OTFhZDRlYWMyZDY"
          title="Slack"
          target="__blank"
        >hapi Slack channel</a>
      </span> – it’s where many community members hang out and help each other.
    </div>
    <div class="security-content">
      Like all open source projects, free support is constrained by the availability
      of volunteer resources. When free support is not enough, commercial licensing and support plans are available.
    </div>
    <div class="support-button-wrapper">
      <a
        class="support-button"
        href="https://github.com/hapijs/hapi/issues"
        target="__blank"
        aria-label="github-button"
      >Open an issue on GitHub</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/markdown.scss";

.support-link {
  color: $black;
}

.support-link:hover {
  text-decoration: none;
  color: $black;
}
</style>