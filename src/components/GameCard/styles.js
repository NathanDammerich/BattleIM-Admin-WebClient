import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  icon: {
    color: theme.palette.secondary.main,
    transform: "scale(1.5)",
    justifyContent: "",
  },
  card: {
    margin: "25px 0",
    maxWidth: "700px",
  },
  marginTop: {
    margin: "12px 0 20px 0px",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  centerThenRight: {
    justifyContent: "flex-end",
  },
  marginBottom: {
    marginBottom: "15px",
  },
  clickable: {
    "&:hover": {
      cursor: "pointer",
      fontWeight: "bold",
    },
  },
  win: {
    "&:hover": {
      cursor: "pointer",
      fontWeight: "bold",
    },
    color: "rgba(0, 150, 0, 1.0)",
  },
  loss: {
    "&:hover": {
      cursor: "pointer",
      fontWeight: "bold",
    },
    color: "rgba(200, 0, 0, 1.0)",
  },
  upcoming: {
    "&:hover": {
      cursor: "pointer",
      fontWeight: "bold",
    },
  },
}));
