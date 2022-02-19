import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  card: {
    margin: "25px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
  },
  field: {
    margin: "5px",
  },
  timeSlotBox: {
    display:"flex",
    flexDirection:"column",
    padding:"5px",
  },
  timeSlotPaper: {
    marginBottom:"5px",
  }
}));
