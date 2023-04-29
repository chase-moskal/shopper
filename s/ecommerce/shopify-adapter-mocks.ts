
import {ShopifyAdapter} from "./shopify-adapter.js"

import {wait} from "../toolbox/wait.js"
import {CartItem, ShopifyResults} from "../interfaces.js"

export class MockAdapter extends ShopifyAdapter {
	constructor() {
		super({domain: "", storefrontAccessToken: ""})
	}
}

export class MockPassingShopifyAdapter extends MockAdapter {
	async fetchEverything(): Promise<ShopifyResults> {
		return {"products":[{"id":"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzEwMjMyMTQ1OTkx","available":true,"value":3,"title":"Crumble-top Banana-muffin","description":"","collections":["Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MDUxOQ==","Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ=="],"firstVariantId":"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MjIyNTYyMjIxNQ==","comparedValue":8},{"id":"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzEwMjMyMTYyMTgz","available":true,"value":5.25,"title":"Avocado Breakfast Toast","description":"<p>Enjoy a <strong>fresh</strong> start to the day with this simple <em>homestyle</em> creation</p>\n<p>Sourdough, avocado, cherry tomatoes</p>","collections":["Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ=="],"firstVariantId":"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MjIyNTY0ODMyNw==","comparedValue":null},{"id":"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzEwMjMyMTUzNTQz","available": false,"value":6.5,"title":"Chocolate Soufflé","description":"","collections":["Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ=="],"firstVariantId":"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MjIyNTYzNDE4Mw==","comparedValue":null}],"collectionIds":["Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MDUxOQ==","Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ=="]}
	}
	async checkout(): Promise<string> {
		return "#mock-checkout-link"
	}
}

export class MockFailingShopifyAdapter extends MockAdapter {
	async fetchEverything(): Promise<ShopifyResults> {
		throw new Error("mock failure")
	}
	async checkout(): Promise<string> {
		throw new Error("mock failure")
	}
}

export function prepSlowAdapter<T extends new(...args: any[]) => MockAdapter>({
		ms,
		Adapter,
	}: {
		Adapter: T
		ms: number
	}): T {

	return class MockSlowShopifyAdapter extends Adapter {
		async fetchEverything(): Promise<ShopifyResults> {
			await wait(ms)
			return Adapter.prototype.fetchEverything.call(this)
				// // HACK makes Edge 18 work ¯\_(ツ)_/¯
				// // supposed to be this:
				// return super.fetchEverything()
		}
		async checkout(items: CartItem[]): Promise<string> {
			await wait(ms)
			return Adapter.prototype.checkout.call(this, items)
				// // HACK makes Edge 18 work ¯\_(ツ)_/¯
				// // supposed to be this:
				// return super.checkout(items)
		}
	}
}
