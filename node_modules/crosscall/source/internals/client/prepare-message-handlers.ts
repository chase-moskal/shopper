
import {
	Signal,
	Message,
	ClientState,
	EventMessage,
	ErrorMessage,
	ResponseMessage,
	ClientMessageHandlers,
} from "../internal-types.js"

export const prepareMessageHandlers = ({state, resolveReady}: {
	state: ClientState
	resolveReady: () => void
}): ClientMessageHandlers => {

	function passResponseToRequest(response: ResponseMessage): void {
		const pending = state.requests.get(response.associate)
		if (!pending) throw new Error(`unknown response, id "${response.id}" `
			+ `responding to "${response.associate}"`)
		const {resolve, reject} = pending
		state.requests.delete(response.associate)
		if (response.signal === Signal.Error) reject((<ErrorMessage>response).error)
		else resolve(response)
	}

	const prepPasser = () => async(response: ResponseMessage): Promise<void> =>
		passResponseToRequest(response)

	return {
		[Signal.Error]: prepPasser(),
		[Signal.Wakeup]: async(): Promise<void> => {
			if (!state.isReady) {
				resolveReady()
				state.isReady = true
			}
		},
		[Signal.CallResponse]: prepPasser(),
		[Signal.EventListenResponse]: prepPasser(),
		[Signal.EventUnlistenResponse]: prepPasser(),
		[Signal.Event]: async(message: EventMessage): Promise<void> => {
			const {listenerOrganizer} = state
			const {listenerId, eventPayload} = message
			const listener = listenerOrganizer.listeners.get(listenerId)
			if (listener) listener(eventPayload)
		}
	}
}
