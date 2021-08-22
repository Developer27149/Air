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
import { FcEmptyTrash, FcSettings, FcAddImage, FcTodoList, FcWorkflow } from "react-icons/fc";
import styles from "../styles/bars.module.sass";
import { setNewImg } from "../store/defaultSlice";
import { useDispatch } from "react-redux";
import { replaceCurrentWallpaper } from "../utils";
import Setting from "./Setting.js";

export default function Bars() {
  const dispatch = useDispatch();
  const handleChangeWallpaper = () => {
    const newImg = replaceCurrentWallpaper();
    dispatch(setNewImg(newImg));
  };
  const handleFixedWallpaper = () => {
    dispatch();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setRef = useRef();
  const { imgArr, historyIdArr } = globalThis.config;
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    console.log(keyword, imgArr);
  }, [keyword]);

  const toast = useToast();

  const handleSelectNewWallpaper = (id) => {
    console.log(id);
    historyIdArr.push(id);
    let newImg;
    const tempArr = [];
    imgArr.map((i) => {
      if (i.id === id) {
        newImg = i;
      } else {
        tempArr.push(i);
      }
    });
    tempArr.shift();
    dispatch(setNewImg(newImg.url));
    toast({
      title: "设置新壁纸",
      description: "网络加载中，等等",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => {
      globalThis.config.imgArr = tempArr;
      globalThis.config.historyIdArr = historyIdArr;
    }, 2000);
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
        bg="teal.50"
        padding=".2rem 1.4rem"
        margin=".2rem auto"
      >
        <Icon
          ref={setRef}
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          as={RiNeteaseCloudMusicFill}
          title="Music - Jay"
          color="pink.400"
        />
        <Icon
          ref={setRef}
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          as={FcAddImage}
          onClick={onOpen}
          title="壁纸"
        />
        <Icon
          ref={setRef}
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          as={BsBookmarks}
          title="书签"
        />
        <Setting />
        <Icon
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          as={FcWorkflow}
          onClick={handleChangeWallpaper}
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
          onClick={handleFixedWallpaper}
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
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>不期而遇</DrawerHeader>
          <DrawerBody>
            <Box>
              <Input
                variant="filled"
                size="sm"
                placeholder="keyword ❤️ search"
                onChange={(e) => setKeyword(e.target.value)}
              />
              {imgArr.length > 1 ? (
                imgArr
                  .slice(1)
                  .filter(
                    (i) =>
                      keyword === "" || (i.description !== null && i.description.includes(keyword))
                  )
                  .map((img) => (
                    <Box
                      pos="relative"
                      margin="12px 0"
                      boxShadow="4px 4px 4px 4px rgba(0, 0, 255, .2)"
                      onClick={() => handleSelectNewWallpaper(img.id)}
                    >
                      <Image src={img.smImgUrl} objectFit="cover" pos="relative" />
                      <Text
                        display="block"
                        color="grey.700"
                        bgColor="white"
                        p="12px"
                        textAlign="center"
                      >
                        {img.description || new Date(img.createAt).toLocaleTimeString()}
                      </Text>
                    </Box>
                  ))
              ) : (
                <Box>
                  <Icon as={FcEmptyTrash} fontSize="24px" padding="1rem" />
                  <Text>真的一张都没了，联系我添加吧🤣</Text>
                </Box>
              )}
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Text>适可而止</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
