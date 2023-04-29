
import {Source} from "../../types.js"

export function runTokenRegex({
		source, regex, index, setIndex,
	}: {
		source: Source
		regex: RegExp
		index: number
		setIndex: (newIndex: number) => void
	}) {

	regex.lastIndex = index
	const match = regex.exec(source.code)
	if (match)
		setIndex(regex.lastIndex)
	return match
}
