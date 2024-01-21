import React from "react";
import SnackHOC from "./snackHoc";
import { connect } from "dva";
import { routeConfig, objectConfig } from "../interfaces/route";
import LayoutRC from "../components/layout";
import Content from "../components/index/send";

function SendPage({
  layout,
  index,
  loading,
  dispatch,
  location,
  message,
}: routeConfig) {
  return (
    <LayoutRC
      {...layout}
      {...index}
      loading={loading}
      dispatch={dispatch}
      location={location}
      message={message}
    >
      <Content
        {...layout}
        {...index}
        loading={loading}
        dispatch={dispatch}
        location={location}
        message={message}
      />
    </LayoutRC>
  );
}
function mapStateToProps({ layout, index, loading }: objectConfig) {
  return { layout, index, loading };
}

export default SnackHOC(connect(mapStateToProps)(SendPage));
