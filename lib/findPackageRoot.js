"use strict";

var fs = require("fs");
var path = require("path");

module.exports = function(dir) {
  while (!fs.existsSync(path.join(dir, "package.json"))) {
    if (dir === "/") {
      throw new Error("Cannot locate project root");
    }
    dir = path.dirname(dir);
  }
  return dir;
};