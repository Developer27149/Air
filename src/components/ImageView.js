import Icon from "@chakra-ui/icon";
import { DownloadIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Box, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import React, { useEffect, useState } from "react";
import { CgMinimize, CgUserlane } from "react-icons/cg";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { handleDownloadWallpaper } from "Utils/index.js";
import axios from "axios";
import Loading from "./Loading.js";

export default function ImageView({
  img: { id, full, raw, isLike, description },
  handleHidden,
  handleEvaluateWallpaper,
  handleApplyImg,
}) {
  const [imgData, setImgData] = useState(null);
  const [completed, setCompleted] = useState(false);
  console.log(description);

  useEffect(() => {
    // handle esc key
    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        handleHidden();
      }
    });
    // get full img data
    let source = axios.CancelToken.source();
    const getImgData = async () => {
      try {
        const { data } = await axios.get(full, {
          cancelToken: source.token,
          responseType: "blob",
          withCredentials: true,
        });
        setImgData(URL.createObjectURL(data));
      } catch (error) {
        console.log(error);
        setImgData(full);
      }
    };
    document.documentElement.requestFullscreen();
    getImgData();
    return () => {
      document.fullscreenElement && document.exitFullscreen();
      source.cancel("组件卸载，取消请求");
    };
  }, []);
  return (
    <Box w="100vw" h="100vh" pos="fixed" left="0" right="0" top="0" bottom="0" zIndex="999">
      {completed ? null : <Loading />}
      <Image src={imgData} w="100%" h="100%" onLoad={() => setCompleted(true)} />
      {description?.length > 1 && (
        <Box
          pos="absolute"
          right="2rem"
          top="2rem"
          p="1rem 1.5rem"
          borderRadius="1rem"
          backdropFilter="blur(4px)"
          bg="#dda1a136"
          maxW="30vw"
        >
          <Text fontSize="1.2rem" color="#b1f11a" lineHeight="1.2rem">
            {description}
          </Text>
        </Box>
      )}
      <Box
        pos="absolute"
        right="2rem"
        bottom="4rem"
        p="1rem"
        display="flex"
        zIndex="3"
        style={{
          gap: "12px",
        }}
      >
        <Icon
          color="white"
          as={CgUserlane}
          fontSize="1.5rem"
          cursor="pointer"
          onClick={() => handleApplyImg(full)}
        />
        <Icon
          color="white"
          as={isLike ? FcLike : FcLikePlaceholder}
          fontSize="1.5rem"
          cursor="pointer"
          onClick={() => {
            !isLike && handleEvaluateWallpaper(id, true);
          }}
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
