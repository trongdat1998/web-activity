import { Theme, createStyles } from "@material-ui/core/styles";
const win: any = window;
const n: number = win.n;
export default (theme: Theme) =>
  createStyles({
    tabs: {
      height: `${50 / n}rem`,
      fontSize: `${18 / n}rem`,
      margin: `0 0 ${10 / n}rem`,
    },
    tab: {
      color: theme.palette.primary.main,
      "& div": {
        position: "relative",
      },
      "& span": {
        position: "absolute",
        display: "block",
        width: `${38 / n}rem`,
        height: `${2 / n}rem`,
        background: theme.palette.primary.main,
        bottom: `-${10 / n}rem`,
        left: "50%",
        transform: "translate(-50%,0)",
      },
    },
    list: {
      padding: `0 ${20 / n}rem`,
      margin: `0 0 ${20 / n}rem`,
      minHeight: `${100 / n}rem`,
    },
    novice_list: {
      margin: `0 0 ${60 / n}rem`,
    },
    noresult: {
      textAlign: "center",
      padding: `${70 / n}rem 0 ${50 / n}rem`,
    },
    item: {
      height: `${70 / n}rem`,
      borderBottom: `1px solid ${theme.palette.grey[50]}`,
      "& strong": {
        display: "block",
        fontSize: `${12 / n}rem`,
        lineheight: `${22 / n}rem`,
        margin: `0 0 ${6 / n}rem`,
        color: theme.palette.text.primary,
      },
      "& span": {
        fontSize: `${12 / n}rem`,
        color: theme.palette.grey[500],
        display: "block",
        maxWidth: `${210 / n}rem`,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      },
    },
    status: {
      minHeight: `${40 / n}rem`,
      "& span": {
        color: theme.palette.grey[500],
      },
    },
    check: {
      height: `${60 / n}rem`,
      borderRadius: `${60 / n}rem`,
      background: "#F5F7FA",
      color: theme.palette.primary.main,
      fontSize: `${14 / n}rem`,
      margin: `${25 / n}rem 0`,
      padding: `0 ${40 / n}rem`,
    },
    infotitle: {
      padding: `${30 / n}rem 0 0`,
      minHeight: `${168 / n}rem`,
      textAlign: "center",
      "& strong": {
        fontSize: `${24 / n}rem`,
        fontWeight: 700,
        minHeight: `${28 / n}rem`,
        display: "block",
        color: "#2C3242",
      },
      "& p": {
        fontSize: `${18 / n}rem`,
        minHeight: `${26 / n}rem`,
        color: "#2C3242",
        margin: `${10 / n}rem 0 ${15 / n}rem`,
      },
      "& div": {
        padding: `${15 / n}rem ${20 / n}rem`,
        background: "#F5F7FA",
        lineHeight: `${24 / n}rem`,
        color: theme.palette.primary.main,
        fontSize: `${18 / n}rem`,
      },
    },
    send: {
      "& p": {
        margin: `${20 / n}rem 0 0`,
        textAlign: "center",
        color: "#546080",
        fontSize: `${14 / n}rem`,
      },
    },
    share: {
      padding: `${40 / n}rem ${20 / n}rem ${100 / n}rem`,
      background: "linear-gradient(180.04deg, #410D4C 0.01%, #A21651 99.99%)",
      "& canvas": {},
    },
    sharelayer: {
      position: "fixed",
      background: "#fff",
      width: "100%",
      left: 0,
      bottom: -2,
      padding: `${15 / n}rem ${20 / n}rem`,
    },
    sharebtn: {
      height: `${50 / n}rem`,
      background: "#FEE7CB !important",
      color: "#99000D",
      fontSize: `${20 / n}rem`,
    },
    noData: {
      width: 120,
      height: 130,
      margin: "200px auto 0",
      display: "block",
    },
  });
