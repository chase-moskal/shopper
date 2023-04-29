import { ReactorTopic } from "./example-host.js";
import { Api, ApiShape } from "../../types.js";
export interface NuclearApi extends Api {
    reactor: ReactorTopic;
}
export declare const nuclearShape: ApiShape<NuclearApi>;
