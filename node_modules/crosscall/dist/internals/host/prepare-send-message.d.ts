import { HostShims } from "../../types.js";
import { HostState, Message, Id } from "../internal-types.js";
export declare function prepareSendMessage({ state, shims, namespace, }: {
    state: HostState;
    shims: HostShims;
    namespace: string;
}): <gMessage extends Message = Message>({ origin, message }: {
    origin: string;
    message: gMessage;
}) => Promise<Id>;
