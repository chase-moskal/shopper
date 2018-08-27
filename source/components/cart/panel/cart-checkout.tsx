
import {reaction} from "mobx"
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {CartCheckoutProps} from "./panel-interfaces"

@observer
export class CartCheckout extends Component<CartCheckoutProps, any> {

	private reactions = []
	private lastItemsInCart: number = 0
	private lastActiveItemsLength: number = 0

	componentWillMount() {
		this.reactions.push(
			reaction(
				() => this.props.cart.activeItems.length,
				activeItemsLength => {
					const changed = activeItemsLength !== this.lastActiveItemsLength

					if (changed) {
						const itemsIncreased = activeItemsLength > this.lastActiveItemsLength
						if (itemsIncreased) {
							setTimeout(() => {
								const checkoutButton = this.base.querySelector<HTMLButtonElement>(".checkout-button")
								if (checkoutButton) checkoutButton.focus()
							}, 0)
						}
					}

					this.lastActiveItemsLength = activeItemsLength
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
		const cartIsEmpty = !cart.activeItems.length
		return (
			<div className="cart-checkout">
				<button
					className="checkout-button"
					title={cartCheckoutText.title}
					onClick={handleCheckout}
					disabled={cartIsEmpty}>
						{cartCheckoutText.content}
				</button>
			</div>
		)
	}
}
