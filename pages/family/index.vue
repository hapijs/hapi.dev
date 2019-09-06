<template>
  <div></div>
</template>

<script>
export default {
  head() {
    return {
      title: "hapi.js - " + this.$route.params.family,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "View the APIs for the hapi modules"
        }
      ]
    };
  },
  beforeMount() {
    window.location.href = "/family/bell";
  }
};
</script>

<style lang="scss">
</style>