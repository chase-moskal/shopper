
import {LitElement} from "lit"
import {Subscription} from "@chasemoskal/snapstate"

import {Constructor} from "../component-types.js"

export type Subscribe = (subscription: Subscription<any>) => () => void

export function mixinSnapstateSubscriptions(...subscribes: Subscribe[]) {
	return function<C extends Constructor<LitElement>>(
			Base: C
		): C {

		return class extends Base {

			#unsubscribes: (() => void)[] = []

			connectedCallback() {
				super.connectedCallback()
				const update = () => { this.requestUpdate() }
				this.#unsubscribes = subscribes.map(subscribe => subscribe(update))
			}

			disconnectedCallback() {
				super.disconnectedCallback()
				for (const unsubscribe of this.#unsubscribes)
					unsubscribe()
				this.#unsubscribes = []
			}
		}
	}
}
