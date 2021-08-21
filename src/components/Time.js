import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import Weather from "./Weather.js";

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

  return (
    <Box
      position="fixed"
      top="1rem"
      left="1rem"
      zIndex="9"
      backgroundColor="black"
      opacity=".2"
      borderRadius=".4rem"
      transition="al .4s ease-in-out"
      _hover={{
        opacity: 0.7,
      }}
      textAlign="center"
      p="4px"
    >
      <Text fontSize="sm" color="white" fontWeight="bold" w="72px">
        {time.getHours() > 9 ? time.getHours() : `0${time.getHours()}`}
        <Text display="inline-block" opacity={time.getSeconds() % 2 === 0 ? 0 : 1} p="0 3px">
          :
        </Text>
        {time.getHours() > 9 ? time.getHours() : `0${time.getHours()}`}
      </Text>
      <Weather />
    </Box>
  );
}
