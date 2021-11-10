import Icon from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { motion } from "framer-motion";
import { Input, InputGroup, InputRightElement, InputLeftElement } from "@chakra-ui/input";
import { FaUserAlt } from "react-icons/fa";
import { MdSecurity, MdVisibilityOff, MdVisibility, MdEmail } from "react-icons/md";
import { Button } from "@chakra-ui/button";
import useAccount from "./useAccount";
const MBox = motion.div;

export default function AcountRegister() {
  const {
    username,
    password,
    email,
    confirmPassword,
    showVisibleEyesIcon,
    onChangeUsername,
    onChangePassword,
    onChangeEmail,
    onChangeConfirmPassword,
    onChangeShowVisibleEyesIcon,
    handleRegister,
  } = useAccount();

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
          transform: "scale(0.8)",
        }}
        animate={{
          opacity: 1,
          left: 0,
          transform: "scale(1)",
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
              placeholder="用户名"
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

          <InputGroup>
            <InputLeftElement mt="0.9rem" ml="0.5rem">
              <Icon as={MdSecurity} color="#6c63ed" />
            </InputLeftElement>
            <Input
              type={showVisibleEyesIcon ? "password" : "text"}
              required
              placeholder="确认密码"
              onChange={onChangeConfirmPassword}
              value={confirmPassword}
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

          <InputGroup>
            <InputLeftElement mt="0.9rem" ml="0.5rem">
              <Icon as={MdEmail} color="#6c63ed" />
            </InputLeftElement>
            <Input
              placeholder="邮箱（可选，欢迎填写）"
              value={email}
              onChange={onChangeEmail}
              maxLength="32"
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

          <Button
            fontSize="1rem"
            w="320px"
            boxShadow="#0000ff14 2px 4px 10px"
            bg="#4460F1"
            color="white"
            m="0.5rem"
            mt="2rem"
            borderRadius="0.6rem"
            _hover={{
              bg: "#4460F1",
            }}
            onClick={handleRegister}
            isLoading=""
          >
            注册
          </Button>
        </form>
      </MBox>
    </Box>
  );
}
