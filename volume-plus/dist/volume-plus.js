!async function(){for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(e=>setTimeout(e,10));var r,o,y,d,v,c,b,u,x,w,S,e,t,n,a,i,E,l;r=Object.create,o=Object.defineProperty,y=Object.defineProperties,d=Object.getOwnPropertyDescriptor,v=Object.getOwnPropertyDescriptors,c=Object.getOwnPropertyNames,b=Object.getOwnPropertySymbols,u=Object.getPrototypeOf,x=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable,S=(e,t,n)=>t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,n=(e=(e,t)=>function(){return t||(0,e[c(e)[0]])((t={exports:{}}).exports,t),t.exports})({"external-global-plugin:react-dom"(e,t){t.exports=Spicetify.ReactDOM}}),a=(t=(e,t,n)=>{n=null!=e?r(u(e)):{};var i=!t&&e&&e.__esModule?n:o(n,"default",{value:e,enumerable:!0}),l=e,s=void 0,a=void 0;if(l&&"object"==typeof l||"function"==typeof l)for(let e of c(l))x.call(i,e)||e===s||o(i,e,{get:()=>l[e],enumerable:!(a=d(l,e))||a.enumerable});return i})(e({"external-global-plugin:react"(e,t){t.exports=Spicetify.React}})()),i=t(n()),E=class{constructor(e,t,n={}){this.name=e,this.settingsId=t,this.initialSettingsFields=n,this.settingsFields=this.initialSettingsFields,this.setRerender=null,this.pushSettings=async()=>{for(Object.entries(this.settingsFields).forEach(([e,t])=>{"button"!==t.type&&void 0===this.getFieldValue(e)&&this.setFieldValue(e,t.defaultValue)});!Spicetify?.Platform?.History?.listen;)await new Promise(e=>setTimeout(e,100));this.stopHistoryListener&&this.stopHistoryListener(),this.stopHistoryListener=Spicetify.Platform.History.listen(e=>{"/preferences"===e.pathname&&this.render()}),"/preferences"===Spicetify.Platform.History.location.pathname&&await this.render()},this.rerender=()=>{this.setRerender&&this.setRerender(Math.random())},this.render=async()=>{for(;!document.getElementById("desktop.settings.selectLanguage");){if("/preferences"!==Spicetify.Platform.History.location.pathname)return;await new Promise(e=>setTimeout(e,100))}var e=document.querySelector(".main-view-container__scroll-node-child main div");if(!e)return console.error("[spcr-settings] settings container not found");let t=Array.from(e.children).find(e=>e.id===this.settingsId);t?console.log(t):((t=document.createElement("div")).id=this.settingsId,e.appendChild(t)),i.default.render(a.default.createElement(this.FieldsContainer,null),t)},this.addButton=(e,t,n,i,l)=>{this.settingsFields[e]={type:"button",description:t,value:n,events:{onClick:i,...l}}},this.addInput=(e,t,n,i,l,s)=>{this.settingsFields[e]={type:"input",description:t,defaultValue:n,inputType:l,events:{onChange:i,...s}}},this.addHidden=(e,t)=>{this.settingsFields[e]={type:"hidden",defaultValue:t}},this.addToggle=(e,t,n,i,l)=>{this.settingsFields[e]={type:"toggle",description:t,defaultValue:n,events:{onChange:i,...l}}},this.addDropDown=(e,t,n,i,l,s)=>{this.settingsFields[e]={type:"dropdown",description:t,defaultValue:n[i],options:n,events:{onSelect:l,...s}}},this.getFieldValue=e=>JSON.parse(Spicetify.LocalStorage.get(this.settingsId+"."+e)||"{}")?.value,this.setFieldValue=(e,t)=>{Spicetify.LocalStorage.set(this.settingsId+"."+e,JSON.stringify({value:t}))},this.FieldsContainer=()=>{var[e,t]=(0,a.useState)(0);return this.setRerender=t,a.default.createElement("div",{className:"x-settings-section",key:e},a.default.createElement("h2",{className:"TypeElement-cello-textBase-type"},this.name),Object.entries(this.settingsFields).map(([e,t])=>a.default.createElement(this.Field,{nameId:e,field:t})))},this.Field=n=>{var e=this.settingsId+"."+n.nameId;let t;if(t="button"===n.field.type?n.field.value:this.getFieldValue(n.nameId),"hidden"===n.field.type)return a.default.createElement(a.default.Fragment,null);const[i,l]=(0,a.useState)(t),s=e=>{void 0!==e&&(l(e),this.setFieldValue(n.nameId,e))};return a.default.createElement("div",{className:"x-settings-row"},a.default.createElement("div",{className:"x-settings-firstColumn"},a.default.createElement("label",{className:"TypeElement-viola-textSubdued-type",htmlFor:e},n.field.description||"")),a.default.createElement("div",{className:"x-settings-secondColumn"},"input"===n.field.type?a.default.createElement("input",{className:"x-settings-input",id:e,dir:"ltr",value:i,type:n.field.inputType||"text",...n.field.events,onChange:e=>{s(e.currentTarget.value);var t=n.field.events?.onChange;t&&t(e)}}):"button"===n.field.type?a.default.createElement("span",null,a.default.createElement("button",{id:e,className:"Button-sc-y0gtbx-0 Button-small-buttonSecondary-useBrowserDefaultFocusStyle x-settings-button",...n.field.events,onClick:e=>{s();var t=n.field.events?.onClick;t&&t(e)},type:"button"},i)):"toggle"===n.field.type?a.default.createElement("label",{className:"x-settings-secondColumn x-toggle-wrapper"},a.default.createElement("input",{id:e,className:"x-toggle-input",type:"checkbox",checked:i,...n.field.events,onClick:e=>{s(e.currentTarget.checked);var t=n.field.events?.onClick;t&&t(e)}}),a.default.createElement("span",{className:"x-toggle-indicatorWrapper"},a.default.createElement("span",{className:"x-toggle-indicator"}))):"dropdown"===n.field.type?a.default.createElement("select",{className:"main-dropDown-dropDown",id:e,...n.field.events,onChange:e=>{s(n.field.options[e.currentTarget.selectedIndex]);var t=n.field.events?.onChange;t&&t(e)}},n.field.options.map((e,t)=>a.default.createElement("option",{selected:e===i,value:t+1},e))):a.default.createElement(a.default.Fragment,null)))}}},l=async function e(){const{Platform:t,Menu:n,PopupModal:i,ReactDOM:s,React:a,LocalStorage:l}=Spicetify,r=t.PlaybackAPI;if(t&&n&&r&&i&&a&&s&&l){var o=await C(".volume-bar.main-nowPlayingBar-volumeBar"),d=await C(".volume-bar__slider-container",o),d=Spicetify.Tippy(d,(d=((e,t)=>{for(var n in t=t||{})x.call(t,n)&&S(e,n,t[n]);if(b)for(var n of b(t))w.call(t,n)&&S(e,n,t[n]);return e})({},Spicetify.TippyProps),y(d,v({delay:0,interactive:!0,hideOnClick:!1,interactiveBorder:20}))));const g=document.createElement("input");g.id="volume-plus-input",g.style.background="none",g.style.padding="0",g.style.border="0",g.style.textAlign="center",g.style.fontSize="1em",g.style.minWidth="1ch",g.style.maxWidth="3ch",g.style.color="var(--spice-text)",g.type="text",g.maxLength=3,g.addEventListener("change",()=>{r.setVolume(Number(g.value)/100)}),g.addEventListener("keydown",u),p(),r._events.addListener("volume",p),m(),g.addEventListener("input",m);var c=document.createElement("style");c.textContent=`
		#volume-plus-input::-webkit-outer-spin-button,
		#volume-plus-input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		#${d.popper.id} .main-contextMenu-tippy:after {
			content: "%";
		}
	`,(d=await C(".main-contextMenu-tippy",d.popper)).appendChild(g),d.appendChild(c);const h=new E("","volume-plus-settings");f("default-increment","Default mouse wheel increment","5"),f("shift-increment","Mouse wheel increment while holding Shift","10"),f("ctrl-increment","Mouse wheel increment while holding Ctrl","1"),new n.Item("Volume+",!1,()=>{var e=document.createElement("div");e.id=h.settingsId,s.render(a.createElement(h.FieldsContainer,null),e),i.display({title:"Volume+",content:e,isLarge:!0})},`<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="volume-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve"><path d="M14.9,8c0-0.4-0.3-0.8-0.7-0.8c0,0,0,0,0,0l-2.1,0V5.2c0-0.4-0.4-0.7-0.8-0.7c-0.4,0-0.7,0.3-0.7,0.7l0,2.1H8.5
    C8.1,7.2,7.7,7.6,7.7,8c0,0.4,0.3,0.8,0.7,0.8c0,0,0,0,0.1,0h2.1v2.1c0,0.4,0.4,0.7,0.8,0.7c0.4,0,0.7-0.3,0.7-0.7l0-2.1h2.1
    C14.6,8.8,14.9,8.4,14.9,8z"/><path d="M10.1,1.5c0-0.4-0.3-0.8-0.7-0.8c-0.1,0-0.3,0-0.4,0.1l-6.9,4c-1.7,1-2.3,3.2-1.3,5c0.3,0.6,0.8,1,1.3,1.3l6.9,4    c0.4,0.2,0.8,0.1,1-0.3c0.1-0.1,0.1-0.2,0.1-0.4v-1.9c-0.5-0.1-1-0.4-1.5-0.7v1.3L2.8,9.9C1.8,9.3,1.4,8,2,6.9    c0.2-0.3,0.5-0.6,0.8-0.8l5.8-3.3v1.3c0.4-0.3,1-0.5,1.5-0.7V1.5z"/></svg>`).register();let l=!1;function u(e){1==e.key.length&&isNaN(Number(e.key))&&e.preventDefault()}function p(){g.value=""+Math.round(100*r._volume),m()}function m(){g.style.maxWidth=g.value.length+"ch"}function f(e,t,n){h.getFieldValue(e)||h.setFieldValue(e,n),h.addInput(e,t,n,void 0,void 0,{type:"number",min:1,max:100,onKeyDown:u})}o.addEventListener("wheel",t=>{if(t.stopPropagation(),console.log("scroll"),!l){l=!0;let e;e=t.getModifierState("Shift")?"shift-increment":t.getModifierState("Control")?(t.preventDefault(),"ctrl-increment"):"default-increment";var n,i=Number(h.getFieldValue(e))/100,t=(t=r._volume-Math.sign(t.deltaY)*i,i=0,n=1,Math.min(Math.max(t,i),n));r.setVolume(t),0==t||1==t?l=!1:r._events.addListener("volume",()=>{l=!1},{once:!0})}})}else setTimeout(e,250)},(async()=>{await l()})();function C(l,s=document.body){return new Promise(n=>{var e=s.querySelector(l);if(e)return n(e);const i=new MutationObserver(e=>{var t=s.querySelector(l);t&&(i.disconnect(),n(t))});i.observe(s,{childList:!0,subtree:!0})})}(async()=>{var e;document.getElementById("volumeDplus")||((e=document.createElement("style")).id="volumeDplus",e.textContent=String.raw`
  .x-settings-section{display:grid;gap:8px}.x-settings-row{display:grid;gap:8px 24px;grid-template-columns:2fr 1fr}.x-settings-firstColumn,.x-settings-secondColumn{display:flex;align-items:center}.x-settings-secondColumn{justify-content:flex-end;position:relative}.x-settings-input{background:rgba(var(--spice-rgb-selected-row),.1);background-color:var(--spice-tab-active);border:1px solid transparent;border-radius:4px;color:var(--spice-text);font-family:inherit;font-size:14px;height:40px;padding:0 12px;width:100%}
      `.trim(),document.head.appendChild(e))})()}();