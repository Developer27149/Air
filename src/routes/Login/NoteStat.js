import { Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import React from "react";

export default function NoteStat() {
  return (
    <Flex
      bgImage="url('./note.svg')"
      bgSize="contain"
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
        备忘事项
      </Text>
    </Flex>
  );
}
