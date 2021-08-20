import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ganzhijinian, getMsg } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { setMsg } from "../store/defaultSlice.js";

export default function DateComponent() {
  const [time, setTime] = useState(new Date());
  const msg = useSelector((state) => state.default.msg);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMsg(globalThis.config.msg));
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
    return `${ganzhijinian(year)}年 ${month}月${day}日`;
  };

  const handleChangeMsg = async () => {
    const newMsg = await getMsg();
    console.log(newMsg, "is new msg");
    dispatch(setMsg(newMsg.data));
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
      <Text fontSize="lg" color="white" textAlign="right" p="1rem" onClick={handleChangeMsg}>
        {msg}
      </Text>
      <Text fontSize="xs" color="white" textAlign="right">
        {generateDateStr()}
      </Text>
    </Box>
  );
}
