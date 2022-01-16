import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  card: {
    padding: "20px 20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    margin: "0px 2px",
    fontSize: "1.1rem",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(3),
    maxWidth: "350px",
    width: "100%",
  },
  input: {
    height: "27px",
    border: "1px solid gray",
    borderRadius: "4px",
    padding: "4px 16px",
  },
  label: {
    fontSize: "0.67rem",
    margin: "4px 2px",
    fontWeight: "bold",
    letterSpacing: "0.02rem",
  },
  passwordLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  continueButton: {
    marginTop: "30px",
    textTransform: "capitalize",
  },
}));
