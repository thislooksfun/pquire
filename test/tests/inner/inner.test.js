"use strict";

var pquire = require("../../../index.js");


describe("Inner", function() {
  describe("pquire", function() {
    it("should be a function", function() {
      expect(pquire).to.be.a("function");
    });
    it("should require relatively first", function() {
      expect(pquire("foo")).to.equal("inner/foo");
    });
    it("should require absolutely next", function() {
      expect(pquire("bar")).to.equal("bar");
    });
    it("should throw if nothing found", function() {
      function shouldThrow() { pquire("invalid"); }
      expect(shouldThrow).to.throw(/* TODO: Put type here */);
    });
  });
  
  describe("pquire.rel", function() {
    it("should exist", function() {
      expect(pquire.rel).to.be.a("function");
    });
    it("should require relatively", function() {
      expect(pquire("foo")).to.equal("inner/foo");
    });
    it("should not require absolutely", function() {
      expect(function() { pquire("bar"); }).to.throw(/* TODO: Put type here */);
    });
    it("should throw if nothing found", function() {
      expect(function() { pquire("invalid"); }).to.throw(/* TODO: Put type here */);
    });
  });
  
  describe("pquire.abs", function() {
    it("should exist", function() {
      expect(pquire.abs).to.be.a("function");
    });
    it("should not require relatively", function() {
      expect(function() { pquire("baz"); }).to.throw(/* TODO: Put type here */);
    });
    it("should require absolutely", function() {
      expect(pquire("foo")).to.equal("foo");
    });
    it("should throw if nothing found", function() {
      expect(function() { pquire("invalid"); }).to.throw(/* TODO: Put type here */);
    });
  });
});