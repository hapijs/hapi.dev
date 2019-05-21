<template>
  <div class="contribute-wrapper">
    <h2>Contributing to hapi</h2>
    <div class="contribute-content">
      If you're interested in helping
      out, here's a list of currently open issues that would be a great
      place to start. Make sure to read the style guide before you write any code.
    </div>
    <div class="contribute-content">
      Several issues are raised across the hapijs
      organization that are waiting for contributors to show them some love.
      Those are marked with backlog label.
    </div>
    <div class="contribute-issue-wrapper">
      <div class="contribute-new">
        <div class="contribute-header-wrapper">
          <div class="contribute-issue-header-text">hapi open issues</div>
          <a
            href="https://github.com/hapijs/hapi/issues"
            target="__blank"
            class="contribute-issue-header-link"
          >See all</a>
        </div>
        <OpenIssues
          v-for="issue in hapiIssues.slice(0, 5)"
          v-bind:key="issue.id"
          :url="issue.html_url"
          :title="issue.title"
          :number="issue.number"
        />
      </div>
      <div class="contribute-help">
        <div class="contribute-header-wrapper">
          <div class="contribute-issue-header-text">Ecosystem open issues</div>
          <a
            href="https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+user%3Ahapijs+"
            target="__blank"
            class="contribute-issue-header-link"
          >See all</a>
        </div>
        <OpenIssues
          v-for="issue in issues"
          v-bind:key="issue.id"
          :url="issue.html_url"
          :title="issue.title"
          :number="issue.number"
          :repo="issue.repo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OpenIssues from "./OpenIssues.vue";
export default {
  props: ["issues", "hapiIssues"],
  components: {
    OpenIssues
  },
  created() {
    console.log(this.issues[0].url);
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/markdown.scss";

.contribute-wrapper {
  width: 100%;
  padding: 20px 100px 10px 100px;
}

.contribute-content {
  margin-bottom: 20px;
}

.contribute-issue-wrapper {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
}

.contribute-new,
.contribute-help {
  width: 45%;
}

.contribute-new {
  margin-right: 5%;
}

.contribute-help {
  margin-left: 5%;
}

.contribute-header-wrapper {
    display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  font-size: 1.3rem;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 1px solid #ddd;
}

.contribute-issue-header-text {
  margin: 0;
}

.contribute-issue-header-link {
  font-size: 0.8em;
  margin: 0;
}

@media screen and (max-width: 900px) {
  .contribute-wrapper {
    padding: 5px 5px 10px 5px;
  }

  .contribute-issue-wrapper {
    flex-direction: column;
    justify-content: center;
  }

  .contribute-new,
  .contribute-help {
    width: 100%;
    margin: 0;
  }
}
</style>
