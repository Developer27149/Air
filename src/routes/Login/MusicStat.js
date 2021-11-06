import Icon from "@chakra-ui/icon";
import { Box, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { IoPauseOutline, IoPlayOutline } from "react-icons/io5";

export default function MusicStat() {
  const [isPlay, setIsPlay] = useState(false);
  return (
    <Box
      bg="url('./music.jpeg')"
      bgSize="fill"
      bgRepeat="no-repeat"
      height="100%"
      borderRadius=".4rem"
    >
      <Text
        pos="absolute"
        top="0"
        bottom="0"
        left="0"
        p="0.3rem"
        textAlign="center"
        fontSize="1.1rem"
        backdropFilter="blur(2)"
        bgColor="rgba(255,255,255,.1)"
        style={{
          writingMode: "tb",
        }}
      >
        👂 🎧 👂
      </Text>
      <Box
        pos="absolute"
        top="1rem"
        right="1rem"
        bg="whiteAlpha.300"
        opacity=".7rm"
        p="0.5rem"
        borderRadius="50%"
      >
        {!isPlay ? (
          <Icon as={IoPlayOutline} color="teal.200" fontSize="1.2rem" cursor="pointer" />
        ) : (
          <Icon as={IoPauseOutline} color="teal.200" fontSize="1.2rem" cursor="pointer" />
        )}
      </Box>
    </Box>
  );
}
