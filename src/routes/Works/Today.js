import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@chakra-ui/layout";
import TaskContainer from "./TaskContainer.js";
import useTask from "Hooks/useTask.js";
import { setDragPosArr } from "Store/dragSlice.js";

export default function Today() {
  const tasks = useSelector((state) => state.works.tasks);
  const [{ initTask, inProgressTask, finishTask }] = useTask(tasks);
  const initTaskContainerRef = useRef(null);
  const inProgressTaskContainerRef = useRef(null);
  const finishTaskContainerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const initCirclePosArr = () => {
      // 得到中心点之后，计算拖动元素的中心点，比较出最靠近的外层容器
      dispatch(
        setDragPosArr(
          [initTaskContainerRef, inProgressTaskContainerRef, finishTaskContainerRef].map(
            (i, idx) => {
              const container = i.current;
              const rectDataObj = container.getBoundingClientRect();
              const posX = rectDataObj.left + rectDataObj.width / 2;
              const posY = rectDataObj.top + rectDataObj.height / 2;
              const status = ["init", "doing", "finish"][idx];
              return { posX, posY, idx, status };
            }
          )
        )
      );
    };
    window.addEventListener("resize", initCirclePosArr);
    initCirclePosArr();
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
      <Grid gridTemplateColumns="repeat(3, 1fr)" gap="4" maxW="100%" minH="100%">
        <TaskContainer bg="#e6fffa5e" title="新任务" tasks={initTask} ref={initTaskContainerRef} />
        <TaskContainer
          bg="#e6fffaa3"
          title="进行中..."
          tasks={inProgressTask}
          ref={inProgressTaskContainerRef}
        />
        <TaskContainer
          bg="#e6fffaff"
          title="完成！"
          tasks={finishTask}
          ref={finishTaskContainerRef}
        />
      </Grid>
    </motion.div>
  );
}
