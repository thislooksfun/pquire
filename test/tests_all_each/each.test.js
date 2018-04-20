"use strict";

var pquire = require("../../index.js");


describe("pquire.each", function() {
  it("should be a function", function() {
    expect(pquire.each).to.be.a("function");
  });
  it("should recursively require", function() {
    var expected = [
      "inner/bar",
      "inner/foo",
      "inner/nested/bar",
      "inner/nested/foo",
    ];
    var list = [];
    pquire.each("inner", list.push.bind(list));
    expect(list).to.deep.equal(expected);
  });
  it("should only require whitelisted patterns", function() {
    var expected = [
      "inner/foo",
      "inner/nested/foo",
    ];
    var list = [];
    pquire.each("inner", list.push.bind(list), {whitelist: [/foo\.js$/]});
    expect(list).to.deep.equal(expected);
  });
  it("should ignore blacklisted patterns", function() {
    var expected = [
      "inner/bar",
      "inner/nested/bar",
    ];
    var list = [];
    pquire.each("inner", list.push.bind(list), {blacklist: [/foo\.js$/]});
    expect(list).to.deep.equal(expected);
  });
  it("should give precedence to the blacklist", function() {
    var expected = [
      "inner/nested/bar",
    ];
    var list = [];
    pquire.each("inner", list.push.bind(list), {whitelist: [/\/nested\//], blacklist: [/foo\.js$/]});
    expect(list).to.deep.equal(expected);
  });
  
  it("should error if the path is not a string", function() {
    function fn() {
      pquire.each(4);
    }
    expect(fn).to.throw(/^Type Mismatch: Expected 'string', got 'number'$/);
  });
  it("should error if fn is not a function", function() {
    function fn() {
      pquire.each("inner", "");
    }
    expect(fn).to.throw(/^Type Mismatch: Expected 'function', got 'string'$/);
  });
  it("should error if whitelist contains a non-regex", function() {
    function fn() {
      pquire.each("inner", function(){}, {whitelist: [""]});
    }
    expect(fn).to.throw(/^Type Mismatch: Expected 'RegExp'$/);
  });
  it("should error if blacklist contains a non-regex", function() {
    function fn() {
      pquire.each("inner", function(){}, {blacklist: [""]});
    }
    expect(fn).to.throw(/^Type Mismatch: Expected 'RegExp'$/);
  });
});