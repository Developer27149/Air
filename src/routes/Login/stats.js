import { Grid, GridItem } from "@chakra-ui/layout";
import RecentSiteNavbar from "Components/RecentSiteNavbar.js";
import React from "react";
import BookmarkOrNoteStat from "./bookmarkOrNoteStat.js";
import MessageNavbar from "./MessageNavbar.js";
import MusicStat from "./MusicStat.js";
import SearchStat from "./SearchStat.js";
import WallpaperStat from "./wallpaperStat.js";

export default function stats() {
  return (
    <Grid
      // w="100%"
      // maxW="1200px"
      // margin="0 auto"
      // p="1rem"
      templateRows="repeat(7, 1fr)"
      templateColumns="repeat(7, 1fr)"
      gap={4}
    >
      {/* <GridItem colSpan={7} /> */}
      <GridItem borderRadius="0.4rem" rowSpan={3} colSpan={5} children={<WallpaperStat />} />
      <GridItem
        borderRadius="0.4rem"
        colSpan={1}
        children={<BookmarkOrNoteStat url="/bookmark" srcStr="./bookmark.svg" />}
      />
      <GridItem
        borderRadius="0.4rem"
        colSpan={1}
        children={<BookmarkOrNoteStat url="/note" srcStr="./note.svg" />}
      />
      <GridItem
        overflow="hidden"
        colSpan={2}
        rowSpan={1}
        children={<RecentSiteNavbar borderRadius="0.4rem" />}
      />
      {/* <GridItem
        borderRadius="0.4rem"
        colSpan={1}
        children={<BookmarkOrNoteStat url="/im" srcStr="./img/im.svg" />}
      /> */}
      <GridItem borderRadius="0.4rem" bg="white" children={<MessageNavbar bg="white" />} />
      <GridItem
        borderRadius="0.4rem"
        colSpan={2}
        rowSpan={2}
        bg="white"
        pos="relative"
        children={<MusicStat />}
      />
      <GridItem
        borderRadius="0.4rem"
        colSpan={5}
        rowSpan={2}
        bg="#5a86917d"
        children={<SearchStat />}
      />
    </Grid>
  );
}
