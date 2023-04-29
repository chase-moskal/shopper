import { createIframe } from "../../create-iframe.js";
import { crosscallClient } from "../../crosscall-client.js";
import { nuclearShape as shape } from "./example-common.js";
export async function exampleClient(url) {
    const { href, origin: hostOrigin } = new URL(url);
    const { postMessage } = await createIframe({
        url: href
    });
    const client = crosscallClient({
        shape,
        hostOrigin,
        postMessage,
        namespace: "crosscall-example",
    });
    const nuclear = await client.callable;
    const result = await nuclear.reactor.generatePower(1, 2);
    const success = result === 3;
    return success;
}
//# sourceMappingURL=example-client.js.map