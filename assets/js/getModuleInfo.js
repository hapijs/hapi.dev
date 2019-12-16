let axios = require("axios")
let Semver = require("semver")
let Yaml = require("js-yaml")
let fs = require("fs")
let Toc = require("markdown-toc")
require("dotenv").config()

const modules = [
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
let finalHtmlDisplay = ""
let finalMenu = ""


getInfo()

async function getInfo() {
  let repos = {}
  let newRepos = {}
  let intro = ""
  let example = ""
  let usage = ""
  let faq = ""
  let advance = ""
  const options = {
    headers: {
      accept: "application/vnd.github.v3.raw+json",
      authorization: "token " + process.env.GITHUB_TOKEN
    }
  }
  let repositories = await axios.get(
    "https://api.github.com/orgs/hapijs/repos?per_page=100",
    options
  )
  for (let r = 0; r < repositories.data.length; ++r) {
    let branches = await axios.get(
      "https://api.github.com/repos/hapijs/" +
        repositories.data[r].name +
        "/branches",
      options
    )
    console.log(repositories.data[r].name)
    if (
      repositories.data[r].name !== "assets" &&
      repositories.data[r].name !== ".github" &&
      repositories.data[r].name !== "hapi.dev"
    ) {

      repos[repositories.data[r].name] = {
        name: repositories.data[r].name,
        versions: [],
        versionsArray: [],
      }
      for (let branch of branches.data) {
        intro = ""
        example = ""
        usage = ""
        faq = ""
        advance = ""
        if (branch.name.match(/^v+[0-9]+|\bmaster\b/g)) {
          const gitHubVersion = await axios.get(
            "https://api.github.com/repos/hapijs/" +
              repositories.data[r].name +
              "/contents/package.json?ref=" +
              branch.name,
            options
          )
          const nodeYaml = await axios.get(
            "https://api.github.com/repos/hapijs/" +
              repositories.data[r].name +
              "/contents/.travis.yml?ref=" +
              branch.name,
            options
          )

          //Get API
          try {
            if (modules.includes(repositories.data[r].name)) {
              const api = await axios.get(
                "https://api.github.com/repos/hapijs/" +
                  repositories.data[r].name +
                  "/contents/API.md?ref=" +
                  branch.name,
                options
              )
              let rawString = await api.data.toString()
              
              if (branch.name === "master") {
                let intros = await rawString.match(/(?=#.*Intro)([\s\S]*?)(?=\n#)/)
                if (intros) {
                  rawString = await rawString.replace(/(?=#.*Intro)([\s\S]*?)(?=\n#)/, "")
                  intro = intros[0]
                }
                let usages = await rawString.match(/(?=#.*Usage)([\s\S]*?)(?=\n#)/)
                if (usages) {
                  rawString = await rawString.replace(/(?=#.*Usage)([\s\S]*?)(?=\n#)/, "")
                  usage = usages[0]
                }
                let advanced = await rawString.match(/(?=#.*Advanced\W\W)([\s\S]*?)(?=\n#)/)
                if (advanced) {
                  rawString = await rawString.replace(/(?=#.*Advanced\W\W)([\s\S]*?)(?=\n#)/, "")
                  advance = advanced[0]
                }
                let examples = await rawString.match(/(?=#.*Example)([\s\S]*?)(?=\n#)/)
                if (examples) {
                  rawString = await rawString.replace(/(?=#.*Example)([\s\S]*?)(?=\n#)/, "")
                  example = examples[0]
                }
                rawString = await rawString + "#"
                let faqs = await rawString.match(/(?=#.*F.A.Q.)([\s\S]*?)(?=\n#)/)
                if (faqs) {
                  rawString = await rawString.replace(/(?=#.*F.A.Q.)([\s\S]*?)(?=\n#)/, "")
                  faq = faqs[0]
                }
              }

              rawString = rawString.substring(0, rawString.length - 1)

              //Auto generate TOC
              let apiTocString = ""
              let apiTocArray = await rawString.match(/\n#.+/g)
              let pattern = "####"

              for (let i = 0; i < apiTocArray.length; ++i) {
                let testPattern = apiTocArray[i].match(/(?=#)(.*)(?=\s)/)
                if (testPattern[0].length < pattern.length) {
                  pattern = testPattern[0]
                }
                apiTocString = apiTocString + apiTocArray[i]
              }
              finalMenu = Toc(apiTocString, { bullets: "-" }).content

              //Generate API and Menu HTML
              let finalDisplay = await rawString.replace(/\/>/g, "></a>")
              finalMenu = await finalMenu.replace(/Boom\./g, "")
              finalMenu = await finalMenu.replace(/\(([^#*]+)\)/g, "()")
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
              )
              let apiString = await apiHTML.data.toString()
              finalHtmlDisplay = await apiString.replace(/user-content-/g, "")
            }
          } catch (err) {
            continue
          }

          let nodeVersions = Yaml.safeLoad(nodeYaml.data).node_js.reverse()
          console.log(repositories.data[r].name, repos[repositories.data[r].name].versions)
          if (
            !repos[repositories.data[r].name].versions.some(
              v =>
                v.branch === "master" && v.name === gitHubVersion.data.version
            ) ||
            gitHubVersion.data.name.includes("commercial")
          ) 
          {
            repos[repositories.data[r].name].versionsArray.push(
              gitHubVersion.data.version
            )
            repos[repositories.data[r].name].versions.push({
              name: gitHubVersion.data.version,
              branch: branch.name,
              license: gitHubVersion.data.name.includes("commercial")
                ? "Commercial"
                : "BSD",
              node: nodeVersions.join(", ").replace("node,", "")
            })
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
            }
          }
          await repos[repositories.data[r].name].versions.sort(function(a, b) {
            return Semver.compare(b.name, a.name)
          })
        }
      }
    }

    if (modules.includes(repositories.data[r].name)) {
      let readme = await axios.get(
        "https://api.github.com/repos/hapijs/" +
          repositories.data[r].name +
          "/contents/README.md",
        options
      )
      let forks = await axios.get(
        "https://api.github.com/repos/hapijs/" + repositories.data[r].name,
        options
      )
      let slogan =
        (await readme.data.match(/####(.*)/gm)) !== null
          ? await readme.data.match(/####(.*)/gm)[0].substring(5)
          : "Description coming soon..."
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
          "https://github.com/hapijs/" + repositories.data[r].name)

      for (let key of Object.keys(repos)) {
        if (repos[key].versions.length > 1) {
          if (
            repos[key].versions[0].name === repos[key].versions[1].name &&
            repos[key].versions[0].license === "Commercial"
          ) {
            let temp = repos[key].versions[0]
            repos[key].versions[0] = repos[key].versions[1]
            repos[key].versions[1] = temp
          }
        }
      }
    }

    const orderedRepos = {}
    await Object.keys(repos)
      .sort()
      .forEach(function(key) {
        orderedRepos[key] = repos[key]
      })

    let hapi = orderedRepos.hapi

    delete orderedRepos.hapi

    newRepos = await Object.assign({ hapi }, orderedRepos)
  }
  await fs.writeFile(
    "./static/lib/moduleInfo.json",
    JSON.stringify(newRepos),
    function(err) {
      if (err) throw err
    }
  )
}
