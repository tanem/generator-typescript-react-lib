# generator-typescript-react-lib

[![npm version][npmv-image]][npmv-url]
[![build status][build-image]][build-url]
[![coverage status][codecov-image]][codecov-url]
[![npm downloads][npmd-image]][npmd-url]

> A [Yeoman](http://yeoman.io) generator for [React](https://reactjs.org) libs written with [Typescript](https://www.typescriptlang.org).

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Background](#background)
- [Features](#features)
- [Installation](#installation)
- [Common Workflows](#common-workflows)
  - [Setup](#setup)
  - [Development](#development)
  - [Testing](#testing)
  - [Publishing](#publishing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Background

To provide a basic starting point when authoring React libraries with Typescript. By design not all use-cases will be handled, so some post-generation modifications may be required.

## Features

- Generates CommonJS, ES module, and Universal Module Definition bundles via [Rollup](https://rollupjs.org).
- Tests bundles via [Jest](https://jestjs.io/).
- Generates Typescript type declarations for publishing.
- Outputs, strips, or wraps [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) declarations according to bundle type.
- Configures continuous integration via [GitHub Actions](https://github.com/features/actions).
- Configures code coverage analysis via [Codecov](https://codecov.io/).
- Configures [Renovate](https://renovatebot.com/) for dependency management.
- Adds scripts for releasing to [npm](https://www.npmjs.com/).
- Makes Universal Module Definition bundles available via [unpkg](https://unpkg.com/).
- Initialises [Git](https://git-scm.com/).

## Installation

First, install Yeoman and generator-typescript-react-lib:

```
$ npm install -g yo generator-typescript-react-lib
```

Then generate your new library:

```
$ mkdir your-new-react-library && cd $_
$ yo typescript-react-lib
```

## Common Workflows

### Setup

1. Create a new GitHub repository.
2. [Install/enable](https://renovatebot.com/docs/install-github-app/) the Renovate GitHub app.
3. Use this generator to create your lib.

### Development

Everything revolves around GitHub PRs:

1. Create a new local branch.
2. Add a remote tracking branch.
3. Make some changes.
4. Push the changes.
5. Open a PR.

It's also recommended to set branch protection rules against the `master` branch by selecting the following:

- `Require status checks to pass before merging`.
- `Require branches to be up to date before merging`.
- `ci`.

### Testing

Running `npm test` will:

- Check code style with Prettier.
- Type check with TypeScript.
- Build the package assets.
- Test the package assets.

### Publishing

Once the PR checks have passed:

1. Merge the PR.
2. Checkout the `master` branch.
3. Ensure `master` is up-to-date.
4. Run `npm release <newversion>`. Refer to the [npm-version](https://docs.npmjs.com/cli/version) docs for information on the `newversion` argument.

The `release` script will:

1. Bump the `package.json` version.
1. Run the test flow.
1. Generate a `CHANGELOG.md` that includes these latest changes.
1. Generate or update the `AUTHORS` file.
1. Make a version commit and tag.
1. Push the commit and tag to GitHub.
1. Publish the package to npm.

## License

MIT

[build-image]: https://img.shields.io/github/workflow/status/tanem/generator-typescript-react-lib/CI?style=flat-square
[build-url]: https://github.com/tanem/generator-typescript-react-lib/actions?query=workflow%3ACI
[codecov-image]: https://img.shields.io/codecov/c/github/tanem/generator-typescript-react-lib.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/tanem/generator-typescript-react-lib
[npmv-image]: https://img.shields.io/npm/v/generator-typescript-react-lib.svg?style=flat-square
[npmv-url]: https://www.npmjs.com/package/generator-typescript-react-lib
[npmd-image]: https://img.shields.io/npm/dm/generator-typescript-react-lib.svg?style=flat-square
[npmd-url]: https://www.npmjs.com/package/generator-typescript-react-lib
