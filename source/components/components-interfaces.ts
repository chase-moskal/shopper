
import {Cart} from "../stores/cart"
import {Product} from "../stores/product"

export interface ProductDisplayProps {
	cart: Cart
	product: Product
	buttonText1?: string
	buttonText2?: string
	buttonTitle?: string
}
