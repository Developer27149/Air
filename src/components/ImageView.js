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

export default function ImageView({ full, raw, handleHidden }) {
  useEffect(() => {
    document.documentElement.requestFullscreen();
    return () => {
      document.exitFullscreen();
    };
  });
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
        <Tooltip label="应用到搜索页面" placement="top">
          <Icon color="white" as={CgUserlane} fontSize="1.5rem" cursor="pointer" />
        </Tooltip>
        <Tooltip label="我喜欢" placement="top">
          <Icon color="white" as={FcLike} fontSize="1.5rem" cursor="pointer" />
        </Tooltip>
        <Tooltip label="下载到本地" placement="top">
          <DownloadIcon
            color="white"
            cursor="pointer"
            fontSize="1.5rem"
            onClick={() => handleDownloadWallpaper(raw)}
          />
        </Tooltip>
        <Tooltip label="退出预览" placement="top">
          <Icon
            as={CgMinimize}
            color="white"
            onClick={handleHidden}
            cursor="pointer"
            fontSize="1.5rem"
          />
        </Tooltip>
      </Box>
    </Box>
  );
}
