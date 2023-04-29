
import {MagicEventBase} from "./base.js"
import {GetDetail} from "./types/get-detail.js"
import {Constructor} from "../toolbox/handy-types.js"
import {DispatchOptions} from "./types/dispatch-options.js"

export const ev =
		<E extends Constructor<MagicEventBase<any>> & {readonly type: string}>
		(Event: E) => ({

	target: (target: EventTarget) => ({

		dispatch(
				detail: GetDetail<InstanceType<E>>,
				options?: Partial<DispatchOptions>,
			) {
			target.dispatchEvent(new Event(Event.type, {...options, detail}))
		},

		listen(
				listener: (event: InstanceType<E>) => void,
				options?: boolean | AddEventListenerOptions,
			) {
			target.addEventListener(Event.type, <any>listener, options)
			return () => target
				.removeEventListener(Event.type, <any>listener, options)
		},
	})
})
