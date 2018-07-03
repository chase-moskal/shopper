
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {CartButton} from "./cart-button"
import {CartPanel} from "./panel/cart-panel"
import {CartSystemProps} from "./interfaces"
import {PerformCheckout} from "./panel/interfaces"

/**
 * CART SYSTEM CLASS
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
		const {performCheckout} = this
		const {cart} = this.props
		return (
			<section
				className="cart-system"
				data-panel-open={cart.panelOpen ? "true" : "false"}
				onBlur={this.handleCartBlur}>
					<CartButton {...{cart, onClick: this.handleCartButtonClick}}/>
					<CartPanel {...{cart, performCheckout}}/>
			</section>
		)
	}

	// private getElement() {
	// 	const element = this.base // document.querySelector(".shopperman .cart-system")
	// 	if (!element) throw new Error("unable to find shopperman cart system element")
	// 	return element
	// }

	// private readonly handleOutsideActivity = ({target}: MouseEvent) => {
	// 	if (!isDescendant(target as Element, this.getElement())) {
	// 		this.props.cart.togglePanelOpen(false)
	// 	}
	// }

	// componentWillMount() {
	// 	window.addEventListener("mousedown", this.handleOutsideActivity)
	// 	// window.addEventListener("focus", this.handleOutsideActivity, true)
	// 	// window.addEventListener("blur", this.handleOutsideActivity, true)
	// }

	// componentWillUnmount() {
	// 	window.removeEventListener("mousedown", this.handleOutsideActivity)
	// 	// window.removeEventListener("focus", this.handleOutsideActivity)
	// 	// window.removeEventListener("blur", this.handleOutsideActivity)
	// }
}
