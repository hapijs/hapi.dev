<template>
  <div class="log-wrapper">
    <a :href=versionUrl target="__blank" class="log-title">{{version}}</a>
    <div class="log-info-wrapper">
      <a :href=issueUrl target="__blank" class="log-link">#{{issueNumber}}</a>
      <div class="log-text">{{issueText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["version", "versionUrl", "issueNumber", "issueText", "issueUrl"]
}
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";

.log-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 10px 0 0 0;
}

.log-title {
  font-size: 1.75rem;
  color: $orange;
  margin: 0;
}

.log-info-wrapper {
  display: flex;
}

.log-link {
  margin: 0 10px 0 0;
}

</style>