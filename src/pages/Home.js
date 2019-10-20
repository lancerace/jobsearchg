import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import axios from "axios";
import fetchJsonp from "fetch-jsonp";

export default function Home() {
  const [state, setState] = useState({ jobInput: "", cityInput: "" });
  const [countries, setCountries] = useState([]);
  const useStyles = makeStyles({
    root: {
      marginTop: "10vh",
      background: "white",
      boxShadow:
        "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px",
      "& >div, & >div>div": {
        padding: "10px"
      },
      "&>div:nth-child(2)>div:hover": {
        color: "white",
        background: "gray",
        cursor: "pointer"
      }
    }
  });
  const liClick = e => {
    console.log("clicked");
  };
  const citiesOnChange = e => {
    //console.log(e.target.value);

    e.persist();
    setState(prevState => {
      return { ...prevState, cityInput: e.target.value };
    });

    if (state.cityInput.length > 2)
      fetch(
        `http://localhost:8080/api/getCities?${new URLSearchParams(
          `city=${state.cityInput}`
        )}`
      ).then(response => {
        if (!response.ok) console.log(`HTTP error,status=${response.status}`);
        else
          response.json().then(data => {
            //console.log(data);

            if (data.length > 1) setCountries(data);
          });
      });
  };

  const jobOnChange = e => {
    e.persist();
    setState(prevState => {
      return { ...prevState, jobInput: e.target.value };
    });
  };

  const liOnClick = e => {
    e.persist();
    setState(prevState => {
      return { ...prevState, cityInput: e.target.textContent };
    });
    setCountries([]);
    //console.log(countries);
  };

  const searchOnClick = e => {
    //replace(/\s*$/, "").replace(/ /, "+");
    const location = state.cityInput.replace(/\s*$/, "").replace(/ /, "+");
    const description = state.jobInput.replace(/\s*$/, "").replace(/ /, "+");
    const urldest = `https://jobs.github.com/positions.json?${new URLSearchParams(
      `description=${description}&location=${location}`
    )}`;
    fetch(
      "https://jobs.github.com/positions.json?description=python&location=new+york"
    ).then(response => {
      console.log(response);
    });

    /* axios
      .get(
        "https://jobs.github.com/positions.json?description=python&location=new+york"
      )
      .then(response => {
        console.log(response);
      });*/

    //work-around jsonp
    /* fetchJsonp(
      "https://jobs.github.com/positions.json?description=python&location=new+york"
    )
      .then(function(response) {
        console.log(response);
      })
      .then(function(json) {
        console.log("parsed json", json);
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });*/
  };

  const { root } = useStyles();
  return (
    <Grid container justify="center">
      <Grid container className={root} justify="center" item md={6}>
        <Grid container item md={12}>
          <Grid item md={4}>
            <TextField
              label="job role"
              value={state.jobInput}
              onChange={jobOnChange}></TextField>
          </Grid>
          <Grid item md={4}>
            <TextField
              label="Search cities"
              value={state.cityInput}
              onChange={citiesOnChange}></TextField>
          </Grid>
          <Grid item md>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={searchOnClick}>
              Search
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          {countries.map((country, i) => {
            return countries === null ? (
              console.log("empty")
            ) : (
              <Grid key={i} item md={12} onClick={liOnClick}>
                {country}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
