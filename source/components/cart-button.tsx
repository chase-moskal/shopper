
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {observable, action, autorun} from "mobx"

import CartStore from "./cart-store"

export class CartButtonStore {
	@observable numberOfCartItems: number = 0
	@action setNumberOfCartItems(n: number) { this.numberOfCartItems = n }
}

export interface CartButtonProps {
	store: CartButtonStore
	onClick: (event: MouseEvent) => void
}

@observer
export default class CartButton extends Component<CartButtonProps, any> {
	render() {
		const {store, onClick} = this.props
		return (
			<a className="cart-button" onClick={onClick}>
				<span className="cart-button-text">Cart</span>
				<span className="cart-button-numeral">{store.numberOfCartItems}</span>
			</a>
		)
	}
}
