import React, { useEffect, useReducer } from "react";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Paper,
  CircularProgress,
  Tabs,
  Tab,
} from "@material-ui/core";
import moment from "moment";

import style from "./style";
import { ListInitState, Action, ListItem } from "../app.interface";
import request from "../lib/request";
import lang from "../lib/lang";
import helper from '../lib/helper';
import Cookie from "../lib/cookie";
import withRoot from "../components/withRoot";
import Order from "../components/order";

const apis = {
  project_list: `/api/v1/activity/lock/interest/list`, // 活动列表
  settings: `/s_api/basic/custom_kv`, // ieo配置信息
};

const _initialState: ListInitState = {
  list: [],
  hasMore: true,
  ordering: false,
  title: "",
  background: "",
  tab: 0,
  tabs: [{
    id: 0, name: "全部"
  }],
};

function reducer(state: ListInitState, action: Action) {
  switch (action.type) {
    case "project_list":
      return {
        ...state,
        list: state.list.concat(action.payload.list),
        hasMore:
          action.payload.list && action.payload.list.length >= 20
            ? true
            : false,
        ordering: false,
      };
    case "custom_kv":
      return {
        ...state,
        holdBackground:
          action.payload.customKv["cust.ieoSettings"].level2.holdBackground ||
          "",
        title: action.payload.customKv["cust.ieoSettings"].title || "",
      };
    case "deadline":
      let list: ListItem[] = [];
      if (state.list.length) {
        state.list.map((item: ListItem, i: number) => {
          list.push({ ...item });
          list[i].remainMillSecondForStart = Math.max(
            0,
            Number(list[i].remainMillSecondForStart) - 1000
          );
          list[i].remainMillSecondForEnd = Math.max(
            0,
            Number(list[i].remainMillSecondForEnd) - 1000
          );
          if (list[i].remainMillSecondForStart == 0 && list[i].status == 1) {
            list[i].status = 2;
          }
        });
      }
      return { ...state, list };
    case "ordering":
      return { ...state, ...action.payload };
    case "settings":
      return { ...state, ...action.payload };
    case "reset":
      return { ..._initialState, ...action.payload };
    default:
      throw new Error();
  }
}

async function getInit(id: string) {
  let list = [];
  try {
    const res = await request(apis.project_list, {
      method: "GET",
      body: { fromId: id, limit: 200 },
    });
    if (res.code === "OK" && res.data) {
      list = res.data;
    }
  } catch (e) {
    list = [];
  }
  return {
    list,
  };
}

async function getSettings() {
  let settings = {};
  try {
    const res = await request(apis.settings, {
      method: "GET",
      body: { custom_keys: "cust.ieoSettings" },
    });
    if (res.code === "OK" && res.data) {
      settings = {
        title: res.data["cust.ieoSettings"].title || "",
        background: res.data["cust.ieoSettings"].h5Background || "",
      };
    }
  } catch (e) {
    settings = {
      title: _initialState.title,
      background: _initialState.background,
    };
  }
  return settings;
}


