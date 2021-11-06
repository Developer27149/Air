import Icon from "@chakra-ui/icon";
import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function OauthLogin() {
  return (
    <Box minH="8rem">
      <Flex justify="center" align="center" mb="1rem" w="100%">
        <Divider minW="8rem" />
        <Text flexGrow="1" textAlign="center" minW="7rem">
          第三方登录🏂🏿
        </Text>
        <Divider minW="8rem" />
      </Flex>
      <Flex p="1rem 2rem" bg="white.200" justify="center" align="center">
        <Icon as={FaGithub} fontSize="2rem" cursor="pointer" />
      </Flex>
    </Box>
  );
}
