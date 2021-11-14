import { Grid } from "@chakra-ui/layout";
import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { getBase64FromUrl } from "Utils/index.js";
import { useDispatch, useSelector } from "react-redux";
import { setWallpaper } from "Store/homeSlice.js";
import Loading from "Components/Loading.js";
import { useToast } from "@chakra-ui/toast";
import { getWallpaperByFilter } from "Utils/request.js";
import WallpaperItem from "./WallpaperItem.js";

const ImageView = lazy(() => import("../ImageView.js"));
import { setWallpaperScore } from "../../utils/request";
import { useHistory } from "react-router";

export default function WallpaperFlow({ shouldGetData, onResetShouldGetData, hiddenLoaderIcon }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const applyToast = useToast();
  const wallpaper = useSelector((state) => state.home.wallpaper);
  const [curImg, setCurImg] = useState(null);
  const [wallpaperArr, setWallpaperArr] = useState([]);
  const [pagePostData, setPagePostData] = useState({ limit: 28, page: 1, sortType: "newest" });
  const [nextPage, setNextPage] = useState(null);

  // init wallpaperArr from origin store
  useEffect(() => {
    (async () => {
      const data = await getWallpaperByFilter(pagePostData);
      if (data) {
        const { wallpapers, nextPage } = data;
        setNextPage(nextPage);
        setWallpaperArr([...wallpaperArr, ...wallpapers]);
        onResetShouldGetData();
      } else if (data === null) {
        history.replace("/login");
      }
    })();
  }, [pagePostData]);

  useEffect(() => {
    // 当触底之后，立刻修改获取数据的接口上传的 data，
    if (shouldGetData && nextPage !== null) {
      setPagePostData({
        ...pagePostData,
        page: nextPage,
      });
    } else if (shouldGetData && nextPage === null) {
      hiddenLoaderIcon();
      toast({
        title: "😭",
        description: "一张也没有了，别下拉了",
        isClosable: true,
      });
    }
  }, [shouldGetData]);

  // 设置为喜欢或不喜欢
  const handleEvaluateWallpaper = useCallback(async (id, like) => {
    const isSuccess = await setWallpaperScore(id, like);
    console.log(isSuccess);
    if (isSuccess) {
      // 更新本地数据，更新图标，通知用户
      dispatch(
        setWallpaper({
          ...wallpaper,
          [like ? "like" : "unlike"]: [...wallpaper[like ? "like" : "unlike"], id],
          [!like ? "like" : "unlike"]: [
            ...wallpaper[!like ? "like" : "unlike"].filter((i) => i !== id),
          ],
        })
      );
      // wallpaper 数据更新后图标会自动更新
      toast({
        title: "👏👏👏",
        description: "🦔 谢谢你的评价",
        status: "success",
        duration: "1500",
      });
    }
  }, []);

  const handleShowMaxSize = useCallback((img) => {
    setCurImg(img);
  }, []);
  // 应用到首页
  const handleApplyImg = useCallback(async (full) => {
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
  }, []);

  return (
    <Grid
      m="1rem"
      gap="10px"
      gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
      gridAutoRows="200px"
      gridAutoFlow="dense"
    >
      {wallpaperArr.map((wallpaperData) => {
        return (
          <WallpaperItem
            key={wallpaperData.id}
            isLike={wallpaper.like.includes(wallpaperData.id)}
            isUnlike={wallpaper.unlike.includes(wallpaperData.id)}
            wallpaperData={wallpaperData}
            handleEvaluateWallpaper={handleEvaluateWallpaper}
            handleApplyImg={handleApplyImg}
            handleShowMaxSize={handleShowMaxSize}
          />
        );
      })}
      {curImg === null ? null : (
        <Suspense fallback={<Loading />}>
          <ImageView
            img={curImg}
            handleHidden={() => setCurImg(null)}
            handleEvaluateWallpaper={handleEvaluateWallpaper}
            handleApplyImg={handleApplyImg}
          />
        </Suspense>
      )}
    </Grid>
  );
}
