import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  card: {
    margin: "25px 0",
    maxWidth: "500px",
  },
  container: {
    padding: "10px 25px",
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
  header: {
    marginBottom: "0px",
    paddingBottom: "0px",
    cursor: "pointer",
  },
  content: {
    marginTop: "7px",
    paddingBottom: "0px",
  },
  name: {
    marginBottom: "10px",
  },
  clickable: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
}));
