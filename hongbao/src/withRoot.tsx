import * as React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    common: {
      black: "#242B32",
      white: "#fff",
    },
    type: "light",
    primary: {
      main: "#3375E0",
      light: "#4299FF",
      dark: "#1F5DC1",
      contrastText: "#fff",
    },
    secondary: {
      main: "#D53842",
      light: "#E2524D",
      dark: "#D53842",
      contrastText: "#fff",
    },
    error: {
      light: "#FF695E",
      main: "#ED3756",
      dark: "#99000D",
      contrastText: "#fff",
    },
    success: {
      light: "#6df18e",
      main: "#05AD83",
      dark: "#34a04f",
      contrastText: "#fff",
    },
    grey: {
      "50": "#F4F4F5",
      "100": "#E9EAEB",
      "200": "#D3D5D6",
      "500": "#919598",
      "800": "#50555B",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: "#2C3242",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    background: {
      paper: "#fff",
      default: "#fff",
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(0, 0, 0, 0.14)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(36, 43, 50, 0.2), 0px 0px 2px rgba(36, 43, 50, 0.12), 0px 0px 2px rgba(36, 43, 50, 0.14)",
    "0px 1px 5px rgba(36, 43, 50, 0.2),0px 3px 4px rgba(36, 43, 50, 0.12), 0px 2px 4px rgba(36, 43, 50, 0.14)",
    "0px 1px 8px rgba(36, 43, 50, 0.2),0px 3px 4px rgba(36, 43, 50, 0.12), 0px 3px 3px rgba(36, 43, 50, 0.14)",
    "0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12),0px 2px 4px rgba(0, 0, 0, 0.14)",
    "0px 3px 5px -1px rgba(36, 43, 50,0.2),0px 5px 8px 0px rgba(36, 43, 50,0.12),0px 1px 14px 0px rgba(36, 43, 50, 0.14)",
    "0px 3px 5px rgba(0, 0, 0, 0.2), 0px 1px 18px rgba(0, 0, 0, 0.12),0px 6px 10px rgba(0, 0, 0, 0.14)",
    "0px 4px 5px -2px rgba(36, 43, 50,0.2),0px 7px 10px 1px rgba(36, 43, 50,0.12),0px 2px 16px 1px rgba(36, 43, 50, 0.14)",
    "0px 4px 5px rgba(0, 0, 0, 0.2), 0px 3px 14px rgba(0, 0, 0, 0.12),0px 8px 10px rgba(0, 0, 0, 0.14)",
    "0px 5px 6px rgba(0, 0, 0, 0.2), 0px 3px 16px rgba(0, 0, 0, 0.12),0px 9px 12px rgba(0, 0, 0, 0.14)",
    "0px 6px 6px -3px rgba(36, 43, 50,0.2),0px 10px 14px 1px rgba(36, 43, 50,0.12),0px 4px 18px 3px rgba(36, 43, 50, 0.14)",
    "0px 6px 7px -4px rgba(36, 43, 50,0.2),0px 11px 15px 1px rgba(36, 43, 50,0.12),0px 4px 20px 3px rgba(36, 43, 50, 0.14)",
    "0px 7px 8px rgba(0, 0, 0, 0.2), 0px 5px 22px rgba(0, 0, 0, 0.12),0px 12px 17px rgba(0, 0, 0, 0.14)",
    "0px 7px 8px -4px rgba(36, 43, 50,0.2),0px 13px 19px 2px rgba(36, 43, 50,0.12),0px 5px 24px 4px rgba(36, 43, 50, 0.14)",
    "0px 7px 9px -4px rgba(36, 43, 50,0.2),0px 14px 21px 2px rgba(36, 43, 50,0.12),0px 5px 26px 4px rgba(36, 43, 50, 0.14)",
    "0px 8px 9px -5px rgba(36, 43, 50,0.2),0px 15px 22px 2px rgba(36, 43, 50,0.12),0px 6px 28px 5px rgba(36, 43, 50, 0.14)",
    "0px 8px 10px rgba(0, 0, 0, 0.2), 0px 6px 30px rgba(0, 0, 0, 0.12),0px 16px 24px rgba(0, 0, 0, 0.14)",
    "0px 8px 11px -5px rgba(36, 43, 50,0.2),0px 17px 26px 2px rgba(36, 43, 50,0.12),0px 6px 32px 5px rgba(36, 43, 50, 0.14)",
    "0px 9px 11px -5px rgba(36, 43, 50,0.2),0px 18px 28px 2px rgba(36, 43, 50,0.12),0px 7px 34px 6px rgba(36, 43, 50, 0.14)",
    "0px 9px 12px -6px rgba(36, 43, 50,0.2),0px 19px 29px 2px rgba(36, 43, 50,0.12),0px 7px 36px 6px rgba(36, 43, 50, 0.14)",
    "0px 10px 13px -6px rgba(36, 43, 50,0.2),0px 20px 31px 3px rgba(36, 43, 50,0.12),0px 8px 38px 7px rgba(36, 43, 50, 0.14)",
    "0px 10px 13px -6px rgba(36, 43, 50,0.2),0px 21px 33px 3px rgba(36, 43, 50,0.12),0px 8px 40px 7px rgba(36, 43, 50, 0.14)",
    "0px 10px 14px -6px rgba(36, 43, 50,0.2),0px 22px 35px 3px rgba(36, 43, 50,0.12),0px 8px 42px 7px rgba(36, 43, 50, 0.14)",
    "0px 11px 14px -7px rgba(36, 43, 50,0.2),0px 23px 36px 3px rgba(36, 43, 50,0.12),0px 9px 44px 8px rgba(36, 43, 50, 0.14)",
    "0px 11px 15px rgba(0, 0, 0, 0.2), 0px 9px 46px rgba(0, 0, 0, 0.12),0px 24px 38px rgba(0, 0, 0, 0.14)",
  ],
  typography: {
    fontFamily: '"Noto Sans", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: {
      fontSize: "6.857rem",
      fontWeight: 300,
      letterSpacing: "-.015em",
    },
    h2: {
      fontSize: "4.2857rem",
      fontWeight: 300,
      letterSpacing: "-.005em",
    },
    h3: {
      fontSize: "3.4285rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "2.4285rem",
      fontWeight: 400,
      letterSpacing: ".0025em",
    },
    h5: {
      fontSize: "1.714285rem",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "1.14285rem",
      fontWeight: 500,
      letterSpacing: ".0015em",
    },
    subtitle2: {
      fontSize: "1rem",
      fontWeight: 500,
      letterSpacing: ".001em",
    },
    // heading: {
    //   fontSize: "1.4285rem",
    //   fontWeight: 500,
    // },
    body2: {
      fontWeight: 400,
      fontSize: "1rem",
      letterSpacing: "0.01071em",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1.14285rem",
      letterSpacing: "0.00938em",
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.857rem",
      letterSpacing: "0.004em",
    },
    overline: {
      fontWeight: 400,
      fontSize: "0.857rem",
      letterSpacing: "0.015em",
    },
    button: {
      fontWeight: 500,
      fontSize: "0.875rem",
      textTransform: "uppercase",
    },
    //useNextVariants: true,
  },
  shape: { borderRadius: 4 },
  spacing: 8,
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});

function withRoot<P>(Component: React.ComponentType<P>) {
  function WithRoot(props: P) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
