import { Grid, GridItem } from "@chakra-ui/layout";
import React from "react";
import BookmarkStat from "./bookmarkStat.js";
import MusicStat from "./MusicStat.js";
import NoteStat from "./NoteStat.js";
import SearchStat from "./SearchStat.js";
import WallpaperStat from "./wallpaperStat.js";

export default function stats() {
  return (
    <Grid
      h="90vh"
      w="90%"
      pr="2rem"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem borderRadius="0.4rem" rowSpan={2} colSpan={3} children={<WallpaperStat />} />
      <GridItem borderRadius="0.4rem" colSpan={2} children={<BookmarkStat />} />
      <GridItem borderRadius="0.4rem" colSpan={2} children={<NoteStat />} />
      <GridItem
        borderRadius="0.4rem"
        colSpan={2}
        bg="tomato"
        pos="relative"
        children={<MusicStat />}
      />
      <GridItem borderRadius="0.4rem" colSpan={3} bg="whiteAlpha.600" children={<SearchStat />} />
    </Grid>
  );
}
