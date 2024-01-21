import { Theme, createStyles } from "@material-ui/core/styles";

export default (theme: Theme) =>
  createStyles({
    loading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px 0",
      height: 70,
    },
  });
