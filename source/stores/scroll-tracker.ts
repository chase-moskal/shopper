
import {observable, action} from "mobx"
import {getScrollTop} from "../toolbox"

const scrollEvents = ["scroll", "resize"]

export class ScrollTracker {

	@observable scroll: number = 0
	@observable tracking: boolean = false

	updateScroll() {
		if (this.tracking) {
			const scroll = getScrollTop()
			this.setScroll(scroll)
		}
	}

	@action setScroll(scroll: number) {
		this.scroll = scroll
	}

	@action setTracking(tracking: boolean) {
		this.tracking = tracking
		this.updateScroll()
	}

	private handleScrollUpdate = () => {
		this.updateScroll()
	}

	mount() {
		for (const event of scrollEvents) {
			window.addEventListener(event, this.handleScrollUpdate)
		}
		this.handleScrollUpdate()
	}

	unmount() {
		for (const event of scrollEvents) {
			window.removeEventListener(event, this.handleScrollUpdate)
		}
	}
}
