import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateTimestamp } from "Store/basicSlice.js";

export default function UseWeather() {
  const updateTimestamp = useSelector((state) => state.basic.updateTimestamp);
  const backendBaseUrl = useSelector((state) => state.basic.backendBaseUrl);
  // init weather
  const weather = useSelector((state) => state.home.weather);
  const time = useSelector((state) => state.basic.time);
  const dispatch = useDispatch();
  // data
  const [weatherData, setWeatherData] = useState(weather);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDateTime = new Date().getTime();
        // 如果最近一小时内获取过则忽略
        if (currentDateTime - updateTimestamp > 1000 * 60 * 60) {
          // 获取新的天气信息之后，将时间更新到 storage
          dispatch(setUpdateTimestamp(currentDateTime));
          const { location } = time;
          // 如果用户设置了地址，则不需要使用自动定位
          if (location !== "") {
            const { data } = await axios.get(`${backendBaseUrl}/weather?location=${location}`);
            dispatch(setWeather({ text: data.text, temp: data.temp }));
            setWeatherData(data);
          } else {
            navigator.geolocation.getCurrentPosition(
              async ({ coords }) => {
                console.log("start get weather");
                console.log("get data from location", coords);
                const { latitude, longitude } = coords;
                const { data } = await axios.get(
                  `${backendBaseUrl}/weather?location=${longitude.toFixed(2)},${latitude.toFixed(
                    2
                  )}`,
                  {
                    timeout: 12000,
                  }
                );
                dispatch(setWeather({ text: data.text, temp: data.temp }));
              },
              (err) => {
                console.log("error...from useWeather hook: ", err);
              },
              {
                enableHighAccuracy: true, // 提高定位精确度
              }
            );
          }
        }
      } catch (error) {
        // 出错则使用旧的天气
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return weatherData;
}
