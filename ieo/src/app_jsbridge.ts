/**
 *  js 调用用app的 方法
 */

/**
 * WebViewJavascriptBridge
 * opt.name :
 * 1、appSubmitPhoto 上传图片
 */

// android 未注入之前调用队列
const win: any = window;
win.WVJBCallbacks = win.WVJBCallbacks || [];

function cb(res: any, opt: any) {
  if (Object.prototype.toString.call(res) == "[object String]") {
    res = eval("(" + res + ")");
  }
  if (res && res.code == "OK") {
    opt.success && opt.success(res);
  } else if (res && res.code == "CANCEL") {
    opt.cancel && opt.cancel(res);
  } else {
    opt.error && opt.error(res);
  }
}

export function callHandler(opt: any) {
  if (win.WebViewJavascriptBridge) {
    if (opt.data) {
      win.WebViewJavascriptBridge.callHandler(opt.name, opt.data, function (
        res: any
      ) {
        cb(res, opt);
      });
    } else {
      win.WebViewJavascriptBridge.callHandler(opt.name, function (res: any) {
        cb(res, opt);
      });
    }
  } else {
    win.WVJBCallbacks.push(opt);
  }
}
