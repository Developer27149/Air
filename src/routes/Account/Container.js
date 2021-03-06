import { Badge, Flex, Heading, Text, Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import React from "react";
import AccountRegister from "./AccountRegister.js";
import AccountLogin from "./AcountLogin.js";
import { motion } from "framer-motion";
const MHeading = motion(Heading);

export default function Container({ onRedirctToHome, isOnLogin }) {
  return (
    <Flex pos="relative" flexGrow="1" align="center" w="min(100vw, 1920px)" m="0 auto">
      <Box pos="absolute" left="0" top="0" bottom="0" w="calc(100vw - 28rem)">
        <Image
          src="./img/color.svg"
          pos="absolute"
          left="30rem"
          bottom="6rem"
          w={["500px", "520px", "640px"]}
          h={["300px", "320px", "520px"]}
        />
        <Image
          zIndex="2"
          src="./img/im2.svg"
          pos="absolute"
          left="5rem"
          top="6rem"
          w="350px"
          h="280px"
        />
        <Image
          zIndex="2"
          src="./img/msg.svg"
          pos="absolute"
          left="calc(50% - 150px)"
          top="0"
          w="240px"
          h="240px"
        />
        <Image
          zIndex="2"
          src="./img/im.svg"
          pos="absolute"
          right="4rem"
          top="6rem"
          w="350px"
          h="280px"
        />
        <Image
          zIndex="2"
          src="./img/read.svg"
          pos="absolute"
          left="55%"
          transform="rotate(5deg)"
          top="20rem"
          w="240px"
        />
        <Image
          zIndex="2"
          src="./img/wallpaper.svg"
          pos="absolute"
          right="30rem"
          top="1rem"
          w="150px"
          h="150px"
        />
        <Image
          zIndex="2"
          src="./img/gitar.svg"
          pos="absolute"
          left="2rem"
          bottom="2rem"
          w="400px"
          h="400px"
        />
        <Image
          zIndex="2"
          src="./img/online.svg"
          pos="absolute"
          right="3rem"
          bottom="3rem"
          w="300px"
        />
        <Flex
          pos="absolute"
          left="30rem"
          bottom="6rem"
          w={["500px", "520px", "640px"]}
          h={["300px", "320px", "520px"]}
          justify="center"
          flexDir="column"
          bg="#f6f6f6cf"
          backdropFilter="blur(3px)"
          zIndex="9"
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
            ????????? Fans
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
            ????????????????????????????????????????
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
            ???????????? ????
          </MHeading>
          <MHeading
            as="h1"
            size="md"
            opacity="0.1"
            color="#8177b7"
            transform="1.2"
            mb="2rem"
            animate={{
              opacity: 1,
              transform: "scale(1)",
            }}
            transition={{
              duration: "0.4",
            }}
          >
            ?????????????????????????????????
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
            ??????????????????????????????????????????????????????...
          </MHeading>

          <Flex flexGrow="1" align="center">
            <Text fontSize="1rem" fontSize="1rem" opacity="0.8">
              ??????????????????????????????????????????????????????
            </Text>
            <Badge
              fontSize="1rem"
              colorScheme="blue"
              m="0 .3rem"
              cursor="pointer"
              onClick={onRedirctToHome}
            >
              ????????????!
            </Badge>
          </Flex>
        </Flex>
      </Box>
      {isOnLogin ? <AccountLogin /> : <AccountRegister />}
    </Flex>
  );
}
