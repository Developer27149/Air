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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/wallpapers">
          <Wallpapers />
        </Route>
      </Switch>
    </Router>
  );
}

function Login() {
  return <div>login</div>;
}

function Wallpapers() {
  return <div>Wallpapers</div>;
}
