<template lang="md">
  <div class="markdown-wrapper" v-html="page"></div>
</template>

<script>
import page from '../static/tutorials/en_US/auth.md';

export default {
    computed: {
      page() {
        return page
      }
    }
};

</script>

<style lang="scss">
@import "../assets/styles/main.scss";

.markdown-wrapper {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 20px 0 20px 100px;
}

.markdown-iframe {
  width: 100%;
  height: 100vh;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.75rem;
}

h2 a,
h3 a {
  color: $black;
  cursor: auto;
}

h3 {
  font-size: 2rem;
}

.tutorial-markdown-window section {
  height: 100%;
}

a {
  cursor: pointer;
  color: $orange;
  text-decoration: none;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  color: $black;
}

p code {
  font-family: "inconsolata", menlo, consolas, monospace;
  padding: 0.2rem 0.33rem;
  color: #6f6f6f;
  background-color: #f3f3f3;
}

li {
  margin: 0 0 20px 0;
  list-style-type: disc;
}

ul {
  margin: 15px 0 15px 20px;
  padding: 0;
}

li {
  border-color: $gray-lighter = rgb(215, 215, 215);

  li {
    border-color: $gray-lighter = rgb(155, 155, 155);

    li {
      border-color: $gray-lighter;

      li {
        border-color: $gray-dark;

        li {
          border-color: $gray-lighter;
        }
      }
    }
  }
}
</style>
