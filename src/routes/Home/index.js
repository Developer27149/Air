import React, { useEffect } from "react";
import Search from "Components/Search.js";
import { hadToken } from "Utils/index.js";
import { useHistory } from "react-router";
import PendantCenter from "Components/homepage/PendantCenter.js";
import { Flex } from "@chakra-ui/layout";

export default function Home() {
  const history = useHistory();
  useEffect(() => {
    try {
      if (!globalThis.settings.profile.isAnonymous && !hadToken()) {
        history.replace("/login");
      }
    } catch (error) {
      console.log(error);
      history.replace("/login");
    }
  }, []);
  return (
    <Flex flexDir="column" h="100vh">
      <Search />
      <PendantCenter />
    </Flex>
  );
}
