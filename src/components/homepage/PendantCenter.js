import { Flex, Grid } from "@chakra-ui/layout";
import React from "react";
import DatePendant from "./DatePendant.js";

export default function PendantCenter() {
  return (
    <Grid
      m="4rem auto"
      w="min(90vw, 960px)"
      bg="#e6fffa73"
      flexGrow="1"
      borderRadius="8px"
      p="0.5rem"
      gridTemplateColumns="repeat(8, 1fr)"
      gridTemplateRows="repeat(8, 1fr)"
      backdropFilter="blur(3px)"
    >
      <DatePendant />
    </Grid>
  );
}
