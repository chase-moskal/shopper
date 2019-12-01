
import resolve from "rollup-plugin-node-resolve"

export default {
	input: "dist/shopper.js",
	output: {
		file: "dist/shopper.bundle.js",
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
