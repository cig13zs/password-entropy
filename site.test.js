// node site.test.js
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const slug = "password-entropy";
const index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const readme = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'extension', 'manifest.json'), 'utf8'));
const popup = fs.readFileSync(path.join(__dirname, 'extension', 'popup.html'), 'utf8');
const pageDescription = 'Calculate a character-pool password entropy estimate in bits from length and character variety, with strength bands. Runs locally and does not predict real-world cracking time.';
const structuredData = [...index.matchAll(/<script type=["']application\/ld\+json["']>\s*([\s\S]*?)\s*<\/script>/gi)]
  .map((match) => JSON.parse(match[1]));
const webApplication = structuredData.find((item) => item['@type'] === 'WebApplication');
const faqPage = structuredData.find((item) => item['@type'] === 'FAQPage');

assert.ok(index.includes('https://cig13zs.github.io/' + slug + '/'), 'page metadata uses this repository URL');
assert.ok(readme.includes('github.com/cig13zs/' + slug) || readme.includes('cig13zs.github.io/' + slug), 'README points to this repository');
assert.ok(index.includes('content="' + pageDescription + '"'), 'page description matches the product claim');
assert.strictEqual(webApplication.description, pageDescription, 'WebApplication structured data matches the page description');
assert.ok(readme.includes('does not predict real-world cracking time'), 'README disclaims crack-time predictions');
assert.ok(!/estimate brute-force cracking time/i.test(index + readme + JSON.stringify(manifest)), 'public copy has no brute-force time estimate');
assert.ok(!/crack time estimator/i.test(index + readme + JSON.stringify(manifest)), 'public copy has no crack-time estimator claim');
for (const question of faqPage.mainEntity) {
  assert.ok(index.includes('<summary>' + question.name + '</summary>'), 'FAQ structured data matches visible question: ' + question.name);
}
assert.ok(new RegExp('<title>[^<]*' + escapeRegExp(manifest.action.default_title), 'i').test(popup), 'popup title matches the manifest');
assert.strictEqual(findInlineScripts(popup).length, 0, 'extension popup has no inline JavaScript');
assert.strictEqual(findUnsafeBlankLinks(index).length, 0, 'page blank-target links use noopener');
assert.strictEqual(findUnsafeBlankLinks(popup).length, 0, 'popup blank-target links use noopener');
assert.ok(/aria-live=["']polite["']/.test(popup), 'popup announces result changes');
assert.ok(fs.existsSync(path.join(__dirname, 'LICENSE')), 'LICENSE exists');
const manifestIconPaths = new Set([
  ...Object.values(manifest.icons || {}),
  ...Object.values((manifest.action && manifest.action.default_icon) || {}),
]);
for (const iconPath of manifestIconPaths) {
  assert.ok(fs.existsSync(path.join(__dirname, 'extension', iconPath)), 'manifest icon is missing: ' + iconPath);
}
const backgroundPath = path.join(__dirname, 'extension', 'background.js');
assert.ok(
  !fs.existsSync(backgroundPath) || (manifest.background && manifest.background.service_worker === 'background.js'),
  'unreferenced extension/background.js should not ship'
);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findInlineScripts(html) {
  return html.match(/<script(?![^>]*\bsrc=)(?![^>]*type=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi) || [];
}

function findUnsafeBlankLinks(html) {
  const links = html.match(/<a\b[^>]*\btarget=["']_blank["'][^>]*>/gi) || [];
  return links.filter((tag) => !/\brel=["'][^"']*\bnoopener\b/i.test(tag));
}

console.log('ok, site identity and extension CSP checks passed');
