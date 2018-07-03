
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {Cart} from "../../../stores/cart"
import {CartManipulator} from "./cart-manipulator"
import {CartCheckout, PerformCheckout} from "./cart-checkout"
import {CartCalculatedResults} from "./cart-calculated-results"

/**
 * CART CALCULATED RESULTS PROPS INTERFACE
 */
export interface CartPanelProps {
	cart: Cart
	performCheckout: PerformCheckout
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
	 * Render the cart component
	 */
	render() {
		const {cart, performCheckout} = this.props
		const {CartCloseButton, CartTitleBar} = this

		return (
			<div className="cart-panel">
				<CartTitleBar {...{cart}}/>
				<CartCloseButton {...{cart}}/>
				<CartManipulator {...{cart}}/>
				<CartCalculatedResults {...{cart}}/>
				<CartCheckout {...{cart, performCheckout, buttonText: "Checkout"}}/>
			</div>
		)
	}
}
