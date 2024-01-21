import * as React from "react";
import { Router, Route, Switch, Redirect, routerRedux } from "dva/router";
import dynamic from "dva/dynamic";
import route_map from "./config/route_map";
const { ConnectedRouter } = routerRedux;

interface valueConfig {
  history: any;
  app: any;
}

function RouterConfig({ history, app }: valueConfig) {
  // 404
  const NotFountRCArg: any = {
    app,
    component: () => import("./routes/404"),
  };
  const NotFountRC: any = dynamic(NotFountRCArg);
  // index
  const IndexRCArg: any = {
    app,
    component: () => import("./routes/index"),
  };
  const IndexRC: any = dynamic(IndexRCArg);
  // send
  const SendRCArg: any = {
    app,
    component: () => import("./routes/send"),
  };
  const SendRC: any = dynamic(SendRCArg);
  // list
  const ListRCArg: any = {
    app,
    component: () => import("./routes/list"),
  };
  const ListRC: any = dynamic(ListRCArg);
  // info
  const InfoRCArg: any = {
    app,
    component: () => import("./routes/info"),
  };
  const InfoRC: any = dynamic(InfoRCArg);
  // Share
  const ShareRCArg: any = {
    app,
    component: () => import("./routes/share"),
  };
  const ShareRC: any = dynamic(ShareRCArg);

  return (
    <ConnectedRouter history={history}>
      <Switch>
        {/* */}
        <Route exact path={route_map.index} component={IndexRC} />
        {/* 红包列表页 */}
        <Route exact path={route_map.list} component={ListRC} />
        {/* 某个红包详情页 */}
        <Route exact path={route_map.info} component={InfoRC} />
        {/* 我的红包详情页 */}
        <Route exact path={route_map.my} component={InfoRC} />
        {/* 分享页 */}
        <Route exact path={route_map.share} component={ShareRC} />
        {/* 发送红包 */}
        <Route exact path={route_map.send} component={SendRC} />

        {/* 404 */}
        <Route component={IndexRC} />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
