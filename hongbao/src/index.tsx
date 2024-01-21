import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import dva from "dva";
import { createBrowserHistory, createHashHistory } from "history";
import createLoading from "dva-loading";
import { SnackbarProvider } from "notistack";
import { IntlProvider, addLocaleData } from "react-intl";
import "intl-polyfill";

import "./index.css";

// models
import Layout from "./models/layout";
// routes
import Routes from "./router";

const route: any = Routes;
const win: any = window;

/**
 * 获取国际化资源文件
 *
 * @param {any} lang
 * @returns
 */
const WEB_CONFIG: any = win.WEB_CONFIG;
async function getLocale(lang: string, cb: Function) {
  let jsLoadUrls: string[] = [];
  WEB_CONFIG.supportLanguages &&
    WEB_CONFIG.supportLanguages.map((el: any) => {
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
      .parentNode.insertBefore(script, window.document.querySelector("script"));
  }
  jsLoadUrls.map((item) => {
    load(item);
  });
}
async function getLocaleCb(lang: string, cb: Function) {
  let result: any = { default: "" };
  switch (lang) {
    case "zh-cn":
      result = await import("./locales/zh-cn");
      break;
    case "en-us":
      result = await import("./locales/en-us");
      break;
    case "ko-kr":
      result = await import("./locales/ko-kr");
      break;
    case "ja-jp":
      result = await import("./locales/ja-jp");
      break;
    case "vi-vn":
      result = await import("./locales/vi-vn");
      break;
    default:
      result = await import("./locales/en-us");
  }
  setTimeout(() => {
    cb(result.default || result);
  }, 0);
}

if (!WEB_CONFIG.orgId) {
  window.location.href = "/m/error.html";
}

// 1. Initialize
const data = {
  history: createBrowserHistory(),
  //onAction: createLogger(),
  onError(e: any) {
    window.console.log(e);
  },
};
const app = dva(data);

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(Layout);

// 4. Router
app.router(route);

// 5. Start
const App = app.start();

getLocale(window.localStorage.lang, function (appLocale: any) {
  addLocaleData(...appLocale.data);
  ReactDOM.render(
    <IntlProvider
      locale={appLocale.locale}
      messages={appLocale.messages}
      formats={appLocale.formats}
    >
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <App />
      </SnackbarProvider>
    </IntlProvider>,
    document.querySelector("#root")
  );
  //sw();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
