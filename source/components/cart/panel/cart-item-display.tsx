
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {CartItemDisplayProps} from "./panel-interfaces"

@observer
export class CartItemDisplay extends Component<CartItemDisplayProps, any> {

	private readonly handleQuantityInputChange = (event: Event): void => {
		const input = event.target as HTMLInputElement
		const {item} = this.props
		const value = parseInt(input.value)
		item.setQuantity(value ? value : 0)
	}

	private readonly handleRemoval = (event: Event): void => {
		this.props.item.setQuantity(0)
	}

	render() {
		const {item, cartItemText} = this.props
		const {product} = item
		return (
			<li className="cart-item-display">
				<button
					className="item-remove-button"
					onClick={this.handleRemoval}
					title={cartItemText.remove.title}>
				</button>

				<input
					className="item-quantity"
					type="number"
					value={item.quantity.toString()}
					min={item.quantityMin}
					max={item.quantityMax}
					onChange={this.handleQuantityInputChange}
					onKeyUp={this.handleQuantityInputChange}
					onMouseUp={this.handleQuantityInputChange}
					onClick={this.handleQuantityInputChange}
					onBlur={this.handleQuantityInputChange}
					/>

				<div className="item-title">{product.title}</div>
				<div className="item-price pricevalue">{item.price}</div>
			</li>
		)
	}
}
