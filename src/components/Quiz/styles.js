import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  card: {
    padding: "20px 30px",
    maxWidth: "500px",
  },
  question: {},
  passed: {
    color: "green",
  },
  failed: {
    color: "red",
  },
  lessSpacing: {
    padding: "0px 0px",
  },
  spaceBetween: {
    margin: "20px 0px",
  },
  bold: {
    fontWeight: "bold",
  },
}));
