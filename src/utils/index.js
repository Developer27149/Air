import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { DiBingSmall, DiCode } from "react-icons/di";
import { SiZhihu } from "react-icons/si";
import { GiGoldNuggets } from "react-icons/gi";
import { VscGithubAlt } from "react-icons/vsc";

export const searchIcons = { FcGoogle, DiCode, DiBingSmall, SiZhihu, GiGoldNuggets, VscGithubAlt };

/**
 * @param  {any} key
 * @return {Promise} data
 */
export function getStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (items) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      if (isEmptyObj(items)) {
        resolve(undefined);
      } else {
        try {
          // console.log(items, key, typeof items, typeof key);
          // console.log(items[key]);
          // const res = JSON.parse(items[key]);
          resolve(items[key]);
        } catch (error) {
          console.log(error);
        }
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

export const formatDuration = (duration) => "04:80";

export const emptyFunc = () => {};

export const getBase64FromUrl = async (url) => {
  const { data } = await axios.get(url, { responseType: "blob" });
  return blobToBase64(data);
};

export const isNewDay = (dateNum, boolOption) => {
  if (boolOption) return !!boolOption;
  console.log("比较日期");
  const tempDate = new Date().getDate();
  const result = tempDate - dateNum >= 1;
  return result;
};

export function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
/**
 * @param  {Array} arr
 * @param  {Number} num 将一维数组均匀拆分为多个二维数组
 * @returns {Array} []
 */
export function sliceArray(arr, num) {
  if (arr.length === 0 || num === 1) return arr;
  const result = [];
  const size = ~~(arr.length / num);
  while (arr.length > 0) {
    result.push(arr.splice(0, size));
  }
  return result;
}
