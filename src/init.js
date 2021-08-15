import { getStorage, setStorage } from "./utils";
import { configSchema } from "./schema";
import { getAllWallpaper } from "./utils";

export default async function init() {
  try {
    // chrome.storage.local.clear();
    if (navigator.onLine) {
      const updateTime = new Date().getTime();
      let storage = await getStorage("config");
      let imgData = [];
      let config = storage?.config;
      const isValid = await configSchema.isValid(config);
      if (!isValid) {
        console.log(1);
        imgData = await getAllWallpaper();
        // init config
        config = {
          updateTime,
          imgArr: imgData,
          unlikeImgArr: [],
          historyIdArr: [],
          videoArr: [],
          searchEngine: "g", // support google bing and others
        };
        await setStorage({
          config: JSON.stringify(config),
        });
      } else if (config.updateTime && config.updateTime + 1000 * 60 * 60 * 24 > updateTime) {
        console.log("2");
        // update datetime
        config.updateTime = updateTime;
        // update all data by server
        const lastImgArr = await getAllWallpaper();
        config.imgArr = lastImgArr.filter((i) => !config.unlikeImgArr.includes(i));
        if (config.unlikeImgArr.length > 100) config.unlikeImgArr = [];
        if (config.historyIdArr.length > 365) config.historyIdArr = [];
        await setStorage({
          config: JSON.stringify(config),
        });
      }
      globalThis.config = new Proxy(config, {
        set: function (target, prop, receiver) {
          console.log("change global config object");
          console.log(target, prop, receiver);
          target[prop] = receiver;
          return true;
        },
      });
    }
  } catch (error) {
    console.log(error, "is init error");
  }
}
