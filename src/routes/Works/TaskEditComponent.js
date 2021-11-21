import Icon from "@chakra-ui/icon";
import { Box, Flex } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React, { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { GiPaperClip } from "react-icons/gi";
import { TiArrowBackOutline } from "react-icons/ti";
import { RiDeleteBinLine } from "react-icons/ri";
import { FcCalendar } from "react-icons/fc";
import { VscComment, VscSave } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "Store/worksSlice.js";
import { useDisclosure } from "@chakra-ui/hooks";
import AddComment from "./AddComment.js";

export default function TaskEditComponent({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [textareaText, setTextareaText] = useState("");
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const tasks = useSelector((state) => state.works.tasks);
  const modifyItemProperty = (keyStr, value) => {
    dispatch(
      setTasks(
        tasks.map((task) => {
          if (task.id === data.id) {
            return {
              ...task,
              [keyStr]: value,
            };
          }
          return task;
        })
      )
    );
  };
  const handleOnSaveText = () => {
    modifyItemProperty("content", {
      title: data.content.title,
      text: textareaText,
    });
  };

  const handleReverseFixed = () => {
    modifyItemProperty("isFixed", !data.isFixed);
  };

  const handleAddComment = (text) => {
    if (text.trim().length > 0) {
      modifyItemProperty("comments", [...data.comments, text.trim()]);
    }
  };

  const handleDelTask = () => {
    dispatch(setTasks(tasks.filter((t) => t.id !== data.id)));
  };

  useEffect(() => {
    setTextareaText(data.content.text);
  }, [data.content.text]);

  return (
    <Box m="0.5rem 0" pos="relative">
      <Box>
        {isEditing ? (
          <Textarea
            fontSize="12px"
            variant="unstyled"
            defaultValue={textareaText}
            onChange={(e) => setTextareaText(e.target.value)}
            minH="4rem"
            mb="0.5rem"
          />
        ) : (
          <Box pb="0.5rem" minH="2rem">
            {textareaText}
          </Box>
        )}
      </Box>
      <Flex
        style={{ gap: "5px" }}
        opacity={isEditing ? 1 : 0}
        _hover={{
          opacity: 1,
        }}
        pos="absolute"
        left="0"
        right="0"
        bottom="-8px"
        align="flex-end"
      >
        <Icon as={GiPaperClip} onClick={handleReverseFixed} />
        <Icon as={VscComment} onClick={onOpen} />
        <Icon as={FcCalendar} />
        <Icon as={RiDeleteBinLine} onClick={handleDelTask} />
        {isEditing ? (
          <>
            <Icon
              as={VscSave}
              onClick={() => {
                setIsEditing(false);
                handleOnSaveText();
              }}
            />
            <Icon
              as={TiArrowBackOutline}
              onClick={() => {
                setIsEditing(false);
                setTextareaText(data.content.text);
              }}
            />
          </>
        ) : (
          <>
            <Icon as={FiEdit3} onClick={() => setIsEditing(true)} />
          </>
        )}
      </Flex>
      <AddComment isOpen={isOpen} onClose={onClose} addComment={handleAddComment} />
    </Box>
  );
}
