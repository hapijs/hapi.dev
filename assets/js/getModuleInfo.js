let axios = require("axios");
let Semver = require("semver");
let Yaml = require("js-yaml");
let fs = require("fs");
let Toc = require("markdown-toc");
require("dotenv").config();

// hard code to avoid github api calls
const apiRepos = [
  "accept",
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
  "eslint-plugin",
  "file",
  "glue",
  "hapi",
  "h2o2",
  "hoek",
  "inert",
  "iron",
  "jwt",
  "lab",
  "mimos",
  "nes",
  "oppsy",
  "podium",
  "scooter",
  "shot",
  "subtext",
  "topo",
  "vision",
  "wreck",
  "yar"
];

// hard code to avoid github api calls
const hapiPlugins = [
  "basic",
  "bell",
  "catbox-redis",
  "cookie",
  "crumb",
  "h2o2",
  "inert",
  "jwt",
  "nes",
  "ratrace",
  "scooter",
  "vision",
  "yar"
];

// exclude these modules
const excludeModules = [
  ".github",
  "assets",
  "beam",
  "ci-config-travis",
  "eslint-config-hapi",
  "good",
  "good-console",
  "good-squeeze",
  "hapi.dev",
  "items",
  "lab-external-module-test",
  "log",
  "ratrace",
  "rule-capitalize-modules",
  "rule-for-loop",
  "rule-no-arrowception",
  "rule-no-var",
  "rule-scope-start",
  "validate"
];

getInfo();

