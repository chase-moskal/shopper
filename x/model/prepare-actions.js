export function prepareActions({ state, update, getters, checkout, defaultQuantityMax, }) {
    function zeroAllQuantity() {
        for (const item of state.catalog)
            item.quantity = 0;
    }
    return {
        async addToCart(item) {
            item.quantity = (item.quantity < 1)
                ? 1
                : item.quantity;
            state.checkedOut = false;
        },
        async setItemQuantity(item, quantity) {
            item.quantity = quantity;
            state.checkedOut = false;
        },
        async clearCart() {
            zeroAllQuantity();
            state.checkedOut = false;
        },
        async checkout({ checkoutInSameWindow }) {
            const checkoutLocation = checkoutInSameWindow
                ? window.location
                : (() => {
                    const checkoutWindow = window.open("", "_blank");
                    checkoutWindow.document.write(`loading checkout... if you are experiencing issues, please contact support`);
                    return checkoutWindow.location;
                })();
            state.checkoutInProgress = true;
            update();
            const url = await checkout(getters.itemsInCart);
            state.checkoutInProgress = false;
            state.checkedOut = true;
            update();
            zeroAllQuantity();
            checkoutLocation.href = url;
        },
        async setError(message) {
            state.error = message;
            state.catalog = [];
            state.checkedOut = false;
        },
        async setShopifyResults({ products }) {
            state.catalog = products.map(product => ({
                product,
                quantity: 0,
                quantityMin: 1,
                quantityMax: defaultQuantityMax,
            }));
            state.checkedOut = false;
        }
    };
}
//# sourceMappingURL=prepare-actions.js.map