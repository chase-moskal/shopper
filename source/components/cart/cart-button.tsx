
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {CartButtonProps} from "./interfaces"

@observer
export class CartButton extends Component<CartButtonProps, any> {
	render() {
		const {cart, onClick} = this.props
		return (
			<a className="cart-button" onClick={onClick}>
				<span className="cart-button-text">Cart</span>
				<span className="cart-button-numeral">{cart.activeItems.length}</span>
			</a>
		)
	}
}
