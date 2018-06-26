
import {formatCurrency} from "crnc"
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {CartItem} from "../../stores/cart-item"

export interface CartItemDisplayProps {
	item: CartItem
}

@observer
export class CartItemDisplay extends Component<CartItemDisplayProps, any> {

	private readonly handleQuantityInputChange = (event: Event) => {
		const input = event.target as HTMLInputElement
		const {item} = this.props
		const value = parseInt(input.value)
		item.setQuantity(value)
	}

	render() {
		const {item} = this.props
		const {product} = item
		return (
			<li>
				<span>
					<input type="number"
						value={item.quantity.toString()}
						min={item.quantityMin}
						max={item.quantityMax}
						onChange={this.handleQuantityInputChange}
						onKeyUp={this.handleQuantityInputChange}
						onMouseUp={this.handleQuantityInputChange}
						onClick={this.handleQuantityInputChange}
						onBlur={this.handleQuantityInputChange}
						/>
				</span>
				<span>#{product.id.substr(0, 7)}</span>
				<span>"{product.title}"</span>
				<strong>{product.price}</strong>
			</li>
		)
	}
}
