const sample = 'river-glass-orbit-maple';
const inputEl = document.getElementById('input'), outputEl = document.getElementById('output');
const statsEl = document.getElementById('output-stats') || document.getElementById('stats');
function process() { const result = PasswordEntropy.analyze(inputEl.value); outputEl.value = JSON.stringify(result, null, 2); if (statsEl) statsEl.textContent = 'Upper bound: ' + result.upperBoundBits + ' bits; ' + result.assessment; }
document.getElementById('btn-run').addEventListener('click', process); inputEl.addEventListener('input', process);
document.getElementById('btn-sample').addEventListener('click', function () { inputEl.value = sample; process(); });
document.getElementById('btn-copy').addEventListener('click', function () { navigator.clipboard.writeText(outputEl.value); });
if (document.getElementById('btn-clear')) document.getElementById('btn-clear').addEventListener('click', function () { inputEl.value = ''; process(); }); process();
