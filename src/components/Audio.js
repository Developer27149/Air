import { Box } from "@chakra-ui/layout";
import React from "react";
import Song from "./Song.js";

export default function Audio({ data }) {
  const { url, songName, picUrl, artist } = data;
  return (
    <Box display="flex" alignItems="flex-end" h="10vh">
      <audio preload="true" id="audio" src={url}></audio>
      <Song songName={songName} picUrl={picUrl} artist={artist} url={url} />
    </Box>
  );
}
