
import {ReactorTopic} from "./example-host.js"
import {Api, ApiShape} from "../../types.js"

export interface NuclearApi extends Api {
	reactor: ReactorTopic
}

export const nuclearShape: ApiShape<NuclearApi> = {
	reactor: {
		alarm: "event",
		generatePower: "method",
		radioactiveMeltdown: "method"
	}
}
