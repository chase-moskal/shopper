
import {Suite, expect, assert} from "cynic"

import sequencer from "./tools/sequencer/sequencer.test.js"

import {Id} from "./id.js"
import * as dbmage from "./dbmage.js"
import {and, find, or} from "./helpers.js"
import {fallback} from "./handy/fallback.js"
import {getRando} from "./rando/get-rando.js"
import {constrain} from "./handy/constraints.js"
import {FlexStorage, Row, SchemaToShape, Table} from "./types.js"
import {memoryFlexStorage} from "./flex-storage/memory-flex-storage.js"
import {makeTableNameWithUnderscores} from "./drivers/utils/make-table-name-with-underscores.js"

type DemoUser = {
	userId: string
	balance: number
	location: string
}

type DemoSchema = {
	users: DemoUser
}

const demoShape: SchemaToShape<DemoSchema> = {
	users: true
}

async function setupThreeUserDatabase() {
	const database = dbmage.memory<DemoSchema>({shape: demoShape})
	await Promise.all([
		database.tables.users.create({userId: "u123", balance: 100, location: "america"}),
		database.tables.users.create({userId: "u124", balance: 0, location: "canada"}),
		database.tables.users.create({userId: "u125", balance: -100, location: "canada"}),
	])
	return database
}

async function setupThreeUserDemo() {
	return (await setupThreeUserDatabase()).tables
}

