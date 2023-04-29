import { defaultShims } from "./internals/client/defaults.js";
import { makeCallable } from "./internals/client/make-callable.js";
import { ListenerOrganizer } from "./internals/client/listener-organizer.js";
import { prepareRequestFunction } from "./internals/client/prepare-request-function.js";
import { prepareMessageHandlers } from "./internals/client/prepare-message-handlers.js";
import { prepareMessageListener } from "./internals/client/prepare-message-listener.js";
export function crosscallClient({ shape, namespace, hostOrigin, postMessage, shims: moreShims = {}, }) {
    //
    // preparing stuff
    //
    let resolveReady;
    const ready = new Promise(resolve => resolveReady = resolve);
    const shims = { ...defaultShims, ...moreShims };
    const state = {
        messageId: 0,
        iframe: null,
        isReady: false,
        requests: new Map(),
        listenerOrganizer: new ListenerOrganizer(),
    };
    const request = prepareRequestFunction({
        state,
        namespace,
        hostOrigin,
        postMessage,
    });
    const callable = makeCallable({
        state,
        shape,
        request,
    });
    const messageHandlers = prepareMessageHandlers({
        state,
        resolveReady
    });
    const messageListener = prepareMessageListener({
        namespace,
        hostOrigin,
        messageHandlers,
    });
    //
    // actual initialization
    //
    shims.addEventListener("message", messageListener, false);
    //
    // return a stop function
    //
    return {
        callable: ready.then(() => callable),
        stop() {
            shims.removeEventListener("message", messageListener);
            if (state.iframe) {
                shims.removeChild(state.iframe);
                state.iframe = null;
            }
        }
    };
}
//# sourceMappingURL=crosscall-client.js.map