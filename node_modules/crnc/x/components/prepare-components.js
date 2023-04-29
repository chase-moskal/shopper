import { CrncPrice } from "./price/crnc-price.js";
import { themeComponents } from "../framework/utils/theme-components.js";
import themeCss from "../framework/theme.css.js";
import { mixinSnapstateSubscriptions } from "../framework/mixins/mixin-snapstate.js";
export function prepareComponents({ currencyConverter }) {
    const components = themeComponents(themeCss, {
        CrncPrice: mixinSnapstateSubscriptions(currencyConverter.snap.subscribe)(CrncPrice.withContext({ currencyConverter })),
    });
    return components;
}
//# sourceMappingURL=prepare-components.js.map