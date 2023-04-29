
import {Suite, expect} from "cynic"
import * as base64 from "../../base64.js"

function loopback(s: string) {
	return base64.decode(base64.encode(s))
}

function urlLoopback(s: string) {
	return base64.url.decode(base64.url.encode(s))
}

function jsonLoopback(x: any) {
	const based = base64.url.encode(JSON.stringify(x))
	return JSON.parse(base64.url.decode(based))
}

export default <Suite>{
	"process basic string": async() => {
		const original = "hello, this is a test"
		return (true
			&& expect(loopback(original)).equals(original)
			&& expect(urlLoopback(original)).equals(original)
			&& expect(jsonLoopback(original)).equals(original)
		)
	},
	"process string which antagonizes reversed url encoding": async() => {
		const original = "hi?"
		return (true
			&& expect(loopback(original)).equals(original)
			&& expect(urlLoopback(original)).equals(original)
			&& expect(jsonLoopback(original)).equals(original)
		)
	},
}
