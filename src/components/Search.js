import React, { useState } from "react";
import { Input, Box, Icon } from "@chakra-ui/react";
import useSearch from "Hooks/useSearch.js";

export default function Search() {
  const [boxOpacity, setBoxOpacity] = useState(0);
  const { keyword, engineIcon, setKeyword, engine } = useSearch();
  const handleInput = (e) => {
    if (boxOpacity === 0) setBoxOpacity(1);
    const v = e.target.value;
    setKeyword(v);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("start search", engine);
      let url = `https://www.${engine}/search?q=${keyword}`;
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
      <Icon as={engineIcon} boxSize="16px" position="relative" left="1.6rem" zIndex="9" />
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
