import React, { useEffect, Suspense, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setImg, setSearchEngine } from "../../store/homeSlice";
import { Loading } from "../../components";
const Search = React.lazy(() => import("../../components/Search.js"));

export default function Home() {
  const img = useSelector((state) => state.home.img);
  const fixedImg = useSelector((state) => state.home.fixedImg);
  const newImg = useSelector((state) => state.home.newImg);
  const useRawWallpaper = useSelector((state) => state.home.useRawWallpaper);

  const dispatch = useDispatch();

  useEffect(async () => {
    // set img
  }, []);

  const handleLoadedNewImg = () => {
    console.log("loaded new img");
    dispatch(setImg(newImg));
  };
  const handleLoadFail = () => {
    const imgArr = [""];
    dispatch(setImg(imgArr[0]));
  };

  return (
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
        background={`url(${fixedImg !== "" ? fixedImg : img})`}
        backgroundSize="cover"
      >
        <Search />
      </Box>
    </Suspense>
  );
}
