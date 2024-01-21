import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress, Button } from "@material-ui/core";
import styles from "./style";
import { Props } from "../../interfaces/main";
import { injectIntl } from "react-intl";
import route_map from "../../config/route_map";
import API from "../../config/api";
import ScrollList from "../public/scrollListHOC";
import moment from "moment";
import math from "../../utils/mathjs";
import querystring from "query-string";
import classnames from "classnames";
import helper from "../../utils/helper";

interface RedPacket {
  id: string;
  userId: string;
  username: string;
  themeId: string;
  backgroundUrl: string;
  slogan: string;
  redPacketType: number;
  password: string;
  tokenId: string;
  tokenName: string;
  totalCount: number;
  amount: string;
  totalAmount: number;
  remainCount: number;
  remainAmount: number;
  status: number;
  created: string;
  expired: string;
}
interface receiveDetails {
  id: string;
  redPacketId: string;
  senderUsername: string;
  themeId: string;
  backgroundUrl: string;
  slogan: string;
  receiverUsername: string;
  tokenId: string;
  tokenName: string;
  amount: string;
  created: string;
}
interface Info {
  redPacket: RedPacket;
  receiveDetails: receiveDetails[];
}
interface IDS {
  [props: string]: number;
}
const defaultInfo: RedPacket = {
  id: "",
  userId: "",
  username: "",
  themeId: "",
  backgroundUrl: "",
  slogan: "",
  redPacketType: 0,
  password: "",
  tokenId: "",
  tokenName: "",
  totalCount: 0,
  amount: "",
  totalAmount: 0,
  remainCount: 0,
  remainAmount: 0,
  status: -1,
  created: "",
  expired: "",
};
const defaultData: receiveDetails[] = [];

function ListRC(props: Props) {
  const {
    classes,
    intl,
    match,
    dispatch,
    message,
    index_config,
    is_login,
  } = props;
  const win: any = window;
  const n: number = win.n;
  let [data, setData] = useState(defaultData);
  let [info, setInfo] = useState(defaultInfo);
  let [loading, setLoading] = useState(false);
  let [hasMore, setMore] = useState(true);

  const pathname: string = window.location.href;
  const params = querystring.parse(window.location.search);

  const limit = 10;
  const getData = async () => {
    const red_packet_id = params.id;
    if (loading || !hasMore || !red_packet_id) return;
    await setLoading(true);
    try {
      await dispatch({
        type: "layout/commonReq",
        url: API.detail,
        payload: {
          red_packet_id,
          from_id: data.length ? data[data.length - 1]["id"] : "",
          limit,
        },
        success: (res: Info) => {
          if (res.receiveDetails) {
            if (res.receiveDetails.length < limit) {
              setMore(false);
            }
            let d: receiveDetails[] = [];
            let ids: IDS = {};
            data.map((item: receiveDetails) => {
              ids[item.id] = 1;
              d.push(item);
            });
            res.receiveDetails.map((item: receiveDetails) => {
              if (!ids[item.id]) {
                d.push(item);
              }
            });
            setData(d);
          }
          if (res.redPacket) {
            setInfo(res.redPacket);
          }
        },
        fail: (code: string, msg: string) => {
          msg && message(msg, { variant: "error" });
        },
      });
    } catch (e) {
      message(e.message, { variant: "error" });
    }
    await setLoading(false);
  };

  useEffect(() => {
    if (!is_login) {
      helper.callLogin();
    }
  }, [is_login]);

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className={classes.infotitle}>
        <strong>{info.username}</strong>
        <p>{info.slogan}</p>
        <div>
          {intl.formatMessage(
            { id: "已领取{n}/{t}个，共{m}/{m2} {token}" },
            {
              n: info.totalCount - info.remainCount,
              t: info.totalCount,
              m: math.evaluate(`${info.totalAmount} - ${info.remainAmount}`),
              m2: info.totalAmount,
              token: info.tokenName,
            }
          )}
        </div>
      </div>
      <div
        className={classnames(
          classes.list,
          params.novice ? classes.novice_list : ""
        )}
      >
        <ScrollList getMore={getData} loading={loading} hasMore={hasMore}>
          <div>
            {data.map((item: receiveDetails) => {
              return (
                <Grid
                  container
                  justify="space-between"
                  className={classes.item}
                  alignItems="center"
                  key={item.id}
                >
                  <Grid item>
                    <strong>{item.receiverUsername}</strong>
                  </Grid>
                  <Grid item style={{ textAlign: "right" }}>
                    <strong>
                      {item.amount} {item.tokenName}
                    </strong>
                    <span>
                      {moment
                        .utc(Number(item.created))
                        .local()
                        .format("MM-DD HH:mm:ss")}
                    </span>
                  </Grid>
                </Grid>
              );
            })}
            {!loading && data.length == 0 ? (
              <p className={classes.noresult}>
                {intl.formatMessage({ id: "暂无领取记录" })}
              </p>
            ) : (
              ""
            )}
          </div>
        </ScrollList>
      </div>
      {/* 某个红包详情 */}
      {pathname.indexOf(route_map.info) > -1 && !params.novice ? (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Button
              disableElevation
              className={classes.check}
              href={route_map.list}
            >
              {intl.formatMessage({ id: "查看我的红包记录" })}
            </Button>
          </Grid>
        </Grid>
      ) : (
        ""
      )}

      {/* 新手红包 */}
      {pathname.indexOf(route_map.info) > -1 && params.novice ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ position: "fixed", bottom: -2, left: 0, right: 0 }}
        >
          <Grid item xs={12}>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              style={{
                fontSize: `${15 / n}rem`,
                height: `${50 / n}rem`,
                borderRadius: 0,
              }}
              href={
                index_config &&
                index_config.shareConfig &&
                index_config.shareConfig.openUrl
                  ? index_config.shareConfig.openUrl
                  : ""
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {intl.formatMessage({ id: "下载APP" })}
            </Button>
          </Grid>
        </Grid>
      ) : (
        ""
      )}

      {/* 我发出的红包，未领完情况 */}
      {pathname.indexOf(route_map.my) > -1 && info.status == 0 ? (
        <Grid
          container
          className={classes.send}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={10}>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              style={{ fontSize: `${18 / n}rem`, height: `${50 / n}rem` }}
              href={
                route_map.share +
                "?id=" +
                info.id +
                (params.novice ? "&novice=1" : "")
              }
            >
              {intl.formatMessage({ id: "继续发送此红包" })}
            </Button>
            <p>
              {intl.formatMessage({ id: "24小时内未被领取，红包金额将退回" })}
            </p>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </div>
  );
}

export default withStyles(styles)(injectIntl(ListRC));
