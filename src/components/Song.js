import { Image } from "@chakra-ui/image";
import { Box, Text } from "@chakra-ui/layout";
import Icon from "@chakra-ui/icon";
import React, { useEffect, useState } from "react";
import AudioControl from "./AudioControl.js";
import { formatDuration } from "Utils/index.js";
import { FcFlashOn } from "react-icons/fc";
import { BiPause, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { MdRepeat, MdRepeatOne } from "react-icons/md";
import { RiPlayListLine } from "react-icons/ri";
import { BsPlay } from "react-icons/bs";
import useAudioPlayer from "Hooks/useAudioPlayer.js";

export default function Song(props) {
  const {
    songName = "一路向北",
    artist = "Jay",
    picUrl = "http://p4.music.126.net/Gd-HAk9hKC85L0wNtfRs1g==/7946170535396804.jpg",
    url = "",
  } = props;
  const { curTime, duration, playing, setPlaying, setClickendTime, setCurTime, setDuration } = useAudioPlayer(url);
  const [isLoop, setIsLoop] = useState(false);
  const [playTime, setPlayTime] = useState(new Date().getTime());

  useEffect(() => {

  }, [url]);

  const handleSwitchPlayAndPause = (isPlaying) => {
    const _time = new Date().getTime();
    if (_time - playTime > 300) {
      setPlaying(!isPlaying);
      setPlayTime(_time);
    }
  };

  return (
    <Box flexGrow="1">
      <AudioControl
        curTime={curTime}
        duration={duration}
        url={url}
        onTimeUpdate={(time) => setClickendTime(time)}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Image src={picUrl} w="96px" h="96px" border="1px solid white" />
        <Box display="flex" flexDir="column" p="1rem">
          <Text userSelect="none" fontSize="md" color="tomato" textAlign="center">
            {songName}
          </Text>
          <Text userSelect="none" fontSize="sm" color="teal.100" textAlign="center">
            {artist}
          </Text>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" flexGrow="1">
          <Icon as={BiSkipPrevious} fontSize="1.6rem" color="tomato" cursor="pointer" />
          {playing ? (
            <Icon
              as={BiPause}
              fontSize="2.6rem"
              color="tomato"
              cursor="pointer"
              onClick={() => handleSwitchPlayAndPause(playing)}
            />
          ) : (
            <Icon
              as={BsPlay}
              fontSize="2.6rem"
              color="tomato"
              cursor="pointer"
              onClick={() => handleSwitchPlayAndPause(playing)}
            />
          )}
          <Icon as={BiSkipNext} fontSize="1.6rem" color="tomato" cursor="pointer" />
        </Box>
        <Box p="0 1rem">
          <Icon as={RiPlayListLine} fontSize="1rem" color="tomato" cursor="pointer" />
        </Box>
        <Box p="0 1rem">
          {isLoop ? (
            <Icon
              as={MdRepeatOne}
              fontSize="1rem"
              color="tomato"
              onClick={() => setIsLoop(!isLoop)}
              cursor="pointer"
            />
          ) : (
            <Icon
              as={MdRepeat}
              fontSize="1rem"
              color="tomato"
              onClick={() => setIsLoop(!isLoop)}
              cursor="pointer"
            />
          )}
        </Box>
        <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" p="1rem">
          <Text userSelect="none" color="white">
            {formatDuration(curTime)}
          </Text>
          <Icon as={FcFlashOn} fontSize=".8rem" color="tomato" />
          <Text userSelect="none" color="white">
            {formatDuration(duration)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
