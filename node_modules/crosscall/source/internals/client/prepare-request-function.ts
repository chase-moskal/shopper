
import {PostMessage} from "../../types.js"
import {
	Id,
	Message,
	ClientState,
	RequestFunc,
	ResponseMessage,
} from "../internal-types.js"

export function prepareRequestFunction({
	state,
	namespace,
	hostOrigin,
	postMessage,
}: {
	namespace: string
	hostOrigin: string
	state: ClientState
	postMessage: PostMessage
}): RequestFunc {
	if (!postMessage)
		throw new Error(`crosscall client requires postMessage`)

	async function sendMessage<M extends Message = Message>(
		message: Message
	): Promise<Id> {
		const id = state.messageId++
		const payload: M = {...<any>message, id, namespace}
		await postMessage(payload, hostOrigin)
		return id
	}

	return async function request<
		M extends Message = Message,
		R extends ResponseMessage = ResponseMessage
	>(
		message: M
	): Promise<R> {
		const id = await sendMessage<M>(message)
		return new Promise<R>((resolve, reject) => {
			state.requests.set(id, {resolve, reject})
		})
	}
}
