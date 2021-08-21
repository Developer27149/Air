import React, { useEffect } from "react";
import axios from "axios";
import { emptyFunc } from "../utils/index.js";

export default function Weather() {
  useEffect(() => {
    console.log("start");
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        console.log("get data from location", coords);
        const { latitude, longitude } = coords;
        const res = await axios.get(
          `${globalThis.config.apiHost}/weather?name=aaron&location=${longitude.toFixed(
            2
          )},${latitude.toFixed(2)}`
        );
        console.log(res, "success");
      },
      (err) => {
        console.log("error...from weather: ", err);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);
  return <div>39°C</div>;
}
