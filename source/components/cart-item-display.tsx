
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {observable, action, autorun} from "mobx"

import CartItem from "../stores/cart-item"

export interface CartItemDisplayProps {
	item: CartItem
}

@observer
export default class CartItemDisplay extends Component<CartItemDisplayProps, any> {
	render() {
		const {item} = this.props
		return (
			<li>
				<span><input type="number" value="1" min="1" max="5"/></span>
				<span>#{item.id}</span>
				<span>"{item.title}"</span>
				<strong>{item.price}</strong>
			</li>
		)
	}
}
