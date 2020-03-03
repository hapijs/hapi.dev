<template>
  <div class="ads-wrapper">
    <div v-if="loadAd">
      <script
        async
        type="text/javascript"
        src="//cdn.carbonads.com/carbon.js?serve=CE7DK5QL&placement=hapidev"
        id="_carbonads_js"
      ></script>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadAd: false
    };
  },
  async mounted() {
    this.loadAd = true;
  }
};
</script>

<style lang="scss">
@import "../assets/styles/variables.scss";

#carbonads {
  font-family: "Lato", sans-serif;
}

#carbonads {
  display: flex;
  max-width: 330px;
  background-color: hsl(0, 0%, 98%);
  border: 1px solid $dark-white;
}

#carbonads a {
  color: inherit;
  text-decoration: none;
}

#carbonads a:hover {
  color: inherit;
}

#carbonads span {
  position: relative;
  display: block;
  overflow: hidden;
}

#carbonads .carbon-wrap {
  display: flex;
}

.carbon-img {
  display: block;
  margin: 0;
  line-height: 1;
}

.carbon-img img {
  display: block;
}

.carbon-text {
  font-size: 13px;
  padding: 10px;
  line-height: 1.5;
  text-align: left;
}

.carbon-poweredby {
  display: block;
  padding: 8px 10px;
  background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 5px,
      hsla(0, 0%, 0%, 0.025) 5px,
      hsla(0, 0%, 0%, 0.025) 10px
    )
    hsla(203, 11%, 95%, 0.4);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  font-size: 9px;
  line-height: 1;
}
</style>
