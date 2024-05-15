import { waitForElement } from "./utils";

async function main() {
	const { Platform, Menu, PopupModal } = Spicetify
	const { PlayerAPI } = Platform
	if (!Platform || !Menu || !PlayerAPI || !PopupModal) {
		setTimeout(main, 250)
		return
	}

	const PlaybackAPI = Platform.PlaybackAPI

	const container = await waitForElement<HTMLDivElement>(".volume-bar.main-nowPlayingBar-volumeBar")
	const slider = await waitForElement<HTMLDivElement>(".volume-bar__slider-container", container)

	const tippy = Spicetify.Tippy(slider, {
		...Spicetify.TippyProps,
		delay: 0,
		interactive: true,
		hideOnClick: false,
		interactiveBorder: 20,
	})

	const volumeInput = document.createElement("input")
	volumeInput.setAttribute("id", "volume-plus-input")
	volumeInput.style.background = "none"
	volumeInput.style.padding = "0"
	volumeInput.style.border = "0"
	volumeInput.style.textAlign = "center"
	volumeInput.style.fontSize = "1em"
	volumeInput.style.minWidth = "1ch"
	volumeInput.style.maxWidth = "3ch"
	volumeInput.style.color = "var(--spice-text)"
	volumeInput.type = "text"
	volumeInput.maxLength = 3

	// only accept numbers in the input field, the reason input type isn't number
	// is because max-length doesnt work on number input fields
	volumeInput.addEventListener("keydown", (ev) => {
		if (ev.key.length == 1 && isNaN(Number(ev.key))) {
			ev.preventDefault()
		}
	})

	// update the volume when the input changes
	volumeInput.addEventListener("change", () => {
		PlaybackAPI.setVolume(Number(volumeInput.value) / 100)
	})

	// update volumeInput when volume changes
	function updateTooltip() {
		volumeInput.value = `${Math.round(PlaybackAPI._volume * 100)}`
		updateWidth()
	}
	updateTooltip()
	PlaybackAPI._events.addListener("volume", updateTooltip)

	// update volumeInput width when its content changes
	function updateWidth() {
		volumeInput.style.maxWidth = `${volumeInput.value.length}ch`
	}
	updateWidth()
	volumeInput.addEventListener("input", updateWidth)

	// styling to remove the input's spin buttons and to add a leading %
	const tooltipStyle = document.createElement("style")
	tooltipStyle.textContent = `
		#volume-plus-input::-webkit-outer-spin-button,
		#volume-plus-input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		#${tippy.popper.id} .main-contextMenu-tippy:after {
			content: "%";
		}
	`

	// directly parent to the popper so we can use the element instance instead of its .outerHtml
	const tooltipContainer = await waitForElement<HTMLElement>(".main-contextMenu-tippy", tippy.popper)
	tooltipContainer.appendChild(volumeInput)
	tooltipContainer.appendChild(tooltipStyle)

	let defaultStep = 0.01
	let shiftStep = 0.05
	let debounce = false

	container.addEventListener("wheel", (ev) => {
		// override spotify's default mouse wheel listener
		ev.stopPropagation()

		// debounce so that the volume slider doesnt jump back and forth 
		if (debounce) {
			return
		}
		debounce = true

		const step = ev.getModifierState("Shift") && shiftStep || defaultStep
		const newVolume = PlaybackAPI._volume - (Math.sign(ev.deltaY) * step)
		// const newVolume = clamp(PlaybackAPI._volume - (Math.sign(ev.deltaY) * defaultStep), 0, 1)
		PlaybackAPI.setVolume(newVolume)
		PlaybackAPI._events.addListener("volume", () => { debounce = false }, { "once": true })
	})
}

export default main;
