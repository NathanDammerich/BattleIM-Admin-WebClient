import React from "react";
import { Container, ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getAdmin } from "./actions/admin";
import Modal from "./components/Modal/Modal";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2b2d42",
        light: "rgba(43, 45, 66, 0.3)",
      },
      secondary: {
        main: "#d90429",
      },
      background: {
        main: "#edf2f4",
      },
      gray: {
        main: "#8d99ae",
      },
    },
  });

  const dispatch = useDispatch();
  dispatch(getAdmin("61d7b285969da7670fc7e962"));

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth="lg">
          <Switch>
            <Route path="/" exact component={Auth} />
            <Route path="/home" exact component={Home} />
          </Switch>
          <Modal />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
