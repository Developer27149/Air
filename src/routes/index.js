import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Home from "Routes/Home";
import { Bar, Loading } from "Components/index.js";
import Music from "./Music/index.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { generateBlobFromUrl, isEmptyObj } from "Utils/index.js";
import { setWallpaper } from "Store/homeSlice.js";

export default function App() {
  // 从 store 获取壁纸对象，里面保存着 storage 里存储的 blob 对象
  const wallpaper = useSelector((state) => state.home.wallpaper);
  const [blobData, setBlobData] = useState(wallpaper.blob);
  const [initImgUrl, setInitImgUrl] = useState("wallpaper.jpeg");
  const backendBaseUrl = useSelector((state) => state.basic.backendBaseUrl);
  const dispatch = useDispatch();
  // update blob object
  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { url },
        } = await axios.get(`${backendBaseUrl}/daily_wallpaper`);
        const newBlobData = await generateBlobFromUrl(url);
        // 创建新的壁纸地址
        const newBlobUrl = URL.createObjectURL(newBlobData);
        setInitImgUrl(newBlobUrl);
        // 更新最新的壁纸 blob 数据到 store，并且更新 storage 存储
        dispatch(
          setWallpaper({
            ...wallpaper,
            blob: newBlobData,
          })
        );
      } catch (error) {
        if (error.message === "Network Error") {
          //  无网络，则使用默认的壁纸
          // setBlobData(URL.createObjectURL(await generateBlobFromUrl("/wallpaper.jpeg")));
          setInitImgUrl("wallpaper.jpeg");
        }
      }
    };
    // 如果是第一次运行，则获取新的图片 Blob 数据并且保存
    if (isEmptyObj(blobData)) {
      getData();
    }
    return () => {};
  }, []);
  // daily_wallpaper
  return (
    <Router>
      {isEmptyObj(blobData) ? (
        <Loading />
      ) : (
        <Box
          w="100vw"
          height="100vh"
          display="flex"
          flexDir="column"
          backgroundImage={`url(${initImgUrl})`}
          bgSize="100% 100%"
          bgRepeat="no-repeat"
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
