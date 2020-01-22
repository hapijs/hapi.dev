<template>
  <div class="container">
    <PoliciesNav page="commercial" />
    <div class="commercial-wrapper">
      <HTML :display="page" />
    </div>
  </div>
</template>

<script>
import HTML from "~/components/HTML.vue";
import PoliciesNav from "~/components/policies/PoliciesNav.vue";
import page from "../../static/lib/commercialLicense.md";

export default {
  components: {
    HTML,
    PoliciesNav
  },
  data() {
    return {
      page: page
    };
  },
  head() {
    return {
      title: "hapi.dev - Commercial License",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "The hapi code of conduct"
        }
      ]
    };
  },
  async created() {
    await this.$store.commit("setDisplay", "policies");
  },
  methods: {
    changePage(value) {
      this.$data.page = value;
      this.$store.commit("setCommunity", value);
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/markdown.scss";
@import "../../assets/styles/api.scss";

.commercial-wrapper {
  margin: 0;
  width: 100%;
}

.commercial-wrapper h1 {
  font-size: 1.8rem;
  text-align: center;
  font-style: italic;
  font-weight: 700;
}

.commercial-wrapper h2 {
  font-size: 1.6rem;
  text-align: center;
  font-weight: 700;
  border: none;
  margin: 0;
  padding: 10px 0;
}

.commercial-wrapper h3 {
  font-size: 1.3rem;
  font-weight: 700;
  border: none;
}

.commercial-wrapper h4 {
  border: none;
  text-align: center;
  margin: 30px 0 0 0;
  padding: 0;
}

.commercial-wrapper h4 u {
  margin-bottom: 20px;
}

.commercial-wrapper h5 {
  font-size: 1.3rem;
  border: none;
  text-align: center;
  margin-bottom: 30px;
}

ol {
  list-style: decimal;
  margin-left: 20px;
}

li {
  list-style-type: decimal;
}

blockquote {
  margin-left: 20px;
}

@media screen and (max-width: 900px) {
  .commercial-wrapper {
    padding: 0 20px;
  }
}
</style>
