
export class QuantityChangeEvent extends CustomEvent<number> {
	static event = "quantitychange"
	constructor(value: number) {
		super(QuantityChangeEvent.event, {detail: value})
	}
}
