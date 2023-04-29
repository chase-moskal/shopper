
import {render, TemplateResult} from "lit"
import {directive, Part} from "lit/directive.js"
import {AsyncDirective} from "lit/async-directive.js"

import {makeUseObjectForView} from "./view/make-use-object-for-view.js"
import {View, Sauce, SetupMap, StateMap, ViewOptions} from "./view/types.js"
import {createShadowDomWithStyles} from "./view/create-shadow-dom-with-styles.js"

export const view = <xProps extends any[]>(
		{styles, shadow = false}: ViewOptions,
		sauce: Sauce<xProps>,
	) => {

	class ViewDirective extends AsyncDirective {
		#mostRecentProps = <xProps><unknown>[]

		#stateMap: StateMap = new Map<number, [any, any]>()
		#setupMap: SetupMap = new Map<number, () => void>()

		#stateIndex = 0
		#setupIndex = 0
		#renderCount = 0

		#use = makeUseObjectForView({
			stateMap: this.#stateMap,
			setupMap: this.#setupMap,
			pullStateIndex: () => this.#stateIndex++,
			pullSetupIndex: () => this.#setupIndex++,
			getRenderCount: () => this.#renderCount,
			render: () => {
				this.setValue(this.#renderIntoShadowOrNot())
			},
		})

		#root = shadow
			? createShadowDomWithStyles(styles)
			: undefined

		#renderIntoShadowOrNot() {
			let result: void | HTMLElement | TemplateResult

			if (this.#root) {
				render(this.render(), this.#root.shadow)
				result = this.#root.element
			}
			else {
				result = this.render()
			}

			this.#renderCount += 1
			return result
		}

		update(part: Part, props: xProps) {
			this.#mostRecentProps = props
			return this.#renderIntoShadowOrNot()
		}

		disconnected() {
			super.disconnected()
			this.#renderCount = 0
			for (const dispose of this.#setupMap.values())
				dispose()
			this.#setupMap.clear()
		}

		render() {
			this.#stateIndex = 0
			this.#setupIndex = 0
			const renderer = sauce(this.#use)
			return renderer(...this.#mostRecentProps)
		}
	}

	const viewDirective = <View<xProps>>directive(ViewDirective)
	return viewDirective
}
