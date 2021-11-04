import React, { useState } from "react";
import { Box, Text, Flex, Grid } from "@chakra-ui/react";
import LoginElem from "./login.js";
import { motion } from "framer-motion";
const FlexMotion = motion(Flex);

export default function Login() {
  return (
    <Grid
      backdropFilter="blur(4px)"
      bgColor="rgb(255,255,255,.4)"
      h="100vh"
      templateColumns="840px auto"
    >
      <FlexMotion
        align="center"
        justify="center"
        opacity="0"
        pos="relative"
        left="-50px"
        animate={{
          opacity: 1,
          left: 0,
        }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
          delay: 0,
        }}
      >
        <LoginElem />
      </FlexMotion>
      <FlexMotion
        align="center"
        justify="center"
        opacity="0"
        pos="relative"
        left="50px"
        animate={{
          opacity: 1,
          left: 0,
        }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
          delay: 0,
        }}
      >
        right
      </FlexMotion>
    </Grid>
  );
}
