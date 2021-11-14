const { default: axios } = require("axios");
axios.defaults.baseURL = "http://localhost:3000";
axios.interceptors.request.use((config) => {
  if (globalThis?.settings?.profile?.token) {
    config.headers.Authorization = `Bearer ${globalThis?.settings?.profile?.token}`;
  }
  return config;
});

export const getRandomWallpaper = async (historyId = []) => {
  try {
    console.log(globalThis.settings);
    const { data } = await axios.post(`/wallpaper/random`, {
      historyId,
    });
    return data;
  } catch (error) {
    console.log("网络问题，无法获取后端服务", error);
  }
};

export const getRandomMusic = async () => {
  const res = await axios.get("/music/random");
  return res;
};

export const getNewestUrl = async (id) => {
  return axios.get(`/music/url/${id}`);
};

export const register = async (postData) => {
  try {
    const { data } = await axios.post("/user/register", postData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const loginAndGetToken = async (postData) => {
  try {
    const { data } = await axios.post("/user/login", postData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWallpaperByFilter = async (
  postData = { page: 1, limit: 10, sortType: "newest" }
) => {
  console.log(postData);
  const { page, limit, sortType } = postData;
  try {
    const { data } = await axios.post("/wallpaper/page", { page, limit, sortType });
    if (data.status.code === 0) {
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setWallpaperScore = async (id, like = true) => {
  try {
    const {
      data: {
        status: { code },
      },
    } = await axios.post("/wallpaper/score", { like, id });
    console.log(code);
    return code === 1;
  } catch (error) {
    console.log(error);
    return false;
  }
};
