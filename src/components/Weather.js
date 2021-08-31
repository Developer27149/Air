import React, { useEffect, useState } from "react";
import axios from "axios";
// import { emptyFunc } from "../utils/index.js";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setWeather } from "Store/homeSlice.js";

export default function Weather() {
  const [data, setData] = useState({
    temp: 0,
    text: "",
  });
  const [display, setDisplay] = useState("none");
  const time = useSelector((state) => state.basic.time);
  const backendBaseUrl = useSelector((state) => state.basic.backendBaseUrl);
  const updateTimestamp = useSelector((state) => state.home.updateTimestamp);

  const dispatch = useDispatch();
  useEffect(() => {
    const getWeather = async () => {
      const { location } = time;
      if (location !== "") {
        const { data } = await axios.get(`${backendBaseUrl}/weather?location=${location}`);
        setDisplay("inline-block");
        setData(data);
        dispatch(setWeather({ text: data.text, temp: data.temp }));
      } else {
        navigator.geolocation.getCurrentPosition(
          async ({ coords }) => {
            console.log("start get weather");
            console.log("get data from location", coords);
            const { latitude, longitude } = coords;
            const { data } = await axios.get(
              `${backendBaseUrl}/weather?location=${longitude.toFixed(2)},${latitude.toFixed(2)}`,
              {
                timeout: 12000,
              }
            );
            setDisplay("inline-block");
            setData(data);
            dispatch(setWeather({ text: data.text, temp: data.temp }));
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
