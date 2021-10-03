import React, { useState, useEffect } from "react";
import { MemoryRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Home from "Routes/Home";
import { Bar, Loading } from "Components/index.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBase64FromUrl, isNewDay } from "Utils/index.js";
import { setWallpaper } from "Store/homeSlice.js";
import Wallpapers from "./Wallpapers/index.js";
import Login from "./Login/index.js";
import { setUpdateTimestamp } from "Store/basicSlice.js";

export default function App() {
  // 从 store 获取壁纸对象，里面保存着 storage 里存储的 blob 对象转化后的字符串
  const wallpaper = useSelector((state) => state.home.wallpaper);
  const [imgBase64, setImgBase64] = useState(wallpaper.imgBase64);
  const backendBaseUrl = useSelector((state) => state.basic.backendBaseUrl);
  const dispatch = useDispatch();
  // update blob object
  useEffect(() => {
    const getData = async () => {
      let base64Str;
      let rawUrl;
      try {
        const res = await axios.get(`${backendBaseUrl}/wallpaper/random`);
        const {
          data: { full, raw },
        } = res;
        base64Str = await getBase64FromUrl(full);
        rawUrl = raw;
      } catch (error) {
        // 当首次安装切网络错误的时候，使用默认图片
        if (error.message === "Network Error") {
          //  无网络，则提示
          alert("网络错误");
        }
      } finally {
        setImgBase64(base64Str);
        // 更新最新的壁纸 blob 数据到 store，并且更新 storage 存储
        // dispatch data
        const newWallpaper = {
          ...wallpaper,
          imgBase64: base64Str,
          downloadUrl: rawUrl,
        };
        dispatch(setWallpaper(newWallpaper));
      }
    };
    // 如果是第一次运行，则获取新的图片 Blob 数据并且保存
    // 如果设置了锁定壁纸，则不再每天更新
    if (!wallpaper.fixed && isNewDay()) {
      getData();
      // 更新时间戳
      dispatch(setUpdateTimestamp(new Date().getTime()));
    }
  }, []);
  return (
    <>
      {imgBase64 === "" ? (
        <Loading />
      ) : (
        <Router>
          <Box
            w="100vw"
            height="100vh"
            display="flex"
            flexDir="column"
            backgroundImage={`url(${imgBase64})`}
            bgSize="100% 100%"
            bgRepeat="no-repeat"
          >
            {/* 顶栏：下载按钮 + 搜索框 + 天气时间框 */}
            <Box flexGrow="1">
              <Switch>
                <Route exact path="/">
                  <Wallpapers />
                </Route>
                <Route path="/wallpapers">
                  <Wallpapers />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
              </Switch>
            </Box>
            <Bar />
          </Box>
        </Router>
      )}
    </>
  );
}
