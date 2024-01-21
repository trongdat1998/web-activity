import urls from "../config/api";
import request from "../utils/request";

/**
 * 通用请求
 * @param {string} key 请求地址，参考urls中的key
 * @param {object} params 请求参数
 * @return {promise}
 */
interface argConfig {
  body: object;
}
export default function getData(key: string) {
  return ({ payload, ...props }: { payload: object }): Promise<any> => {
    const options: argConfig = { body: payload, ...props };
    return request(key, options);
  };
}
