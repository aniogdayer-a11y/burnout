const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function run(still) {
  const nodes = new Map();
  const timers = new Map();
  let timerId = 0;
  function element() {
    return { open:false, children:[], handlers:{}, style:{setProperty(){}},
      addEventListener(type, fn){this.handlers[type]=fn},
      append(...items){this.children.push(...items)},appendChild(item){this.children.push(item)},
      replaceChildren(){this.children=[]},setAttribute(){},focus(){this.focused=true},
      showModal(){this.open=true},close(){this.open=false;this.handlers.close()},remove(){} };
  }
  const document = {documentElement:{classList:{contains:()=>still}},createElement:element,
    querySelector(key){if(!nodes.has(key))nodes.set(key,element());return nodes.get(key)}};
  vm.runInNewContext(fs.readFileSync('fresh-start.js','utf8'), {
    document, matchMedia:()=>({matches:still}),
    setTimeout(fn){timers.set(++timerId,fn);return timerId},clearTimeout(id){timers.delete(id)}
  });
  const get = key=>document.querySelector(key);
  get('#fresh-start').handlers.click();
  assert.equal(get('#fresh-dialog').open,true);
  assert.equal(get('#fresh-messages').children.length,still?6:1);
  if (!still) assert.equal(timers.size,5);
  get('#fresh-close').handlers.click();
  assert.equal(timers.size,0);
  assert.equal(get('#fresh-messages').children.length,0);
  assert.equal(get('#fresh-start').focused,true);
  get('#fresh-start').handlers.click();
  [...timers.values()].forEach(fn=>fn());
  assert.equal(get('#fresh-messages').children.length,6);
  get('#fresh-dialog').close();
  assert.equal(get('#fresh-messages').children.length,0);
}
run(false);run(true);
console.log('PASS: staggered cards, close cleanup, reopen, and reduced-motion mode.');
