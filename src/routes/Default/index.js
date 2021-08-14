import React, { useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import Search from "../../components/Search";
import { setImg, setType } from "../../store/defaultSlice";
import { getStorageData, setStorageData } from "../../utils";

export default function Default() {
  const img = useSelector((state) => state.default.img);
  const dispatch = useDispatch();

  useEffect(async () => {
    const conf = await getStorageData("config");
    if (conf.imgUrl) {
      dispatch(setImg(conf.imgUrl));
    }
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      w="100vw"
      h="100vh"
      position="relative"
    >
      <Image
        src={img}
        objectFit="cover"
        w="100vw"
        h="100vh"
        position="absolute"
        background="linear-gradient(to right, #59c173, #a17fe0, #5d26c1)"
      />
      <Search />
    </Box>
  );
}
