import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Audio from "Components/Audio.js";
const MotionImg = motion(Image);

export default function Music() {
  const [rotateIndex, setRotateIndex] = useState(0);
  const backendBaseUrl = useSelector((state) => state.basic.backendBaseUrl);
  const [songs, setSongs] = useState([]);
  const [curSong, setCurSong] = useState({
    picUrl: "./instant_crush.jpg",
    url: "./song.mp3",
    artist: "Daft Punk / Julian ",
    songName: "Instant Crush",
  });

  useEffect(() => {
    let timer;
    const getData = async () => {
      const { data } = await axios(`${backendBaseUrl}/songs`);
      console.log(data);
      setSongs(data.result);
      timer = setInterval(() => {
        setRotateIndex(~~(Math.random() * data.result.length - 1));
      }, 3000);
    };
    getData();
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box
      bgColor="black"
      pos="fixed"
      left="0"
      right="0"
      bottom="0"
      top="0"
      zIndex="999"
      background="radial-gradient(circle, rgba(50,60,113,1) 0%, rgba(26,32,32,1) 100%)"
    >
      <Box
        h="80vh"
        d="flex"
        justifyContent="flex-start"
        alignContent="flex-start"
        flexWrap="wrap"
        overflowY="scroll"
        marginRight="-17px"
      >
        {songs.length > 0 &&
          songs.map((song, index) => {
            return (
              <MotionImg
                onClick={() => setCurSong(song)}
                objectFit="cover"
                key={song.id}
                src={song.picUrl}
                w="10vw"
                h="10vw"
                bgColor="black"
                animate={
                  rotateIndex === index && {
                    rotateX: ["0deg", "180deg", "0deg"],
                  }
                }
                transition={
                  rotateIndex === index && {
                    duration: 2,
                    ease: "easeInOut",
                    // loop: Infinity,
                    // repeatDelay: ~~(Math.random() * 5) + 5,
                    // delay: ~~(Math.random() * 5) + 5,
                    delay: 2,
                  }
                }
              />
            );
          })}
      </Box>
      <Audio data={curSong} />
    </Box>
  );
}
