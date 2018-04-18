
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {observable, action, autorun} from "mobx"

import Cart from "../stores/cart"

@observer
export default class CartManipulator extends Component<{cart: Cart}, any> {
	render() {
		const {cart} = this.props
		return (
			<div className="cart-manipulator">
				<ol className="cart-list-items">
					{cart.items.map(item => {
						return (
							<li>
								<span><input type="number" value="1" min="1" max="5"/></span>
								<span>#{item.id}</span>
								<span>"{item.title}"</span>
								<strong>{item.price}</strong>
							</li>
						)
					})}
				</ol>
				<ol className="cart-list-results">
					<li><span>Subtotal:</span> <strong>{cart.subtotal}</strong></li>
				</ol>
			</div>
		)
	}
}
