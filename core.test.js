const assert = require('assert');
const Tool = require('./core');
const res1 = Tool.analyze('correct-horse-battery-staple');
assert.strictEqual(res1.strength, 'Very Strong');
assert.strictEqual(res1.strengthBand, 'Very Strong');
assert.strictEqual(res1.entropyBits, res1.upperBoundBits);
assert.ok(/length x log2\(character pool size\)/i.test(res1.note));
assert.ok(/not measured entropy/i.test(res1.note));
assert.ok(/real-world crack-time prediction/i.test(res1.note));
assert.ok(!Object.prototype.hasOwnProperty.call(res1, 'bruteForceGuesses'));

const repeated = Tool.analyze('P@ssw0rd!P@ssw0rd!');
assert.ok(repeated.warnings.some(item => /Repeats/.test(item)));
assert.strictEqual(Tool.analyze('123456').strength, 'Very Weak');
assert.strictEqual(Tool.analyze('123456').assessment, 'Pattern warning');
assert.strictEqual(Tool.analyze('river-glass-orbit-maple').warnings.length, 0);
assert.strictEqual(Tool.analyze('').strength, 'Empty');
console.log('ok, password entropy and pattern assertions passed');
