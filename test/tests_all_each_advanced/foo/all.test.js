"use strict";

var pquire = require("../../../index.js");



describe("pquire.all (advanced)", function() {
  it("should default to relative", function() {
    var expected = [
      "foo/bar/bar",
      "foo/bar/foo",
    ];
    var list = pquire.all("bar");
    expect(list).to.deep.equal(expected);
  });
  it("should fall back to an absolute path", function() {
    var expected = [
      "foo/bar/bar",
      "foo/bar/foo",
      "foo/bar",
      "foo/foo",
    ];
    var list = pquire.all("foo", {blacklist: [/\.test\.js$/]});
    expect(list).to.deep.equal(expected);
  });
});

describe("pquire.all.rel", function() {
  it("should require relatively", function() {
    var expected = [
      "foo/bar/bar",
      "foo/bar/foo",
    ];
    var list = pquire.all.rel("bar");
    expect(list).to.deep.equal(expected);
  });
});

describe("pquire.all.abs", function() {
  it("should require absolutely", function() {
    var expected = [
      "bar/bar",
      "bar/foo",
    ];
    var list = pquire.all.abs("bar");
    expect(list).to.deep.equal(expected);
  });
});