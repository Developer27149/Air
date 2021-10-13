import React from "react";
import { Box } from "@chakra-ui/react";
import styles from "../styles/loading.module.scss";

export default function Loading() {
  return (
    <Box
      pos="fixed"
      left="0"
      right="0"
      top="0"
      bottom="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={styles.loading}
      // bg="linear-gradient(to right, #b92b27, #1565C0);"
      zIndex="99999"
    >
      {[...Array(6)].map((_, i) => (
        <Box className={styles.dot} key={i}></Box>
      ))}
    </Box>
  );
}
