
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {observable, action, autorun} from "mobx"

import Cart from "../stores/cart"
import CartButton from "./cart-button"
import CartManipulator from "./cart-manipulator"

@observer
export default class CartSystem extends Component<{cart: Cart}, any> {

	private readonly handleCartButtonClick = (event: MouseEvent) => this.props.cart.toggle()

	render() {
		const {cart} = this.props
		return (
			<div className="cart-system">
				<CartButton {...{cart, onClick: this.handleCartButtonClick}}/>
				<div className="cart-panel" data-open={cart.open ? "true" : "false"}>
					<CartManipulator {...{cart}}/>
					<a className="cart-checkout">Checkout</a>
				</div>
			</div>
		)
	}
}
