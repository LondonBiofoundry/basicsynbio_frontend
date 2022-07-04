# basicsynbio Frontend

This repository is hosted at: https://basicsynbio.web.app

A frontend webapp for the python package basicsynbio built with react.js

## UnitTests

This repository uses unittest using the [Jest](https://jestjs.io) and [Enzyme](https://www.npmjs.com/package/enzyme) packages

![UnitTests](https://github.com/LondonBiofoundry/basicsynbio_frontend/workflows/UnitTests/badge.svg)

The unit tests themselves are stored within the `src/__tests__` folder and can be tested with the following command:

```bash
$ yarn run test
```

## Code Formatting

This repository uses [prettier](https://prettier.io) code formatting.

![CodeFormat](https://github.com/LondonBiofoundry/basicsynbio_frontend/workflows/CodeFormat/badge.svg)

To check if you code is prettier compliant run:

```bash
$ yarn prettier --check .
```

To allow prettier to rewrite your code to be prettier compliant run:

```bash
$ yarn prettier --write .
```

# Installation

Clone our repositry

```bash
$ git clone https://github.com/LondonBiofoundry/basicsynbio_frontend.git
```

Change directory into the cloned folder

```bash
$ cd basicsynbio_frontend
```

Install frontend dependencies located in package.json

```bash
$ yarn install
```

Start app in Development mode

```bash
$ yarn start
```

This causes the frontend to run locally to view it, Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
