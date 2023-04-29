
import {flex} from "./flex.js"
import {Schema, SchemaToShape} from "../types.js"
import {memoryFlexStorage} from "../flex-storage/memory-flex-storage.js"

export function memory<xSchema extends Schema>({
		shape,
		makeTableName,
	}: {
		shape: SchemaToShape<xSchema>
		makeTableName?: (path: string[]) => string
	}) {

	return flex({
		shape,
		flexStorage: memoryFlexStorage(),
		makeTableName,
	})
}
