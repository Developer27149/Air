import { getStorageData, setStorageData, clearStorage, isEmptyObj } from "./utils";
import { configSchema } from "./schema";
import { getRandomWallpaper } from "./utils";

export default async function init() {
  const updateTime = new Date().getTime();
  let conf = await getStorageData("config");
  const isValid = await configSchema.isValid(conf);
  if (!isValid) {
    conf = {
      updateTime,
      imgUrl: "https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760_1280.jpg",
      backImgUrl: "https://cdn.pixabay.com/photo/2017/06/04/23/17/lighthouse-2372461_1280.jpg",
      videoUrl: "",
      backupVideoUrl: "",
    };
    setStorageData("config", conf);
  } else if (conf.updateTime && conf.updateTime + 1000 * 60 * 60 * 24 > updateTime) {
    // update data
    conf.updateTime = updateTime;
    // update all data by server
    await setStorageData("config", conf);
  }
  globalThis.conf = conf;
  getRandomWallpaper().then((res) => {
    console.log("res is ", res);
  });
}
