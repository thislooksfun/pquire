"use strict";

// Global imports
var path = require("path");
var fs   = require("fs");
// Local imports
var getCallerInfo   = require("./getCallerInfo");
var findPackageRoot = require("./findPackageRoot");


function pquire_make(root_pth) {
  
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
    var rootDir = root_pth || findPackageRoot(info.dir);
    
    var relToRoot = path.relative(info.dir, rootDir);
    return require.cache[info.file].require("./" + path.join(relToRoot, pth));
  }

  function rel(pth, inf) {
    var info = inf || getCallerInfo(2);
    return require.cache[info.file].require("./" + path.normalize(pth));
  }
  
  // Wrap so end users can't pass 'inf'
  pquire.abs = function(pth) { return abs(pth); };
  pquire.rel = function(pth) { return rel(pth); };
  
  return pquire;
}

module.exports = pquire_make;