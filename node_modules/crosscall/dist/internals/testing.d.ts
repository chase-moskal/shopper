import { Host, Client, HostOptions, ClientOptions, EventMediator } from "../types.js";
import { NuclearApi } from "./examples/example-common.js";
export declare const makeClientOptions: () => ClientOptions<NuclearApi>;
export declare const makeHostOptions: () => HostOptions<NuclearApi>;
export declare const nap: () => Promise<unknown>;
export declare const sleep: (ms: number) => Promise<unknown>;
export declare const goodOrigin = "https://alpha.egg";
export declare const badOrigin = "https://beta.bad";
export declare function mockReactorAlarm(): {
    dispatchAlarmEvent: (event: any) => void;
    alarm: EventMediator;
};
export declare const makeBridgedSetup: () => {
    client: Client<NuclearApi>;
    host: Host<NuclearApi>;
    clientOptions: ClientOptions<NuclearApi>;
    hostOptions: HostOptions<NuclearApi>;
    dispatchAlarmEvent: (event: any) => void;
};