async function getInfo() {
  let repos = {};
  let newRepos = {};
  let hapiRepo = {};
  let intro = "";
  let example = "";
  let usage = "";
  let faq = "";
  let advance = "";
  let finalHtmlDisplay = "";
  let finalMenu = "";
  const options = {
    headers: {
      accept: "application/vnd.github.v3.raw+json",
      authorization: "token " + process.env.GITHUB_TOKEN
    }
  };
  let repositories = await axios.get(
    "https://api.github.com/orgs/hapijs/repos?per_page=100",
    options
  );
  const nodeYaml = await axios.get(
    "https://api.github.com/repos/hapijs/.github/contents/workflow-templates/ci-module.yml",
    options
  );
  let nodeGlobalVersions = Yaml.load(nodeYaml.data).jobs.test.strategy.matrix.node.reverse().filter(e=> e !== "*");
  for (let r = 0; r < repositories.data.length; ++r) {
    if (excludeModules.includes(repositories.data[r].name)) {
      continue;
    }
    finalHtmlDisplay = "";
    finalMenu = "";
    let branches = await axios.get(
      "https://api.github.com/repos/hapijs/" +
        repositories.data[r].name +
        "/branches",
      options
    );
    console.log('Processing repo: ' + repositories.data[r].name);
    branches = branches.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
    repos[repositories.data[r].name] = {
      name: repositories.data[r].name,
      versions: [],
      versionsArray: [],
      api: false
    };
    for (let branch of branches) {
      intro = "";
      example = "";
      usage = "";
      faq = "";
      advance = "";
      // skip commercial branches except for hapi
      if (branch.name.match(/commercial$/g) && repositories.data[r].name != 'hapi') {
        continue;
      }
      // skip hapi master branch for api
      if (branch.name.match(/master$/g) && repositories.data[r].name == 'hapi') {
        continue;
      }
      // due to supporting commercial hapi on the site
      // hard code versions so we can reduce github api calls
      if (branch.name.match(/commercial$/g) && repositories.data[r].name == 'hapi') {
        if (branch.name == "v19-commercial") {
          nodeVersions = ["12", "14"];
        } else if (branch.name == "v18-commercial") {
          nodeVersions = ["8", "10", "12"];
        } else if (branch.name == "v17-commercial") {
          nodeVersions = ["8", "10", "12"];
        } else if (branch.name == "v16-commercial") {
          nodeVersions = ["6", "8", "10", "12"];
        }
      } else {
          nodeVersions = nodeGlobalVersions;
      }
      if (hapiPlugins.includes(repositories.data[r].name)) {
        repos[repositories.data[r].name].isPlugin = true;
      } else {
        repos[repositories.data[r].name].isPlugin = false;
      }
      if (branch.name.match(/^v+[0-9]+|\bmaster\b/g)) {
        const gitHubVersion = await axios.get(
          "https://api.github.com/repos/hapijs/" +
            repositories.data[r].name +
            "/contents/package.json?ref=" +
            branch.name,
          options
        );
        //Get API
        try {
          if (apiRepos.includes(repositories.data[r].name)) {
            const api = await axios.get(
              "https://api.github.com/repos/hapijs/" +
                repositories.data[r].name +
                "/contents/API.md?ref=" +
                branch.name,
              options
            );
            repos[repositories.data[r].name].api = true;
            let rawString = await api.data.toString();

            if (branch.name === "master") {
              let intros = await rawString.match(
                /(?=#.*Intro)([\s\S]*?)(?=\n#)/
              );
              if (intros) {
                rawString = await rawString.replace(
                  /(?=#.*Intro)([\s\S]*?)(?=\n#)/,
                  ""
                );
                intro = intros[0];
              }
              let usages = await rawString.match(
                /(?=#.*Usage)([\s\S]*?)(?=\n#)/
              );
              if (usages) {
                rawString = await rawString.replace(
                  /(?=#.*Usage)([\s\S]*?)(?=\n#)/,
                  ""
                );
                usage = usages[0];
              }
              let advanced = await rawString.match(
                /(?=#.*Advanced\W\W)([\s\S]*?)(?=\n#)/
              );
              if (advanced) {
                rawString = await rawString.replace(
                  /(?=#.*Advanced\W\W)([\s\S]*?)(?=\n#)/,
                  ""
                );
                advance = advanced[0];
              }
              let examples = await rawString.match(
                /(?=#.*Example\s\s)([\s\S]*?)(?=\n#)/
              );
              if (examples && repositories.data[r].name !== "bell") {
                rawString = await rawString.replace(
                  /(?=#.*Example)([\s\S]*?)(?=\n#)/,
                  ""
                );
                example = examples[0];
              }
              rawString = (await rawString) + "#";
              let faqs = await rawString.match(
                /(?=#.*F.A.Q.)([\s\S]*?)(?=\n#)/
              );
              if (faqs) {
                rawString = await rawString.replace(
                  /(?=#.*F.A.Q.)([\s\S]*?)(?=\n#)/,
                  ""
                );
                faq = faqs[0];
              }
            }

            rawString = rawString.substring(0, rawString.length - 1);

            //Auto generate TOC
            let apiTocString = "";
            let apiTocArray = await rawString.match(/\n#.+/g);
            let pattern = "####";

            for (let i = 0; i < apiTocArray.length; ++i) {
              let testPattern = apiTocArray[i].match(/(?=#)(.*)(?=\s)/);
              if (testPattern == null) {
                continue;
              }
              if (testPattern[0].length < pattern.length) {
                pattern = testPattern[0];
              }
             apiTocString = apiTocString + apiTocArray[i];
            }
            finalMenu = Toc(apiTocString, { bullets: "-" }).content;

            //Generate API and Menu HTML
            let finalDisplay = await rawString.replace(/\/>/g, "></a>");
            finalMenu = await finalMenu.replace(/Boom\./g, "");
            finalMenu = await finalMenu.replace(/\(([^#*]+)\)/g, "()");
            const apiHTML = await axios.post(
              "https://api.github.com/markdown",
              {
                text: finalDisplay,
                mode: "markdown"
              },
              {
                headers: {
                  authorization: "token " + process.env.GITHUB_TOKEN
                }
              }
            );
            let apiString = await apiHTML.data.toString();
            // add note that tsc does not support commercial for hapi
            if (branch.name.match(/commercial$/g)) {
              apiString = "\n<span style=color:red><b>**Note**</b><br/>This is a commercial API version and is not officially supported by the TSC.</span>\n" + apiString;
            }
            finalHtmlDisplay = await apiString.replace(/user-content-/g, "");
          }
        } catch (err) {
          console.log(err);
          continue;
        }
        if (repos[repositories.data[r].name].versionsArray.indexOf(gitHubVersion.data.version) === -1) {
          repos[repositories.data[r].name].versionsArray.push(
            gitHubVersion.data.version
          );
          repos[repositories.data[r].name].versions.push({
            name: gitHubVersion.data.version,
            branch: branch.name,
            license: gitHubVersion.data.name.includes("commercial")
              ? "Commercial"
              : "BSD",
            node: nodeVersions.join(", ").replace("node,", "")
          });
          repos[repositories.data[r].name][gitHubVersion.data.version] = {
            menu: finalMenu,
            api: await finalHtmlDisplay,
            intro: intro,
            example: example,
            usage: usage,
            faq: faq,
            advanced: advance,
            license: gitHubVersion.data.name.includes("commercial")
              ? "Commercial"
              : "BSD"
          };
        }
        await repos[repositories.data[r].name].versions.sort(function(a, b) {
          return Semver.compare(b.name, a.name);
        });
      }
    }

    let readme = await axios.get(
      "https://api.github.com/repos/hapijs/" +
        repositories.data[r].name +
        "/contents/README.md",
      options
    );
    let forks = await axios.get(
      "https://api.github.com/repos/hapijs/" + repositories.data[r].name,
      options
    );
    let slogan =
      (await readme.data.match(/####(.*)/gm)) !== null
        ? await readme.data.match(/####(.*)/gm)[0].substring(5)
        : "Description coming soon...";
    let date = await new Date(forks.data.pushed_at);
    (repos[repositories.data[r].name].slogan = await slogan),
      (repos[repositories.data[r].name].forks = await Number(
        forks.data.forks_count
      )),
      (repos[repositories.data[r].name].stars = await Number(
        forks.data.stargazers_count
      )),
      (repos[repositories.data[r].name].date = await forks.data.pushed_at),
      (repos[repositories.data[r].name].updated = await date.toDateString()),
      (repos[repositories.data[r].name].link =
        "https://github.com/hapijs/" + repositories.data[r].name);

    for (let key of Object.keys(repos)) {
      if (repos[key].versions.length > 1) {
        if (
          repos[key].versions[0].name === repos[key].versions[1].name &&
          repos[key].versions[0].license === "Commercial"
        ) {
          let temp = repos[key].versions[0];
          repos[key].versions[0] = repos[key].versions[1];
          repos[key].versions[1] = temp;
        }
      }
    }

    const orderedRepos = {};
    await Object.keys(repos)
      .sort()
      .forEach(function(key) {
        orderedRepos[key] = repos[key];
      });

    hapiRepo = orderedRepos.hapi;

    delete orderedRepos.hapi;

    newRepos = orderedRepos;
  }
  fs.writeFile(
    "./static/lib/moduleInfo.json",
    JSON.stringify(newRepos, null, 2),
    function(err) {
      if (err) throw err;
    }
  );
  fs.writeFile(
    "./static/lib/hapiInfo.json",
    JSON.stringify(hapiRepo, null, 2),
    function(err) {
      if (err) throw err;
    }
  );
}
