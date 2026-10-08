const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const elements = new Map();
let now = 0;
let callback = null;
const events = {};
const document = {
  hidden:false,
  addEventListener:(event,fn)=>{events[event]=fn},
  querySelector(selector) {
    if (!elements.has(selector)) elements.set(selector, {
      textContent:'',disabled:false,style:{setProperty(){}},classList:{add(){},remove(){}},
      addEventListener(type,fn){this[type]=fn}
    });
    return elements.get(selector);
  }
};
vm.runInNewContext(fs.readFileSync('timer.js','utf8'),{document,performance:{now:()=>now},setInterval:fn=>{callback=fn;return 1},clearInterval:()=>{callback=null}});
const get=s=>document.querySelector(s);
assert.equal(get('#timer-display').textContent,'00:25');
get('#timer-start').click();
assert.equal(get('#timer-continue').hidden,true);
now=5500;callback();
assert.equal(get('#timer-display').textContent,'00:20');
get('#timer-start').click();
assert.equal(callback,null);
now=60000;
get('#timer-start').click();
now=61000;callback();
assert.equal(get('#timer-display').textContent,'00:19');
now=180000;events.visibilitychange();
assert.equal(get('#timer-display').textContent,'00:00');
assert.equal(callback,null);
assert.match(get('#timer-status').textContent,/complete/);
assert.equal(get('#timer-continue').hidden,false);
get('#timer-start').click();
assert.equal(get('#timer-continue').hidden,true);
assert.equal(get('#timer-display').textContent,'00:25');
now+=10000;callback();
get('#timer-reset').click();
assert.equal(get('#timer-display').textContent,'00:25');
assert.equal(callback,null);
assert.equal(get('#timer-reset').disabled,true);
assert.equal(get('#timer-continue').hidden,true);
console.log('PASS: 25-second countdown, pause/resume, background catch-up, completion, repeat, and reset.');
