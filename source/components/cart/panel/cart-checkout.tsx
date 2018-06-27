
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {Cart} from "../../../stores/cart"

/**
 * Checkout handler
 * - function to call when the checkout is triggered
 */
export type CheckoutHandler = (event: Event) => void

/**
 * CART CHECKOUT PROPS INTERFACE
 */
export interface CartCheckoutProps {
	cart: Cart
	buttonText: string
	onCheckout: CheckoutHandler
}

/**
 * CART CHECKOUT CLASS
 */
@observer
export class CartCheckout extends Component<CartCheckoutProps, any> {

	render() {
		const {cart, onCheckout, buttonText} = this.props
		return (
			<div className="cart-checkout">{
				cart.activeItems.length
					? (
						<a className="checkout-button"
							href="#"
							onClick={onCheckout}
							target="_blank">
								{buttonText}
						</a>
					)
					: null
			}</div>
		)
	}
}
