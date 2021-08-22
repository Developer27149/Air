import React, { useEffect, useState } from "react";
import axios from "axios";
// import { emptyFunc } from "../utils/index.js";
import { Box } from "@chakra-ui/react";

export default function Weather() {
  const [data, setData] = useState({
    temp: 28,
    text: "晴",
  });
  const [display, setDisplay] = useState("none");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        console.log("start get weather");
        console.log("get data from location", coords);
        const { latitude, longitude } = coords;
        const res = await axios.get(
          `${globalThis.config.apiHost}/weather?name=aaron&location=${longitude.toFixed(
            2
          )},${latitude.toFixed(2)}`,
          {
            timeout: 12000,
          }
        );
        setDisplay("inline-block");
        setData(res.data);
      },
      (err) => {
        console.log("error...from weather: ", err);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);
  return (
    <Box color="white" display={display} transition="all 1s ease-in-out">
      {data.temp}°C {data.text}
    </Box>
  );
}
