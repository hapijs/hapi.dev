<template>
  <div class="tutorial-nav-window">
    <div class="tutorial-lang-wrapper">
      <div class="tutorial-lang-text">Languages:</div>
      <select class="tutorial-lang-select">
        <option value="en_US">en_US</option>
        <option value="pt_BR">pt_BR</option>
        <option value="ko_KR">ko_KR</option>
        <option value="tr_TR">en_US</option>
        <option value="zh_CN">zh_CN</option>
      </select>
    </div>
    <div class="tutorial-select-wrapper">
      <ul class="tutorial-select-list">
        <li class="tutorial-select-link">Getting Started</li>
        <li class="tutorial-select-link">Authentication</li>
        <li class="tutorial-select-link">Caching</li>
        <li class="tutorial-select-link">Cookies</li>
        <li class="tutorial-select-link">Logging</li>
        <li class="tutorial-select-link">Plugins</li>
        <li class="tutorial-select-link">Routing</li>
        <li class="tutorial-select-link">Server Methods</li>
        <li class="tutorial-select-link">Serving Static Content</li>
        <li class="tutorial-select-link">Testing</li>
        <li class="tutorial-select-link">Validation</li>
        <li class="tutorial-select-link">Views</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";

.tutorial-nav-window {
  position: sticky;
  top: 96px;
  width: 20%;
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: auto;
  padding: 20px 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.tutorial-lang-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  width: 100%;
}

.tutorial-lang-text {
  margin: 0 20px 0 0;
  font-size: 1.1em;
}

.tutorial-select-wrapper {
  margin-top: 50px;
  font-weight: 700;
  font-size: 1.1em;
  color: $orange;
  line-height: 30px;
  width: 100%;
}

.tutorial-select-list {
  margin: 0;
}

.tutorial-select-link {
  cursor: pointer;
  margin: 0;
  list-style-type: none;
}

.tutorial-select-link:hover {
  color: $orange;
  text-decoration: underline;
}

</style>
