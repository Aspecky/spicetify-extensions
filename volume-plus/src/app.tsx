import { SettingsSection } from "spcr-settings";
import { clamp, waitForElement } from "./utils";
import "./assets/config.css";

async function main() {
	const { Platform, Menu, PopupModal, ReactDOM, React, LocalStorage } =
		Spicetify;
	const { PlaybackAPI } = Platform;
	if (
		!Platform ||
		!Menu ||
		!PlaybackAPI ||
		!PopupModal ||
		!React ||
		!ReactDOM ||
		!LocalStorage
	) {
		setTimeout(main, 250);
		return;
	}

	// MARK: Tooltip
	const container = await waitForElement<HTMLDivElement>(
		".volume-bar.main-nowPlayingBar-volumeBar",
	);
	const slider = await waitForElement<HTMLDivElement>(
		".volume-bar__slider-container",
		container,
	);

	const tippy = Spicetify.Tippy(slider, {
		...Spicetify.TippyProps,
		delay: 0,
		interactive: true,
		hideOnClick: false,
		interactiveBorder: 20,
	});

	const volumeInput = document.createElement("input");
	volumeInput.id = "volume-plus-input";
	volumeInput.style.background = "none";
	volumeInput.style.padding = "0";
	volumeInput.style.border = "0";
	volumeInput.style.textAlign = "center";
	volumeInput.style.fontSize = "1em";
	volumeInput.style.minWidth = "1ch";
	volumeInput.style.maxWidth = "3ch";
	volumeInput.style.color = "var(--spice-text)";
	volumeInput.type = "text";
	volumeInput.maxLength = 3;

	// update the volume when the input changes
	volumeInput.addEventListener("change", () => {
		PlaybackAPI.setVolume(Number(volumeInput.value) / 100);
	});

	// only accept positive numbers in the input field
	function onInputKeyDown(ev: KeyboardEvent | React.KeyboardEvent) {
		if (ev.key.length == 1 && isNaN(Number(ev.key))) {
			ev.preventDefault();
		}
	}
	volumeInput.addEventListener("keydown", onInputKeyDown);

	// update volumeInput when volume changes
	function updateTooltip() {
		volumeInput.value = `${Math.round(PlaybackAPI._volume * 100)}`;
		updateWidth();
	}
	updateTooltip();
	PlaybackAPI._events.addListener("volume", updateTooltip);

	// update volumeInput width when its content changes
	function updateWidth() {
		volumeInput.style.maxWidth = `${volumeInput.value.length}ch`;
	}
	updateWidth();
	volumeInput.addEventListener("input", updateWidth);

	// styling to remove the input's spin buttons and to add a leading %
	const tooltipStyle = document.createElement("style");
	tooltipStyle.textContent = `
		#volume-plus-input::-webkit-outer-spin-button,
		#volume-plus-input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		#${tippy.popper.id} .main-contextMenu-tippy:after {
			content: "%";
		}
	`;

	// directly parent to the popper so we can use the element instance instead of its .outerHtml
	const tooltipContainer = await waitForElement<HTMLElement>(
		".main-contextMenu-tippy",
		tippy.popper,
	);
	tooltipContainer.appendChild(volumeInput);
	tooltipContainer.appendChild(tooltipStyle);

	// MARK: Settings Menu
	const settings = new SettingsSection("", "volume-plus-settings");
	function createInput(
		nameId: string,
		description: string,
		defaultValue: string,
	) {
		if (!settings.getFieldValue(nameId)) {
			settings.setFieldValue(nameId, defaultValue);
		}
		settings.addInput(
			nameId,
			description,
			defaultValue,
			undefined,
			undefined,
			{
				type: "number",
				min: 1,
				max: 100,
				onKeyDown: onInputKeyDown,
			},
		);
	}
	createInput("default-increment", "Default mouse wheel increment", "5");
	createInput(
		"shift-increment",
		"Mouse wheel increment while holding Shift",
		"10",
	);
	createInput(
		"ctrl-increment",
		"Mouse wheel increment while holding Ctrl",
		"1",
	);

	// render settings menu using spcr-settings plugin
	new Menu.Item(
		"Volume+",
		false,
		() => {
			const container = document.createElement("div");
			container.id = settings.settingsId;
			ReactDOM.render(<settings.FieldsContainer />, container);

			PopupModal.display({
				title: "Volume+",
				content: container,
				isLarge: true,
			});
		},
		`<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="volume-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve"><path d="M14.9,8c0-0.4-0.3-0.8-0.7-0.8c0,0,0,0,0,0l-2.1,0V5.2c0-0.4-0.4-0.7-0.8-0.7c-0.4,0-0.7,0.3-0.7,0.7l0,2.1H8.5
    C8.1,7.2,7.7,7.6,7.7,8c0,0.4,0.3,0.8,0.7,0.8c0,0,0,0,0.1,0h2.1v2.1c0,0.4,0.4,0.7,0.8,0.7c0.4,0,0.7-0.3,0.7-0.7l0-2.1h2.1
    C14.6,8.8,14.9,8.4,14.9,8z"/><path d="M10.1,1.5c0-0.4-0.3-0.8-0.7-0.8c-0.1,0-0.3,0-0.4,0.1l-6.9,4c-1.7,1-2.3,3.2-1.3,5c0.3,0.6,0.8,1,1.3,1.3l6.9,4    c0.4,0.2,0.8,0.1,1-0.3c0.1-0.1,0.1-0.2,0.1-0.4v-1.9c-0.5-0.1-1-0.4-1.5-0.7v1.3L2.8,9.9C1.8,9.3,1.4,8,2,6.9    c0.2-0.3,0.5-0.6,0.8-0.8l5.8-3.3v1.3c0.4-0.3,1-0.5,1.5-0.7V1.5z"/></svg>`,
	).register();

	// MARK: Mouse wheel listener
	let debounce = false;
	container.addEventListener("wheel", (ev) => {
		// override spotify's default mouse wheel listener
		ev.stopPropagation();
		console.log("scroll");

		// debounce so that the volume slider doesnt jump back and forth
		if (debounce) {
			return;
		}
		debounce = true;

		let field;
		if (ev.getModifierState("Shift")) {
			field = "shift-increment";
		} else if (ev.getModifierState("Control")) {
			ev.preventDefault(); // prevents zooming
			field = "ctrl-increment";
		} else {
			field = "default-increment";
		}

		const step = Number(settings.getFieldValue(field)) / 100;
		const newVolume = clamp(
			PlaybackAPI._volume - Math.sign(ev.deltaY) * step,
			0,
			1,
		);
		PlaybackAPI.setVolume(newVolume);

		if (newVolume == 0 || newVolume == 1) {
			debounce = false;
			return;
		}
		PlaybackAPI._events.addListener(
			"volume",
			() => {
				debounce = false;
			},
			{ once: true },
		);
	});
}

export default main;
