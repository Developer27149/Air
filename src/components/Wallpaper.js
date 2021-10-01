import { Image } from "@chakra-ui/image";
import React from "react";

export default function Wallpaper() {
  return (
    <>
      <Image
        src=""
        w="100vw"
        h="100vh"
        pos="fixed"
        left="0"
        right="0"
        top="0"
        bottom="0"
        zIndex="-1"
      />
    </>
  );
}
