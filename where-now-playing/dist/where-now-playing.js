(async function() {
        while (!Spicetify.React || !Spicetify.ReactDOM) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        var whereDnowDplaying = (() => {
  // src/utils.tsx
  function waitForElement(selector, parent = document.body) {
    return new Promise((resolve) => {
      const elm = parent.querySelector(selector);
      if (elm) {
        return resolve(elm);
      }
      const observer = new MutationObserver((_) => {
        const elm2 = parent.querySelector(selector);
        if (elm2) {
          observer.disconnect();
          resolve(elm2);
        }
      });
      observer.observe(parent, {
        childList: true,
        subtree: true
      });
    });
  }

  // src/app.tsx
  async function main() {
    const { Player, Platform } = Spicetify;
    const { History } = Platform;
    if (!Player || !Platform || !History) {
      setTimeout(main, 250);
      return;
    }
    function onClick(ev) {
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
      History.push({
        pathname,
        search: `?uid=${data.item.uid}&uri=${data.item.uri}`
      });
    }
    let id = 0;
    let lastCoverButton;
    async function hookCoverButton() {
      const stamp = id;
      const coverButton = await waitForElement(
        "button[aria-label='Now playing view']"
      );
      if (coverButton == lastCoverButton || stamp != id) {
        return;
      }
      id += 1;
      lastCoverButton = coverButton;
      coverButton.addEventListener("click", onClick);
    }
    const observer = new MutationObserver(hookCoverButton);
    observer.observe(
      await waitForElement(".main-nowPlayingBar-left"),
      { childList: true, subtree: true }
    );
    hookCoverButton();
  }
  var app_default = main;

  // ../../../../AppData/Local/Temp/spicetify-creator/index.jsx
  (async () => {
    await app_default();
  })();
})();

      })();