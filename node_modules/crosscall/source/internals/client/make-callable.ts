
import {
	Api,
	Shape,
	Topic,
	ApiShape,
	EventMediator,
} from "../../types.js"
import {err} from "../../errors.js"

import {
	Signal,
	ClientState,
	RequestFunc,
	CallRequest,
	CallResponse,
	EventListenRequest,
	EventListenResponse,
	EventUnlistenRequest,
	EventUnlistenResponse,
} from "../internal-types.js"

export function makeCallable<A extends Api<A> = Api>({
	state,
	shape,
	request,
}: {
	shape: ApiShape
	state: ClientState
	request: RequestFunc
}): A {
	const callable: Api<any> = {}

	const requestCall = async(message: CallRequest) =>
		(<RequestFunc<CallRequest, CallResponse>>request)
			(message)

	const requestListen = async(message: EventListenRequest) =>
		(<RequestFunc<EventListenRequest, EventListenResponse>>request)
			(message)

	const requestUnlisten = async(message: EventUnlistenRequest) =>
		(<RequestFunc<EventUnlistenRequest, EventUnlistenResponse>>request)
			(message)

	// create topics
	for (const [topic, topicShape] of Object.entries<Shape<Topic>>(shape)) {
		const topicObject: Topic<any> = {}
		for (const [key, value] of Object.entries(topicShape)) {

			// create methods
			if (value === "method") {
				const func = key
				topicObject[func] = async(...params: any[]) => (
					await requestCall({
						signal: Signal.CallRequest,
						topic,
						func,
						params,
					})
				).result
			}

			// create events
			else if (value === "event") {
				const eventName = key
				topicObject[eventName] = <EventMediator>{

					async listen(listener) {
						const {listenerId} = await requestListen({
							topic,
							eventName,
							signal: Signal.EventListenRequest,
						})
						state.listenerOrganizer.add(listenerId, listener)
					},
	
					async unlisten(listener) {
						const listenerId = state.listenerOrganizer.ids.get(listener)
						if (listenerId === undefined)
							throw new Error(`cannot unlisten to unknown listener`)
						await requestUnlisten({
							listenerId,
							signal: Signal.EventUnlistenRequest,
						})
						state.listenerOrganizer.remove(listenerId, listener)
					}
				}
			}

			else throw err(`unknown shape item, ${topic}.${key}: "${value}"`)
		}

		callable[topic] = topicObject
	}

	return <A>callable
}
