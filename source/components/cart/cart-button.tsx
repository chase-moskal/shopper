
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {Cart} from "../../stores/cart"

export interface CartButtonProps {
	cart: Cart
	onClick: (event: MouseEvent) => void
}

@observer
export class CartButton extends Component<CartButtonProps, any> {
	render() {
		const {cart, onClick} = this.props
		return (
			<a className="cart-button" onClick={onClick}>
				<span className="cart-button-text">Cart</span>
				<span className="cart-button-numeral">{cart.items.length}</span>
			</a>
		)
	}
}
