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
      expect(function() { pquire("invalid"); }).to.throw(/^Cannot find module '\.\/\.\.\/invalid'$/);
    });
    it("should properly error on nested requires", function() {
      expect(function() { pquire("nested"); }).to.throw(/^Cannot find module '\.\/invalid'$/);
    });
  });
  
  describe("pquire.rel", function() {
    it("should exist", function() {
      expect(pquire.rel).to.be.a("function");
    });
    it("should require relatively", function() {
      expect(pquire.rel("foo")).to.equal("inner/foo");
    });
    it("should not require absolutely", function() {
      expect(function() { pquire.rel("bar"); }).to.throw(/^Cannot find module '\.\/bar'$/);
    });
    it("should throw if nothing found", function() {
      expect(function() { pquire.rel("invalid"); }).to.throw(/^Cannot find module '\.\/invalid'$/);
    });
    it("should properly error on nested requires", function() {
      expect(function() { pquire.rel("../nested"); }).to.throw(/^Cannot find module '\.\/invalid'$/);
    });
  });
  
  describe("pquire.abs", function() {
    it("should exist", function() {
      expect(pquire.abs).to.be.a("function");
    });
    it("should not require relatively", function() {
      expect(function() { pquire.abs("baz"); }).to.throw(/^Cannot find module '\.\/\.\.\/baz'$/);
    });
    it("should require absolutely", function() {
      expect(pquire.abs("foo")).to.equal("foo");
    });
    it("should throw if nothing found", function() {
      expect(function() { pquire.abs("invalid"); }).to.throw(/^Cannot find module '\.\/\.\.\/invalid'$/);
    });
    it("should properly error on nested requires", function() {
      expect(function() { pquire.abs("nested"); }).to.throw(/^Cannot find module '\.\/invalid'$/);
    });
  });
});