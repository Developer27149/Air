import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

export default function wallpaperStat() {
  return (
    <Flex
      flexDir="column"
      justify="flex-end"
      align="stretch"
      bg="url('./wallpaper1.jpeg')"
      bgSize="cover"
      height="100%"
      borderRadius=".4rem"
    >
      <Text
        textAlign="center"
        fontSize="1.1rem"
        p="0.4rem"
        bg="rgba(255,255,255,.5)"
        color="grey.300"
        backdropFilter="blur(4)"
      >
        简单纯粹的标签页
      </Text>
    </Flex>
  );
}
