import { Box, Text } from "@chakra-ui/layout";
import React from "react";

export default function BookmarkStat() {
  return (
    <Box bgImage="url('./bookmark.jpeg')" bgSize="fill" h="100%" borderRadius=".4rem">
      <Text
        textAlign="center"
        fontSize="1.1rem"
        p="0.4rem"
        bg="rgba(255,255,255,.2)"
        color="white"
        backdropFilter="blur(4)"
        borderTopRadius="0.4rem"
      >
        善用我的书签和收藏
      </Text>
    </Box>
  );
}
