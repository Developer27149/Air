import { Box, Heading, Image, Button, Avatar, Text, Divider } from "@chakra-ui/react";

import React from "react";
import WallpaperFlow from "./WallpaperFlow.js";
import Pages from "./Pages.js";
import WallpaperHeader from "./WallpaperHeader.js";

export default function WallpaperContainer() {
  return (
    <Box
      display="flex"
      flexDir="column"
      // background="linear-gradient(45deg, #190f2c, #200b30)"
      bg="#fff"
      w="100vw"
      h="100vh"
      pos="fixed"
      left="0"
      right="0"
      overflowX="hidden"
      id="wallpaper_flow"
    >
      <WallpaperHeader />
      <WallpaperFlow />
      {/* <Pages /> */}
    </Box>
  );
}
