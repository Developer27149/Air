import { Avatar } from "@chakra-ui/avatar";
import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import React, { useState, useCallback } from "react";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { CgMaximizeAlt, CgUserlane } from "react-icons/cg";
import { randomColor } from "Utils/index.js";

export default React.memo(function WallpaperItem({
  wallpaperData,
  handleEvaluateWallpaper,
  handleApplyImg,
  handleShowMaxSize,
  isLike,
  isUnlike,
}) {
  const {
    description,
    id,
    likes,
    upload_user_avatar,
    urls: { raw, full, small },
  } = wallpaperData;
  const [randomNum] = useState({
    row: Math.random() * 4 >= 2.5,
    col: Math.random() * 4 >= 2.5,
  });
  const frozenRow = useCallback(() => randomNum.row, []);
  const frozenCol = useCallback(() => randomNum.col, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gridRow={frozenRow() ? "span 2" : ""}
      gridColumn={frozenCol() ? "span 2" : ""}
      bg={randomColor()}
      pos="relative"
    >
      <Image
        src={small}
        objectFit="cover"
        borderRadius="5px"
        h="100%"
        w="100%"
        verticalAlign="center"
        display="inline-block"
      />
      <Box
        h="100%"
        w="100%"
        pos="absolute"
        left="0"
        right="0"
        top="0"
        bottom="0"
        opacity="0"
        transition="opacity .4s ease-in-out"
        _hover={{
          opacity: 1,
        }}
      >
        <Box pos="absolute" top=".4rem" display="flex" p="0.5rem" w="100%">
          <Icon
            fontSize="1.3rem"
            mr=".4rem"
            as={isLike ? AiFillLike : AiOutlineLike}
            cursor="pointer"
            color="white"
            data-id={id}
            onClick={() => {
              !isLike && handleEvaluateWallpaper(id, true);
            }}
          />
          <Icon
            fontSize="1.3rem"
            as={isUnlike ? AiFillDislike : AiOutlineDislike}
            cursor="pointer"
            color="white"
            data-id={id}
            onClick={() => {
              !isUnlike && handleEvaluateWallpaper(id, false);
            }}
          />
          <Icon
            cursor="pointer"
            fontSize="1.3rem"
            as={CgMaximizeAlt}
            color="white"
            onClick={() =>
              handleShowMaxSize({ id, raw, full, isLike, description, upload_user_avatar })
            }
            ml="auto"
          />
        </Box>

        <Box
          pos="absolute"
          bottom=".5rem"
          left="0.5rem"
          right="0.5rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          alignItems="center"
        >
          <Avatar src={upload_user_avatar} w="32px" h="32px" />
          <Icon
            color="white"
            as={CgUserlane}
            fontSize="24px"
            cursor="pointer"
            data-url={full}
            onClick={() => handleApplyImg(full)}
          />
        </Box>
      </Box>
    </Box>
  );
});
