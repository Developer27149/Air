import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ganzhijinian, getMsg } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { setMsg } from "../store/homeSlice.js";
import { useToast } from "@chakra-ui/react";

export default function DateComponent() {
  const [time, setTime] = useState(new Date());
  const msg = useSelector((state) => state.default.msg);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    msg !== globalThis.settings.msg.text && dispatch(setMsg(globalThis.settings.msg.text));
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
      if (data !== globalThis.settings.msg.text) {
        dispatch(setMsg(data));
        globalThis.settings.msg.text = data;
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
    <Box opacity=".8" textAlign="right" pos="fixed" right="1rem" bottom="1rem">
      <Text
        fontSize="lg"
        color="white"
        textAlign="right"
        p="1rem"
        onClick={handleChangeMsg}
        className="zhanku"
      >
        {msg}
      </Text>
      <Text fontSize="xs" color="white" textAlign="right" className="zhanku">
        {generateDateStr()}
      </Text>
    </Box>
  );
}
