/**
 * 1. 初始化项目
 * 2. 根据用户输入单独进行配置
 * 3. 如果已经初始化过了，则按配置和网络情况进行更新和其他操作
 */

import { init } from "./init"; // 初始化全局 config 对象，更新此对象将会直接写入 storage

const prepareFn = async () => {
  console.log("prepare function is running.");
  await init();
  console.log("init and print global this settings", globalThis.settings);
};
export default prepareFn;