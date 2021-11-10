import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setWallpaper } from "Store/homeSlice.js";
import { setProfile } from "Store/profile.js";
import { createHash } from "Utils/index.js";
import { loginAndGetToken, register } from "Utils/request.js";

export default function useAccount() {
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useHistory();
  const redirectToHome = () => history.replace("/");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showVisibleEyesIcon, setShowVisibleEyesIcon] = useState(true);
  const [hashPassword, setHashPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const wallpaper = useSelector((state) => state.home.wallpaper);

  const handleChangeInputValue = (typeStr) => {
    if (typeStr === "username") return (e) => setUsername(e.target.value.trim());
    if (typeStr === "password") return (e) => setPassword(e.target.value.trim());
    if (typeStr === "email") return (e) => setEmail(e.target.value.trim());
    if (typeStr === "confirmPassword") return (e) => setConfirmPassword(e.target.value.trim());
    if (typeStr === "showVisibleEyesIcon")
      return () => setShowVisibleEyesIcon(!showVisibleEyesIcon);
  };
  const onChangeUsername = handleChangeInputValue("username");
  const onChangePassword = handleChangeInputValue("password");
  const onChangeEmail = handleChangeInputValue("email");
  const onChangeConfirmPassword = handleChangeInputValue("confirmPassword");
  const onChangeShowVisibleEyesIcon = handleChangeInputValue("showVisibleEyesIcon");
  const checkPublicValue = () => {
    if (username.trim().length < 1) {
      setError("用户名缺失");
      return false;
    } else if (hashPassword.length === 0) {
      setError("密码缺失");
      return false;
    } else {
      return true;
    }
  };
  const handleLogin = async () => {
    if (checkPublicValue()) {
      try {
        setIsLoading(true);
        const res = await loginAndGetToken({
          username,
          password: hashPassword,
        });
        if (res?.status.code !== -1) {
          // save token
          const {
            data: {
              token,
              result: { username, email, intro, likeWallpaperId, uploadWallpaperId },
            },
          } = res;
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
          setIsLoading(false);
          redirectToHome();
        } else {
          setError(res?.status?.msg ?? "未知错误，都怪作者这个菜鸡");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRegister = async () => {
    if (checkPublicValue()) {
      if (password !== confirmPassword) {
        setError("两次密码不一致🙅🏻");
      } else {
        try {
          setIsLoading(true);
          const res = await register({ username, password: hashPassword, email });
          const {
            data: {
              token,
              result: { intro, uploadWallpaperId },
            },
            status: { code, msg },
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
            setIsLoading(false);
            // 重定向到首页
            redirectToHome();
          } else {
            setError(msg ?? "未知错误，都怪作者这个菜鸡");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    if (password.trim() !== "") {
      setHashPassword(createHash(password));
    } else {
      setHashPassword("");
    }
  }, [password]);
  useEffect(() => {
    if (error && error.length > 0) {
      toast({
        title: "提示",
        description: error,
        status: "error",
        isClosable: true,
      });
      setError(null);
    }
  }, [error]);
  return {
    username,
    password,
    confirmPassword,
    email,
    hashPassword,
    showVisibleEyesIcon,
    isLoading,
    setError,
    onChangeUsername,
    onChangePassword,
    onChangeConfirmPassword,
    onChangeShowVisibleEyesIcon,
    onChangeEmail,
    handleLogin,
    handleRegister,
  };
}
