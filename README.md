# generator-typescript-react-lib

[![npm version][npmv-image]][npmv-url]
[![build status][travis-image]][travis-url]
[![coverage status][codecov-image]][codecov-url]
[![npm downloads][npmd-image]][npmd-url]

> A [Yeoman](http://yeoman.io) generator for [React](https://reactjs.org) libs written with [Typescript](https://www.typescriptlang.org).

## Intent

To provide a basic starting point when authoring React libraries with Typescript. By design not all use-cases will be handled, so some post-generation modifications may be required.

## Features

- Generates CommonJS, ES module, and Universal Module Definition bundles via [Rollup](https://rollupjs.org)
- Tests bundles via [Jest](https://jestjs.io/)
- Generates Typescript type declarations for publishing
- Outputs, strips, or wraps [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) declarations according to bundle type
- Configures continuous integration via [Travis](https://travis-ci.org/)
- Configures code coverage analysis via [Codecov](https://codecov.io/)
- Adds scripts for releasing to [npm](https://www.npmjs.com/)
- Makes Universal Module Definition bundles available via [unpkg](Universal Module Definition bundles)
- Initialises [Git](https://git-scm.com/)

## Examples

- [react-svg](https://github.com/tanem/react-svg)

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

## License

MIT

[travis-image]: https://img.shields.io/travis/tanem/generator-typescript-react-lib/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/tanem/generator-typescript-react-lib
[codecov-image]: https://img.shields.io/codecov/c/github/tanem/generator-typescript-react-lib.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/tanem/generator-typescript-react-lib
[npmv-image]: https://img.shields.io/npm/v/generator-typescript-react-lib.svg?style=flat-square
[npmv-url]: https://www.npmjs.com/package/generator-typescript-react-lib
[npmd-image]: https://img.shields.io/npm/dm/generator-typescript-react-lib.svg?style=flat-square
[npmd-url]: https://www.npmjs.com/package/generator-typescript-react-lib
