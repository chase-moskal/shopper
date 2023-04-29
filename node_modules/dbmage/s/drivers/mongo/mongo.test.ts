
import {Id} from "../../id.js"
import {expect, Suite} from "cynic"
import {setup_test_db_on_xiome_stage} from "./testing/setup-test-db-on-xiome-stage.js"

export default <Suite>{

	async "connect to xiome mongo and fetch a list of users"() {
		const db = await setup_test_db_on_xiome_stage()
		const [user] = await db.tables.apps.owners.read({conditions: false})
		expect(Id.isId(user.userId.string))
			.ok()
	},
}
