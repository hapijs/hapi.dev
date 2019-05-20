<template>
  <div class="pull-wrapper">
    <a :href=url target="__blank" class="open-link">#{{number}}</a>
    <div class="open-description"><span class="bold">{{repo ? "(" + repo + ")" : ""}}</span> {{title}}</div>
  </div>
</template>

<script>
export default {
  props: ["url", "title", "number", "repo"]
}
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";

.pull-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 8px 0 20px 0;
}

.open-description {
  font-size: .9em;
  margin: 0;
}

.open-link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 0;
  color: $gray;
  background: #ffbc6c;
  font-size: .9em;
  min-width: 57px;
  max-width: 57px;
  margin: 0 10px 0 0;
}

</style>