import { Button, ButtonGroup } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

export default function Pages() {
  const dispatch = useDispatch();
  const { wallpaperArr, curPage } = useSelector((state) => state.wallpaper);
  const [startPage, setStartPage] = useState(1);
  const generatorButtons = () => {
    const res = [];
    let _count = 0;
    while (wallpaperArr.length > curPage + _count && _count < 3) {
      ++_count;
      res.push(<Button key={_count}>{curPage + _count}</Button>);
    }
    return res;
  };

  const handlePrevPage = () => {};

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <ArrowBackIcon />
      <Icon as={GrFormPreviousLink} />
      <Button>{startPage}</Button>
      <ButtonGroup variant="outline" spacing="4">
        <Button>{curPage}</Button>
        {generatorButtons()}
      </ButtonGroup>
      <Icon as={GrFormNextLink} />
      <ArrowForwardIcon />
    </Box>
  );
}
