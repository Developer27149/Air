import * as yup from "yup";

const { string } = yup;
export const configSchema = yup.object().shape({
  imgUrl: string().required(),
  backupImgUrl: string().required(),
  videoUrl: string().required(),
  backupVideoUrl: string().required(),
  searchEngine: string().default("g").matches(/(g|b)/).required(),
});
