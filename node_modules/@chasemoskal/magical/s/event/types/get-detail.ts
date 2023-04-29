
import {MagicEventBase} from "../base.js"

export type GetDetail<E extends MagicEventBase<any>>
	= E extends MagicEventBase<infer D>
		? D
		: never
