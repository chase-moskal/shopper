var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function prepareActions({ state, update, getters, checkout, defaultQuantityMax, }) {
    function zeroAllQuantity() {
        for (const item of state.catalog)
            item.quantity = 0;
    }
    return {
        addToCart(item) {
            return __awaiter(this, void 0, void 0, function* () {
                item.quantity = (item.quantity < 1)
                    ? 1
                    : item.quantity;
                state.checkedOut = false;
            });
        },
        setItemQuantity(item, quantity) {
            return __awaiter(this, void 0, void 0, function* () {
                item.quantity = quantity;
                state.checkedOut = false;
            });
        },
        clearCart() {
            return __awaiter(this, void 0, void 0, function* () {
                zeroAllQuantity();
                state.checkedOut = false;
            });
        },
        checkout({ checkoutInSameWindow }) {
            return __awaiter(this, void 0, void 0, function* () {
                const checkoutLocation = checkoutInSameWindow
                    ? window.location
                    : (() => {
                        const checkoutWindow = window.open("", "_blank");
                        checkoutWindow.document.write(`loading checkout... if you are experiencing issues, please contact support`);
                        return checkoutWindow.location;
                    })();
                state.checkoutInProgress = true;
                update();
                const url = yield checkout(getters.itemsInCart);
                state.checkoutInProgress = false;
                state.checkedOut = true;
                update();
                zeroAllQuantity();
                checkoutLocation.href = url;
            });
        },
        setError(message) {
            return __awaiter(this, void 0, void 0, function* () {
                state.error = message;
                state.catalog = [];
                state.checkedOut = false;
            });
        },
        setShopifyResults({ products }) {
            return __awaiter(this, void 0, void 0, function* () {
                state.catalog = products.map(product => ({
                    product,
                    quantity: 0,
                    quantityMin: 1,
                    quantityMax: defaultQuantityMax,
                }));
                state.checkedOut = false;
            });
        }
    };
}
//# sourceMappingURL=prepare-actions.js.map