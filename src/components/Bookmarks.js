import React, { useEffect, useState } from "react";
import { Box, List, ListItem, Input } from "@chakra-ui/react";

export default function Bookmarks() {
  const [bookmarksTree, setBookmarksTree] = useState(null);
  useEffect(async () => {
    const bookmark = await chrome.bookmarks.getTree();
    console.log(bookmark);
    setBookmarksTree(bookmark);
  }, []);
  if (bookmarksTree === null) return <></>;
  return (
    <Box
      pos="fixed"
      top="50%"
      left="50"
      transform="translate(50%, 50%)"
      w="40%"
      h="80%"
      overflowY="scroll"
    >
      <Input />
      <List>
        <ListItem>???</ListItem>
      </List>
    </Box>
  );
}
