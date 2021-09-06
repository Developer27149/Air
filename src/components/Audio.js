import { Box } from "@chakra-ui/layout";
import React from "react";
import Song from "./Song.js";

export default function Audio({ data }) {
  const { url, songName, picUrl, artist } = data;
  return (
    <Box display="flex" alignItems="flex-end" h="20vh">
      <audio id="audio">
        <source src={url} type="audio/mpeg" />
      </audio>
      <Song songName={songName} picUrl={picUrl} artist={artist} />
    </Box>
  );
}
