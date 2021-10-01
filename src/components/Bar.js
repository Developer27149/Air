import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  Box,
  Input,
  Icon,
  Image,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useToast,
} from "@chakra-ui/react";
import { TiAttachmentOutline } from "react-icons/ti";
import { RiNeteaseCloudMusicFill } from "react-icons/ri";
import { VscDesktopDownload } from "react-icons/vsc";
import { BsBookmarks } from "react-icons/bs";
import { FcAddImage, FcTodoList, FcWorkflow } from "react-icons/fc";
import styles from "../styles/bars.module.sass";
import { useDispatch } from "react-redux";
import { replaceCurrentWallpaper } from "../utils";
import { useHistory } from "react-router";
import Setting from "./Setting.js";

export default function Bars() {
  const dispatch = useDispatch();
  const history = useHistory();
  const navigatorTo = (url) => {
    history.replace(url);
  };

  const handleFixedWallpaper = () => {
    dispatch();
  };

  const handleDownloadWallpaper = () => {
    console.log(chrome.downloads, chrome);
    chrome.downloads.download(
      {
        method: "GET",
        url: globalThis.config.imgArr[0].url,
      },
      (id) => {
        console.log(id, "download event");
      }
    );
  };

  return (
    <Box
      w="100%"
      display="flex"
      opacity="0"
      transition="all .5s ease-in-out"
      _hover={{ opacity: 1 }}
      zIndex="99"
    >
      <Box
        display="flex"
        justifyContent="center"
        borderRadius="6px"
        bg="teal.50"
        padding=".2rem 1.4rem"
        margin=".2rem auto"
      >
        <Box
          w="24px"
          h="24px"
          margin="8px"
          backgroundImage="url(icons/48.png)"
          backgroundSize="cover"
          onClick={() => navigatorTo("/")}
          cursor="pointer"
        ></Box>
        <Icon
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          as={RiNeteaseCloudMusicFill}
          title="Music - Jay"
          color="pink.400"
          onClick={() => navigatorTo("/music")}
        />
        <Icon
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          as={FcAddImage}
          onClick={() => navigatorTo("/wallpapers")}
          title="壁纸"
        />
        <Icon className={styles.icon} fontSize="24px" margin="8px" as={BsBookmarks} title="书签" />
        <Setting />
        <Icon
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          as={FcWorkflow}
          // onClick={handleChangeWallpaper}
          title="换换口味"
        />
        <Icon
          as={TiAttachmentOutline}
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          title="保持壁纸"
          color="blue.200"
          onClick={handleFixedWallpaper}
        />
        <Icon
          as={FcTodoList}
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          title="搬砖事宜"
          onClick={() => navigatorTo("/todos")}
        />
        <Icon
          as={VscDesktopDownload}
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          title="下载当前壁纸"
          onClick={handleDownloadWallpaper}
          color="purple.200"
        />
      </Box>
    </Box>
  );
}
