import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/layout";
import { InputGroup, InputLeftElement, InputRightElement, Input } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail, MdSecurity } from "react-icons/md";
import { AiOutlineEnter } from "react-icons/ai";
import { useToast } from "@chakra-ui/toast";
import { loginAndGetToken, register } from "Utils/request.js";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "Store/profile.js";
import { createHash, handleEnter } from "Utils/index.js";
import OauthLogin from "../Login/OauthLogin";
import { setWallpaper } from "Store/homeSlice.js";

export default function RegisterElement({ redirectToHome, isOnLogin = false }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const wallpaper = useSelector((state) => state.home.wallpaper);

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
    let isPass, errInfo;
    if (isOnLogin) {
      isPass = username.length > 0 && password.length > 0;
      if (!isPass) {
        errInfo = "账号或密码未填写";
      }
    } else {
      isPass = username !== "" && password !== "" && password === confirmPassword;
      if (!isPass) {
        errInfo =
          username === password && username !== "" ? "两次密码不匹配" : "用户名或密码未填完整";
      }
    }
    if (!pass) {
      toast({
        title: "错误",
        description: errInfo,
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
      let res;
      if (isOnLogin) {
        res = await loginAndGetToken({ username, password: createHash(password) });
      } else {
        res = await register({ username, password: createHash(password), email });
      }
      const {
        data: {
          token,
          result: { intro, email, username, likeWallpaperId, uploadWallpaperId },
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
            uploadWallpaperId,
          })
        );
        dispatch(
          setWallpaper({
            ...wallpaper,
            like: likeWallpaperId,
          })
        );
        // 重定向到首页
        redirectToHome();
      }
    }
  };

  return (
    <Flex
      // w="40%"
      // h="max(60vh, 600px)"

      m="1rem"
      // bg="#3892b71a"
      bg="white"
      borderRadius="0.4rem"
      justify="center"
      align="center"
      flexDir="column"
      pos="absolute"
      right="2rem"
      zIndex="9"
      flexDir="column"
      // border="1px solid blue"
    >
      <InputGroup maxW="18rem" bg="purple.50" m="1rem auto" boxSizing="border-box">
        <InputLeftElement pointerEvents="none">
          <Icon pos="relative" bottom="4px" as={FaUserAlt} color="purple.300" />
        </InputLeftElement>
        <Input
          bg="grey.200"
          value={username}
          onChange={handleChangeUsername}
          size="sm"
          variant="flushed"
          placeholder="昵称"
          maxLength="9"
          onKeyPress={(e) => handleEnter(e, handleRegister)}
        />
      </InputGroup>
      <InputGroup maxW="18rem" bg="purple.50" m="1rem auto">
        <InputLeftElement pointerEvents="none">
          <Icon pos="relative" bottom="4px" as={MdSecurity} color="purple.300" />
        </InputLeftElement>
        <Input
          bg="grey.200"
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
      {isOnLogin ? (
        <Box h="128px" w="1rem"></Box>
      ) : (
        <>
          <InputGroup maxW="18rem" bg="purple.50" m="1rem auto">
            <InputLeftElement pointerEvents="none">
              <Icon pos="relative" bottom="4px" as={MdSecurity} color="purple.300" />
            </InputLeftElement>

            <Input
              bg="grey.200"
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
                color={
                  username.length > 0 && password.length > 0 && confirmPassword === password
                    ? "green.500"
                    : "transparent"
                }
                cursor="pointer"
                onClick={handleRegister}
                fontWeight="bold"
              />
            </InputRightElement>
          </InputGroup>
          <InputGroup maxW="18rem" bg="purple.50" m="1rem auto">
            <InputLeftElement pointerEvents="none">
              <Icon pos="relative" bottom="4px" as={MdEmail} color="purple.300" />
            </InputLeftElement>
            <Input
              bg="grey.200"
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
        </>
      )}

      <OauthLogin maxW="18rem" />
    </Flex>
  );
}
