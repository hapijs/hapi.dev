<template>
  <div class="help-wrapper">
    <div class="help-top">There are a few ways in which you can receive help using hapi:</div>
    <div class="help-middle">- For any issue or question (no matter how basic), open an issue on <a class="help-link" href="https://github.com/hapijs/hapi">github</a>.</div>
    <div class="help-bottom">- For discussions, join the <a class="help-link" href="https://join.slack.com/t/hapihour/shared_invite/enQtNTA5MDUzOTAzOTU4LTUyZmFiYjkyMTBmNDcyMmI2MmRjMzg4Y2YzNTlmNzUzNjViN2U1NmYyY2NjYjhiYWU4MGE2OTFhZDRlYWMyZDY">Slack channel</a>.</div>
  </div>
</template>

<script>
export default {
  layout: 'noSide'
}
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/markdown.scss";

.help-wrapper {
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  font-size: 1.2rem;
}

.help-top, .help-middle {
  margin-bottom: 25px;
}

.help-middle, .help-bottom {
  margin-left: 25px;
}

</style>
