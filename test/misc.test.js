"use strict";

describe("Misc", function() {
  describe("pquire", function() {
    it("can be required", function() {
      var pquire = null;
      function req() { pquire = require("../index.js"); }
      expect(req).to.not.throw();
      expect(pquire).to.exist;
      expect(pquire).to.be.a("function");
    });
    
    it("should throw with no arguments", function() {
      var pquire = require("../index.js");
      expect(function() { pquire(); }).to.throw(/^Type Mismatch: Expected 'string', got undefined$/);
    });
    it("should throw with non-string arguments", function() {
      var pquire = require("../index.js");
      expect(function() { pquire(undefined); }).to.throw(/^Type Mismatch: Expected 'string', got undefined$/);
      expect(function() { pquire(null); }).to.throw(/^Type Mismatch: Expected 'string', got null$/);
      expect(function() { pquire(false); }).to.throw(/^Type Mismatch: Expected 'string', got 'boolean'$/);
      expect(function() { pquire(1); }).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
      expect(function() { pquire(NaN); }).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
      expect(function() { pquire([]); }).to.throw(/^Type Mismatch: Expected 'string', got 'object'$/);
      expect(function() { pquire({}); }).to.throw(/^Type Mismatch: Expected 'string', got 'object'$/);
      expect(function() { pquire(function(){}); }).to.throw(/^Type Mismatch: Expected 'string', got 'function'$/);
    });
    it("Should not throw with a valid argument", function() {
      var pquire = require("../index.js");
      var foo;
      function req() { foo = pquire("tests/foo"); }
      expect(req).to.not.throw();
      expect(foo).to.exist;
      expect(foo).to.equal("foo");
    });
  });
  
  describe("pquire.rel", function() {
    var pqRel = require("../index.js").rel;
    
    it("should be valid", function() {
      expect(pqRel).to.exist;
      expect(pqRel).to.be.a("function");
    });
    
    it("should throw with no arguments", function() {
      expect(function() { pqRel(); }).to.throw(/^Type Mismatch: Expected 'string', got undefined$/);
    });
    it("should throw with non-string arguments", function() {
      expect(function() { pqRel(undefined); }).to.throw(/^Type Mismatch: Expected 'string', got undefined$/);
      expect(function() { pqRel(null); }).to.throw(/^Type Mismatch: Expected 'string', got null$/);
      expect(function() { pqRel(false); }).to.throw(/^Type Mismatch: Expected 'string', got 'boolean'$/);
      expect(function() { pqRel(1); }).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
      expect(function() { pqRel(NaN); }).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
      expect(function() { pqRel([]); }).to.throw(/^Type Mismatch: Expected 'string', got 'object'$/);
      expect(function() { pqRel({}); }).to.throw(/^Type Mismatch: Expected 'string', got 'object'$/);
      expect(function() { pqRel(function(){}); }).to.throw(/^Type Mismatch: Expected 'string', got 'function'$/);
    });
    it("Should not throw with a valid argument", function() {
      var foo;
      function req() { foo = pqRel("tests/foo"); }
      expect(req).to.not.throw();
      expect(foo).to.exist;
      expect(foo).to.equal("foo");
    });
  });
  
  describe("pquire.abs", function() {
    var pqAbs = require("../index.js").abs;
    
    it("should be valid", function() {
      expect(pqAbs).to.exist;
      expect(pqAbs).to.be.a("function");
    });
    
    it("should throw with no arguments", function() {
      expect(function() { pqAbs(); }).to.throw(/^Type Mismatch: Expected 'string', got undefined$/);
    });
    it("should throw with non-string arguments", function() {
      expect(function() { pqAbs(undefined); }).to.throw(/^Type Mismatch: Expected 'string', got undefined$/);
      expect(function() { pqAbs(null); }).to.throw(/^Type Mismatch: Expected 'string', got null$/);
      expect(function() { pqAbs(false); }).to.throw(/^Type Mismatch: Expected 'string', got 'boolean'$/);
      expect(function() { pqAbs(1); }).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
      expect(function() { pqAbs(NaN); }).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
      expect(function() { pqAbs([]); }).to.throw(/^Type Mismatch: Expected 'string', got 'object'$/);
      expect(function() { pqAbs({}); }).to.throw(/^Type Mismatch: Expected 'string', got 'object'$/);
      expect(function() { pqAbs(function(){}); }).to.throw(/^Type Mismatch: Expected 'string', got 'function'$/);
    });
    it("Should not throw with a valid argument", function() {
      var foo;
      function req() { foo = pqAbs("test/tests/foo"); }
      expect(req).to.not.throw();
      expect(foo).to.exist;
      expect(foo).to.equal("foo");
    });
  });
  
  describe("pquire.withBaseRelative", function() {
    var pq = require("../index.js");
    
    it("should throw with no arguments", function() {
      expect(function() { pq.withBaseRelative(); }).to.throw(/^Type Mismatch: Expected 'string', got undefined$/);
    });
    it("should throw with non-string arguments", function() {
      expect(function() { pq.withBaseRelative(undefined); }).to.throw(/^Type Mismatch: Expected 'string', got undefined$/);
      expect(function() { pq.withBaseRelative(null); }).to.throw(/^Type Mismatch: Expected 'string', got null$/);
      expect(function() { pq.withBaseRelative(false); }).to.throw(/^Type Mismatch: Expected 'string', got 'boolean'$/);
      expect(function() { pq.withBaseRelative(1); }).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
      expect(function() { pq.withBaseRelative(NaN); }).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
      expect(function() { pq.withBaseRelative([]); }).to.throw(/^Type Mismatch: Expected 'string', got 'object'$/);
      expect(function() { pq.withBaseRelative({}); }).to.throw(/^Type Mismatch: Expected 'string', got 'object'$/);
      expect(function() { pq.withBaseRelative(function(){}); }).to.throw(/^Type Mismatch: Expected 'string', got 'function'$/);
    });
    it("should not throw with a valid argument", function() {
      var pquire = null;
      function req() { pquire = pq.withBaseRelative(""); }
      expect(req).to.not.throw();
      expect(pquire).to.exist;
      expect(pquire).to.be.a("function");
    });
  });
  
  describe("pquire.withBaseAbsolute", function() {
    var pq = require("../index.js");
    
    it("should throw with no arguments", function() {
      expect(function() { pq.withBaseAbsolute(); }).to.throw(/^Type Mismatch: Expected 'string', got undefined$/);
    });
    it("should throw with non-string arguments", function() {
      expect(function() { pq.withBaseAbsolute(undefined); }).to.throw(/^Type Mismatch: Expected 'string', got undefined$/);
      expect(function() { pq.withBaseAbsolute(null); }).to.throw(/^Type Mismatch: Expected 'string', got null$/);
      expect(function() { pq.withBaseAbsolute(false); }).to.throw(/^Type Mismatch: Expected 'string', got 'boolean'$/);
      expect(function() { pq.withBaseAbsolute(1); }).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
      expect(function() { pq.withBaseAbsolute(NaN); }).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
      expect(function() { pq.withBaseAbsolute([]); }).to.throw(/^Type Mismatch: Expected 'string', got 'object'$/);
      expect(function() { pq.withBaseAbsolute({}); }).to.throw(/^Type Mismatch: Expected 'string', got 'object'$/);
      expect(function() { pq.withBaseAbsolute(function(){}); }).to.throw(/^Type Mismatch: Expected 'string', got 'function'$/);
    });
    it("should not throw with a valid argument", function() {
      var pquire = null;
      function req() { pquire = pq.withBaseAbsolute(""); }
      expect(req).to.not.throw();
      expect(pquire).to.exist;
      expect(pquire).to.be.a("function");
    });
  });
});
