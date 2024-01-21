import React, { useEffect, useRef, useReducer } from "react";
import { Link } from 'react-router-dom'
import {
  Button,
  Grid,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Tabs,
  Tab,
} from "@material-ui/core";
import { injectIntl, FormattedMessage } from "react-intl";
import moment from "moment";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import classNames from 'classnames';

import request from "../lib/request";
import lang from "../lib/lang";
import helper from "../lib/helper";
import Cookie from "../lib/cookie";
import { InitState, Action } from "../app.interface";
import style from "./style";
import { Iconfont } from "../components";
import withRoot from "../components/withRoot";

const apis = {
  basic_info: `/api/v1/activity/lock/interest/ieo/basic_info`,
  asset: `/api/asset/get`, // 资产
};

const _initialState: InitState = {
  basic_info: {
    brokerId: 0,
    projectCode: "",
    bannerUrl: "",
    description: "",
    wechatUrl: "",
    circulationStr: "",
    blockBrowser: "",
    browserTitle: "",
    activityType: 0, // 活动类型 1锁仓派息  2IEO
    onlineTime: 0, // 上线时间
    resultTime: 0, // 结果公布时间
    progressStatus: 0, // 活动当前进度
    deadlineTime: 0, // 活动结束倒计时
    projectName: "",
    title: "",
    projectType: 0, // 项目类型 0 锁仓至主网上线 1 固定周期锁仓
    descript: "",
    lockedPeriod: 0, //锁仓周期
    platformLimit: 0, //平台可购买总数量
    isPurchaseLimit: 0, // 是否有购买限额 0 没有购买限额 1 有购买限额
    purchaseableQuantity: 0, //平台剩余可购买数量
    userLimit: 0, //用户剩余可购买数量
    minPurchaseLimit: 0, //最小下单单位，也就是每份购买数量
    fixedInterestRate: "", // 固定利率（活动开始后的奖励费率）
    soldAmount: 0, // 已售出数量
    purchaseTokenId: "", //支付tokenId
    purchaseTokenName: "", //支付tokenName
    receiveTokenId: "", // 获得的tokenID
    receiveTokenName: "", //获得的tokenName
    receiveQuantity: 0, // 兑换比例  1 purchaseTokenId = exchangeRate receiveTokenId
    valuationQuantity: 0,
    totalCirculation: 0, // 总发行量
    startTime: 0, //活动开始时间
    endTime: 0, //活动结束时间
    createdTime: 0, //活动创建时间
    updatedTime: 0, //活动更新时间
    startTimeCountdown: 0,
    totalReceiveCirculation: "",
    status: 0, // 控制购买状态, 1可买， 其他售罄  状态 0 删除 1 开启 2 关闭
    needAddress: 0, // 1 需要填地址 2 不需要要
  },
  //order_list: [],
  // 倒计时剩余时间
  //time: 0,
  // 资产
  avaliable: [],
  count: "",
  // 活动规则，锁仓记录tab值
  //tab: 0,
  deadline: 0,
  startTimeCountdown: 0,
  ordering: false,
  tabs: [],
  tab: 0,
  conditions: [],
};

