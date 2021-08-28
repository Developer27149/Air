import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Init() {
  const [imgAddr, setImgAddr] = useState(globalThis.settings.wallpaper.items[0]);
  console.log(`img addr is ${imgAddr}`);
  console.log(globalThis.settings);
  return (
    <Box bg={`url(${imgAddr})`}>
      <Text>init</Text>
    </Box>
  );
}
