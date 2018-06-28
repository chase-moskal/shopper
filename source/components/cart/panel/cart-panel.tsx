
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

	/**
	 * Cart title bar displays number of items
	 */
	private readonly CartTitleBar = ({cart}: {cart: Cart}) => (
		<h1>
			<span>Shopping Cart</span>
			&nbsp;
			<span>– {
				cart.activeItems.length === 0
					? "empty"
					: `${
						cart.activeItems.length} item${cart.activeItems.length === 1
							? ""
							: "s"
					}`
			}</span>
		</h1>
	)

	/**
	 * Handle cart close
	 */
	private readonly handleCartClose = (event: MouseEvent) => {
		const {cart} = this.props
		cart.togglePanelOpen(false)
	}

	/**
	 * Cart close button component
	 */
	private readonly CartCloseButton = () => (
		<a onClick={this.handleCartClose}>Close</a>
	)

	/**
	 * Handle checkout by calling the checkout machine
	 */
	private readonly handleCheckout = (event: Event) => {
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

	/**
	 * Render the cart component
	 */
	render() {
		const {cart} = this.props
		const {handleCheckout: onCheckout, CartCloseButton, CartTitleBar} = this

		return (
			<div className="cart-panel">
				<CartTitleBar {...{cart}}/>
				<CartCloseButton {...{cart}}/>
				<CartManipulator {...{cart}}/>
				<CartCalculatedResults {...{cart}}/>
				<CartCheckout {...{cart, onCheckout, buttonText: "Checkout"}}/>
			</div>
		)
	}
}
