
import {obtain} from "./tools/obtain.js"
import {unproxy} from "./tools/unproxy.js"
import {debounce} from "./tools/debounce/debounce.js"
import {isPlainObject} from "./tools/is-plain-object.js"
import {attemptNestedProperty} from "./tools/attempt-nested-property.js"
import {SnapstateCircularError, SnapstateReadonlyError} from "./parts/errors.js"
import {symbolToAllowProxyIntoState} from "./parts/symbol-to-allow-proxy-into-state.js"
import {containsPathOrChildren, containsPath, containsPathOrParents} from "./parts/paths.js"

import type {StateTree, Read, Subscription, TrackingSession, Snapstate, RestrictedSnapstate, GetTree} from "./types.js"

export * from "./types.js"
export * from "./parts/paths.js"
export * from "./parts/errors.js"
export * from "./parts/symbol-to-allow-proxy-into-state.js"

export * from "./tools/debounce/debounce.js"
export * from "./tools/attempt-nested-property.js"
export * from "./tools/is-plain-object.js"
export * from "./tools/is-void.js"
export * from "./tools/nap.js"
export * from "./tools/object-map.js"
export * from "./tools/obtain.js"
export * from "./tools/unproxy.js"

export function snapstate<xTree extends StateTree>(tree: xTree): Snapstate<xTree> {
	const masterTree = unproxy(tree, symbolToAllowProxyIntoState)

	let activeUpdate = false
	let activeTrackThatIsRecording: TrackingSession
	const trackingSessions = new Map<symbol, TrackingSession>()
	const subscriptions = new Set<Subscription<xTree>>()

	function findTrackingSessions(path: string[]): TrackingSession[] {
		const sessions: TrackingSession[] = []
		for (const [,session] of trackingSessions) {
			if (session.flip) {
				if (containsPathOrParents(session.paths, path))
					sessions.push(session)
			}
			else {
				if (containsPathOrChildren(session.paths, path))
					sessions.push(session)
			}
		}
		return sessions
	}

	const writable = <xTree>recurse(masterTree, true, [])
	const readable = <xTree>recurse(masterTree, false, [])

	let updateQueue: string[][] = []
	const update = debounce(1, () => {
		for (const path of updateQueue) {
			activeUpdate = true
			try {

				// trigger subscriptions
				for (const subscription of subscriptions) {
					subscription(readable)
				}

				// trigger reactions
				for (const {observer, reaction} of findTrackingSessions(path)) {
					if (reaction)
						reaction(observer(readable))
					else
						observer(readable)
				}
			}
			finally {
				activeUpdate = false
			}
		}
		updateQueue = []
	})
	let waiter: Promise<void> = Promise.resolve()
	function queueUpdate(path: string[]) {
		if (!containsPath(updateQueue, path))
			updateQueue.push(path)
		waiter = update()
	}

	function recurse(target: {}, allowWrites: boolean, path: string[]): any {
		return new Proxy(target, {
			get(t: any, property: string) {
				const currentPath = [...path, property]

				// record which properties are read during tracking
				if (activeTrackThatIsRecording) {
					if (!containsPath(activeTrackThatIsRecording.paths, currentPath)) {
						activeTrackThatIsRecording.paths.push(currentPath)
					}
				}

				// if value from master tree is missing, use the proxy target,
				// to alleviate proxy rug-pulling scenarios
				const value = obtain(masterTree, currentPath) ?? obtain(t, [property])

				return isPlainObject(value)
					? recurse(value, allowWrites, currentPath)
					: value
			},
			set(t, property: string, value: any) {
				const currentPath = [...path, property]
				if (allowWrites) {
					if (activeTrackThatIsRecording || activeUpdate)
						throw new SnapstateCircularError("forbidden state circularity")
					const existingValue = obtain(masterTree, currentPath)
					const isChanged = value !== existingValue
					if (isChanged) {
						attemptNestedProperty(masterTree, currentPath, unproxy(value, symbolToAllowProxyIntoState))
						queueUpdate(currentPath)
					}
					return true
				}
				else {
					throw new SnapstateReadonlyError(
						`state is read-only here, cannot set ${currentPath.join(".")}`
					)
				}
			}
		})
	}

	const untrackers = new Set<() => void>()
	const unsubscribers = new Set<() => void>()

	return {
		state: writable,
		writable,
		readable,
		readonly: <Read<xTree>>readable,
		subscribe(subscription) {
			subscriptions.add(subscription)
			const unsubscribe = () => subscriptions.delete(subscription)
			unsubscribers.add(unsubscribe)
			return unsubscribe
		},
		track(observer, reaction, {flip = false} = {}) {
			const identifier = Symbol()
			activeTrackThatIsRecording = {paths: [], flip, observer, reaction}
			trackingSessions.set(identifier, activeTrackThatIsRecording)
			observer(readable)
			activeTrackThatIsRecording = undefined
			const untrack = () => trackingSessions.delete(identifier)
			untrackers.add(untrack)
			return untrack
		},
		unsubscribeAll() {
			for (const unsubscribe of unsubscribers)
				unsubscribe()
			unsubscribers.clear()
		},
		untrackAll() {
			for (const untrack of untrackers)
				untrack()
			untrackers.clear()
		},
		async wait() {
			await waiter
		},
	}
}

export function substate<
		xTree extends StateTree,
		xSubtree extends StateTree,
		xSnap extends RestrictedSnapstate<xTree> | Snapstate<xTree>
	>(
		state: xSnap,
		grabber: (tree: GetTree<xSnap>) => xSubtree,
	): (
		xSnap extends Snapstate<xTree>
			? Snapstate<xSubtree>
			: RestrictedSnapstate<xSubtree>
	) {

	const readable = grabber(<GetTree<xSnap>>state.readable)
	const untrackers = new Set<() => void>()
	const unsubscribers = new Set<() => void>()

	const restricted: RestrictedSnapstate<xSubtree> = {
		state: readable,
		readable,
		readonly: <Read<xSubtree>>readable,
		subscribe(subscription) {
			// substate subscription actually uses a flipped track,
			// which allows us to receive updates for any property
			// *below* properties accessed by the grabber,
			// which is functionally equivalent to a constrained subscription.
			const unsubscribe = state.track(
				() => grabber(<GetTree<xSnap>>state.readable),
				readable => {
					subscription(readable)
				},
				{flip: true},
			)
			unsubscribers.add(unsubscribe)
			return unsubscribe
		},
		track(observer, reaction) {
			const untrack = state.track(() => observer(readable), reaction)
			untrackers.add(untrack)
			return untrack
		},
		unsubscribeAll() {
			for (const unsubscribe of unsubscribers)
				unsubscribe()
			unsubscribers.clear()
		},
		untrackAll() {
			for (const untrack of untrackers)
				untrack()
			untrackers.clear()
		},
		wait: state.wait,
	}

	if ((<Snapstate<StateTree>>state).writable) {
		const s = <Snapstate<xTree>>state
		const writable = grabber(<GetTree<xSnap>>s.writable)
		return <Snapstate<xSubtree>>{
			...restricted,
			writable,
			state: writable,
		}
	}
	else
		return <any>restricted
}

export function restricted<xTree extends StateTree>(
		snap: Snapstate<xTree>
	): RestrictedSnapstate<xTree> {
	return {
		state: snap.readable,
		readable: snap.readable,
		readonly: snap.readonly,
		subscribe: snap.subscribe,
		track: snap.track,
		unsubscribeAll: snap.unsubscribeAll,
		untrackAll: snap.untrackAll,
		wait: snap.wait,
	}
}
