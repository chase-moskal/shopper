export class QuantityChangeEvent extends CustomEvent {
    constructor(value) {
        super(QuantityChangeEvent.event, { detail: value });
    }
}
QuantityChangeEvent.event = "quantitychange";
//# sourceMappingURL=quantity-change-event.js.map