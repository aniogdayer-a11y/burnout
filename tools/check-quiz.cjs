const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const elements = new Map();
function element() {
  const classes = new Set();
  return {textContent:'', innerHTML:'', hidden:true, disabled:false, dataset:{}, children:[], handlers:{}, attrs:{},
    classList:{add:v=>classes.add(v),remove:v=>classes.delete(v),contains:v=>classes.has(v)},
    addEventListener(type,fn){this.handlers[type]=fn},replaceChildren(...items){this.children=items},
    setAttribute(k,v){this.attrs[k]=v},getAttribute(k){return this.attrs[k]},focus(){},scrollIntoView(){}};
}
const document = {head:{appendChild(){}},documentElement:{classList:{toggle(){}}},querySelector(selector){if(!elements.has(selector))elements.set(selector,element());return elements.get(selector)},
  querySelectorAll(selector){return selector === '.answer' ? this.querySelector('#answers').children : []},createElement:element};
let bonkCount = 0;
let prizeCount = 0;
const context = vm.createContext({document,window:{showBonkReaction(){bonkCount++},showPrizeReaction(){prizeCount++}},matchMedia:()=>({matches:false,addEventListener(){}}),history:{replaceState(){}},location:{pathname:'/',search:''}});
vm.runInContext(fs.readFileSync('script.js','utf8'),context);
vm.runInContext(fs.readFileSync('quiz.js','utf8'),context);
const get=s=>document.querySelector(s);
assert.equal(get('#answers').children.length,3);
assert.equal(get('#next').disabled,true);
get('#answers').children[1].handlers.click();
assert.match(get('#feedback').textContent,/try again/);
assert.equal(bonkCount,1);
assert.equal(get('#next').disabled,true);
for(const correct of [0,1,2,0,1]) {
  get('#answers').children[correct].handlers.click();
  assert.equal(get('#next').disabled,false);
  assert.ok(get('#answers').children.every(a=>a.disabled));
  get('#next').handlers.click();
}
assert.equal(get('#closing').hidden,false);
assert.equal(prizeCount,5);
assert.equal(get('#quiz-progress').value,5);
const home = fs.readFileSync('index.html','utf8');
const quiz = fs.readFileSync('quiz.html','utf8');
const reminders = fs.readFileSync('reminders.html','utf8');
assert.ok(!home.includes('id="quiz-card"'));
assert.ok(home.includes('href="reminders.html"'));
assert.ok(reminders.includes('href="quiz.html"'));
assert.ok(quiz.includes('id="restart" href="index.html"'));
assert.ok(quiz.includes('href="reminders.html"'));
assert.ok(home.includes('src="timer.js"'));
assert.ok(!home.includes('id="reminder-list"'));
assert.ok(reminders.includes('id="reminder-list"'));
for (const page of [home, reminders, quiz]) {
  for (const match of page.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    if (/^https?:\/\//.test(match[1])) continue;
    assert.ok(fs.existsSync(match[1].split('#')[0]), `Missing local link: ${match[1]}`);
  }
}
// Shared code must also work when either page's content is absent.
for (const isHome of [true,false]) {
  const pageDocument = {...document, querySelector(selector) {
    if (!isHome && selector === '#reminder-list') return null;
    if (isHome && ['#next','#feedback','#closing','#question'].includes(selector)) return null;
    return document.querySelector(selector);
  }};
  const pageContext = vm.createContext({document:pageDocument,window:{},matchMedia:()=>({matches:false,addEventListener(){}})});
  vm.runInContext(fs.readFileSync('script.js','utf8'),pageContext);
}
console.log('PASS: retries, all five questions, completion, three-page links, assets, and shared script.');
