
import {Cart} from "../../stores/cart"
import {CheckoutMachineBase} from "../../interfaces"

/**
 * CART BUTTON PROPS INTERFACE
 */
export interface CartButtonProps {
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
}
