import React, { useEffect, Suspense, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setImg, setSearchEngine } from "../../store/defaultSlice";
import { Loading } from "../../components";
const Search = React.lazy(() => import("../../components/Search.js"));
const Bars = React.lazy(() => import("../../components/Bars.js"));
const Time = React.lazy(() => import("../../components/Time.js"));
const DateComponent = React.lazy(() => import("../../components/DateComponent.js"));
const Bookmarks = React.lazy(() => import("../../components/Bookmarks.js"));

export default function Default() {
  const [showDateAndTime, setShowDateAndTime] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);

  const img = useSelector((state) => state.default.img);
  const fixedImg = useSelector((state) => state.default.fixedImg);
  const newImg = useSelector((state) => state.default.newImg);
  const useRawWallpaper = useSelector((state) => state.default.useRawWallpaper);

  const dispatch = useDispatch();

  useEffect(async () => {
    // setTimeout show date and time component
    setTimeout(() => {
      setShowDateAndTime(true);
    }, 20);
    const { imgArr, unlikeImgArr, historyIdArr, searchEngine } = globalThis.config;
    // set img
    imgArr.some((item) => {
      const id = item.id;
      if (unlikeImgArr.some((i) => i === id) || historyIdArr.some((i) => i === id)) {
        return false;
      }
      let url = "";
      if (useRawWallpaper === "auto") {
        if (window.devicePixelRatio >= 2) {
          console.log("use auto config and use raw");
          url = item.raw;
        } else {
          console.log("use auto config but use hd");
          url = item.url;
        }
      } else if (useRawWallpaper === "Raw") {
        url = item.raw;
      } else {
        url = item.url;
      }
      // set new img
      dispatch(setImg(item.url));
      return true;
    });
    // set engine
    dispatch(setSearchEngine(searchEngine));
  }, []);

  const handleLoadedNewImg = () => {
    console.log("loaded new img");
    dispatch(setImg(newImg));
  };
  const handleLoadFail = () => {
    const imgArr = globalThis.config.imgArr;
    while (imgArr.length > 0) {
      const firstImg = imgArr.shift();
      if (firstImg && firstImg.url !== newImg.url) {
        dispatch(setImg(firstImg));
      }
    }
    globalThis.config.imgArr = imgArr;
  };

  return (
    <Suspense fallback={Loading}>
      {showDateAndTime && (
        <>
          <Time />
          <DateComponent />
        </>
      )}
      {showBookmarks && <Bookmarks />}
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
        position="relative"
        background={`url(${fixedImg !== "" ? fixedImg : img})`}
        backgroundSize="cover"
      >
        <Bars />
        <Search />
      </Box>
    </Suspense>
  );
}
