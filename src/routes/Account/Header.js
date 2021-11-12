import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { motion } from "framer-motion";
import { Image } from "@chakra-ui/image";

const FlashDiv = motion(Box);

export default function Header({ isOnLogin, setIsOnLogin, onRedirctToHome }) {
  return (
    <Flex align="center" m="2rem auto" w="min(90vw, 1200px)" color="blue.400">
      <Box flexGrow="1">
        <Image src="./icons/64.png" w="3rem" h="3rem" />
      </Box>
      <Box
        opacity="0.7"
        mr="2rem"
        fontSize="1rem"
        _hover={{
          fontsize: "1.1rem",
          opacity: 1,
        }}
        transition="all 0.45s ease-in-out"
        onClick={onRedirctToHome}
        cursor="pointer"
      >
        使用基础功能
      </Box>
      <Flex justify="flex-end" pos="relative">
        <FlashDiv
          bgImage="linear-gradient(to left, #b92b27, #1565c0)"
          w="2rem"
          h="4px"
          borderRadius="4px"
          pos="absolute"
          top="-4px"
          p="0 1rem"
          left="3rem"
          animate={{
            // [isOnLogin ? "left" : "right"]: 0,
            left: isOnLogin ? "0.6rem" : "4rem",
          }}
          transition={isOnLogin ? { duration: 0.4, repeat: 0 } : null}
        />
        <Box
          fontSize="1.1rem"
          m="0.5rem 0.6rem"
          pb="4px"
          cursor="pointer"
          opacity="0.7"
          _hover={{
            opacity: 1,
          }}
          transition="all 0.45s ease-in-out"
          onClick={() => setIsOnLogin(true)}
        >
          登录
        </Box>
        <Box
          fontSize="1.1rem"
          m="0.5rem 0.6rem"
          pb="4px"
          cursor="pointer"
          opacity="0.7"
          _hover={{
            opacity: 1,
          }}
          transition="all 0.45s ease-in-out"
          onClick={() => setIsOnLogin(false)}
        >
          注册
        </Box>
        <FlashDiv
          bgImage="linear-gradient(to right, #b92b27, #1565c0)"
          w="2rem"
          h="4px"
          borderRadius="4px"
          pos="absolute"
          bottom="0"
          p="0 1rem"
          left="3rem"
          animate={{
            left: isOnLogin ? "0.6rem" : "4rem",
          }}
          transition={isOnLogin ? { duration: 0.4, repeat: 0 } : null}
        />
      </Flex>
    </Flex>
  );
}
