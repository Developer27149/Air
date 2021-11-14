import React from "react";
import { Image } from "@chakra-ui/image";
import { Box, Divider, Heading } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Collapse } from "@chakra-ui/transition";
import { Button } from "@chakra-ui/button";
import { useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/hooks";

export default function WallpaperFilter() {
  const profile = useSelector((state) => state.profile.profile);
  const { isOpen, onToggle } = useDisclosure();
  // const [wallpaperArr, setWallpaperArr] = useState([]);

  const handleShowLike = () => {
    // const newArr = wallpaper.items.filter((i) => wallpaper.like.includes(i.id));
    // setWallpaperArr(newArr);
  };

  const handleShowAll = () => {
    console.log("show current all wallpaper", currentWallpaperArr);
    // setWallpaper(currentWallpaperArr);
  };

  const handleUpload = () => {};
  return (
    <Box
      as="header"
      // w="min(100vw, 1600px)"
      w="100vw"
      m="0 auto"
      p={["1rem", "1rem", "1rem", "1rem min(24rem, 12vw)"]}
      pos="sticky"
      top="0"
      left="0"
      right="0"
      bg="white"
      zIndex="99"
    >
      <Box as="header" display="flex" justifyContent="space-between" alignItems="center">
        <Image src="./icons/64.png" />
        <Box flexGrow="1" p=".2rem 2rem">
          <Heading as="p" size="sm" p=".2rem" fontWeight="normal">
            献给喜欢壁纸的你
          </Heading>
        </Box>
        <Avatar
          src={profile.avatar}
          name={profile.username}
          bg="teal.100"
          size="md"
          m="0.8rem"
        ></Avatar>
        <Box>
          {profile.uploadWallpaperId.length > 0 ? (
            <Text color="#859b97" fontSize=".9rem">
              和其他人分享了{profile.uploadWallpaperId.length}张壁纸
            </Text>
          ) : null}
        </Box>
        <Divider orientation="vertical" h="3rem" m="1rem" />
        <HamburgerIcon
          boxSize="2rem"
          onClick={onToggle}
          cursor="pointer"
          transform={isOpen ? "rotate(90deg)" : ""}
          transition="all 0.3s ease-in-out"
        />
      </Box>

      <Collapse in={isOpen} animateOpacity>
        <Box display="flex">
          <Box>
            <Button colorScheme="teal" variant="ghost" onClick={handleShowAll}>
              所有壁纸👏
            </Button>
          </Box>
          <Box>
            <Button colorScheme="teal" variant="ghost" onClick={handleUpload}>
              我要分享🙋🏻
            </Button>
          </Box>
          <Box>
            <Button colorScheme="teal" variant="ghost" onClick={handleShowLike}>
              我喜欢的😎
            </Button>
          </Box>
          <Box flexGrow="1"></Box>
        </Box>
      </Collapse>
    </Box>
  );
}
