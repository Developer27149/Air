import React from "react";
import { Box } from "@chakra-ui/react";
import Search from "Components/Search.js";

export default function Home() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        w="100vw"
        h="100vh"
        position="fixed"
        left="0"
        top="0"
        m="0"
        p="0"
      >
        <Search />
      </Box>
    </>
  );
}
