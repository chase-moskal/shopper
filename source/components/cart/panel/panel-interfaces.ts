
import {Cart} from "../../../stores/cart"
import {CartItem} from "../../../stores/cart-item"

export interface CartItemText {
	remove: {
		title: string
	}
}

export interface CartCalculatedText {
	subtotal: {
		content: string
	}
}

export interface CartCheckoutText {
	title: string
	content: string
}

export interface CartPanelText {
	heading: string
	cartItemText: CartItemText
	cartCalculatedText: CartCalculatedText
	cartCheckoutText: CartCheckoutText
}

export interface CartCalculatedResultsProps {
	cart: Cart
	cartCalculatedText: CartCalculatedText
}

/**
 * Perform checkout function signature
 * - function to call when the checkout is triggered
 */
export type PerformCheckout = () => Promise<string>

export interface CartCheckoutProps {
	cart: Cart
	cartCheckoutText: CartCheckoutText
	performCheckout: PerformCheckout
}

export interface CartItemDisplayProps {
	item: CartItem
	cartItemText: CartItemText
}

export interface CartPanelProps {
	cart: Cart
	cartPanelText: CartPanelText
	performCheckout: PerformCheckout
}

export interface CartManipulatorProps {
	cart: Cart
	cartItemText: CartItemText
}
