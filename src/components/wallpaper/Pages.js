import { Button, ButtonGroup } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
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
    while (wallpaperArr.length > curPage + _count && _count < 1) {
      ++_count;
      res.push(<Button key={_count}>{curPage + _count}</Button>);
    }
    if (curPage + _count < wallpaperArr.length) {
      if (curPage + _count + 1 < wallpaperArr.length) {
        res.push(
          <Button key="..." cursor="not-allowed">
            ...
          </Button>
        );
      }
      res.push(<Button key="last">{wallpaperArr.length}</Button>);
    }
    return res;
  };

  const switchPage = (isPrev) => () => {
    // 首页时无法向前，末页时无法向后
    if ((curPage === 1 && isPrev) || (curPage === wallpaperArr.length && !isPrev)) return;
    goTop();
    dispatch(setCurPage(curPage + (isPrev ? -1 : 1)));
  };

  const handlePrevPage = switchPage(true);
  const handleNextPage = switchPage(false);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" m="4rem auto">
      {/* <Button>{startPage}</Button> */}
      <Text fontSize="1.2rem" color="purple.200" p="0.5rem 1rem">
        总数：{wallpaperArr.flat().length}
      </Text>
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
          isActive={true}
          _active={{
            bg: "teal.50",
            transform: "scale(1.1)",
            borderColor: "purple.200",
          }}
        >
          {curPage}
        </Button>
        {generatorButtons()}
        <ArrowForwardIcon
          fontSize="1.4rem"
          color={curPage === wallpaperArr.length - 1 ? "gray.300" : "purple.300"}
          cursor={curPage === wallpaperArr.length - 1 ? "not-allowed" : "pointer"}
          onClick={handleNextPage}
        />
      </ButtonGroup>
    </Box>
  );
}
