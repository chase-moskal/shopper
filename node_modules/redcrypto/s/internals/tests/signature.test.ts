
import {Suite, expect} from "cynic"
import {signatureSign} from "../../signature-sign.js"
import {signatureVerify} from "../../signature-verify.js"

export const prepareSignatureTestingSuite = ({
	body,
	publicKey,
	privateKey,
}: {
	body: string
	publicKey: string
	privateKey: string
}): Suite => ({

	"can sign and verify data": async() => {
		const signature = signatureSign({body, privateKey})
		const body2 = signatureVerify({
			body,
			signature,
			publicKey,
		})
		expect(body2).equals(body)
	},

	"can detect tampered data": async() => {
		const signature = signatureSign({body, privateKey})
		expect(() => signatureVerify({
			body: body + "2",
			signature,
			publicKey,
		})).throws()
	},

	"can detect invalid signature": async() => {
		const signature = signatureSign({body, privateKey})
		const valid = 
		expect(() => signatureVerify({
			body,
			signature: signature.slice(1),
			publicKey,
		})).throws()
	},

	"throws on invalid public key": async() => {
		const signature = signatureSign({body, privateKey})
		expect(() => signatureVerify({
			body,
			signature,
			publicKey: publicKey.slice(1),
		})).throws()
	}
})
