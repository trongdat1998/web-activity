import React from "react";
import { useSnackbar } from "notistack";

function withRoot<P>(Component: React.ComponentType<P>) {
  function WithRoot(props: P) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    const { enqueueSnackbar } = useSnackbar();
    return <Component {...props} message={enqueueSnackbar} />;
  }
  return WithRoot;
}

export default withRoot;
