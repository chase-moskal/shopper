
import {Row, Table} from "../types.js"
import {memory} from "../drivers/memory.js"

export function fallback<xRow extends Row>({table, fallbackRows}: {
		table: Table<xRow>
		fallbackRows: xRow[]
	}): Table<xRow> {

	const {tables: {fallbackTable}} = memory<{fallbackTable: Row}>({
		shape: {fallbackTable: true},
	})

	let initialized = false
	async function initialize() {
		if (!initialized) {
			initialized = true
			await fallbackTable.create(...fallbackRows)
		}
	}

	return <Table<xRow>>{
		create: table.create,
		delete: table.delete,
		update: table.update,

		async read(options) {
			await initialize()
			const [fallbackRows, actualRows] = await Promise.all([
				fallbackTable.read(options),
				table.read(options),
			])
			return [...fallbackRows, ...actualRows]
		},

		async readOne(options) {
			await initialize()
			return (await table.readOne(options))
				?? (await fallbackTable.readOne(options))
		},

		async count(options) {
			await initialize()
			const [fallbackCount, actualCount] = await Promise.all([
				fallbackTable.count(options),
				table.count(options),
			])
			return fallbackCount + actualCount
		},
	}
}
