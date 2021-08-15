import * as yup from "yup";
const { string, array, number } = yup;

export const configSchema = yup.object().shape({
  imgArr: array().required(),
  unlikeImgArr: array().required(),
  historyIdArr: array().required(),
  videoArr: array().required(),
  searchEngine: string().required(),
  updateTime: number().required(),
});
