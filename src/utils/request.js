const { default: axios } = require("axios");
axios.defaults.baseURL = "http://localhost:3000";

export const getRandomWallpaper = async () => {
  try {
    console.log(globalThis.settings);
    const { data } = await axios.post(
      `/wallpaper/random`,
      {
        historyId: globalThis.settings.wallpaper.history,
      },
      {
        headers: {
          Authorization: `Basic ${globalThis?.settings?.profile?.token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("网络问题，无法获取后端服务");
    return Promise.reject({
      message: "网络异常",
    });
  }
};

export const getMsg = async () => {
  try {
    const { data } = await axios.get(`/msg/random`);
    return data;
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

export const register = async (postData) => {
  try {
    const { data } = await axios.post("/user/register", postData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
