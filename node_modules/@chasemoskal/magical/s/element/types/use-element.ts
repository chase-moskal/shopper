
import {LitElement} from "lit"
import {StateTuple} from "../../magical.js"
import {SetupInitializer} from "./setup-initializer.js"

export interface UseElement<E extends LitElement> {

	state<xValue>(
		initial: xValue | (() => xValue)
	): StateTuple<xValue>

	setup(
		initializer: SetupInitializer<E>
	): void
}
