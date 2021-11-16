import useAudioPlayer from "Hooks/useAudioPlayer.js";
import React, { useRef } from "react";
import { Flex } from "@chakra-ui/layout";
import Icon from "@chakra-ui/icon";
import { MdPause } from "react-icons/md";
import { BsPlay } from "react-icons/bs";
import { CircularProgress } from "@chakra-ui/progress";

export default React.memo(function CircleMusic({ customStyle = {} }) {
  const style = {
    ...{
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      padding: "8px",
      background: "white",
      iconBoxSize: "2rem",
    },
    ...customStyle,
  };
  const audioRef = useRef(null);
  const { isCanplay, switchStatus, isPause, currentProgressPercent } = useAudioPlayer(audioRef);
  return (
    <Flex
      align="center"
      justify="center"
      style={style}
      onClick={switchStatus}
      opacity={isCanplay ? 1 : 0}
      transition="transform 0.4s ease-in-out"
      _hover={{
        transform: "scale(1.2)",
      }}
    >
      <Icon
        as={isPause ? BsPlay : MdPause}
        boxSize={style.iconBoxSize}
        cursor="pointer"
        color="teal.200"
      />
      <CircularProgress
        value={currentProgressPercent}
        color="#9e41cd"
        size={style.width}
        thickness="4px"
        left="0"
        top="0"
        right="0"
        bottom="0"
        pos="absolute"
      />
      <audio ref={audioRef} pos="relative" />
    </Flex>
  );
});
