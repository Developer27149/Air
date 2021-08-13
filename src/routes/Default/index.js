import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Search from "../../components/Search";
export default function Default() {
  const img = useSelector((state) => state.default.img);
  const handleGetName = () => {
    console.log("click");
    // chrome.storage.sync.get(["name"], (n) => {
    //   console.log("name is:", n);
    // });
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="100vw"
      h="100vh"
      position="relative"
    >
      <Image
        src={img}
        objectFit="cover"
        w="100vw"
        h="100vh"
        position="absolute"
      />
      <Search />
    </Box>
  );
}
