"use strict";

var fs = require("fs-extra");
var path = require("path");

var tmpPath = "/tmp/tlf_pquire_test";
var tmpFilePath = "/tmp/tlf_pquire_test/test.js";
var pquirePath = path.join(__dirname, "../index.js");

describe("missing_package", function() {
  
  
  describe("pquire", function() {
    before(function() {
      fs.mkdirpSync(tmpPath);
      fs.writeFileSync(tmpFilePath, "var pquire = require('" + pquirePath + "'); pquire('invalid');");
    });
    
    it("should fail to load with missing package.json", function() {
      expect(function() { require(tmpFilePath); }).to.throw(/^Cannot locate project root$/);
    });
    
    after(function() {
      fs.removeSync("/tmp/tlf_pquire_test");
    });
  });
  describe("pquire.abs", function() {
    before(function() {
      fs.mkdirpSync(tmpPath);
      
      fs.writeFileSync(tmpFilePath, "var pquire = require('" + pquirePath + "'); pquire.abs('invalid');");
    });
    
    it("should fail to load with missing package.json", function() {
      expect(function() { require(tmpFilePath); }).to.throw(/^Cannot locate project root$/);
    });
    
    after(function() {
      fs.removeSync("/tmp/tlf_pquire_test");
    });
  });
});