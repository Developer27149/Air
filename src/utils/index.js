import axios from "axios";

export function getStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (items) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      if (isEmptyObj(items)) {
        resolve(undefined);
      } else {
        items[key] = JSON.parse(items[key]);
        resolve(items);
      }
    });
  });
}

export function setStorage(obj) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(obj, () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      resolve(true);
    });
  });
}

export const clearStorage = chrome.storage.local.clear;

export const isObject = (v) => v !== null && typeof v === "object";

export const isEmptyObj = (obj) => isObject(obj) && Object.keys(obj).length === 0;

export const getAllWallpaper = async () => {
  try {
    const res = await axios.get("http://localhost:3000/wallpapers?name=aaron");
    return res.data;
  } catch (error) {
    console.log("网络问题，无法获取 Aaron 服务");
    return Promise.reject({
      message: "网络异常",
    });
  }
};

export const getMsg = async () => {
  try {
    const res = await axios.get("http://localhost:3000/msg?name=aaron");
    return res.data.data;
  } catch (error) {
    console.log(error, "from get msg");
    return "潜龙勿用";
  }
};

export const replaceCurrentWallpaper = () => {
  const { historyIdArr, imgArr } = globalThis.config;
  const _ = imgArr.shift();
  if (!historyIdArr.includes(_.id)) {
    historyIdArr.push(_.id);
  }
  globalThis.config.imgArr = imgArr;
  globalThis.config.historyIdArr = historyIdArr;
  return imgArr[0].url;
};

export const ganzhijinian = (year) => {
  let _ = "";
  year === 2021 && (_ = "辛丑");
  year === 2022 && (_ = "壬寅");
  return _;
};

export const keyword2SearchEngine = (keyword) => {
  const _ = {
    gh: "github.com",
    bi: "bing.com",
    bd: "baidu.com",
    gg: "google.com",
    zh: "zhihu.com",
    jj: "juejin.cn",
    dev: "dev.to",
  };
  return _[keyword];
};

export const emptyFunc = () => {};
