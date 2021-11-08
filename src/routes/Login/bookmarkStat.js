import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";

export default function BookmarkStat() {
  const history = useHistory();
  const redirectToBookmarkPage = () => history.replace("/bookmark");
  return (
    <Flex
      h="100%"
      borderRadius=".4rem"
      flexDir="column"
      justify="center"
      align="center"
      cursor="pointer"
      onClick={redirectToBookmarkPage}
    >
      <Image src="./bookmark.svg" w="80%" height="80%" />
      <Text textAlign="center" fontSize="1.1rem" p=".2rem">
        书签🔖
      </Text>
    </Flex>
  );
}
