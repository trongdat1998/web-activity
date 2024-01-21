import React from "react";
import SnackHOC from "./snackHoc";
import { connect } from "dva";
import { routeConfig, objectConfig } from "../interfaces/route";
import LayoutRC from "../components/layout";
import NotFoundPage from "../components/public/not_found";

function IndexPage({
  layout,
  loading,
  dispatch,
  location,
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
      <NotFoundPage />
    </LayoutRC>
  );
}

function mapStateToProps({ layout, loading }: objectConfig) {
  return { layout, loading };
}

export default SnackHOC(connect(mapStateToProps)(IndexPage));
