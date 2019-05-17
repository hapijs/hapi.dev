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
        <div class="contribute-issue-header">Open issues</div>
      </div>
      <div class="contribute-help">
        <div class="contribute-issue-header">Help wanted</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/markdown.scss";

.contribute-wrapper {
  width: 100%;
  padding: 20px 0 10px 100px;
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

.contribute-new, .contribute-help {
  width: 45%;
}

.contribute-new {
  margin-right: 5%;
}

.contribute-help {
  margin-left: 5%;
}

.contribute-issue-header {
  padding: 15px 0;
  font-size: 1.3rem;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 1px solid #ddd;
}

</style>
