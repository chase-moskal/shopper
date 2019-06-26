
import {h} from "preact"

export function convertNewlinesToReactBreaks(text: string) {
	return text.split("\n").map((item, key) => {
		return (
			<span {...{key}}>
				{item}
				<br/>
			</span>
		)
	})
}
