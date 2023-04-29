import { objectMap } from "@chasemoskal/snapstate";
import { mixinStyles } from "../mixins/mixin-styles.js";
export const themeComponents = (theme, components) => {
    return objectMap(components, Component => mixinStyles(theme)(Component));
};
//# sourceMappingURL=theme-components.js.map