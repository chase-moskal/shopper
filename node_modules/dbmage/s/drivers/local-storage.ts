
import {flex} from "./flex.js"
import {Schema, SchemaToShape} from "../types.js"
import {simpleFlexStorage} from "../flex-storage/simple-flex-storage.js"

export function localStorage<xSchema extends Schema>({
		shape,
		makeTableName,
	}: {
		shape: SchemaToShape<xSchema>
		makeTableName?: (path: string[]) => string
	}) {

	return flex({
		shape,
		flexStorage: simpleFlexStorage(window.localStorage),
		makeTableName,
	})
}
