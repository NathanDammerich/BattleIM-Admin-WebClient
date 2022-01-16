import {
  AppBar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import homePageLogo from "../../images/1x/homePageLogo.png";
import useStyles from "./styles";

const Navbar = ({ setPage, page }) => {
  const classes = useStyles();
  const theme = useTheme();

  const user = useSelector((state) => state.user);

  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  const goToUser = (e) => {
    // const modal = {
    //   id: user._id,
    //   type: "User",
    // };
    // dispatch(addModal(modal));
  };

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={2}>
            {/* <Typography
              variant="h6"
              align={sm ? "left" : "center"}
              justify="center"
            >
              Battle<span className={classes.secondary}>IM</span>
              <ShieldIcon sx={{ fontSize: 17 }} className={classes.white} />
            </Typography> */}
            <img src={homePageLogo} className={classes.logo} alt="logo" />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Container display="flex" align="center" justify="center">
              <Button
                variant="text"
                className={
                  page === 1 ? classes.buttonActive : classes.buttonNotActive
                }
                onClick={() => setPage(1)}
              >
                Games
              </Button>
              <Button
                variant="text"
                className={
                  page === 2 ? classes.buttonActive : classes.buttonNotActive
                }
                onClick={() => setPage(2)}
              >
                Leagues
              </Button>
              <Button
                variant="text"
                className={
                  page === 3 ? classes.buttonActive : classes.buttonNotActive
                }
                onClick={() => setPage(3)}
              >
                Users
              </Button>
            </Container>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography
              variant="subtitle1"
              align={sm ? "right" : "center"}
              className={classes.user}
              onClick={goToUser}
            >
              {user.name}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
