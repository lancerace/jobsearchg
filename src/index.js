/**
 * @datecreated 20/12/2018
 * @author LancerAce
 * E.g import { export1 , export2 } from "module-name";
 * Note that <AppContainer> should only wrap a single React component. Mount code inside module.hot.accept() function.
 * documentation: https://github.com/gaearon/react-hot-loader
 * If we want to handle the dynamic request,use BrowserRouter. Otherwise
 * HashRouter to serve static request
 **/
import ReactDOM from "react-dom";
import React from "react"; //sets the name Component to the default export of the 'react' package
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const render = () => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById("reactApps")
  );
};

render();
/*if (module.hot) {
  module.hot.accept("./App", () => {
    render();
  });
}*/
