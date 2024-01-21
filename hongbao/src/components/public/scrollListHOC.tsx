// 下拉加载组件
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";
import { CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroller";

interface State {
  [props: string]: any;
}
interface Props {
  getMore: Function;
  initialLoad?: boolean;
  hasMore: boolean;
  useWindow?: boolean;
  threshold?: number;
  loading: boolean;
  [props: string]: any;
}
function ContentRC(props: Props) {
  const { classes } = props;
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={props.getMore}
      initialLoad={props.initialLoad || false}
      hasMore={props.hasMore}
      useWindow={props.useWindow ? props.useWindow : true}
      threshold={props.threshold || 100}
      loader={
        <div key={Date.now()} className={classes.loading}>
          <CircularProgress size={props.loadingSize || 28} thickness={2.4} />
        </div>
      }
    >
      {props.children}
    </InfiniteScroll>
  );
}

export default withStyles(styles)(ContentRC);
