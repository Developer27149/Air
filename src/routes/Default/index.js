import React, { useEffect, Suspense } from "react";
import { Box, Image } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setImg, setSearchEngine } from "../../store/defaultSlice";
import { Loading } from "../../components";

const Search = React.lazy(() => import("../../components/Search.js"));
const Bars = React.lazy(() => import("../../components/Bars.js"));
const Time = React.lazy(() => import("../../components/Time.js"));
const DateComponent = React.lazy(() => import("../../components/DateComponent.js"));

export default function Default() {
  const img = useSelector((state) => state.default.img);
  const fixedImg = useSelector((state) => state.default.fixedImg);
  const newImg = useSelector((state) => state.default.newImg);
  const dispatch = useDispatch();

  useEffect(async () => {
    const { imgArr, unlikeImgArr, historyIdArr, searchEngine } = globalThis.config;
    // set img
    imgArr.some((item) => {
      const id = item.id;
      if (unlikeImgArr.some((i) => i === id) || historyIdArr.some((i) => i === id)) {
        return false;
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

  return (
    <Suspense fallback={Loading}>
      <Time />
      <DateComponent />
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
