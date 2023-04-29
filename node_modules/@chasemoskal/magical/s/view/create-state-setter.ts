
import {StateMap, StateSetter, StateSettingFunction} from "./types.js"

export function createStateSetter<xValue>({
		stateMap, stateIndex, rerender,
	}: {
		stateMap: StateMap
		stateIndex: number
		rerender: () => void
	}): StateSetter<xValue> {

	return valueOrFunction => {

		const [previousValue] = stateMap.get(stateIndex)!

		const newValue = typeof valueOrFunction === "function"
			? (<StateSettingFunction<xValue>>valueOrFunction)(previousValue)
			: valueOrFunction

		if (newValue !== previousValue) {
			stateMap.set(stateIndex, [newValue, previousValue])
			rerender()
		}
	}
}
