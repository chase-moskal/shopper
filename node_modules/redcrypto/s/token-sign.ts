
import {TokenSignOptions, TokenSign} from "./types.js"
import {tokenSettings} from "./internals/token-settings.js"
import * as jwt from "./internals/badmodules/jsonwebtoken.js"

export const tokenSign: TokenSign = async function<Payload>({
		payload, lifespan, privateKey,
	}: TokenSignOptions<Payload>): Promise<string> {

	const data: {payload: Payload} = {payload}
	const signOptions: jwt.SignOptions = {
		algorithm: tokenSettings.algorithm,
		expiresIn: lifespan / 1000,
	}

	return new Promise<string>((resolve, reject) => {
		jwt.sign(
			data,
			privateKey,
			signOptions,
			(error, token) => {
				if (error) reject(error)
				else resolve(token)
			}
		)
	})
}
