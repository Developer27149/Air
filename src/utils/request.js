const { default: axios } = require("axios");
axios.defaults.baseURL = "http://localhost:3000";
const createHeaders = () => {
  return {
    Authorization: `Bearer ${globalThis?.settings?.profile?.token}`,
  };
};

export const getRandomWallpaper = async (historyId = []) => {
  try {
    console.log(globalThis.settings);
    const { data } = await axios.post(
      `/wallpaper/random`,
      {
        historyId,
      },
      {
        headers: createHeaders(),
      }
    );
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
    const { data } = await axios.post(
      "/wallpaper/page",
      { page, limit, sortType },
      {
        headers: createHeaders(),
      }
    );
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
