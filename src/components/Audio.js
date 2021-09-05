import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import Song from "./Song.js";

export default function Audio({ songList }) {
  const [isPause, setIsPause] = useState(false);

  return (
    <Box display="flex" alignItems="flex-end" h="20vh">
      {/* <audio id="audio">
        <source src="song.mp3" />
      </audio> */}
      <Song />
    </Box>
  );
}
