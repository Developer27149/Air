import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ganzhijinian } from "../utils";

export default function DateComponent() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const generateDateStr = () => {
    let year = time.getFullYear();
    let month = time.getMonth();
    let day = time.getDay();
    return `${ganzhijinian(year)} ${year}.${month}.${day}`;
  };

  return (
    <Box
      position="fixed"
      bottom="1rem"
      right="1rem"
      zIndex="9"
      opacity=".6"
      transition="al .4s ease-in-out"
      _hover={{
        opacity: 1,
      }}
      textAlign="right"
    >
      <Text fontSize="lg" color="white" textAlign="right" p="1rem">
        照顾好自己。
      </Text>
      <Text fontSize="xs" color="white" textAlign="right">
        {generateDateStr()}
      </Text>
    </Box>
  );
}
