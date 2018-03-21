"use strict";


describe("Inner (advanced)", function() {
  describe("pquire.withBaseRelative", function() {
    
    var pquire = require("../../../../index.js").withBaseRelative("../");
    
    it("should be a function", function() {
      expect(pquire).to.be.a("function");
    });
    it("should require relatively first", function() {
      expect(pquire("foo")).to.equal("inner/bottom/foo");
    });
    it("should require absolutely relative to passed path next", function() {
      expect(pquire("baz")).to.equal("inner/baz");
    });
    it("should throw if nothing found", function() {
      expect(function() { pquire("invalid"); }).to.throw(/^Cannot find module '\.\/\.\.\/invalid'$/);
    });
    it("should properly error on nested requires", function() {
      expect(function() { pquire("../nested"); }).to.throw(/^Cannot find module '\.\/invalid'$/);
    });
    
    describe("pquire.withBaseRelative.rel", function() {
      it("should exist", function() {
        expect(pquire.rel).to.be.a("function");
      });
      it("should require relatively", function() {
        expect(pquire.rel("foo")).to.equal("inner/bottom/foo");
      });
      it("should not require absolutely", function() {
        expect(function() { pquire.rel("baz"); }).to.throw(/^Cannot find module '\.\/baz'$/);
      });
      it("should throw if nothing found", function() {
        expect(function() { pquire.rel("invalid"); }).to.throw(/^Cannot find module '\.\/invalid'$/);
      });
      it("should properly error on nested requires", function() {
        expect(function() { pquire.rel("../../nested"); }).to.throw(/^Cannot find module '\.\/invalid'$/);
      });
    });

    describe("pquire.withBaseRelative.abs", function() {
      it("should exist", function() {
        expect(pquire.abs).to.be.a("function");
      });
      it("should not require relatively", function() {
        expect(function() { pquire.abs("btm"); }).to.throw(/^Cannot find module '\.\/\.\.\/btm'$/);
      });
      it("should not require relative to project root", function() {
        expect(function() { pquire.abs("bar"); }).to.throw(/^Cannot find module '\.\/\.\.\/bar'$/);
      });
      it("should require absolutely relative to given path", function() {
        expect(pquire.abs("foo")).to.equal("inner/foo");
      });
      it("should throw if nothing found", function() {
        expect(function() { pquire.abs("invalid"); }).to.throw(/^Cannot find module '\.\/\.\.\/invalid'$/);
      });
      it("should properly error on nested requires", function() {
        expect(function() { pquire.abs("../nested"); }).to.throw(/^Cannot find module '\.\/invalid'$/);
      });
    });
    
  });
});