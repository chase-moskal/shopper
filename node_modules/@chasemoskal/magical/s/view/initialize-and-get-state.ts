
import {StateMap} from "./types.js"

export function initializeAndGetState({
		initial,
		stateIndex,
		stateMap,
	}: {
		initial: any
		stateIndex: number
		stateMap: StateMap
	}) {

	const initialized = stateMap.has(stateIndex)

	if (!initialized)
		stateMap.set(stateIndex, [
			(typeof initial === "function")
				? initial()
				: initial,
			undefined,
		])

	return stateMap.get(stateIndex)
}
