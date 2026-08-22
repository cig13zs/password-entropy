;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PasswordEntropy = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  function analyze(password) {
    if (!password) return { entropy: 0, poolSize: 0, length: 0, strength: 'Empty' };

    let pool = 0;
    if (/[a-z]/.test(password)) pool += 26;
    if (/[A-Z]/.test(password)) pool += 26;
    if (/[0-9]/.test(password)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(password)) pool += 33;

    const len = password.length;
    const entropy = pool > 0 ? len * (Math.log(pool) / Math.log(2)) : 0;

    let strength = 'Very Weak';
    if (entropy >= 80) strength = 'Very Strong';
    else if (entropy >= 60) strength = 'Strong';
    else if (entropy >= 40) strength = 'Moderate';
    else if (entropy >= 28) strength = 'Weak';

    return {
      entropyBits: Math.round(entropy * 10) / 10,
      length: len,
      poolSize: pool,
      strength: strength,
      bruteForceGuesses: Math.pow(pool, len).toExponential(2)
    };
  }

  return { analyze: analyze };
});
