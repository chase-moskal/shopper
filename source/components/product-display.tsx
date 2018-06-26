
import {computed} from "mobx"
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {Cart} from "../stores/cart"
import {Product} from "../stores/product"
import {CartItem} from "../stores/cart-item"

export interface ProductDisplayProps {
	cart: Cart
	product: Product
	buttonText1?: string
	buttonText2?: string
}

@observer
export class ProductDisplay extends Component<ProductDisplayProps> {

	@computed get cartItem(): CartItem {
		const {cart, product} = this.props
		return cart.getProductItem(product)
	}

	@computed get inCart(): boolean {
		return this.cartItem.quantity > 0
	}

	private addToCart() {
		this.cartItem.quantity += 1
	}

	private readonly handleButtonClick = (event: MouseEvent): void => {
		if (!this.inCart) this.addToCart()
	}

	render() {
		const {inCart} = this
		const {
			product,
			buttonText1 = "Add to Cart",
			buttonText2 = "In Cart"
		} = this.props

		return (
			<div className="product-display" data-in-cart={inCart ? "true" : "false"}>
				<h3 className="title">{product.title}</h3>
				<div className="box">
					<p className="price">{product.price}</p>
					<a className="button" onClick={this.handleButtonClick}>
							{inCart ? buttonText1 : buttonText2}
					</a>
				</div>
				<p className="description"
					dangerouslySetInnerHTML={{__html: product.description}}>
				</p>
			</div>
		)
	}
}
