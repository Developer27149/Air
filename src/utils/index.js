import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { DiBingSmall, DiCode } from "react-icons/di";
import { SiZhihu } from "react-icons/si";
import { GiGoldNuggets } from "react-icons/gi";
import { VscGithubAlt } from "react-icons/vsc";
import { FiYoutube } from "react-icons/fi";
import md5 from "crypto-js/md5";

export const searchIcons = { FcGoogle, DiCode, DiBingSmall, SiZhihu, GiGoldNuggets, VscGithubAlt };

export const hadToken = () => {
  return globalThis.settings.profile.token !== "";
};

export const handleEnter = (e, cb) => {
  if (e.charCode == 13) {
    cb();
  }
};

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

export const ganzhijinian = (year) => {
  let _ = "";
  year === 2021 && (_ = "辛丑");
  year === 2022 && (_ = "壬寅");
  return _;
};

export const selectIcon = (engine) => {
  if (engine === "bing.com") return DiBingSmall;
  if (engine === "zhihu.com") return SiZhihu;
  if (engine === "dev.to") return DiCode;
  if (engine === "github.com") return VscGithubAlt;
  if (engine === "juejin.cn") return GiGoldNuggets;
  if (engine === "youtube.com") return FiYoutube;
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
 * @param  {Number} num 将一维数组均匀拆分为 num 个二维数组，如果小于 num ，则每一个分配一个元素
 * @returns {Array} []
 */
export function sliceArray(arr, num) {
  if (arr.length <= num) return arr.map((i) => [i]);
  const res = Array.from({ length: num }, () => []);
  while (arr.length > 0) {
    for (const item of res) {
      if (arr.length === 0) break;
      item.push(arr.shift());
    }
  }
  return res.filter((i) => i.length > 0);
}
/**
 * 将一维数组拆分为包含多个一位数组的二维数组，每个数组包含固定的个数
 * @param  {} perPageNum=15
 */
export function unflatArr(arr = [], perPageNum = 15) {
  const res = [];
  while (arr.length > 0) {
    res.push(arr.splice(0, perPageNum));
  }
  return res;
}

export const handleDownloadWallpaper = (url) => {
  chrome.downloads.download({
    method: "GET",
    url,
  });
};

/**
 * 通过获取缩放比例，获取目标图片的缩放高度
 * @param  {} width
 * @param  {} height
 * @param  {} resizeWidth=400
 */
export function generateFallbackImgWidth(width, height, resizeWidth = 400) {
  return (height / width) * resizeWidth;
}

export function shuffle(arr = []) {
  if (arr.length === 0) return arr;
  let i = arr.length;
  let temp;
  while (i !== 0) {
    temp = ~~(Math.random() * i--);
    [arr[i], arr[temp]] = [arr[temp], arr[i]];
  }
  return arr;
}

export function randomColor() {
  const randomColorArr = [
    "teal.50",
    "purple.100",
    "blue.100",
    "gray.300",
    "yellow.100",
    "pink.100",
    "red.100",
  ];
  return randomColorArr[~~(Math.random() * randomColorArr.length)];
}

export function goTop(elem = document.body) {
  elem.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

export const createHash = (password, secret = "") => md5(password, secret).toString();
