import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Default from "./Default";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Default />
        </Route>
      </Switch>
    </Router>
  );
}
