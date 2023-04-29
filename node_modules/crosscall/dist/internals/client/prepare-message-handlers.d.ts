import { ClientState, ClientMessageHandlers } from "../internal-types.js";
export declare const prepareMessageHandlers: ({ state, resolveReady }: {
    state: ClientState;
    resolveReady: () => void;
}) => ClientMessageHandlers;
