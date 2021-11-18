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

export default function TaskEditComponent({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [textareaText, setTextareaText] = useState("");
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.works.tasks);
  const handleOnSaveText = () => {
    dispatch(
      setTasks(
        tasks.map((task) => {
          if (task.id === data.id) {
            return {
              ...task,
              ...{
                content: {
                  title: data.content.title,
                  text: textareaText,
                },
              },
            };
          }
          return task;
        })
      )
    );
  };

  useEffect(() => {
    setTextareaText(data.content.text);
  }, [data.content.text]);

  return (
    <Box m="0.5rem 0">
      <Box>
        {isEditing ? (
          <Textarea
            fontSize="12px"
            variant="unstyled"
            defaultValue={textareaText}
            onChange={(e) => setTextareaText(e.target.value)}
            minH="6rem"
            mb="0.5rem"
          />
        ) : (
          <Box pb="0.5rem" minH="4rem">
            {textareaText}
          </Box>
        )}
      </Box>
      <Flex style={{ gap: "5px" }}>
        <Icon as={GiPaperClip} />
        <Icon as={VscComment} />
        <Icon as={FcCalendar} />
        <Icon as={RiDeleteBinLine} />
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
    </Box>
  );
}
