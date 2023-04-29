
import {obtain} from "../tools/obtain.js"
import {RowStorage} from "./flex/row-storage.js"
import {objectMap} from "../tools/object-map.js"
import {sequencer} from "../tools/sequencer/sequencer.js"
import {memoryTransaction} from "./flex/memory-transaction.js"
import {makeTableNameWithUnderscores} from "./utils/make-table-name-with-underscores.js"
import {Database, FlexStorage, Row, Schema, SchemaToShape, Shape, Table} from "../types.js"

export function flex<xSchema extends Schema>({
		shape,
		flexStorage,
		makeTableName = makeTableNameWithUnderscores,
	}: {
		flexStorage: FlexStorage
		shape: SchemaToShape<xSchema>
		makeTableName?: (path: string[]) => string
	}): Database<xSchema> {

	const rowStorage = new RowStorage(flexStorage)
	const safeMemoryTransaction = sequencer(memoryTransaction)

	return {

		tables: (() => {
			function recurse(innerShape: Shape, path: string[]): any {
				return objectMap(innerShape, (value, key) => {
					const currentPath = [...path, key]
					function prep(method: keyof Table<Row>) {
						return async(...args: any[]) => safeMemoryTransaction({
							shape,
							rowStorage,
							action: async({tables}) => (
								obtain<any>(tables, currentPath)[method](...args)
							),
							makeTableName,
						})
					}
					return typeof value === "boolean"
						? asTable({
							create: prep("create"),
							read: prep("read"),
							update: prep("update"),
							delete: prep("delete"),
							count: prep("count"),
							average: prep("average"),
							readOne: prep("readOne"),
						})
						: recurse(value, currentPath)
				})
			}
			return recurse(shape, [])
		})(),

		async transaction(action) {
			return safeMemoryTransaction({
				shape,
				rowStorage,
				action,
				makeTableName,
			})
		},
	}
}

function asTable<xTable extends Table<Row>>(table: xTable) {
	return table
}
