
import {Cursor, Source} from "../types.js"

export function updateCursor(
		part: string,
		cursor: Cursor,
		newIndex: number,
	) {

	const linebreaks = (/\n/g.exec(part) ?? []).length
	const line = cursor.line + linebreaks
	let column = 0

	if (linebreaks > 0) {
		const [,lastLine] = /\n(.*)$/.exec(part) ?? []
		column = 1 + lastLine.length
	}
	else
		column = cursor.column + (newIndex - cursor.index)

	return {
		line,
		column,
		index: newIndex,
	}
}
