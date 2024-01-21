/*
 * Cookie
 */

interface Value {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  day?: number;
  expires?: Date;
}

export default {
  read: function (name: string) {
    var value = document.cookie.match("(?:^|;)\\s*" + name + "=([^;]*)");
    return value ? decodeURIComponent(value[1]) : null;
  },
  write: function (value: Value) {
    var str = value.name + "=" + encodeURIComponent(value.value);
    if (value.domain) {
      str += "; domain=" + value.domain;
    }
    str += "; path=" + (value.path || "/");
    if (value.day) {
      var time = new Date();
      time.setTime(time.getTime() + value.day * 24 * 60 * 60 * 1000);
      str += "; expires=" + time.toUTCString();
    }
    if (value.expires) {
      str += "; expires=" + value.expires.toUTCString();
    }
    document.cookie = str;
    return;
  },
  del: function (name: string) {
    var opt: Value = {
      name: name,
      value: '',
      day: -1
    };
    this.write(opt);
    return;
  }
};
