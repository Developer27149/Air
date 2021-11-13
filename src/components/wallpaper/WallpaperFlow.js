import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Grid, Link } from "@chakra-ui/layout";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Icon } from "@chakra-ui/icons";
import { generateFallbackImgWidth, getBase64FromUrl, randomColor } from "Utils/index.js";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { setWallpaper } from "Store/homeSlice.js";
import { CgMaximizeAlt, CgUserlane } from "react-icons/cg";
import Loading from "Components/Loading.js";
import { useToast } from "@chakra-ui/toast";
import { getWallpaperByFilter } from "Utils/request.js";
import WallpaperItem from "./WallpaperItem.js";

const ImageView = lazy(() => import("../ImageView.js"));

export default function WallpaperFlow() {
  const dispatch = useDispatch();
  const applyToast = useToast();
  const wallpaper = useSelector((state) => state.home.wallpaper);
  const [curImg, setCurImg] = useState(null);
  const [wallpaperArr, setWallpaperArr] = useState([]);
  const [pagePostData, setPagePostData] = useState({ limit: 20, page: 1, sortType: "newest" });
  const [nextPage, setNextPage] = useState(null);
  const bottomRef = useRef(null);
  // init wallpaperArr from origin store
  useEffect(() => {
    (async () => {
      const data = await getWallpaperByFilter(pagePostData);
      if (data) {
        const { wallpapers, nextPage } = data;
        setNextPage(nextPage);
        setWallpaperArr([...wallpaperArr, ...wallpapers]);
      }
    })();
  }, [pagePostData]);

  useEffect(() => {
    const demo = () => {
      console.log("scroll");
    };
    bottomRef.current.addEventListener("scroll", demo);
    return () => {
      bottomRef.current.removeEventListener("scroll", demo);
    };
  }, []);

  // 设置为喜欢或不喜欢
  const handleLike = (e) => {
    console.log(e.target);
  };
  const handleDislike = (e) => {
    console.log(e);
  };
  // 应用到首页
  const handleApplyImg = async (e) => {
    console.log(e);
    // try {
    //   const data = await getBase64FromUrl(full);
    //   dispatch(
    //     setWallpaper({
    //       ...wallpaper,
    //       imgBase64: data,
    //     })
    //   );
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   applyToast({
    //     title: "Tip",
    //     description: "壁纸设置到初始页面🍁",
    //     status: "success",
    //     duration: 4500,
    //     isClosable: true,
    //     position: "top",
    //   });
    // }
  };

  return (
    <>
      <Grid
        ref={bottomRef}
        // w="min(100vw, 1600px)"
        // h="100%"
        m="0 auto"
        mt="1rem"
        // p={["1rem", "1rem", "1rem", "0"]}
        // templateColumns="repeat(auto-fill, minmax(18vw, 400px))"
        templateColumns="repeat(4, 1fr)"
        gridAutoRows="1px"
        columnGap="2"
      >
        {wallpaperArr.map((wallpaperData) => {
          return (
            <WallpaperItem
              key={wallpaperData.id}
              wallpaperData={wallpaperData}
              handleLike={handleLike}
              handleDislike={handleDislike}
              handleApplyImg={handleApplyImg}
            />
          );
        })}
        {curImg === null ? null : (
          <Suspense fallback={<Loading />}>
            <ImageView
              id={curImg.id}
              full={curImg.full}
              raw={curImg.raw}
              handleHidden={() => setCurImg(null)}
            />
          </Suspense>
        )}
      </Grid>
      {/* <Box>aaaaaa</Box> */}
    </>
  );
}
