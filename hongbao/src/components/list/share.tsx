import React, { useState, useEffect, useCallback } from "react";
import moment from 'moment'
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import styles from "./style";
import { Props } from "../../interfaces/main";
import { injectIntl } from "react-intl";
import { callHandler } from "../../utils/app_jsbridge";
import API from "../../config/api";
import querystring from "query-string";
import QRCode from "qrcode";

interface Info {
  domain: string;
}

function ShareRC(props: Props) {
  const { classes, intl, dispatch, message } = props;
  const win: any = window;
  const WEB_CONFIG: any = win.WEB_CONFIG;

  const params: any = querystring.parse(window.location.search);
  const novice: string = params.novice;

  let [pic, setPic] = useState("");
  let [shareconfig, setShare] = useState({
    backgroundUrl: "",
    password: "",
    time: 0,
    name: "",
  });
  let [qCodeUrl, setQrCodeUrl] = useState("");
  let [inviteCode, setInviteCode] = useState("");
  let [hide, setHide] = useState(0);

  const draw = useCallback((
    w: number,
    h: number,
    img: Object,
    qcode: Object,
    password: string,
    time: number
  ) => {
    const cw = 670;
    const ch = 1014;
    let canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx: any = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, cw, ch);

    // 倒计时
    ctx.font = "28px Noto Sans, Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.fillText(
      intl.formatMessage(
        { id: "将于{time}过期" },
        { time: moment.utc(time).local().format("YYYY-MM-DD HH:mm:ss") }
      ),
      cw / 2,
      novice ? ch - 56 : ch - 40
    );
    // 二维码
    let qw = 220;
    if (novice) {
      qw = 300;
      ctx.drawImage(qcode, (cw - qw) / 2, ch - qw - 67 * 2, qw, qw);
    } else {
      ctx.drawImage(qcode, (cw - qw) / 2, ch - qw - 56 * 2, qw, qw);
    }

    // password
    if (!novice) {
      ctx.font = "bold 76px Roboto, Noto Sans, Helvetica, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.fillText(password, cw / 2, ch - 220 - 140);
    }

    setPic(canvas.toDataURL());
  }, [intl, novice]);

  const shareFn = () => {
    if (pic) {
      callHandler({
        name: "getShareImg",
        data: {
          imgUrl: pic
            .replace("data:image/octet-stream;base64,", "")
            .replace("data:image/png;base64,", ""),
        },
      });
    }
  };

  const init = () => {
    if (!params.id) return;
    const red_packet_id = params.id;
    dispatch({
      type: "layout/commonReq",
      url: API.detail,
      payload: {
        red_packet_id,
        limit: 10,
      },
      success: (res: any) => {
        const data = res.redPacket;
        setShare({
          backgroundUrl: data.backgroundUrl,
          password: data.password,
          time: Number(data.expired),
          name: data.username,
        });
      },
      fail: (code: string, msg: string) => {
        msg && message(msg, { variant: "error" });
      },
    });
    dispatch({
      type: "layout/commonReq",
      url: API.invite_share_info,
      payload: {},
      success: (res: any) => {
        setInviteCode(res.inviteCode);
        setHide(res.hide || 0);
      },
      fail: (code: string, msg: string) => {
        msg && message(msg, { variant: "error" });
      },
    });
    if (!novice) {
      dispatch({
        type: "layout/commonReq",
        url: API.index_config,
        payload: {},
        success: (res: any) => {
          const data = res.shareConfig;
          if (data && data.openUrl) {
            QRCode.toDataURL(data.openUrl, { margin: 1.5 }, (err, url) => {
              setQrCodeUrl(url.replace("data:image/png;base64,", ""));
            });
          }
        },
        fail: (code: string, msg: string) => {
          msg && message(msg, { variant: "error" });
        },
      });
    }
  };

  useEffect(() => {
    const load = () => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      let c = 0;
      img.onload = () => {
        c++;
        if (c >= 2) {
          draw(
            img.width,
            img.height,
            img,
            img2,
            shareconfig.password,
            shareconfig.time
          );
        }
      };
      img.src = shareconfig.backgroundUrl;

      const img2 = new Image();
      img2.crossOrigin = "Anonymous";
      img2.onload = () => {
        c++;
        if (c >= 2) {
          draw(
            img.width,
            img.height,
            img,
            img2,
            shareconfig.password,
            shareconfig.time
          );
        }
      };
      img2.src = "data:image/png;base64," + qCodeUrl;
    };
    load();
  }, [qCodeUrl, shareconfig.backgroundUrl, shareconfig.password, shareconfig.time]);


  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const bakDomain: Info = WEB_CONFIG.bakDomain || { domain: "" };
    let domain: string = bakDomain.domain || win.location.origin;
    domain = domain + (domain[domain.length - 1] === "/" ? "" : "/");
    if (novice && inviteCode && shareconfig.name) {
      // 备用域名链接
      let openUrl =
        domain +
        "m/bonus_register?invite_code=" +
        inviteCode +
        "&from=" +
        shareconfig.name +
        "&password=" +
        shareconfig.password +
        (hide ? "&hide=" + hide : "");

      QRCode.toDataURL(openUrl, { margin: 1.5 }, (err, url) => {
        setQrCodeUrl(url.replace("data:image/png;base64,", ""));
      });
    }
  }, [novice, inviteCode, shareconfig.name, shareconfig.password, params.id, hide]);

  return (
    <div className={classes.share}>
      <img src={pic} style={{ width: "100%" }} alt="" />
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.sharelayer}
      >
        <Grid item xs={12}>
          {window.localStorage.platform !== "bhexApp" ? (
            <Button
              className={classes.sharebtn}
              fullWidth
              download="invite_poster.png"
              href={pic ? pic.replace("image/png", "image/octet-stream") : ""}
            >
              {intl.formatMessage({ id: novice ? "分享红包" : "分享口令" })}
            </Button>
          ) : (
            <Button className={classes.sharebtn} fullWidth onClick={shareFn}>
              {intl.formatMessage({ id: novice ? "分享红包" : "分享口令" })}
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(injectIntl(ShareRC));
