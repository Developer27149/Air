import React, { useRef, useState } from "react";
import { Icon, Box, Text, useDisclosure, Image, Switch } from "@chakra-ui/react";
import { FcPositiveDynamic, FcSettings } from "react-icons/fc";
import { WiSunset } from "react-icons/wi";
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
import { setWallpaper } from "../store/homeSlice.js";
import { setLocation } from "../store/basicSlice.js";

export default function Setting() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wallpaperState = useSelector((state) => state.home.wallpaper);
  const location = useSelector((state) => state.basic.location);
  const [inputLocation, setInputLocation] = useState("");
  const iconRef = useRef();
  const items = [
    {
      icon: FcPositiveDynamic,
      text: "4k 壁纸,首次加载和更换的速度会变慢（取决于网速）",
      status: wallpaperState.raw,
      id: 0,
    },
    {
      icon: WiSunset,
      text: "使用自动定位获取天气信息",
      status: location === "",
      id: 1,
    },
  ];
  const dispatch = useDispatch();
  const handleChangeItem = (index) => {
    items[index].status = !items[index].status;
    switch (index) {
      case 0:
        dispatch(
          setWallpaper({
            ...wallpaperState,
            raw: items[index].status,
          })
        );
        break;
      case 1:
        dispatch(setLocation(items[index].status ? "" : inputLocation));
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Box ref={iconRef} onClick={onOpen}>
        <Icon className={styles.icon} fontSize="24px" margin="8px" as={FcSettings} title="设置" />
      </Box>
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
                  key={item.id}
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
