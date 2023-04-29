
import {createVerify} from "crypto"
import {SignatureVerifyOptions} from "./types.js"
import {defaultSignatureSettings} from "./internals/default-signature-settings.js"
import { RedcryptoRejectionError } from "./redcrypto-rejection-error.js"

export function signatureVerify(options: SignatureVerifyOptions): string {
	const {
		body,
		format,
		algorithm,
		signature,
		publicKey,
	} = {...defaultSignatureSettings, ...options}

	const verifier = createVerify(algorithm)
	verifier.write(body)
	verifier.end()

	try {
		const valid = verifier.verify(publicKey, signature, format)
		if (!valid)
			throw new RedcryptoRejectionError(`signature verification failed (${algorithm})`)
		return body
	}
	catch (error) {
		throw new RedcryptoRejectionError(`signature verification failed (${algorithm}): ${error.message}`)
	}
}
