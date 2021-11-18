import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import TaskContainer from "./TaskContainer.js";
import useTask from "Hooks/useTask.js";
import { setCirclePosArr } from "Store/worksSlice.js";

export default function Today() {
  const tasks = useSelector((state) => state.works.tasks);
  const [{ initTask, inProgressTask, finishTask }] = useTask(tasks);
  const initTaskContainerRef = useRef(null);
  const inProgressTaskContainerRef = useRef(null);
  const finishTaskContainerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("resize", () => {
      // 得到中心点之后，计算拖动元素的中心点，比较出最靠近的外层容器
      dispatch(
        setCirclePosArr(
          [initTaskContainerRef, inProgressTaskContainerRef, finishTaskContainerRef].map(
            (i, idx) => {
              const container = i.current;
              const rectDataObj = container.getBoundingClientRect();
              const posX = rectDataObj.left + rectDataObj.width / 2;
              const posY = rectDataObj.top + rectDataObj.height / 2;
              return { posX, posY, idx };
            }
          )
        )
      );
    });
  }, []);

  return (
    <motion.div
      style={{
        position: "relative",
        top: "1rem",
      }}
      animate={{
        top: 0,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <Grid gridTemplateColumns="repeat(3, 1fr)" gap="4" maxW="100%">
        <TaskContainer title="新任务" tasks={initTask} ref={initTaskContainerRef} />
        <TaskContainer title="进行中..." tasks={inProgressTask} ref={inProgressTaskContainerRef} />
        <TaskContainer title="完成！" tasks={finishTask} ref={finishTaskContainerRef} />
      </Grid>
    </motion.div>
  );
}
