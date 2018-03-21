"use strict";

var path = require("path");

function getCallerInfo(depth) {
  var stack = getStack();
  
  // Remove superfluous function calls on stack
  stack.shift(); // getCaller --> getStack
  
  for (var i = 0; i < depth; i++) {
    stack.shift();
  }
  
  // Return caller's caller
  var caller = stack[0].getFileName();
  return {file: caller, dir: path.dirname(caller)};
}

function getStack() {
  // Save original Error.prepareStackTrace
  var origPrepareStackTrace = Error.prepareStackTrace;
  
  // Override with function that just returns `stack`
  Error.prepareStackTrace = function (_, stack) {
    return stack;
  };
  
  // Create a new `Error`, which automatically gets `stack`
  var err = new Error();
  
  // Evaluate `err.stack`, which calls our new `Error.prepareStackTrace`
  var stack = err.stack;
  
  // Restore original `Error.prepareStackTrace`
  Error.prepareStackTrace = origPrepareStackTrace;
  
  // Remove superfluous function call on stack
  stack.shift(); // getStack --> Error
  
  return stack;
}

module.exports = getCallerInfo;