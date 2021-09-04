import React, { useEffect, useState } from "react";
import axios from "axios";
// import { emptyFunc } from "../utils/index.js";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setWeather } from "Store/homeSlice.js";
import { setUpdateTimestamp } from "Store/basicSlice.js";
import UseWeather from "Hooks/useWeather.js";

export default function Weather() {
  const data = UseWeather();
  return (
    <Box color="white" transition="all 1s ease-in-out">
      {data.temp}°C {data.text}
    </Box>
  );
}
