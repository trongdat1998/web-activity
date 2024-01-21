/*
 * Cookie
 */

interface valueConfig {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  maxAge?: number;
}
export default {
  read: function(name: string) {
    var value = document.cookie.match("(?:^|;)\\s*" + name + "=([^;]*)");
    return value ? decodeURIComponent(value[1]) : null;
  },
  write: function(value: valueConfig) {
    var str = value.name + "=" + encodeURIComponent(value.value);
    if (value.domain) {
      str += "; domain=" + value.domain;
    }
    str += "; path=" + (value.path || "/");
    if (value.maxAge) {
      str += "; max-age=" + value.maxAge;
    }
    document.cookie = str;
    return;
  },
  del: function(name: string, options?: valueConfig) {
    var opt: valueConfig = options || {
      name: name,
      maxAge: -1,
      value: ""
    };
    opt.name = name;
    opt.maxAge = -1;
    opt.value = "";
    this.write(opt);
    return;
  }
};
