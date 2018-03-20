"use strict";

describe("Misc", function() {
  it("can be required", function() {
    var pquire = null;
    function req() { pquire = require("../index.js"); }
    expect(req).to.not.throw();
    expect(pquire).to.be.not.null;
  });
});
