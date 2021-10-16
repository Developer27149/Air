import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import { Box, Flex, Badge } from "@chakra-ui/react";
import axios from "axios";
import LeaveMessage from "Components/LeaveMessage.js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ImageMessages({ id }) {
  const { backendBaseUrl } = useSelector((state) => state.basic);
  const dispatch = useDispatch();
  const { comment } = useSelector((state) => state.wallpaper);
  useEffect(() => {
    const getCommentById = async (id) => {
      const { data } = await axios.post(`${backendBaseUrl}/wallpaper/comment`);
      console.log(data);
    };
    if (comment === null || comment?.id !== id) {
      getCommentById(id);
    }
  }, []);
  return (
    <Box
      pos="absolute"
      left="0"
      top="0"
      bottom="0"
      w="max(24vw, 500px)"
      zIndex="1"
      display="flex"
      // justifyContent="center"
      flexDir="column"
      // bg="teal.50"
      bgColor="transparent"
      p="1rem"
      pb="2rem"
    >
      <Flex justify="space-between" align="center">
        <AvatarGroup size="sm" max={7} alignSelf="flex-start">
          <Avatar name="Ryan Florence" src="" />
          <Avatar name="Segun Adebayo" src="" />
          <Avatar name="Kent Dodds" src="" />
          <Avatar name="Prosper Otemuyiwa" src="" />
          <Avatar name="Christian Nwamba" src="" />
        </AvatarGroup>
      </Flex>
      <Box flexGrow="1"></Box>
      <LeaveMessage />
    </Box>
  );
}
