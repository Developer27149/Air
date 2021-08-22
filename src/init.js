import { getStorage, setStorage } from "./utils";
import { configSchema } from "./schema";
import { getAllWallpaper, getMsg, backendStatuTest } from "./utils";

const updateTime = new Date().getTime();
let defaultConfig = {
  showTime: true,
  fixedImg: "",
  updateTime: new Date().getTime(),
  imgArr: [],
  unlikeImgArr: [],
  historyIdArr: [],
  videoArr: [],
  searchEngine: "google.com", // support google bing and others
  msg: "潜龙勿用",
  useRawWallpaper: "auto",
  apiHost: "http://localhost:3000",
  location: "",
};

const initProxyConfig = (config) => {
  globalThis.config = new Proxy(config, {
    set: function (target, prop, receiver) {
      // 更新的同时，修改本地存储
      target[prop] = receiver;
      configSchema.isValid(target).then(async (valid) => {
        console.log(valid, "is valid, from global config proxy");
        if (valid) {
          await setStorage({
            config: JSON.stringify(target),
          });
        }
      });
      return true;
    },
  });
};

export default async function init() {
  try {
    // chrome.storage.local.clear();
    const connectedWithBackend = await backendStatuTest();
    console.log(navigator.onLine, connectedWithBackend);
    // 网络通畅
    if (navigator.onLine && connectedWithBackend) {
      let storage = await getStorage("config");
      let config = storage?.config;
      // 获取 msg 和 wallpapers
      const res = await Promise.all([getMsg(), getAllWallpaper()]);
      defaultConfig.imgArr = res[1];
      defaultConfig.msg = res[0];
      const isValid = await configSchema.isValid(config);
      if (!isValid) {
        console.log("init check, unvalid and get data from backend then set storage data");
        //  save config to storage
        setStorage({
          config: JSON.stringify(defaultConfig),
        });
      } else if (config.updateTime && config.updateTime + 1000 * 60 * 60 * 24 < updateTime) {
        console.log("update current storage data");
        // update dateTime
        config.updateTime = updateTime;
        // update all data by server
        config.msg = res[0];
        config.imgArr = res[1].filter(
          (i) => !config.unlikeImgArr.includes(i) && !config.historyIdArr.includes(i)
        );
        if (config.unlikeImgArr.length > 100) config.unlikeImgArr = [];
        if (config.historyIdArr.length > 365) config.historyIdArr = [];
        setStorage({
          config: JSON.stringify(config),
        });
        defaultConfig = config;
      }
    } else {
      console.log("backend is loss");
      let storage = await getStorage("config");
      let config = storage?.config;
      console.log(config, "is config from storage");
      if (config) {
        defaultConfig = config;
      }
    }
    // 将配置文件写入到 storage 里
  } catch (error) {
    console.log(error, "is init error");
  }
  initProxyConfig(defaultConfig);
}
