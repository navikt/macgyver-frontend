# macgyver-frontend
Frontend app for [macgyver](https://github.com/navikt/macgyver)

Available at the following addresses:
-   dev-gcp: https://macgyver-frontend.intern.dev.nav.no/
-   prod-gcp: https://macgyver-frontend.intern.nav.no/

## Technologies used
* NEXT.js
* Typescript
* Yarn

#### Requirements
* Node.js
* Yarn

## Getting Started

### install yarn
Yarn can be installed through the npm package manager, with this command: 
```npm install --global yarn```

The following steps need to be in the project directory(the root foler for this app), you can run:

### Install all the dependencies
```bash
yarn
```

### Builds the app for production
```bash
yarn build
```

### Run the app in development mode

```bash
yarn dev
```
Open http://localhost:3000/ to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### Creating a docker image
Creating a docker image should be as simple as `docker build -t macgyver-frontend .`

### Running a docker image
`docker run --rm -it -p 3000:3000 macgyver-frontend`

## FlowChart
This the high level flow of the application

```mermaid
  graph LR;
      azure-ad-sidecar --- macgyver-frontend;
      macgyver-frontend---azure-ad;
      macgyver-frontend---macgyver;
```


## Contact

This project is maintained by navikt/teamsykmelding

Questions and/or feature requests? Please create an [issue](https://github.com/navikt/macgyver-frontend/issues).

If you work in [@navikt](https://github.com/navikt) you can reach us at the Slack
channel [#team-sykmelding](https://nav-it.slack.com/archives/CMA3XV997)