import { Api, Host, HostOptions } from "./types.js";
export declare function crosscallHost<A extends Api<A> = Api>({ namespace, exposures, shims: moreShims, }: HostOptions<A>): Host;
