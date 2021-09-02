import React, { useEffect, Suspense, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setWallpaper, setSearch, setNewImg } from "../../store/homeSlice";
import Search from "Components/Search.js";
// import Loading from "Components/Loading.js";
// const Search = React.lazy(() => import("../../components/Search.js"));

export default function Home() {
  const wallpaperConfig = useSelector((state) => state.home.wallpaper);
  const isRawWallpaper = wallpaperConfig.raw;
  const newImg = useSelector((state) => state.home.newImg);
  const url = wallpaperConfig.items[0][`${isRawWallpaper ? "raw" : "url"}`] || "wallpaper.jpeg";

  const dispatch = useDispatch();

  useEffect(async () => {
    // set img
    dispatch(setNewImg(url));
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
    <>
      <Image display="none" src={url} onLoad={handleLoadedNewImg} onError={handleLoadFail} />
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
        background={`url(${newImg})`}
        backgroundSize="cover"
      >
        <Search />
      </Box>
    </>
  );
}
