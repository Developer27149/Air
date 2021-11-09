import { Image } from "@chakra-ui/image";
import { Text, Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Icon from "@chakra-ui/icon";
import { FiYoutube } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function RecentSiteNavbar() {
  const [history, setHistory] = useState([]);

  const getFavicon = (domain) => {
    const _ = {
      youtube: <Icon as={FiYoutube} color="#3d2585" w="100%" h="100%" />,
      google: <Icon as={FcGoogle} color="#3d2585" w="100%" h="100%" />,
      bing: <Image src="./img/bing.svg" w="100%" h="100%" />,
      stackoverflow: <Image src="./img/stackoverflow.svg" w="100%" h="100%" />,
    };
    return _[domain];
  };

  const linkTo = (url) => {
    window.open(url);
  };
  useEffect(() => {
    const getHistoryAtRecentWeek = async () => {
      chrome.history.search(
        {
          text: "",
          maxResults: 250,
          startTime: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
        },
        (items) => {
          const res = items.map((i) => {
            const _url = new URL(i.url);
            return _url.origin;
          });
          const countObj = {};
          res.forEach((i) => {
            if (countObj[i]) {
              countObj[i] += 1;
            } else {
              countObj[i] = 1;
            }
          });
          const urlArr = Object.keys(countObj);
          urlArr.sort((prev, next) => {
            return countObj[next] - countObj[prev];
          });
          setHistory(
            urlArr.slice(0, 8).map((i) => {
              const _urlObj = new URL(i);
              const domain = _urlObj.host.replace(/^www\./, "").replace(/\..*?$/, "");
              const favicon = getFavicon(domain);
              return {
                iconSrc: `${i}/favicon.ico`,
                url: i,
                domain,
                favicon,
              };
            })
          );
        }
      );
    };
    getHistoryAtRecentWeek();
  }, []);
  return (
    <Flex flexWrap="wrap" align="center">
      {history.map((site) => {
        return (
          <Flex
            justify="center"
            align="center"
            flexDir="column"
            key={site.iconSrc}
            p="1rem"
            cursor="pointer"
            onClick={() => linkTo(site.url)}
            order={site.domain.length >= 10 ? 2 : "unset"}
          >
            <Box borderRadius="0.3rem" w={["32px", "48px"]} h={["32px", "48px"]}>
              {site.favicon ?? (
                <Image w="100%" h="100%" src={site.iconSrc} fallbackSrc="./site.svg" />
              )}
            </Box>
            <Text p="0.4rem" fontSize="0.9rem" color="whiteAlpha.700">
              {site.domain}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
}
