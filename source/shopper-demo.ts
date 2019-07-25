
import "menutown"
import "./register-all.js"

// import {html} from "lit-html"

// import {ShopifyAdapter} from "./ecommerce/shopify-adapter.js"
// import {ShopperWrangler} from "./ecommerce/shopper-wrangler.js"

// async function main() {
// 	const shopperWrangler = new ShopperWrangler({
// 		cartPanel: document.querySelector("cart-panel"),
// 		cartButton: document.querySelector("cart-button"),
// 		shopifyAdapter: new ShopifyAdapter({
// 			domain: "dev-bakery.myshopify.com",
// 			storefrontAccessToken: "5f636be6b04aeb2a7b96fe9306386f25"
// 		})
// 	})
// 	await shopperWrangler.loadCatalog("Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ==")
// 	const list = shopperWrangler.generateProductList(shopperWrangler.itemCatalog)
// 	const productArea = document.querySelector(".product-area")
// 	productArea.appendChild(list)
// 	window["shopperWrangler"] = shopperWrangler
// }

// main()
// 	.then(() => console.log("🤖"))
// 	.catch(error => console.error(error))

// async function concept_pureHtmlConfiguration_jsOptional() {
// 	return html`
// 		<shopper-button></shopper-button>
// 		<shopper-cart
// 			shopify-domain="dev-bakery.myshopify.com"
// 			shopify-storefront-access-token="5f636be6b04aeb2a7b96fe9306386f25"
// 			shopify-collection-id="Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ==">
// 		</shopper-cart>
// 		<shopper-product product-id="QQQ"></shopper-product>
// 		<shopper-listing></shopper-listing>
// 	`
// }
