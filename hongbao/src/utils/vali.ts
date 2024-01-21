export default {
  isMobile: (mobile: string) => {
    return /^1[3456789]\d{9}$/.test(mobile);
  },
  isChinese: (str: string) => {
    return /[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}]/u.test(
      str
    );
  },
  isAlphanumeric: (str: string) => {
    if (!str) return false;
    return /^[0-9a-zA-Z\-\_]{1,}$/.test(str);
  },
  isNumber: (num: string) => {
    if (!num && Number(num) !== 0) return false;
    return /^\d{1,}$/.test(num);
  },
  isLength: (str: string, num: number) => {
    return str && num ? str.length == num : false;
  },
  isURL: (url: string, scheme: boolean = false) => {
    if (!url) return false;
    if (scheme) {
      return /^http(s)?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(
        url
      );
    } else {
      return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(
        url
      );
    }
  },
  isEmail: (email: string) => {
    if (!email) return false;
    return /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(
      email
    );
  },
  isFloat: (num: string) => {
    if (num === "" || num === ".") {
      return false;
    }
    // /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/
    return /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/.test(
      num
    );
  },
};
