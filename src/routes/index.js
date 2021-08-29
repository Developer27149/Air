import React, { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bars from "../components/Bars.js";
import { Box } from "@chakra-ui/react";
import Time from "../components/Time.js";
import DateComponent from "../components/DateComponent.js";
import { Suspense } from "react";
import Loading from "Components/Loading.js";
const Home = lazy(() => import("Routes/Home"));

export default function App() {
  return (
        <Suspense fallback={<Loading />}>
    <Home>
      <Router>
          <Box w="100vw" height="100vh" display="flex" flexDir="column">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Time />
              {/* <DateComponent /> */}
            </Box>
            <Box flexGrow="1">
              <Switch>
                <Route path="/about">
                  <Home />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/">
                  <About />
                </Route>
              </Switch>
            </Box>
            <Bars />
          </Box>
      </Router>
    </Home>
        </Suspense>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2 id="user">Users</h2>;
}
