import * as yup from "yup";
const { string, array, number, boolean } = yup;

export const configSchema = yup.object().shape({
  fixedImg: string(),
  imgArr: array().required(),
  unlikeImgArr: array().required(),
  historyIdArr: array().required(),
  videoArr: array().required(),
  searchEngine: string().required(),
  updateTime: number().required(),
  showTime: boolean().required(),
  msg: string().required(),
  useRawWallpaper: string().default("auto"),
  apiHost: string().required(),
  location: string().required(),
});
