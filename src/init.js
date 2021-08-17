import { getStorage, setStorage } from "./utils";
import { configSchema } from "./schema";
import { getAllWallpaper } from "./utils";

export default async function init() {
  try {
    // chrome.storage.local.clear();
    if (navigator.onLine) {
      const updateTime = new Date().getTime();
      let storage = await getStorage("config");
      console.log("storage is:", storage, "end");
      let imgData = [];
      let config = storage?.config;
      const isValid = await configSchema.isValid(config);
      if (!isValid) {
        console.log("init check, unvalid");
        imgData = await getAllWallpaper();
        // init config
        config = {
          showTime: true,
          fixedImg: "",
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
      } else if (config.updateTime && config.updateTime + 1000 * 60 * 60 * 24 < updateTime) {
        console.log("update");
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
      console.table(imgData);
      globalThis.config = new Proxy(config, {
        set: function (target, prop, receiver) {
          // 更新的同时，修改本地存储
          target[prop] = receiver;
          console.log(target, "is target", prop, "is prop", receiver, "is receiver");
          configSchema.isValid(target).then(async (valid) => {
            console.log(valid, "is valid");
            if (valid) {
              await setStorage({
                config: JSON.stringify(target),
              });
            }
          });
          console.log("change data");
          return true;
        },
      });
    }
  } catch (error) {
    console.log(error, "is init error");
  }
}
