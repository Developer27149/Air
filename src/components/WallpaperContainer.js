import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNewDay } from "Utils/index.js";
import axios from "axios";

export default function WallpaperContainer() {
  const dispatch = useDispatch();
  const wallpaper = useSelector((state) => state.home.wallpaper);
  const backendBaseUrl = useSelector((state) => state.basic.backendBaseUrl);
  const [isGetData, setIsGetData] = useState(isNewDay(true) || wallpaper.items.length === 0);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`${backendBaseUrl}/wallpaper/all`);
      } catch (error) {
        console.log(error);
      }
    };
    // 当本地所有图片数据不存在的时候或者每天更新一次数据
    isGetData && getData();
  }, [isGetData]);

  return (
    <Box>
      <p> wallpapers</p>
    </Box>
  );
}
