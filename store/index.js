const start = require("../static/lib/tutorials/en_US");

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
  schema:
    "//Insert your joi schema here \n" +
    "Joi.object({\n" +
    "  username: Joi.string().alphanum().min(3).max(30).required(),\n" +
    "  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),\n" +
    '  repeat_password: Joi.ref("password"),\n' +
    "  access_token: [Joi.string(), Joi.number()],\n" +
    "  birth_year: Joi.number().integer().min(1900).max(2013),\n" +
    '  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } )\n' +
    "}).with('username', 'birth_year').xor('password', 'access_token').with('password', 'repeat_password')",
  validate:
    "//Insert data to validate here \n" +
    "{ \n" +
    ' username: "abc",\n' +
    ' password: "password",\n' +
    ' repeat_password: "password",\n' +
    " birth_year: 1994\n" +
    "}",
  modules: [
    "accept",
    "ammo",
    "b64",
    "basic",
    "beam",
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
    "eslint-config-hapi",
    "eslint-plugin-hapi",
    "file",
    "glue",
    "good",
    "good-console",
    "good-squeeze",
    "h2o2",
    "heavy",
    "hoek",
    "inert",
    "iron",
    "items",
    "jwt",
    "lab",
    "lab-external-module-test",
    "mimos",
    "nes",
    "nigel",
    "oppsy",
    "pez",
    "podium",
    "ratrace",
    "rule-capitalize-modules",
    "rule-for-loop",
    "rule-no-arrowception",
    "rule-no-var",
    "rule-scope-start",
    "scooter",
    "shot",
    "somever",
    "statehood",
    "subtext",
    "teamwork",
    "topo",
    "vise",
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
  },
  setSchema(state, schema) {
    state.schema = schema;
  },
  setValidate(state, validate) {
    state.validate = validate;
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
  },
  loadSchema(state) {
    return state.schema;
  },
  loadValidate(state) {
    return state.validate;
  }
};
