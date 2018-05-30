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
const {axx, maxx, raxx, waxx, caxx} = require("axx")

commander
	.option("-d, --debug", "create a debuggable bundle")
	.option("-w, --sassWatch", "sass compile-on-save watcher mode")
	.parse(process.argv)

const buildOptions = {
	debug: commander.debug,
	sassWatch: commander.sassWatch,
	paths: {
		nb: "$(npm bin)/",
		scriptSource: "source/shopperman.tsx",
		scriptBundle: "dist/shopperman.bundle.js",
		styleSource: "source/shopperman.scss",
		styleOutput: "dist/shopperman.css",
		polyfills: [
			"node_modules/array.find/dist/array-find-polyfill.min.js",
			"node_modules/es6-promise/dist/es6-promise.auto.min.js",
			"node_modules/whatwg-fetch/fetch.js"
		]
	}
}

async function build({debug, paths, sassWatch, cannedVideoOptions}) {
	const {nb, scriptSource, scriptBundle, styleSource, styleOutput, polyfills} = paths
	process.env.FORCE_COLOR = true

	if (sassWatch)
		await (axx(`${nb}node-sass --watch --source-map true ${styleSource} ${styleOutput}`, caxx(), {combineStderr: true}))

	await axx(`rm -rf dist && mkdir dist`)
	await Promise.all([
		debug
			? axx(`${nb}tsc --sourceMap false --inlineSourceMap true`, caxx())
			: axx(`${nb}tsc`, caxx()),
		axx(`${nb}node-sass --source-map true ${styleSource} ${styleOutput}`, caxx(), {combineStderr: true})
	])

	if (debug) { // debug build
		await (axx(
			`${nb}browserify ${scriptSource} --debug -p [ tsify ]`,
			waxx(scriptBundle)
		))
		console.log("✔ done debug build")
	}

	else { // production build
		await (axx(
			`${nb}browserify ${scriptSource} -p [ tsify ] -g [ envify --NODE_ENV production ] -g uglifyify`,
			waxx(`${scriptBundle}.temp`)
		))
		await (axx(
			`cat ${[
				...polyfills,
				`${scriptBundle}.temp`
			].join(" ")}`,
			axx(`${nb}uglifyjs --compress --mangle`, waxx(scriptBundle))
		))
		console.log("✔ done production build")
	}
}

build(buildOptions)
