
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {CartPanelProps} from "./interfaces"
import {CartCheckout} from "./cart-checkout"
import {CartManipulator} from "./cart-manipulator"
import {CartCalculatedResults} from "./cart-calculated-results"

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
		const {cart, cartPanelText} = this.props
		return (
			<h1>
				<span>{cartPanelText.heading}</span>
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
		const {cart, performCheckout, cartPanelText} = this.props
		const {cartItemText, cartCalculatedText, cartCheckoutText} = cartPanelText
		return (
			<div className="cart-panel">
				{this.renderCartTitleBar()}
				<CartManipulator {...{cart, cartItemText}}/>
				<CartCalculatedResults {...{cart, cartCalculatedText}}/>
				<CartCheckout {...{cart, performCheckout, cartCheckoutText}}/>
			</div>
		)
	}
}
