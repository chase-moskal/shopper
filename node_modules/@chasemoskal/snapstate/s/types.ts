
export interface StateTree {
	[key: string]: StateTree | any
}

export type Read<xTree> = {
	readonly [P in keyof xTree]: xTree[P] extends StateTree
		? Read<xTree[P]>
		: xTree[P]
}

export type Observer<xTree, X> = (readable: xTree) => X
export type Reaction<X> = (x: X) => void

export interface TrackingSession {
	paths: string[][]
	flip: boolean
	observer: Observer<any, any>
	reaction?: Reaction<any>
}

export type Subscription<xTree extends StateTree> = (readable: xTree) => void

export interface RestrictedSnapstate<xTree extends StateTree> {
	state: xTree
	readable: xTree
	readonly: Read<xTree>
	subscribe(subscription: Subscription<xTree>): () => void
	track<X>(observer: Observer<xTree, X>, reaction?: Reaction<X>, options?: {flip?: boolean}): () => void
	unsubscribeAll(): void
	untrackAll(): void
	wait(): Promise<void>
}

export interface Snapstate<xTree extends StateTree> extends RestrictedSnapstate<xTree> {
	writable: xTree
}

export type GetTree<xSnap extends RestrictedSnapstate<StateTree>> =
	xSnap extends RestrictedSnapstate<infer xTree>
		? xTree
		: never
