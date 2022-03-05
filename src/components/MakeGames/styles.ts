import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  tableWrapper: {
    height: "50vh",
    width: "100%",
  },
  card: {
    margin: "25px 0",
    width: "80vw",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "right",
    margin: "15px",
  },
  titleWrapper: {
    display: "flex",
    justifyContent: "left",
    margin: "15px",
  },
  paperWrapper: {
    margin: "5px",
    padding: "5px",
    display: "flex",
    flexWrap: "wrap",
  },
  infoBox: {
    margin: "5px",
    padding: "5px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));
