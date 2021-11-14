import React, { useState, useEffect } from "react";
import { MemoryRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Home from "Routes/Home";
import { Bar, Loading } from "Components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { getBase64FromUrl, isNewDay } from "Utils/index.js";
import { setWallpaper, updateWallpaperItems } from "Store/homeSlice.js";
import Wallpapers from "./Wallpapers/index.js";
import { setUpdateTimestamp } from "Store/basicSlice.js";
import { getRandomWallpaper } from "Utils/request.js";
import { useToast } from "@chakra-ui/toast";
import AccountPage from "./Account/index.js";

export default function App() {
  // 从 store 获取壁纸对象，里面保存着 storage 里存储的 blob 对象转化后的字符串
  const wallpaper = useSelector((state) => state.home.wallpaper);
  const profile = useSelector((state) => state.profile.profile);
  const [imgBase64, setImgBase64] = useState(wallpaper.imgBase64);
  const updateTimeStamp = useSelector((state) => state.basic.updateTimeStamp);
  const dispatch = useDispatch();
  const toast = useToast();
  // update blob object
  useEffect(() => {
    const getData = async () => {
      try {
        const wallpaperHistoryId = wallpaper.history;
        const { data, status } = await getRandomWallpaper(wallpaperHistoryId);
        if (status.code === 1) {
          const {
            result: {
              urls: { raw, full },
              id,
            },
          } = data;
          const base64Str = await getBase64FromUrl(full);
          setImgBase64(base64Str);
          // 更新最新的壁纸 blob 数据到 store，并且更新 storage 存储
          // dispatch data
          const newWallpaper = {
            ...wallpaper,
            imgBase64: base64Str,
            downloadUrl: raw,
            history: wallpaperHistoryId.filter((i) => i).concat([id]),
          };
          dispatch(setWallpaper(newWallpaper));
        } else {
          toast({
            title: "Error",
            description: `🤷🏽‍♂️ ${status.msg}`,
            status: "error",
            duration: 4500,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        // 当首次安装切网络错误的时候，使用默认图片
        if (error.message === "Network Error") {
          //  无网络，则提示
          alert("网络错误");
        } else {
          console.log(error);
        }
      }
    };

    // 首页路由：视情况更新壁纸
    // 如果是第一次运行，则获取新的图片 Blob 数据并且保存
    // 如果设置了锁定壁纸，则不再每天更新
    if (!wallpaper.fixed && isNewDay(new Date(updateTimeStamp).getDate())) {
      toast({
        title: "Tip",
        description: `正在更新每日壁纸`,
        status: "info",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
      getData();
      // 更新时间戳
      dispatch(setUpdateTimestamp(new Date().getTime()));
    }
  }, []);
  // 当图片换了之后，马上更新壁纸
  useEffect(() => {
    setImgBase64(wallpaper.imgBase64);
  }, [wallpaper.imgBase64]);
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
                  <Home />
                </Route>
                <Route path="/wallpapers">
                  <Wallpapers />
                </Route>
                <Route path="/login">
                  <AccountPage />
                </Route>
              </Switch>
            </Box>
            {profile.token.length > 0 ? <Bar /> : null}
          </Box>
        </Router>
      )}
    </>
  );
}