function reducer(state: InitState, action: Action) {
  switch (action.type) {
    case "basic_info":
      return { ...state, basic_info: action.payload.basic_info };
    case "order_list":
      return { ...state, order_list: action.payload.order_list };
    case "count":
      const count =
        action.payload.v && Number(`${action.payload.v}`.replace(/\D/gi, ""))
          ? Math.floor(Number(`${action.payload.v}`.replace(/\D/gi, "")))
          : "";
      return { ...state, count };
    case "tab":
      return { ...state, tab: action.payload.tab };
    case "reset":
      return { ..._initialState, ...action.payload };
    case "deadline":
      return {
        ...state,
        deadline: Math.max(state.deadline - 1000, 0),
        startTimeCountdown: Math.max(state.startTimeCountdown - 1000, 0),
      };
    case "ordering":
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}

let tokens: string[] = [];

async function getInit(projectCode: string) {
  //let common_info = _initialState.common_info;
  let basic_info = _initialState.basic_info;
  let order_list = _initialState.order_list;
  let avaliable = _initialState.avaliable;
  let deadline = _initialState.deadline;
  let startTimeCountdown = _initialState.startTimeCountdown;
  try {
    const res = await request(apis.basic_info, {
      method: "GET",
      body: { projectCode },
    });
    if (res.code === "OK" && res.data) {
      basic_info = res.data;
      deadline = Number(res.data.deadlineTime);
      startTimeCountdown = Number(res.data.startTimeCountdown);
      //common_info = res.data.projectCommonInfo;
      // document.title = basic_info.browserTitle;
      tokens.push(basic_info.purchaseTokenId);
    }
  } catch (e) {
    basic_info = _initialState.basic_info;
  }
  try {
    const res = await request(apis.asset, {
      body: { token_ids: tokens.join(",") },
    });
    if (res.code === "OK" && res.data) {
      avaliable = res.data;
    }
  } catch (e) { }
  return {
    basic_info,
    order_list: [],
    avaliable,
    tab: 0,
    deadline,
    startTimeCountdown,
    ordering: false,
    count: "",
  };
}


let timer: any;
const DetailPage: React.FC = (props: any) => {

  const { projectCode } = props.match.params;
  const [state, dispatch] = useReducer(reducer, _initialState);
  let userid = Cookie.read("user_id");

  const { classes } = props;

  function changeTabs(event: any, newValue: number) {
    dispatch({
      type: "ordering",
      payload: {
        tab: newValue,
      },
    });
    let anchorElement = document.getElementById("info" + newValue);
    if (anchorElement) {
      anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  // 资产变动时，更新全部数据
  useEffect(() => {
    getInit(projectCode).then((res) => {
      dispatch({
        type: "reset",
        payload: {
          ...res,
        },
      });
      clearInterval(timer);
      timer = setInterval(() => {
        dispatch({
          type: "deadline",
          payload: {
            deadline: Number(state.deadline),
            startTimeCountdown: Number(state.startTimeCountdown),
          },
        });
      }, 1000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectCode, state.avaliable.length]);

  function getTabs(basic_info: any) {
    const tabs = [{ id: 0, name: "项目简介" }];
    if (basic_info.rule) {
      tabs.push({ id: 1, name: "活动规则" });
    }
    if (basic_info.about) {
      tabs.push({ id: 2, name: "关于" });
    }
    return tabs;
  }
  // 认购条件
  function getConditions(basic_info: any) {
    const balanceRuleJson = basic_info.balanceRuleJson
      ? JSON.parse(basic_info.balanceRuleJson)
      : {};
    const conditions = [];
    if (basic_info.verifyKyc) {
      conditions.push({ id: "完成实名认证" });
    }
    if (basic_info.verifyBindPhone) {
      conditions.push({ id: "绑定手机号" });
    }
    if (basic_info.verifyBalance) {
      conditions.push({
        id: "持有{volume}个{token}及以上",
        value: {
          volume: balanceRuleJson.positionVolume,
          token: balanceRuleJson.positionToken,
        },
      });
    }
    if (basic_info.verifyAvgBalance) {
      const start = moment(
        balanceRuleJson.verifyAvgBalanceStartTime * 1
      ).format("MM/DD");
      const end = moment(balanceRuleJson.verifyAvgBalanceEndTime * 1).format(
        "MM/DD"
      );
      conditions.push({
        id: "{start}-{end}（UTC+8）日均持仓≥{volume}个{token}",
        value: {
          start: start,
          end: end,
          volume: balanceRuleJson.verifyAvgBalanceVolume,
          token: balanceRuleJson.verifyAvgBalanceToken,
        },
      });
    }
    if (basic_info.levelLimit) {
      conditions.push({
        id: "用户等级为{levelLimit}以上",
        value: { levelLimit: basic_info.levelLimit },
      });
    }
    return conditions;
  }
  useEffect(() => {
    const basic_info = state.basic_info;
    if (basic_info.projectName) {
      window.document.title = basic_info.projectName;
    }
    const tabs = getTabs(basic_info);
    const conditions = getConditions(basic_info);
    dispatch({
      type: "ordering",
      payload: {
        tabs,
        conditions,
      },
    });
  }, [state.basic_info]);

  useEffect(() => {
    if (
      Math.max(0, state.deadline - 1000) > 0 &&
      Math.max(0, state.startTimeCountdown - 1000) == 0
    ) {
      let info = state.basic_info;
      info["progressStatus"] = 2;
      dispatch({
        type: "ordering",
        payload: {
          basic_info: info,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.deadline, state.startTimeCountdown]);

  let d: any[] = ["00", "00", "00", "00"];
  if (state.basic_info.progressStatus == 1) {
    d = helper.deadlineFormat(state.startTimeCountdown);
  } else if (state.basic_info.progressStatus == 2) {
    d = helper.deadlineFormat(state.deadline);
  }
  const unit = [lang("天"), lang("时"), lang("分"), lang("秒")];

  const step = (state.basic_info.progressStatus || 1) - 1;

  let free: any = 0;
  state.avaliable.map((item) => {
    if (item.tokenId === state.basic_info.purchaseTokenId) {
      free = Number(item.free);
    }
  });

  return (
    <div className={classes.app}>
      <div className={classes.s1}>
        <img src={state.basic_info.bannerUrl || ""} />
        <h2>{state.basic_info.projectName}</h2>
        <div className={classes.s1_p1}>
          <Grid container>
            <Grid item xs={3}>
              {lang("发行价")}
            </Grid>
            <Grid item xs={9} className={classes.primary}>
              {Number(state.basic_info.receiveQuantity) &&
                Number(state.basic_info.valuationQuantity) ? (
                <span>
                  {state.basic_info.receiveQuantity}{" "}
                  {state.basic_info.receiveTokenName} ={" "}
                  {state.basic_info.valuationQuantity}{" "}
                  {state.basic_info.purchaseTokenName}
                </span>
              ) : (
                <span>{lang("待定")}</span>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}>
              {lang("分配总量")}
            </Grid>
            <Grid item xs={9}>
              {state.basic_info.circulationStr ? (
                <strong>{state.basic_info.circulationStr}</strong>
              ) : (
                <strong>
                  {state.basic_info.totalReceiveCirculation}{" "}
                  {state.basic_info.receiveTokenName}
                </strong>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}>
              {lang("申购币种")}
            </Grid>
            <Grid item xs={9}>
              <strong>{state.basic_info.purchaseTokenName}</strong>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <Grid container className={classes.s1_p2}>
          {state.basic_info.domain ? (
            <Grid item>
              <a
                href={state.basic_info.domain}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Iconfont type="website" size="24" />
                <span>{lang("官网")}</span>
              </a>
            </Grid>
          ) : (
            ""
          )}
          {state.basic_info.whitePaper ? (
            <Grid item>
              <a
                href={state.basic_info.whitePaper}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Iconfont type="whitepaper" size="24" />
                <span>{lang("白皮书")}</span>
              </a>
            </Grid>
          ) : (
            ""
          )}
          {state.basic_info.browser ? (
            <Grid item>
              <a
                href={state.basic_info.browser}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Iconfont type="browser" size="24" />
                <span>{lang("区块链浏览器")}</span>
              </a>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </div>
      {state.basic_info.progressStatus == 4 ? (
        <div className={classes.s2}>
          <h2>{lang("公布结果")}</h2>
          <Grid container className={classes.s2_p1_2} justify="space-between">
            <Grid item>{lang("项目目标申购")}</Grid>
            <Grid item>
              {state.basic_info.totalCirculation}{" "}
              {state.basic_info.purchaseTokenName}
            </Grid>
          </Grid>
          <Grid container className={classes.s2_p1_2} justify="space-between">
            <Grid item>{lang("实际申购")}</Grid>
            <Grid item>
              {state.basic_info.soldAmount
                ? Number(state.basic_info.soldAmount)
                : state.basic_info.soldAmount}{" "}
              {state.basic_info.purchaseTokenName}
            </Grid>
          </Grid>
          {userid ? (
            Number(state.basic_info.useAmount) ||
              Number(state.basic_info.backAmount) ? (
              <div className={classes.result_con}>
                <strong>{lang("恭喜您获得")}</strong>
                <h1>
                  {state.basic_info.luckyAmount}{" "}
                  {state.basic_info.receiveTokenName}
                </h1>
                <span>
                  = {state.basic_info.useAmount}{" "}
                  {state.basic_info.purchaseTokenName}
                </span>
                <span className="tip">
                  <FormattedMessage
                    id="剩余{backAmount}{purchaseTokenId}将自动解冻"
                    values={{
                      backAmount: state.basic_info.backAmount || "",
                      purchaseTokenId: state.basic_info.purchaseTokenName || "",
                    }}
                  />
                </span>
                <Button
                  fullWidth
                  href="/finance/"
                  className={classes.finance}
                  color="primary"
                  variant="contained"
                >
                  {lang("去钱包账户查看资产")}
                </Button>
              </div>
            ) : (
              <div className={classes.result_con}>
                <p>{lang("您未参与此次申购")}</p>
              </div>
            )
          ) : (
            <div className={classes.result_con}>
              <p>
                <Button
                  variant="outlined"
                  color="primary"
                  href={
                    "/m/login?redirect=" +
                    encodeURIComponent(window.location.href)
                  }
                >
                  {lang("请先登录")}
                </Button>
              </p>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
      {state.basic_info.activityType == 2 ? (
        <div className={classes.s3}>
          <h2>{lang("申购周期")}</h2>
          <Stepper activeStep={step} alternativeLabel orientation="vertical">
            <Step>
              <StepLabel icon={<i>1</i>}>{lang("项目预热")}</StepLabel>
            </Step>
            <Step>
              <StepLabel icon={<i>2</i>}>
                {lang("开始申购")}
                <span className="steps_span">
                  {moment(state.basic_info.startTime * 1).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </span>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel icon={<i>3</i>}>
                {lang("结束申购")}
                <span className="steps_span">
                  {moment(state.basic_info.endTime * 1).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </span>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel icon={<i>4</i>}>
                {lang("公布结果")}
                <span className="steps_span">
                  {moment(state.basic_info.resultTime * 1).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </span>
              </StepLabel>
            </Step>
          </Stepper>
        </div>
      ) : (
        ""
      )}
      <div className={classes.s4}>
        <Tabs
          value={state.tab}
          onChange={(e, v) => changeTabs(e, v)}
          indicatorColor="primary"
          textColor="inherit"
          className={classes.infoTabs}
        >
          {state.tabs.map((item: any) => {
            return (
              <Tab label={lang(item.name)} key={item.id} value={item.id} />
            );
          })}
        </Tabs>

        {state.basic_info.description ? (
          <h3 id="info0">{lang("项目简介")}</h3>
        ) : (
          ""
        )}
        {state.basic_info.description ? (
          <div
            className={classes.desc}
            dangerouslySetInnerHTML={{
              __html: helper.dataReform(state.basic_info.description),
            }}
          />
        ) : (
          ""
        )}
        <div className={classes.desc}>
          <ul className={classes.info_ul}>
            <li>
              <span>{lang("发售币种")}</span>
              <div>
                <span>{state.basic_info.receiveTokenName}</span>
              </div>
            </li>
            <li>
              <span>{lang("认购时间")}</span>
              <div>
                <span>
                  {Number(state.basic_info.startTime)
                    ? moment(Number(state.basic_info.startTime)).format(
                      "YYYY/MM/DD HH:mm:ss"
                    )
                    : ""}{" "}
                  -{" "}
                  {Number(state.basic_info.endTime)
                    ? moment(Number(state.basic_info.endTime)).format(
                      "YYYY/MM/DD HH:mm:ss"
                    )
                    : ""}
                </span>
              </div>
            </li>
            <li>
              <span>{lang("上币时间")}</span>
              <div>
                <span>
                  {Number(state.basic_info.onlineTime)
                    ? moment(Number(state.basic_info.onlineTime)).format(
                      "YYYY/MM/DD HH:mm:ss"
                    )
                    : ""}
                </span>
              </div>
            </li>
            <li>
              <span>{lang("支付币种")}</span>
              <div>
                <span>{state.basic_info.purchaseTokenName}</span>
              </div>
            </li>
            <li>
              <span>{lang("发售价格")}</span>
              <div>
                {Number(state.basic_info.receiveQuantity) &&
                  Number(state.basic_info.valuationQuantity) ? (
                  <span>
                    {state.basic_info.receiveQuantity}{" "}
                    {state.basic_info.receiveTokenName} ={" "}
                    {state.basic_info.valuationQuantity}{" "}
                    {state.basic_info.purchaseTokenName}
                  </span>
                ) : (
                  <span>{lang("待定")}</span>
                )}
              </div>
            </li>
            <li>
              <span>{lang("分配总量")}</span>
              <div>
                {state.basic_info.circulationStr ? (
                  <span>{state.basic_info.circulationStr}</span>
                ) : (
                  <span>
                    {state.basic_info.totalReceiveCirculation}{" "}
                    {state.basic_info.receiveTokenName}
                  </span>
                )}
              </div>
            </li>
            <li>
              <span>{lang("认购条件")}</span>
              <div className={state.conditions.length ? classes.condition : ""}>
                {state.conditions.length ? (
                  state.conditions.map((condition: any, i: number) => {
                    return (
                      <p key={i}>
                        <em>{i + 1}</em>
                        {condition["value"] ? (
                          <FormattedMessage
                            id={condition["id"]}
                            values={condition["value"]}
                          />
                        ) : (
                          <FormattedMessage id={condition["id"]} />
                        )}
                      </p>
                    );
                  })
                ) : (
                  <span>{lang("无")}</span>
                )}
              </div>
            </li>
          </ul>
        </div>
        {state.basic_info.rule ? <h3 id="info1">{lang("活动规则")}</h3> : ""}
        {state.basic_info.rule ? (
          <div
            className={classes.desc}
            dangerouslySetInnerHTML={{
              __html: helper.dataReform(state.basic_info.rule),
            }}
          />
        ) : (
          ""
        )}
        {state.basic_info.about ? <h3 id="info2">{lang("关于")}</h3> : ""}
        {state.basic_info.about ? (
          <div
            className={classes.desc}
            dangerouslySetInnerHTML={{
              __html: helper.dataReform(state.basic_info.about),
            }}
          />
        ) : (
          ""
        )}
        <div className={classes.tip}>
          {lang(
            "风险提示：数字资产是创新的投资产品，价格波动较大，请您理性判断自己的投资能力，审慎做出投资决策。"
          )}
        </div>
      </div>
      <div className={classes.blank}></div>
      <div className={classes.buy_layer} style={{ position: "fixed" }}>
        <div className={classes.progressStatus}>
          {state.basic_info.progressStatus == 1 ? (
            <p className={classNames(classes.status, classes.preheatStatus)}>
              <Iconfont type="time" size={26} />
              {lang("距离开始还剩")}：
            </p>
          ) : (
            ""
          )}
          {state.basic_info.progressStatus == 2 ? (
            <p className={classNames(classes.status, classes.onsaleStatus)}>
              <Iconfont type="time" size={26} />
              {lang("距离结束还剩")}：
            </p>
          ) : (
            ""
          )}
          {state.basic_info.progressStatus > 2 ? (
            <p className={classes.status}>
              <Iconfont type="time" size={26} />
              {lang("已结束")}
            </p>
          ) : (
            ""
          )}
          {state.basic_info.progressStatus &&
            state.basic_info.progressStatus < 3 ? (
            <p className={classes.timer}>
              {d.map((item, i) => {
                if (i === 0 && item == 0) {
                  return "";
                }
                return [
                  <strong key={"strong" + i}>{item}</strong>,
                  <span key={"unit" + i}>{unit[i]}</span>,
                ];
              })}
            </p>
          ) : (
            ""
          )}
        </div>
        {userid ? (
          state.basic_info.progressStatus == 1 ? (
            <Link
              to={"/activity/xo/buy/" + projectCode}
              className={classes.buy_btn_link}
            >
              <Button
                fullWidth
                color="secondary"
                variant="contained"
                className={classes.buy_btn}
              >
                {lang("预热中")}
              </Button>
            </Link>
          ) : state.basic_info.progressStatus == 2 ? (
            <Link
              to={"/activity/xo/buy/" + projectCode}
              className={classes.buy_btn_link}

            >
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={classes.buy_btn}
              >
                {lang("申购")}
              </Button>
            </Link>
          ) : (
            ""
          )
        ) : (
          <Button
            variant="contained"
            className={classes.buy_btn}
            fullWidth
            color="primary"
            href={
              "/m/login?redirect=" + encodeURIComponent(window.location.href)
            }
          >
            {lang("登录")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default withRoot(withStyles(style)(injectIntl(DetailPage)));
