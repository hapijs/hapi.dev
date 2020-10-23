<a href="http://hapi.dev"><img src="https://raw.githubusercontent.com/hapijs/assets/master/images/family.png" width="180px" align="right" /></a>

# @hapi/hapi.dev deployment process

This documentation is aimed for maintainers of the website to deploy a new version. The site is hosted on [Netlify](https://www.netlify.com/).
 
## Testing the release

Prior to deploying the new website version it is best to test it on your local machine. You need to:

1. Make the changes you need to the codebase.
2. Run `npm run generate` which will build the static dist folder.
3. Run `npm run static` to view the website with the static dist folder you generated on the previous step.

At this point if everything looks good and you don't notice any regression, you can proceed to the next step.

## Deploying

You need to go [Netlify's login page](https://app.netlify.com/). Once logged in make sure you are on the hapi team account and not your personal one:
<div align="center"><img src="https://user-images.githubusercontent.com/583657/96974202-30154c80-1519-11eb-8247-684b3f6bfc98.png" alt="hapi team account switch" /></div>

Pick the **hapi.dev** from the list of sites available either from the dashboard or the "sites" tab:
<div align="center"><img src="https://user-images.githubusercontent.com/583657/96975430-b67e5e00-151a-11eb-8dda-50d613b741cd.png" alt="hapi site select" /></div>

Active the automatic builds for that site:
<div align="center"><img src="https://user-images.githubusercontent.com/583657/96975661-0a894280-151b-11eb-9813-55e88c275e7e.png" alt="enable hapi.dev automatic build button" /></div>

We don't keep the automatic build enabled so we don't build the website on every commit push to the repo. This is intended to decrease the build minutes consumption on our account otherwise 💸.

Trigger a deployment:
<div align="center"><img src="https://user-images.githubusercontent.com/583657/96976143-c2b6eb00-151b-11eb-9e03-807409c49e23.png" alt="trigger hapi.dev deployment link" /></div>

After the deployment process is done, you can preview the result to make sure everything's working fine from the deployment details page:
<div align="center"><img src="https://user-images.githubusercontent.com/583657/96976509-3d800600-151c-11eb-8683-14aadaf12c64.png" alt="hapi.dev deployment preview button" /></div>

If the deployment is ready to be published you can just click the "publish deploy" button:
<div align="center"><img src="https://user-images.githubusercontent.com/583657/96976858-9ea7d980-151c-11eb-9c42-b5331bab8292.png" alt="hapi.dev publish deploy button" /></div>

The new version of the website is now live. Congrats! 🎉🎊

Just one more step and you're good to go, we need to disable the automatic builds once we're done publishing. For that you need to go the "site settings" page either from the top tab or the dashboard:
<div align="center"><img src="https://user-images.githubusercontent.com/583657/96977314-3279a580-151d-11eb-82ec-32613dac91af.png" alt="hapi.dev site settings section for automatic builds" /></div>

Just click that "Stop builds" radio button and hit save:
<div align="center"><img src="https://user-images.githubusercontent.com/583657/96977528-7ff61280-151d-11eb-8eab-3afd5c493ca4.png" alt="hapi.dev site setting to disable automatic builds" /></div>

Good job!

