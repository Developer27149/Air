import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flex } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icons";
import { GiPaperClip } from "react-icons/gi";
import TaskEditComponent from "./TaskEditComponent.js";
import { useSelector } from "react-redux";
const MBox = motion(Box);

export default function TaskItem({ data }) {
  const circlePosArr = useSelector((state) => state.works.circlePosArr);
  const onDragToOtherColumn = (e) => {
    e.preventDefault();
    // 每次拖动结束都去检查 idx ，看看靠近谁就放到谁的下面挂着，并修改状态
    const x = e.clientX;
    const y = e.clientY;
    const sortedArr = circlePosArr
      .map((i) => {
        const { posX, posY, idx } = i;
        return {
          idx,
          distance: Math.sqrt((posX - x) ** 2 + (posY - y) ** 2),
        };
      })
      .sort((prev, next) => prev.distance - next.distance);
    console.log(sortedArr);
  };
  return (
    <MBox
      style={{
        background: "white",
        padding: "6px 10px",
        borderRadius: "8px",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
      drag={true}
      onDragEnd={onDragToOtherColumn}
    >
      <Flex justify="flex-start" mb="0.5rem" align="center">
        <Box
          w="8px"
          h="8px"
          borderRadius="50%"
          bg={data.status === "init" ? "teal.200" : data.status === "doing" ? "tomato" : "orange"}
        ></Box>
        <Text fontSize="14px" flexGrow="1" pl="0.5rem">
          {data.content.title}
        </Text>
        {data.isFixed ? <Icon as={GiPaperClip} cursor="pointer" boxSize="14px" /> : null}
      </Flex>
      <Box>
        <TaskEditComponent data={data} />
      </Box>
    </MBox>
  );
}
