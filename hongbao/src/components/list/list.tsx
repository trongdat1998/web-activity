import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";
import styles from "./style";
import { Props } from "../../interfaces/main";
import { injectIntl } from "react-intl";
import ScrollList from "../public/scrollListHOC";
import API from "../../config/api";
import moment from "moment";
import route_map from "../../config/route_map";
import helper from "../../utils/helper";

interface Item {
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
  totalCount: number;
  totalAmount: number;
  remainCount: number;
  refundAmount: number;
  status: number;
  receiverType: number;
}
interface IDS {
  [props: string]: number;
}
const defaultdata: Item[] = [];
function ListRC(props: Props) {
  const { classes, intl, dispatch, message, is_login } = props;
  const limit = 10;
  let [tab, setTab] = useState(0);
  let [loading, setLoading] = useState(false);
  let [hasMore, setMore] = useState(true);
  let [data, setData] = useState(defaultdata);
  const tabChange = async (key: number) => {
    if (loading) return;
    await setData([]);
    await setMore(true);
    await setTab(key);
  };
  const getData = async () => {
    if (loading || !hasMore) return;
    await setLoading(true);
    try {
      await dispatch({
        type: "layout/commonReq",
        url: tab == 0 ? API.my_receive : API.my_send,
        payload: {
          from_id: data.length ? data[data.length - 1]["id"] : "",
          limit,
        },
        success: (res: any) => {
          if (res && res.length < limit) {
            setMore(false);
          }
          let ids: IDS = {};
          let d: Item[] = [];
          data.map((item: Item) => {
            ids[item.id] = 1;
            d.push(item);
          });
          res.map((item: Item) => {
            if (!ids[item.id]) {
              d.push(item);
            }
          });
          setData(d);
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
  const goto = (id: string, type: number) => () => {
    window.location.href =
      (tab === 0 ? route_map.info : route_map.my) +
      "?id=" +
      id +
      (tab === 1 && type === 1 ? "&novice=1" : "");
  };

  useEffect(() => {
    if (!is_login) {
      helper.callLogin();
    }
  }, [is_login]);

  useEffect(() => {
    getData();
  }, [tab]);
  return (
    <div>
      <Grid
        container
        justify="space-around"
        className={classes.tabs}
        alignItems="center"
      >
        <Grid item className={tab == 0 ? classes.tab : ""}>
          <div onClick={() => tabChange(0)}>
            {intl.formatMessage({ id: "我收到的" })}
            <span></span>
          </div>
        </Grid>
        <Grid item className={tab == 1 ? classes.tab : ""}>
          <div onClick={() => tabChange(1)}>
            {intl.formatMessage({ id: "我发出的" })}
            <span></span>
          </div>
        </Grid>
      </Grid>
      <div className={classes.list}>
        <ScrollList getMore={getData} loading={loading} hasMore={hasMore}>
          {data.length ? (
            data.map((item: Item) => {
              return (
                <Grid
                  container
                  justify="space-between"
                  className={classes.item}
                  alignItems="center"
                  key={item.id}
                  onClick={goto(
                    tab == 0 ? item.redPacketId : item.id,
                    item.receiverType
                  )}
                >
                  <Grid item xs={8}>
                    <strong>
                      {intl.formatMessage({
                        id: item.receiverType == 1 ? "新手红包" : "口令红包",
                      })}
                    </strong>
                    {tab == 0 ? (
                      <span>
                        {intl.formatMessage({ id: "来自" })}{" "}
                        {item.senderUsername}{" "}
                        {moment
                          .utc(Number(item.created))
                          .local()
                          .format("MM/DD HH:mm")}
                      </span>
                    ) : (
                      <span>
                        {intl.formatMessage(
                          { id: "包{n}个红包" },
                          { n: item.totalCount }
                        )}{" "}
                        {moment
                          .utc(Number(item.created))
                          .local()
                          .format("MM/DD HH:mm")}
                      </span>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{ textAlign: "right", paddingLeft: 5 }}
                  >
                    <strong>
                      {tab == 0 ? item.amount : item.totalAmount}{" "}
                      {item.tokenName}
                    </strong>
                    {tab == 0 ? (
                      <span>{intl.formatMessage({ id: "已领取" })}</span>
                    ) : (
                      ""
                    )}
                    {tab == 1 ? (
                      <span>
                        {intl.formatMessage({
                          id: ["进行中", "已领完", "退款中", "退款"][
                            item.status
                          ],
                        })}
                        {item.status > 1
                          ? `${item.refundAmount} ${item.tokenId}`
                          : ""}
                      </span>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
              );
            })
          ) : loading ? (
            ""
          ) : (
            <img
              className={classes.noData}
              src={require("../../assets/no_data.png")}
            />
          )}
        </ScrollList>
      </div>
    </div>
  );
}

export default withStyles(styles)(injectIntl(ListRC));
