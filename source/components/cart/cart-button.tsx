
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {CartButtonProps, CartButtonText} from "./interfaces"

@observer
export class CartButton extends Component<CartButtonProps, any> {
	render() {
		const {cart, onClick, cartButtonText} = this.props
		const title = cart.panelOpen
			? cartButtonText.open.title
			: cartButtonText.closed.title
		return (
			<button className="cart-button" tabIndex={0} {...{onClick, title}}>
				{
					cart.panelOpen
						? <span className="cart-close">{cartButtonText.open.content}</span>
						: <span className="cart-numeral">{cart.activeItems.length}</span>
				}
			</button>
		)
	}
}
