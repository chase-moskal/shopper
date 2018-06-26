
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {Cart} from "../stores/cart"
import {Product} from "../stores/product"
import {CartItem} from "../stores/cart-item"

export interface ProductDisplayProps {
	// cart: Cart
	product: Product
}

@observer
export class ProductDisplay extends Component<ProductDisplayProps> {

	render() {
		const {product} = this.props
		// const item = cart.getProductItem(product)
		return (
			<div className="product-display">
				<h3 className="title">{product.title}</h3>
				<div className="box">
					<p className="price">{product.price}</p>
					<a className="button">Add to Cart</a>
				</div>
				<p className="description"
					dangerouslySetInnerHTML={{__html: product.description}}>
				</p>
			</div>
		)
	}
}
