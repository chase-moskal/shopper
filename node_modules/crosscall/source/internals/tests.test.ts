
import {Suite, FnMock, assert, expect} from "cynic"

import {Listener} from "../types.js"
import {crosscallHost} from "../crosscall-host.js"
import {crosscallClient} from "../crosscall-client.js"

import {
	nap,
	badOrigin,
	makeHostOptions,
	makeBridgedSetup,
	makeClientOptions,
} from "./testing.js"
import {Signal} from "./internal-types.js"

export default <Suite>{

	"client/host integration": {
		"wakeup call from host is received by client": async() => {
			const {hostOptions} = makeBridgedSetup()
			const {postMessage: hostPostMessage} = hostOptions.shims
			const mock: FnMock = (<any>hostPostMessage).mock
			await nap()
			assert(mock.calls.length > 0, `host postMessage must be called`)
			assert(mock.calls[0].args[0].signal === Signal.Wakeup,
				`first call to host postMessage must be wakeup signal`)
			return true
		},
		"callable resolves": async() => {
			const {client} = makeBridgedSetup()
			const nuclear = await client.callable
			expect(nuclear).defined()
			expect(nuclear.reactor).defined()
			expect(nuclear.reactor.generatePower).defined()
			expect(nuclear.reactor.radioactiveMeltdown).defined()
			return true
		},
		"end to end call requests": async() => {
			const {client} = makeBridgedSetup()
			const {reactor} = await client.callable
			const result1 = await reactor.generatePower(1, 2)
			const result2 = await reactor.generatePower(2, 3)
			return (
				expect(result1).equals(3) &&
				expect(result2).equals(5)
			)
		},
		"client can listen and unlisten to host events": async() => {
			const {client, dispatchAlarmEvent} = makeBridgedSetup()
			const {reactor} = await client.callable

			let result1 = <boolean>false
			let result2 = <boolean>false

			const listener: Listener = event => { result1 = event.alpha }
			await reactor.alarm.listen(listener)
			dispatchAlarmEvent({alpha: true})
			await nap()

			result2 = false
			await reactor.alarm.unlisten(listener)
			dispatchAlarmEvent({alpha: true})
			await nap()

			return (
				expect(result1).ok() &&
				expect(result2).not.ok()
			)
		}
	},

	"host": {
		"ignores messages with the wrong namespace": async() => {
			const options = makeHostOptions()
			let handler: Function
			options.shims.addEventListener = <any>((eventName: string, handler2: Function) => {
				handler = handler2
			})
			crosscallHost(options)
			await nap()
			const messageWasUsed: boolean = await handler({
				data: {},
				origin: badOrigin,
			})
			return expect(messageWasUsed).not.ok()
		},
		"sends a wakeup mesesage": async() => {
			const options = makeHostOptions()
			crosscallHost(options)
			const mock: FnMock = (<any>options.shims.postMessage).mock
			assert(mock.calls.length > 0, `host postMessage wasn't even called`)
			const [message, origin] = mock.calls[0].args
			return (
				expect(message.id).equals(0) &&
				expect(message.signal).equals(Signal.Wakeup) &&
				expect(origin).equals("*")
			)
		},
		"binds message event listener": async() => {
			const options = makeHostOptions()
			crosscallHost(options)
			const mock = (<any>options.shims.addEventListener).mock
			return expect(mock.calls.length).equals(1)
		},
		"unbinds message event listener on deconstructor": async() => {
			const options = makeHostOptions()
			const host = crosscallHost(options)
			host.stop()
			const mock: FnMock = (<any>options.shims.removeEventListener).mock
			return expect(mock.calls.length).equals(1)
		},
	},

	"client": {
		"ignores messages with the wrong namespace": async() => {
			const {shims, ...opts} = makeClientOptions()
			let handler: Function
			shims.addEventListener = <any>(
				(eventName: string, handler2: Function) => {
					handler = handler2
				}
			)
			crosscallClient({...opts, shims})
			const messageWasUsed: boolean = await handler({
				data: {},
				origin: badOrigin,
			})
			return (
				expect(handler).ok() &&
				expect(messageWasUsed).not.ok()
			)
		},
	},
}
