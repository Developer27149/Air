import { Box } from "@chakra-ui/react";
import React from "react";
import { MdMoreVert } from "react-icons/md";
import { IconButton } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icons";

export default function LoadMoreBtn({ handleShouldLoadData }) {
  return (
    <Box justify="center" align="center" m="4rem auto" onClick={handleShouldLoadData}>
      <IconButton
        colorScheme="blue"
        minW="3rem"
        aria-label="Search database"
        icon={<Icon as={MdMoreVert} />}
      />
    </Box>
  );
}
