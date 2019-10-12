import React from "react";
import Grid from "@material-ui/core/Grid";
import { Route } from "react-router-dom";
//import PropTypes from "prop-types";
import Home from "./pages/Home";
import NavBar from "../component/NavBar/NavBar";

export default function Main() {
  const styles = "bgWhite";

  return (
    <Grid container>
      <NavBar styles={styles}>
        <Grid item md container>
          <Grid item lg={3} md={3}>
            <NavBar.Item to="/Home">Home</NavBar.Item>
          </Grid>
        </Grid>

        <Grid item md={6} lg={6} />

        <Grid md item container>
          <Grid item md={3} lg={6}>
            <NavBar.Item to="/Login">Login</NavBar.Item>
          </Grid>
          <Grid item md={3} lg={6}>
            <NavBar.Item>Sign Up</NavBar.Item>
          </Grid>
        </Grid>
      </NavBar>
      <Route path="/Home" component={Home} />
    </Grid>
  );
}
