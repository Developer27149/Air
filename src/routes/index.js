import React, { lazy, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Time from "../components/Time.js";
import DateComponent from "../components/DateAndMessage.js";
import Home from "Routes/Home";
import { Bar } from "Components/index.js";

export default function App() {
  return (
    <Router>
      <Box w="100vw" height="100vh" display="flex" flexDir="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Time />
          <DateComponent />
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
        <Bar />
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
