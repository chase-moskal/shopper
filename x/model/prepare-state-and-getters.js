export function prepareStateAndGetters() {
    const state = {
        error: "",
        catalog: [],
        checkedOut: false,
        checkoutInProgress: false,
    };
    const getters = {
        get itemsInCart() {
            return state.catalog.filter(item => item.quantity > 0);
        },
        get cartValue() {
            return getters.itemsInCart.reduce((subtotal, item) => subtotal + (item.product.value * item.quantity), 0);
        },
        get cartQuantity() {
            return (() => {
                let sum = 0;
                for (const item of getters.itemsInCart)
                    sum += item.quantity;
                return sum;
            })();
        },
        getUnitValue(item) {
            return item.product.value;
        },
        getLineValue(item) {
            return item.product.value * item.quantity;
        },
        getLineComparedValue(item) {
            return item.product.comparedValue
                ? item.product.comparedValue * item.quantity
                : null;
        },
    };
    return { state, getters };
}
//# sourceMappingURL=prepare-state-and-getters.js.map