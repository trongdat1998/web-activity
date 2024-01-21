const prefix = "/api";
const prefix2 = "/s_api";

export default {
  userinfo: `${prefix}/user/profile`, // 用户信息
  detail: `${prefix}/red_packet/detail`, // 红包详情
  index_config: `${prefix2}/basic/index_config`, // shareconfig
  my_receive: `${prefix}/red_packet/my_receive`, // 收到的红包
  my_send: `${prefix}/red_packet/my_send`, // 发出的红包
  get_asset: `${prefix}/asset/get`, // 币余额查询
  rate2: `${prefix}/quote/v1/rates`, // 汇率2
  open_bonus: `${prefix}/red_packet/open`, // 打开红包
  get_tokens: `${prefix}/red_packet/tokens`, // 获取红包Token列表
  get_red_packet_config: `${prefix}/red_packet/config`, // 获取红包背景、token列表
  send_bonus: `${prefix}/red_packet/send`, // 发红包
  invite_share_info: `${prefix}/invitation/share/template_info`, // 邀请分享信息
  getBackground: `${prefix}/red_packet/themes?position=2`, // 获取发送红包背景图
  get_available_asset: `${prefix}/asset/available/get`, // 获取资产（去除风险资产）
  get_base_userinfo: `${prefix}/user/get_base_info`, // 获取用户基本信息
  regist_geetest: `${prefix}/v1/basic/geev3/register`,
};
