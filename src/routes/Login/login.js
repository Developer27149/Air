import React, { useState } from "react";
import { Icon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
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
import RegisterElem from "./register.js";
import { loginAndGetToken } from "Utils/request.js";
import { createHash } from "../../utils/index";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "Store/profile.js";
import { setWallpaper } from "Store/homeSlice.js";
import OauthLogin from "./OauthLogin.js";
import LoginAndTip from "./LoginAndTip.js";

export default function LoginElem() {
  const [isOnLogin, setIsOnLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const wallpaper = useSelector((state) => state.home.wallpaper);

  const toast = useToast();
  const dispatch = useDispatch();
  const history = useHistory();
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
  const handleLogin = async () => {
    if (checkInput()) {
      // login
      console.log("start login");
      const res = await loginAndGetToken({ username, password: createHash(password) });
      console.log(res.data, res.status);
      if (res?.status.code !== -1) {
        // save token
        const {
          data: {
            token,
            result: { username, email, intro, likeWallpaperId, uploadWallpaperId },
          },
        } = res;
        console.log(likeWallpaperId, uploadWallpaperId);
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
        history.replace("/");
      }
    }
  };
  return (
    <Box
      bg="white"
      padding={["1rem", "1rem", "2rem"]}
      w="min(500px, 38vw)"
      h="min(800px, 80vh)"
      borderRadius="1rem"
      pos="relative"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      overflowY="scroll"
    >
      <Flex
        pos="absolute"
        left={!isOnLogin ? "0" : "1rem"}
        zIndex={isOnLogin ? "-1" : "0"}
        top="0"
        bottom="0"
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
      <Flex
        flexDir="column"
        justify="center"
        align="center"
        pos="relative"
        left={isOnLogin ? 0 : "1rem"}
        zIndex={isOnLogin ? 1 : -1}
      >
        <LoginAndTip tip="不是很麻烦，只需要登录一次即可🌵" />
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
              placeholder="昵称或邮箱"
              maxLength="24"
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
              maxLength="16"
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
        <OauthLogin />
        <Button
          colorScheme="blue"
          variant="ghost"
          onClick={() => setIsOnLogin(false)}
          m="0.5rem auto"
          size="sm"
        >
          没有账号，前去注册🌈
        </Button>
      </Flex>
    </Box>
  );
}
