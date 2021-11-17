import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@chakra-ui/icon";
import { IoIosSearch } from "react-icons/io";
import { Box, Flex } from "@chakra-ui/layout";
const MBox = motion(Box);
export default function SearchTask() {
  return (
    <Flex align="center" p="2rem 1rem">
      <MBox
        w="0"
        overflow="hidden"
        animate={{
          width: "1.1rem",
        }}
        transition={{
          duration: 0.4,
          delay: 0.3,
        }}
      >
        <Icon as={IoIosSearch} fontSize="1.1rem" />
      </MBox>
      <Box ml="0.5rem" fontSize="1.1rem">
        <motion.input
          placeholder="search"
          style={{
            width: "1px",
            // borderBottom: "1px solid #eee",
          }}
          autoFocus="autofocus"
          animate={{
            width: "12rem",
          }}
          transition={{
            duration: 0.4,
            delay: 0.3,
          }}
        />
      </Box>
    </Flex>
  );
}
