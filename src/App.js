import { hot } from "react-hot-loader/root";
import React, { Component } from "react"; // { Component} = destructuring syntax
import { Route, Switch } from "react-router-dom";
import Main from "./Main";
import "./assets/styles.css";
//consist of main and login page
class App extends Component {
  constructor(props) {
    super(props);
    this.state = "";
  }

  render() {
    return (
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    );
  }
}
App.propTypes = {};
App.defaultProps = {};
export default hot(App);
