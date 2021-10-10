import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ganzhijinian } from "Utils/index.js";
import useMessage from "Hooks/useMessage";

export default function DateAndMessage() {
  const { data, fontSize } = useMessage();
  const generateDateStr = () => {
    const dateObj = new Date();
    return `${ganzhijinian(dateObj.getFullYear())} ${dateObj
      .toLocaleDateString()
      .replaceAll("/", ".")}`;
  };

  return (
    <Box opacity=".8" textAlign="right" pos="fixed" right="1rem" bottom="1rem" zIndex="99">
      <Text fontSize={fontSize} color="white" textAlign="right" p="1rem">
        {data}
      </Text>
      <Text fontSize="md" color="white" textAlign="right">
        {generateDateStr()}
      </Text>
    </Box>
  );
}
