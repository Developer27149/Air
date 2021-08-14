import React from "react";
import { Input, Box, Icon } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export default function Search() {
  return (
    <Box
      bg="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="10rem"
      minW="400px"
      maxW="600px"
    >
      <Icon as={FcGoogle} boxSize="16px" position="relative" left="1.6rem" zIndex="9" />
      <Input paddingLeft="2rem" placeholder={globalThis.name} />
    </Box>
  );
}
