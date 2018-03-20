"use strict";

var path = require("path");
var fs = require("fs");
var getCallerDir = require("./lib/getCallerDir");

function pquire(pth) {
  // First require relatively
  try {
    return rel(pth);
  } catch (e) {
    // console.log(e);
  /* Ignore error */ }
  
  // Then require absolutely
  try {
    return abs(pth);
  } catch (e) {
    // console.log(e);
  /* Ignore error */ }
  
  // Both failed, time to error
  throw new Error("Cannot find module '" + pth + "'");
}

function abs(pth) {
  var dir = getCallerDir();
  var rootDir = findPackageRoot(dir);
  
  try {
    return require(path.join(rootDir, pth));
  } catch (e) {
    throw new Error("Cannot find module '" + pth + "'");
  }
}
function findPackageRoot(dir) {
  while (!fs.existsSync(path.join(dir, "package.json"))) {
    if (dir === "/") {
      throw new Error("Cannot locate project root");
    }
    dir = path.dirname(dir);
  }
  return dir;
}

function rel(pth) {
  var dir = getCallerDir();
  try {
    return require(path.join(dir, pth));
  } catch (e) {
    throw new Error("Cannot find module '" + pth + "'");
  }
}


// Wrap so getCaller works properly (same depth on all calls)
pquire.abs = function(pth) { return abs(pth); };
pquire.rel = function(pth) { return rel(pth); };

module.exports = pquire;