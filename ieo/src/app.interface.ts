export interface InfoItem {
  count?: number;
  brokerId: number;
  projectCode: string;
  circulationStr: string;
  bannerUrl: string;
  description: string;
  wechatUrl: string;
  blockBrowser: string;
  browserTitle: string;
  activityType: number; // 活动类型 1锁仓派息  2IEO
  onlineTime: number; // 上线时间
  resultTime: number; // 结果公布时间
  progressStatus: number; // 活动当前进度
  deadlineTime: number; // 活动结束倒计时
  projectName: string;
  title: string;
  projectType: number; // 项目类型 0 锁仓至主网上线 1 固定周期锁仓
  descript: string;
  lockedPeriod: number; //锁仓周期
  platformLimit: number; //平台可购买总数量
  isPurchaseLimit: number; // 是否有购买限额 0 没有购买限额 1 有购买限额
  purchaseableQuantity: number; //平台剩余可购买数量
  userLimit: number; //用户剩余可购买数量
  minPurchaseLimit: number; //最小下单单位，也就是每份购买数量
  fixedInterestRate: string; // 固定利率（活动开始后的奖励费率）
  soldAmount: string | number; // 已售出数量
  purchaseTokenId: string; //支付tokenId
  purchaseTokenName: string;
  receiveTokenId: string; // 获得的tokenID
  receiveTokenName: string;
  receiveQuantity: number; // 兑换比例  1 purchaseTokenId = exchangeRate receiveTokenId
  valuationQuantity: number; // 计价货币数量
  totalCirculation: number; // 总发行量
  startTime: number; //活动开始时间
  endTime: number; //活动结束时间
  createdTime: number; //活动创建时间
  updatedTime: number; //活动更新时间
  startTimeCountdown: number;
  totalReceiveCirculation: string;
  status: number; // 控制购买状态, 1可买， 其他售罄  状态 0 删除 1 开启 2 关闭 3 提前结束
  needAddress: number;
}

export interface OrderItem {
  tokenId: string; // tokenId
  purchaseTime: number; // 购买时间
  amount: string; // 购买数量
  projectName: string; // 项目名称
}

export interface Payload {
  [props: string]: any;
}

export interface Action {
  type: string;
  payload: Payload;
}
// export interface commonInfo {
//   id: number;
//   brokerId: number;
//   projectCode: string;
//   bannerUrl: string;
//   description: string;
//   wechatUrl: string;
//   blockBrowser: string;
//   browserTitle: string;
// }
export interface Avaliable {
  tokenId: string;
  tokenName: string;
  tokenFullName: string;
  total: string;
  free: string;
  locked: string;
  btcValue: string;
}
export interface TabList {
  id: number;
  name: string;
}
export interface ListInitState {
  list: ListItem[];
  hasMore: boolean;
  ordering: boolean;
  title: string;
  background: string;
  tab: number;
  tabs: TabList[];
}
export interface InitState {
  //common_info: commonInfo;
  basic_info: InfoItem;
  ordering: boolean;
  //order_list: OrderItem[];
  //time: number;
  avaliable: Avaliable[];
  count: string | number;
  //tab: number;
  deadline: number;
  startTimeCountdown: number;
  [props: string]: any;
  tab: number;
  tabs: TabList[];
  conditions: string[];
}
export interface Count {
  n: number;
  side: string;
}

export interface Order {
  orderId: string;
  purchaseToken: string;
  purchaseTokenName: string;
  purchaseTime: string;
  orderQuantity: number;
  price: number;
  needAddress: number;
  projectName: string;
}
export interface OrderList {
  list: Order[];
  hasMore: boolean;
  ordering: boolean;
}

export interface ListItem {
  id: string;
  projectCode: string;
  projectName: string;
  url: string;
  introducation: string;
  endTime: number;
  status: number;
  offeringsVolume: string;
  offeringsToken: string;
  remainMillSecondForStart: number;
  remainMillSecondForEnd: number;
}

export interface Address {
  orderId?: string,
  contacts?: string,
  nationalCode?: string,
  mobile?: string,
  country?: string,
  address?: string,
  area?: string,
}
