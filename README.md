pquire
======

[![npm version](https://img.shields.io/npm/v/pquire.svg?style=flat-square)](https://www.npmjs.com/package/pquire)
[![npm total downloads](https://img.shields.io/npm/dt/pquire.svg?style=flat-square)](https://www.npmjs.com/package/pquire)
[![npm monthly downloads](https://img.shields.io/npm/dm/pquire.svg?style=flat-square)](https://www.npmjs.com/package/pquire)
[![License](https://img.shields.io/npm/l/pquire.svg?style=flat-square)](http://opensource.org/licenses/ISC)  
[![Build status](https://img.shields.io/travis/thislooksfun/pquire/master.svg?style=flat-square)](https://travis-ci.org/thislooksfun/pquire)
[![Coveralls](https://img.shields.io/coveralls/github/thislooksfun/pquire.svg?style=flat-square)](https://coveralls.io/github/thislooksfun/pquire?branch=master)  
[![Dependency status](https://img.shields.io/david/thislooksfun/pquire.svg?style=flat-square)](https://david-dm.org/thislooksfun/pquire)
[![DevDependency status](https://img.shields.io/david/dev/thislooksfun/pquire.svg?style=flat-square)](https://david-dm.org/thislooksfun/pquire#info=devDependencies)


A simple module for better local requiring


## Installation

```
npm i -S pquire
```


## Typical Usage

File structure:
```
<root>
  ┣╸lib
  ┃  ┣╸settings.js
  ┃  ┗╸util.js
  ┣╸src
  ┃  ┣╸module1.js
  ┃  ┣╸duplicate.js
  ┃  ┗╸mod2.js
  ┣╸duplicate.js
  ┗╸index.js
```


## Documentation

| Function             | Description                                                                                                             |
|----------------------|-------------------------------------------------------------------------------------------------------------------------|
| `pquire(<path>)`     | First tries to require relative to the current file, then, if that fails, requires relative to the package root.        |
| `pquire.abs(<path>)` | Forces the require path to be relative to the root of the project.                                                      |
| `pquire.rel(<path>)` | Forces the require path to be relative to the path of the current file. This is the same as running `require(./<path>)` |
| `pquire.withBaseRelative(<path>)` | Creates a new pquire instance that uses `<path>` as its absolute base instead of getting it dynamically. This differs from `withBaseAbsolute` in that it interprets `<path>` relative to the current file. |
| `pquire.withBaseAbsolute(<path>)` | Creates a new pquire instance that uses `<path>` as its absolute base instead of getting it dynamically. This differs from `withBaseRelative` in that it interprets `<path>` relative to the project root. |


## Examples

File structure:
```
<root>
  ┣╸lib
  ┃  ┣╸settings.js
  ┃  ┗╸util.js
  ┣╸src
  ┃  ┣╸module1.js
  ┃  ┣╸duplicate.js
  ┃  ┗╸mod2.js
  ┣╸duplicate.js
  ┗╸index.js
```

### Typical usage:
`<root>/src/module1.js:`
```javascript
const pquire = require("pquire");

// Smart
const util = pquire("lib/util");      // <root>/lib/util.js
const dup1 = pquire("duplicate");     // <root>/src/duplicate.js
// Explicit
const mod2 = pquire.rel("mod2");      // <root>/src/mod2.js
const dup2 = pquire.abs("duplicate"); // <root>/duplicate.js
```

### Advanced usage: global
`<root>/index.js:`
```javascript
// ...
global.pquire = require("pquire");
// ...
```

`<root>/lib/util.js:`
```javascript
// No need to require pquire in this file.
const settings = pquire("settings"); // <root>/lib/settings.js
// ...
```

### Advanced usage: withBaseRelative
```
<root>
  ┗╸src
     ┣╸util
     ┃  ┗╸settings.js
     ┣╸sub
     ┃  ┗╸module1.js
     ┣╸mod2.js
     ┗╸index.js
```

`<root>/src/index.js:`
```javascript
// ...
// Set the base path to '<root>/src'
global.pquire = require("pquire").withBaseRelative("./");
// ...
```

`<root>/src/sub/module1.js:`
```javascript
// No need to require pquire in this file.
const settings = pquire("util/settings"); // <root>/src/util/settings.js
// ...
```