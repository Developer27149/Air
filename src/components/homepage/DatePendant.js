import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";

export default function DatePendant() {
  const [time, setTime] = useState(new Date());
  console.log("渲染时间挂件");
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <Flex
      bg="tomato"
      flexDir="column"
      align="center"
      justify="center"
      borderRadius="4px"
      // bgImage="url('./img/calendar.svg')"
      // bgSize="cover"
      // bgRepeat="no-repeat"
    >
      <Text textAlign="center" fontSize="3xl">
        {time.getDate()}
      </Text>
      <Text textAlign="center">{time.getUTCMonth()}月</Text>
    </Flex>
  );
}
