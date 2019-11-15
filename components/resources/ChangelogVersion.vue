<template>
  <div class="logWrapper">
    <div class="logVersionWrapper">
      <a :href="versionUrl" target="__blank" class="log-title">{{ version }}</a>
      <div v-if=breaking class="breaking">breaking changes</div>
      <div v-if=release class="release">Additional Information</div>
    </div>
    <div class="changelogtext-wrapper">
      <ChangelogText
        v-for="issue in issues"
        v-bind:key="issue.number"
        :issueUrl="issue.html_url"
        :issueNumber="issue.number"
        :issueText="issue.title"
        :issueLabels="issue.labels"
      />
    </div>
  </div>
</template>

<script>
import ChangelogText from './ChangelogText.vue';

export default {
  components: {
    ChangelogText
  },
  props: ['version', 'versionUrl', 'issues'],
  data() {
    return {
      breaking: false,
      release: false
    };
  },
  created() {
    for (let issue of this.$props.issues) {
      if (issue.labels.some(label => label.name === 'breaking changes')) {
        this.$data.breaking = true;
      }
      if (issue.labels.some(label => label.name === 'release notes')) {
        this.$data.release = true;
      }
    }
  }
};
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';

.logWrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 10px 0 0 0;
  padding-bottom: 10px;
  border-bottom: 1px solid $dark-white;
}

.logVersionWrapper {
  display: flex;
  align-items: flex-start;
  margin: 0;
}

.breaking {
  padding: 1px 4px;
  margin: 10px 10px 0 10px;
  // border: 1px solid $dark-white;
  font-size: .8em;
  font-weight: 600;
  background: $orange
}

.log-title {
  font-size: 1.75rem;
  color: $orange;
  margin: 0;
}
</style>
