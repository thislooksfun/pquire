"use strict";

var pquire = require("../../../index.js");



describe("pquire.each (advanced)", function() {
  it("should default to relative", function() {
    var expected = [
      "foo/bar/bar",
      "foo/bar/foo",
    ];
    var list = [];
    pquire.each("bar", list.push.bind(list));
    expect(list).to.deep.equal(expected);
  });
  it("should fall back to an absolute path", function() {
    var expected = [
      "foo/bar/bar",
      "foo/bar/foo",
      "foo/bar",
      "foo/foo",
    ];
    var list = [];
    pquire.each("foo", list.push.bind(list), {blacklist: [/\.test\.js$/]});
    expect(list).to.deep.equal(expected);
  });
});

describe("pquire.each.rel", function() {
  it("should require relatively", function() {
    var expected = [
      "foo/bar/bar",
      "foo/bar/foo",
    ];
    var list = [];
    pquire.each.rel("bar", list.push.bind(list));
    expect(list).to.deep.equal(expected);
  });
});

describe("pquire.each.abs", function() {
  it("should require absolutely", function() {
    var expected = [
      "bar/bar",
      "bar/foo",
    ];
    var list = [];
    pquire.each.abs("bar", list.push.bind(list));
    expect(list).to.deep.equal(expected);
  });
});