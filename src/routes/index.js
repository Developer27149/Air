import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Home from "Routes/Home";
import { Bar, Loading } from "Components/index.js";
import Music from "./Music/index.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { generateBlobFromUrl } from "Utils/index.js";

export default function App() {
  const [blobUrl, setBlobUrl] = useState(null);
  const backendBaseUrl = useSelector((state) => state.basic.backendBaseUrl);
  // update blob object
  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { url },
        } = await axios.get(`${backendBaseUrl}/daily_wallpaper`);
        console.log(url);
        setBlobUrl(URL.createObjectURL(await generateBlobFromUrl(url)));
      } catch (error) {
        console.log(error);
        setBlobUrl(URL.createObjectURL(await generateBlobFromUrl("/wallpaper.jpeg")));
      }
    };
    setTimeout(getData, 3000);
    return () => {};
  }, []);
  // daily_wallpaper
  return (
    <Router>
      {blobUrl === null ? (
        <Loading />
      ) : (
        <Box
          w="100vw"
          height="100vh"
          display="flex"
          flexDir="column"
          backgroundImage={`url(${blobUrl})`}
        >
          {/* 顶栏：下载按钮 + 搜索框 + 天气时间框 */}
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
              <Route path="/music">
                <Music />
              </Route>
            </Switch>
          </Box>
          {/* <img src={blobUrl} /> */}
          <Bar />
        </Box>
      )}
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2 id="user">Users</h2>;
}

function Demo() {
  return <h2>Demo</h2>;
}
