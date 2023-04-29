
import {lexers} from "./lexers.js"
import {Cursor, Source, Token} from "./types.js"
import {updateCursor} from "./utils/update-cursor.js"

export function* tokenize(code: string) {
	const source: Source = {code}
	let done = false
	let cursor: Cursor = {
		index: 0,
		line: 1,
		column: 1,
	}

	while (!done) {
		let token: undefined | Token.Any

		for (const lexer of Object.values(lexers)) {
			let result = lexer(source, cursor)
			if (result) {
				token = result.token
				cursor = updateCursor(
					source.code.slice(cursor.index, result.newIndex),
					cursor,
					result.newIndex,
				)
				break
			}
		}

		if (token)
			yield token
		else
			done = true
	}
}
