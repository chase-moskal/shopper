
import resolve from "rollup-plugin-node-resolve"

export default {
	input: "x/shopper.js",
	output: {
		file: "x/shopper.bundle.js",
		format: "iife",
		name: "shopperBundle"
	},
	plugins: [
		resolve({
			mainFields: ["module", "main"],
			preferBuiltins: false,
			modulesOnly: true,
			dedupe: []
		})
	]
}
