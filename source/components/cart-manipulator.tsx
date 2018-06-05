
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {observable, action, autorun} from "mobx"

import {Cart} from "../stores/cart"
import {CartItemDisplay} from "./cart-item-display"

@observer
export class CartManipulator extends Component<{cart: Cart}, any> {
	render() {
		const {cart} = this.props
		return (
			<div className="cart-manipulator">
				<ol className="cart-list-items">
					{cart.items.map(item => <CartItemDisplay {...{item}}/>)}
				</ol>
				<ol className="cart-list-results">
					<li>
						<span>Subtotal:</span>
						&nbsp;
						<strong>{cart.subtotal}</strong>
					</li>
				</ol>
			</div>
		)
	}
}
