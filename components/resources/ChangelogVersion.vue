<template>
  <div class="logWrapper">
    <div class="logVersionWrapper">
      <a :href="versionUrl" target="__blank" class="log-title" :id='version'>{{ version }}</a>
      <a :href="releaseURL" v-if="release" class="releaseLink" target="_blank"
        ><div class="release">
          <img
            class="releaseNotesImg"
            src="/img/release-notes.png"
            alt="Release Notes"
            title="View Release Notes"
          />additional information
        </div></a
      >
      <div v-if="breaking" class="breaking">breaking changes</div>
    </div>
    <div class="changelogtext-wrapper">
      <ChangelogText
        v-for="issue in issuesArray"
        v-bind:key="issue.number"
        :issueUrl="issue.html_url"
        :issueNumber="issue.number"
        :issueText="issue.title"
        :issueLabels="issue.labels"
      />
      <div :class="showMoreIssues ? 'hidden-issues-wrapper activeIssues' : 'hidden-issues-wrapper'">
        <ChangelogText
          v-for="issue in hiddenIssues"
          v-bind:key="issue.number"
          :issueUrl="issue.html_url"
          :issueNumber="issue.number"
          :issueText="issue.title"
          :issueLabels="issue.labels"
        />
      </div>
      <button class="issuesButton" v-if="showMoreButton" v-on:click="showIssues()">
        <img src="/img/down.png" alt="down arrow" :class="showMoreIssues ? 'issuesButtonUpArrow' : 'issuesButtonDownArrow'" />{{ !getShowMoreIssues ? 'Show More' : 'Hide Issues' }}
      </button>
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
      issuesArray: [],
      breaking: false,
      release: false,
      releaseURL: '',
      showMoreButton: false,
      showMoreIssues: false,
      hiddenIssues: []
    };
  },
  methods: {
    showIssues() {
      this.$data.showMoreIssues = !this.$data.showMoreIssues;
      if (!this.$data.showMoreIssues) {
        let id = document.getElementById(this.$props.version)
        window.scrollTo(0, id.offsetTop)
      }
    }
  },
  computed: {
    getShowMoreIssues() {
      return this.$data.showMoreIssues;
    }
  },
  created() {
    this.$data.issuesArray = this.$props.issues;
    for (let issue of this.$data.issuesArray) {
      if (issue.labels.some(label => label.name === 'breaking changes')) {
        this.$data.breaking = true;
      }
      if (issue.labels.some(label => label.name === 'release notes')) {
        this.$data.release = true;
        this.$data.releaseURL = issue.html_url;
      }
    }
    if (this.$data.issuesArray.length > 10) {
      this.$data.issuesArray = this.$data.issuesArray.slice(0, 10);
      this.$data.hiddenIssues = this.$props.issues.slice(10);
      this.$data.showMoreButton = true;
    }
  }
};
</script>

<style lang="scss">
@import '../../assets/styles/variables.scss';

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
  align-items: center;
  margin: 0;
}

.breaking {
  padding: 2px 4px;
  font-size: 0.8em;
  font-weight: 600;
  background: $orange;
}

.releaseLink,
.releaseLink:hover {
  color: $black;
}

.release {
  display: flex;
  align-items: center;
  margin: 0 10px 0 0;
  padding: 2px 4px;
  font-size: 0.8em;
  font-weight: 600;
  background: #fad8c7;
}

.releaseNotesImg {
  width: 15px;
  margin-right: 5px;
}

.log-title {
  font-size: 1.75rem;
  color: $orange;
  margin: 0 10px 0 0;
}

.changelogtext-wrapper {
  margin: 0;
}

.hidden-issues-wrapper {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
}

.hidden-issues-wrapper.activeIssues {
  max-height: 5000px;
  transition: max-height 1s ease-in-out;
}

.issuesButton {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 2px 4px;
  font-size: .95em;
  cursor: pointer;
}

.issuesButton:focus {
  outline: none;
}

.issuesButtonDownArrow {
  width: 14px;
  margin-right: 5px;
}

.issuesButtonUpArrow {
  width: 14px;
  margin-right: 5px;
  transform: rotate(180deg);
}
</style>
