import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import { Box, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Icon from "@chakra-ui/icon";
import { FcGoogle } from "react-icons/fc";

export default function RecentSiteNavbar() {
  const [history, setHistory] = useState([]);

  const getFavicon = (domain) => {
    const _ = {
      youtube: <Image src="./img/youtube.svg" w="100%" h="100%" />,
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
            urlArr.slice(0, 9).map((i) => {
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
    <Flex flexWrap="wrap" align="center" justify="center" bg="#537c8070" p="0.2rem">
      {history.map((site) => {
        return (
          <Flex
            justify="center"
            align="center"
            flexDir="column"
            key={site.iconSrc}
            p="0.5rem 1rem"
            cursor="pointer"
            onClick={() => linkTo(site.url)}
            order={site.domain.length >= 10 ? 2 : "unset"}
          >
            <Tooltip label={site.domain} aria-label="域名提示">
              <Box
                borderRadius="0.3rem"
                w={["32px", "48px"]}
                h={["32px", "48px"]}
                p="4px"
                bgColor="#537f8a"
                pos="relative"
              >
                {site.favicon ?? (
                  <Image w="100%" h="100%" src={site.iconSrc} fallbackSrc="./site.svg" />
                )}
              </Box>
            </Tooltip>
            {/* <Text p="0.2rem" fontSize="0.9rem" color="whiteAlpha.700">
              {site.domain}
            </Text> */}
          </Flex>
        );
      })}
    </Flex>
  );
}
