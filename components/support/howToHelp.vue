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
    <h4 class="support-minor-heading">No worries, we're here to help!</h4>
    <div class="support-content">
      <img src="/img/icon_helmets_support.svg" alt="support helmet" class="support-helmet" />
      <span class="bold">Free support</span> is always available on GitHub.
      Just open an issue with your question and a community member will try to help. For faster response,
      join the
      <span
        class="underline"
      >
        <a
          class="support-link"
          href="https://join.slack.com/t/hapihour/shared_invite/enQtNTA5MDUzOTAzOTU4LTY1YzY0ZDM4YTZkNzYzOGExNDYzZjQ3YzJkNTVhNmExMDdlMjY3NDhkNDUxNjU4NTY1YjkzMTcxMzBkMzFiNWE"
          title="Slack"
          target="__blank"
        >hapi Slack channel</a>
      </span> – it’s where many community members hang out and help each other.
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
@import "../../assets/styles/variables.scss";

.support-header {
  margin: 0 0 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.support-helmet {
  width: 160px;
  float: left;
  margin: -5px 10px 0 0;
}

.support-link {
  color: $orange;
}

.support-link:hover {
  text-decoration: underline;
  color: $orange;
}

@media screen and (max-width: 900px) {
  .support-helmet {
    width: 80px;
  }
}
</style>
