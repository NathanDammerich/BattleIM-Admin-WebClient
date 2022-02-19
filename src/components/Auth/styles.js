import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
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
    paddingTop: theme.spacing(2),
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
    marginTop: theme.spacing(2),
    textTransform: "capitalize",
  },
  logo: {
    width: "220px",
    margin: "0px 0px",
  },
  container: {
    paddingTop: "40px",
    // textAlign: "center",
  },
  imgContainer: {
    textAlign: "center",
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
  primary: {
    color: theme.palette.primary.main,
  },
  googleButton: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));
