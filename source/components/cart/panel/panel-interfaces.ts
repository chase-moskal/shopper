
import {CartStore} from "../../../stores/cart-store"
import {CartItemStore} from "../../../stores/cart-item-store"

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
	cart: CartStore
	cartCalculatedText: CartCalculatedText
}

/**
 * Perform checkout function signature
 * - function to call when the checkout is triggered
 */
export type PerformCheckout = () => Promise<string>

export interface CartCheckoutProps {
	cart: CartStore
	cartCheckoutText: CartCheckoutText
	performCheckout: PerformCheckout
}

export interface CartItemDisplayProps {
	item: CartItemStore
	cartItemText: CartItemText
}

export interface CartPanelProps {
	cart: CartStore
	cartPanelText: CartPanelText
	performCheckout: PerformCheckout
}

export interface CartManipulatorProps {
	cart: CartStore
	cartItemText: CartItemText
}
