
import {UseView} from "./types.js"
import {debounce} from "../toolbox/debounce/debounce.js"
import {createStateSetter} from "./create-state-setter.js"
import {initializeAndGetState} from "./initialize-and-get-state.js"

export function makeUseObjectForView({
		stateMap,
		setupMap,
		render,
		getRenderCount,
		pullStateIndex,
		pullSetupIndex,
	}: {
		stateMap: Map<number, [any, any]>
		setupMap: Map<number, () => void>
		render(): void
		getRenderCount(): number
		pullStateIndex(): number
		pullSetupIndex(): number
	}): UseView {

	const rerender = debounce(0, render)

	return {

		state(initial) {
			const stateIndex = pullStateIndex()
			const [currentValue, previousValue] = initializeAndGetState({
				initial,
				stateIndex,
				stateMap,
			}) ?? []

			const setter = createStateSetter<any>({
				stateMap,
				stateIndex,
				rerender,
			})

			const getter = () => (stateMap.get(stateIndex) ?? [])[0]

			return [
				currentValue,
				setter,
				getter,
				previousValue,
			]
		},

		setup(e) {
			const setupIndex = pullSetupIndex()
			if (getRenderCount() === 0)
				setupMap.set(setupIndex, e(rerender))
		},
	}
}
