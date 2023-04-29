
import * as _jsonwebtoken from "jsonwebtoken"
const jsonwebtoken = <any>_jsonwebtoken

import {
	sign as signType,
	verify as verifyType,
	SignOptions,
	VerifyOptions,
	Algorithm,
} from "jsonwebtoken"

const sign: typeof signType = jsonwebtoken.default.sign
const verify: typeof verifyType = jsonwebtoken.default.verify

export {
	sign,
	verify,
	Algorithm,
	SignOptions,
	VerifyOptions,
}
