import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";
import { Props, TokensList } from "../../interfaces/main";
import classes from "*.module.css";
import { injectIntl } from "react-intl";
import classnames from "classnames";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Popover,
  CircularProgress,
} from "@material-ui/core";
import Iconfont from "../../lib/components/iconfont";
import vali from "../../utils/vali";
import helper from "../../utils/helper";
import math from "../../utils/mathjs";
import md5 from "md5";
import route_map from "../../config/route_map";
import querystring from "query-string";
import API from "../../config/api";
import { callHandler } from "../../utils/app_jsbridge";

function Index(props: Props) {
  const { classes, intl, rates, message, is_login } = props;
  const win: any = window;
  const WEB_CONFIG: any = win.WEB_CONFIG;
  const n: number = win.n;
  const params: any = querystring.parse(window.location.search);
  const novice: string = params.novice;
  const ua = window.navigator.userAgent;
  const uaType: string = /iphone|ipad|ipod/i.test(ua)
    ? "ios"
    : /android/i.test(ua)
    ? "android"
    : "pc";
  const [type, setType] = useState(0);
  const [anchor, setAnchor] = useState(false);
  const [search, setSearch] = useState("");
  const [verify, setVerify] = useState(false);
  const [token, setToken] = useState({
    id: "",
    name: "",
  });
  const [tokens, setTokens] = useState([]);
  const [balance, setBalance] = useState([]);
  const [avai, setAvai] = useState(0);
  const [count, setCount] = useState("");
  const [amount, setAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [cRates, setCRate] = useState(["", ""]);
  const [popover, setPopover] = useState(false);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState({
    id: "",
    backgroundUrl: "",
    slogan: "",
  });

  function showToast(msg: string) {
    setToast(msg);
    setPopover(true);
    setTimeout(() => {
      setPopover(false);
    }, 3000);
  }

  function handleChange(e: any) {
    const name = e.target.name;
    const tokenArr = tokens.filter((list: any) => list.tokenId == token.id);
    const currentToken: TokensList = tokenArr[0];
    let v: string = helper.trim(e.target.value);
    if (name == "search") {
      setSearch(v);
    } else if (name == "password") {
      setPassword(v);
    } else if (name == "count") {
      v = v.replace(/[^0-9]/, "");
      const maxCount = parseInt(currentToken.maxCount);
      if (currentToken && maxCount > 0 && parseInt(v) > maxCount) {
        showToast(
          intl.formatMessage(
            {
              id: "最多发{number}个红包",
            },
            { number: maxCount }
          )
        );
        setCount(maxCount.toString());
      } else {
        setCount(v);
      }
    } else {
      v = v
        .replace(/[^0-9\.]/, "")
        .replace(/^0{1,}/, "0")
        .replace(/^(0)([1-9])/, ($1, $2) => {
          return $2;
        })
        .replace(/^\./, "0.");
      let d = v.split(".");
      if (v && !vali.isFloat(v)) {
        return;
      } else {
        let precision = currentToken.minAmount.split(".");
        let p = precision && precision[1] ? precision[1].length : 0;
        if (d[1]) {
          v = d[0] + "." + d[1].slice(0, p);
        }
        if (name == "amount") {
          if (
            currentToken &&
            parseFloat(v) > parseFloat(currentToken.maxAmount) &&
            parseFloat(currentToken.maxAmount) > 0
          ) {
            showToast(
              intl.formatMessage(
                {
                  id: "单个红包最多发{number}{token}",
                },
                {
                  number: currentToken.maxAmount,
                  token: token.name,
                }
              )
            );
            setAmount(currentToken.maxAmount);
          } else {
            setAmount(v);
          }
        }
        if (name == "totalAmount") {
          const avaiAmount = Math.min(
            (currentToken && parseFloat(currentToken.maxTotalAmount)) || 0,
            avai
          );
          if (avaiAmount > 0 && parseFloat(v) > avaiAmount) {
            showToast(
              intl.formatMessage(
                {
                  id: "总金额最多发{number}{token}",
                },
                {
                  number: avaiAmount,
                  token: token.name,
                }
              )
            );
            setTotalAmount(avaiAmount.toString());
          } else {
            setTotalAmount(v);
          }
        }
      }
    }
  }
  function handleBlur(e: any) {
    const { name } = e.target;
    const tokenArr = tokens.filter((list: any) => list.tokenId == token.id);
    const currentToken: TokensList = tokenArr[0];
    if (name === "amount") {
      if (
        currentToken &&
        parseFloat(amount) < parseFloat(currentToken.minAmount)
      ) {
        showToast(
          intl.formatMessage(
            {
              id: "单个红包最少发{number}{token}",
            },
            {
              number: currentToken.minAmount,
              token: token.name,
            }
          )
        );
        setAmount(currentToken.minAmount);
      }
    } else if (
      name === "totalAmount" ||
      (name === "count" && type == 1 && !popover)
    ) {
      // 随机红包总额不得小于最小金额*红包个数
      const t =
        math
          .chain(parseFloat(currentToken.minAmount) || 0)
          .multiply(count || 0)
          .format({ notation: "fixed" })
          .done() || 0;
      const c = getPrecision(t);
      if (parseFloat(c) > parseFloat(totalAmount)) {
        showToast(
          intl.formatMessage({
            id: "请输入正确的红包总额",
          })
        );
      }
    }
  }

  async function getBalance() {
    const res = await props.dispatch({
      type: "layout/balance",
      payload: {},
    });
    if (res.code == "OK") {
      setBalance(res.data);
    }
  }

  async function getRedPacketConfig() {
    props.dispatch({
      type: "layout/commonReq",
      url: API.get_red_packet_config,
      payload: {},
      success: (res: any) => {
        setTheme(
          novice
            ? res["sendInviteRedPacketThemes"] &&
              res["sendInviteRedPacketThemes"].length
              ? res["sendInviteRedPacketThemes"][0]
              : {}
            : res["sendPasswordRedPacketThemes"] &&
              res["sendPasswordRedPacketThemes"].length
            ? res["sendPasswordRedPacketThemes"][0]
            : {}
        );
        setTokens(res.tokens);
        setToken({
          id: res.tokens[0] ? res.tokens[0]["tokenId"] : "",
          name: res.tokens[0] ? res.tokens[0]["tokenName"] : "",
        });
      },
      fail: (code: string, msg: string) => {
        msg && message(msg, { variant: "error" });
      },
    });
  }

  function getPrecision(n: any) {
    n = n || 0;
    let arr = amount.split(".");
    let l = arr[1] ? arr[1].length : 0;
    let c = Math.max(l, 2);
    // return n.toFixed(c);
    return helper.digits(n, c);
  }

  function setTotal() {
    const tokenArr: any = tokens.filter(
      (list: any) => list.tokenId == token.id
    );
    const currentToken: TokensList = tokenArr[0];
    let precision = currentToken.minAmount.split(".");
    let p = precision && precision[1] ? precision[1].length : 0;
    const v: number = Math.min(
      (currentToken && parseFloat(currentToken.maxTotalAmount)) || 0,
      avai
    );
    setTotalAmount(helper.digits(v.toString(), p));
  }

  function selectToken(id: string, name: string) {
    setToken({ id, name });
    setAnchor(false);
    setCount("");
    setAmount("");
    setTotalAmount("");
  }

  async function send() {
    if (loading) {
      return;
    }
    await setLoading(true);
    const res = await props.dispatch({
      type: "layout/sendBonus",
      payload: {
        red_packet_type: type,
        receiver_type: novice ? 1 : 0,
        token_id: token.id,
        total_count: count,
        amount: amount,
        total_amount: totalAmount,
        trade_password: md5(password),
        theme_id: theme.id,
      },
    });
    if (res.code == "OK") {
      let str = "?id=" + res.data.id + (novice ? "&novice=1" : "");
      window.location.href = `${route_map.share}${str}`;
    } else {
      res.msg && message(res.msg, { variant: "error" });

      // setVerify(false);
      // setPassword("");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!is_login) {
      helper.callLogin();
    }
  }, [is_login]);

  useEffect(() => {
    const tokenArr = tokens.filter((list: any) => list.tokenId == token.id);
    const currentToken: TokensList = tokenArr[0];
    const avaiAmount = Math.min(
      (currentToken && parseFloat(currentToken.maxTotalAmount)) || 0,
      avai
    );
    if (type == 0) {
      const t =
        math
          .chain(parseFloat(amount) || 0)
          .multiply(count || 0)
          .format({ notation: "fixed" })
          .done() || 0;
      setSendAmount(getPrecision(t));
      if (avaiAmount > 0 && t > avaiAmount) {
        showToast(
          intl.formatMessage(
            {
              id: "总金额最多发{number}{token}",
            },
            {
              number: avaiAmount,
              token: token.name,
            }
          )
        );
      }
      setDisabled(
        !(
          parseFloat(amount) &&
          parseInt(count) &&
          token.id &&
          parseFloat(amount) >= parseFloat(currentToken.minAmount) &&
          (currentToken.maxAmount == "0" ||
            (currentToken.maxAmount !== "0" &&
              parseFloat(amount) <= parseFloat(currentToken.maxAmount))) &&
          parseInt(count) <= parseInt(currentToken.maxCount) &&
          t <= avaiAmount
        )
      );
    } else {
      setSendAmount(totalAmount);
      const t =
        math
          .chain(parseFloat(currentToken.minAmount) || 0)
          .multiply(count || 0)
          .format({ notation: "fixed" })
          .done() || 0;
      const c = getPrecision(t);
      setDisabled(
        !(
          parseFloat(totalAmount) &&
          parseInt(count) &&
          token.id &&
          parseFloat(totalAmount) <= avaiAmount &&
          parseInt(count) <= parseInt(currentToken.maxCount) &&
          parseFloat(c) <= parseFloat(totalAmount)
        )
      );
    }
  }, [type, amount, totalAmount, count, token, tokens, avai]);

  useEffect(() => {
    const cRate = helper.currencyValue(
      rates,
      parseFloat(sendAmount) || 0,
      token.id
    );
    setCRate(cRate);
  }, [rates, sendAmount, token]);

  function getRates() {
    props.dispatch({
      type: "layout/get_rates",
      payload: {},
    });
  }
  useEffect(() => {
    props.dispatch({
      type: "layout/commonReq",
      url: API.get_available_asset,
      payload: { token_id: token.id },
      success: (res: any) => {
        setAvai(helper.digits(res ? res.realAvailable || "0" : "0", 8));
      },
      fail: (code: string, msg: string) => {
        msg && message(msg, { variant: "error" });
      },
    });
  }, [token]);

  useEffect(() => {
    if (window.localStorage.platform === "bhexApp" && uaType == "android") {
      callHandler({
        name: "refreshControl",
        data: {
          disableRefresh: anchor,
        },
      });
    }
  }, [anchor]);

  useEffect(() => {
    getBalance();
    getRedPacketConfig();
    getRates();
  }, []);

  return [
    <div
      className={classes.password}
      style={{ display: verify ? "block" : "none" }}
      key="password"
    >
      <h2>{intl.formatMessage({ id: "资金密码" })}</h2>
      <TextField
        variant="outlined"
        placeholder={intl.formatMessage({ id: "输入资金密码" })}
        name="password"
        autoComplete="off"
        value={password}
        type="password"
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="secondary"
        disabled={!password || loading}
        fullWidth
        onClick={send}
      >
        {loading ? (
          <CircularProgress size={`${24 / n}rem`} />
        ) : (
          intl.formatMessage({ id: "确定" })
        )}
      </Button>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => {
          setVerify(false);
        }}
      >
        {intl.formatMessage({ id: "返回" })}
      </Button>
    </div>,
    <div
      className={classes.sendBg}
      key="form"
      style={{ display: verify ? "none" : "block" }}
    >
      {novice ? (
        <div className={classes.mark}>
          {intl.formatMessage({
            id: "仅限新注册用户领取红包，领取成功建立邀请关系",
          })}
        </div>
      ) : (
        ""
      )}
      <List component="nav" style={{ padding: "10px 0" }}>
        <ListItem classes={{ root: classes.listRoot }}>
          <ListItemText primary={intl.formatMessage({ id: "币种" })} />
          <ListItemIcon
            onClick={() => {
              setAnchor(true);
            }}
          >
            <span>{token.name}</span>
            <Iconfont type="nextPage" size={`${20 / n}rem`} />
          </ListItemIcon>
        </ListItem>
      </List>
      <div className={classes.form}>
        {type == 0 ? (
          <p className={classes.bonusType}>
            {intl.formatMessage({ id: "每人领到的金额固定，" })}
            <a
              onClick={() => {
                setType(1);
              }}
            >
              {intl.formatMessage({ id: "改为随机金额" })}
            </a>
          </p>
        ) : (
          <p className={classes.bonusType}>
            {intl.formatMessage({ id: "每人领到的金额随机，" })}
            <a
              onClick={() => {
                setType(0);
              }}
            >
              {intl.formatMessage({ id: "改为固定金额" })}
            </a>
          </p>
        )}
        {type == 0 ? (
          <div className={classes.sec}>
            <h2>{intl.formatMessage({ id: "单个金额" })}</h2>
            <div className={classes.amount}>
              <TextField
                name="amount"
                autoComplete="off"
                value={amount}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={intl.formatMessage({ id: "填写金额" })}
              />
            </div>
            <p
              className={classnames(
                classes.avai,
                (token.id && !avai) ||
                  parseFloat(avai.toString()) <
                    parseFloat(sendAmount.toString())
                  ? "err"
                  : ""
              )}
            >
              {intl.formatMessage({ id: "可用" })} {avai} {token.name}
            </p>
          </div>
        ) : (
          <div className={classes.sec}>
            <h2>
              {intl.formatMessage({ id: "总金额" })}
              <em>{intl.formatMessage({ id: "拼" })}</em>
            </h2>
            <div className={classes.amount}>
              <TextField
                placeholder={intl.formatMessage({ id: "填写金额" })}
                name="totalAmount"
                autoComplete="off"
                value={totalAmount}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  endAdornment: (
                    <p>
                      <span>{token.name}</span>
                      <span onClick={setTotal}>
                        {intl.formatMessage({ id: "全部" })}
                      </span>
                    </p>
                  ),
                }}
              />
            </div>
            <p
              className={classnames(
                classes.avai,
                (token.id && !avai) ||
                  parseFloat(avai.toString()) <
                    parseFloat(sendAmount.toString())
                  ? "err"
                  : ""
              )}
            >
              {intl.formatMessage({ id: "可用" })} {avai} {token.name}
            </p>
          </div>
        )}
        <div className={classnames(classes.num, classes.sec)}>
          <TextField
            placeholder={intl.formatMessage({ id: "填写数量" })}
            name="count"
            autoComplete="off"
            value={count}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              startAdornment: (
                <label>{intl.formatMessage({ id: "红包个数" })}</label>
              ),
              endAdornment: <span>{intl.formatMessage({ id: "个" })}</span>,
            }}
          />
        </div>
        <h1>
          {sendAmount || "0.00"} {token.name}
        </h1>
        <strong>
          ≈{cRates[0]}
          {cRates[1]}
        </strong>
        <div className={classes.submitBtn}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            disabled={disabled}
            onClick={() => {
              setVerify(true);
            }}
          >
            {intl.formatMessage({ id: "塞币进红包" })}
          </Button>
        </div>
      </div>
      <p className={classes.tip}>
        {intl.formatMessage({ id: "24小时内未被领取，红包金额将退回" })}
      </p>
      <Drawer
        anchor="left"
        open={anchor}
        onClose={() => {
          setAnchor(false);
        }}
        classes={{
          paper: classes.drawer_modal,
        }}
      >
        <div>
          <div className={classes.search_area}>
            <TextField
              placeholder={intl.formatMessage({ id: "搜索币种" })}
              name="search"
              autoComplete="off"
              value={search}
              onChange={handleChange}
              InputProps={{
                classes: { root: classes.inputHeight },
                startAdornment: (
                  <Iconfont type="search" size={`${26 / n}rem`} />
                ),
              }}
            />
            <Iconfont
              type="close"
              size={`${24 / n}rem`}
              onClick={() => {
                setAnchor(false);
              }}
            />
          </div>
          <ul className={classes.drawer}>
            {tokens.map((item: any, i: number) => {
              const regrep = new RegExp(search, "i");
              if (regrep.test(item["tokenName"])) {
                let b = balance.filter(
                  (list: any) => list.tokenId == item.tokenId
                );
                return (
                  <li
                    key={i}
                    onClick={() => {
                      selectToken(item.tokenId, item.tokenName);
                    }}
                  >
                    <label>{item.tokenName}</label>
                    <span>
                      {helper.digits(b.length ? b[0]["free"] || "0" : "0", 8)}
                    </span>
                  </li>
                );
              }
              return "";
            })}
          </ul>
        </div>
      </Drawer>
      <Popover
        open={popover}
        classes={{ paper: classes.popover }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        {toast}
      </Popover>
    </div>,
  ];
}

export default withStyles(styles)(injectIntl(Index));
