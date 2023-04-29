
import {createSign} from "crypto"
import {SignatureSignOptions} from "./types.js"

import {defaultSignatureSettings}
	from "./internals/default-signature-settings.js"

export function signatureSign(options: SignatureSignOptions): string {
	const {
		body,
		format,
		algorithm,
		privateKey,
	} = {...defaultSignatureSettings, ...options}

	const signer = createSign(algorithm)
	signer.write(body)
	signer.end()

	return signer.sign(privateKey, format)
}
