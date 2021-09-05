import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
const MotionImg = motion(Image);

export default function Music() {
  const backendBaseUrl = useSelector((state) => state.basic.backendBaseUrl);
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${backendBaseUrl}/songs`);
      console.log(data);
      setSongs(data.result);
    };
    getData();
  }, []);
  return (
    <Box bgColor="black" pos="fixed" left="0" right="0" bottom="0" top="0" zIndex="999" d="flex">
      {songs.length > 0 &&
        songs.map((song) => {
          return (
            <MotionImg
              objectFit="cover"
              key={song.id}
              src={song.picUrl}
              w="120px"
              h="120px"
              bgColor="purple.200"
              margin=".2rem"
              animate={{
                rotateX: ["0deg", "180deg", "0deg"],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                loop: Infinity,
                repeatDelay: ~~(Math.random() * 5) + 5,
                delay: ~~(Math.random() * 5) + 5,
              }}
              whileHover={{ scale: 1.1 }}
            />
          );
        })}
    </Box>
  );
}
