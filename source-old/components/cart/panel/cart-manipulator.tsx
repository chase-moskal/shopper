
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {CartItemDisplay} from "./cart-item-display"
import {CartManipulatorProps} from "./panel-interfaces"

@observer
export class CartManipulator extends Component<CartManipulatorProps, any> {

	render() {
		const {cart, cartItemText} = this.props
		return (
			<div className="cart-manipulator">
				<ol className="cart-item-list cart-grid">
					{cart.activeItems.map(item => <CartItemDisplay {...{item, cartItemText}}/>)}
				</ol>
			</div>
		)
	}
}
