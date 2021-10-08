import { Avatar } from "@chakra-ui/avatar";
import { AddIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Badge, Box, Link } from "@chakra-ui/layout";
import React from "react";
import { Icon } from "@chakra-ui/icons";
import { sliceArray } from "Utils/index.js";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { setWallpaper } from "Store/homeSlice.js";

export default function WallpaperFlow({ wallpaperArr = [] }) {
  const dispatch = useDispatch();
  const wallpaper = useSelector((state) => state.home.wallpaper);
  const handleSwitchLike = (id, field) => {
    const dataArr = wallpaper[`${field}`].includes(id)
      ? wallpaper[`${field}`].filter((i) => i !== id)
      : wallpaper[`${field}`].push(id);
    dispatch(
      setWallpaper({
        ...wallpaper,
        [`${field}`]: dataArr,
      })
    );
  };

  const newWallpaperArr = sliceArray(
    wallpaperArr.filter((i) => !wallpaper.unlike.includes(i.id)),
    3
  );
  return (
    <Box display="flex" justifyContent="space-between">
      {newWallpaperArr.map((item, idx) => {
        return (
          <Box key={idx} m="1rem .4rem">
            {item.map((photo) => {
              const {
                user: {
                  profile_image,
                  links: { html },
                  first_name,
                },
                urls: { small, raw, full },
                descrption,
                topic_submissions,
                id,
                color,
              } = photo;

              return (
                <Box key={id} w="400px" pos="relative">
                  <Image src={small} title={descrption} p="1rem 0" />
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
                    <Box pos="absolute" top="1rem" display="flex" p="0.5rem" mt=".5rem" w="100%">
                      <Icon
                        fontSize="1.4rem"
                        m="0 .5rem"
                        as={wallpaper.unlike.includes(id) ? AiFillLike : AiOutlineLike}
                        cursor="pointer"
                        color="white"
                        onClick={() => handleSwitchLike(id, "like")}
                      />
                      <Icon
                        fontSize="1.4rem"
                        m="0 .5rem"
                        as={wallpaper.unlike.includes(id) ? AiFillDislike : AiOutlineDislike}
                        cursor="pointer"
                        color="white"
                        onClick={() => handleSwitchLike(id, "unlike")}
                      />
                    </Box>
                    <Box
                      pos="absolute"
                      bottom="1.5rem"
                      left="0.5rem"
                      right="0.5rem"
                      display="flex"
                      alignItems="center"
                    >
                      <Link href={html}>
                        <Avatar src={profile_image.medium} />
                      </Link>

                      <Box flexGrow="1" display="flex" justifyContent="flex-end">
                        <Badge
                          fontSize=".8rem"
                          colorScheme={color}
                          color="#eee"
                          justifySelf="flex-end"
                          cursor="pointer"
                        >
                          {Object.keys(topic_submissions)[0] ?? <AddIcon />}
                        </Badge>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}
