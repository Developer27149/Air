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
  Divider,
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { MdSecurity, MdEmail } from "react-icons/md";
import { AiOutlineEnter } from "react-icons/ai";
import { handleEnter } from "Utils/index.js";
import { register } from "Utils/request.js";
import { useDispatch } from "react-redux";
import { setProfile } from "Store/profile.js";
import { useHistory } from "react-router";
import { createHash } from "../../utils/index";
import LoginAndTip from "./LoginAndTip.js";

export default function LoginElem({ goToLogin }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toast = useToast();
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
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
  const handleRegister = async () => {
    if (checkInput()) {
      // login
      const res = await register({ username, password: createHash(password), email });
      const {
        data: {
          token,
          result: { intro },
        },
        status: { code },
      } = res;
      // save token and userinfo
      if (code !== -1) {
        dispatch(
          setProfile({
            username,
            email,
            intro,
            token,
          })
        );
        // 重定向到首页
        history.replace("/");
      }
    }
  };
  return (
    <>
      <LoginAndTip tip="🌵 注册一个账号，我希望能为你提供更多功能" />
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
            maxLength="9"
            onKeyPress={(e) => handleEnter(e, handleRegister)}
          />
        </InputGroup>
        <InputGroup m="1rem">
          <InputLeftElement pointerEvents="none">
            <Icon pos="relative" bottom="4px" as={MdEmail} color="gray.300" />
          </InputLeftElement>
          <Input
            value={email}
            onChange={handleChangeEmail}
            size="sm"
            type="emial"
            variant="flushed"
            maxLength="24"
            placeholder="邮箱（可选，希望能联系上你）"
            onKeyPress={(e) => handleEnter(e, handleRegister)}
          />
        </InputGroup>
        <InputGroup m="1rem">
          <InputLeftElement pointerEvents="none">
            <Icon pos="relative" bottom="4px" as={MdSecurity} color="gray.300" />
          </InputLeftElement>
          <Input
            value={password}
            maxLength="16"
            onChange={handleChangePassword}
            size="sm"
            type="password"
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
            maxLength="16"
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
      <Flex justify="center" align="center" mb="1rem" w="100%">
        <Divider minW="8rem" />
        <Text flexGrow="1" textAlign="center" minW="7rem">
          🏄🏿
        </Text>
        <Divider minW="8rem" />
      </Flex>

      <Button colorScheme="blue" variant="ghost" onClick={goToLogin} m="0.5rem auto" size="sm">
        我有账号，直接登录
      </Button>
    </>
  );
}
