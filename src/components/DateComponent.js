import React, { useState, useEffect } from "react";
import { Box, Text, Heading } from "@chakra-ui/react";

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
    return `${year}年${month}月${day}日`;
  };

  return (
    <Box
      position="fixed"
      top="70%"
      left="50%"
      transform="translate(-50%,-50%)"
      zIndex="9"
      backgroundColor="grey.50"
      opacity=".3"
      borderRadius=".4rem"
      transition="al .4s ease-in-out"
      p="1rem"
      _hover={{
        opacity: 1,
      }}
      textAlign="center"
    >
      <Heading as="h6" color="grey.500">
        哪怕抛掉出身的因素，我觉得你也未必干得过别人。
      </Heading>
      <Text fontSize="xs" color="orange.300" textAlign="right" p="4rem">
        {generateDateStr()}
      </Text>
    </Box>
  );
}
