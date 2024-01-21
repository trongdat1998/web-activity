import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";
import { Props } from "../../interfaces/main";
import { injectIntl } from "react-intl";
import classnames from "classnames";
import {
  Button,
  TextField,
  Dialog,
  Popover,
  CircularProgress,
} from "@material-ui/core";
import route_map from "../../config/route_map";
import Iconfont from "../../lib/components/iconfont";
import helper from "../../utils/helper";
import API from "../../config/api";
import Sense from "../public/sense_captcha"; // 极验
import CONSTS from '../../config/const'

function Index(props: Props) {
  const { classes, intl, message, is_login } = props;

  const win: any = window;
  const WEB_CONFIG: any = win.WEB_CONFIG;
  const n: number = win.n;
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");
  const [popover, setPopover] = useState(false);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bonusInfo, setBonusInfo] = useState({
    id: "",
    redPacketId: "",
    senderUsername: "",
    themeId: "",
    backgroundUrl: "",
    slogan: "",
    receiverUsername: "",
    tokenId: "",
    tokenName: "",
    amount: "",
    created: "",
  });
  const [bgs, setBg] = useState([]);
  const [getData, setData] = useState(false);

  const recaptcha: any = useRef(null);
  // 极验 成功
  async function senseSuccess(resp: any) {
    setLoading(true);
    let values: any = {
      captcha_response: resp.captcha_response,
      captcha_id: resp.captcha_id,
      challenge: resp.challenge,
    };
    drawBonus(values);
  }
  // 极验 失败
  async function senseError(err: any) {
    setLoading(false);
    err.msg && message(err.msg, { variant: "error" });
  }
  // 极验，用户关闭
  function senseClose() {
    setLoading(false);
  }

  function formSubmit() {
    if (loading) {
      return;
    }
    setLoading(true);
    if (recaptcha && recaptcha.current) {
      recaptcha.current.reset();
      recaptcha.current.sense();
    } else {
      let values: any = {
        captcha_response: '',
        captcha_id: '',
        challenge: '',
      };
      drawBonus(values);
    }
  }

  async function drawBonus(values: any) {
    if (helper.trim(password)) {
      const res = await props.dispatch({
        type: "layout/openBonus",
        payload: {
          password: helper.trim(password),
          ...values,
        },
      });
      try {
        if (res.code == "OK") {
          await setBonusInfo(res.data);
          if (res.data.firstOpen) {
            await setStatus(1);
            setModal(true);
          } else {
            window.location.href = route_map.info + "?id=" + res.data.redPacketId;
          }
        } else if (res.code == "34012") {
          setStatus(2);
          setModal(true);
        } else {
          setToast(res.msg);
          setPopover(true);
          setTimeout(() => {
            setPopover(false);
          }, 5000);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    setLoading(false);
  }

  function change(e: any) {
    setPassword(e.target.value);
  }

  const getRedPacketConfig = async () => {
    props.dispatch({
      type: "layout/commonReq",
      url: API.get_red_packet_config,
      payload: {},
      success: (res: any) => {
        setData(true);
        setBg(res.redPacketIndexThemes);
      },
      fail: (code: string, msg: string) => {
        msg && message(msg, { variant: "error" });
      },
    });
  };

  useEffect(() => {
    getRedPacketConfig();
  }, []);

  useEffect(() => {
    if (!is_login) {
      helper.callLogin();
    }
  }, [is_login]);

  return (
    <div
      className={classes.bg}
      style={{
        backgroundColor:
          bgs && bgs.length && bgs[0] && bgs[0]["backgroundColor"]
            ? bgs[0]["backgroundColor"]
            : "#B53036",
      }}
    >
      <img
        src={
          getData
            ? bgs && bgs.length && bgs[0] && bgs[0]["backgroundUrl"]
              ? bgs[0]["backgroundUrl"]
              : require("../../assets/bonus_bg.png")
            : ""
        }
        style={{ width: "100%", height: "auto" }}
      />
      <p className={classes.slogan}>
        {getData
          ? bgs && bgs.length && bgs[0] && bgs[0]["slogan"]
            ? bgs[0]["slogan"]
            : intl.formatMessage({ id: "发送数字货币给你的好友" })
          : ""}
      </p>
      <div className={classes.content}>
        <a href={route_map.send} className={classes.sendBtn}>
          <span>
            {intl.formatMessage({ id: "发送口令红包" })}
            <Iconfont type="arrowRight" size={`${24 / n}rem`} />
          </span>
          {/* <img src={require("../../assets/Light.png")} /> */}
        </a>
        <a href={`${route_map.send}?novice=1`} className={classes.sendBtn}>
          <span>
            {intl.formatMessage({ id: "新手红包" })}
            <Iconfont type="arrowRight" size={`${24 / n}rem`} />
          </span>
          {/* <img src={require("../../assets/Light.png")} /> */}
        </a>
        <div
          className={classes.line}
          style={{ marginTop: `${30 / n}rem` }}
        ></div>
        <TextField
          className={classes.draw}
          placeholder={intl.formatMessage({ id: "输口令，领红包" })}
          onChange={change}
          InputProps={{
            endAdornment: loading ? (
              <span>
                <CircularProgress size={`${18 / n}rem`} />
              </span>
            ) : (
              <span
                onClick={formSubmit}
                className={helper.trim(password) ? classes.light : ""}
              >
                {intl.formatMessage({ id: "确定" })}
              </span>
            ),
          }}
        />
        <Button
          href={route_map.list}
          className={classes.link}
          variant="outlined"
        >
          {intl.formatMessage({ id: "红包记录" })}
        </Button>
      </div>
      <Dialog open={modal} classes={{ paper: classes.paper }}>
        <Iconfont
          type="levellimited"
          size={`${28 / n}rem`}
          onClick={() => {
            setModal(false);
          }}
          className={classes.closeBtn}
        />

        {status == 1 ? (
          <div className={classes.opened}>
            <p className="info">
              {bonusInfo.senderUsername}
              <br />
              {intl.formatMessage({ id: "发送的红包" })}
            </p>
            <p className="desc">
              {intl.formatMessage({ id: "恭喜发财，万事如意！" })}
            </p>
            <div className={classes.line}></div>
            <h3>
              {bonusInfo.amount}
              {bonusInfo.tokenName}
            </h3>
            <strong>{intl.formatMessage({ id: "已转入你的资产" })}</strong>
            <a href={route_map.info + "?id=" + bonusInfo.redPacketId}>
              {intl.formatMessage({ id: "查看详情" })}
            </a>
          </div>
        ) : status == 2 ? (
          <div className={classnames(classes.opened, classes.looted)}>
            <img src={require("../../assets/looted.png")} />
            <div className={classes.line}></div>
            <h3>{intl.formatMessage({ id: "来晚了" })}</h3>
            <strong>{intl.formatMessage({ id: "红包被人抢完了" })}</strong>
            <a
              onClick={() => {
                setModal(false);
              }}
            >
              {intl.formatMessage({ id: "关闭" })}
            </a>
          </div>
        ) : (
          ""
        )}
      </Dialog>
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
      {
        CONSTS.CAPTCHA_TYPE == CONSTS.CAPTCHA_TYPES.SENSE ?
          <Sense
            type="4"
            lang={window.localStorage.lang === "zh-cn" ? "zh-cn" : "en"}
            onSuccess={senseSuccess}
            onError={senseError}
            onClose={senseClose}
            dispatch={props.dispatch}
            geetestData={props.geetestData}
            ref={recaptcha}
          />
          : ""
      }
    </div>
  );
}

export default withStyles(styles)(injectIntl(Index));
