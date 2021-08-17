import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { IoRefreshCircleSharp } from "react-icons/io5";
import { TiAttachmentOutline } from "react-icons/ti";
import { VscSettings } from "react-icons/vsc";
import { MdWallpaper } from "react-icons/md";
import styles from "../styles/bars.module.sass";
import { setNewImg } from "../store/defaultSlice";
import { useDispatch } from "react-redux";
import { replaceCurrentWallpaper } from "../utils";

export default function Bars() {
  const dispatch = useDispatch();
  const handleChangeWallpaper = () => {
    const newImg = replaceCurrentWallpaper();
    dispatch(setNewImg(newImg));
  };
  const handleFixedWallpaper = () => {
    dispatch()
  }
  return (
    <Box
      w="100%"
      display="flex"
      position="absolute"
      bottom=".2rem"
      opacity="0"
      transition="all .5s ease-in-out"
      _hover={{ opacity: 1 }}
    >
      <Box
        display="flex"
        justifyContent="center"
        borderRadius="6px"
        bg="green.50"
        padding=".2rem 1.4rem"
        margin=".2rem auto"
      >
        <Icon className={styles.icon} fontSize="24px" margin="8px" as={MdWallpaper} />
        <Icon className={styles.icon} fontSize="24px" margin="8px" as={VscSettings} />
        <Icon
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          as={IoRefreshCircleSharp}
          onClick={handleChangeWallpaper}
          title="换换口味"
        />
        <Icon
          as={TiAttachmentOutline}
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          title="保持壁纸"
          onClick={handleFixedWallpaper}
        />
      </Box>
    </Box>
  );
}
