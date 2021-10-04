import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { sliceArray } from "Utils/index.js";

export default function WallpaperFlow({ wallpaperArr }) {
  const newWallpaperArr = sliceArray(wallpaperArr, 3);
  return (
    <Box display="flex" justifyContent="space-between">
      {newWallpaperArr.map((item, idx) => {
        return (
          <Box key={idx} p="1rem">
            {item.map((photo) => {
              return (
                <Image src={photo.smImgUrl} key={photo.id} title={photo.descrption} mt="1rem" />
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}
