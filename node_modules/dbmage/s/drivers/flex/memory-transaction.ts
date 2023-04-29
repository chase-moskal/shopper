
import {RowStorage} from "./row-storage.js"
import {applyOperation} from "./apply-operation.js"
import {objectMap, objectMap3} from "../../tools/object-map.js"
import {prefixFunctions} from "./prefix-functions.js"
import {rowVersusConditional} from "./memory-conditionals.js"
import {Action, Row, Shape, Table, Tables, Operation, RemoveIndex} from "../../types.js"

export async function memoryTransaction({
		shape, rowStorage, action, makeTableName,
	}: {
		shape: Shape
		rowStorage: RowStorage
		action: Action<Tables, any>
		makeTableName: (path: string[]) => string
	}) {

	const operations: Operation.Any[] = []

	const tables = (() => {
		function recurse(shape: Shape, path: string[]): Tables {
			return objectMap(shape, (value, key) => {
				const currentPath = [...path, key]
				const storageKey = makeTableName(currentPath)
				let cache: Row[] = undefined
				async function loadCacheOnce() {
					if (!cache)
						cache = await rowStorage.load(storageKey)
				}
				return typeof value === "boolean"
					? <Table<Row>>prefixFunctions(loadCacheOnce, <RemoveIndex<Table<Row>>>{
						async create(...rows) {
							const operation: Operation.OpCreate = {
								type: Operation.Type.Create,
								path: currentPath,
								rows,
							}
							cache = applyOperation({operation, rows: cache})
							operations.push(operation)
						},
						async read(o) {
							const rows = cache.filter(row => rowVersusConditional(row, o))
							const {order, offset = 0, limit = 1000} = o
							if (order) {
								for (const [key, value] of Object.entries(order)) {
									rows.sort((a, b) =>
										value === "ascend"
											? a[key] > b[key] ? 1 : -1
											: a[key] > b[key] ? -1 : 1
									)
								}
							}
							return rows.slice(offset, offset + limit)
						},
						async update(o) {
							const operation: Operation.OpUpdate = {
								type: Operation.Type.Update,
								path: currentPath,
								update: o,
							}
							cache = applyOperation({operation, rows: cache})
							operations.push(operation)
						},
						async delete(o) {
							const operation: Operation.OpDelete = {
								type: Operation.Type.Delete,
								path: currentPath,
								conditional: o,
							}
							cache = applyOperation({operation, rows: cache})
							operations.push(operation)
						},
						async count(o) {
							const rows = cache.filter(row => rowVersusConditional(row, o))
							return rows.length
						},
						async average({fields, ...o}) {
							const rows = cache.filter(row => rowVersusConditional(row, o))
							return objectMap3(fields, (x, key) => {
								let sum = 0
								let total = 0
								for (const row of rows) {
									const value = row[key]
									if (typeof value === "number" && !isNaN(value)) {
										sum += value
										total += 1
									}
								}
								return total > 0
									? sum / total
									: 0
							})
						},
						async readOne(o) {
							return cache.find(row => rowVersusConditional(row, o))
						},
					})
					: recurse(value, currentPath)
			})
		}
		return recurse(shape, [])
	})()

	let aborted = false
	const result = await action({
		tables,
		async abort() {
			aborted = true
		},
	})

	if (!aborted) {
		const loadedRows = new Map<string, Row[]>()
		for (const {path} of operations) {
			const storageKey = makeTableName(path)
			const rows = await rowStorage.load(storageKey)
			loadedRows.set(storageKey, rows)
		}
		for (const operation of operations) {
			const storageKey = makeTableName(operation.path)
			const rows = loadedRows.get(storageKey)
			const modifiedRows = applyOperation({operation, rows})
			loadedRows.set(storageKey, modifiedRows)
		}
		for (const [storageKey, rows] of loadedRows.entries()) {
			await rowStorage.save(storageKey, rows)
		}
	}

	return result
}
