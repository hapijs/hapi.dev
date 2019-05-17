<template>
  <div class="pull-wrapper">
    <a :href=url target="__blank" class="pull-link">#{{number}}</a>
    <div class="pull-description">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: ["url", "title", "number"]
}
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";

.pull-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 8px;
}

.pull-description {
  margin: 0 0 0 10px;
  font-size: .9em;
}

.pull-link {
  padding: 3px 7px;
  margin: 0;
  color: $gray-light;
  background: $green-light;
  font-size: .9em;
}

</style>
