
import {VerifyToken} from "../types.js"
import {tokenVerify} from "../token-verify.js"

export function curryVerifyToken(publicKey: string): VerifyToken {
	return async<Payload extends {}>(token: string): Promise<Payload> =>
		tokenVerify<Payload>({token, publicKey})
}
