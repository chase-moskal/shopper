
import {Token, MakeTrace, Lexer} from "../types.js"
import {runTokenRegex} from "./lexing-details/run-token-regex.js"
import {runLeadingWhitespaceRegex} from "./lexing-details/handle-leading-whitespace.js"
import {defineMakeTraceFunction} from "./lexing-details/define-make-trace-function.js"

export function makeLexer<xToken extends Token.Any>(
		regex: RegExp,
		readToken: (match: RegExpMatchArray, makeTrace: MakeTrace) => Token.Any,
	): Lexer<xToken> {

	return <Lexer<xToken>>((source, cursor) => {
		let index = cursor.index
		const setIndex = (newIndex: number) => index = newIndex

		const leadingWhitespace = runLeadingWhitespaceRegex({
			source, index, setIndex,
		})

		const match = runTokenRegex({
			source, regex, index, setIndex,
		})

		return match
			? {
				newIndex: index,
				token: readToken(
					match,
					defineMakeTraceFunction({index, cursor, leadingWhitespace}),
				)
			}
			: undefined
	})
}
