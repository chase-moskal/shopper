
import {verifyCors} from "./cors/verify-cors.js"
import {ListenerData} from "../internal-types.js"
import {Exposure, EventMediator, Method} from "../../types.js"

export function enforcePermissions({origin, exposure}: {
	origin: string
	exposure: Exposure
}) {
	if (!exposure.cors) throw new Error(`cors permissions must be specified`)
	if (!exposure.cors.allowed) throw new Error(`cors 'allowed' must be specified`)
	const permitted = verifyCors({origin, cors: exposure.cors})
	if (!permitted) throw new Error(`failed cors verification`)
}

export function getExposure({topic, exposures}: {
	topic: string
	exposures: {[key: string]: Exposure}
}) {
	const exposure = exposures[topic]
	if (!exposure) throw new Error(`unknown exposure topic "${topic}"`)
	return exposure
}

export function getMethodExecutor({func, params, exposure}: {
	func: string
	params: any[]
	exposure: Exposure
}) {
	const method = <Method>exposure.exposed[func]
	if (!method) throw new Error(`unknown method "${func}"`)
	return () => method.apply(exposure.exposed, params)
}

export function getEventMediator({eventName, exposure}: {
	eventName: string
	exposure: Exposure
}) {
	const mediator = <EventMediator>exposure.exposed[eventName]
	if (!mediator) throw new Error(`unknown event "${eventName}"`)
	return mediator
}

export function getListenerData({listenerId, listeners}: {
	origin: string
	listenerId: number
	listeners: Map<number, ListenerData>
}) {
	const listenerData = listeners.get(listenerId)
	if (!listenerData) throw new Error(`unknown listener id "${listenerId}"`)
	return listenerData
}
