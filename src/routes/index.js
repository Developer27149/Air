// import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Init from "./Init";
// import { Box, Icon } from "@chakra-ui/react";
// import { CgUserlane } from "react-icons/cg";
// import { FaRegHandPeace } from "react-icons/fa";
// import Bars from "../components/Bars.js";
// import Time from "../components/Time.js";
// import DateComponent from "../components/DateComponent.js";

// export default function App() {
//   return (
//     <Router>
//       {/* <Switch>
//         <Route path="/">
//           <Default />
//         </Route>
//         <Route path="/init">
//           <Init />
//         </Route>
//       </Switch>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">default</Link>
//           </li>
//           <li>
//             <Link to="/init">init</Link>
//           </li>
//         </ul>
//       </nav> */}
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">init page</Link>
//           </li>
//           <li>
//             <Link to="/default">default page</Link>
//           </li>
//         </ul>
//       </nav>
//       {/* <Time />
//       <DateComponent />
//       <Bars /> */}

//       {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//       <Box bg="purple.300">
//         <Switch>
//           <Route path="/">
//             <Init />
//           </Route>
//           <Route path="/default">
//             <Demo />
//           </Route>
//         </Switch>
//       </Box>
//     </Router>
//   );
// }

// function Demo() {
//   return <Box bgColor="orange.100">demo</Box>;
// }

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
          <DateComponent />
        </Box>
        <Box flexGrow="1">
          okc
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
