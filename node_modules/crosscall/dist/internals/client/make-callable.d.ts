import { Api, ApiShape } from "../../types.js";
import { ClientState, RequestFunc } from "../internal-types.js";
export declare function makeCallable<A extends Api<A> = Api>({ state, shape, request, }: {
    shape: ApiShape;
    state: ClientState;
    request: RequestFunc;
}): A;
