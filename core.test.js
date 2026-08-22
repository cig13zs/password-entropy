const assert = require('assert');
const PasswordEntropy = require('./core');

const res1 = PasswordEntropy.analyze('correct-horse-battery-staple');
assert.strictEqual(res1.entropyBits > 80, true);
assert.strictEqual(res1.strength, 'Very Strong');

const res2 = PasswordEntropy.analyze('123456');
assert.strictEqual(res2.entropyBits < 30, true);
assert.strictEqual(res2.strength, 'Very Weak');

console.log('ok, all PasswordEntropy assertions passed');
