import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { DiBingSmall, DiCode } from "react-icons/di";
import { SiZhihu } from "react-icons/si";
import { GiGoldNuggets } from "react-icons/gi";
import { VscGithubAlt } from "react-icons/vsc";

export const searchIcons = { FcGoogle, DiCode, DiBingSmall, SiZhihu, GiGoldNuggets, VscGithubAlt };

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
    const res = await axios.get(`${config.backendHost}/wallpapers?name=aaron`);
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
    const res = await axios.get(`${config.backendHost}/msg?name=aaron`);
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
    gg: "google.com",
    zh: "zhihu.com",
    jj: "juejin.cn",
    dev: "dev.to",
  };
  return _[keyword];
};

export const selectIcon = (engine) => {
  if (engine === "bing.com") return DiBingSmall;
  if (engine === "zhihu.com") return SiZhihu;
  if (engine === "dev.to") return DiCode;
  if (engine === "github.com") return VscGithubAlt;
  if (engine === "juejin.cn") return GiGoldNuggets;
  return FcGoogle;
};

export const emptyFunc = () => {};
