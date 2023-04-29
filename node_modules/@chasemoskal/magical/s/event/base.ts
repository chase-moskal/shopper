
import {ev} from "./ev.js"
import {defaultDispatchOptions} from "./default-dispatch-options.js"

export class MagicEventBase<D> extends CustomEvent<D> {
	static readonly type: string
	static readonly target = ev(this).target

	constructor(name: string, options: CustomEventInit<D> & {detail: D}) {
		super(name, {...defaultDispatchOptions, ...options})
	}
}
