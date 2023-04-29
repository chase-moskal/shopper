
import {ev} from "./event/ev.js"
import {MagicEventBase} from "./event/base.js"

export function MagicEvent<D>(type: string) {
	return class extends MagicEventBase<D> {
		static readonly type = type
		static readonly target = ev(this).target
	}
}
