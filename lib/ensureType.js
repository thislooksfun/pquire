"use strict";

module.exports = function(obj, expected) {
  if (obj === undefined) throw new Error("Type Mismatch: Expected '" + expected + "', got undefined");
  if (obj === null) throw new Error("Type Mismatch: Expected '" + expected + "', got null");
  
  if (expected === "regex") {
    if (!(obj instanceof RegExp)) throw new Error("Type Mismatch: Expected 'RegExp'");
  } else if (typeof obj !== expected) {
    throw new Error("Type Mismatch: Expected '" + expected + "', got '" + (typeof obj) + "'");
  }
  return true;
};