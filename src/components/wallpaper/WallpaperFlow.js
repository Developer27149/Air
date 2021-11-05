import { Avatar } from "@chakra-ui/avatar";
import { AddIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Badge, Box, Link } from "@chakra-ui/layout";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Icon } from "@chakra-ui/icons";
import {
  generateFallbackImgWidth,
  getBase64FromUrl,
  randomColor,
  sliceArray,
  unflatArr,
} from "Utils/index.js";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { setWallpaper } from "Store/homeSlice.js";
import { CgMaximizeAlt, CgUserlane } from "react-icons/cg";
import Loading from "Components/Loading.js";
import { setWallpaperArr } from "Store/wallpaperSlice.js";
import { useToast } from "@chakra-ui/toast";

const ImageView = lazy(() => import("../ImageView.js"));

export default function WallpaperFlow() {
  const dispatch = useDispatch();
  const applyToast = useToast();
  const { wallpaperArr, curPage } = useSelector((state) => state.wallpaper);
  const wallpaper = useSelector((state) => state.home.wallpaper);

  // init wallpaperArr from origin store
  useEffect(() => {
    dispatch(setWallpaperArr(unflatArr([...wallpaper.items])));
  }, []);

  // 设置为喜欢或不喜欢
  const handleSwitchLike = (id, field) => {
    const dataArr = wallpaper[`${field}`].includes(id)
      ? wallpaper[`${field}`].filter((i) => i !== id)
      : wallpaper[`${field}`].push(id);
    dispatch(
      setWallpaper({
        ...wallpaper,
        [`${field}`]: dataArr,
      })
    );
  };
  // 应用到首页
  const handleApplyImg = async (full) => {
    try {
      const data = await getBase64FromUrl(full);
      dispatch(
        setWallpaper({
          ...wallpaper,
          imgBase64: data,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      applyToast({
        title: "Tip",
        description: "壁纸设置到初始页面🍁",
        status: "success",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
    }
  };

  const [curImg, setCurImg] = useState(null);
  const [newWallpaperArr, setNewWallpaperArr] = useState([]);
  useEffect(() => {
    const _ = sliceArray([...(wallpaperArr[curPage - 1] ?? [])], 3);
    setNewWallpaperArr(_);
  }, [wallpaperArr, curPage]);

  return (
    <Box
      display="flex"
      justifyContent={newWallpaperArr.length >= 3 ? "center" : "flex-start"}
      w="min(100vw, 1280px)"
      m="0 auto"
      mt="1rem"
      p={["1rem", "1rem", "1rem", "0"]}
    >
      {newWallpaperArr.map((item, idx) => {
        return (
          <Box key={idx} m="1rem .4rem">
            {item.map((photo) => {
              const {
                user: {
                  profile_image,
                  links: { html },
                },
                urls: { small, raw, full },
                height,
                width,
                descrption,
                id,
              } = photo;

              return (
                <Box
                  key={id}
                  pos="relative"
                  h={generateFallbackImgWidth(width, height)}
                  w="400px"
                  bg={randomColor()}
                  m="1rem 0"
                >
                  <Image src={small} title={descrption} />
                  <Box
                    pos="absolute"
                    left="0"
                    right="0"
                    top="0"
                    bottom="0"
                    opacity="0"
                    transition="opacity .4s ease-in-out"
                    _hover={{
                      opacity: 1,
                    }}
                  >
                    <Icon
                      fontSize="1.4rem"
                      m="0 .2rem"
                      as={CgMaximizeAlt}
                      cursor="pointer"
                      color="white"
                      pos="absolute"
                      top=".6rem"
                      right=".4rem"
                      cursor="pointer"
                      zIndex="9"
                      onClick={() => setCurImg({ full, raw, id })}
                    />
                    <Box pos="absolute" top=".4rem" display="flex" p="0.5rem" w="100%">
                      <Icon
                        fontSize="1.3rem"
                        m="0 .4rem"
                        as={wallpaper.unlike.includes(id) ? AiFillLike : AiOutlineLike}
                        cursor="pointer"
                        color="white"
                        onClick={() => handleSwitchLike(id, "like")}
                      />
                      <Icon
                        fontSize="1.3rem"
                        m="0 .4rem"
                        as={wallpaper.unlike.includes(id) ? AiFillDislike : AiOutlineDislike}
                        cursor="pointer"
                        color="white"
                        onClick={() => handleSwitchLike(id, "unlike")}
                      />
                    </Box>

                    <Box
                      pos="absolute"
                      bottom=".5rem"
                      left="0.5rem"
                      right="0.5rem"
                      display="flex"
                      alignItems="center"
                    >
                      <Link href={html}>
                        <Avatar src={profile_image.medium} />
                      </Link>

                      <Box flexGrow="1" display="flex" justifyContent="flex-end">
                        <Icon
                          color="white"
                          as={CgUserlane}
                          fontSize="1.5rem"
                          cursor="pointer"
                          onClick={() => handleApplyImg(full)}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
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
    </Box>
  );
}
