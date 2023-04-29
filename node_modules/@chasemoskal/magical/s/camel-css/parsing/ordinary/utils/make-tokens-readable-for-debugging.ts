
import {Token} from "../types.js"

export function makeTokensReadableForDebugging(tokens: Token.Any[]) {
	return tokens
		.map(token => {
			const {line, column} = token.trace.cursor
			const value = (<any>token).value ?? undefined
			return `(${Token.Type[token.type]}${value ? " " + value : ""} (${line}:${column}))`
		})
		.join("\n")
}
