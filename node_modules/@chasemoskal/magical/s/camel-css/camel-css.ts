
import {compile} from "./compilation/compile.js"
import {parse} from "./parsing/ordinary/parse.js"
import {tokenize} from "./parsing/ordinary/tokenize.js"

export function camelCss(input: string) {
	const tokens = tokenize(input)
	const expressions = parse(tokens)
	return [...compile(expressions)].join("")
}

export function css(
		strings: TemplateStringsArray,
		...values: any[]
	): string {

	const input = Array.from(strings).reduce(
		(previous, current, index) =>
			previous + current + (values[index] ?? ""),
		""
	)

	return camelCss(input)
}
