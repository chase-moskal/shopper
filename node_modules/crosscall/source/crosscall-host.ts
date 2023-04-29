
import {
	Api,
	Host,
	HostOptions,
} from "./types.js"

import {
	Signal,
	HostState,
	ListenerData,
} from "./internals/internal-types.js"

import {
	prepareMessageHandlers
} from "./internals/host/prepare-message-handlers.js"

import {
	prepareMessageListener
} from "./internals/host/prepare-message-listener.js"

import {err} from "./errors.js"
import {defaultShims} from "./internals/host/defaults.js"
import {prepareSendMessage} from "./internals/host/prepare-send-message.js"

export function crosscallHost<A extends Api<A> = Api>({
	namespace,
	exposures,
	shims: moreShims = {},
}: HostOptions<A>): Host {

	//
	// preparing stuff
	//

	// mixin shim defaults
	const shims = {...defaultShims, ...moreShims}
	if (!shims.postMessage) throw err(`crosscall host has invalid `
		+ `postmessage (could not find window parent or opener)`)

	// establish initial values for our host state
	const state: HostState = {
		messageId: 0,
		listenerId: 0,
		listeners: new Map<number, ListenerData>()
	}

	// function to send messages
	const sendMessage = prepareSendMessage({state, shims, namespace})

	// handlers for each type of incoming message
	const messageHandlers = prepareMessageHandlers({
		state,
		exposures,
		sendMessage,
	})

	// message event listener added to the window
	const messageListener = prepareMessageListener({
		namespace,
		sendMessage,
		messageHandlers,
	})

	//
	// actual initialization
	//

	// listen for messages from clients
	shims.addEventListener("message", messageListener, false)

	// send initial wakeup message to client
	sendMessage({
		origin: "*",
		message: {signal: Signal.Wakeup}, 
	})

	//
	// return a method to stop
	//

	return {
		stop() {

			// stop listening to client messages
			shims.removeEventListener("message", messageListener)

			// cleanup all existing event listeners
			for (const [, listenerData] of state.listeners.entries())
				listenerData.cleanup()
		}
	}
}
