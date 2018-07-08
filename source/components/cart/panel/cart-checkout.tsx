
import {reaction, IReactionPublic} from "mobx"
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {CartCheckoutProps} from "./interfaces"

/**
 * CART CHECKOUT CLASS
 */
@observer
export class CartCheckout extends Component<CartCheckoutProps, any> {

	private reactions = []

	componentWillMount() {
		this.reactions.push(
				reaction(
					() => {
						const {panelOpen, activeItems} = this.props.cart
						return {panelOpen, activeItems}
					},
					({panelOpen, activeItems}) => {
						if (panelOpen && activeItems.length > 0) {
							const checkoutButton = this.base.querySelector<HTMLButtonElement>(".checkout-button")
							if (checkoutButton) checkoutButton.focus()
						}
					}
				)
		)
	}

	componentWillUnmount() {
		for (const reaction of this.reactions) reaction.dispose()
		this.reactions = []
	}

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
						<button className="checkout-button"
							title={cartCheckoutText.title}
							href="#"
							onClick={handleCheckout}
							target="_blank">
								{cartCheckoutText.content}
						</button>
					)
					: null
			}</div>
		)
	}
}
