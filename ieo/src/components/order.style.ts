import helper from "../lib/helper";

export default (theme: any) => ({
  list_data: {
    width: "100%",
    padding: "0 16px",
  },
  list_link: {
    textDecoration: "none",
  },
  list_item: {
    width: "100%",
    margin: "0 0 24px",
    borderRadius: 2,
    overflow: "hidden",
    border: `1px solid ${theme.palette.grey[100]}`,
    boxShadow: "none !important",
    "& img": {
      width: "100%",
      height: "auto",
      display: "block",
      minHeight: 160,
    },
    "& h2": {
      fontSize: 22,
      lineHeight: "32px",
      fontWeight: 500,
      margin: 0,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    "& p": {
      ...theme.typography.body2,
      margin: "8px 0",
      fontWeight: 500,
      color: theme.palette.grey[500],
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      lineClamp: 2,
      "-webkit-box-orient": "vertical",
    },
    "& ul": {
      margin: "16px 0 24px",
      padding: 0,
      "& li": {
        ...theme.typography.body,
        fontWeight: 500,
        height: 24,
        display: "flex",
        lineHeight: "24px",
        marginBottom: 8,
        justifyContent: "space-between",
        "& label": {
          flex: "37.5% 1 1",
          color: theme.palette.grey[500],
        },
        "& span": {
          flex: "62.5% 1 1",
          textAlign: "right",
        },
      },
    },
    "& button, & a": {
      ...theme.typography.body2,
      fontWeight: 500,
      color: theme.palette.primary.contrastText,
      height: 40,
      boxShadow: "none !important",
      "&.MuiButton-contained": {
        background: theme.palette.grey[200],
        "&:hover": {
          backgroundColor: helper.hex_to_rgba(theme.palette.grey[200], 0.8),
        },
        "&.MuiButton-containedSecondary:hover": {
          backgroundColor: helper.hex_to_rgba(theme.palette.error.main, 0.8),
        },
        "&.MuiButton-containedPrimary:hover": {
          backgroundColor: helper.hex_to_rgba(theme.palette.primary.main, 0.8),
        },
      },
      "&.MuiButton-containedSecondary": {
        background: theme.palette.error.main,
        color: theme.palette.error.contrastText,
      },
      "&.MuiButton-containedPrimary": {
        background: theme.palette.primary.main,
      },
    },
  },
  order_more: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    margin: "40px auto",
    "& p": {
      color: theme.palette.grey[500],
    },
    "& button": {
      minWidth: 120,
      height: 40,
      color: theme.palette.primary.contrastText,
    },
  },
  order_item: {
    padding: "0 0 16px",
    margin: "0 0 16px",
    borderBottom: `1px solid ${theme.palette.grey[50]}`,
    "& li": {
      ...theme.typography.body2,
      display: "flex",
      justifyContent: "space-between",
      lineHeight: "24px",
      fontSize: 14,
      fontWeight: 500,
      alignItems: "center",
    },
    "& strong": {
      ...theme.typography.subtitle2,
      fontWeight: "bold",
      lineHeight: "24px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    "& p, & span": {
      color: theme.palette.grey[500],
    },
    "& p": {
      ...theme.typography.caption,
    },
    "& i": {
      fontStyle: "initial",
      fontWeight: "bold",
      color: theme.palette.primary.main,
    },
    "& em": {
      fontStyle: "initial",
    },
  },
  buy_btn: {
    height: 40,
    "& span": {
      color: '#fff'
    },
  },
  no_data: {
    "text-align": "center",
    minHeight: 100,
    width: "100%",
    "& img": {
      width: 48,
      height: 48,
      margin: "140px auto 16px",
    },
    "& p": {
      fontSize: 14,
      lineHeight: "20px",
      color: theme.palette.grey[500],
      textAlign: "center",
    },
  },
})