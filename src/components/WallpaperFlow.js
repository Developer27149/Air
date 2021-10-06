import { Avatar } from "@chakra-ui/avatar";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Badge, Box, Link } from "@chakra-ui/layout";
import React from "react";
import { Icon } from "@chakra-ui/icons";
import { sliceArray } from "Utils/index.js";
import { BiDislike, BiLike } from "react-icons/bi";

export default function WallpaperFlow({ wallpaperArr }) {
  const newWallpaperArr = sliceArray(wallpaperArr, 3);
  return (
    <Box display="flex" justifyContent="space-between">
      {newWallpaperArr.map((item, idx) => {
        return (
          <Box key={idx} p="1rem">
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
              console.log(profile_image, color);

              return (
                <Box key={id} w="400px" pos="relative">
                  <Box pos="absolute" top="1.5rem" left="0.5rem" right="0.5rem" display="flex">
                    <DeleteIcon fontSize="1rem" />
                    <Icon as={BiLike} fontSize="1rem" />
                    <Icon as={BiDislike} fontSize="1rem" />
                  </Box>
                  <Image src={small} title={descrption} p="1rem 0" />
                  <Box
                    pos="absolute"
                    bottom="1.5rem"
                    left="0.5rem"
                    right="0.5rem"
                    display="flex"
                    alignItems="center"
                  >
                    <Avatar src={profile_image.medium} />
                    <Badge fontSize=".8rem" colorScheme={color} color="white">
                      <Link href={html}>{first_name}</Link>
                    </Badge>
                    <Box flexGrow="1" display="flex" justifyContent="flex-end">
                      <Badge
                        fontSize=".8rem"
                        colorScheme={color}
                        color="white"
                        justifySelf="flex-end"
                      >
                        {Object.keys(topic_submissions)[0] ?? <AddIcon />}
                      </Badge>
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
