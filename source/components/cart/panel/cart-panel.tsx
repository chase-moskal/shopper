
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
	 * Render cart title bar
	 * - displays number of cart items
	 */
	private renderCartTitleBar() {
		const {cart} = this.props
		return (
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
	}

	/**
	 * Handle cart close
	 */
	private readonly handleCartClose = (event: MouseEvent) => {
		this.props.cart.togglePanelOpen(false)
	}

	/**
	 * Render cart close button
	 * - click to close the cart
	 */
	private renderCartCloseButton() {
		return (
			<a onClick={this.handleCartClose}>Close</a>
		)
	}

	/**
	 * Render the cart component
	 */
	render() {
		const {cart, performCheckout} = this.props

		return (
			<div className="cart-panel">
				{this.renderCartTitleBar()}
				{this.renderCartCloseButton()}
				<CartManipulator {...{cart}}/>
				<CartCalculatedResults {...{cart}}/>
				<CartCheckout {...{cart, performCheckout, buttonText: "Checkout"}}/>
			</div>
		)
	}
}
