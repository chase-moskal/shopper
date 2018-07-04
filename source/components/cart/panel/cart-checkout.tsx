
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
		const {cart, cartCheckoutText} = this.props
		return (
			<div className="cart-checkout">{
				cart.activeItems.length
					? (
						<a className="checkout-button"
							title={cartCheckoutText.title}
							href="#"
							onClick={handleCheckout}
							target="_blank">
								{cartCheckoutText.content}
						</a>
					)
					: null
			}</div>
		)
	}
}
