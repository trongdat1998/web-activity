import math from "./mathjs";
import { callHandler } from "./app_jsbridge";

export default {
  delay: async (timeout: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  },
  /**
   * 数组排重
   * @param key 根据key进行排重
   * @param ar  数组
   * @param time 如果重复，根据time进行保留最新
   */
  excludeRepeatArray(key: string, ar: any, time: string) {
    let obj: any = {};
    if (!key || !ar || Object.prototype.toString.call(ar) !== "[object Array]")
      return;
    ar.map((item: any) => {
      if (obj[item[key]]) {
        // 如果重复，保留time最新的数据
        if (time && item[time] - obj[item[key]][time] >= 0) {
          obj[item[key]] = item;
        }
      } else {
        obj[item[key]] = item;
      }
    });
    let newar = [];
    for (let k in obj) {
      newar.push(obj[k]);
    }
    return newar;
  },
  trim: (str: string) => {
    return (str || "").replace(/^\s+|\s+$/g, "");
  },
  /**
   * 法币估值
   * 计算公式= rates[token][moneys[choose][1]]*value
   * @param {object} rates 所有汇率 { BTC:{ BTC:1, CNY: 4000, USD: 3000} }
   * @param {number} value token的值, 如 33.2
   * @param {string} token tokenId, 如BTC，ETH
   * @param {string} choose 转换成何种法币，如 en-us, zh-cn， 默认en-us
   * @param {bool} suffix 是否返回后货币符号，默认false返回如[¥, 100]，为true时返回如[CNY, 100]
   * @return {array} [法币标志,法币估值], 如 ['usd',2323.231] , 法币估值保留2位小数，如果小于0.01，保留5位小数, 如果估值为负数, value返回'--';
   */
  currencyValue(
    rates: any,
    value: number,
    token: string,
    choose: string = window.localStorage.lang,
    suffix: boolean = false
  ) {
    const win: any = window;
    const WEB_CONFIG: any = win.WEB_CONFIG;
    const money = WEB_CONFIG.supportLanguages;
    if (
      !rates ||
      !money ||
      !money.length ||
      (!value && value !== 0) ||
      !token ||
      !rates[token]
    ) {
      return suffix ? ["", "--", ""] : ["", "--"];
    }
    let moneys: any = {};
    money.map((item: any) => {
      moneys[item.lang.toLowerCase()] = [item.prefix, item.suffix];
    });
    // 要获取的法币是否有汇率，如果没有，默认获取en-us
    const realChoose = moneys[choose] && moneys[choose][0] ? choose : "en-us";
    if (!moneys[realChoose]) {
      return suffix ? ["", "--", ""] : ["", "--"];
    }
    const name = moneys[realChoose][0];
    const endName = moneys[realChoose][1];
    let v = rates[token.toUpperCase()][moneys[realChoose][1]];
    //选择币对的汇率不存在
    if (!v) {
      return suffix ? [name, "--", endName] : [name, "--"];
    }
    v = math
      .chain(v)
      .multiply(Number(value) || 0)
      .format({ notation: "fixed" })
      .done();
    const fix = v - 0.1 < 0 && Number(v) !== 0 ? 5 : 2;
    v = this.digits(v, fix);
    if (Number(v) < 0) {
      v = "--";
    } else {
      v = this.format(v, fix);
    }
    return suffix ? [name, v, endName] : [name, v];
  },
  /**
   * 数字格式化
   * @param {Number} n 待格式的数字
   * @param {Number} f 保留小数位数，0=不展示小数位，默认0
   */
  format(n: any, f: any) {
    n = Number(n);
    if (!Number.isFinite(n)) return null;
    let s = n;
    s = `${s}`.split(".");
    s[0] = s[0]
      .split("")
      .reverse()
      .join("")
      .replace(/(\d{3})/g, function ($1: string) {
        return $1 + ",";
      })
      .replace(/\,$/, "")
      .split("")
      .reverse()
      .join("");
    s[1] = s[1] ? s[1] : 0;
    if (Number.isFinite(f)) {
      s[1] = (s[1]
        ? s[1] + "000000000000000000000"
        : "000000000000000000000"
      ).split("");
      s[1].length = Math.max(0, Math.min(Math.floor(f), 16));
      if (f < 1 || f > 16) {
        //window.console.log("f is to small or big~~~");
      }
      s[1] = s[1].join("");
      return f < 1 || f > 16 ? s[0] : s[0] + "." + s[1];
    } else {
      return s[1] ? s[0] + "." + s[1] : s[0];
    }
  },
  digits(v: string, d: number = 0) {
    let a = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
    if (!v && parseFloat(v) !== 0) {
      if (!d) return v;
      a.length = d;
      return "0." + a.join("");
    }
    if (d === 0 || d === 0 || !d || !Number(d)) {
      return Math.floor(parseFloat(v));
    }
    // 整数截取
    if (d <= 0) {
      let r = math
        .chain(v)
        .multiply(
          math
            .chain(math.pow(10, math.bignumber(d)))
            .format({ notation: "fixed" })
            .done()
        )
        .format({ notation: "fixed" })
        .done();
      r = Math.floor(r);
      r = math
        .chain(r)
        .divide(
          math
            .chain(math.pow(10, math.bignumber(d)))
            .format({ notation: "fixed" })
            .done()
        )
        .format({ notation: "fixed" })
        .done();
      return r;
    }
    let s = v;
    let c: any = `${s}`.split(".");
    if (!c[1]) {
      c[1] = "";
    }
    if (c[1].length == d) {
      return s;
    }
    if (c[1].length < d) {
      a.length = d - c[1].length;
      return c[1] ? s + a.join("") : a.length ? s + "." + a.join("") : s;
    }
    if (c[1].length > d) {
      c[1] = c[1].split("");
      c[1].length = d;
      return c[0] + "." + c[1].join("");
    }
    return v;
  },
  callLogin() {
    const pathname: string = window.location.href;
    const navigator: any = window.navigator;
    if (/bhexApp/i.test(navigator.userAgent)) {
      callHandler({
        name: "login",
        data: {
          redirect: pathname,
        },
      });
    } else {
      window.location.href =
        "/m/login?redirect=" + encodeURIComponent(pathname);
    }
  },
};
