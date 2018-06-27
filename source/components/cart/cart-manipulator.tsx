
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {Cart} from "../../stores/cart"
import {CartItemDisplay} from "./cart-item-display"

@observer
export class CartManipulator extends Component<{cart: Cart}, any> {
	render() {
		const {cart} = this.props
		return (
			<div className="cart-manipulator">
				<ol className="cart-list-items">
					{cart.activeItems.map(item => <CartItemDisplay {...{item}}/>)}
				</ol>
				<ol className="cart-list-results">
					{
						cart.activeItems.length
							? (
								<li>
									<span>Subtotal:</span>
									&nbsp;
									<strong>{cart.price}</strong>
								</li>
							)
							: null
					}
				</ol>
			</div>
		)
	}
}
