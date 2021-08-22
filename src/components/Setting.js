import React, { useRef } from "react";
import { Icon, Box, Text, useDisclosure, Image, Switch } from "@chakra-ui/react";
import { FcPositiveDynamic, FcSettings } from "react-icons/fc";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import styles from "../styles/bars.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { setUseRawWallpaper } from "../store/defaultSlice.js";

export default function Setting() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const rawWallpaper = useSelector((state) => state.default.rawWallpaper);
  const iconRef = useRef();
  const items = [
    {
      icon: FcPositiveDynamic,
      text: "4k 壁纸,首次加载和更换的速度会变慢（取决于网速）",
      status: rawWallpaper === "raw",
    },
    {
      icon: FcPositiveDynamic,
      text: "使用自动定位获取天气信息",
      status: rawWallpaper === "raw",
    },
  ];
  const dispatch = useDispatch();
  const handleChangeItem = (index) => {
    items[index].status = !items[index].status;
    dispatch(setUseRawWallpaper(items[index].status ? "raw" : "auto"));
  };

  return (
    <>
      <Icon
        className={styles.icon}
        fontSize="24px"
        margin="8px"
        as={FcSettings}
        title="设置"
        ref={iconRef}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={iconRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader display="flex" alignItems="center">
            <Icon as={FcSettings} />
          </DrawerHeader>
          <DrawerBody bg="#grey.50" p="0" m="0">
            {items.map((item, index) => {
              return (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bg={index === 0 ? "white" : "#grey.100"}
                  minH="4rem"
                  p=".6rem"
                  transition="all .4s ease-in-out"
                  _hover={{
                    bg: "purple.50",
                  }}
                >
                  <Icon as={item.icon} className={styles.icon} fontSize="18px" />
                  <Text p=".2rem 1rem" fontFamily="sans-serif" flexGrow="1">
                    {item.text}
                  </Text>
                  <Switch size="sm" value={item.status} onChange={() => handleChangeItem(index)} />
                </Box>
              );
            })}
          </DrawerBody>
          <DrawerFooter d="flex" flexDir="column" alignItems="flex-end" bg="white" p="1.6rem">
            <Text textAlign="right">联系作者：</Text>
            <Image src="wechat.jpeg" w="8rem" h="9rem" p="1rem" />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
