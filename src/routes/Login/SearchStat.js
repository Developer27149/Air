import { Text, Box, Flex, Kbd, SimpleGrid } from "@chakra-ui/layout";
import React from "react";
import { Icon } from "@chakra-ui/icons";
import { CgYoutube } from "react-icons/cg";
import { SiBing } from "react-icons/si";
import { FaDev, FaZhihu } from "react-icons/fa";
import Search from "Components/Search.js";
import { VscGithubAlt } from "react-icons/vsc";
import { randomColor } from "Utils/index.js";
import { FcGoogle } from "react-icons/fc";
import { Image } from "@chakra-ui/image";
import { RiBilibiliLine } from "react-icons/ri";
import { AiFillGolden } from "react-icons/ai";

export default function SearchStat() {
  return (
    <Flex flexDir="column" justify="center" align="center" h="100%">
      <Search isStat={true} />
      <SimpleGrid columns={[2, 2, 4]} gap="4">
        <Flex justify="center" borderRadius=".2rem" p="0.6rem" align="center" bg={randomColor()}>
          <Box m="0.4rem">
            <Kbd borderColor="#f96705">g</Kbd> + <Kbd borderColor="#f96705">h</Kbd>
          </Box>
          <Icon as={VscGithubAlt} fontSize="1.6rem" />
        </Flex>
        <Flex justify="center" borderRadius=".2rem" p="0.6rem" align="center" bg={randomColor()}>
          <Box m="0.4rem">
            <Kbd borderColor="#f96705">y</Kbd> + <Kbd borderColor="#f96705">t</Kbd>
          </Box>
          <Icon as={CgYoutube} fontSize="1.6rem" />
        </Flex>
        <Flex justify="center" borderRadius=".2rem" p="0.6rem" align="center" bg={randomColor()}>
          <Box m="0.4rem">
            <Kbd borderColor="#f96705">g</Kbd> + <Kbd borderColor="#f96705">g</Kbd>
          </Box>
          <Icon as={FcGoogle} fontSize="1.6rem" />
        </Flex>
        <Flex justify="center" borderRadius=".2rem" p="0.6rem" align="center" bg={randomColor()}>
          <Box m="0.4rem">
            <Kbd borderColor="#f96705">b</Kbd> + <Kbd borderColor="#f96705">i</Kbd>
          </Box>
          <Image src="./img/bing.svg" h="1.6rem" w="1.6rem" />
        </Flex>
        <Flex justify="center" borderRadius=".2rem" p="0.6rem" align="center" bg={randomColor()}>
          <Box m="0.4rem">
            <Kbd borderColor="#f96705">z</Kbd> + <Kbd borderColor="#f96705">h</Kbd>
          </Box>
          <Icon as={FaZhihu} fontSize="1.6rem" />
        </Flex>
        <Flex justify="center" borderRadius=".2rem" p="0.6rem" align="center" bg={randomColor()}>
          <Box m="0.4rem">
            <Kbd borderColor="#f96705">d</Kbd> + <Kbd borderColor="#f96705">e</Kbd> +{" "}
            <Kbd borderColor="#f96705">v</Kbd>
          </Box>
          <Icon as={FaDev} fontSize="1.6rem" />
        </Flex>
        <Flex justify="center" borderRadius=".2rem" p="0.6rem" align="center" bg={randomColor()}>
          <Box m="0.4rem">
            <Kbd borderColor="#f96705">b</Kbd> + <Kbd borderColor="#f96705">l</Kbd>
          </Box>
          <Icon as={RiBilibiliLine} fontSize="1.6rem" />
        </Flex>
        <Flex justify="center" borderRadius=".2rem" p="0.6rem" align="center" bg={randomColor()}>
          <Box m="0.4rem">
            <Kbd borderColor="#f96705">j</Kbd> + <Kbd borderColor="#f96705">j</Kbd>
          </Box>
          <Icon as={AiFillGolden} fontSize="1.6rem" />
        </Flex>
      </SimpleGrid>
    </Flex>
  );
}
