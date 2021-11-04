import React, { useState } from "react";
import { Icon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  Input,
  Divider,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaGithub, FaUserAlt } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { AiOutlineEnter } from "react-icons/ai";
import { handleEnter } from "Utils/index.js";
import RegisterElem from "./register.js";
import { Image } from "@chakra-ui/image";

export default function LoginElem() {
  const [isOnLogin, setIsOnLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const checkInput = () => {
    const isPass = username !== "" && password !== "";
    if (!isPass) {
      toast({
        title: "错误",
        description: "用户名或密码未填写",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
    return isPass;
  };
  const handleLogin = () => {
    if (checkInput()) {
      // login
      console.log("start login");
    }
  };
  return (
    <Box
      bg={!isOnLogin ? "blue.50" : "white"}
      padding="2rem"
      w="min(500px, 38vw)"
      h="min(800px, 80vh)"
      borderRadius="1rem"
      pos="relative"
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      <Flex
        pos="absolute"
        bg={isOnLogin ? "blue.50" : "white"}
        left="1rem"
        bottom="1rem"
        zIndex={isOnLogin ? -1 : 10}
        w="100%"
        h="100%"
        borderRadius="1rem"
        p="2rem"
        flexDir="column"
        justify="center"
        align="center"
      >
        <RegisterElem goToLogin={() => setIsOnLogin(true)} />
      </Flex>
      <Image src="./icons/64.png" w="64px" h="64px" />
      <Text m=".8rem" textAlign="center">
        不是很麻烦，只需要登录一次即可🌵
      </Text>
      <Flex align="center" justify="flex-end" flexDir="column" p="2rem">
        <InputGroup m="1rem">
          <InputLeftElement pointerEvents="none">
            <Icon pos="relative" bottom="4px" as={FaUserAlt} color="gray.300" />
          </InputLeftElement>
          <Input
            value={username}
            onChange={handleChangeUsername}
            size="sm"
            variant="flushed"
            placeholder="昵称"
            onKeyPress={(e) => handleEnter(e, handleLogin)}
          />
        </InputGroup>

        <InputGroup m="1rem">
          <InputLeftElement pointerEvents="none">
            <Icon pos="relative" bottom="4px" as={MdSecurity} color="gray.300" />
          </InputLeftElement>

          <Input
            value={password}
            onChange={handleChangePassword}
            size="sm"
            type="password"
            variant="flushed"
            placeholder="密码"
            onKeyPress={(e) => handleEnter(e, handleLogin)}
          />
          <InputRightElement>
            <Icon
              as={AiOutlineEnter}
              pos="relative"
              bottom="4px"
              color={username.length > 0 && password.length > 0 ? "green.300" : "gray.300"}
              cursor="pointer"
              onClick={handleLogin}
              fontWeight="bold"
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Box flexGrow="1" display="flex" justifyContent="center" alignItems="center" flexDir="column">
        <Flex justify="center" align="center" mb="1rem" w="100%">
          <Divider minW="8rem" />
          <Text flexGrow="1" textAlign="center" minW="7rem">
            第三方登录
          </Text>
          <Divider minW="8rem" />
        </Flex>
        <Icon as={FaGithub} fontSize="2rem" cursor="pointer" />
      </Box>
      <Button
        colorScheme="blue"
        variant="ghost"
        onClick={() => setIsOnLogin(false)}
        m="0.5rem auto"
        size="sm"
      >
        没有账号，前去注册
      </Button>
      <Text textAlign="center">or</Text>
      <Button
        colorScheme="blue"
        variant="ghost"
        onClick={() => setIsOnLogin(false)}
        m="0.5rem auto"
        size="xs"
      >
        下次一定
      </Button>
    </Box>
  );
}
