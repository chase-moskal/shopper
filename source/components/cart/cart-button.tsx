
import {h} from "preact"
import {observer} from "mobx-preact"
import {CartStore} from "../../stores/cart-store"

export const CartButton = observer(({cart}: {cart: CartStore}) => (
	<div className="cart-button">
		{
			cart.activeItems.length > 0
				? <span className="cart-numeral">{cart.activeItems.length}</span>
				: null
		}
	</div>
))
