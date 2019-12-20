import start from "../static/lib/tutorials/en_US/";

export const state = () => ({
  page: start.gettingstarted.default,
  display: "home",
  language: "en_US",
  version: "",
  example: false,
  intro: false,
  usage: false,
  faq: false,
  advanced: false,
  family: "joi",
  modules: [
    "accept",
    "address",
    "ammo",
    "b64",
    "basic",
    "bell",
    "boom",
    "bossy",
    "bounce",
    "bourne",
    "call",
    "catbox",
    "catbox-memcached",
    "catbox-memory",
    "catbox-object",
    "catbox-redis",
    "code",
    "content",
    "cookie",
    "crumb",
    "cryptiles",
    "formula",
    "glue",
    "good",
    "good-console",
    "good-squeeze",
    "h2o2",
    "hawk",
    "hoek",
    "inert",
    "iron",
    "joi",
    "joi-date",
    "lab",
    "mimos",
    "nes",
    "oppsy",
    "pinpoint",
    "podium",
    "rule-capitalize-modules",
    "rule-for-loop",
    "rule-scope-start",
    "scooter",
    "shot",
    "sntp",
    "subtext",
    "topo",
    "vision",
    "wreck",
    "yar"
  ]
});

export const mutations = {
  setPage(state, page) {
    state.page = page;
  },
  setDisplay(state, display) {
    state.display = display;
  },
  setLanguage(state, language) {
    state.language = language;
  },
  setVersion(state, version) {
    state.version = version;
  },
  setExample(state, example) {
    state.example = example;
  },
  setIntro(state, intro) {
    state.intro = intro;
  },
  setUsage(state, usage) {
    state.usage = usage;
  },
  setFaq(state, faq) {
    state.faq = faq;
  },
  setAdvanced(state, advanced) {
    state.advanced = advanced;
  },
  setFamily(state, family) {
    state.family = family;
  }
};

export const getters = {
  loadPage(state) {
    return state.page;
  },
  loadDisplay(state) {
    return state.display;
  },
  loadLanguage(state) {
    return state.language;
  },
  loadVersion(state) {
    return state.version;
  },
  loadModules(state) {
    return state.modules;
  },
  loadExample(state) {
    return state.example;
  },
  loadIntro(state) {
    return state.intro;
  },
  loadUsage(state) {
    return state.usage;
  },
  loadFaq(state) {
    return state.faq;
  },
  loadAdvanced(state) {
    return state.advanced;
  },
  loadFamily(state) {
    return state.family;
  }
};
