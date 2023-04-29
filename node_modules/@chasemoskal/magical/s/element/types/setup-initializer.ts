
import {LitElement} from "lit"

export type SetupInitializer<E extends LitElement> =
	(element: E) =>
		(void | (() => void))
