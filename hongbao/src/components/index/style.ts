import { Theme, createStyles } from "@material-ui/core/styles";
const win: any = window;
const n: number = win.n;
export default (theme: Theme) =>
  createStyles({
    bg: {
      background: "#B53036",
      width: "100%",
      minHeight: "calc(100vh)",
      color: "#2C3242",
      overflow: "auto",
      textAlign: "center",
      position: "relative",
    },
    slogan: {
      position: "absolute",
      left: 0,
      right: 0,
      top: "6.62%",
      fontSize: `${17 / n}rem`,
    },
    content: {
      position: "absolute",
      left: 0,
      right: 0,
      top: "34.5%",
      fontSize: `${17 / n}rem`,
    },
    sendBtn: {
      display: "flex",
      width: `${285 / n}rem`,
      height: `${65 / n}rem`,
      color: "#99000D",
      fontSize: `${19 / n}rem`,
      fontWeight: "bold",
      background: `url(${require("../../assets/button.png")}) no-repeat center`,
      backgroundSize: "100% 100%",
      margin: `0 auto ${15 / n}rem`,
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      // animationName: "$Bob",
      // animationDuration: "1s",
      // animationDelay: "0s",
      // animationTimingFunction: "ease-in-out",
      // animationIterationCount: "infinite",
      // animationFillMode: "forwards",
      // animationDirection: "alternate",
      "& span": {
        display: "flex",
        alignItems: "center",
        position: "relative",
        "& i": {
          position: "absolute",
          right: `-${28 / n}rem`,
          top: 1,
          fontWeight: "bold",
        },
      },
      "& img": {
        position: "absolute",
        width: "100%",
      },
    },
    "@keyframes Bob": {
      "0%": {
        transform: "scale(0.98)",
      },
      "50%": {
        transform: "scale(1)",
      },
      "100%": {
        transform: "scale(0.98)",
      },
    },
    line: {
      background: `url(${require("../../assets/line.png")}) no-repeat center`,
      backgroundSize: "100% 100%",
      width: `${133 / n}rem`,
      height: `${8 / n}rem`,
      margin: "0 auto",
    },
    draw: {
      background: theme.palette.common.white,
      width: `${285 / n}rem`,
      height: `${50 / n}rem`,
      borderRadius: `${6 / n}rem`,
      margin: `${25 / n}rem auto 0`,
      display: "block",
      "& .MuiInput-root": {
        width: "100%",
        height: "100%",
        padding: `${12 / n}rem ${8 / n}rem`,
        "&:before, &:after": {
          display: "none",
        },
        "& input": {
          padding: `0 ${8 / n}rem 0 ${22 / n}rem`,
          flex: 1,
          "&::placeholder": {
            color: "#D8DCE5",
            opacity: 1,
          },
        },
        "& span": {
          minWidth: `${60 / n}rem`,
          textAlign: "center",
          color: "#99A3BF",
          borderLeft: "1px solid #ADB9D9",
          fontSize: `${17 / n}rem`,
          padding: `0 ${5 / n}rem`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& .MuiCircularProgress-colorPrimary": {
            color: "#99A3BF",
          },
        },
      },
    },
    light: {
      color: `${theme.palette.secondary.light} !important`,
    },
    link: {
      margin: `${30 / n}rem auto`,
      minWidth: `${103 / n}rem`,
      height: `${30 / n}rem`,
      border: `1px solid ${theme.palette.common.white}`,
      color: theme.palette.common.white,
      borderRadius: `${15 / n}rem`,
      fontSize: `${12 / n}rem`,
      display: "inline-block",
      lineHeight: `${20 / n}rem`,
      padding: `${5 / n}rem ${15 / n}rem`,
    },
    paper: {
      height: `${417 / n}rem`,
      width: `${310 / n}rem`,
      boxShadow: "none",
      background: "transparent",
      position: "relative",
      color: "#2C3242",
    },
    closeBtn: {
      position: "absolute",
      left: `calc(50% - ${14 / n}rem)`,
      bottom: 0,
      color: theme.palette.common.white,
    },
    unopen: {
      background: `url(${require("../../assets/unopen.png")}) no-repeat center`,
      backgroundSize: "100% 100%",
      width: `${310 / n}rem`,
      height: `${270 / n}rem`,
      position: "relative",
      top: `${99 / n}rem`,
      "& p": {
        width: "100%",
        height: "100%",
        textAlign: "center",
        lineHeight: `${278 / n}rem`,
        fontSize: `${20 / n}rem`,
        color: "#C67100",
        fontWeight: "bold",
      },
    },
    opened: {
      background: `url(${require("../../assets/opened.png")}) no-repeat center`,
      backgroundSize: "100% 100%",
      // width: `${310 / n}rem`,
      width: "100%",
      height: `${358 / n}rem`,
      position: "relative",
      top: `${9 / n}rem`,
      padding: `${30 / n}rem 0 ${10 / n}rem`,
      textAlign: "center",
      "& p": {
        fontSize: `${15 / n}rem`,
        lineHeight: `${22 / n}rem`,
      },
      "& .info": {
        fontWeight: "bold",
      },
      "& .desc": {
        margin: `${20 / n}rem 0 ${15 / n}rem`,
      },
      "& h3": {
        margin: `${9 / n}rem 0 ${5 / n}rem`,
        fontSize: `${20 / n}rem`,
        lineHeight: `${29 / n}rem`,
        fontWeight: "bold",
      },
      "& strong": {
        fontSize: `${14 / n}rem`,
        lineHeight: `${20 / n}rem`,
        fontWeight: "normal",
        display: "block",
      },
      "& a": {
        margin: `${80 / n}rem 0 0`,
        minWidth: `${103 / n}rem`,
        height: `${30 / n}rem`,
        lineHeight: `${30 / n}rem`,
        border: `1px solid ${theme.palette.common.white}`,
        color: theme.palette.common.white,
        borderRadius: `${15 / n}rem`,
        fontSize: `${12 / n}rem`,
        display: "inline-block",
      },
    },
    looted: {
      "& img": {
        height: `${83 / n}rem`,
        margin: `0 0 ${20 / n}rem`,
      },
    },
    popover: {
      background: "rgba(0,0,0,0.7)",
      padding: `${12 / n}rem ${16 / n}rem`,
      color: theme.palette.common.white,
      fontSize: `${14 / n}rem`,
    },

    // send
    sendBg: {
      background: "#F5F7FA",
      color: "#2C3242",
      minHeight: "calc(100vh)",
    },
    listRoot: {
      padding: `${12 / n}rem ${15 / n}rem`,
      background: theme.palette.common.white,
      "& .MuiListItemText-root": {
        fontSize: `${17 / n}rem`,
        fontWeight: 500,
      },
      "& .MuiListItemIcon-root": {
        fontSize: `${14 / n}rem`,
        lineHeight: `${20 / n}rem`,
        color: "#2C3242",
        "& i": {
          margin: `0 0 0 ${8 / n}rem`,
        },
      },
    },
    form: {
      "& h1": {
        textAlign: "center",
        fontSize: `${30 / n}rem`,
        lineHeight: `${35 / n}rem`,
        margin: `${20 / n}rem 0 0`,
      },
      "& strong": {
        textAlign: "center",
        fontSize: `${12 / n}rem`,
        lineHeight: `${17 / n}rem`,
        fontWeight: "normal",
        margin: `${4 / n}rem 0 0`,
        display: "block",
      },
      "& h2": {
        padding: `${11 / n}rem 0 ${2 / n}rem`,
        fontSize: `${17 / n}rem`,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        "& em": {
          background: "#DAAB75",
          minWidth: `${20 / n}rem`,
          height: `${20 / n}rem`,
          color: theme.palette.common.white,
          fontStyle: "normal",
          display: "inline-block",
          borderRadius: `${4 / n}rem`,
          fontSize: `${14 / n}rem`,
          lineHeight: `${20 / n}rem`,
          textAlign: "center",
          marginLeft: `${10 / n}rem`,
          padding: `0 ${3 / n}rem`,
        },
      },
    },
    bonusType: {
      padding: `${10 / n}rem ${15 / n}rem`,
      fontSize: `${14 / n}rem`,
      lineHeight: `${20 / n}rem`,
      "& a": {
        color: theme.palette.primary.main,
        padding: `0 ${10 / n}rem`,
      },
    },
    sec: {
      background: theme.palette.common.white,
      margin: `${10 / n}rem 0`,
      padding: `0 ${15 / n}rem`,
    },
    amount: {
      borderBottom: `1px solid #F5F7FA`,
      "& .MuiTextField-root": {
        width: "100%",
      },
      "& .MuiInput-root": {
        height: `${70 / n}rem`,
        "&:before, &:after": {
          display: "none",
        },
      },
      "& input": {
        flex: 1,
        margin: `0 ${4 / n}rem`,
        fontSize: `${19 / n}rem`,
        fontWeight: "bold",
        "&::placeholder": {
          color: "#D8DCE5",
          opacity: 1,
        },
      },
      "& p": {
        fontSize: `${14 / n}rem`,
        "& span": {
          marginLeft: `${10 / n}rem`,
          "&:last-of-type": {
            color: theme.palette.primary.main,
          },
        },
      },
    },
    avai: {
      height: `${50 / n}rem`,
      fontSize: `${13 / n}rem`,
      lineHeight: `${20 / n}rem`,
      padding: `${15 / n}rem 0`,
      color: "#99A3BF",
      "&.err": {
        color: theme.palette.secondary.light,
      },
    },
    num: {
      "& .MuiTextField-root": {
        width: "100%",
      },
      "& .MuiInput-root": {
        height: `${60 / n}rem`,
        "&:before, &:after": {
          display: "none",
        },
      },
      "& input": {
        flex: 1,
        textAlign: "right",
        margin: `0 ${4 / n}rem`,
        fontSize: `${14 / n}rem`,
        padding: 0,
        height: `${21 / n}rem`,
        "&::placeholder": {
          color: "#D8DCE5",
          opacity: 1,
        },
      },
      "& label": {
        fontSize: `${18 / n}rem`,
      },
      "& span": {
        fontSize: `${14 / n}rem`,
        color: "#384254",
      },
    },
    submitBtn: {
      padding: `0 ${30 / n}rem`,
      margin: `${30 / n}rem 0 0`,
      "& button": {
        height: `${50 / n}rem`,
        fontSize: `${17 / n}rem`,
      },
    },
    tip: {
      margin: `${90 / n}rem auto 0`,
      padding: `0 ${30 / n}rem ${20 / n}rem`,
      fontSize: `${12 / n}rem`,
      lineHeight: `${25 / n}rem`,
      fontWeight: 500,
      color: "#99A3BF",
      textAlign: "center",
    },
    drawer_modal: {
      width: "90%",
      "& >div": {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      },
    },
    drawer: {
      flex: 1,
      overflowY: "auto",
      "& li": {
        height: `${50 / n}rem`,
        lineHeight: `${50 / n}rem`,
        borderBottom: `1px solid #F5F7FA`,
        padding: `0 ${15 / n}rem`,
        fontSize: `${14 / n}rem`,
        display: "flex",
        "& label": {
          flex: 1,
        },
        "& span": {
          flex: 1,
          textAlign: "right",
        },
      },
    },
    search_area: {
      padding: `${15 / n}rem`,
      display: "flex",
      alignItems: "center",
      "& .MuiFormControl-root": {
        flex: 1,
        margin: `0 ${10 / n}rem 0 ${8 / n}rem`,
      },
      "& .MuiInput-root": {
        width: "100%",
        height: `${36 / n}rem`,
        "&:before, &:after": {
          display: "none",
        },
        "& input": {
          fontSize: `${18 / n}rem`,
          height: `${25 / n}rem`,
          margin: `0 ${10 / n}rem`,
          "&::placeholder": {
            color: "#99A3BF",
          },
        },
        "& i": {
          color: "#636D88",
        },
      },
    },
    password: {
      padding: `${30 / n}rem`,
      "& h2": {
        color: theme.palette.common.black,
        fontSize: `${18 / n}rem`,
      },
      "& .MuiTextField-root": {
        width: "100%",
        margin: `${20 / n}rem 0 ${30 / n}rem`,
        "& input": {
          padding: `${10 / n}rem ${14 / n}rem`,
          fontSize: `${14 / n}rem`,
          height: `${24 / n}rem`,
        },
      },
      "& button": {
        height: `${50 / n}rem`,
        fontSize: `${17 / n}rem`,
        margin: `0 0 ${20 / n}rem`,
        "& .MuiCircularProgress-colorPrimary": {
          color: "#99A3BF",
        },
      },
    },
    mark: {
      background: theme.palette.secondary.main,
      textAlign: "center",
      color: theme.palette.common.white,
      fontSize: `${13 / n}rem`,
      lineHeight: `${19 / n}rem`,
      padding: `${10 / n}rem`,
    },
  });
