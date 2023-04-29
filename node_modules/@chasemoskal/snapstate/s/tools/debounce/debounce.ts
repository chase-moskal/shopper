
import {AnyFunction, DebounceReturn} from "./debounce-types.js"

export function debounce<xAction extends AnyFunction>(
		delay: number,
		action: xAction,
	): DebounceReturn<xAction> {

	let latestArgs: any[]
	let timeout: any
	// let promise: Promise<ReturnType<xAction>>

	let waitingQueue: {
		resolve: (r: ReturnType<xAction>) => void
		reject: (reason: any) => void
	}[] = []

	// let resolve: (r: ReturnType<xAction>) => void
	// let reject: (reason: any) => void

	function reset() {
		latestArgs = undefined
		if (timeout)
			clearTimeout(timeout)
		timeout = undefined
		// promise = new Promise((res, rej) => {
		// 	resolve = res
		// 	reject = rej
		// })
		waitingQueue = []
	}

	reset()

	return <DebounceReturn<xAction>>((...args) => {
		latestArgs = args

		if (timeout)
			clearTimeout(timeout)

		const promise = new Promise((resolve, reject) => {
			waitingQueue.push({resolve, reject})
		})

		timeout = setTimeout(() => {
			Promise.resolve()
				.then(() => action(...latestArgs))
				.then(r => {
					for (const {resolve} of waitingQueue)
						resolve(r)
					reset()
				})
				.catch(err => {
					for (const {reject} of waitingQueue)
						reject(err)
					reset()
				})
		}, delay)

		return promise
	})
}
