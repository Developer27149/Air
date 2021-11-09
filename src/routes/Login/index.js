import React from "react";
import { Flex, Grid } from "@chakra-ui/react";
import LoginElem from "./login.js";
import { motion } from "framer-motion";
const FlexMotion = motion(Flex);
import StatElem from "./stats.js";

export default function Login() {
  return (
    <Flex align="center" justify="flex-start" h="100vh" w="100vw">
      <FlexMotion
        align="center"
        // justify="center"
        pl="2rem"
        opacity="0"
        pos="relative"
        minH="800px"
        animate={{
          opacity: 1,
          left: "20px",
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          delay: 0.1,
        }}
      >
        <LoginElem />
      </FlexMotion>
    </Flex>
    // <Grid
    //   // backdropFilter="blur(4px)"
    //   // bgColor="rgb(255,255,255,.4)"
    //   h="100vh"
    //   w="100vw"
    //   overflow="hidden"
    //   templateColumns={["1fr", "560px auto", "560px auto", "720px auto"]}
    // >

    //   {/* <FlexMotion
    //     align="center"
    //     justify="center"
    //     opacity="0"
    //     pos="relative"
    //     left="50px"
    //     animate={{
    //       opacity: 1,
    //       left: 0,
    //     }}
    //     transition={{
    //       duration: 0.7,
    //       ease: "easeInOut",
    //       delay: 0,
    //     }}
    //   >
    //     <StatElem />
    //   </FlexMotion> */}
    // </Grid>
  );
}
