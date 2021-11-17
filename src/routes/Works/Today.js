import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import TaskContainer from "./TaskContainer.js";

export default function Today() {
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
        <TaskContainer title="新任务" tasks={[]} />
        <TaskContainer title="进行中..." tasks={[]} />
        <TaskContainer title="完成！" tasks={[]} />
      </Grid>
    </motion.div>
  );
}
