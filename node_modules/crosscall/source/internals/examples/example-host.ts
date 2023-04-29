
import {NuclearApi} from "./example-common.js"
import {crosscallHost} from "../../crosscall-host.js"
import {Listener, Topic, EventMediator} from "../../types.js"

export class ReactorTopic implements Topic<ReactorTopic> {
	async generatePower(a: number, b: number) {
		return a + b
	}
	async radioactiveMeltdown() {
		throw new Error("meltdown!")
	}
	alarm: EventMediator = {
		listen: (listener: Listener) => {},
		unlisten: (listener: Listener) => {}
	}
}

export async function exampleHost() {
	crosscallHost<NuclearApi>({
		namespace: "crosscall-example",
		exposures: {
			reactor: {
				exposed: new ReactorTopic(),
				cors: {
					allowed: /^.*$/i,
					forbidden: null
				}
			}
		}
	})
}
