import { WithStyles } from "@material-ui/core/styles";

export interface ReduxAction {
  type: string;
  [propName: string]: any;
}

export interface ReduxSagaEffects {
  put: any;
  call: any;
  select: any;
}

export interface DvaModelReducer {
  (state: object, action: ReduxAction): object;
}

export interface DvaModelReducers {
  [reducerName: string]: DvaModelReducer;
}

export interface DvaModelEffectFn {
  (action: ReduxAction, sagaEffects: ReduxSagaEffects): any;
}

export interface ReduxSagaTaker {
  type: string;
  [propsName: string]: any;
}
// problem
// export interface DvaModelEffectWithTaker
//   extends Array<ReduxSagaTaker | DvaModelEffectFn> {
//   [index: number]: ReduxSagaTaker | DvaModelEffectFn;
// }

export type DvaModelEffect = DvaModelEffectFn;

export interface DvaModelEffects {
  [effectName: string]: DvaModelEffect;
}

export interface DvaModel<T> {
  namespace: string;
  state?: T;
  reducers?: DvaModelReducers;
  effects?: DvaModelEffects;
  subscriptions?: object;
}

interface Loading {
  effects: any;
  global: boolean;
  models: any;
}

export interface Props extends WithStyles {
  layout: object;
  loading: Loading;
  dispatch: Function;
  location: object;
  [propsName: string]: any;
}

export interface UserInfo {
  user_id: string;
}

export interface Share {
  openUrl: string;
}
export interface Config {
  logo: string;
  shareConfig: Share;
}
export interface LayoutState {
  userinfo: UserInfo;
  index_config: Config;
  rates: any;
  is_login: boolean;
  geetestData: any;
}

export interface ApiResult {
  code: string;
  message: string;
  data: any;
}

export interface TokensList extends WithStyles {
  tokenId: string;
  tokenName: string;
  minAmount: string;
  maxAmount: string;
  maxCount: string;
  maxTotalAmount: string;
}
