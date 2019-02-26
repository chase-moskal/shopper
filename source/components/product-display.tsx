
import {computed} from "mobx"
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {CartItemStore} from "../stores/cart-item-store"
import {ProductDisplayProps} from "./components-interfaces"

@observer
export class ProductDisplay extends Component<ProductDisplayProps> {

	@computed get cartItem(): CartItemStore {
		const {cart, product} = this.props
		return cart.getProductItem(product)
	}

	@computed get inCart(): boolean {
		return this.cartItem.quantity > 0
	}

	private addToCart() {
		const {cartItem} = this
		const {cart} = this.props
		const {quantity} = cartItem
		this.cartItem.setQuantity(quantity + 1)

		// TODO cart should open when items are added
		// cart.togglePanelOpen(true)
	}

	private readonly handleButtonClick = (event: MouseEvent): void => {
		if (!this.inCart) this.addToCart()
	}

	render() {
		const {inCart} = this
		const {
			product,
			buttonText1 = "Add to Cart",
			buttonText2 = "In Cart",
			buttonTitle = undefined
		} = this.props

		return (
			<div className="product-display" data-in-cart={inCart ? "true" : "false"} {...product.attributes}>
				<h3 className="title">{product.title}</h3>
				<div className="box">
					<p className="price">{product.price}</p>
					<button
						className="add-to-cart-button"
						title={inCart ? undefined : buttonTitle}
						onClick={this.handleButtonClick}
						disabled={inCart}>
							{inCart ? buttonText2 : buttonText1}
					</button>
				</div>
				<p className="description"
					dangerouslySetInnerHTML={{__html: product.description}}>
				</p>
			</div>
		)
	}
}
