import Home from "./Home";
import Init from "./Init";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bars from "../components/Bars.js";
import { Box } from "@chakra-ui/react";
import Time from "../components/Time.js";
import DateComponent from "../components/DateComponent.js";

export default function App() {
  return (
    <Router>
      <Box bg="teal.100" w="100vw" height="100vh" display="flex" flexDir="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Time />
          {/* <DateComponent /> */}
        </Box>
        <Box flexGrow="1">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Box>
        <Bars />
      </Box>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2 id="user">Users</h2>;
}
