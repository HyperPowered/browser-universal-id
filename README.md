# Browser Universal ID (BUID)

Generate a unique token for a browser's current settings and check for significant changes between sessions.

## Get Started
```javascript
import {BrowserUniversalId} from "./src/index";

const result = await BrowserUniversalId.getBrowserFingerprint();
// dados utilizados para gerar o hash.
const data = result.data;
// este é o ID único deste navegador, você deve utilizar ele.
const buid = result.buid;
```