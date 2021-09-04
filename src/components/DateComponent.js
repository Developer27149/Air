import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ganzhijinian } from "Utils/index.js";
import useMessage from "Hooks/useMessage";

export default function DateComponent() {
  const msg = useMessage();
  const generateDateStr = () => {
    const dateObj = new Date();
    return `${ganzhijinian(dateObj.getFullYear())} ${dateObj
      .toLocaleDateString()
      .replaceAll("/", ".")}`;
  };

  return (
    <Box opacity=".8" textAlign="right" pos="fixed" right="1rem" bottom="1rem" zIndex="99">
      <Text fontSize="lg" color="white" textAlign="right" p="1rem" className="zhanku">
        {msg}
      </Text>
      <Text fontSize="xs" color="white" textAlign="right" className="zhanku">
        {generateDateStr()}
      </Text>
    </Box>
  );
}
