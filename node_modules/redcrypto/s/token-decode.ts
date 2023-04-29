
import * as base64 from "./base64.js"
import {DecodedToken, TokenDecode} from "./types.js"

export const tokenDecode: TokenDecode = function decode<Payload>(
		token: string
	): DecodedToken<Payload> {

	const [headerPart, dataPart] = token.split(".")
	const header = decodePart(headerPart)
	const data = decodePart(dataPart)
	return {header, data}
}

function decodePart(part: string) {
	return JSON.parse(
		decodeURIComponent(
			base64.url.decode(part)
				.split("")
				.map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
				.join("")
		)
	)
}
