
export class RedcryptoRejectionError extends Error {
	name = this.constructor.name
	constructor(message: string) {
		super(message)
	}
}
