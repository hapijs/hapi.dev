<a href="http://hapi.dev"><img src="https://raw.githubusercontent.com/hapijs/assets/master/images/family.png" width="180px" align="right" /></a>

# @hapi/hapi.dev

The home of the [hapi.dev](http://hapi.dev) developer portal.

## Running/developing

* First, clone or download the repo and run ```npm install```. 

* Next, you need to make an .env file in the root directory. 

* Obtain a token from Github [here](https://github.com/settings/tokens/new) and select checked scopes only (only two)

  - [ ] **repo**              :   *Full control of private repositories*
    - [x] **repo status**     :   *Access commit status*
    - [ ] **repo_deployment** :   *Access deployment status*
    - [x] **public_repo**     :   *Access public repositories*
    - [ ] **repo:invite**     :   *Access repository invitations*

* Copy your Github token and place it in your .env file by entering:
```GITHUB_TOKEN = "YOUR TOKEN"```

* Run ```npm run dev``` and go to ```http://localhost:3000``` to view the site. The dev server hot loads, which will automatically show your changes without having to restart the server. 

* After you make your changes, simply open a plull request. 

## Add a translation for the tutorials
In the directory `static/lib/tutorials` we have some directories with the name of the languages translated, to add a new translation, simply add a new folder in the `static/lib/tutorials` with your translation.
An Example, if you translate the tutorials, to Brazilian Portuguese, you must use the `pt_BR` as the name of the directory.
Inside the directory `pt_BR`, you need to follow the same struture we use in `en_US`, with all tutorials separated in markdown files and an `index.js` file that's export the tutorials and the titles.
After finish the translations, you also need add your translation in the `index.js` file inside `staic/lib/tutorials`.

## Plugins
hapijs.com maintains a list of community-created plugins [here](http://hapi.dev/plugins). If there are any plugins you have created or one you use often that isn't listed please send a [pull request](https://github.com/hapijs/hapi.dev/blob/master/static/lib/plugins.md). Please note the existing categories, but if your plugin does not fit one feel free to create your own. Please keep the plugins in alphabetical order to be fair to all contributors.
