
import {objectMap} from "./object-map.js"
import {isPlainObject} from "./is-plain-object.js"
import {symbolToAllowProxyIntoState} from "../parts/symbol-to-allow-proxy-into-state.js"

export function unproxy<X>(x: X, unlessSymbol: symbol = symbolToAllowProxyIntoState): X {
	return (isPlainObject(x) && !(<any>x)[unlessSymbol])
		? objectMap(x, value => unproxy(value, unlessSymbol))
		: x
}
