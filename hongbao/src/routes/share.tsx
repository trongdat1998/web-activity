import React from "react";
import SnackHOC from "./snackHoc";
import { connect } from "dva";
import { routeConfig, objectConfig } from "../interfaces/route";
import LayoutRC from "../components/layout";
import Content from "../components/list/share";

function IndexPage({
  layout,
  loading,
  dispatch,
  location,
  match,
  message,
}: routeConfig) {
  return (
    <LayoutRC
      {...layout}
      loading={loading}
      dispatch={dispatch}
      location={location}
      message={message}
    >
      <Content
        {...layout}
        match={match}
        loading={loading}
        dispatch={dispatch}
        location={location}
        message={message}
      />
    </LayoutRC>
  );
}
function mapStateToProps({ layout, loading }: objectConfig) {
  return { layout, loading };
}

export default SnackHOC(connect(mapStateToProps)(IndexPage));
