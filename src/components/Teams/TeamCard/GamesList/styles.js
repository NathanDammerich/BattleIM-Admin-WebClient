import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  win: {
    backgroundColor: "rgba(0, 150, 0, 0.65)",
    borderRadius: "5px",
    padding: "4px 10px",
    margin: "5px 0px",
    "&:hover": {
      cursor: "pointer",
      opacity: ".85",
    },
  },
  loss: {
    backgroundColor: "rgba(200, 0, 0, 0.65)",
    borderRadius: "5px",
    padding: "4px 10px",
    margin: "5px 0px",
    "&:hover": {
      cursor: "pointer",
      opacity: ".85",
    },
  },
  upcoming: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    padding: "4px 10px",
    margin: "5px 0px",
    "&:hover": {
      cursor: "pointer",
      opacity: ".85",
    },
  },
  underline: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
