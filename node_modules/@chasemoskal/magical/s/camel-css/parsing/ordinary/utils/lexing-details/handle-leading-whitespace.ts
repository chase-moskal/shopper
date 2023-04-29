
import {Source} from "../../types.js"

const leadingWhitespaceRegex = /(\s*)/my

export function runLeadingWhitespaceRegex({source, index, setIndex}: {
		source: Source
		index: number
		setIndex: (newIndex: number) => void
	}) {

	leadingWhitespaceRegex.lastIndex = index

	const match = leadingWhitespaceRegex.exec(source.code)
	if (match)
		setIndex(leadingWhitespaceRegex.lastIndex)

	const [, whitespace = ""] = match ?? []
	return whitespace
}
