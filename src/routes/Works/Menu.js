import { Image, Button, Box } from "@chakra-ui/react";
import React, { useCallback, useRef } from "react";
import { Flex, Text, Grid } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icons";
import { CgTimelapse } from "react-icons/cg";
import { FcCalendar } from "react-icons/fc";
import { useSelector } from "react-redux";
import { setActiveMenu } from "Store/worksSlice.js";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { getCurMonth, getCurWeekStr } from "Utils/index.js";
const MotionBtn = motion(Button);

export default function Menu() {
  const dispatch = useDispatch();
  const getWeekly = useCallback(getCurWeekStr, []);
  const getMonth = useCallback(getCurMonth, []);
  const workState = useSelector((state) => state.works);
  const onSwitchMenuStatu = () => {
    dispatch(setActiveMenu());
  };
  const itemsRef = useRef([
    {
      text: getWeekly(),
      icon: CgTimelapse,
      id: 1,
    },
    {
      text: getMonth(),
      icon: FcCalendar,
      id: 2,
    },
  ]);
  return (
    <Flex
      flexDir="column"
      justify="center"
      w={workState.activeMenu ? "8rem" : "6rem"}
      transition="all 0.4s ease-in-out"
    >
      <Image src="./icons/64.png" w="64px" h="64px" m="2rem auto" />
      <Box flexGrow="1" overflow="hidden" ml="1.5rem">
        {itemsRef.current?.map(({ id, text, icon }) => {
          return (
            <Flex
              align="center"
              color={workState.activeMenuItemId === id ? "#9e41cd" : "gray.400"}
              key={id}
              // pos="relative"
            >
              <Icon as={icon} fontSize="2rem" m="0.5rem" />
              {workState.activeMenu ? (
                <MotionBtn
                  mr="1rem"
                  variant="unstyled"
                  flexGrow="1"
                  textAlign="center"
                  opacity="0"
                  pos="relative"
                  left="1rem"
                  fontSize={workState.activeMenuItemId === id ? "1.1rem" : "1rem"}
                  animate={{
                    opacity: 1,
                    left: "0",
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  {text}
                </MotionBtn>
              ) : null}
            </Flex>
          );
        })}
      </Box>
      <Text
        fontSize="1.5rem"
        cursor="pointer"
        textAlign="center"
        pb="3rem"
        onClick={onSwitchMenuStatu}
      >
        {workState.activeMenu ? "😚" : "😶‍🌫️"}
      </Text>
    </Flex>
  );
}
