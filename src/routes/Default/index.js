import React, { useEffect, Suspense } from "react";
import { Box, Image } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setImg } from "../../store/defaultSlice";
import Loading from "../../components/loading";

const Search = React.lazy(() => import("../../components/Search.js"));
const Bars = React.lazy(() => import("../../components/Bars.js"));

export default function Default() {
  const img = useSelector((state) => state.default.img);
  const newImg = useSelector((state) => state.default.newImg);
  const dispatch = useDispatch();

  useEffect(async () => {
    const { imgArr, unlikeImgArr, historyIdArr } = globalThis.config;
    imgArr.some((item) => {
      const id = item.id;
      if (unlikeImgArr.includes((i) => i === id) || historyIdArr.includes((i) => i === id)) {
        return false;
      }
      // set new img
      dispatch(setImg(item.url));
      return true;
    });
  }, []);

  const handleLoadedNewImg = () => {
    console.log("loaded new img");
    dispatch(setImg(newImg));
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
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        w="100vw"
        h="100vh"
        position="relative"
        background={`url(${img})`}
        backgroundSize="cover"
      >
        <Bars />
        <Search />
      </Box>
    </Suspense>
  );
}
