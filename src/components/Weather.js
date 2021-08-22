import React, { useEffect, useState } from "react";
import axios from "axios";
// import { emptyFunc } from "../utils/index.js";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Weather() {
  const [data, setData] = useState({
    temp: 28,
    text: "晴",
  });
  const [display, setDisplay] = useState("none");
  const location = useSelector((state) => state.default.location);

  useEffect(() => {
    const getWeather = async () => {
      if (location !== "") {
        const res = await axios.get(
          `${globalThis.config.apiHost}/weather?name=aaron&location=${location}`
        );
        setDisplay("inline-block");
        setData(res.data);
      } else {
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
      }
    };
    getWeather();
  }, []);
  return (
    <Box color="white" display={display} transition="all 1s ease-in-out">
      {data.temp}°C {data.text}
    </Box>
  );
}
