import { Avatar } from "@chakra-ui/avatar";
import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { CgMaximizeAlt, CgUserlane } from "react-icons/cg";
import { randomColor } from "Utils/index.js";

export default function WallpaperItem({
  wallpaperData,
  handleLike,
  handleDislike,
  handleApplyImg,
  unlikeArr = [],
}) {
  const {
    description,
    height,
    width,
    id,
    likes,
    upload_user_avatar,
    urls: { raw, full, small },
  } = wallpaperData;
  const boxRef = useRef(null);
  const [gridRowEnd, setGridRowEnd] = useState("");
  const onSetGridRowEnd = () => {
    setGridRowEnd(`${~~((height * (window.innerWidth / 5)) / width) + 2} span`);
  };
  return (
    <Box
      ref={boxRef}
      maxW="400px"
      h="100%"
      gridRowEnd={gridRowEnd}
      bg={randomColor()}
      pos="relative"
      p="4px 0"
    >
      <Image src={small} objectFit="cover" onLoad={onSetGridRowEnd} />
      <Box
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
        <Icon
          fontSize="1.4rem"
          m="0 .2rem"
          as={CgMaximizeAlt}
          cursor="pointer"
          color="white"
          pos="absolute"
          top=".6rem"
          right=".4rem"
          cursor="pointer"
          zIndex="9"
        />
        <Box pos="absolute" top=".4rem" display="flex" p="0.5rem" w="100%">
          <Icon
            fontSize="1.3rem"
            m="0 .4rem"
            as={unlikeArr.includes(id) ? AiFillLike : AiOutlineLike}
            cursor="pointer"
            color="white"
            data-id={id}
            onClick={handleLike}
          />
          <Icon
            fontSize="1.3rem"
            m="0 .4rem"
            as={unlikeArr.includes(id) ? AiFillDislike : AiOutlineDislike}
            cursor="pointer"
            color="white"
            data-id={id}
            onClick={handleDislike}
          />
        </Box>

        <Box
          pos="absolute"
          bottom=".5rem"
          left="0.5rem"
          right="0.5rem"
          display="flex"
          alignItems="center"
        >
          <Avatar src={upload_user_avatar} w="48px" h="48px" />

          <Box flexGrow="1" display="flex" justifyContent="flex-end">
            <Icon
              color="white"
              as={CgUserlane}
              fontSize="1.5rem"
              cursor="pointer"
              data-url={full}
              onClick={handleApplyImg}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
