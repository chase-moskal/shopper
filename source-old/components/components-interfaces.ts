
import {CartStore} from "../stores/cart-store"
import {ProductStore} from "../stores/product-store"

export interface ProductDisplayProps {
	cart: CartStore
	product: ProductStore
	buttonText1?: string
	buttonText2?: string
	buttonTitle?: string
}
