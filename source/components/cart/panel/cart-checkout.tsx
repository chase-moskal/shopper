
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {CartCheckoutProps} from "./interfaces"

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
