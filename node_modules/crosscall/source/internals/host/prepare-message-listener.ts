
import {
	Signal,
	SendMessage,
	ErrorMessage,
	HostMessageHandlers,
} from "../internal-types.js"

export function prepareMessageListener({
	namespace,
	sendMessage,
	messageHandlers,
}: {
	namespace: string
	sendMessage: SendMessage
	messageHandlers: HostMessageHandlers
}) {

	return async function messageListener({
		origin,
		data: message
	}: MessageEvent): Promise<boolean> {

		const isMessageForUs = typeof message === "object"
			&& message.namespace === namespace

		if (isMessageForUs) {
			try {
				const handler = messageHandlers[message.signal]
				if (!handler) throw new Error(
					`unknown message signal "${message.signal}"`
				)
				await handler({message, origin})
			}
			catch (error) {
				const errorResponse: ErrorMessage = {
					signal: Signal.Error,
					error: error.message,
					associate: message.id
				}
				sendMessage({origin, message: errorResponse})
				throw error
			}
		}

		return isMessageForUs
	}
}
