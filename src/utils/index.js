import axios from "axios";

export function getStorageData(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], (res) => {
      if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
      resolve(res[key]);
    });
  });
}

export function setStorageData(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(
      {
        [key]: value,
      },
      (res) => {
        if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
        resolve(res);
      }
    );
  });
}

export const clearStorage = chrome.storage.local.clear;

export const isObject = (v) => v !== null && typeof v === "object";

export const isEmptyObj = (obj) => isObject(obj) && Object.keys(obj).length === 0;

export const getRandomWallpaper = async () => {
  const domain = process.env.HOST;
  const secret = process.env.UNSPLASH_ACCESS_KEY;
  const url = `${domain}/search/photos?client_id=${secret}&query=4k+wallpaper+desktop+hd`;
  console.log(url);
  const res = await axios.get(url);
  console.log(res);
  return res?.data;
};
