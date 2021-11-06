import { Box, Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import React from "react";

export default function NoteStat() {
  return (
    <Flex
      bgImage="url('./note.jpeg')"
      bgSize="fill"
      h="100%"
      justify="flex-end"
      borderRadius=".4rem"
    >
      <Text
        style={{ writingMode: "tb" }}
        textAlign="center"
        fontSize="1.1rem"
        p="0.4rem"
        bg="rgba(255,255,255,.5)"
        color="grey.300"
        backdropFilter="blur(4)"
        borderRightRadius="0.4rem"
      >
        备忘事项喜加一
      </Text>
    </Flex>
  );
}
