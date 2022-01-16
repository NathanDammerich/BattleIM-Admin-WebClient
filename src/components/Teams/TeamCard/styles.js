import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  card: {
    marginTop: "25px",
    maxWidth: "650px",
    marginBottom: "25px",
    transition: "height 5s",
  },
  secondary: {
    color: theme.palette.secondary.main,
    marginBottom: "8px",
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
  img: {
    borderRadius: ".5%",
  },
}));
