import { Box } from "@chakra-ui/react";
import React from "react";
import { Flex } from "@chakra-ui/layout";
import Content from "./Content.js";
import Menu from "./Menu.js";

export default function index() {
  return (
    <Flex
      // bg="linear-gradient(38deg ,rgb(240 255 248), rgb(199 243 224))"
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex w="90vw" h="80vh" m="0 auto" bg="white" borderRadius="0.6rem">
        <Menu />
        <Content />
      </Flex>
    </Flex>
  );
}
