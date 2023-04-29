
# 🛡️ redcrypto

### asymmetric crypto for modern web apps

- 📦 `npm install redcrypto`
- 🎟️ json web tokens with rsa256
- 🖋️ digital signatures, default rsa256
- ✨ modern typescript + esm

## tokens

functions that work on a node server
- ```typescript
  import {tokenSign} from "redcrypto/x/token-sign.js"

  void async function main() {
    const token = await tokenSign({
      payload: {whatever: "lol this message is authentic"},
      privateKey: "<your private pem key goes here>",
      lifespan: 1000 * 60 * 60 * 24,
    })
  }()
  ```
- ```typescript
  import {tokenVerify} from "redcrypto/x/token-verify.js"

  void async function main() {

    // will throw error if token sucks
    const payload = await tokenVerify({
      token: "<your token goes here>",
      publicKey: "<your public pem key goes here>",
    })
  }()
  ```

functions that work anywhere, including in-browser
- ```typescript
  import {tokenDecode} from "redcrypto/x/token-decode.js"

  // does not verify authenticity,
  // just unpacks the token
  const {header, data: {payload}} = tokenDecode("<your token goes here>")
  ```

## signatures

functions that work on a node server
- ```typescript
  import {signatureSign} from "redcrypto/x/signature-sign.js"

  void async function main() {
    const signature = signatureSign({
      body: "lol this message is authentic",
      privateKey: "<your private pem key goes here>",
    })
  }()
  ```
- ```typescript
  import {signatureVerify} from "redcrypto/x/signature-verify.js"

  void async function main() {

    // will throw if signature sucks
    const body = signatureVerify({
      body: "lol this message is authentic",
      signature: "<your generated signature here>",
      publicKey: "<your public pem key goes here>",
    })
  }()
  ```
