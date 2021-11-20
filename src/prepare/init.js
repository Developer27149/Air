import { configSchema } from "Schema/index.js";
import { getStorage, setStorage } from "Utils/index.js";
import { base64String, downloadUrl } from "Utils/wallpaperBase64.js";

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
    like: [],
    items: [],
    downloadUrl,
    imgBase64: base64String,
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
  weather: {
    temp: 28,
    text: "多云",
  },
  profile: {
    username: "",
    avatar: "",
    uploadWallpaperId: [],
    email: "",
    intro: "",
    token: "",
    isAnonymous: false,
  },
  todo: {
    tasks: [
      {
        create_at: new Date().getDate(),
        status: "init",
        content: {
          title: "喵喵",
          text: "喂猫！记得喂猫，不要放太多猫粮.",
        },
        deadline: "2022-12-22",
        needNotice: false,
        importantLevel: 5,
        comments: [],
        isFixed: false,
        id: "apxdd212c",
      },
      {
        create_at: new Date().getDate(),
        status: "init",
        content: {
          title: "二哈",
          text: "带他出去逛逛，不然要拆家了怎么办！😭",
        },
        deadline: "2022-12-22",
        needNotice: false,
        importantLevel: "important",
        comments: [],
        isFixed: true,
        id: "apxdd2123",
      },
      {
        create_at: new Date().getDate(),
        status: "doing",
        content: {
          title: "打球⛹",
          text: "我先去打篮球了，锻炼锻炼不然太拉胯了！！⛹",
        },
        deadline: "2022-12-22",
        needNotice: false,
        importantLevel: "normal",
        comments: [],
        isFixed: false,
        id: "apxdd21jj",
      },
    ],
    activeMenu: true,
    activeMenuItemId: 1,
    showTip: true,
  },
};

export const init = async () => {
  try {
    // await chrome.storage.local.clear()
    // 首先读取本地配置，检查配置文件是否符合格式
    const storageConfig = await getStorage("config");
    const isValid = await configSchema.isValid(storageConfig);
    // configSchema
    //   .validate(storageConfig)
    //   .then((r) => {
    //     console.log(r);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
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
        try {
          // 更新的同时，修改本地存储
          target[prop] = receiver;

          const isValid = await configSchema.isValid(target);
          // console.log(target, isValid);
          if (isValid) {
            await setStorage({
              config: target,
            });
          } else {
            console.log("config is unvalid，无法更新配置", target);
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
    // 禁止页面刷新行为导致文件丢失异常 - 暂时无解
    // window.onbeforeunload = () => {};
  } catch (error) {
    // 错误
    console.log(`初始化数据错误：${error}`);
  }
};
