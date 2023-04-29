
import {Suite} from "cynic"
import {read} from "../toolbox/read.js"

import base64Suite from "./base64.test.js"
import {prepareTokenTestingSuite} from "./token.test.js"
import {prepareMocksTestingSuite} from "./mocks.test.js"
import {prepareSignatureTestingSuite} from "./signature.test.js"

export default <Suite>(async(): Promise<Suite> => {
	const body = "testbodylol"
	const payload = {a: true, b: 2}
	const publicKey = await read("public.pem")
	const privateKey = await read("private.pem")

	return {
		"signatures": prepareSignatureTestingSuite({
			body,
			publicKey,
			privateKey,
		}),
		"tokens": prepareTokenTestingSuite({
			payload,
			publicKey,
			privateKey,
		}),
		"mocks": prepareMocksTestingSuite(),
		"base64": base64Suite,
	}
})
