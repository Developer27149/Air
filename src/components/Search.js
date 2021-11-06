import React, { useState } from "react";
import { Input, Box, Icon } from "@chakra-ui/react";
import useSearch from "Hooks/useSearch.js";
import { selectIcon } from "Utils/index.js";

export default function Search({ isStat = false }) {
  const [boxOpacity, setBoxOpacity] = useState(0);
  const { keyword, setKeyword, engine, clearKeyword } = useSearch();
  const handleInput = (e) => {
    if (boxOpacity === 0) setBoxOpacity(1);
    const v = e.target.value;
    setKeyword(v);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      let url = `https://www.${engine}/search?q=${keyword}`;
      // clear keyword
      clearKeyword();
      globalThis.open(url);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={isStat ? "1rem" : "6rem 0"}
      w="100%"
      opacity={isStat ? 1 : boxOpacity}
      transition="all .4s ease-in-out"
      _hover={{
        opacity: 1,
      }}
    >
      <Icon
        as={selectIcon(engine)}
        p="4px"
        fontSize="1.9rem"
        pos="relative"
        left="2.2rem"
        zIndex="99"
      />
      <Input
        paddingLeft="2.2rem"
        height="3rem"
        lineHeight="2rem"
        w={isStat ? "360px" : "600px"}
        maxW="70vw"
        bg="white"
        border="none"
        placeholder="你想知道什么？"
        onChange={handleInput}
        onBlur={() => setBoxOpacity(0)}
        value={keyword}
        onKeyDown={handleSearch}
      />
    </Box>
  );
}
