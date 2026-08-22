const assert = require('assert');
const Tool = require('./core');
const repeated = Tool.analyze('P@ssw0rd!P@ssw0rd!');
assert.ok(repeated.warnings.some(item => /Repeats/.test(item)));
assert.ok(/upper bound/i.test(repeated.note));
assert.strictEqual(Tool.analyze('123456').assessment, 'Pattern warning');
assert.strictEqual(Tool.analyze('river-glass-orbit-maple').warnings.length, 0);
console.log('ok, password pattern assertions passed');
