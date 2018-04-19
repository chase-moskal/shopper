
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {observable, action, autorun} from "mobx"

import {formatPriceTag} from "../money"
import CartItem from "../stores/cart-item"

export interface CartItemDisplayProps {
	item: CartItem
}

@observer
export default class CartItemDisplay extends Component<CartItemDisplayProps, any> {

	private readonly handleQuantityInputChange = (event: Event) => {
		const input = event.target as HTMLInputElement
		const {item} = this.props
		const value = parseInt(input.value)
		console.log("VALUE", value)
		item.setQuantity(value)
	}

	render() {
		const {item} = this.props
		return (
			<li>
				<span>
					<input type="number"
						value={item.quantity.toString()}
						min="1"
						max="10"
						onChange={this.handleQuantityInputChange}
						onKeyUp={this.handleQuantityInputChange}
						onMouseUp={this.handleQuantityInputChange}
						onClick={this.handleQuantityInputChange}
						onBlur={this.handleQuantityInputChange}
						/>
				</span>
				<span>#{item.id}</span>
				<span>"{item.title}"</span>
				<strong>{formatPriceTag(item.cents * item.quantity, item.currency)}</strong>
			</li>
		)
	}
}
