
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {CartPanelProps} from "./panel-interfaces"
import {CartCheckout} from "./cart-checkout"
import {CartManipulator} from "./cart-manipulator"
import {CartCalculatedResults} from "./cart-calculated-results"

@observer
export class CartPanel extends Component<CartPanelProps, any> {

	/**
	 * Render cart title
	 * - displays number of cart items
	 */
	private renderCartTitle() {
		const {cart, cartPanelText} = this.props
		return (
			<h1 className="cart-panel-title">
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
	 * Render the cart panel
	 */
	render() {
		const {cart, performCheckout, cartPanelText} = this.props
		const {cartItemText, cartCalculatedText, cartCheckoutText} = cartPanelText
		return (
			<div className="cart-panel">
				{this.renderCartTitle()}
				<div className="cart-panel-content">
					<CartManipulator {...{cart, cartItemText}}/>
					<CartCalculatedResults {...{cart, cartCalculatedText}}/>
					<CartCheckout {...{cart, performCheckout, cartCheckoutText}}/>
				</div>
			</div>
		)
	}
}
