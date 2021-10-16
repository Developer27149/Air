import { Avatar } from "@chakra-ui/avatar";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { useSelector } from "react-redux";
import { Icon } from "@chakra-ui/react";
import { BiMessageDetail } from "react-icons/bi";

export default function LeaveMessage() {
  const { profile } = useSelector((state) => state.profile);
  return (
    <Flex
      justify="center"
      align="center"
      bgColor="gray.200"
      borderRadius=".5rem"
      p=".8rem"
      pl="1.2rem"
    >
      <Avatar src={profile.avatar} name={profile.username} p="1rem" size="sm" />
      <Input border="none" placeholder="啊这..." flexGrow="1" p=".6rem 1rem" />
      <Icon as={BiMessageDetail} color="purple.400" fontSize="1.3rem" m=".2rem" cursor="pointer" />
    </Flex>
  );
}
