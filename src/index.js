import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import {Terms} from './components/Terms';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/terms">
                  Terminos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <Switch>
          <Route path="/" exact>
            <App />
          </Route>
          <Route path="/terms">
            <Terms />
          </Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
