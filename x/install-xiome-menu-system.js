import xiomeThemeCss from "xiome/x/framework/theme.css.js";
import { themeComponents } from "xiome/x/framework/component.js";
import { XioMenu } from "xiome/x/features/xio-components/menu/xio-menu.js";
import { XioMenuItem } from "xiome/x/features/xio-components/menu/xio-menu-item.js";
import { registerComponents } from "./toolbox/register-components.js";
registerComponents(themeComponents(xiomeThemeCss, {
    XioMenu,
    XioMenuItem,
}));
//# sourceMappingURL=install-xiome-menu-system.js.map