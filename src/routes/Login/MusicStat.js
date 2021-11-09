import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Box, Text, Flex } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { IoPauseOutline, IoPlayOutline } from "react-icons/io5";
import { getRandomMusic } from "Utils/request.js";

export default function MusicStat() {
  const [isPlay, setIsPlay] = useState(false);
  const [isCanPlay, setIsCanPlay] = useState(false);
  const [song, setSong] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const getSong = async () => {
      const res = await getRandomMusic();
      console.log(res);
      setSong(res.data.data);
    };
    getSong();
  }, []);
  const handleControl = (play) => () => {
    setIsPlay(play);
    if (audioRef.current) {
      if (play) {
        audioRef.current.volume = 0.5;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };
  const handleCanPlay = () => setIsCanPlay(true);
  const handlePlay = handleControl(true);
  const handlePause = handleControl(false);

  return (
    <Flex height="100%" borderRadius=".4rem" justify="center" align="center">
      <Image src="/img/music.png" objectFit="cover" />
      <Text
        pos="absolute"
        bottom="0"
        left="0"
        right="0"
        p="0.3rem"
        textAlign="center"
        fontSize="1rem"
        backdropFilter="blur(2)"
        bgColor="rgba(255,255,255,.2)"
        color="gray.600"
      >
        🎧&nbsp;:&nbsp;&nbsp;{song ? song.songName : ""}
      </Text>
      {isCanPlay && (
        <Box
          pos="absolute"
          top="1rem"
          right="1rem"
          bg="whiteAlpha.300"
          opacity=".7rm"
          border="1px dashed gray"
          p="0.5rem"
          borderRadius="50%"
        >
          {!isPlay ? (
            <Icon
              onClick={handlePlay}
              as={IoPlayOutline}
              color="tomato"
              fontSize="1.2rem"
              cursor="pointer"
            />
          ) : (
            <Icon
              onClick={handlePause}
              as={IoPauseOutline}
              color="tomato"
              fontSize="1.2rem"
              cursor="pointer"
            />
          )}
        </Box>
      )}
      {song && (
        <audio
          loop
          preload="true"
          ref={audioRef}
          src={song?.downloadUrl}
          onCanPlay={handleCanPlay}
        />
      )}
    </Flex>
  );
}
