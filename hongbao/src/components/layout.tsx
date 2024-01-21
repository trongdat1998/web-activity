import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./layout_style";
import withRoot from "../withRoot";
import route_map from "../config/route_map";
import { Props } from "../interfaces/main";
import helper from "../utils/helper";
import { callHandler } from "../utils/app_jsbridge";

function LayoutRC(props: Props) {
  const { classes, ...otherProps } = props;

  // async function updateRates() {
  //   try {
  //     await otherProps.dispatch({
  //       type: "layout/get_rates",
  //       payload: {},
  //     });
  //   } catch (e) {}
  //   await helper.delay(10000);
  //   updateRates();
  // }

  // useEffect(() => {
  //   updateRates();
  // }, []);
  const win: any = window;
  const appLocale: any = win.appLocale;
  const navigator: any = win.navigator;
  const title = appLocale.messages["红包"];
  window.document.title = title;
  // if (/bhexApp/i.test(navigator.userAgent)) {
  //   callHandler({
  //     name: "setNavigationTitle",
  //     data: title,
  //   });
  // } else {
  //   window.document.title = title;
  // }
  return <div className={classes.layout}>{props.children}</div>;
}

export default withRoot(withStyles(styles)(LayoutRC));
