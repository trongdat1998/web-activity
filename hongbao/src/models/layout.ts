import getData from "../services/getData";
import RouteMap from "../config/route_map";
import CONST from "../config/const";
import Cookie from "../utils/cookie";
import API from "../config/api";
import {
  DvaModel,
  ReduxAction,
  ReduxSagaEffects,
  LayoutState,
} from "../interfaces/main";
import modelExtend from "dva-model-extend";
import { callHandler } from "../utils/app_jsbridge";

interface AnyObj {
  [propName: string]: string;
}
const win: Window = window;
const route_map: AnyObj = RouteMap;

const model: DvaModel<LayoutState> = {
  namespace: "layout",

  // layout的state全局共用，需要注意key重复问题，其他model的key如果跟layout的key重名，值会覆盖layout的值
  state: {
    // 登录用户的info
    userinfo: {
      user_id: "",
    },
    index_config: {
      logo: "", // 券商logo url
      shareConfig: {
        openUrl: "",
      },
    },
    rates: {},
    is_login: true,
    geetestData: {},
  },
  subscriptions: {
    setup({ dispatch, history }: any): any {
      dispatch({
        type: "getConfig",
        payload: {},
      });
      dispatch({
        type: "getBaseUserinfo",
        payload: {},
      });
    },
  },
  effects: {
    /**
     * 通用请求方法
     * @param payload 请求参数
     * @param url 接口地址
     * @param success 数据处理回调,返回json
     * @param fail 错误回调
     */
    *commonReq(
      { payload, url, success, fail }: ReduxAction,
      { call, put, select }: ReduxSagaEffects
    ): any {
      if (!url) return;
      const result = yield call(getData(url), { payload });
      if (result.code === "OK") {
        success && success(result.data, result.msg);
      } else {
        fail && fail(result.code, result.msg);
      }
    },
    /**
     * update
     */
    *updateState({ payload }: ReduxAction, { put }: ReduxSagaEffects): any {
      yield put({
        type: "save",
        payload,
      });
    },
    // 获取汇率
    *get_rates({ payload, dispatch }, { call, put, select }) {
      const win: any = window;
      const WEB_CONFIG: any = win.WEB_CONFIG;
      let tokens: any = [];
      const coin_token = WEB_CONFIG.token;
      (coin_token || []).map((item: any) => {
        tokens.push(item.tokenId);
      });
      let keys = [...tokens, "BTC", "USDT"];
      let values: any = new Set();
      values.add("BTC");
      values.add("USDT");
      values.add("USD");
      WEB_CONFIG.supportLanguages.map((item: any) => {
        if (item.lang == window.localStorage.lang) {
          values.add(item.suffix);
        }
      });
      values = Array.from(values);
      const result = yield call(getData(API.rate2), {
        payload: {
          tokens: keys.join(",").toUpperCase(),
          legalCoins: values.join(",").toUpperCase(),
        },
      });
      if (
        result.code == "OK" &&
        result.data &&
        (result.data.code == 0 || result.data.code == 200) &&
        result.data.data
      ) {
        let rates: any = {};
        result.data.data.map((item: any, i: number) => {
          if (item) {
            rates[item.token] = item.rates;
          }
        });
        yield put({
          type: "save",
          payload: {
            rates,
          },
        });
      }
    },
    *getBaseUserinfo({ payload }, { call, put }) {
      const result = yield call(getData(API.get_base_userinfo), {
        payload,
        method: "get",
      });
      let is_login = false;
      if (result.code === "OK") {
        is_login = true;
      } else if (result.code === 30000) {
        is_login = false;
      }
      yield put({
        type: "save",
        payload: {
          is_login,
        },
      });
    },

    *getConfig({ payload }, { call, put }) {
      const result = yield call(getData(API.index_config), {
        payload,
        method: "get",
      });
      if (result.code === "OK" && result.data) {
        yield put({
          type: "save",
          payload: {
            index_config: result.data,
          },
        });
      }
    },
    // 用户资产
    *balance({ payload }, { call }) {
      return yield call(getData(API.get_asset), {
        payload,
        method: "get",
      });
    },
    *openBonus({ payload }, { call }) {
      return yield call(getData(API.open_bonus), {
        payload,
      });
    },
    *sendBonus({ payload }, { call }) {
      return yield call(getData(API.send_bonus), {
        payload,
      });
    },
    *registGeetest({ payload, onSuccess }, { call, put }) {
      const result: any = yield call(getData(API.regist_geetest), {
        payload,
      });

      if (result.code == 'OK') {
        yield put({
          type: 'save',
          payload: {
            geetestData: result.data
          }
        })
        onSuccess && onSuccess(result.data);
      }
    }
  },
  reducers: {
    save(state: object, action: ReduxAction) {
      return { ...state, ...action.payload };
    },
  },
};
export default modelExtend(model);
