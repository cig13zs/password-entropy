# Password Entropy | Character-Pool Strength

> Calculate a character-pool password entropy estimate in bits from password length and character variety, then view a strength band. Everything runs locally. The score does not predict real-world cracking time.

[![Live Web App](https://img.shields.io/badge/Web_App-Live_Demo-3B82F6?style=flat-square)](https://cig13zs.github.io/password-entropy/)
[![Chrome Extension](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-10B981?style=flat-square)](https://github.com/cig13zs/password-entropy/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Zero Telemetry](https://img.shields.io/badge/Telemetry-Zero_Tracking-success?style=flat-square)](https://github.com/cig13zs)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-buy_me_a_coffee-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/jju1s)

---

## Features

- **Bit-level score:** Uses `length x log2(character pool size)` to produce a one-decimal bit score.
- **Strength bands:** Maps the score to Very Weak, Weak, Moderate, Strong, or Very Strong.
- **Pattern warnings:** Flags a small set of obvious repeated, common, keyboard, and sequence patterns.
- **Local and offline:** The password stays in the browser or extension runtime. No password text is uploaded.
- **Web app and extension:** Use the standalone page or load the `extension/` folder in Chrome.
- **Tests:** Run the Node.js unit and page checks locally.

## How it works

The calculator builds a character pool from the classes present in the password: 26 lowercase letters, 26 uppercase letters, 10 digits, and 33 other ASCII characters. It then calculates `length x log2(character pool size)` and maps that result to a strength band.

The formula assumes that every character in the detected pool is equally likely. Passwords chosen by people often contain words, repetitions, sequences, or patterns, so the result is a character-pool estimate and upper bound. It is not measured entropy and does not predict real-world cracking time.

The checker also reports a few obvious local patterns. Those warnings are hints for review, not a complete password audit.

## Install the extension

1. Download or clone this repository:
   ```bash
   git clone https://github.com/cig13zs/password-entropy.git
   ```
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right toggle.
4. Click **Load unpacked** and select the `extension/` folder inside this repository.
5. The extension will be available in your browser toolbar and will work offline.

## Run the tests

```bash
node core.test.js
node site.test.js
```

## FAQ

### What does the bit score mean?

It is the character-pool estimate described above. The score is based on password length and the character classes detected in the input. It is an upper bound under a uniform-random selection assumption, not measured entropy.

### Does this predict real-world cracking time?

No. The tool reports a bit score, a strength band, and a few local pattern warnings. It does not model password choice, breach data, dictionaries, hash algorithms, attacker hardware, rate limits, or attack strategy, so it does not provide a crack-time forecast.

### Is my data uploaded to any server?

No. The calculation runs locally inside your browser memory or extension sandbox. Password text is not sent to a server, and the project includes no analytics or tracking scripts.

### Can I use the core library in Node.js or JavaScript projects?

Yes. The core engine in `core.js` is exported as a standard Universal Module Definition (UMD), compatible with Node.js `require()`, ES modules, and browser `<script>` tags:

```javascript
const engine = require('./core');
// Use the core functions directly in your project
```

## License and support

- **Author:** [jju1s](https://github.com/cig13zs)
- **License:** [MIT License](LICENSE)
- **Support:** If this tool saves you time, support development at [ko-fi.com/jju1s](https://ko-fi.com/jju1s).
