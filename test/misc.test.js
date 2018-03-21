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
  });
  
  describe("pquire.withBaseRelative", function() {
    var pq = require("../index.js");
    
    it("Should throw with no arguments", function() {
      expect(function() { pq.withBaseRelative(); }).to.throw(/^Type Mismatch: Expected 'string', got undefined$/);
    });
    it("Should throw with non-string arguments", function() {
      expect(function() { pq.withBaseRelative(undefined); }).to.throw(/^Type Mismatch: Expected 'string', got undefined$/);
      expect(function() { pq.withBaseRelative(null); }).to.throw(/^Type Mismatch: Expected 'string', got null$/);
      expect(function() { pq.withBaseRelative(false); }).to.throw(/^Type Mismatch: Expected 'string', got 'boolean'$/);
      expect(function() { pq.withBaseRelative(1); }).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
      expect(function() { pq.withBaseRelative(NaN); }).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
      expect(function() { pq.withBaseRelative([]); }).to.throw(/^Type Mismatch: Expected 'string', got 'object'$/);
      expect(function() { pq.withBaseRelative({}); }).to.throw(/^Type Mismatch: Expected 'string', got 'object'$/);
      expect(function() { pq.withBaseRelative(function(){}); }).to.throw(/^Type Mismatch: Expected 'string', got 'function'$/);
    });
    it("Should not throw with a valid argument", function() {
      var pquire = null;
      function req() { pquire = pq.withBaseRelative(""); }
      expect(req).to.not.throw();
      expect(pquire).to.exist;
      expect(pquire).to.be.a("function");
    });
  });
  
  describe("pquire.withBaseAbsolute", function() {
    var pq = require("../index.js");
    
    it("Should throw with no arguments", function() {
      expect(function() { pq.withBaseAbsolute(); }).to.throw(/^Type Mismatch: Expected 'string', got undefined$/);
    });
    it("Should throw with non-string arguments", function() {
      expect(function() { pq.withBaseAbsolute(undefined); }).to.throw(/^Type Mismatch: Expected 'string', got undefined$/);
      expect(function() { pq.withBaseAbsolute(null); }).to.throw(/^Type Mismatch: Expected 'string', got null$/);
      expect(function() { pq.withBaseAbsolute(false); }).to.throw(/^Type Mismatch: Expected 'string', got 'boolean'$/);
      expect(function() { pq.withBaseAbsolute(1); }).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
      expect(function() { pq.withBaseAbsolute(NaN); }).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
      expect(function() { pq.withBaseAbsolute([]); }).to.throw(/^Type Mismatch: Expected 'string', got 'object'$/);
      expect(function() { pq.withBaseAbsolute({}); }).to.throw(/^Type Mismatch: Expected 'string', got 'object'$/);
      expect(function() { pq.withBaseAbsolute(function(){}); }).to.throw(/^Type Mismatch: Expected 'string', got 'function'$/);
    });
    it("Should not throw with a valid argument", function() {
      var pquire = null;
      function req() { pquire = pq.withBaseAbsolute(""); }
      expect(req).to.not.throw();
      expect(pquire).to.exist;
      expect(pquire).to.be.a("function");
    });
  });
});
