import { Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";

export default function BookmarkOrNoteStat({ url, srcStr }) {
  const history = useHistory();
  const redirectToBookmarkPage = () => history.replace(url);
  return (
    <Flex
      h="100%"
      flexDir="column"
      justify="center"
      align="center"
      cursor="pointer"
      onClick={redirectToBookmarkPage}
    >
      <Image src={srcStr} w="80%" height="80%" />
    </Flex>
  );
}
