import { Box } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import WallpaperFlow from "./WallpaperFlow.js";
import WallpaperHeader from "./WallpaperHeader.js";
import LoadMoreBtn from "./LoadMoreBtn.js";

export default function WallpaperContainer() {
  const boxRef = useRef(null);
  const [shouldGetData, setShouldGetData] = useState(false);
  const [shouldStop, setShouldStop] = useState(false);
  const hiddenLoaderIcon = useCallback(() => setShouldStop(true), []);
  const handleShouldLoadData = useCallback(() => setShouldGetData(true), []);
  const onResetShouldGetData = useCallback(() => setShouldGetData(false), []);
  useEffect(() => {
    const handleScrollToBottm = () => {
      if (boxRef.current.scrollHeight - boxRef.current.scrollTop === boxRef.current.clientHeight) {
        setShouldGetData(true);
      }
    };
    boxRef.current.addEventListener("scroll", handleScrollToBottm);
    return () => {
      boxRef.current.removeEventListener("scroll", handleScrollToBottm);
    };
  }, []);
  return (
    <Box
      ref={boxRef}
      display="flex"
      flexDir="column"
      bg="#fff"
      w="100vw"
      h="100vh"
      pos="fixed"
      left="0"
      right="0"
      overflowX="hidden"
      id="wallpaper_flow"
    >
      <WallpaperHeader />
      <WallpaperFlow
        hiddenLoaderIcon={hiddenLoaderIcon}
        shouldGetData={shouldGetData}
        onResetShouldGetData={onResetShouldGetData}
      />
      {shouldStop ? null : <LoadMoreBtn handleShouldLoadData={handleShouldLoadData} />}
    </Box>
  );
}
