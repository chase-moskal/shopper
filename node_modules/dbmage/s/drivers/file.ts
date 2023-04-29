
import {flex} from "./flex.js"
import {Schema, SchemaToShape} from "../types.js"
import {nodeFileFlexStorage} from "../flex-storage/node-file-flex-storage.js"

export function file<xSchema extends Schema>({
		path,
		shape,
		makeTableName,
	}: {
		path: string
		shape: SchemaToShape<xSchema>
		makeTableName?: (path: string[]) => string
	}) {

	return flex({
		shape,
		flexStorage: nodeFileFlexStorage(path),
		makeTableName,
	})
}
