import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { DownloadIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import React, { useEffect } from "react";
import { CgMinimize, CgUserlane } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import { handleDownloadWallpaper } from "Utils/index.js";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setWallpaper } from "Store/homeSlice.js";

export default function ImageView({ id, full, raw, handleHidden }) {
  const applyToast = useToast();
  const likeToast = useToast();
  const dispatch = useDispatch();
  const wallpaper = useSelector((state) => state.home.wallpaper);

  const handleApplyImg = () => {
    applyToast({
      title: "Tip",
      description: "已经将这张壁纸设置到初始页面❤️",
      status: "success",
      duration: 4500,
      isClosable: true,
      position: "top",
    });
  };

  const handleLikeImg = () => {
    likeToast({
      title: "Tip",
      description: "很高兴收到你的喜欢，我们将会在某个时机将受欢迎的壁纸推荐给其他小伙伴",
      status: "success",
      duration: 4500,
      isClosable: true,
      position: "top",
    });
    // 同步到本地存储和服务器
    const newLikeArr = wallpaper.like.includes(id) ? wallpaper.like : [...wallpaper.like, id];
    console.log(newLikeArr);
    dispatch(
      setWallpaper({
        ...wallpaper,
        like: newLikeArr,
      })
    );
  };
  useEffect(() => {
    document.documentElement.requestFullscreen();
    return () => {
      document.exitFullscreen();
    };
  }, []);
  return (
    <Box w="100vw" h="100vh" pos="fixed" left="0" right="0" top="0" bottom="0" zIndex="999">
      <Image src={full} w="100%" h="100%" />
      <Box
        pos="absolute"
        right="2rem"
        bottom="4rem"
        p="1rem"
        display="flex"
        style={{
          gap: "12px",
        }}
      >
        <Icon
          color="white"
          as={CgUserlane}
          fontSize="1.5rem"
          cursor="pointer"
          onClick={handleApplyImg}
        />
        <Icon
          color="white"
          as={FcLike}
          fontSize="1.5rem"
          cursor="pointer"
          onClick={handleLikeImg}
        />
        <Tooltip label="下载到本地" placement="top">
          <DownloadIcon
            color="white"
            cursor="pointer"
            fontSize="1.5rem"
            onClick={() => handleDownloadWallpaper(raw)}
          />
        </Tooltip>
        <Icon
          as={CgMinimize}
          color="white"
          onClick={handleHidden}
          cursor="pointer"
          fontSize="1.5rem"
        />
      </Box>
    </Box>
  );
}
