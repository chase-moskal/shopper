
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {CartItemDisplayProps} from "./interfaces"

@observer
export class CartItemDisplay extends Component<CartItemDisplayProps, any> {

	private readonly handleQuantityInputChange = (event: Event): void => {
		const input = event.target as HTMLInputElement
		const {item} = this.props
		const value = parseInt(input.value)
		item.setQuantity(value)
	}

	private readonly handleRemoval = (event: Event): void => {
		this.props.item.setQuantity(0)
	}

	render() {
		const {item, cartItemText} = this.props
		const {product} = item
		return (
			<li className="cart-item-display">
				<button className="remove-button"
					onClick={this.handleRemoval}
					title={cartItemText.remove.title}>
						{cartItemText.remove.content}
				</button>
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
				<strong>{item.price}</strong>
			</li>
		)
	}
}
