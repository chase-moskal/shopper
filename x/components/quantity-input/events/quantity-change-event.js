class QuantityChangeEvent extends CustomEvent {
    constructor(value) {
        super(QuantityChangeEvent.event, { detail: value });
    }
}
QuantityChangeEvent.event = "quantitychange";
export { QuantityChangeEvent };
//# sourceMappingURL=quantity-change-event.js.map