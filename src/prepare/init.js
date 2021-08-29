import axios from "axios";
import { configSchema } from "Schema/index.js";
import { getStorage } from "Utils/index.js";

export const config = {
  wallpaper: {
    raw: false,
    fixed: false,
    history: [],
    unlike: [],
    items: [
      "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3904&q=80",
    ],
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
  const isValid = await configSchema.isValid(storageData.config);
  let currentConfig = config;
  console.log(storageData.config, "is storage data", isValid);
  if (isValid) {
    currentConfig = storageData.config;
    // just update data
    // 1. get new image items
    const wallpapersData = await axios.get(`${config.backendBaseUrl}/wallpapers`);
    console.log(wallpapersData, "is wallpapers data");
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
