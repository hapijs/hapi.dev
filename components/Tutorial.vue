<template>
  <div v-html="gettingStarted"></div>
</template>

<script>
import gettingStarted from '../static/tutorials/en_US/getting-started.md'
export default {
  computed: {
    gettingStarted() {
      return gettingStarted
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/main.scss";

h1 {
  font-size: 3rem;
}

h2 {
  font-size: 2.5rem;
}

h3 {
  font-size: 2rem;
}

p {
  font-size: 1rem;
  margin: .5rem 0;
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
