
const browser: boolean = typeof atob === "function"

export function encode(text: string): string {
	return browser
		? btoa(text)
		: Buffer.from(text).toString("base64")
}

export function decode(base64: string): string {
	return browser
		? atob(base64)
		: Buffer.from(base64, "base64").toString("binary")
}

export const url = Object.freeze({

	encode: (text: string): string => {
		const base64 = encode(text)
		const base64url = addEqualsPadding(
			base64
				.replace(/=/g, "")
				.replace(/\+/g, "-")
				.replace(/\//g, "_")
		)
		return base64url
	},

	decode: (base64url: string) => {
		const base64 = base64url
			.replace(/-/g, "+")
			.replace(/_/g, "/")
		return decode(base64)
	},
})

function addEqualsPadding(base64: string) {
	return base64 + Array((4 - base64.length % 4) % 4 + 1).join("=")
}
