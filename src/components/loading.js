import React from "react";
import { Box } from "@chakra-ui/react";
import styles from "../styles/loading.module.scss";

export default function Loading() {
  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={styles.loading}
      bg="linear-gradient(to right, #b92b27, #1565C0);"
    >
      {[...Array(6)].map((_, i) => (
        <Box className={styles.dot} key={i}></Box>
      ))}
    </Box>
  );
}
