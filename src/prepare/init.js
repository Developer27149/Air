import { configSchema } from "Schema/index.js";
import { clearStorage, getStorage, setStorage } from "Utils/index.js";

/**
 * 默认配置文件，导出初始化配置文件给第一次使用扩展的用户
 * 导出初始化函数
 */

export const config = {
  wallpaper: {
    raw: false,
    fixed: false,
    history: [],
    unlike: [],
    items: [],
    blob: {},
  },
  time: {
    showTime: true,
    showWeather: true,
    location: "柳州",
  },
  msg: {
    show: true,
    fontSize: 24,
    text: "毒鸡汤",
  },
  search: {
    engine: "bing.com",
  },
  updateTimestamp: new Date().getTime(),
  backendBaseUrl: "http://localhost:3000",
  token: "",
  weather: {
    temp: 28,
    text: "多云",
  },
};

export const init = async () => {
  try {
    // 首先读取本地配置，检查配置文件是否符合格式
    await chrome.storage.local.clear();
    const storageConfig = await getStorage("config");
    console.log("本地配置文件", storageConfig, typeof storageConfig);
    const isValid = await configSchema.isValid(storageConfig);
    // 设置当前配置为默认格式
    // 无效则清空配置，重建本地数据
    if (!isValid) {
      console.log("本地配置无效，重建本地配置");
      await chrome.storage.local.clear();
      await setStorage({
        config,
      });
    } else {
      console.log("配置文件有效，下一步");
    }
    // 初始化全局配置对象，每次更新这个对象都自动修改本地数据
    globalThis.settings = new Proxy(isValid ? storageConfig : config, {
      set: async function (target, prop, receiver) {
        // 更新的同时，修改本地存储
        target[prop] = receiver;
        const isValid = configSchema.isValid(target);
        if (isValid) {
          await setStorage({
            config: JSON.stringify(target),
          });
        } else {
          console.log("config is unvalid，无法更新配置");
        }
      },
    });
  } catch (error) {
    // 错误
    console.log(`初始化数据错误：${error}`);
  }
};
