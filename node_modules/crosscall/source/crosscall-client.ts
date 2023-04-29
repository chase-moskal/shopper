
import {
	Api,
	Client,
	ClientShims,
	ClientOptions,
} from "./types.js"

import {
	Id,
	ClientState,
	PendingRequest
} from "./internals/internal-types.js"

import {defaultShims} from "./internals/client/defaults.js"
import {makeCallable} from "./internals/client/make-callable.js"
import {ListenerOrganizer} from "./internals/client/listener-organizer.js"
import {prepareRequestFunction} from "./internals/client/prepare-request-function.js"
import {prepareMessageHandlers} from "./internals/client/prepare-message-handlers.js"
import {prepareMessageListener} from "./internals/client/prepare-message-listener.js"

export function crosscallClient<A extends Api<A>>({
	shape,
	namespace,
	hostOrigin,
	postMessage,
	shims: moreShims = {},
}: ClientOptions<A>): Client<A> {

	//
	// preparing stuff
	//

	let resolveReady: () => void
	const ready = new Promise<void>(resolve => resolveReady = resolve)

	const shims: ClientShims = {...defaultShims, ...moreShims}
	const state: ClientState = {
		messageId: 0,
		iframe: null,
		isReady: false,
		requests: new Map<Id, PendingRequest>(),
		listenerOrganizer: new ListenerOrganizer(),
	}

	const request = prepareRequestFunction({
		state,
		namespace,
		hostOrigin,
		postMessage,
	})

	const callable = makeCallable<A>({
		state,
		shape,
		request,
	})

	const messageHandlers = prepareMessageHandlers({
		state,
		resolveReady
	})

	const messageListener = prepareMessageListener({
		namespace,
		hostOrigin,
		messageHandlers,
	})

	//
	// actual initialization
	//

	shims.addEventListener("message", messageListener, false)

	//
	// return a stop function
	//

	return {
		callable: ready.then(() => callable),
		stop() {
			shims.removeEventListener("message", messageListener)
			if (state.iframe) {
				shims.removeChild(state.iframe)
				state.iframe = null
			}
		}
	}
}
