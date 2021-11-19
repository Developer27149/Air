import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Flex } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icons";
import { GiPaperClip } from "react-icons/gi";
import TaskEditComponent from "./TaskEditComponent.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTasks } from "Store/worksSlice.js";
const MBox = motion(Box);

export default function TaskItem({ data }) {
  console.log("render item");
  const [isDraging, setIsDraging] = useState(false);
  const dragPosArr = useSelector((state) => state.dragEvent.posArr);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.works.tasks);

  const onDragEnd = (e) => {
    e.preventDefault();
    // 每次拖动结束都去检查 idx ，看看靠近谁就放到谁的下面挂着，并修改状态
    const x = e.clientX;
    const y = e.clientY;
    const sortedArr = dragPosArr
      .map((i) => {
        const { posX, posY, idx, status } = i;
        return {
          idx,
          status,
          distance: Math.sqrt((posX - x) ** 2 + (posY - y) ** 2),
        };
      })
      .filter((i) => i.status !== data.status)
      .sort((prev, next) => prev.distance - next.distance);
    if (
      (sortedArr[0].idx === 0 && data.status !== "init") ||
      (sortedArr[0].idx === 1 && data.status !== "doing") ||
      (sortedArr[0].idx === 2 && data.status !== "finish")
    ) {
      dispatch(
        setTasks(
          tasks.map((task) => {
            if (data.id === task.id)
              return {
                ...task,
                status: ["init", "doing", "finish"][sortedArr[0].idx],
                isFixed: false,
              };
            return task;
          })
        )
      );
    } else {
      console.log("here");
    }
    setIsDraging(false);
  };

  const onDragBegin = () => {
    setIsDraging(true);
  };

  return (
    <MBox
      style={{
        background: "white",
        padding: "6px 10px",
        borderRadius: "8px",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        margin: "1rem 0",
      }}
      drag={data.isFixed ? undefined : "x"}
      whileDrag={{ scale: 1.1, zIndex: 10 }}
      onDragEnd={onDragEnd}
      onDragStart={onDragBegin}
      animate={isDraging ? onTop : flat}
    >
      <Flex justify="flex-start" mb="0.5rem" align="center">
        <Box
          w="8px"
          h="8px"
          borderRadius="50%"
          bg={
            data.status === "init" ? "teal.200" : data.status === "doing" ? "tomato" : "purple.600"
          }
        ></Box>
        <Text fontSize="14px" flexGrow="1" pl="0.5rem">
          {data.content.title}
        </Text>
        {data.isFixed ? <Icon as={GiPaperClip} boxSize="14px" /> : null}
      </Flex>
      <Box>
        <TaskEditComponent data={data} />
      </Box>
    </MBox>
  );
}

// Spring configs
const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 },
};
