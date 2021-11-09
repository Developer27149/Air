import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import React from "react";

export default function LoginAndTip({ tip }) {
  return (
    <>
      <Image src="./icons/64.png" w="64px" h="64px" />
      <Text m=".8rem" textAlign="center" fontSize="1rem">
        {tip}
      </Text>
    </>
  );
}
