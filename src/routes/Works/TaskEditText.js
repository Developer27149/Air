import { IconButton } from "@chakra-ui/button";
import { EditablePreview, useEditableControls, EditableInput, Editable } from "@chakra-ui/editable";
import { VscComment, VscSave } from "react-icons/vsc";
import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { Icon } from "@chakra-ui/icons";
import { GiPaperClip } from "react-icons/gi";
import { TiArrowBackOutline } from "react-icons/ti";
import { RiDeleteBinLine } from "react-icons/ri";
import { FcCalendar } from "react-icons/fc";

export default function TaskEditText({ text }) {
  /* Here's a custom control */
  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
      useEditableControls();

    return (
      <Flex align="center" justify="center" bg="#eeeeee3d" borderRadius="4px" p="3px">
        <Icon as={VscComment} m="0 0.5rem" cursor="pointer" />
        <Icon as={GiPaperClip} m="0 0.5rem" cursor="pointer" />
        <Icon as={RiDeleteBinLine} m="0 0.5rem" cursor="pointer" />
        <Icon as={FcCalendar} m="0 0.5rem" cursor="pointer" />
        {isEditing ? (
          <>
            <Box m="0 0.5rem" cursor="pointer" {...getSubmitButtonProps()}>
              <Icon as={VscSave} />
            </Box>
            <Box m="0 0.5rem" cursor="pointer" {...getCancelButtonProps()}>
              <Icon as={TiArrowBackOutline} />
            </Box>
          </>
        ) : (
          <>
            <Box m="0 0.5rem" cursor="pointer" {...getEditButtonProps()}>
              <Icon as={FiEdit3} />
            </Box>
          </>
        )}
      </Flex>
    );
  }

  return (
    <Editable
      defaultValue={text}
      fontSize="13px"
      isPreviewFocusable={false}
      display="flex"
      flexDir="column"
    >
      <Box flexGrow="1">
        <EditablePreview />
        <EditableInput wordBreak="normal" whiteSpace="normal" />
      </Box>
      <EditableControls />
    </Editable>
  );
}
