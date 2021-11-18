import React from "react";
import { motion } from "framer-motion";
import { Box, Flex, Text } from "@chakra-ui/layout";
import TaskItem from "./TaskItem.js";

export default React.forwardRef(function TaskContainer({ title, tasks = [] }, ref) {
  const handleDragEnter = (e) => {
    e.preventDefault();
  };
  return (
    <motion.div ref={ref}>
      <Box bg="#e6fffa5e" p="1rem" borderRadius="0.5rem" minH="20rem" onDragEnter={handleDragEnter}>
        <Flex justify="space-between" mb="12px">
          <Text fontSize="14px" fontWeight="bold">
            {title}
          </Text>
          <Flex
            borderRadius="50%"
            w="1.2rem"
            h="1.2rem"
            bg="green.200"
            align="center"
            justify="center"
          >
            <Text textAlign="center" color="white">
              {tasks.length}
            </Text>
          </Flex>
        </Flex>
        {tasks.map((task) => (
          <TaskItem data={task} key={task.id} />
        ))}
      </Box>
    </motion.div>
  );
});
