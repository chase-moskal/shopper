import { Api, Client, ClientOptions } from "./types.js";
export declare function crosscallClient<A extends Api<A>>({ shape, namespace, hostOrigin, postMessage, shims: moreShims, }: ClientOptions<A>): Client<A>;
