
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {Cart} from "../../stores/cart"
import {CartButton} from "./cart-button"
import {isDescendant} from "../../toolbox"
import {CartPanel} from "./panel/cart-panel"
import {CheckoutMachineBase} from "../../stores/checkout-machine-base"

/**
 * CART SYSTEM PROPS INTERFACE
 */
export interface CartSystemProps {
	cart: Cart
	checkoutMachine: CheckoutMachineBase
}

/**
 * CART SYSTEM CLASS
 */
@observer
export class CartSystem extends Component<CartSystemProps, any> {
	private getElement() {
		const element = this.base // document.querySelector(".shopperman .cart-system")
		if (!element) throw new Error("unable to find shopperman cart system element")
		return element
	}

	private readonly handleOutsideActivity = ({target}: MouseEvent) => {
		if (!isDescendant(target as Element, this.getElement())) {
			this.props.cart.togglePanelOpen(false)
		}
	}

	private readonly handleCartButtonClick = () => this.props.cart.togglePanelOpen()

	private readonly handleCartBlur = () => this.props.cart.togglePanelOpen(false)

	componentWillMount() {
		window.addEventListener("mousedown", this.handleOutsideActivity)
		// window.addEventListener("focus", this.handleOutsideActivity, true)
		// window.addEventListener("blur", this.handleOutsideActivity, true)
	}

	componentWillUnmount() {
		window.removeEventListener("mousedown", this.handleOutsideActivity)
		// window.removeEventListener("focus", this.handleOutsideActivity)
		// window.removeEventListener("blur", this.handleOutsideActivity)
	}

	render() {
		const {cart, checkoutMachine} = this.props
		return (
			<section
				className="cart-system"
				data-panel-open={cart.panelOpen ? "true" : "false"}
				onBlur={this.handleCartBlur}>
					<CartButton {...{cart, onClick: this.handleCartButtonClick}}/>
					<CartPanel {...{cart, checkoutMachine}}/>
			</section>
		)
	}
}
