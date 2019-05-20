<template>
  <div class="page-wrapper">
    <div class="quality-upper-wrapper">
      <h2 class="quality-heading">Recognized for Industry Leading Quality Standards</h2>
      <div class="quality-content">
        hapi has been
        <span class="bold">pushing the envelope</span> on quality from day one. It was the first node framework to
        require and achieve 100% code coverage across every dependency – when everyone thought it was
        crazy.
      </div>
    </div>
    <div class="quality-middle-wrapper">
      <div class="quality-content">
        When quality and performance are in conflict, most frameworks choose wrongly and sacrifice
        quality for performance.
        <span class="bold">It might save them a millisecond, but it will cost you days</span>. hapi always
        chooses readability. Machines keep getting faster and cheaper. Humans only get slower and more
        expensive.
      </div>
    </div>
    <div class="quality-lower-wrapper">
      <div class="quality-content">
        On practically every measurable quality metric,
        <span class="bold">hapi scores at the very top</span>:
      </div>
      <ul class="quality-list">
        <li class="content-list">
          <span class="bold">Code Readability</span> — if you cannot open the source code of your framework and understand how it
          works, sooner or later you are going to be in trouble.
        </li>
        <li class="content-list">
          <span class="bold">Coverage and Style</span> — 100% code coverage using strict coverage rules and a coding style optimized
          to reduce bugs and increase comprehension – always end-to-end.
        </li>
        <li class="content-list">
          <span class="bold">Open Issues</span> — hapi and its official plugins are actively kept with only a handful of open issues or pull
          requests. Few other ecosystems can claim this low level of outstanding issues end-to-end across
          every single dependency.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  layout: "noSide",
  head() {
    return {
      title: "Quality"
    };
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/markdown.scss";

.quality-middle-wrapper {
  margin: 30px 0;
}

.quality-heading {
  text-align: center;
}
</style>