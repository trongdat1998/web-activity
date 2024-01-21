import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import {
  Button,
  Grid,
  Divider,
  TextField,
  CircularProgress,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { injectIntl, } from "react-intl";
import { useSnackbar } from "notistack";
import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";

import style from "./subscribe.style";
import { InitState, Action } from "../app.interface";
import helper from "../lib/helper";
import { callHandler } from "../app_jsbridge";
import { SenseCaptcha, withRoot, Iconfont } from "../components";
import request from "../lib/request";
import lang from "../lib/lang";
import Cookie from "../lib/cookie";
import CONSTS from '../config/const';
import { routeMap } from '../router'


const apis = {
  basic_info: `/api/v1/activity/lock/interest/ieo/basic_info`,
  create_order: `/api/v1/activity/lock/interest/new_order`,
  asset: `/api/asset/get`, // 资产
  regist_geetest: `/api/v1/basic/geev3/register`
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
    needAddress: 0,
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
  geetestData: {},
};

function useAsync(props: any) {
  const {
    asyncFunc, immediate, initialData
  } = props;
  const [loading, setLoading] = useState(immediate)
  const [data, setData] = useState(initialData)
  const [error, setError] = useState(null)
  const mountedRef = useRef(true)

  const execute = useCallback(params => {
    setLoading(true)
    return asyncFunc(params)
      .then((res: any) => {
        if (!mountedRef.current) return null
        setData(res)
        setError(null)
        setLoading(false)
        return res
      })
      .catch((err: any) => {
        if (!mountedRef.current) return null
        setError(err)
        setLoading(false)
        throw err
      })
  }, [asyncFunc,])

  useEffect(() => {
    if (immediate) {
      execute({})
    }
    return () => {
      mountedRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    execute,
    loading,
    data,
    error
  }
}

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
    case "regist_geetest":
      return {
        ...state, ...action.payload
      }
    default:
      throw new Error();
  }
}


/**
 * 初始化数据 查询ieo活动信息和用户资产
 * @param projectCode 
 * @returns 
 */
const getInit = async (projectCode: string) => {
  let tokens: string[] = [];

  let basic_info = _initialState.basic_info;
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

// 定时任务
let timer: any;
const Subscribe: React.FC = (props: any) => {
  const { projectCode } = props.match.params;
  const { enqueueSnackbar } = useSnackbar();
  const recaptcha: any = useRef(null);
  // 当前的状态
  const [state, dispatch] = useReducer(reducer, _initialState);
  let userid = Cookie.read("user_id");

  const { classes } = props;

  const { execute } = useAsync({
    asyncFunc: getInit,
    immediate: false,
    initialData: _initialState
  })

  async function senseSuccess(resp: any) {
    await dispatch({
      type: "ordering",
      payload: {
        ordering: true,
      },
    });
    let values: any = {
      captcha_response: resp.captcha_response,
      captcha_id: resp.captcha_id,
      challenge: resp.challenge
    };
    create_order(values);
  }
  // 极验 失败
  async function senseError(err: any) {
    await dispatch({
      type: "ordering",
      payload: {
        ordering: false,
      },
    });
    enqueueSnackbar(err.msg);
  }
  // 极验，用户关闭
  function senseClose() {
    dispatch({
      type: "ordering",
      payload: {
        ordering: false,
      },
    });
  }

  function formSubmit() {
    dispatch({
      type: "ordering",
      payload: {
        ordering: true,
      },
    });
    recaptcha && recaptcha.current && recaptcha.current.reset();
    recaptcha && recaptcha.current && recaptcha.current.sense();
  }

  function goto() {
    if (/bhexApp/i.test(window.navigator.userAgent)) {
      callHandler({
        name: "assetsAction",
        data: {
          index_type: "deposit",
          token_id: state.basic_info.purchaseTokenId,
        },
      });
    } else {
      window.location.href = `/finance/deposit/${state.basic_info.purchaseTokenId}`;
    }
  }

  /**
   * 计算用户余额
   * @returns 
   */
  const [free, setFree] = useState(0);
  useEffect(() => {
    let free: any = 0;
    state.avaliable.map((item) => {
      if (item.tokenId == state.basic_info.purchaseTokenId) {
        free = Number(item.free);
      }
    });
    setFree(free);
  }, [state.avaliable, state.basic_info.purchaseTokenId]);
  /**
   * 计算用户最大购买份数
   * @returns 
   */
  const getMaxCount = useCallback(() => {
    return (Number(free) || Number(free) === 0) &&
      Number(state.basic_info.minPurchaseLimit)
      ? Math.min(
        Math.floor(
          Number(state.basic_info.userLimit) /
          Number(state.basic_info.minPurchaseLimit)
        ),
        Math.floor(Number(free) / Number(state.basic_info.minPurchaseLimit))
      )
      : 0;
  }, [free, state.basic_info]);

  function onCountChange(e: any) {
    let v = e.target.value;
    v =
      v && Number(`${v}`.replace(/\D/gi, ""))
        ? Math.floor(Number(`${v}`.replace(/\D/gi, "")))
        : "";
    if (v) {
      let part = getMaxCount();
      if (part && v > part) {
        v = part;
      }
    }
    dispatch({
      type: "ordering",
      payload: {
        count: v,
      },
    });
  }
  /**
   * 增加或者减少数量
   * @param type 
   */
  function changeCount(type: string) {
    let count: any = 0;
    if (type == "reduce") {
      count = Math.max(Number(state.count) - 1, 0);
    } else {
      let part = getMaxCount();
      if (part) {
        count = Math.min(Number(state.count) + 1, part);
      } else {
        count = Number(state.count) + 1;
      }
    }
    dispatch({
      type: "ordering",
      payload: {
        count,
      },
    });
  }

  // 初始化加载数据
  useEffect(() => {
    execute(projectCode).then((res: any) => {
      if (res) {
        dispatch({
          type: "reset",
          payload: {
            ...res,
          },
        });
        timer && window.clearInterval(timer);
        timer = window.setInterval(() => {
          dispatch({
            type: "deadline",
            payload: {
              deadline: Number(state.deadline),
              startTimeCountdown: Number(state.startTimeCountdown),
            },
          });
        }, 1000);
      }

    });
    return () => {
      timer && window.clearInterval(timer);
      timer = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute, projectCode]);

  useEffect(() => {
    if (state.basic_info.projectName) {
      window.document.title = state.basic_info.projectName;
    }
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
  }, [state.basic_info, state.deadline, state.startTimeCountdown]);

  const registGeetest = async (req: any) => {
    const res = await request(apis.regist_geetest, {
      body: req.payload,
    });
    if (res.code === "OK" && res.data) {
      dispatch({
        type: "regist_geetest",
        payload: res.data
      })
      req.onSuccess && req.onSuccess(res.data);
    }
  }

  // 下单
  async function create_order(values: any) {
    const basic_info = state.basic_info;
    try {
      const res = await request(apis.create_order, {
        body: {
          projectCode,
          projectId: basic_info.projectId,
          amount: state.count,
          clientOrderId: new Date().getTime(),
          ...values,
        },
      });
      if (res.code === "OK" && res.data && res.data.success) {
        const orderId = res.data.orderId;
        if (state.basic_info.needAddress && state.basic_info.needAddress == 1) {
          setFillAddressDialog({
            show: true,
            orderId,
          });
        } else {
          enqueueSnackbar(lang("下单成功"), { variant: "success", });
        }
        execute(projectCode).then((res: any) => {
          if (res) {
            dispatch({
              type: "reset",
              payload: {
                ...res,
              },
            });
          }
        });
      } else {
        enqueueSnackbar(res.msg, { variant: "error", });
      }
    } catch (e) {
      enqueueSnackbar(lang("下单失败"), { variant: "error", });
    }
    recaptcha && recaptcha.current.reset();
    dispatch({
      type: "ordering",
      payload: {
        ordering: false,
      },
    });
  }


  let d: any[] = ["00", "00", "00", "00"];
  const unit = [lang("天"), lang("时"), lang("分"), lang("秒")];
  /**
   * 倒计时
   */
  const [countDownDay, setCountDownDay] = useState(d);
  useEffect(() => {
    let temp = countDownDay;
    if (state.basic_info.progressStatus == 1) {
      temp = helper.deadlineFormat(state.startTimeCountdown);
    } else if (state.basic_info.progressStatus == 2) {
      temp = helper.deadlineFormat(state.deadline);
    }
    setCountDownDay(temp);
  }, [state.basic_info, state.startTimeCountdown, state.deadline, countDownDay]);


  // 提示填写地址
  const [fillAddressDialog, setFillAddressDialog] = useState({
    show: false,
    orderId: ""
  });

  const maxCount = getMaxCount();

  const cancelHandler = () => {
    setFillAddressDialog({
      show: false,
      orderId: "",
    });
  }

  const gotoHandler = () => {
    props.history.push(`${routeMap.address}/${fillAddressDialog.orderId}`);
    setFillAddressDialog({
      show: false,
      orderId: "",
    });
  }

  return (
    <div className="app">
      <div
        className={classes.progressStatus}
        style={{ padding: "8px 16px 16px 16px" }}
      >
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
            {countDownDay.map((item, i) => {
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
      <Divider classes={{ root: classes.divider }} />
      {state.basic_info.progressStatus < 3 ? (
        <div style={{ padding: 16 }}>
          <Grid
            container
            justify="space-between"
            className={classes.subscribe_p1_1}
          >
            <Grid item>{lang("钱包可用额度")}</Grid>
            <Grid item>
              <a>{free}</a> {state.basic_info.purchaseTokenName}
            </Grid>
          </Grid>
          <Grid
            container
            justify="space-between"
            className={classes.subscribe_p1_1}
          >
            <Grid item>{lang("当前可申购份数")}</Grid>
            <Grid item>
              <a>{maxCount}</a>
              {lang("份")}
            </Grid>
          </Grid>
          <Grid
            container
            justify="space-between"
            className={classes.subscribe_p1_1}
          >
            <Grid item>{lang("申购份数")}</Grid>
            <Grid item>
              {lang("1份")}={state.basic_info.minPurchaseLimit}
              {state.basic_info.purchaseTokenName}
            </Grid>
          </Grid>
          <TextField
            fullWidth
            value={state.count}
            onChange={onCountChange}
            InputProps={{
              endAdornment: (
                <div className={classes.subscribe_p1_endAdor}>
                  <span>{lang("份")}</span>
                  <div className={classes.subscribe_p1_icon}>
                    <span onClick={() => changeCount("reduce")}>
                      <Iconfont type="subtract" size={16} />
                    </span>
                    <span onClick={() => changeCount("add")}>
                      <Iconfont type="add" size={16} />
                    </span>
                  </div>
                </div>
              ),
            }}
            className={classes.subscribe_p1_input}
            variant="outlined"
            placeholder={lang("1份起购，整数倍递增")}
          />
          <Grid
            container
            justify="space-between"
            className={classes.subscribe_p1_1}
          >
            <Grid item />
            <Grid item>
              <a onClick={goto} className={classes.recharge}>
                {lang("充值")}
                <Iconfont type="recharge" size="24" />
              </a>
            </Grid>
          </Grid>
        </div>
      ) : (
        ""
      )}
      <div className={classes.buy_layer} style={{ position: "fixed" }}>
        {userid ? (
          state.basic_info.status == 1 &&
            state.basic_info.progressStatus == 2 &&
            state.count &&
            !state.ordering ? (
            <Button
              color="primary"
              variant="contained"
              className={classNames(classes.buy_btn, classes.buy_btn2)}
              fullWidth
              onClick={formSubmit}
            >
              {lang("确认申购")}
            </Button>
          ) : (
            <Button
              variant="contained"
              className={classNames(classes.buy_btn, classes.buy_btn2)}
              disabled
              fullWidth
            >
              {state.ordering ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                lang("确认申购")
              )}
            </Button>
          )
        ) : (
          <Button
            color="primary"
            variant="contained"
            className={classNames(classes.buy_btn, classes.buy_btn2)}
            fullWidth
            href={
              "/m/login?redirect=" + encodeURIComponent(window.location.href)
            }
          >
            {lang("请先登录")}
          </Button>
        )}
      </div>
      {
        CONSTS.CAPTCHA_TYPE == CONSTS.CAPTCHA_TYPES.SENSE ?
          <SenseCaptcha
            type="2"
            lang={window.localStorage.lang === "zh-cn" ? "zh-cn" : "en"}
            onSuccess={senseSuccess}
            onError={senseError}
            onClose={senseClose}
            dispatch={registGeetest}
            geetestData={_initialState.geetestData}
            ref={recaptcha}
          />
          : ""
      }
      <Dialog open={fillAddressDialog.show}
        maxWidth="xl"
      >
        <div className={classes.dialogStatus}>
          <img src={require(`../assets/success.png`)} alt="" />
        </div>
        <div className={classes.dialogTitle}>
          {
            props.intl.formatMessage({
              id: '购买成功'
            })
          }
        </div>
        <DialogContent className={classes.dialogContent}>
          <p>{props.intl.formatMessage({
            id: '此产品需要填写收货地址'
          })}</p>
        </DialogContent>
        <div className={classes.dialogActionPanel}>
          <Button className={classes.dialogAction} onClick={cancelHandler}>{props.intl.formatMessage({ id: '稍后处理' })}</Button>
          <Button color="primary" className={classes.dialogAction} onClick={gotoHandler}>{props.intl.formatMessage({ id: '去填写' })}</Button>
        </div>
      </Dialog>
    </div >
  );
};

export default withRoot(withStyles(style)(injectIntl(Subscribe)));
