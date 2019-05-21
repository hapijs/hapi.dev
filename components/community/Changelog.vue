<template>
  <div class="log-wrapper">
    <a :href="versionUrl" target="__blank" class="log-title">{{version}}</a>
    <div class="changelogtext-wrapper">
      <ChangelogText
        v-for="issue in issues"
        v-bind:key="issue.number"
        :issueUrl="issue.html_url"
        :issueNumber="issue.number"
        :issueText="issue.title"
      />
    </div>
  </div>
</template>

<script>
import ChangelogText from "./ChangelogText.vue";

export default {
  components: {
    ChangelogText
  },
  props: ["version", "versionUrl", "issues"]
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";

.log-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 10px 0 0 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.log-title {
  font-size: 1.75rem;
  color: $orange;
  margin: 0;
}

</style>