
import {MongoClient} from "mongodb"

import {Id} from "../../../id.js"
import {mongo} from "../../mongo.js"

export async function setup_test_db_on_xiome_stage() {
	const dbName = "xiome-stage"
	const url = ""

	if (!url)
		throw new Error("please configure the mongo database url for this test")

	type Schema = {
		apps: {
			owners: {
				appId: Id
				userId: Id
			}
		}
	}

	return mongo<Schema>({
		dbName,
		makeTableName: path => path.join("-"),
		client: await new MongoClient(url).connect(),
		shape: {
			apps: {
				owners: true,
			},
		},
	})
}

