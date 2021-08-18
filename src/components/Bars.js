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
import { IoRefreshCircleSharp } from "react-icons/io5";
import { TiAttachmentOutline } from "react-icons/ti";
import { VscSettings } from "react-icons/vsc";
import { MdWallpaper } from "react-icons/md";
import { FcEmptyTrash } from "react-icons/fc";
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
        <Icon
          ref={setRef}
          className={styles.icon}
          fontSize="24px"
          margin="8px"
          as={MdWallpaper}
          onClick={onOpen}
          title="壁纸"
        />
        <Icon className={styles.icon} fontSize="24px" margin="8px" as={VscSettings} title="设置" />
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
