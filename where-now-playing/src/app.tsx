import { waitForElement } from "./utils";

async function main() {
	const { Player, Platform } = Spicetify;
	const { History } = Platform;
	if (!Player || !Platform || !History) {
		setTimeout(main, 250);
		return;
	}

	function onClick(ev: MouseEvent) {
		// block the now playing view from opening
		ev.stopPropagation();

		const data = Player.data;
		if (!data) {
			return;
		}

		const split = data.context.uri.split(":");
		let pathname;
		if (split[1] == "user" && split[3] == "collection") {
			pathname = `/collection/tracks`;
		} else {
			pathname = `/${split[1]}/${split[2]}`;
		}

		// supplying uid and uri to the push makes the spotify app automatically
		// scroll to where the song is
		History.push({
			pathname: pathname,
			search: `?uid=${data.item.uid}&uri=${data.item.uri}`,
		});
	}

	const playingBar = await waitForElement<HTMLDivElement>(
		".main-nowPlayingBar-left",
	);

	let id = 0;
	let lastCoverButton: HTMLButtonElement;
	async function hookCoverButton() {
		const stamp = id;
		const coverButton = await waitForElement<HTMLButtonElement>(
			"button[aria-label='Now playing view']",
			playingBar,
		);

		// abort in case the promise returns after another hookCoverButton gets called
		// or the coverButton is the same as the last one
		if (coverButton == lastCoverButton || stamp != id) {
			return;
		}
		id += 1;
		lastCoverButton = coverButton;

		coverButton.addEventListener("click", onClick);
	}

	// hook to the cover button every time a new one gets created
	const observer = new MutationObserver(hookCoverButton);
	observer.observe(playingBar, { childList: true, subtree: true });
	hookCoverButton();
}

export default main;
