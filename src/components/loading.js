import React from "react";
import { Box } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box
      backgroundColor="radial-gradient(circle, rgb(62 127 212) 0%, rgba(148,187,233,1) 100%)"
      w="100%"
      h="100%"
    >
      loading.....
    </Box>
  );
}
