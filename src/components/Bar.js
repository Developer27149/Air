import React, { useRef, useState, useEffect } from "react";
import { Text, Box, Input, Icon, Image, useDisclosure, useToast } from "@chakra-ui/react";
import { TiAttachmentOutline } from "react-icons/ti";
import { RiNeteaseCloudMusicFill } from "react-icons/ri";
import { VscDesktopDownload } from "react-icons/vsc";
import { BsBookmarks } from "react-icons/bs";
import { FcHome, FcTodoList, FcWorkflow } from "react-icons/fc";
import { IoAppsOutline } from "react-icons/io5";
import styles from "../styles/bars.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Setting from "./Setting.js";

export default function Bars() {
  const dispatch = useDispatch();
  const wallpaper = useSelector((state) => state.home.wallpaper);
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
        url: wallpaper.downloadUrl,
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
      pos="relative"
    >
      <Box
        display="flex"
        justifyContent="center"
        borderRadius="6px"
        bg="teal.50"
        padding=".2rem 1.4rem"
        margin=".2rem auto"
      >
        <Icon
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          as={FcHome}
          title="默认页面"
          onClick={() => navigatorTo("/")}
        />
        <Icon
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          as={IoAppsOutline}
          color="tomato"
          onClick={() => navigatorTo("/wallpapers")}
          title="壁纸"
        />
        <Icon className={styles.icon} fontSize="24px" margin="8px" as={BsBookmarks} title="书签" />
        <Setting />
        <Icon
          as={FcTodoList}
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          title="搬砖事宜"
          onClick={() => navigatorTo("/about")}
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
