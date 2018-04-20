"use strict";

function recurs(rem, lst) {
  if (rem == 0) { return; }
  
  var list = lst || [];
  
  list.push(rem, rem-1);
  recurs(rem - 1, list);
  
  return list;
}

console.dir(recurs(5));