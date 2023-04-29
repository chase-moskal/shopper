
import {Listener} from "../../types.js"

export class ListenerOrganizer {
	readonly ids = new Map<Listener, number>()
	readonly listeners = new Map<number, Listener>()

	add(id: number, listener: Listener) {
		this.ids.set(listener, id)
		this.listeners.set(id, listener)
	}

	remove(id: number, listener: Listener) {
		this.ids.delete(listener)
		this.listeners.delete(id)
	}
}
