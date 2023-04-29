import { HostState, SendMessage, HostMessageHandlers } from "../internal-types.js";
import { Exposure } from "../../types.js";
export declare const prepareMessageHandlers: ({ state, exposures, sendMessage, }: {
    state: HostState;
    sendMessage: SendMessage;
    exposures: {
        [key: string]: Exposure<import("../../types.js").Topic<any>>;
    };
}) => HostMessageHandlers;
