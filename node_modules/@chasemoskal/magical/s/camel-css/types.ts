
export interface Rules {
	[key: string]: string
}

export type Expression = [string, Rules, Expression[]]
 //                       ☝️
 //                   css selector
