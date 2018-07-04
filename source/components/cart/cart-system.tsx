
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {CartButton} from "./cart-button"
import {CartPanel} from "./panel/cart-panel"
import {PerformCheckout} from "./panel/interfaces"
import {CartSystemProps, CartText} from "./interfaces"

export const defaultCartText: CartText = {
	cartButtonText: {
		open: {
			title: "Close the cart",
			content: "❌"
		},
		closed: {
			title: "Open the cart"
		}
	},
	cartPanelText: {
		heading: "Shopping cart",
		cartItemText: {
			remove: {
				title: "Remove cart item",
				content: "❌"
			}
		},
		cartCalculatedText: {
			subtotal: {
				content: "Subtotal"
			}
		},
		cartCheckoutText: {
			title: "Buy cart items",
			content: "Checkout"
		}
	}
}

/**
 * Cart system class
 */
@observer
export class CartSystem extends Component<CartSystemProps, any> {

	/**
	 * Perform checkout function
	 * - call the checkout machine to obtain checkout url
	 * - open the checkout url in a new window or same window
	 */
	private readonly performCheckout: PerformCheckout = async(): Promise<string> => {
		const {cart, checkoutMachine, checkoutInNewWindow} = this.props

		const checkoutLocation: Location = checkoutInNewWindow
			? window.open("", "_blank").location
			: window.location

		const checkoutUrl = await checkoutMachine.checkout(cart.activeItems)
		cart.clear()
		cart.togglePanelOpen(false)
		checkoutLocation.href = checkoutUrl

		return checkoutUrl
	}

	private readonly handleCartButtonClick = () => this.props.cart.togglePanelOpen()
	private readonly handleCartBlur = () => this.props.cart.togglePanelOpen(false)

	render() {
		const {performCheckout, handleCartButtonClick: onClick} = this
		const {cart, cartText = defaultCartText} = this.props
		const {cartButtonText, cartPanelText} = cartText
		return (
			<section
				className="cart-system"
				data-panel-open={cart.panelOpen ? "true" : "false"}
				onBlur={this.handleCartBlur}>
					<CartButton {...{cart, onClick, cartButtonText}}/>
					<CartPanel {...{cart, performCheckout, cartPanelText}}/>
			</section>
		)
	}
}
