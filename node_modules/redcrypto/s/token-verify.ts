
import {tokenDecode} from "./token-decode.js"
import {tokenSettings} from "./internals/token-settings.js"
import * as jwt from "./internals/badmodules/jsonwebtoken.js"
import {TokenData, TokenVerifyOptions, TokenVerify} from "./types.js"
import {RedcryptoRejectionError} from "./redcrypto-rejection-error.js"

export const tokenVerify: TokenVerify = async function verify<Payload>({
		token,
		publicKey,
	}: TokenVerifyOptions): Promise<Payload> {

	const decoded = tokenDecode(token)
	if (decoded.header.typ !== "JWT") throw new RedcryptoRejectionError(`token verification failed, unknown token type "${decoded.header.typ}"`)
	if (decoded.header.alg !== tokenSettings.algorithm) throw new RedcryptoRejectionError(`token verification failed, "${decoded.header.alg}" algorithm not allowed (expected "${tokenSettings.algorithm}")`)
	if (!decoded.data.payload) throw new RedcryptoRejectionError(`token verification failed, no token payload object`)

	try {
		const {payload} = await new Promise<TokenData<Payload>>((resolve, reject) => {
			jwt.verify(token, publicKey, (error, data: TokenData<Payload>) => {
				if (error) reject(error)
				else resolve(data)
			})
		})
		return payload
	}
	catch (error) {
		throw new RedcryptoRejectionError(`token verification failed, ${error.message}`)
	}
}
