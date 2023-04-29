
import {BinaryToTextEncoding} from "crypto"
import {Algorithm} from "./internals/badmodules/jsonwebtoken.js"

//
// tokens
//

export interface TokenSettings {
	algorithm: Algorithm
}

export interface TokenHeader {
	alg: string
	typ: string
}

export interface TokenData<Payload> {
	iat: number
	exp: number
	payload: Payload
}

export interface TokenSignOptions<Payload> {
	payload: Payload
	lifespan: number
	privateKey: string
}

export interface TokenVerifyOptions {
	token: string
	publicKey: string
}

export type TokenSign = <Payload extends {}>(
	options: TokenSignOptions<Payload>
) => Promise<string>

export type TokenVerify = <Payload extends {}>(
	options: TokenVerifyOptions
) => Promise<Payload>

export type DecodedToken<Payload extends {}> = {
	header: TokenHeader
	data: TokenData<Payload>
}

export type TokenDecode = <Payload extends {}>(
	token: string
) => DecodedToken<Payload>

// curried

export type SignToken = <Payload extends {}>(options: {
	payload: Payload
	lifespan: number
}) => Promise<string>

export type VerifyToken = <Payload extends {}>(
	token: string
) => Promise<Payload>

//
// signatures
//

export interface SignatureSettings {
	algorithm: string
	format: BinaryToTextEncoding
}

export interface SignatureSignOptions extends Partial<SignatureSettings> {
	body: string
	privateKey: string
}

export interface SignatureVerifyOptions extends Partial<SignatureSettings> {
	body: string
	signature: string
	publicKey: string
}
