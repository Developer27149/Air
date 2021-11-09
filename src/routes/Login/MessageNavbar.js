import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import React from "react";

export default function MessageNavbar() {
  return (
    <Flex p="0.2rem" w="100%" h="100%" justify="center" align="center">
      <Image src="/img/im.svg" objectFit="cover" />
      {/* <Text textAlign="center" color="whiteAlpha.500" p="0.2rem">
        临时的短消息沟通，阅后即毁
      </Text> */}
    </Flex>
  );
}
