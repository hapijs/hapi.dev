<template>
  <div class="update-wrapper">
    <h2>Updates</h2>
    <div class="update-data">
      During the last week, we've closed
      <span class="bold">{{closedIssues}} issues</span>, merged
      <span class="bold">{{pull}} pull request</span> and pushed
      <span class="bold">{{pushedCommits}} commits</span> to the master branch.
    </div>
    <div class="update-description">
      If you want information about modules releases in the ecosystem other than 
      the core hapi module, you can look into issues in their respective repositories. 
      They are labelled with <span class="bold">release notes</span> or <span class="bold">breaking changes</span> for major releases, otherwise 
      for the minor releases check the issues <span class="bold">milestones</span>.
    </div>
    <div class="update-issue-wrapper">
      <div class="update-pull-requests">
        <div class="update-issue-header">Merged pull requests</div>
      </div>
      <div class="update-closed-issues">
        <div class="update-issue-header">Merged pull requests</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["closedIssues", "pullRequests", "pushedCommits"],
  data() {
    return {
      pull: this.$props.pullRequests
    };
  },
  computed: {
    pullLength(){
      return this.$props.pullRequests.length
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/markdown.scss";

.update-wrapper {
  width: 100%;
  padding: 20px 0 10px 100px;
}

.update-description {
  margin-top: 20px;
}

.bold {
  font-weight: 700
}

.update-issue-wrapper {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
}

.update-pull-requests, .update-closed-issues {
  width: 45%;
}

.update-pull-requests {
  margin-right: 5%;
}

.update-closed-issues {
  margin-left: 5%;
}

.update-issue-header {
  padding: 15px 0;
  font-size: 1.3rem;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 1px solid #ddd;
}
</style>