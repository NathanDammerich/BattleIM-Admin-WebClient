import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  card: {
    margin: "25px 0",
    width: '80vw',
  },
  container: {
    padding: "10px 25px",
  },
  divisionHeading: {
    padding: "8px 0px 0px 0px",
  },
}));
