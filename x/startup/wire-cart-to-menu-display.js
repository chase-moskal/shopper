import { select } from "../toolbox/select.js";
export function wireCartToMenuDisplay({ cartSelector }) {
    // toggle open the menu display when the cart's first item is added
    try {
        const shopperCart = select(cartSelector);
        if (!shopperCart)
            return false;
        shopperCart.onFirstAdd = () => {
            const parent = shopperCart.parentElement;
            if (parent
                && parent.tagName.toLowerCase() === "menu-display"
                && !parent.open
                && parent.toggle) {
                parent.toggle();
            }
        };
    }
    catch (error) {
        error.message = `failed to wire cart to menu-display: ${error.message}`;
        console.error(error);
    }
}
//# sourceMappingURL=wire-cart-to-menu-display.js.map