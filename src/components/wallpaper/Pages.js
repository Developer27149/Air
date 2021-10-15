import { Button, ButtonGroup } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Badge, Box, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setCurPage } from "Store/wallpaperSlice.js";
import { goTop } from "Utils/index.js";

export default function Pages() {
  const dispatch = useDispatch();
  const { wallpaperArr, curPage } = useSelector((state) => state.wallpaper);
  const [startPage, setStartPage] = useState(1);
  const generatorButtons = () => {
    const res = [];
    let _count = 0;
    while (wallpaperArr.length > startPage + _count && _count < 1) {
      ++_count;
      res.push(
        <Button
          key={_count}
          onClick={() => {
            goTop(document.querySelector("#wallpaper_flow"));
            dispatch(setCurPage(startPage + _count));
          }}
          isActive={curPage === startPage + _count}
          _active={{
            borderColor: "purple.200",
            borderWidth: "2px",
          }}
        >
          {startPage + _count}
        </Button>
      );
    }
    if (startPage + _count < wallpaperArr.length) {
      if (startPage + _count + 1 < wallpaperArr.length) {
        res.push(
          <Button key="..." onClick={handleChangeCurPage}>
            ...
          </Button>
        );
      }
      res.push(
        <Button
          key="last"
          isActive={curPage === wallpaperArr.length}
          onClick={() => {
            goTop(document.querySelector("#wallpaper_flow"));
            dispatch(setCurPage(wallpaperArr.length));
          }}
          _active={{
            borderColor: "purple.200",
            borderWidth: "2px",
          }}
        >
          {wallpaperArr.length}
        </Button>
      );
    }
    return res;
  };

  const switchPage = (isPrev) => () => {
    // 首页时无法向前，末页时无法向后
    if ((curPage === 1 && isPrev) || (curPage === wallpaperArr.length && !isPrev)) return;
    goTop(document.querySelector("#wallpaper_flow"));
    if (isPrev && curPage - 1 < startPage) {
      setStartPage(curPage - 1);
    }
    if (!isPrev && curPage + 1 > startPage + 1) {
      setStartPage(curPage + 1);
    }
    dispatch(setCurPage(curPage + (isPrev ? -1 : 1)));
  };

  const handlePrevPage = switchPage(true);
  const handleNextPage = switchPage(false);

  const handleChangeCurPage = () => {
    if (startPage + 2 < wallpaperArr.length) {
      goTop(document.querySelector("#wallpaper_flow"));
      setStartPage(startPage + 2);
      dispatch(setCurPage(startPage + 2));
    }
  };

  const handleSwitchToStartPage = () => {
    goTop(document.querySelector("#wallpaper_flow"));
    dispatch(setCurPage(startPage));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" m="4rem auto">
      <ButtonGroup
        variant="outline"
        spacing="4"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ArrowBackIcon
          fontSize="1.4rem"
          color={curPage === 1 ? "gray.300" : "purple.300"}
          cursor={curPage === 1 ? "not-allowed" : "pointer"}
          onClick={handlePrevPage}
        />
        <Button
          isActive={startPage === curPage}
          onClick={handleSwitchToStartPage}
          _active={{
            borderColor: "purple.200",
            borderWidth: "2px",
          }}
        >
          {startPage}
        </Button>
        {generatorButtons()}
        <ArrowForwardIcon
          fontSize="1.4rem"
          color={curPage === wallpaperArr.length ? "gray.300" : "purple.300"}
          cursor={curPage === wallpaperArr.length ? "not-allowed" : "pointer"}
          onClick={handleNextPage}
        />
      </ButtonGroup>
    </Box>
  );
}
