import { Box, Heading, Image, Button, Avatar, Text, Divider } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNewDay } from "Utils/index.js";
import axios from "axios";
import Loading from "Components/Loading.js";
import WallpaperFlow from "./WallpaperFlow.js";
import { updateWallpaperItems } from "Store/homeSlice.js";
import Pages from "./Pages.js";
import WallpaperHeader from "./WallpaperHeader.js";

export default function WallpaperContainer() {
  const dispatch = useDispatch();
  const wallpaper = useSelector((state) => state.home.wallpaper);
  const { backendBaseUrl, updateTimeStamp } = useSelector((state) => state.basic);
  const dateNum = new Date(updateTimeStamp).getDate();
  const [isGetData, setIsGetData] = useState(
    isNewDay(dateNum, true) || wallpaper.items.length === 0
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.post(`${backendBaseUrl}/wallpaper/newest`, {
          exist: wallpaper.items.map((i) => i.id),
        });
        console.log(data.data.data);
        // 从服务器获取更新
        // 设置为已经更新了数据
        setIsGetData(false);
        // 更新最新的壁纸数据到本地存储
        dispatch(updateWallpaperItems(data.data.data));
      } catch (error) {
        // 异常同样更新状态为已经获取了数据
        setIsGetData(false);
        console.log(error);
      }
    };
    // 当本地所有图片数据不存在的时候或者每天更新一次数据
    isGetData && getData();
  }, [isGetData]);

  return (
    <>
      {isGetData ? (
        <Loading />
      ) : (
        <Box
          display="flex"
          flexDir="column"
          bg="#fff"
          w="100vw"
          h="100vh"
          pos="fixed"
          left="0"
          right="0"
          overflowX="hidden"
        >
          <WallpaperHeader />
          <WallpaperFlow />
          <Pages />
        </Box>
      )}
    </>
  );
}
