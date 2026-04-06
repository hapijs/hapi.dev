<a href="http://hapi.dev"><img src="https://raw.githubusercontent.com/hapijs/assets/master/images/family.png" width="180px" align="right" /></a>

# @hapi/hapi.dev

The home of the [hapi.dev](http://hapi.dev) developer portal.

Built with [VitePress](https://vitepress.dev), Vue 3, and TypeScript.

## Prerequisites

- [Node.js](https://nodejs.org/) v22+
- [pnpm](https://pnpm.io/)

## Setup

Clone the repo and install dependencies:

```bash
pnpm install
```

Create a `.env` file in the root directory with a GitHub token:

```
GITHUB_TOKEN="YOUR_TOKEN"
```

You can obtain a token from [GitHub Settings](https://github.com/settings/tokens/new). The token needs these scopes:

- [x] **repo:status** — Access commit status
- [x] **public_repo** — Access public repositories

## Development

Fetch module data from GitHub and npm:

```bash
pnpm fetch-data
```

Start the dev server:

```bash
pnpm dev
```

The site will be available at `http://localhost:5173` with hot reload.

## Building

Build the full site (fetch data + static generation):

```bash
pnpm generate
```

Preview the built site:

```bash
pnpm preview
```

## Project structure

```
cli/                  # TypeScript CLI for fetching module data from GitHub/npm
components/           # Vue 3 components
docs/                 # VitePress markdown pages and static assets
  ├── api/            # hapi core API docs (dynamic routes)
  ├── module/         # Module pages (install, API, changelog)
  ├── tutorials/      # Tutorials in 5 languages (en_US, ko_KR, pt_BR, tr_TR, zh_CN)
  ├── policies/       # Policy pages
  ├── resources/      # Resources (changelog, status, books, etc.)
  └── public/         # Static assets (images, plugins.json)
generated/            # Auto-generated data (from pnpm fetch-data)
  ├── metadata/       # modules.json central registry
  ├── modules/        # Per-module info and changelog JSON
  └── markdown/       # Raw API docs, changelogs, policies
.vitepress/           # VitePress config and theme
```

## Tutorials

Tutorials live in `docs/tutorials/{locale}/` with one markdown file per tutorial. Available locales: `en_US`, `ko_KR`, `pt_BR`, `tr_TR`, `zh_CN`.

To add a new translation, create a directory under `docs/tutorials/` with the locale code (e.g. `fr_FR`) and add markdown files matching the English tutorial filenames.

## Plugins

hapi.dev maintains a list of community-created plugins at [hapi.dev/plugins](http://hapi.dev/plugins). The plugin data lives in `docs/public/lib/plugins.json`. To add a plugin, send a [pull request](https://github.com/hapijs/hapi.dev/blob/master/docs/public/lib/plugins.json) with your addition. Please keep plugins in alphabetical order within their category.

## Linting and formatting

```bash
pnpm lint          # Run oxlint
pnpm fmt           # Check formatting with oxfmt
pnpm test          # Run lint + fmt + TypeScript check
```

## Deployment

The site is deployed to [Netlify](https://www.netlify.com). See `netlify.toml` for the build configuration. The build command is `pnpm generate` which fetches data and builds the static site to `dist/`.
