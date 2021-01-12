var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ShopifyAdapter } from "./shopify-adapter.js";
import { wait } from "../toolbox/wait.js";
export class MockAdapter extends ShopifyAdapter {
    constructor() {
        super({ domain: "", storefrontAccessToken: "" });
    }
}
export class MockPassingShopifyAdapter extends MockAdapter {
    fetchEverything() {
        return __awaiter(this, void 0, void 0, function* () {
            return { "products": [{ "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzEwMjMyMTQ1OTkx", "available": true, "value": 3, "title": "Crumble-top Banana-muffin", "description": "", "collections": ["Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MDUxOQ==", "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ=="], "firstVariantId": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MjIyNTYyMjIxNQ==", "comparedValue": 8 }, { "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzEwMjMyMTYyMTgz", "available": true, "value": 5.25, "title": "Avocado Breakfast Toast", "description": "<p>Enjoy a <strong>fresh</strong> start to the day with this simple <em>homestyle</em> creation</p>\n<p>Sourdough, avocado, cherry tomatoes</p>", "collections": ["Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ=="], "firstVariantId": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MjIyNTY0ODMyNw==", "comparedValue": null }, { "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzEwMjMyMTUzNTQz", "available": false, "value": 6.5, "title": "Chocolate Soufflé", "description": "", "collections": ["Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ=="], "firstVariantId": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MjIyNTYzNDE4Mw==", "comparedValue": null }], "collectionIds": ["Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MDUxOQ==", "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ=="] };
        });
    }
    checkout() {
        return __awaiter(this, void 0, void 0, function* () {
            return "#mock-checkout-link";
        });
    }
}
export class MockFailingShopifyAdapter extends MockAdapter {
    fetchEverything() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("mock failure");
        });
    }
    checkout() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("mock failure");
        });
    }
}
export function prepSlowAdapter({ ms, Adapter, }) {
    return class MockSlowShopifyAdapter extends Adapter {
        fetchEverything() {
            return __awaiter(this, void 0, void 0, function* () {
                yield wait(ms);
                return Adapter.prototype.fetchEverything.call(this);
                // // HACK makes Edge 18 work ¯\_(ツ)_/¯
                // // supposed to be this:
                // return super.fetchEverything()
            });
        }
        checkout(items) {
            return __awaiter(this, void 0, void 0, function* () {
                yield wait(ms);
                return Adapter.prototype.checkout.call(this, items);
                // // HACK makes Edge 18 work ¯\_(ツ)_/¯
                // // supposed to be this:
                // return super.checkout(items)
            });
        }
    };
}
//# sourceMappingURL=shopify-adapter-mocks.js.map