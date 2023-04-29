
export class SnapstateError extends Error {
	name = this.constructor.name
}

export class SnapstateReadonlyError extends SnapstateError {}
export class SnapstateCircularError extends SnapstateError {}
export class SnapstateTreeError extends SnapstateError {}
