import React, { useState } from "react";
import { Input, Box, Icon } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { DiBingSmall } from "react-icons/di";
import { setSearchEngine } from "../store/defaultSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Search() {
  const dispatch = useDispatch();
  const [boxOpacity, setBoxOpacity] = useState(0);
  const [keyword, setKeyword] = useState("");
  const searchEngineIcon = useSelector((state) => state.default.searchEngine);
  // const [searchEngineIcon, setSearchEngineIcon] = useState()
  const handleInput = (e) => {
    if (boxOpacity === 0) setBoxOpacity(1);
    const v = e.target.value;
    if (v.startsWith("b ") && searchEngineIcon === "g") {
      setKeyword("");
      dispatch(setSearchEngine("b"));
    } else if (v.startsWith("g ") && searchEngineIcon === "b") {
      setKeyword("");
      dispatch(setSearchEngine("g"));
    } else {
      setKeyword(v);
    }
  };
  const selectIcon = () => {
    if (searchEngineIcon === "b") return DiBingSmall;
    return FcGoogle;
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("start search");
      let url = `https://www.google.com/search?q=${keyword}`;
      if (searchEngineIcon === "b") {
        url = `https://www.bing.com/search?mkt=en&q=${keyword}`;
      }
      globalThis.location = url;
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="6rem 0"
      w="100%"
      opacity={boxOpacity}
      transition="all .4s ease-in-out"
      _hover={{
        opacity: 1,
      }}
    >
      <Icon as={selectIcon()} boxSize="16px" position="relative" left="1.6rem" zIndex="9" />
      <Input
        paddingLeft="2rem"
        maxW="400px"
        bg="white"
        placeholder={globalThis.name}
        onChange={handleInput}
        onBlur={() => setBoxOpacity(0)}
        value={keyword}
        onKeyDown={handleSearch}
      />
    </Box>
  );
}
