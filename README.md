<p align="center"><img width="200px" src="./faker-js-ui-logo.png"></p>

# Faker.js UI

Web App and Browser Extension for [Faker.js](https://fakerjs.dev/).

Now available in [Chrome Webs Store](https://chrome.google.com/webstore/detail/fakerjs-ui/onahjokmphbfmdihclgeehajfnpkpaja)!

The [app website](https://github.com/jofftiquez/fakerjsui.com) is also open for contribution.

## Features in development

- [ ] Auto-fill forms using appropriate Faker.js methods
- [ ] Add prompt for arguments so users can maximize the parameters for each methods
- [ ] Preview of copied/generated data

## Developement

There are 2 modes to develop Faker.js UI:
- **Web App (SPA)**: The Web App is a Quasar Framework and Vue.js 3 that can be run locally and deployed to a static hosting site.
- **Browser Extension**: The Browser Extension is a Quasar Framework and Vue.js 3 that can be run locally and deployed to the Chrome Web Store.

To run the Web App locally:

```bash

# Install dependencies
yarn install

# Run the app
yarn dev:spa # or yarn build:spa to build for production

```

To run the Browser Extension locally:

```bash

# Install dependencies
yarn install

# Run the app
yarn dev:bex # or yarn build:bex to build for production

```
