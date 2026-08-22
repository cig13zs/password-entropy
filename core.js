;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PasswordEntropy = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const COMMON = new Set(['password','password1','123456','12345678','qwerty','letmein','admin','welcome','iloveyou','monkey','dragon']);

  function analyze(password) {
    password = String(password || '');
    if (!password) return { length: 0, poolSize: 0, upperBoundBits: 0, entropyBits: 0, assessment: 'Empty', strength: 'Empty', warnings: ['Enter a password to inspect local patterns.'] };
    let pool = 0;
    if (/[a-z]/.test(password)) pool += 26;
    if (/[A-Z]/.test(password)) pool += 26;
    if (/[0-9]/.test(password)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(password)) pool += 33;
    const upper = pool ? password.length * Math.log2(pool) : 0;
    const lower = password.toLowerCase();
    const compact = lower.replace(/[^a-z0-9]/g, '');
    const warnings = [];
    if (password.length < 12) warnings.push('Shorter than 12 characters.');
    if (COMMON.has(lower) || COMMON.has(compact)) warnings.push('Matches a common password pattern.');
    if (/^(.{1,12})\1+$/.test(password)) warnings.push('Repeats the same character or block.');
    if (/(?:0123|1234|2345|3456|4567|5678|6789|abcd|bcde|cdef|qwerty|asdf)/i.test(password)) warnings.push('Contains a simple keyboard or sequence pattern.');
    const assessment = warnings.length ? 'Pattern warning' : (password.length >= 15 ? 'No obvious local pattern' : 'Needs more length');
    return {
      length: password.length,
      poolSize: pool,
      upperBoundBits: Math.round(upper * 10) / 10,
      entropyBits: Math.round(upper * 10) / 10,
      assessment: assessment,
      strength: assessment,
      warnings: warnings,
      note: 'The bit count is only a character-pool upper bound. It is not measured entropy or a crack-time prediction.'
    };
  }
  return { analyze: analyze };
});
