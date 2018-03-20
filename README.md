require_local
============

A simple module for better local requiring


## Installation

```
npm i -S require_local
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


## Documentation

| Function             | Description                                                                                                             |
|----------------------|-------------------------------------------------------------------------------------------------------------------------|
| `pquire(<path>)`     | First tries to require relative to the current file, then, if that fails, requires relative to the package root.        |
| `pquire.abs(<path>)` | Forces the require path to be relative to the root of the project. This is the same as running `require(./<path>)`      |
| `pquire.rel(<path>)` | Forces the require path to be relative to the path of the current file. This is the same as running `require(./<path>)` |