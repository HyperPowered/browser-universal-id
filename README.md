# Browser Universal ID (BUID)

Generate a unique token for a browser's current settings and check for significant changes between sessions.

> **IMPORTANTE:** o **BUID** em suma é um fingerprint do navegador e das configurações do dispositivo, o que pode levar
> a sua aplicação a se encaixar em outras regras de privacidade a depender da região. Portanto antes de adicionar o
> BUID, confirme que sua política de privacidade inclui esclarecimentos claros sobre o seu uso do **BUID** e de suas
> finalidades.
## Get Started

```javascript
import {BrowserUniversalId} from "./src/index";

const result = await BrowserUniversalId.getBrowserFingerprint();
// dados utilizados para gerar o hash.
const data = result.data;
// este é o ID único deste navegador, você deve utilizar ele.
const buid = result.buid;
```