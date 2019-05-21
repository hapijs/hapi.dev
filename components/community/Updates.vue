<template>
  <div class="update-wrapper">
    <h2>Updates</h2>
    <div class="update-data">
      During the last week, we've closed
      <span
        class="bold"
      >{{!issues ? "0" : issues.length}} issue{{issues.length === 1 ? "" : "s"}}</span>, merged
      <span
        class="bold"
      >{{!pullRequests === null ? "0" : pullRequests.length}} pull request{{pullRequests.length === 1 ? "" : "s"}}</span> and pushed
      <span
        class="bold"
      >{{!commits === null ? "0" : commits.length}} commit{{commits.length === 1 ? "" : "s"}}</span> to the master branch.
    </div>
    <div class="update-description">
      If you want information about modules releases in the ecosystem other than
      the core hapi module, you can look into issues in their respective repositories.
      They are labelled with
      <span
        class="bold"
      >release notes</span> or
      <span class="bold">breaking changes</span> for major releases, otherwise
      for the minor releases check the issues
      <span
        class="bold"
      >milestones</span>.
    </div>
    <div class="update-issue-wrapper">
      <div class="update-pull-requests">
        <div class="update-issue-header">
          <div class="update-issue-header-text">Merged pull requests</div>
          <a
            href="https://github.com/hapijs/hapi/pulls"
            target="__blank"
            class="update-issue-header-link"
          >See all</a>
        </div>
        <PullRequests
          v-for="pull in pullRequests.slice(0, 5)"
          v-bind:key="pull.number"
          :url="pull.html_url"
          :title="pull.title"
          :number="pull.number"
        />
      </div>
      <div class="update-closed-issues">
        <div class="update-issue-header">
          <div class="update-issue-header-text">Closed issues</div>
          <a
            href="https://github.com/hapijs/hapi/issues?q=is%3Aopen"
            target="__blank"
            class="update-issue-header-link"
          >See all</a>
        </div>
        <PullRequests
          v-for="pull in issues.slice(0, 5)"
          v-bind:key="pull.number"
          :url="pull.html_url"
          :title="pull.title"
          :number="pull.number"
        />
      </div>
    </div>
    <div class="changelog-wrapper">
      <h3 class="changelog-header">Changelog</h3>
      <Changelog
        v-for="change in milestones"
        v-bind:key="change.id"
        :version="change.milestone.title"
        :versionUrl="change.milestone.html_url"
        :issueNumber="change.number"
        :issueText="change.title"
        :issueUrl="change.html_url"
      />
    </div>
  </div>
</template>

<script>
import PullRequests from "./PullRequests.vue";
import Changelog from "./ChangeLog.vue";
export default {
  components: {
    PullRequests,
    Changelog
  },
  props: ["issues", "pullRequests", "commits", "milestones"]
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/markdown.scss";

.update-wrapper {
  width: 100%;
  padding: 20px 100px 10px 100px;
}

.update-description {
  margin-top: 20px;
}

.bold {
  font-weight: 700;
}

.update-issue-wrapper {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
}

.update-pull-requests,
.update-closed-issues {
  width: 45%;
}

.update-pull-requests {
  margin-right: 5%;
}

.update-closed-issues {
  margin-left: 5%;
}

.update-issue-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  font-size: 1.3rem;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 1px solid #ddd;
}

.update-issue-header-text {
  margin: 0;
}

.update-issue-header-link {
  font-size: 0.8em;
  margin: 0;
}

.changelog-header {
  margin: 20px 0 10px 0;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.changelog-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

@media screen and (max-width: 900px) {
  .update-wrapper {
    padding: 5px 5px 10px 5px;
  }

  .update-issue-wrapper {
    flex-direction: column;
    justify-content: center;
  }

  .update-pull-requests,
  .update-closed-issues {
    width: 100%;
    margin: 0;
  }
}
</style>