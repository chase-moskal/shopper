
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {observable, action, autorun} from "mobx"

import CartStore from "./cart-store"
import CartButton, {CartButtonStore} from "./cart-button"

export class CartManipulatorStore {
	@observable cartStore: CartStore

	constructor({cartStore}: {cartStore: CartStore}) {
		this.cartStore = cartStore
	}
}

@observer
export default class CartManipulator extends Component<{store: CartManipulatorStore}, any> {
	render() {
		const {cartStore} = this.props.store
		return (
			<div className="cart-manipulator">
				<ol className="cart-list-items">
					{cartStore.cartItems.map(item => {
						return (
							<li>
								<span><input type="number" value="1" min="1" max="5"/></span> <span>#{item.id}</span> <strong>{0}</strong>
							</li>
						)
					})}
				</ol>
				<ol className="cart-list-results">
					<li><span>Subtotal:</span> <strong>{0}</strong></li>
					<li><span>Tax:</span> <strong>{0}</strong></li>
					<li><span>Total:</span> <strong>{0}</strong></li>
				</ol>
			</div>
		)
	}
}
