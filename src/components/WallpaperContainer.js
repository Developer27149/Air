import { Box, Heading, Image, Button, Avatar, Text, Divider } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNewDay } from "Utils/index.js";
import axios from "axios";
import Loading from "./Loading.js";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/transition";
import Empty from "./Empty.js";
import WallpaperFlow from "./WallpaperFlow.js";
import { setWallpaper } from "Store/homeSlice.js";

export default function WallpaperContainer() {
  const dispatch = useDispatch();
  const wallpaper = useSelector((state) => state.home.wallpaper);
  const backendBaseUrl = useSelector((state) => state.basic.backendBaseUrl);
  const updateTimeStamp = useSelector((state) => state.basic.updateTimeStamp);
  const dateNum = new Date(updateTimeStamp).getDate();
  const [isGetData, setIsGetData] = useState(
    isNewDay(dateNum, true) || wallpaper.items.length === 0
  );

  const profile = useSelector((state) => state.profile.profile);
  const { isOpen, onToggle } = useDisclosure();
  const [wallpaperArr, setWallpaperArr] = useState([]);
  const [page, setPage] = useState(1);
  const [currentWallpaperArr, setCurrentWallpaperArr] = useState([]);

  const handleShowLike = () => {
    const newArr = wallpaper.items.filter((i) => wallpaper.like.includes(i.id));
    setWallpaperArr(newArr);
  };

  const handleShowAll = () => {
    console.log("show current all wallpaper", currentWallpaperArr);
    setWallpaper(currentWallpaperArr);
  };

  const handleUpload = () => {};

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.post(`${backendBaseUrl}/wallpaper/newest`, {
          exist: wallpaper.items.map((i) => i.id),
        });
        // 从服务器获取更新
        const tempWallpaperArr = {
          ...wallpaper,
          items: [...wallpaper.items, ...data.data.data],
        };
        // 设置为已经更新了数据
        console.log(tempWallpaperArr.items.slice(0, 18));
        setIsGetData(false);
        setWallpaperArr(tempWallpaperArr.items.slice(0, page * 18));
        // 在筛选之前保存了当前页面的壁纸数据
        setCurrentWallpaperArr(tempWallpaperArr.items.slice(0, page * 18));
        dispatch(setWallpaper(tempWallpaperArr));
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
          <Box
            w="min(100%, 1280px)"
            m="0 auto"
            mt="1rem"
            p={["1rem", "1rem", "1rem", "0"]}
            pos="sticky"
            top="0"
            left="0"
            right="0"
            bg="white"
          >
            <Box as="header" display="flex" justifyContent="space-between" alignItems="center">
              <Image src="./icons/64.png" />
              <Box flexGrow="1" p=".2rem 2rem">
                <Heading as="p" size="sm" p=".2rem" fontWeight="normal">
                  感谢你来到这里。
                </Heading>
              </Box>
              <Avatar
                src={profile.avatar}
                name={profile.username}
                bg="teal.100"
                size="md"
                m="0.8rem"
              ></Avatar>
              <Box>
                <Heading as="p" size="md">
                  {profile.username}
                </Heading>
                {profile.photos.length > 0 ? (
                  <Text color="#859b97" fontSize=".9rem">
                    和其他人分享了{profile.photos.length}张壁纸
                  </Text>
                ) : null}
              </Box>
              <Divider orientation="vertical" h="3rem" m="1rem" />
              <HamburgerIcon
                boxSize="2rem"
                onClick={onToggle}
                cursor="pointer"
                transform={isOpen ? "rotate(90deg)" : ""}
                transition="all 0.3s ease-in-out"
              />
            </Box>

            <Collapse in={isOpen} animateOpacity>
              <Box display="flex">
                <Box>
                  <Button colorScheme="teal" variant="ghost" onClick={handleShowAll}>
                    所有壁纸👏
                  </Button>
                </Box>
                <Box>
                  <Button colorScheme="teal" variant="ghost" onClick={handleUpload}>
                    我要分享🙋🏻
                  </Button>
                </Box>
                <Box>
                  <Button colorScheme="teal" variant="ghost" onClick={handleShowLike}>
                    我喜欢的😎
                  </Button>
                </Box>
                <Box flexGrow="1"></Box>
              </Box>
            </Collapse>
          </Box>
          <Box w="min(100%, 1280px)" flexGrow="1" m="0 auto" display="flex" flexDir="column">
            <Box>
              {wallpaperArr.length === 0 ? (
                <Empty />
              ) : (
                <WallpaperFlow wallpaperArr={wallpaperArr} />
              )}
            </Box>
          </Box>
          <Box as="footer" w="min(100%, 1170px)" m="0 auto">
            footer
          </Box>
        </Box>
      )}
    </>
  );
}
