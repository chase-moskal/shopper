import { SendMessage, HostMessageHandlers } from "../internal-types.js";
export declare function prepareMessageListener({ namespace, sendMessage, messageHandlers, }: {
    namespace: string;
    sendMessage: SendMessage;
    messageHandlers: HostMessageHandlers;
}): ({ origin, data: message }: MessageEvent) => Promise<boolean>;
