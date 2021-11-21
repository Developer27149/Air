import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@chakra-ui/icon";
import { IoIosSearch } from "react-icons/io";
import { Box, Flex } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword } from "Store/searchTaskSlice.js";

const MBox = motion(Box);
export default function SearchTask() {
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.searchTask.keyword);
  const handleChangeSearchKeyword = (e) => {
    const v = e.target.value.trim();
    dispatch(setKeyword(v));
  };
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
          value={keyword}
          onChange={handleChangeSearchKeyword}
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
