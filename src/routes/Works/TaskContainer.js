import React from "react";
import { motion } from "framer-motion";
import { Box, Flex, Text } from "@chakra-ui/layout";
import TaskItem from "./TaskItem.js";

export default function TaskContainer({ title, tasks = [] }) {
  return (
    <motion.div>
      <Box bg="#e6fffa5e" margin="14px" p="1rem" borderRadius="0.5rem">
        <Flex justify="space-between">
          <Text fontSize="15px">{title}</Text>
          <Box borderRadius="50%" w="1.2rem" h="1.2rem" bg="green.300" color="white">
            <Text align="center">{tasks.length}</Text>
          </Box>
        </Flex>
        {tasks.map((task) => (
          <TaskItem data={task} />
        ))}
      </Box>
    </motion.div>
  );
}
