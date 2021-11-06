import { Text, Box, Flex, Kbd, SimpleGrid } from "@chakra-ui/layout";
import React from "react";
import { Icon } from "@chakra-ui/icons";
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { SiBing } from "react-icons/si";
import { FaDev, FaZhihu } from "react-icons/fa";
import Search from "Components/Search.js";
import { VscGithubAlt } from "react-icons/vsc";
import { randomColor } from "Utils/index.js";

export default function SearchStat() {
  return (
    <Flex flexDir="column" justify="center" align="center" h="100%" borderRadius=".4rem">
      <Search isStat={true} />
      <SimpleGrid columns="3" gap="4">
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
          <Icon as={CgGoogle} fontSize="1.6rem" />
        </Flex>
        <Flex justify="center" borderRadius=".2rem" p="0.6rem" align="center" bg={randomColor()}>
          <Box m="0.4rem">
            <Kbd borderColor="#f96705">b</Kbd> + <Kbd borderColor="#f96705">i</Kbd>
          </Box>
          <Icon as={SiBing} fontSize="1.6rem" />
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
      </SimpleGrid>
    </Flex>
  );
}
