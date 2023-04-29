
import {VerifyToken} from "../types.js"
import {tokenDecode} from "../token-decode.js"

export const mockVerifyToken = (): VerifyToken => async<Payload extends {}>(
		token: string
	): Promise<Payload> => {
	const decoded = tokenDecode<Payload>(token)
	const expiry = decoded.data.exp * 1000
	if (Date.now() > expiry) throw new Error("token expired")
	return decoded.data.payload
}
