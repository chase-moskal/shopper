
import {CartStore} from "../../stores/cart-store"
import {ScrollTrackerStore} from "../../stores/scroll-tracker-store"
import {CheckoutMachineBase} from "../../ecommerce/checkout-machine-base"

import {CartPanelText} from "./panel/panel-interfaces"

export interface CartButtonText {
	open: {
		title: string
	}
	closed: {
		title: string
	}
}

/**
 * Text labels to display throughout the system
 */
export interface CartText {
	cartButtonText: CartButtonText
	cartPanelText: CartPanelText
}

/**
 * Props for the cart button component
 */
export interface CartButtonProps {
	cartButtonText: CartButtonText
	cart: CartStore
	onClick: (event: MouseEvent) => void
}

/**
 * Props for the cart system component
 */
export interface CartSystemProps {

	/** Cart store contains cart items */
	cart: CartStore

	/** Checkout machine generates checkout url */
	checkoutMachine: CheckoutMachineBase

	/** Whether to open the checkout url in a new window */
	checkoutInNewWindow: boolean

	/** Keeps track of a scroll observable */
	scrollTracker?: ScrollTrackerStore

	/** Display text to show throughout the cart */
	cartText?: CartText
}
