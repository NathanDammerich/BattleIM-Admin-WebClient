import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  teamName: {
    marginTop: "15px",
  },
  editScoreWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    padding: "10px",
  },
  submitButton: {
    width: "100%",
    marginTop: "15px",
  },
  cardWrapper: {
    minWidth: "250px",
    minHeight: "200px",
  },
}));
