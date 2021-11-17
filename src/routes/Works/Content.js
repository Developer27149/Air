import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useSelector } from "react-redux";
import Today from "./Today.js";
import Month from "./Month.js";
import Finish from "./Finish.js";
import Forget from "./Forget.js";
import AllTasks from "./AllTasks.js";
import SearchTask from "./SearchTask.js";
import { getCurWeekStr, getRandomEmojiFromWeekDay } from "Utils/index.js";
const menuItemArr = [<Today />, <Month />, <Finish />, <Forget />, <AllTasks />];

export default function Content() {
  const workState = useSelector((state) => state.works);
  return (
    <Box flexGrow="1" bg="white" borderLeft="solid 1px #80808014" p="12px" borderRightRadius="16px">
      <Flex justify="space-between">
        <SearchTask />
        <Text fontSize="1.4rem" fontWeight="500" textAlign="right" m="0.5rem">
          {getCurWeekStr()}
          {getRandomEmojiFromWeekDay()}
        </Text>
      </Flex>
      {menuItemArr[workState.activeMenuItemId - 1]}
    </Box>
  );
}
