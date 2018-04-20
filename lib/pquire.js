"use strict";

// Global imports
var path = require("path");
var fs   = require("fs");
// Local imports
var ensureType      = require("./ensureType");
var getCallerInfo   = require("./getCallerInfo");
var findPackageRoot = require("./findPackageRoot");


function pquire_make(root_pth) {
  
  function pquire(pth) {
    ensureType(pth, "string");
    
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
  
  function all(pth, opts) {
    var list = [];
    each(pth, list.push.bind(list), opts, getCallerInfo(2));
    return list;
  }
  function all_rel(pth, opts) {
    var list = [];
    each_rel(pth, list.push.bind(list), opts, getCallerInfo(2));
    return list;
  }
  function all_abs(pth, opts) {
    var list = [];
    each_abs(pth, list.push.bind(list), opts, getCallerInfo(2));
    return list;
  }
  
  
  
  function each(pth, fn, opts, inf) {
    var info = inf || getCallerInfo(2);
    var exactPath = path.join(info.dir, pth);
    if (fs.existsSync(exactPath)) {
      return each_rel(pth, fn, opts, info);
    } else {
      return each_abs(pth, fn, opts, info);
    }
  }
  
  function each_rel(pth, fn, opts, inf) {
    var info = inf || getCallerInfo(2);
    _each(pth, fn, opts, info);
  }
  
  function each_abs(pth, fn, opts, inf) {
    var info = inf || getCallerInfo(2);
    var rootDir = root_pth || findPackageRoot(info.dir);
    
    var relToRoot = path.relative(info.dir, rootDir);
    _each(path.join(relToRoot, pth), fn, opts, info);
  }
  
  function _each(pth, fn, opts, info) {
    var options = opts || {};
    if (!Array.isArray(options.whitelist)) {
      options.whitelist = [];
    }
    if (!Array.isArray(options.blacklist)) {
      options.blacklist = [];
    }
    
    var relPath = path.join(info.dir, pth);
    var files = fs.readdirSync(relPath);
    
    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      var stats = fs.statSync(path.join(relPath, f));
      if (stats.isDirectory()) {
        _each(path.join(pth, f), fn, options, info);
      } else {
        var filePath = path.join(pth, f);
        if (options.whitelist.length === 0 || matchesAny(filePath, options.whitelist)) {
          if (!matchesAny(filePath, options.blacklist)) {
            var pkg = require.cache[info.file].require("./" + path.normalize(filePath));
            fn(pkg);
          }
        }
      }
    }
  }
  function matchesAny(str, regexes) {
    ensureType(str, "string");
    for (var i = 0; i < regexes.length; i++) {
      var r = regexes[i];
      ensureType(r, "regex");
      if (r.test(str)) {
        return true;
      }
    }
    return false;
  }
  
  // Wrap to check 'pth' validity
  pquire.abs = function(pth) { ensureType(pth, "string"); return abs(pth); };
  pquire.rel = function(pth) { ensureType(pth, "string"); return rel(pth); };
  
  pquire.all = function(pth, opts) { ensureType(pth, "string"); return all(pth, opts); };
  pquire.all.rel = function(pth, opts) { ensureType(pth, "string"); return all_rel(pth, opts); };
  pquire.all.abs = function(pth, opts) { ensureType(pth, "string"); return all_abs(pth, opts); };
  
  pquire.each = function(pth, fn, opts) {
    ensureType(pth, "string");
    ensureType(fn, "function");
    each(pth, fn, opts);
  };
  pquire.each.rel = function(pth, fn, opts) {
    ensureType(pth, "string");
    ensureType(fn, "function");
    each_rel(pth, fn, opts);
  };
  pquire.each.abs = function(pth, fn, opts) {
    ensureType(pth, "string");
    ensureType(fn, "function");
    each_abs(pth, fn, opts);
  };
  
  return pquire;
}

module.exports = pquire_make;