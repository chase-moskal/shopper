import { fn } from "cynic";
import { crosscallHost } from "../crosscall-host.js";
import { crosscallClient } from "../crosscall-client.js";
import { ReactorTopic } from "./examples/example-host.js";
import { nuclearShape } from "./examples/example-common.js";
export const makeClientOptions = () => ({
    shape: nuclearShape,
    namespace: "crosscall-testing",
    hostOrigin: "https://alpha.egg",
    postMessage: fn(),
    shims: {
        createElement: fn(),
        appendChild: fn(),
        removeChild: fn(),
        addEventListener: fn(),
        removeEventListener: fn(),
    }
});
export const makeHostOptions = () => ({
    namespace: "crosscall-testing",
    exposures: {
        reactor: {
            exposed: new ReactorTopic(),
            cors: {
                allowed: /^https:\/\/alpha\.egg$/i,
                forbidden: null
            }
        }
    },
    shims: {
        postMessage: fn(),
        addEventListener: fn(),
        removeEventListener: fn(),
    }
});
export const nap = async () => sleep(100);
export const sleep = async (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));
export const goodOrigin = "https://alpha.egg";
export const badOrigin = "https://beta.bad";
export function mockReactorAlarm() {
    let subs = [];
    return {
        alarm: {
            listen: listener => {
                subs.push(listener);
            },
            unlisten: listener => {
                subs = subs.filter(sub => sub !== listener);
            }
        },
        dispatchAlarmEvent: (event) => {
            for (const sub of subs)
                sub(event);
        }
    };
}
export const makeBridgedSetup = () => {
    const hostOptions = makeHostOptions();
    const clientOptions = makeClientOptions();
    const { alarm, dispatchAlarmEvent } = mockReactorAlarm();
    hostOptions.exposures.reactor.exposed.alarm = alarm;
    let host;
    let client;
    // get message senders
    let messageHost;
    let messageClient;
    hostOptions.shims.addEventListener = fn(async (eventName, func) => messageHost = func);
    clientOptions.shims.addEventListener = fn(async (eventName, func) => messageClient = func);
    // route host output to client input
    hostOptions.shims.postMessage = fn(async (message, origin) => {
        await sleep(0);
        messageClient({ origin: goodOrigin, data: message });
    });
    // route client output to host input
    clientOptions.postMessage = fn(async (message, origin) => {
        await sleep(0);
        messageHost({ origin: goodOrigin, data: message });
    });
    // client created first, the way iframes work
    client = crosscallClient(clientOptions);
    host = crosscallHost(hostOptions);
    return { client, host, clientOptions, hostOptions, dispatchAlarmEvent };
};
//# sourceMappingURL=testing.js.map