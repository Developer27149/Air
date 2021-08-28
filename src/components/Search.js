import React, { useState } from "react";
import { Input, Box, Icon } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { DiBingSmall, DiCode } from "react-icons/di";
import { SiZhihu } from "react-icons/si";
import { GiGoldNuggets } from "react-icons/gi";
import { VscGithubAlt } from "react-icons/vsc";
import { setSearchEngine } from "../store/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { keyword2SearchEngine } from "../utils";

export default function Search() {
  const dispatch = useDispatch();
  const [boxOpacity, setBoxOpacity] = useState(0);
  const [keyword, setKeyword] = useState("");
  const searchEngineDomain = useSelector((state) => state.default.searchEngine);
  const handleInput = (e) => {
    if (boxOpacity === 0) setBoxOpacity(1);
    const v = e.target.value;
    const searchEngine = keyword2SearchEngine(v);
    if (searchEngine) {
      if (searchEngineDomain !== searchEngine) {
        setKeyword("");
        dispatch(setSearchEngine(searchEngine));
      }
    } else {
      setKeyword(v.replace(/^-/, ""));
    }
  };

  const selectIcon = () => {
    if (searchEngineDomain === "bing.com") return DiBingSmall;
    if (searchEngineDomain === "zhihu.com") return SiZhihu;
    if (searchEngineDomain === "dev.to") return DiCode;
    if (searchEngineDomain === "github.com") return VscGithubAlt;
    if (searchEngineDomain === "juejin.cn") return GiGoldNuggets;
    return FcGoogle;
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("start search", searchEngineDomain);
      let url = `https://www.${searchEngineDomain}/search?q=${keyword}`;
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
        placeholder="你想知道什么？"
        onChange={handleInput}
        onBlur={() => setBoxOpacity(0)}
        value={keyword}
        onKeyDown={handleSearch}
      />
    </Box>
  );
}
