
import {Cart} from "../../stores/cart"
import {CartPanelText} from "./panel/interfaces"
import {CheckoutMachineBase} from "../../interfaces"
import {ScrollTracker} from "../../stores/scroll-tracker"

export interface CartButtonText {
	open: {
		title: string
		content: string
	}
	closed: {
		title: string
	}
}

export interface CartText {
	cartButtonText: CartButtonText
	cartPanelText: CartPanelText
}

/**
 * CART BUTTON PROPS INTERFACE
 */
export interface CartButtonProps {
	cartButtonText: CartButtonText
	cart: Cart
	onClick: (event: MouseEvent) => void
}

/**
 * CART SYSTEM PROPS INTERFACE
 */
export interface CartSystemProps {

	/** Cart store contains cart items */
	cart: Cart

	/** Checkout machine generates checkout url */
	checkoutMachine: CheckoutMachineBase

	/** Whether to open the checkout url in a new window */
	checkoutInNewWindow: boolean

	/** Keeps track of a scroll observable */
	scrollTracker?: ScrollTracker

	/** Display text to show throughout the cart */
	cartText?: CartText
}
