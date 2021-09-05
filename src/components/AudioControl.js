import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import moment from "moment";
// import momentDurationFromatSetup from "moment-duration-format";

export default function AudioControl({ duration = 100000, curTime = 1, onTimeUpdate }) {
  const curPercentage = (curTime / duration) * 100;
  // 计算点击的位置对应的时间，用于调整进度条
  const calcClickedTime = (e) => {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".bar__progress");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPostionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPostionInBar;
  };

  const handleTimeDrag = (e) => {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove) => {
      onTimeUpdate(calcClickedTime(eMove));
    };
    // 拖动的时候就调整进度，超级屌
    document.addEventListener("mousemove", updateTimeOnMove);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  };

  return (
    <Box
      onMouseDown={(e) => handleTimeDrag(e)}
      bg={`linear-gradient(to right, tomato ${curPercentage}%, rgba(50,60,113,1) 0)`}
      flexGrow="1"
      h="4px"
      cursor="pointer"
      display="flex"
      alignItems="center"
    >
      {/* <Box
        display="inline-block"
        pos="relative"
        w="4px"
        h="4px"
        border="1.5px solid white"
        bg="tomato"
      ></Box> */}
    </Box>
  );
}
