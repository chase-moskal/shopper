
import {observable, action} from "mobx"
import {getScrollTop} from "../toolbox"

const scrollEvents = ["scroll", "resize"]

export class ScrollTrackerStore {
	@observable scroll: number
	@observable tracking: boolean

	constructor() {
		this.setScroll()
		this.setTracking()
	}

	updateScroll() {
		if (this.tracking) {
			const scroll = getScrollTop()
			this.setScroll(scroll)
		}
	}

	@action setScroll(scroll: number = 0) {
		this.scroll = scroll
	}

	@action setTracking(tracking: boolean = false) {
		this.tracking = tracking
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

	private handleScrollUpdate = () => {
		this.updateScroll()
	}
}
