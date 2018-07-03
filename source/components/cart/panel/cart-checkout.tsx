
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {Cart} from "../../../stores/cart"

/**
 * Perform checkout function signature
 * - function to call when the checkout is triggered
 */
export type PerformCheckout = () => Promise<string>

/**
 * CART CHECKOUT PROPS INTERFACE
 */
export interface CartCheckoutProps {
	cart: Cart
	buttonText: string
	performCheckout: PerformCheckout
}

/**
 * CART CHECKOUT CLASS
 */
@observer
export class CartCheckout extends Component<CartCheckoutProps, any> {

	private readonly handleCheckout = (event: Event) => {
		this.props.performCheckout()
		event.preventDefault()
		return false
	}

	render() {
		const {handleCheckout} = this
		const {cart, buttonText} = this.props
		return (
			<div className="cart-checkout">{
				cart.activeItems.length
					? (
						<a className="checkout-button"
							href="#"
							onClick={handleCheckout}
							target="_blank">
								{buttonText}
						</a>
					)
					: null
			}</div>
		)
	}
}
