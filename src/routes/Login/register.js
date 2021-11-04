import React, { useState } from "react";
import { Icon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { AiOutlineEnter } from "react-icons/ai";
import { handleEnter } from "Utils/index.js";
import { Image } from "@chakra-ui/react";

export default function LoginElem({ goToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toast = useToast();
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPass = (e) => setConfirmPassword(e.target.value);

  const checkInput = () => {
    const isPass = username !== "" && password !== "" && password === confirmPassword;
    if (!isPass) {
      toast({
        title: "错误",
        description:
          username === password && username !== "" ? "两次密码不匹配" : "用户名或密码未填完整",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
    return isPass;
  };
  const handleRegister = () => {
    if (checkInput()) {
      // login
      console.log("start register");
    }
  };
  return (
    <>
      <Image src="./icons/64.png" w="64px" h="64px" />
      <Text m=".8rem" textAlign="center">
        🌵 注册一个账号，我希望能为你提供更多功能
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
            onKeyPress={(e) => handleEnter(e, handleRegister)}
          />
        </InputGroup>
        <InputGroup m="1rem">
          <InputLeftElement pointerEvents="none">
            <Icon pos="relative" bottom="4px" as={FaUserAlt} color="gray.300" />
          </InputLeftElement>
          <Input
            value={password}
            onChange={handleChangePassword}
            size="sm"
            variant="flushed"
            placeholder="密码"
            onKeyPress={(e) => handleEnter(e, handleRegister)}
          />
        </InputGroup>

        <InputGroup m="1rem">
          <InputLeftElement pointerEvents="none">
            <Icon pos="relative" bottom="4px" as={MdSecurity} color="gray.300" />
          </InputLeftElement>

          <Input
            value={confirmPassword}
            onChange={handleChangeConfirmPass}
            size="sm"
            type="password"
            variant="flushed"
            placeholder="重复密码"
            onKeyPress={(e) => handleEnter(e, handleRegister)}
          />
          <InputRightElement>
            <Icon
              as={AiOutlineEnter}
              pos="relative"
              bottom="4px"
              color={username.length > 0 && password.length > 0 ? "green.300" : "gray.300"}
              cursor="pointer"
              onClick={handleRegister}
              fontWeight="bold"
            />
          </InputRightElement>
        </InputGroup>
      </Flex>

      <Button colorScheme="blue" variant="ghost" onClick={goToLogin} m="0.5rem auto" size="sm">
        我有账号，直接登录
      </Button>
    </>
  );
}
