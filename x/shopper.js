import { shopperInstall } from "./startup/shopper-install.js";
shopperInstall()
    .catch(error => console.error("shopper failed to initialize", error));
//# sourceMappingURL=shopper.js.map