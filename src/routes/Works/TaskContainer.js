import React, { useState } from "react";
import { motion } from "framer-motion";
import { Box, Flex, Text } from "@chakra-ui/layout";
import TaskItem from "./TaskItem.js";
import Icon from "@chakra-ui/icon";
import { IoAdd } from "react-icons/io5";
import AddTask from "./AddTask.js";
import { useDisclosure } from "@chakra-ui/hooks";
import { useDispatch } from "react-redux";
import { setTasks } from "Store/worksSlice.js";

export default React.forwardRef(function TaskContainer({ title, status, bg, tasks = [] }, ref) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleReverseDatePickerStatus = () => {
    setShowDatePicker(!showDatePicker);
    onOpen();
  };
  const dispatch = useDispatch();
  return (
    <motion.div ref={ref}>
      <Box bg={bg} p="1rem" borderRadius="0.5rem" minH="100%">
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
          <Flex>
            <Icon
              as={IoAdd}
              fontSize="14px"
              cursor="pointer"
              _hover={{
                transform: "scale(1.4)",
              }}
              transition="all 0.7s ease-in-out"
              onClick={handleReverseDatePickerStatus}
            />
            <AddTask
              onClose={onClose}
              isOpen={isOpen}
              status={status}
              addTask={(v) => {
                dispatch(setTasks([...tasks, v]));
              }}
            />
          </Flex>
        </Flex>
        {tasks.map((task) => (
          <TaskItem data={task} key={task.id} />
        ))}
      </Box>
    </motion.div>
  );
});
