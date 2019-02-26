
import {h} from "preact"
import {observer} from "mobx-preact"

import {CartStore} from "source/stores/cart-store"
import {ProductStore} from "../stores/product-store"

import {ProductDisplay} from "./product-display"

export const ProductList = observer(({cart, collectionId, products}: {
	cart: CartStore
	collectionId: string
	products: ProductStore[]
}) => (
	<div
		className="product-list"
		data-collection-id={collectionId}>
			{products.map(product => <ProductDisplay {...{cart, product}}/>)}
	</div>
))
