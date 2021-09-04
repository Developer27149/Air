import { configSchema } from "Schema/index.js";
import { getStorage } from "./index.js";

const getInitConfig = async () => {
  let storageData = await getStorage("config");
  let config = storageData?.config;
  try {
    await configSchema.validate(config);
  } catch (error) {
    console.log(error);
    const initConfig = await import("../prepare/init.js");
    config = initConfig.config;
  } finally {
    return config;
  }
};

export default getInitConfig;
