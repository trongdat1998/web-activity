import helper from "../lib/helper";

export default (theme: any) => ({

  buy_btn_link: {
    display: 'block'
  },

  buy_btn: {
    height: 40,
    borderRadius: 2,
    boxShadow: "none",
    marginTop: 16,
    fontSize: 16,
    color: theme.palette.common.white,
    "&.MuiButton-contained": {
      background: theme.palette.grey[50],
    },
    "&.MuiButton-containedPrimary": {
      background: theme.palette.primary.main,
    },
    "&.MuiButton-containedSecondary": {
      background: theme.palette.error.main,
    },
  },

  buy_btn2: {
    marginTop: 0,
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
  connectorActive: {
    "& svg": {
      color: "#3375E0 !important",
    },
    "& $connectorLine": {
      borderColor: "#3375E0",
      color: "#3375E0",
    },
  },
  connectorCompleted: {
    "& svg": {
      color: "#3375E0 !important",
    },
    "& $connectorLine": {
      borderColor: "#3375E0",
    },
  },
  connectorDisabled: {
    "& $connectorLine": {
      borderColor: theme.palette.grey[100],
    },
  },
  connectorLine: {
    transition: theme.transitions.create("border-color"),
  },
  blank: {
    height: 112,
    background: theme.palette.common.white,
  },
  // 列表
  list: {
    width: "100%",
    maxWidth: 850,
    margin: "-8px auto 0",
  },
  list_banner: {
    height: 175,
    backgroundSize: "100% 100%",
    color: theme.palette.common.white,
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    justifyContent: "center",
    "& h2": {
      margin: 0,
      textAlign: "center",
    },
  },
  tabBg: {
    background: theme.palette.grey[30],
  },
  tabs: {
    minHeight: 56,
    marginBottom: 24,
    padding: "0 16px",
    "& .MuiTab-root": {
      ...theme.typography.body1,
      minHeight: 56,
      padding: 0,
      minWidth: "auto",
      margin: "0 24px 0 0",
      color: theme.palette.grey[500],
      opacity: 1,
      fontWeight: 500,
      "&:hover": {
        color: theme.palette.common.text,
      },
      "& .MuiTouchRipple-root": {
        display: "none",
      },
      "&.Mui-selected": {
        color: theme.palette.common.text,
      },
    },
  },
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
  // 详情
  app: {
    maxWidth: 860,
    margin: "0 auto",
    width: "100%",
    background: theme.palette.grey[30],
    overflow: "hidden",
  },
  s1: {
    background: theme.palette.common.white,
    padding: "0 16px",
    margin: "0 0 8px",
    "& img": {
      display: "block",
      width: "100%",
      borderRadius: 4,
      margin: "0 0 8px",
      minHeight: 160,
    },
    "& h2": {
      fontSize: 20,
      lineHeight: "32px",
      fontWeight: 500,
      margin: "8px 0",
    },
    "& hr": {
      margin: "0 -16px",
      background: theme.palette.grey[30],
    },
  },
  s1_p1: {
    padding: "0 0 8px",
    "& .MuiGrid-container": {
      ...theme.typography.body2,
      lineHeight: "24px",
      fontSize: 14,
      fontWeight: 500,
      color: theme.palette.grey[800],
      margin: "0 0 8px",
    },
    "& .MuiGrid-item:last-of-type": {
      color: theme.palette.common.text,
      fontWeight: "bold",
      textAlign: "right",
    },
  },
  primary: {
    color: `${theme.palette.primary.main} !important`,
  },

  s1_p2: {
    ...theme.typography.body2,
    padding: "12px 0",
    lineHeight: "24px",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    "& .MuiGrid-item": {
      margin: "0 0 0 -3px",
      flex: 1,
      "& a": {
        display: "flex",
        alignItems: "center",
        "text-decoration": "none",
        "& span": {
          color: theme.palette.grey[500],
        },
        "& i": {
          color: theme.palette.grey[200],
          marginRight: 5,
        },
        "&:hover": {
          "& span, & i": {
            color: theme.palette.primary.main,
          },
        },
      },
    },
  },
  s2: {
    background: theme.palette.common.white,
    padding: "24px 16px 16px",
    margin: "0 0 8px",
    "& h2": {
      fontSize: 18,
      lineHeight: "24px",
      margin: "0 0 24px",
      fontWeight: 500,
    },
  },
  s2_p1_2: {
    ...theme.typography.body2,
    minHeight: 24,
    margin: "16px 0",
    alignItems: "center",
    fontWeight: 500,
    "& .MuiGrid-item:last-of-type": {
      ...theme.typography.subtitle2,
      fontWeight: "bold",
    },
    "& .MuiGrid-item:first-of-type": {
      color: theme.palette.grey[800],
    },
  },
  result_con: {
    background: `url(${require("../assets/ieo_result_bg.png")}) no-repeat top center`,
    backgroundSize: "100% auto",
    borderRadius: 4,
    padding: 24,
    boxShadow: "none",
    "& p": {
      ...theme.typography.body1,
      minHeight: 152,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.grey[800],
      "& .MuiButton-root": {
        ...theme.typography.subtitle2,
        fontWeight: "bold",
        borderColor: theme.palette.primary.main,
        minWidth: 200,
        height: 40,
      },
    },
    "& strong": {
      ...theme.typography.body1,
      lineHeight: "24px",
      paddingBottom: 14,
      marginBottom: 16,
      position: "relative",
      display: "block",
      "&::after": {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 40,
        height: 2,
        background: theme.palette.primary.main,
        content: '""',
      },
    },
    "& h1": {
      fontWeight: "bold",
      fontSize: 30,
      lineHeight: "40px",
      marginBottom: 8,
    },
    "& >span": {
      fontWeight: 500,
      fontSize: 16,
      minHeight: 24,
      lineHeight: "23px",
      marginBottom: 8,
      display: "flex",
      alignItems: "center",
      "&.tip": {
        fontSize: 12,
        lineHeight: "17px",
        color: theme.palette.secondary.dark,
      },
    },
    "& .MuiButton-root": {
      borderRadius: 2,
    },
  },
  finance: {
    ...theme.typography.body1,
    height: 40,
    fontWeight: "normal",
    marginTop: 16,
  },
  s3: {
    background: theme.palette.common.white,
    padding: "24px 16px",
    margin: "0 0 8px",
    "& h2": {
      fontSize: 18,
      lineHeight: "24px",
      fontWeight: 500,
      margin: 0,
    },
    "& .MuiStepper-root": {
      padding: 0,
      margin: "8px 0 0",
    },
    "& .MuiStep-root": {
      width: "100%",
      margin: "16px 0 0",
    },
    "& .MuiStepLabel-root": {
      display: "flex",
      flexDirection: "row",
    },
    "& .MuiStepLabel-label": {
      flex: 1,
      display: "flex",
      margin: 0,
      color: theme.palette.common.text,
      fontWeight: 500,
      minHeight: 24,
      alignItems: "center",
      "& .steps_span": {
        flex: 1,
        color: theme.palette.grey[800],
        textAlign: "right",
      },
    },
    "& .MuiStepLabel-iconContainer": {
      width: 16,
      height: 16,
      marginRight: 8,
      background: `linear-gradient(180deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
      borderRadius: "100%",
      display: "flex",
      color: theme.palette.primary.contrastText,
      justifyContent: "center",
      alignItems: "center",
      "& i": {
        ...theme.typography.caption,
        fontStyle: "normal",
        flex: 1,
        display: "flex",
        fontWeight: 500,
        justifyContent: "center",
        alignItems: "center",
        lineHeight: "16px",
      },
    },
    "& .MuiStepConnector-alternativeLabel": {
      padding: 0,
      margin: "0 0 0 7.5px",
      left: 0,
      top: -20,
    },
    "& .MuiStepConnector-line": {
      borderLeft: `1px dashed ${theme.palette.primary.main}`,
    },
    "& .Mui-disabled": {
      "& .MuiStepLabel-iconContainer": {
        background: "transparent",
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
      },
      "& .MuiStepConnector-line": {
        borderColor: theme.palette.grey[100],
      },
    },
  },
  s4: {
    padding: "8px 16px",
    background: theme.palette.common.white,
    // margin: "0 0 8px",
    "& h3": {
      ...theme.typography.body1,
      margin: "24px 0 16px",
      color: theme.palette.grey[500],
    },
  },
  infoTabs: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    "& .MuiTab-root": {
      ...theme.typography.subtitle1,
      minHeight: 56,
      padding: 0,
      minWidth: "auto",
      margin: "0 32px 0 0",
      color: theme.palette.grey[500],
      opacity: 1,
      fontWeight: "bold",
      "&:hover": {
        color: theme.palette.common.text,
      },
      "& .MuiTouchRipple-root": {
        display: "none",
      },
      "&.Mui-selected": {
        color: theme.palette.common.text,
      },
    },
  },
  desc: {
    margin: "16px 0 24px",
    "word-break": "break-all",
    lineHeight: 1.5,
    "& p": {
      fontSize: "1rem",
      margin: "5px 0",
      lineHeight: 1.5,
      fontWeight: 500,
      color: theme.palette.grey[800],
    },
    "& img": {
      maxWidth: "100%",
    },
    "& a": {
      color: theme.palette.primary.main,
    },
  },
  info_ul: {
    marginTop: 16,
    padding: 0,
    "& li": {
      ...theme.typography.body2,
      minHeight: 40,
      display: "flex",
      fontWeight: 500,
      flexDirection: "column",
      "& >span, & >div": {
        padding: "8px 16px",
        lineHeight: "24px",
      },
      "& >span": {
        color: theme.palette.grey[500],
        flex: 1,
        display: "flex",
        alignItems: "center",
        background: theme.palette.grey[30],
      },
      "& >div": {
        color: theme.palette.grey[800],
        flex: 3,
        background: theme.palette.common.white,
      },
    },
  },
  condition: {
    padding: "0 !important",
    "& p": {
      padding: "8px 0 8px 40px",
      lineHeight: "24px",
      margin: 0,
      borderBottom: `1px solid ${theme.palette.grey[30]}`,
      position: "relative",
      color: theme.palette.grey[800],
    },
    "& em": {
      ...theme.typography.caption,
      width: 16,
      height: 16,
      border: `1px solid ${theme.palette.grey[800]}`,
      borderRadius: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12,
      lineHeight: "16px",
      fontStyle: "normal",
      position: "absolute",
      left: 16,
      top: 12,
      color: theme.palette.grey[800],
    },
  },
  tip: {
    ...theme.typography.body2,
    background: `${helper.hex_to_rgba(theme.palette.error.main, 0.08)}`,
    padding: 16,
    color: theme.palette.error.main,
    margin: "24px 0",
    fontWeight: 500,
    "& p": {
      padding: 0,
    },
  },

  buy_layer: {
    width: "100%",
    left: 0,
    bottom: 0,
    zIndex: 10,
    background: theme.palette.common.white,
    boxShadow: "0px -6px 8px rgba(0, 0, 0, 0.04)",
    padding: 16,
  },

  progressStatus: {
    display: "flex",
    alignItems: "center",
  },

  status: {
    ...theme.typography.body2,
    display: "flex",
    alignItems: "center",
    color: theme.palette.grey[800],
    fontWeight: 500,
    height: 24,
    lineHeight: "24px",
    flex: 1,
    "& i": {
      marginRight: 4,
    },
  },
  preheatStatus: {
    color: theme.palette.error.main,
  },
  onsaleStatus: {
    color: theme.palette.primary.main,
  },
  timer: {
    height: 24,
    "& strong": {
      fontSize: 18,
      lineHeight: "26px",
      color: theme.palette.common.text,
      margin: "0 4px 0 8px",
    },
    "& span": {
      fontSize: 12,
      lineHeight: "24px",
      color: theme.palette.grey[500],
      fontWeight: 500,
    },
  },
  divider: {
    background: theme.palette.grey[50],
  },
  buyProgress: {
    "& p": {
      ...theme.typography.body2,
      lineHeight: "24px",
      display: "flex",
      fontWeight: 500,
      "& span": {
        flex: 1,
        color: theme.palette.grey[800],
        "&:last-child": {
          textAlign: "right",
          color: theme.palette.primary.main,
        },
      },
    },
  },
  progressRoot: {
    height: 8,
    borderRadius: 8,
    backgroundColor: `${helper.hex_to_rgba(theme.palette.primary.main, 0.15)}`,
    margin: "8px 0 24px",
  },
  progressBar: {
    borderRadius: 4,
    backgroundColor: theme.palette.primary.light,
  },



});
