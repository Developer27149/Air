import axios from "axios";
import { configSchema } from "Schema/index.js";
import { getStorage, setStorage } from "Utils/index.js";

export const config = {
  wallpaper: {
    raw: false,
    fixed: false,
    history: [],
    unlike: [],
    items: [],
  },
  time: {
    showTime: true,
    showWeather: true,
    location: "",
  },
  msg: {
    show: true,
    fontSize: 32,
    text: "潜龙勿用",
  },
  search: {
    engine: "google.com",
  },
  updateTimestamp: new Date().getTime(),
  backendBaseUrl: "http://localhost:3000",
  token: "",
};

export const init = async () => {
  const storageData = await getStorage("config");
  const isValid = await configSchema.isValid(storageData?.config);
  let currentConfig = config;
  console.log(storageData?.config, "is storage data", isValid);
  if (isValid) {
    currentConfig = storageData?.config;
    // just update data
    // 1. get new image items
    const { data } = await axios.get(`${config.backendBaseUrl}/wallpapers`);
    currentConfig.wallpaper.items = data;
  } else {
    console.log("clear local storage");
    await chrome.storage.local.clear();
    await setStorage({
      config: JSON.stringify(currentConfig),
    });
  }
  globalThis.settings = new Proxy(currentConfig, {
    set: async function (target, prop, receiver) {
      // 更新的同时，修改本地存储
      target[prop] = receiver;
      const isValid = configSchema.isValid(target);
      if (isValid) {
        console.log("current setting is valid");
        await setStorage({
          config: JSON.stringify(target),
        });
      } else {
        console.log("config is unvalid");
      }
    },
  });

  console.log(await getStorage("config"));
};
