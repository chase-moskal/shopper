
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {Product} from "../stores/product"

export interface ProductDisplayProps {
	product: Product
}

@observer
export class ProductDisplay extends Component<ProductDisplayProps> {

	render() {
		const {product} = this.props
		return (
			<div className="product-display">
				<h3>{product.title}</h3>
				<p>price: <strong>{product.price}</strong></p>
			</div>
		)
	}
}
