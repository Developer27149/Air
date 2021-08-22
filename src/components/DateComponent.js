import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ganzhijinian, getMsg } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { setMsg } from "../store/defaultSlice.js";
import { useToast } from "@chakra-ui/react";

export default function DateComponent() {
  const [time, setTime] = useState(new Date());
  const msg = useSelector((state) => state.default.msg);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    msg !== globalThis.config.msg && dispatch(setMsg(globalThis.config.msg));
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const generateDateStr = () => {
    const arr = time.toLocaleDateString().split("/");
    let year = arr[0];
    let month = arr[1];
    let day = arr[2];
    return `${ganzhijinian(year)}年 ${month}月${day}日`;
  };

  const handleChangeMsg = async () => {
    try {
      const data = await getMsg();
      if (data !== globalThis.config.msg) {
        dispatch(setMsg(data));
        globalThis.config.msg = data;
      }
    } catch (error) {
      console.log("error:", error);
      toast({
        title: "Tip",
        description: "网络异常",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box position="fixed" bottom="1rem" right="1rem" zIndex="9" opacity=".6" textAlign="right">
      <Text fontSize="lg" color="white" textAlign="right" p="1rem" onClick={handleChangeMsg}>
        {msg}
      </Text>
      <Text fontSize="xs" color="white" textAlign="right">
        {generateDateStr()}
      </Text>
    </Box>
  );
}
