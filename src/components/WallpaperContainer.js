import { Box, Heading, Image, Button, Avatar } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNewDay } from "Utils/index.js";
import axios from "axios";
import Loading from "./Loading.js";
import { ArrowUpIcon } from "@chakra-ui/icons";

export default function WallpaperContainer() {
  const dispatch = useDispatch();
  const wallpaper = useSelector((state) => state.home.wallpaper);
  const backendBaseUrl = useSelector((state) => state.basic.backendBaseUrl);
  const [isGetData, setIsGetData] = useState(isNewDay(true) || wallpaper.items.length === 0);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`${backendBaseUrl}/wallpaper/all`);
        console.log(data);
        setIsGetData(false);
      } catch (error) {
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
        <Box display="flex" flexDir="column" bg="#fff" w="100vw" h="100vh" pos="absolute">
          <Box
            as="header"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            w="min(100%, 1170px)"
            m="0 auto"
            mt="1rem"
          >
            <Image src="./icons/64.png" />
            <Box flexGrow="1" p=".2rem 2rem">              
              <Heading as="p" size="sm" p=".2rem" fontWeight="normal">
                感谢你来到这里。
              </Heading>
            </Box>
            <Button rightIcon={<ArrowUpIcon />} colorScheme="teal" variant="outline">
              我要分享🙋🏻
            </Button>
            <Avatar src="" name=""></Avatar>
          </Box>
          <Box w="min(100%, 1170px)" flexGrow="1" m="0 auto">
            wallpapers
          </Box>
          <Box as="footer" w="min(100%, 1170px)" m="0 auto">
            footer
          </Box>
        </Box>
      )}
    </>
  );
}
