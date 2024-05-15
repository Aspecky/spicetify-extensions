(async function() {
        while (!Spicetify.React || !Spicetify.ReactDOM) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        var betterDvolumeDcontrols = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

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
  function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
  }

  // src/app.tsx
  async function main() {
    await new Promise((resolve) => Spicetify.Events.platformLoaded.on(resolve));
    const { PlaybackAPI } = Spicetify.Platform;
    const tippy = Spicetify.Tippy;
    const container = await waitForElement(".volume-bar.main-nowPlayingBar-volumeBar");
    const slider = await waitForElement(".volume-bar__slider-container", container);
    const popup = tippy(slider, __spreadProps(__spreadValues({}, Spicetify.TippyProps), {
      delay: 0,
      content: `${PlaybackAPI._volume}`
    }));
    let step = 0.02;
    let debounce = false;
    container.addEventListener("wheel", (ev) => {
      ev.stopPropagation();
      if (debounce) {
        return;
      }
      debounce = true;
      const newVolume = clamp(PlaybackAPI._volume - Math.sign(ev.deltaY) * step, 0, 1);
      PlaybackAPI.setVolume(newVolume);
      PlaybackAPI._events.addListener("volume", () => {
        debounce = false;
      }, { "once": true });
    });
  }
  var app_default = main;

  // ../../../../AppData/Local/Temp/spicetify-creator/index.jsx
  (async () => {
    await app_default();
  })();
})();

      })();