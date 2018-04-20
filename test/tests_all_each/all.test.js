"use strict";

var pquire = require("../../index.js");


describe("pquire.all", function() {
  it("should be a function", function() {
    expect(pquire.all).to.be.a("function");
  });
  it("should recursively require", function() {
    var expected = [
      "inner/bar",
      "inner/foo",
      "inner/nested/bar",
      "inner/nested/foo",
    ];
    var list = pquire.all("inner");
    expect(list).to.deep.equal(expected);
  });
  it("should only require whitelisted patterns", function() {
    var expected = [
      "inner/foo",
      "inner/nested/foo",
    ];
    var list = pquire.all("inner", {whitelist: [/foo\.js$/]});
    expect(list).to.deep.equal(expected);
  });
  it("should ignore blacklisted patterns", function() {
    var expected = [
      "inner/bar",
      "inner/nested/bar",
    ];
    var list = pquire.all("inner", {blacklist: [/foo\.js$/]});
    expect(list).to.deep.equal(expected);
  });
  it("should give precedence to the blacklist", function() {
    var expected = [
      "inner/nested/bar",
    ];
    var list = pquire.all("inner", {whitelist: [/\/nested\//], blacklist: [/foo\.js$/]});
    expect(list).to.deep.equal(expected);
  });
  
  it("should error if the path is not a string", function() {
    function fn() {
      pquire.all(4);
    }
    expect(fn).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
  });
  it("should error if whitelist contains a non-regex", function() {
    function fn() {
      pquire.all("inner", {whitelist: [""]});
    }
    expect(fn).to.throw(/^Type Mismatch: Expected 'RegExp'$/);
  });
  it("should error if blacklist contains a non-regex", function() {
    function fn() {
      pquire.all("inner", {blacklist: [""]});
    }
    expect(fn).to.throw(/^Type Mismatch: Expected 'RegExp'$/);
  });
});