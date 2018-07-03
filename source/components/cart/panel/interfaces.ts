
import {Cart} from "../../../stores/cart"
import {CartItem} from "../../../stores/cart-item"

/**
 * CART CALCULATED RESULTS PROPS INTERFACE
 */
export interface CartCalculatedResultsProps {
	cart: Cart
}

/**
 * Perform checkout function signature
 * - function to call when the checkout is triggered
 */
export type PerformCheckout = () => Promise<string>

/**
 * CART CHECKOUT PROPS INTERFACE
 */
export interface CartCheckoutProps {
	cart: Cart
	buttonText: string
	performCheckout: PerformCheckout
}

/**
 * CART ITEM DISPLAY PROPS INTERFACE
 */
export interface CartItemDisplayProps {
	item: CartItem
}

/**
 * CART CALCULATED RESULTS PROPS INTERFACE
 */
export interface CartPanelProps {
	cart: Cart
	performCheckout: PerformCheckout
}
