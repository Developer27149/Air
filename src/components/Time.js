import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Time() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const generateTimeStr = () => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Box
      position="fixed"
      top="1rem"
      left="1rem"
      zIndex="9"
      backgroundColor="white"
      opacity=".3"
      borderRadius=".4rem"
      transition="al .4s ease-in-out"
      _hover={{
        opacity: 1,
      }}
      textAlign="center"
      p="4px"
    >
      <Text fontSize="sm" color="purple.400" w="72px">
        {generateTimeStr()}
      </Text>
    </Box>
  );
}
