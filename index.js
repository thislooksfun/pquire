"use strict";

var path = require("path");
var fs = require("fs");
var getCallerInfo = require("./lib/getCallerInfo");
var findPackageRoot = require("./lib/findPackageRoot");

function pquire(pth) {
  var info = getCallerInfo(1);
  var exactPath = path.join(info.dir, pth);
  var jsPath = path.join(info.dir, pth + ".js");
  if (fs.existsSync(exactPath) || fs.existsSync(jsPath)) {
    return rel(pth, info);
  } else {
    return abs(pth, info);
  }
}

function abs(pth, inf) {
  var info = inf || getCallerInfo(2);
  var rootDir = findPackageRoot(info.dir);
  
  var relToRoot = path.relative(info.dir, rootDir);
  return require.cache[info.file].require("./" + path.join(relToRoot, pth));
}

function rel(pth, inf) {
  var info = inf || getCallerInfo(2);
  return require.cache[info.file].require("./" + path.normalize(pth));
}


// Wrap so getCaller works properly (same depth on all calls)
pquire.abs = function(pth) { return abs(pth); };
pquire.rel = function(pth) { return rel(pth); };

module.exports = pquire;