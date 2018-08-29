#!/usr/bin/env node

/*

BUILD SCRIPT CLI

	node build
		produce a production build

	node build --debug
		produce a debug build

	node build --sassWatch
		engage a sass compile-on-save watch mode session

*/

const commander = require("commander")
const {axx, waxx, caxx} = require("axx")

//
// PARSE COMMAND LINE ARGUMENTS
//

commander
	.option("-d, --debug", "create a debuggable bundle")
	.option("-w, --sassWatch", "sass compile-on-save watcher mode")
	.parse(process.argv)

/**
 * BUILD ROUTINE OPTIONS
 *  - some options are provided by the command line arguments
 *  - some options are hard-coded paths
 */
const buildOptions = {
	debug: commander.debug,
	sassWatch: commander.sassWatch,
	paths: {
		nb: "$(npm bin)/",
		scriptSource: "source/global.ts",
		scriptBundle: "dist/global.bundle.js",
		styleSource: "source/shopper.scss",
		styleOutput: "dist/shopper.css",
		polyfills: [
			"node_modules/array.find/dist/array-find-polyfill.min.js",
			"node_modules/es6-promise/dist/es6-promise.auto.min.js",
			"node_modules/whatwg-fetch/fetch.js"
		]
	}
}

/**
 * BUILD ROUTINE
 * - intakes build options
 * - performs a project build
 * - overwrites the "dist" directory with build results
 */
async function build({debug, paths, sassWatch}) {
	process.env.FORCE_COLOR = true
	const {
		nb,
		scriptSource,
		scriptBundle,
		styleSource,
		styleOutput,
		polyfills
	} = paths

	//
	// SASS WATCH MODE
	//

	if (sassWatch) {
		await axx(
			`${nb}sass --watch --source-map ${styleSource} ${styleOutput}`,
			caxx(),
			{combineStderr: true}
		)
		return
	}

	//
	// CLEAN UP DIST DIRECTORY
	//

	await axx(`rm -rf dist && mkdir dist`)

	//
	// TYPESCRIPT COMPILATION
	// - for the published npm package
	//

	await Promise.all([
		debug
			? axx(`${nb}tsc --sourceMap false --inlineSourceMap true`, caxx())
			: axx(`${nb}tsc`, caxx()),
		axx(
			`${nb}sass --source-map ${styleSource} ${styleOutput}`,
			caxx(),
			{combineStderr: true}
		)
	])

	//
	// DEBUG BUILD
	// - bundle build for demo
	// - provides global access
	//

	if (debug) {
		await axx(
			`${nb}browserify ${scriptSource} --debug -p [ tsify ]`,
			waxx(scriptBundle)
		)
		console.log("✔ done debug build")
	}

	//
	// PRODUCTION BUILD
	// - bundle build with uglify
	// - optimized build is much smaller
	//

	else {
		process.env.NODE_ENV = "production"
		await axx(
			`${nb}browserify ${scriptSource} -p [ tsify ] -g [ envify --NODE_ENV production ] -t uglifyify`,
			waxx(`${scriptBundle}.temp`)
		)
		await axx(
			`cat ${[
				...polyfills,
				`${scriptBundle}.temp`
			].join(" ")}`,
			// waxx(scriptBundle)
			axx(`${nb}uglifyjs --compress --mangle`, waxx(scriptBundle))
		)

		// documentation generation
		await axx(`${nb}typedoc --name "shopper api docs" --readme README.docs.md --mode file --excludeExternals --excludePrivate --out dist/docs/ source/`, caxx())

		console.log("✔ done production build")
	}
}

//
// EXECUTE BUILD ROUTINE
//

build(buildOptions)
