# <%= packageName %>

[![build status](https://img.shields.io/travis/<%= username %>/<%= packageName %>/master.svg?style=flat-square)](https://travis-ci.org/<%= username %>/<%= packageName %>)
[![coverage status](https://img.shields.io/codecov/c/github/<%= username %>/<%= packageName %>.svg?style=flat-square)](https://codecov.io/gh/<%= username %>/<%= packageName %>)
[![npm version](https://img.shields.io/npm/v/<%= packageName %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= packageName %>)
[![npm downloads](https://img.shields.io/npm/dm/<%= packageName %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= packageName %>)
[![gzip size](https://img.badgesize.io/https://unpkg.com/<%= packageName %>/umd/<%= packageName %>.production.min.js?compression=gzip&label=gzip%20size&style=flat-square)](https://unpkg.com/<%= packageName %>/umd/)

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

- https://unpkg.com/<%= packageName %>/umd/<%= packageName %>.development.js
- https://unpkg.com/<%= packageName %>/umd/<%= packageName %>.production.min.js

For the non-minified development version, make sure you have already included:

- [`React`](https://unpkg.com/react/umd/react.development.js)
- [`ReactDOM`](https://unpkg.com/react-dom/umd/react-dom.development.js)
- [`PropTypes`](https://unpkg.com/prop-types/prop-types.js)

For the minified production version, make sure you have already included:

- [`React`](https://unpkg.com/react/umd/react.production.min.js)
- [`ReactDOM`](https://unpkg.com/react-dom/umd/react-dom.production.min.js)

## License

MIT
