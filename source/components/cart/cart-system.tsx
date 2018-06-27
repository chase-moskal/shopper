
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {Cart} from "../../stores/cart"
import {CartButton} from "./cart-button"
import {isDescendant} from "../../toolbox"
import {CartManipulator} from "./cart-manipulator"
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
			this.props.cart.toggle(false)
		}
	}

	private readonly handleCartButtonClick = () => this.props.cart.toggle()

	private readonly handleCartBlur = () => this.props.cart.toggle(false)

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

	private readonly handleCheckout = (event: Event) => {
		const checkoutWindow = window.open("", "_blank")
		const {cart, checkoutMachine} = this.props
		const checkoutUrl = checkoutMachine.checkout(cart.activeItems)
			.then(checkoutUrl => {
				checkoutWindow.location.href = checkoutUrl
			})
		event.preventDefault()
		return false
	}

	render() {
		const {cart} = this.props
		return (
			<section
				className="cart-system"
				data-open={cart.open ? "true" : "false"}
				onBlur={this.handleCartBlur}>

					<CartButton {...{cart, onClick: this.handleCartButtonClick}}/>

					<div className="cart-panel">
						<h1>
							<span>Shopping Cart</span>
							&nbsp;
							<span>- {cart.activeItems.length === 0 ? "empty" : `${cart.activeItems.length} item${cart.activeItems.length === 1 ? "" : "s"}`}</span>
						</h1>

						<CartManipulator {...{cart}}/>

						<div className="cart-checkout">
							{
								cart.activeItems.length
									? (
										<a className="checkout-button"
											href="#"
											onClick={this.handleCheckout}
											target="_blank">
												Checkout
										</a>
									)
									: null
							}
						</div>
					</div>
			</section>
		)
	}
}
