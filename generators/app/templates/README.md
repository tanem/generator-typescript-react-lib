# <%= packageName %>

[![npm version][npmv-image]][npmv-url]
[![build status][build-image]][build-url]
[![coverage status][codecov-image]][codecov-url]
[![npm downloads][npmd-image]][npmd-url]

> <%= packageDescription %>

## Basic Usage

```jsx
import React from 'react'
import { render } from 'react-dom'

render(, document.getElementById('root'))
```

## Live Examples

- [Basic Usage](https://codesandbox.io/)
- [API Example](https://codesandbox.io/)
- [UMD Build (Development)](https://codesandbox.io/)
- [UMD Build (Production)](https://codesandbox.io/)

## API

**Props**

- `foo` - Something something.
- `bar` - _Optional_ Something something. Defaults to `null`.

**Example**

```jsx

```

## Installation

```
$ npm install <%= packageName %> --save
```

There are also UMD builds available via [unpkg](https://unpkg.com/):

- https://unpkg.com/<%= packageName %>/dist/<%= packageName %>.umd.development.js
- https://unpkg.com/<%= packageName %>/dist/<%= packageName %>.umd.production.js

For the non-minified development version, make sure you have already included:

- [`React`](https://unpkg.com/react/umd/react.development.js)
- [`ReactDOM`](https://unpkg.com/react-dom/umd/react-dom.development.js)
- [`PropTypes`](https://unpkg.com/prop-types/prop-types.js)

For the minified production version, make sure you have already included:

- [`React`](https://unpkg.com/react/umd/react.production.min.js)
- [`ReactDOM`](https://unpkg.com/react-dom/umd/react-dom.production.min.js)

## License

MIT

[build-image]: https://img.shields.io/github/workflow/status/<%= githubUsername %>/<%= packageName %>/CI?style=flat-square
[build-url]: https://github.com/<%= githubUsername %>/<%= packageName %>/actions?query=workflow%3ACI
[codecov-image]: https://img.shields.io/codecov/c/github/<%= githubUsername %>/<%= packageName %>.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/<%= githubUsername %>/<%= packageName %>
[npmv-image]: https://img.shields.io/npm/v/<%= packageName %>.svg?style=flat-square
[npmv-url]: https://www.npmjs.com/package/<%= packageName %>
[npmd-image]: https://img.shields.io/npm/dm/<%= packageName %>.svg?style=flat-square
[npmd-url]: https://www.npmjs.com/package/<%= packageName %>