const IndexPage: React.FC = (props: any) => {
  const [state, dispatch] = useReducer(reducer, _initialState);

  const { classes } = props;
  let userid = Cookie.read("user_id");

  async function getData(id: string) {
    if (state.ordering) return;
    await dispatch({
      type: "ordering",
      payload: {
        ordering: true,
      },
    });
    getInit(id).then((res) => {
      dispatch({
        type: "project_list",
        payload: {
          ...res,
        },
      });
    });
    getSettings().then((res) => {
      dispatch({
        type: "settings",
        payload: {
          ...res,
        },
      });
    });
  }
  useEffect(() => {
    if (userid) {
      let { tabs } = state;
      if (tabs.length === 1) {
        tabs.push({ id: 4, name: "我的申购" });
        dispatch({
          type: "settings",
          payload: {
            tabs
          },
        });
      }
    }
  }, [userid]);
  // 初始化数据
  useEffect(() => {
    getData("");
    setInterval(() => {
      dispatch({
        type: "deadline",
        payload: {},
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (state.title) {
      window.document.title = state.title;
    }
  }, [state.title]);

  return (
    <div className={classes.list}>
      <div
        className={classes.list_banner}
        style={{ backgroundImage: `url(${state.background})` }}
      >
        <h2>{state.title}</h2>
      </div>
      <div className={classes.tabBg}>
        <Tabs
          value={state.tab}
          onChange={(e, v) => {
            dispatch({
              type: "settings",
              payload: {
                tab: v,
              },
            });
          }}
          indicatorColor="primary"
          textColor="inherit"
          className={classes.tabs}
          variant="scrollable"
          scrollButtons="off"
        >
          {state.tabs.map((item: any) => {
            return (
              <Tab label={lang(item.name)} key={item.id} value={item.id} />
            );
          })}
        </Tabs>
      </div>
      {state.tab !== 4 ? (
        <React.Fragment>
          <div className={classes.list_data}>
            {(state.list || []).map((item: ListItem) => {
              const remainMillSecondForEnd = helper.deadlineFormat(
                item.remainMillSecondForEnd
              );
              const remainMillSecondForStart = helper.deadlineFormat(
                item.remainMillSecondForStart
              );
              return (
                <Link
                  to={`/activity/xo/detail/${item.projectCode}`}
                  key={item.projectCode}
                  className={classes.list_link}
                >
                  <Paper elevation={1} className={classes.list_item}>
                    <img src={item.url} />
                    <div style={{ padding: "16px" }}>
                      <h2>{item.projectName}</h2>
                      <p>{item.introducation}</p>
                      <ul>
                        <li>
                          <label>{lang("分配总量")}</label>
                          <span>
                            {item.offeringsVolume}
                            {item.offeringsToken}
                          </span>
                        </li>
                        <li>
                          <label>{lang("结束时间")}</label>
                          <span>
                            {Number(item.endTime)
                              ? moment
                                .utc(Number(item.endTime))
                                .local()
                                .format("YYYY-MM-DD HH:mm:ss")
                              : ""}
                          </span>
                        </li>
                      </ul>
                      {item.status == 1 ? (
                        <Button fullWidth color="secondary" variant="contained">
                          {lang("距开始")}:{remainMillSecondForStart[0]}
                          {lang("天")}
                          {remainMillSecondForStart[1]}
                          {lang("时")}
                          {remainMillSecondForStart[2]}
                          {lang("分")}
                          {remainMillSecondForStart[3]}
                          {lang("秒")}
                        </Button>
                      ) : (
                        ""
                      )}
                      {item.status == 2 ? (
                        <Button fullWidth color="primary" variant="contained">
                          {lang("距结束")}:{remainMillSecondForEnd[0]}
                          {lang("天")}
                          {remainMillSecondForEnd[1]}
                          {lang("时")}
                          {remainMillSecondForEnd[2]}
                          {lang("分")}
                          {remainMillSecondForEnd[3]}
                          {lang("秒")}
                        </Button>
                      ) : (
                        ""
                      )}
                      {item.status == 3 ? (
                        <Button fullWidth color="primary" variant="contained">
                          {lang("结果计算中")}
                        </Button>
                      ) : (
                        ""
                      )}
                      {item.status == 4 ? (
                        <Button fullWidth color="primary" variant="contained">
                          {lang("公布结果")}
                        </Button>
                      ) : (
                        ""
                      )}
                      {item.status == 5 ? (
                        <Button fullWidth variant="contained">
                          {lang("已结束")}
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>
                  </Paper>
                </Link>
              );
            })}
          </div>
          <div className={classes.order_more}>
            {state.hasMore ? (
              state.ordering ? (
                <CircularProgress />
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={(e: any) => {
                    getData(
                      state.list.length
                        ? state.list[state.list.length - 1]["id"]
                        : ""
                    );
                  }}
                >
                  {lang("加载更多")}
                </Button>
              )
            ) : (
              <p>{lang("无更多数据")}</p>
            )}
          </div>
        </React.Fragment>
      ) : (
        <Order />
      )}
    </div>
  );
};

export default withRoot(withStyles(style)(IndexPage));
