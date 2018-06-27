
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {Cart} from "../../../stores/cart"
import {CartCheckout} from "./cart-checkout"
import {CartManipulator} from "./cart-manipulator"
import {CartCalculatedResults} from "./cart-calculated-results"
import {CheckoutMachineBase} from "../../../stores/checkout-machine-base"

/**
 * CART CALCULATED RESULTS PROPS INTERFACE
 */
export interface CartPanelProps {
	cart: Cart
	checkoutMachine: CheckoutMachineBase
}

/**
 * CART CALCULATED RESULTS CLASS
 */
@observer
export class CartPanel extends Component<CartPanelProps, any> {

	private readonly onCheckout = (event: Event) => {
		const checkoutWindow = window.open("", "_blank")
		const {cart, checkoutMachine} = this.props
		checkoutMachine.checkout(cart.activeItems)
			.then(checkoutUrl => {
				checkoutWindow.location.href = checkoutUrl
				cart.clear()
				cart.togglePanelOpen(false)
			})
		event.preventDefault()
		return false
	}

	render() {
		const {cart} = this.props
		const {onCheckout} = this

		return (
			<div className="cart-panel">
				<h1>
					<span>Shopping Cart</span>
					&nbsp;
					<span>- {cart.activeItems.length === 0 ? "empty" : `${cart.activeItems.length} item${cart.activeItems.length === 1 ? "" : "s"}`}</span>
				</h1>
				<CartManipulator {...{cart}}/>
				<CartCalculatedResults {...{cart}}/>
				<CartCheckout {...{cart, onCheckout, buttonText: "Checkout"}}/>
			</div>
		)
	}
}
