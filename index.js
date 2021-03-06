"use strict";

// Global imports
var path          = require("path");
var getCallerInfo = require("./lib/getCallerInfo");
// Local imports
var findPackageRoot = require("./lib/findPackageRoot");
var ensureType      = require("./lib/ensureType");
var pquire          = require("./lib/pquire");

var shared = pquire();

shared.withBaseRelative = function(pth) {
  ensureType(pth, "string");
  var callDir = getCallerInfo(1).dir;
  return pquire(path.join(callDir, pth));
};

shared.withBaseAbsolute = function(pth) {
  ensureType(pth, "string");
  var callDir = getCallerInfo(1).dir;
  var pkgRt = findPackageRoot(callDir);
  return pquire(path.join(pkgRt, pth));
};

module.exports = shared;