import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

export default function Card({ width, imgSrc, title, titleFontSize = "1.5rem" }) {
  return (
    <Flex flexDir="column" w={width}>
      <Image
        src={imgSrc}
        objectFit="fill"
        flexGrow="1"
        w="width"
        h="auto"
        style={{
          aspectRatio: "4/3",
        }}
      />
      <Text
        display="-webkit-box"
        overflow="hidden"
        textOverflow="ellipsis"
        fontSize={titleFontSize}
        style={{
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        }}
      >
        {title}
      </Text>
    </Flex>
  );
}
