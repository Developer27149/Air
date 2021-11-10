import Icon from "@chakra-ui/icon";
import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { motion } from "framer-motion";
import { Input, InputGroup, InputRightElement, InputLeftElement } from "@chakra-ui/input";
import { RiGithubLine } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { MdSecurity, MdVisibilityOff, MdVisibility } from "react-icons/md";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import useAccount from "./useAccount";
const MBox = motion.div;

export default function AcountLogin() {
  const toast = useToast();
  const {
    username,
    password,
    showVisibleEyesIcon,
    onChangeUsername,
    onChangePassword,
    onChangeShowVisibleEyesIcon,
    handleLogin,
  } = useAccount();

  const handleResetPass = () => {
    toast({
      title: "提示",
      description: "暂不支持，如需帮助请联系我 rivenqinyy@gmail.com",
      status: "info",
      isClosable: true,
    });
  };
  return (
    <Box
      pos="absolute"
      right="4rem"
      bg="#f6f6f6"
      p="2rem"
      minH="min(560px, 80%)"
      borderRadius="0.4rem"
      zIndex="9"
    >
      <MBox
        style={{
          opacity: 0.1,
          position: "relative",
          left: "2rem",
          transform: "scale(0.8)"
        }}
        animate={{
          opacity: 1,
          left: 0,
          transform: "scale(1)"
        }}
        transition={{
          duration: 0.4,
          delay: 0.1,
        }}
      >
        <form>
          <InputGroup>
            <InputLeftElement mt="0.9rem" ml="0.5rem">
              <Icon as={FaUserAlt} color="#6c63ed" />
            </InputLeftElement>
            <Input
              placeholder="用户名或邮箱"
              value={username}
              onChange={onChangeUsername}
              maxLength="18"
              m="0.5rem"
              p="1.5rem 1rem"
              pl="2.5rem"
              bg="#E9EFF6"
              fontSize="1rem"
              _placeholder={{
                color: "gray",
                fontSize: "0.9rem",
              }}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement mt="0.9rem" ml="0.5rem">
              <Icon as={MdSecurity} color="#6c63ed" />
            </InputLeftElement>
            <Input
              type={showVisibleEyesIcon ? "password" : "text"}
              required
              placeholder="密码"
              onChange={onChangePassword}
              value={password}
              maxLength="18"
              p="1.5rem 1rem"
              pl="2.5rem"
              m="0.5rem"
              bg="#E9EFF6"
              fontSize="1rem"
              _placeholder={{
                color: "gray",
                fontSize: "0.9rem",
              }}
            />
            <InputRightElement mt="0.9rem" mr="0.5rem">
              <Icon
                as={showVisibleEyesIcon ? MdVisibility : MdVisibilityOff}
                fontSize="1rem"
                color="grey.200"
                cursor="pointer"
                onClick={onChangeShowVisibleEyesIcon}
              />
            </InputRightElement>
          </InputGroup>
          <Text
            textAlign="right"
            p="0.2rem"
            color="gray.700"
            fontSize="12px"
            cursor="pointer"
            onClick={handleResetPass}
          >
            重置密码
          </Text>
          <Button
            fontSize="1rem"
            w="320px"
            boxShadow="#0000ff14 2px 4px 10px"
            bg="#4460F1"
            color="white"
            m="0.5rem"
            borderRadius="0.6rem"
            _hover={{
              bg: "#4460F1",
            }}
            onClick={handleLogin}
            isLoading=""
          >
            登录
          </Button>
        </form>
        <Flex align="center" justify="stretch" mt="2rem">
          <Divider />
          <Text flexGrow="1" p="1rem" w="20rem">
            第三方登录🏂🏿
          </Text>
          <Divider />
        </Flex>
        <Flex justify="center" align="center">
          <Box
            bg="white"
            p="0.8rem 1rem"
            cursor="pointer"
            borderRadius="0.4rem"
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            _hover={{
              transform: "scale(1.2)",
            }}
            transition="all 0.4s ease-in-out"
          >
            <Icon as={RiGithubLine} boxSize="1.8rem" />
          </Box>
        </Flex>
      </MBox>
    </Box>
  );
}
