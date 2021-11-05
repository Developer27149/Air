import { Grid, GridItem } from "@chakra-ui/layout";
import React from "react";
export default function stats() {
  return (
    <Grid
      h="80vh"
      pr="2rem"
      w="80%"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={2} bg="tomato" />
      <GridItem colSpan={2} bg="papayawhip" />
      <GridItem colSpan={2} bg="papayawhip" />
      <GridItem colSpan={4} bg="tomato" />
    </Grid>
  );
}
