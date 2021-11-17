import { configSchema } from "Schema/index.js";
import { getStorage } from "./index.js";

const getInitConfig = async () => {
  console.log("调用获取初始化配置函数");
  let config = await getStorage("config");
  try {
    await configSchema.validate(config);
  } catch (error) {
    console.log("获取初始化数据错误, 使用默认配置作为 store 的初始数据, error is:", error);
    // 重新获取默认初始化的数据并且返回
    const initConfig = await import("../prepare/init.js");
    config = initConfig.config;
  } finally {
    return config;
  }
};

export default getInitConfig;
