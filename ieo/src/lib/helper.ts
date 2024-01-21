import math from "./mathjs";
export default {
  delay: function (timeout: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  },

  trim(str: string) {
    return (str || "").replace(/^\s+|\s+$/g, "");
  },

  /**
   * 数字格式化
   * @param {Number} n 待格式的数字
   * @param {Number} f 保留小数位数，0=不展示小数位，默认0
   */
  format(n: number, f: number) {
    n = Number(n);
    if (!Number.isFinite(n)) return null;
    let s: any = n;
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
  /**
   * 数字小数位截取
   * 精度以外全部舍弃
   * d -3,-2,-1,0,1,2,3,4
   */
  digits(v: number, d = 0) {
    let a = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
    if (!v && v !== 0) {
      if (!d) return v;
      a.length = d;
      return "0." + a.join("");
    }
    if (d === 0) {
      return Math.floor(v);
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
  /**
   * 精度截取，精度以外的值按照，0舍去，>0 向上进一位
   * 12.10 -> 12.1
   * 12.11 -> 12.2
   * @param {Number} value
   * @param {Number} 位数
   */
  digits2(v: number, d = 0) {
    if (!v && v !== 0) {
      return this.digits(v, d);
    }
    if (!d || d === 0) {
      return Math.ceil(Number(v));
    }
    let n = Number(d);
    let s = math
      .chain(math.bignumber(Number(v)))
      .multiply(
        math
          .chain(math.pow(10, math.bignumber(d)))
          .format({ notation: "fixed" })
          .done()
      )
      .format({ notation: "fixed" })
      .done();
    s = Math.ceil(Number(s));
    s = math
      .chain(math.bignumber(Number(s)))
      .divide(
        math
          .chain(math.pow(10, math.bignumber(d)))
          .format({ notation: "fixed" })
          .done()
      )
      .format({ notation: "fixed" })
      .done();
    if (d <= 0) {
      return s;
    }
    return this.digits(s, n);
  },
  /**
   * 匹配url中的参数
   */
  matchUrl(name: string) {
    var reg = new RegExp("(^|&)" + name + "=(.*?)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  /**
   * bex颜色转为rgba
   * @param String #ff00ff #f0f
   * @param Number a 0-1
   * @return String rgba(r,g,b,a)
   */
  hex_to_rgba: (hex: string, a: number) => {
    if (!hex || hex.indexOf("#") == -1) {
      return "rgba(0,0,0,0)";
    }
    if (hex.length != 7 && hex.length != 4) {
      console.error(`${hex} is not hex color`);
      return "rgba(0,0,0,0)";
    }
    let s: any = hex.replace("#", "").match(/^(..?)(..?)(..?)/);
    const r: number = parseInt("0x" + s[1] + (s[1].length == 1 ? s[1] : ""));
    const g: number = parseInt("0x" + s[2] + (s[2].length == 1 ? s[2] : ""));
    const b: number = parseInt("0x" + s[3] + (s[3].length == 1 ? s[3] : ""));
    const opacity: number = Number(a) || 1;
    return `rgba(${r},${g},${b},${opacity})`;
  },
  // 字符串重组
  dataReform: (str: string) => {
    var result = "";
    var c;
    for (var i = 0; i < str.length; i++) {
      c = str.substr(i, 1);
      if (c == "\n") result = result + "</br>";
      else if (c == " " || c == "\\s") result = result + " ";
      else if (c != "\r") result = result + c;
    }
    return result;
  },

  deadlineFormat: (t: number) => {
    const textFormat = (i: number) => {
      return i > 9 ? i : "0" + i;
    }
    const n = Number(t);
    if (!n) {
      return ["00", "00", "00", "00"];
    }
    const d = Math.floor(n / (24 * 60 * 60 * 1000));
    const h = Math.floor((t - d * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
    const m = Math.floor(
      (t - d * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000) / (60 * 1000)
    );
    const s = Math.floor(
      (t - d * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000
    );
    return [textFormat(d), textFormat(h), textFormat(m), textFormat(s)];
  },


};
