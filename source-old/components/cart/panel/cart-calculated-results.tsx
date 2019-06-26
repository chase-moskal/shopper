
import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {CartCalculatedResultsProps} from "./panel-interfaces"

@observer
export class CartCalculatedResults extends Component<CartCalculatedResultsProps, any> {

	render() {
		const {cart, cartCalculatedText} = this.props
		return (
			<ol className="cart-calculated-results cart-grid">
				{
					cart.activeItems.length
						? (
							<li className="cart-subtotal">
								<span>{cartCalculatedText.subtotal.content}</span>
								<strong className="pricevalue">{cart.price}</strong>
							</li>
						)
						: null
				}
			</ol>
		)
	}
}
