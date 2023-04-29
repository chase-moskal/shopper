
export class CrosscallApiError extends Error {
	readonly name = this.constructor.name
}

export const err = (message: string) => new CrosscallApiError(message)
