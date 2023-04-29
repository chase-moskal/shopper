
import {Cursor, MakeTrace} from "../../types.js"
import {updateCursor} from "../update-cursor.js"

export function defineMakeTraceFunction({index, cursor, leadingWhitespace}: {
		index: number
		cursor: Cursor
		leadingWhitespace: string
	}): MakeTrace {

	return (valueLength?) => {
		const subcursor = updateCursor(
			leadingWhitespace,
			cursor,
			cursor.index + leadingWhitespace.length
		)
		return {
			cursor: subcursor,
			length: valueLength ?? (index - subcursor.index),
		}
	}
}
