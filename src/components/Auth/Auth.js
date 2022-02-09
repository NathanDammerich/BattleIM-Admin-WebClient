import React, { useState } from "react";
import { Container, Paper, Typography, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import logoWhiteBG from "../../images/logoWhiteBG.png";
import useStyles from "./styles";
import { signin } from "../../actions/admin";

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    dispatch(
      signin(
        {
          email: email,
          password: password,
        },
        history
      )
    );
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.imgContainer}>
        <img src={logoWhiteBG} className={classes.logo} alt="logo" />
      </div>
      <Paper className={classes.paper} elevation={3}>
        <Container>
          <Typography variant="subtitle1" className={classes.heading}>
            Sign in to your account
          </Typography>
          <form className={classes.form} action="/" onSubmit={handleSubmit}>
            <div className={classes.inputContainer}>
              <label htmlFor="email" className={classes.label}>
                Email
              </label>
              <input
                name="email"
                id="email"
                className={classes.input}
                onChange={handleEmailChange}
                autoComplete="off"
              />
            </div>
            <div className={classes.inputContainer}>
              <div className={classes.passwordLabelRow}>
                <label htmlFor="password" className={classes.label}>
                  Password
                </label>
                <p className={classes.label}>Forgot your password?</p>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                color="secondary"
                className={classes.input}
                autoComplete="off"
                onChange={handlePasswordChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.continueButton}
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </form>
          <Button
            variant="text"
            color="primary"
            fullWidth
            className={classes.continueButton}
          >
            Use single sign-on (SSO) instead
          </Button>
        </Container>
      </Paper>
    </Container>
  );
};

export default Auth;
