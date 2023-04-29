
import {
	Signal,
	HostState,
	CallRequest,
	SendMessage,
	CallResponse,
	EventMessage,
	EventListenRequest,
	EventListenResponse,
	HostMessageHandlers,
	HandleMessageParams,
	EventUnlistenRequest,
	EventUnlistenResponse,
} from "../internal-types.js"

import {
	Exposure,
	Listener,
} from "../../types.js"

import {
	getEventMediator,
	getMethodExecutor,
	enforcePermissions,
	getExposure,
	getListenerData,
} from "./validation.js"

export const prepareMessageHandlers = ({
	state,
	exposures,
	sendMessage,
}: {
	state: HostState
	sendMessage: SendMessage
	exposures: {[key: string]: Exposure}
}): HostMessageHandlers => ({

	/**
	 * Call request
	 * - a client wants to execute some exposed host functionality
	 * - the results are sent back to the client
	 */
	[Signal.CallRequest]: async({
		message, origin
	}: HandleMessageParams<CallRequest>): Promise<void> => {
		const {id: associate, topic, func, params} = message
		const exposure = getExposure({topic, exposures})
		enforcePermissions({origin, exposure})
		const execute = getMethodExecutor({func, params, exposure})
		sendMessage({
			origin,
			message: <CallResponse>{
				associate,
				result: await execute(),
				signal: Signal.CallResponse,
			}
		})
	},

	/**
	 * Event listen request
	 * - a client is asking to subscribe to a host event
	 * - we send back the generated listener id
	 */
	[Signal.EventListenRequest]: async({
		message, origin
	}: HandleMessageParams<EventListenRequest>) => {
		const {topic, eventName, id: associate} = message
		const exposure = getExposure({topic, exposures})
		enforcePermissions({origin, exposure})
		const mediator = getEventMediator({eventName, exposure})

		// create the listener
		const listenerId = state.listenerId++
		const listener: Listener = eventPayload => sendMessage({
			origin,
			message: <EventMessage>{
				listenerId,
				eventPayload,
				signal: Signal.Event,
			}
		})
		const cleanup = () => {
			mediator.unlisten(listener)
			state.listeners.delete(listenerId)
		}

		// start listening
		state.listeners.set(listenerId, {exposure, cleanup})
		mediator.listen(listener)

		sendMessage({
			origin,
			message: <EventListenResponse>{
				associate,
				listenerId,
				signal: Signal.EventListenResponse,
			}
		})
	},

	/**
	 * Event unlisten request
	 * - a client wants to cancel an event subscription
	 */
	[Signal.EventUnlistenRequest]: async({
		message, origin
	}: HandleMessageParams<EventUnlistenRequest>) => {
		const {listeners} = state
		const {listenerId, id: associate} = message
		const {exposure, cleanup} = getListenerData({listenerId, listeners, origin})
		enforcePermissions({origin, exposure})
		cleanup()
		sendMessage({
			origin,
			message: <EventUnlistenResponse>{
				associate,
				signal: Signal.EventUnlistenResponse
			}
		})
	}
})