export default <Suite>{
	"id": async() => {
		const rando = await getRando()
		return {
			"many ids survive encode-decode-encode": async() => {
				for (let i = 0; i < 1000; i++) {
					const id = rando.randomId()
					const id_binary = id.toBinary()
					const id_string = id.toString()
					const id_back_from_binary = new Id(id_binary)
					const id_back_from_string = Id.fromString(id_string)
					expect(id_string).equals(id_back_from_binary.toString())
					expect(id_string).equals(id_back_from_string.toString())
				}
			},
			"ids can be compared with equals": async() => {
				const id = rando.randomId()
				const id2 = Id.fromString(id.toString())
				expect(id.equals(id2)).equals(true)
				expect(id.equals(id.toString())).equals(true)
			},
		}
	},
	sequencer,
	"flex database basics": {
		"create rows and read 'em back unconditionally": async() => {
			const tables = await setupThreeUserDemo()
			const rows = await tables.users.read({conditions: false})
			return expect(rows.length).equals(3)
		},
		"empty and/or conditions explode": async() => {
			const {users} = await setupThreeUserDemo()
			await expect(async() => users.read({conditions: and()})).throws()
			await expect(async() => users.read({conditions: or()})).throws()
		},
		"read one": async() => {
			const {users} = await setupThreeUserDemo()
			expect(
				await users.readOne({conditions: and({equal: {userId: "u123"}})})
			).ok()
		},
		"ignore undefined conditions": async() => {
			const {users} = await setupThreeUserDemo()
			const result = await users.readOne({conditions: and({equal: {userId: "u123"}}, undefined)})
			expect(result.userId).equals("u123")
		},
		"read one with not set condition": async() => {
			const {users} = await setupThreeUserDemo()
			await users.create({userId: "u999", balance: 1, location: undefined})
			return expect(
				(await users.readOne({
					conditions: and({notSet: {location: true}})
				})).userId
			).equals("u999")
		},
		"read sorting via order": async() => {
			const {users} = await setupThreeUserDemo()
			const result1 = await users.read({conditions: false, order: {balance: "ascend"}})
			const result2 = await users.read({conditions: false, order: {balance: "descend"}})
			return expect(result1[0].balance).equals(-100)
				&& expect(result2[0].balance).equals(100)
		},
		"read pagination, limit and offset": async() => {
			const {users} = await setupThreeUserDemo()
			const result1 = await users.read({conditions: false, limit: 2})
			const result2 = await users.read({conditions: false, limit: 2, offset: 1})
			return expect(result1.length).equals(2)
				&& expect(result2[0].userId).equals("u124")
		},
		"read with single conditions": async() => {
			const {users} = await setupThreeUserDemo()
			return (true
				&& expect([
						...await users.read({conditions: and({equal: {userId: "u123"}})}),
						...await users.read({conditions: and({equal: {userId: "u124"}})}),
						...await users.read({conditions: and({equal: {userId: "u125"}})}),
					].length).equals(3)
				&& expect((
						await users.read({conditions: and({
							greater: {balance: 50},
							equal: {location: "america"},
						})})
					).length).equals(1)
				&& expect((
						await users.read({conditions: and({
							notEqual: {location: "america"}
						})})
					).length).equals(2)
				&& expect((
						await users.read({conditions: and({less: {balance: 50}})})
					).length).equals(2)
				&& expect((
						await users.read({conditions: and({search: {location: "can"}})})
					).length).equals(2)
				&& expect((
						await users.read({conditions: and({search: {location: /can/}})})
					).length).equals(2)
			)
		},
		"read with multiple conditions": async() => {
			const {users} = await setupThreeUserDemo()
			return (true
				&& expect(
					(await users.read({
						conditions: and(
							{less: {balance: 200}},
							{equal: {location: "canada"}},
						)
					})).length
				).equals(2)
				&& expect(
					(await users.read({
						conditions: or(
							{less: {balance: 50}},
							{equal: {location: "america"}},
						)
					})).length
				).equals(3)
				&& expect(
					(await users.read({
						conditions: or(
							and(
								{less: {balance: 50}},
								{equal: {location: "canada"}},
							),
							{equal: {location: "greenland"}},
						)
					})).length
				).equals(2)
			)
		},
		"delete a row and it's gone": async() => {
			const {users} = await setupThreeUserDemo()
			await users.delete({conditions: and({equal: {userId: "u123"}})})
			const rows = await users.read({conditions: false})
			return expect(rows.length).equals(2)
		},
		"update write to a row": async() => {
			const {users} = await setupThreeUserDemo()
			await users.update({
				conditions: and({equal: {userId: "u123"}}),
				write: {location: "argentina"},
			})
			const user = await users.readOne({conditions: and({equal: {userId: "u123"}})})
			return (true
				&& expect(user.location).equals("argentina")
				&& expect(user.balance).equals(100)
			)
		},
		"update whole row": async() => {
			const {users} = await setupThreeUserDemo()
			const userId = "u123"
			await users.update({
				conditions: and({equal: {userId}}),
				whole: {userId, balance: 50, location: "argentina"},
			})
			const user = await users.readOne({conditions: and({equal: {userId}})})
			return (true
				&& expect(user.location).equals("argentina")
				&& expect(user.balance).equals(50)
			)
		},
		"update upsert can update or insert": async() => {
			const {users} = await setupThreeUserDemo()
			await Promise.all([
				users.update({
					conditions: and({equal: {userId: "u123"}}),
					upsert: {
						userId: "u123",
						balance: 500,
						location: "america",
					},
				}),
				users.update({
					conditions: and({equal: {userId: "u126"}}),
					upsert: {
						userId: "u126",
						balance: 1000,
						location: "argentina",
					},
				}),
			])
			const america = await users.readOne({conditions: and({equal: {userId: "u123"}})})
			const argentina = await users.readOne({conditions: and({equal: {userId: "u126"}})})
			return (true
				&& expect(america.balance).equals(500)
				&& expect(argentina.balance).equals(1000)
			)
		},
		"count rows with conditions": async() => {
			const {users} = await setupThreeUserDemo()
			const countAll = await users.count({conditions: false})
			const countCanadians = await users.count({conditions: and({equal: {location: "canada"}})})
			return (true
				&& expect(countAll).equals(3)
				&& expect(countCanadians).equals(2)
			)
		},
		"save and load ids": async() => {
			const rando = await getRando()
			const {tables: {table}} = dbmage.memory<{table: {id: Id, a: number}}>({shape: {table: true}})
			const a1 = {id: rando.randomId(), a: 1}
			const a2 = {id: rando.randomId(), a: 2}
			await table.create(a1)
			await table.create(a2)
			const b1 = await table.readOne(find({id: a1.id}))
			// const all = await table.read({conditions: false})
			expect(b1.a).equals(1)
			assert(b1.id instanceof Id, "recovered id is instance")
		},
		"average": {
			async "can find average of a numerical field"() {
				type ExampleSchema = {data: {alpha: number, bravo: number}}
				const database = dbmage.memory<ExampleSchema>({shape: {data: true}})
				await Promise.all([
					database.tables.data.create(
						{alpha: 3, bravo: 1},
						{alpha: 4, bravo: 1},
						{alpha: 6, bravo: 1},
						{alpha: 7, bravo: 1},
					)
				])
				const averages = await database.tables.data.average({
					fields: {alpha: true},
					conditions: false,
				})
				expect(averages.alpha).ok()
				expect(averages.alpha).equals(5)
				expect((averages as any).bravo).not.ok()
			},
			async "can find average of multiple numerical fields"() {
				type ExampleSchema = {data: {alpha: number, bravo: number}}
				const database = dbmage.memory<ExampleSchema>({shape: {data: true}})
				await Promise.all([
					database.tables.data.create(
						{alpha: 3, bravo: 8},
						{alpha: 4, bravo: 9},
						{alpha: 6, bravo: 11},
						{alpha: 7, bravo: 12},
					)
				])
				const averages = await database.tables.data.average({
					fields: {alpha: true, bravo: true},
					conditions: false,
				})
				expect(averages.alpha).ok()
				expect(averages.alpha).equals(5)
				expect(averages.bravo).ok()
				expect(averages.bravo).equals(10)
			},
			async "can find average, even when some records are void"() {
				type ExampleSchema = {data: {alpha: number, bravo: number}}
				const database = dbmage.memory<ExampleSchema>({shape: {data: true}})
				await Promise.all([
					database.tables.data.create(
						{alpha: 3, bravo: null},
						{alpha: undefined, bravo: 9},
						{alpha: undefined, bravo: 11},
						{alpha: 7, bravo: null},
					)
				])
				const averages = await database.tables.data.average({
					fields: {alpha: true, bravo: true},
					conditions: false,
				})
				expect(averages.alpha).ok()
				expect(averages.alpha).equals(5)
				expect(averages.bravo).ok()
				expect(averages.bravo).equals(10)
			},
			async "average returns zero when there are no records"() {
				type ExampleSchema = {data: {alpha: number, bravo: number}}
				const database = dbmage.memory<ExampleSchema>({shape: {data: true}})
				const averages = await database.tables.data.average({
					fields: {alpha: true},
					conditions: false,
				})
				expect(averages.alpha).equals(0)
			},
			async "can average rows with conditions"() {
				type ExampleSchema = {data: {alpha: number, bravo: number}}
				const database = dbmage.memory<ExampleSchema>({shape: {data: true}})
				await Promise.all([
					database.tables.data.create(
						{alpha: 3, bravo: 1},
						{alpha: 4, bravo: 1},
						{alpha: 6, bravo: 1},
						{alpha: 7, bravo: 1},
						{alpha: 8, bravo: 0},
						{alpha: 9, bravo: 0},
					)
				])
				const averages = await database.tables.data.average({
					fields: {alpha: true},
					conditions: dbmage.and({equal: {bravo: 1}}),
				})
				expect(averages.alpha).ok()
				expect(averages.alpha).equals(5)
			},
		},
	},
	"storage": {
		async "storage keys represent full path to tables"() {
			let keyThatWasWrittenTo: string = "nope"
			const storage = memoryFlexStorage()
			const storageSpy: FlexStorage = {...storage, async write(key, data) {
				keyThatWasWrittenTo = key
				return storage.write(key, data)
			}}
			const {tables} = dbmage.flex<{
				alpha: {
					bravo: {
						charlie: {x: string}
					}
				}
			}>({
				flexStorage: storageSpy,
				shape: {alpha: {bravo: {charlie: true}},
			}})
			await tables.alpha.bravo.charlie.create({x: "abc"})
			expect(keyThatWasWrittenTo).equals(makeTableNameWithUnderscores(["alpha", "bravo", "charlie"]))
		},
	},
	"flex database transactions": {
		"update transaction works": async() => {
			const database = await setupThreeUserDatabase()
			await database.transaction(async({tables, abort}) => {
				await tables.users.update({
					conditions: and({equal: {userId: "u123"}}),
					write: {location: "argentina"},
				})
			})
			const row = await database.tables.users
				.readOne({conditions: and({equal: {userId: "u123"}})})
			expect(row.location).equals("argentina")
		},
		"transaction can return an arbitrary result": async() => {
			const database = await setupThreeUserDatabase()
			const result = await database.transaction(async({tables, abort}) => {
				await tables.users.update({
					conditions: and({equal: {userId: "u123"}}),
					write: {location: "argentina"},
				})
				return "abc"
			})
			const row = await database.tables.users
				.readOne({conditions: and({equal: {userId: "u123"}})})
			expect(row.location).equals("argentina")
			expect(result).equals("abc")
		},
		"aborted transaction is rolled back": async() => {
			const database = await setupThreeUserDatabase()
			await database.transaction(async({tables, abort}) => {
				await tables.users.update({
					conditions: and({equal: {userId: "u123"}}),
					write: {location: "argentina"},
				})
				await abort()
			})
			const row = await database.tables.users
				.readOne({conditions: and({equal: {userId: "u123"}})})
			expect(row.location).equals("america")
		},
		"updates are realized in-transaction": async() => {
			const database = await setupThreeUserDatabase()
			await database.transaction(async({tables, abort}) => {
				await tables.users.update({
					conditions: and({equal: {userId: "u123"}}),
					write: {location: "argentina"},
				})
				const row = await tables.users
					.readOne({conditions: and({equal: {userId: "u123"}})})
				expect(row.location).equals("argentina")
			})
		},
		"subsequent transaction reads fresh data": async() => {
			const database = await setupThreeUserDatabase()
			await database.transaction(async({tables}) => {
				await tables.users.update({
					conditions: and({equal: {userId: "u123"}}),
					write: {location: "afghanistan"},
				})
			})
			const row = await database.transaction(async({tables}) => {
				return tables.users.readOne({
					conditions: and({equal: {userId: "u123"}})
				})
			})
			expect(row.location).equals("afghanistan")
		}
	},
	"fallback": {
		"read": async() => {
			const {users} = await setupThreeUserDemo()
			const combinedTable = fallback({
				table: users,
				fallbackRows: [{userId: "u92", balance: 92, location: "victoria"}],
			})
			const result01 = await combinedTable.read({conditions: false})
			const result02 = await combinedTable.read(find({userId: "u92"}))
			expect(result01.length).equals(4)
			expect(result02.length).equals(1)
		},
	},
	"constraint": async() => {
		function constrainAppTable<xTable extends Table<Row>>(
				table: xTable,
				appId: string,
			) {
			return constrain<{appId: string}, xTable>({
				table,
				constraint: {appId},
			})
		}
		return {
			"read all rows from constrained table": async() => {
				const {tables: {users}} = dbmage.memory<DemoSchema>({shape: demoShape})
				const alpha = constrainAppTable(users, "a1")
				await alpha.create(
					{userId: "u1", balance: 101, location: "canada"},
					{userId: "u2", balance: 102, location: "america"},
				)
				const results = await alpha.read({conditions: false})
				expect(results.length).equals(2)
			},
			"constrained unconditional reading table doesn't bleed outside rows": async() => {
				const {tables: {users}} = dbmage.memory<DemoSchema>({shape: demoShape})
				const a1 = constrainAppTable(users, "a1")
				const a2 = constrainAppTable(users, "a2")
				await a1.create(
					{userId: "u1", balance: 101, location: "canada"},
					{userId: "u2", balance: 102, location: "america"},
				)
				await a2.create(
					{userId: "u3", balance: 103, location: "finland"},
					{userId: "u4", balance: 104, location: "norway"},
				)
				const results = await a1.read({conditions: false})
				expect(results.length).equals(2)
			},
			"apply app id constraint": async() => {
				const {tables: {users}} = dbmage.memory<DemoSchema>({shape: demoShape})
				const a1 = constrainAppTable(users, "a1")
				const a2 = constrainAppTable(users, "a2")
				await a1.create({userId: "u1", balance: 100, location: "america"})
				await a2.create({userId: "u2", balance: 100, location: "canada"})
				await a2.delete(find({userId: "u1"}))
				let failed = false
				try {
					await a1.update({...find({location: "canada"}), write: {balance: 99}})
				}
				catch (error) {
					failed = true
				}
				const userRows = await users.read({conditions: false})
				const canadian = await users.readOne(find({location: "canada"}))
				return expect(userRows.length).equals(2)
					&& expect(canadian.balance).equals(100)
					&& expect(failed).ok()
			},
		}
	},
	"subsection": {
		async "basic database subsection is readable"() {
			const database = dbmage.memory<{
				layer1: {
					layer2: {
						loltable: {n: number}
					},
				}
			}>({shape: {
				layer1: {
					layer2: {
						loltable: true,
					},
				},
			}})
			await database.tables.layer1.layer2.loltable.create(
				{n: 1},
				{n: 2},
				{n: 3},
			)
			const layer2 = dbmage.subsection(database, tables => {
				return tables.layer1.layer2
			})
			const rows = await layer2.tables.loltable.read({conditions: false})
			expect(rows.length).equals(3)
		},
		async "data written within subsection is readable outside"() {
			const database = dbmage.memory<{
				layer1: {
					layer2: {
						loltable: {n: number}
					},
				}
			}>({shape: {
				layer1: {
					layer2: {
						loltable: true,
					},
				},
			}})
			await database.tables.layer1.layer2.loltable.create(
				{n: 1},
				{n: 2},
				{n: 3},
			)
			const layer2 = dbmage.subsection(database, tables => {
				return tables.layer1.layer2
			})
			await layer2.tables.loltable.create(
				{n: 4},
				{n: 5},
				{n: 6},
			)
			const rows = await database.tables.layer1.layer2.loltable.read({conditions: false})
			expect(rows.length).equals(6)
		},
	},
}
