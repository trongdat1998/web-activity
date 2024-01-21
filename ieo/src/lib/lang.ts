interface Obj {
  [props: string]: string;
}

const win: any = window;
const WEB_CONFIG = win.WEB_CONFIG;
let WEB_LOCALES_ALL: any = {};

async function getLocaleFn(lang: string) {
  let jsLoadUrls: string[] = [];
  WEB_CONFIG.supportLanguages &&
    WEB_CONFIG.supportLanguages.map((el: any) => {
      if (el.lang == lang) {
        jsLoadUrls = el.jsLoadUrls || [];
      }
    });
  if (!jsLoadUrls.length) {
    WEB_LOCALES_ALL = {};
    return;
  }
  let c = 0;
  function loadall() {
    c = 1 + c;
    if (c == jsLoadUrls.length) {
      WEB_LOCALES_ALL = {
        ...(win.WEB_LOCALES || {}),
        ...(win.WEB_LOCALES_USER || {}),
      };
    }
  }
  function load(src: string) {
    const script = document.createElement("script");
    script.onload = function () {
      loadall();
    };
    script.onerror = function () {
      loadall();
    };
    script.src = src;
    win.document
      .querySelector("script")
      .parentNode.insertBefore(script, window.document.querySelector("script"));
  }
  jsLoadUrls.map((item) => {
    load(item);
  });
}
getLocaleFn(win.localStorage.lang);

const getLocale = (key: string): string => {
  return WEB_LOCALES_ALL[key] || key;
};

export default getLocale;
