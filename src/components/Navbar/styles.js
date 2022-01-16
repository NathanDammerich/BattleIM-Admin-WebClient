import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  button: {
    margin: "0 10px",
    color: "white",
  },
  buttonActive: {
    margin: "0 10px",
    color: "white",
  },
  buttonNotActive: {
    margin: "0 10px",
    color: theme.palette.gray.main,
    "&:hover": {
      color: "white",
      transition: "150ms",
    },
  },
  appBar: {
    top: "0",
    zIndex: "1",
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
  white: {
    color: "white",
    fontSize: "50",
  },
  logo: {
    width: "110px",
    margin: "0px 0px",
  },
  user: {
    color: theme.palette.gray.main,
    "&:hover": {
      color: "white",
      transition: "150ms",
      cursor: "pointer",
    },
  },
}));
