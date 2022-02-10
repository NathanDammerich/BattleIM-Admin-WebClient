import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  leagueList: {
    margin: "5px 8px",
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  header: {
    padding: "2px 0px",
  },
  card: {
    "&:hover": {
      cursor: "pointer",
      opacity: ".85",
    },
    margin: "25px 0px",
  },
}));
