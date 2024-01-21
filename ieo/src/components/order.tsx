import React, { useEffect, useReducer } from "react";
import { injectIntl } from 'react-intl'
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import moment from "moment";

import style from "./order.style";
import { routeMap } from '../router'
import { OrderList, Action, Order } from "../app.interface";
import request from "../lib/request";
import withRoot from "./withRoot";

const LIMIT = 100;

const apis = {
  project_list: `/api/v1/activity/lock/interest/project_list`, // 活动列表
  order_list: "/api/v1/activity/lock/interest/query_order",
};

const _initialState: OrderList = {
  list: [],
  hasMore: true,
  ordering: false,
};

function reducer(state: OrderList, action: Action) {
  switch (action.type) {
    case "order_list":
      return {
        ...state,
        list: state.list.concat(action.payload.list),
        hasMore:
          action.payload.list && action.payload.list.length >= LIMIT
            ? true
            : false,
        ordering: false,
      };
    case "ordering":
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
    const res = await request(apis.order_list, {
      method: "POST",
      body: { fromId: id, limit: LIMIT },
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
const useStyles = makeStyles(style);
const OrderComponent: React.FC = (props: any) => {
  const [state, dispatch] = useReducer(reducer, _initialState);
  const { intl, classes } = props;

  async function getData(id: string) {
    if (state.ordering) return;
    await dispatch({
      type: "ordering",
      payload: {
        ordering: true,
      },
    });
    await getInit(id).then((res) => {
      dispatch({
        type: "order_list",
        payload: {
          ...res,
        },
      });
    });
  }
  // 初始化数据
  useEffect(() => {
    window.document.title = intl.formatMessage({ id: "申购订单" });
    getData("");
  }, []);

  return state.list && state.list.length ? (
    <div className={classes.list}>
      <div className={classes.list_data}>
        {(state.list || []).map((item: Order) => {
          return (
            <div key={item.orderId} className={classes.order_item}>
              <ul>
                <li>
                  <strong>{item.projectName}</strong>
                </li>
                <li>
                  <span>{intl.formatMessage({ id: "申购金额" })}</span>
                  <em>
                    {Number(item.orderQuantity) && Number(item.price)
                      ? Number(item.orderQuantity) * Number(item.price)
                      : ""}
                  </em>
                </li>
                <li>
                  <span>{intl.formatMessage({ id: "申购份数" })}</span>
                  <em>{item.orderQuantity}</em>
                </li>
                <li>
                  <span>{intl.formatMessage({ id: "订单号" })}</span>
                  <em>{item.orderId}</em>
                </li>
                <li>
                  <span>{intl.formatMessage({ id: "时间" })}</span>
                  <em>
                    {Number(item.purchaseTime)
                      ? moment(Number(item.purchaseTime)).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )
                      : ""}
                  </em>
                </li>
              </ul>
              {
                item.needAddress && item.needAddress == 1 ?
                  <Link to={`${routeMap.address}/${item.orderId}`}>
                    <Button variant="contained" color="primary"
                      fullWidth
                      className={classes.buy_btn}

                    >{intl.formatMessage({ id: '收货地址' })}</Button>
                  </Link>
                  : ""
              }
            </div>
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
                    ? state.list[state.list.length - 1]["orderId"]
                    : ""
                );
              }}
            >
              {intl.formatMessage({ id: "加载更多" })}
            </Button>
          )
        ) : (
          <p>{intl.formatMessage({ id: "无更多数据" })}</p>
        )}
      </div>
    </div>
  ) : !state.list.length && state.ordering ? (
    <div className={classes.no_data}>
      <CircularProgress />
    </div>
  ) : (
    <div className={classes.no_data}>
      <img src={require("@/assets/noresult.png")} />
      <p>{intl.formatMessage({ id: "暂无数据" })}</p>
    </div>
  );
};

export default withRoot(withStyles(style)(injectIntl(OrderComponent)));
