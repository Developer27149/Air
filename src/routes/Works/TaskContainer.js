import React from "react";
import { motion } from "framer-motion";
import { Box, Flex, Text } from "@chakra-ui/layout";
import TaskItem from "./TaskItem.js";
import Icon from "@chakra-ui/icon";
import { IoAdd } from "react-icons/io5";

export default React.forwardRef(function TaskContainer({ title, bg, tasks = [] }, ref) {
  const handleDragEnter = (e) => {
    e.preventDefault();
  };
  return (
    <motion.div ref={ref}>
      <Box bg={bg} p="1rem" borderRadius="0.5rem" minH="100%" onDragEnter={handleDragEnter}>
        <Flex justify="space-between" align="center" mb="12px">
          <Text
            fontSize="14px"
            fontWeight="bold"
            _after={{
              content: `'${tasks.length}'`,
              borderRadius: "3px",
              backgroundColor: "#91e5a3",
              color: "white",
              padding: "0px 4px",
              fontSize: "10px",
              marginLeft: "6px",
            }}
          >
            {title}
          </Text>
          <Icon as={IoAdd} fontSize="12px" />
        </Flex>
        {tasks.map((task) => (
          <TaskItem data={task} key={task.id} />
        ))}
      </Box>
    </motion.div>
  );
});
