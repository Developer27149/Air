import { Badge, Flex, Heading, Text, Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import React from "react";
import RegisterElement from "./RegisterElement.js";
import { motion } from "framer-motion";
const MHeading = motion(Heading);

export default function Container({ onRedirctToHome, isOnLogin }) {
  return (
    <Flex pos="relative" flexGrow="1" align="center">
      <Box pos="absolute" left="0" top="0" bottom="0" w="calc(100vw - 28rem)">
        <Image
          src="./img/color.svg"
          pos="absolute"
          left="30rem"
          bottom="6rem"
          w={["500px", "520px", "720px"]}
          h={["300px", "320px", "520px"]}
        />
        <Image src="./img/im2.svg" pos="absolute" left="5rem" top="6rem" w="350px" h="280px" />
        <Image
          src="./img/msg.svg"
          pos="absolute"
          left="calc(50% - 150px)"
          top="0"
          w="240px"
          h="240px"
        />
        <Image src="./img/im.svg" pos="absolute" right="4rem" top="6rem" w="350px" h="280px" />
        <Image
          src="./img/wallpaper.svg"
          pos="absolute"
          right="30rem"
          top="1rem"
          w="150px"
          h="150px"
        />
        <Image src="./img/gitar.svg" pos="absolute" left="2rem" bottom="2rem" w="400px" h="400px" />
        <Image src="./img/online.svg" pos="absolute" right="3rem" bottom="3rem" w="300px" />
        <Flex
          pos="absolute"
          left="30rem"
          bottom="6rem"
          w={["500px", "520px", "720px"]}
          h={["300px", "320px", "520px"]}
          justify="center"
          flexDir="column"
          bgColor="#ffffffb8"
          backdropFilter="blur(3px)"
        >
          <MHeading
            as="h1"
            size="md"
            opacity="0.1"
            color="#8177b7"
            transform="1.2"
            animate={{
              opacity: 1,
              transform: "scale(1)",
            }}
            transition={{
              duration: "0.4",
            }}
          >
            壁纸系 Fans
          </MHeading>
          <MHeading
            as="h1"
            size="md"
            opacity="0.1"
            color="#8177b7"
            transform="1.2"
            animate={{
              opacity: 1,
              transform: "scale(1)",
            }}
            transition={{
              duration: "0.4",
            }}
          >
            书签管理、备忘事项、指弹🎵
          </MHeading>
          <MHeading
            as="h3"
            size="4xl"
            m="4.5rem"
            color="#0065ff"
            opacity="0"
            transform="1.2"
            animate={{
              opacity: 1,
              transform: "scale(1)",
            }}
            transition={{
              duration: "0.4",
            }}
          >
            纯净标签 🏷
          </MHeading>
          <MHeading
            as="h1"
            size="md"
            opacity="0.1"
            color="#8177b7"
            transform="1.2"
            animate={{
              opacity: 1,
              transform: "scale(1)",
            }}
            transition={{
              duration: "0.4",
            }}
          >
            临时通讯、常用站点快捷入口，更多功能...
          </MHeading>
          <Flex flexGrow="1" align="center">
            <Text fontSize="1rem" fontSize="1rem" opacity="0.8">
              如果你想直接使用极简的版本，可以选择
            </Text>
            <Badge
              fontSize="1rem"
              colorScheme="blue"
              m="0 .3rem"
              cursor="pointer"
              onClick={onRedirctToHome}
            >
              直接使用!
            </Badge>
          </Flex>
        </Flex>
      </Box>
      <RegisterElement redirectToHome={onRedirctToHome} isOnLogin={isOnLogin} />
    </Flex>
  );
}
