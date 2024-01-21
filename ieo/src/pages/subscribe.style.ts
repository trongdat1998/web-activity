export default (theme: any) => ({

  buy_layer: {
    width: "100%",
    left: 0,
    bottom: 0,
    zIndex: 10,
    background: theme.palette.common.white,
    boxShadow: "0px -6px 8px rgba(0, 0, 0, 0.04)",
    padding: 16,
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


  recharge: {
    fontWeight: 500,
    lineHeight: "24px",
    display: "flex",
    alignItems: "center",
  },


  subscribe_p1_1: {
    ...theme.typography.body2,
    height: 24,
    margin: "8px 0",
    alignItems: "center",
    fontWeight: 500,
    "& a": {
      color: theme.palette.primary.main,
      "&:hover": {
        color: theme.palette.primary.light,
      },
    },
    "& .MuiGrid-item:first-of-type": {
      color: theme.palette.grey[800],
    },
  },
  subscribe_p1_input: {
    margin: "8px 0",
    "& .MuiOutlinedInput-root": {
      padding: 0,
      borderRadius: 0,
      display: "flex",
      "& input": {
        flex: 1,
        padding: "10.5px 16px",
        fontSize: 18,
        color: theme.palette.common.text,
        fontWeight: 500,
        "&::placeholder": {
          color: theme.palette.grey[200],
          opacity: 1,
          fontWeight: 500,
        },
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.main,
          borderWidth: 1,
        },
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.grey[200],
    },
  },
  subscribe_p1_endAdor: {
    display: "flex",
    height: 40,
    "& >span": {
      ...theme.typography.body2,
      paddingRight: 16,
      color: theme.palette.grey[500],
      borderRight: `1px solid ${theme.palette.grey[200]}`,
      height: "100%",
      lineHeight: "40px",
    },
  },
  subscribe_p1_icon: {
    padding: "8px 0",
    display: "flex",
    "& span": {
      width: 44,
      height: 24,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRight: `1px solid ${theme.palette.grey[100]}`,
      cursor: "pointer",
      "&:last-of-type": {
        border: 0,
      },
    },
    "& svg": {
      width: 20,
      height: 20,
    },
  },

  dialogTitle: {
    fontWeight: 700,
    fontSize: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    color: '#242B32',
  },

  dialogStatus: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  dialogContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 260,
    marginTop: 20,
    marginBottom: 8,
    padding: 12,
    marginLeft: 24,
    marginRight: 24,
    background: 'rgba(36, 43, 50, 0.05)',
    borderRadius: 4,
    color: '#919598'
  },

  dialogActionPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dialogAction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 12,
    fontSize: 16,
    minWidth: 144,
    height: 40,
    marginRight: 8,
  },



})