import React, { useEffect, Suspense, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setWallpaper, setSearch, setNewImg } from "../../store/homeSlice";
import { Loading } from "../../components";
const Search = React.lazy(() => import("../../components/Search.js"));

export default function Home() {
  const wallpaperConfig = useSelector((state) => state.home.wallpaper);
  const newImg = useSelector((state) => state.home.newImg);

  const dispatch = useDispatch();

  useEffect(async () => {
    // set img
  }, []);

  const handleLoadedNewImg = () => {
    console.log("loaded new img");
    dispatch(setNewImg(newImg));
  };
  const handleLoadFail = () => {
    const imgArr = [""];
    dispatch(
      setWallpaper({
        ...wallpaperConfig,
        items: imgArr,
      })
    );
  };

  return (
    <Box>
      <Suspense fallback={Loading}>
        <Image
          w="100vw"
          h="100vh"
          position="fixed"
          left="0"
          top="0"
          m="0"
          p="0"
          src={newImg}
          onLoad={handleLoadedNewImg}
          onError={handleLoadFail}
        />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          w="100vw"
          h="100vh"
          position="fixed"
          left="0"
          top="0"
          m="0"
          p="0"
          // background={`url(${wallpaperConfig.items[0] || ""})`}
          backgroundSize="cover"
        >
          <Search />
        </Box>
      </Suspense>
    </Box>
  );
}
