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
      backgroundColor="black"
      opacity=".5"
      borderRadius=".4rem"
      transition="al .4s ease-in-out"
      _hover={{
        opacity: 0.8,
      }}
      textAlign="center"
      margin="1rem"
      p="4px 12px"
      margin="1rem"
    >
      <Box fontSize="sm" color="white" fontWeight="bold">
        {time.getHours() > 9 ? time.getHours() : `0${time.getHours()}`}
        <Text display="inline-block" animation="" p="0 3px">
          :
        </Text>
        {time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`}
      </Box>
      <Weather />
    </Box>
  );
}
