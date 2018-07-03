
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {CartButtonProps} from "./interfaces"

@observer
export class CartButton extends Component<CartButtonProps, any> {
	render() {
		const {cart, onClick} = this.props
		const title: string = cart.panelOpen
			? "close shopping cart"
			: "open shopping cart"
		return (
			<a className="cart-button" {...{onClick, title}}>
				{
					cart.panelOpen
						? <span className="cart-close">❌</span>
						: <span className="cart-numeral">{cart.activeItems.length}</span>
				}
			</a>
		)
	}
}
