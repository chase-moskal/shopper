
import {fn} from "cynic"

import {crosscallHost} from "../crosscall-host.js"
import {crosscallClient } from "../crosscall-client.js"

import {
	Host,
	Client,
	Listener,
	HostOptions,
	ClientOptions,
	EventMediator,
	PostMessage,
} from "../types.js"

import {Message} from "./internal-types.js"
import {ReactorTopic} from "./examples/example-host.js"
import {NuclearApi, nuclearShape} from "./examples/example-common.js"

export const makeClientOptions = (): ClientOptions<NuclearApi> => ({
	shape: nuclearShape,
	namespace: "crosscall-testing",
	hostOrigin: "https://alpha.egg",
	postMessage: <PostMessage>fn(),
	shims: {
		createElement: <typeof document.createElement>fn(),
		appendChild: <typeof document.appendChild>fn(),
		removeChild: <typeof document.removeChild>fn(),
		addEventListener: <typeof window.addEventListener>fn(),
		removeEventListener: <typeof window.removeEventListener>fn(),
	}
})

export const makeHostOptions = (): HostOptions<NuclearApi> => ({
	namespace: "crosscall-testing",
	exposures: {
		reactor: {
			exposed: new ReactorTopic(),
			cors: {
				allowed: /^https:\/\/alpha\.egg$/i,
				forbidden: null
			}
		}
	},
	shims: {
		postMessage: fn<typeof window.postMessage>(),
		addEventListener: fn<typeof window.addEventListener>(),
		removeEventListener: fn<typeof window.removeEventListener>(),
	}
})

export const nap = async() => sleep(100)
export const sleep = async(ms: number) =>
	new Promise((resolve, reject) => setTimeout(resolve, ms))

export const goodOrigin = "https://alpha.egg"
export const badOrigin = "https://beta.bad"

export function mockReactorAlarm(): {
	dispatchAlarmEvent: (event: any) => void
	alarm: EventMediator
} {
	let subs: Listener[] = []
	return {
		alarm: {
			listen: listener => {
				subs.push(listener)
			},
			unlisten: listener => {
				subs = subs.filter(sub => sub !== listener)
			}
		},
		dispatchAlarmEvent: (event: any) => {
			for (const sub of subs) sub(event)
		}
	}
}

export const makeBridgedSetup = () => {
	const hostOptions = makeHostOptions()
	const clientOptions = makeClientOptions()
	const {alarm, dispatchAlarmEvent} = mockReactorAlarm()
	hostOptions.exposures.reactor.exposed.alarm = alarm

	let host: Host<NuclearApi>
	let client: Client<NuclearApi>

	// get message senders
	let messageHost: (o: Partial<MessageEvent>) => void
	let messageClient: (o: Partial<MessageEvent>) => void
	hostOptions.shims.addEventListener = fn(
		async(eventName: string, func: any) => messageHost = func
	)
	clientOptions.shims.addEventListener = fn(
		async(eventName: string, func: any) => messageClient = func
	)

	// route host output to client input
	hostOptions.shims.postMessage = fn(
		async(message: Message, origin: string) => {
			await sleep(0)
			messageClient({origin: goodOrigin, data: message})
		}
	)

	// route client output to host input
	clientOptions.postMessage = fn(
		async(message: Message, origin: string) => {
			await sleep(0)
			messageHost({origin: goodOrigin, data: message})
		}
	)

	// client created first, the way iframes work
	client = crosscallClient<NuclearApi>(clientOptions)
	host = crosscallHost<NuclearApi>(hostOptions)

	return {client, host, clientOptions, hostOptions, dispatchAlarmEvent}
}
