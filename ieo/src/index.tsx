import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import { IntlProvider, addLocaleData } from "react-intl";

import "./index.css";
import "./App.css";
import request from "./lib/request";
import routes from "./router";
import * as serviceWorker from "./serviceWorker";

const win: any = window;
const apis = {
  index_config: `/s_api/basic/index_config?preview=false`,
};
async function index_config() {
  const res = await request(apis.index_config, { method: "post", payload: {} });
  if (res.code === "OK" && res.data && res.data.favicon) {
    const dom: any = document.querySelector("#favicon");
    if (dom) {
      dom.href = res.data.favicon;
    }
  }
}

index_config();
/**
 * 获取国际化资源文件
 *
 * @param {any} lang
 * @returns
 */
async function getLocale(lang: string, cb: any) {
  let jsLoadUrls: any = [];
  win.WEB_CONFIG.supportLanguages &&
    win.WEB_CONFIG.supportLanguages.map((el: any) => {
      if (el.lang == lang) {
        jsLoadUrls = el.jsLoadUrls || [];
      }
    });
  if (!jsLoadUrls.length) {
    win.WEB_LOCALES_ALL = {};
    getLocaleCb(lang, cb);
    return;
  }
  let c = 0;
  function loadall() {
    c = 1 + c;
    if (c == jsLoadUrls.length) {
      win.WEB_LOCALES_ALL = {
        ...(win.WEB_LOCALES || {}),
        ...(win.WEB_LOCALES_USER || {}),
      };
      getLocaleCb(lang, cb);
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
      .parentNode.insertBefore(script, win.document.querySelector("script"));
  }
  jsLoadUrls.map((item: any) => {
    load(item);
  });
}
async function getLocaleCb(lang: string, cb: any) {
  let result = { default: {} };
  switch (lang) {
    case "zh-cn":
      result = await import("./locales/zh-cn");
      break;
    case "en-us":
      result = await import("./locales/en-us");
      break;
    case "ja-jp":
      result = await import("./locales/ja-jp");
      break;
    case "ru-ru":
      result = await import("./locales/ru-ru");
      break;
    case "ko-kr":
      result = await import("./locales/ko-kr");
      break;
    case "es":
      result = await import("./locales/es-es");
      break;
    default:
      result = await import("./locales/en-us");
  }
  setTimeout(() => {
    cb(result.default || result);
  }, 0);
}
getLocale(win.localStorage.lang, function (appLocale: any) {
  addLocaleData(...appLocale.data);
  ReactDOM.render(
    <IntlProvider
      locale={appLocale.locale}
      messages={appLocale.messages}
      formats={appLocale.formats}
      onError={() => {
      }}
    >
      <SnackbarProvider maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {routes()}
      </SnackbarProvider>
    </IntlProvider>,
    document.querySelector("#root")
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
