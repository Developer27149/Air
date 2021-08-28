import * as yup from "yup";
const { string, array, number, boolean, object } = yup;

export const configSchema = yup.object().shape({
  wallpaper: object({
    raw: boolean().required(),
    fixed: boolean().required(),
    history: array().required(),
    unlike: array().required(),
    items: array().required(),
  }).required(),
  time: object({
    showTime: boolean().required(),
    showWeather: boolean().required(),
  }).required(),
  msg: object({
    show: boolean().required(),
    text: string().required(),
    fontSize: number().required(),
  }),
  search: object({
    engine: string().required(),
  }),
  location: string().required(),
  updateTimestamp: string().required(),
  backendBaseUrl: string().required(),
  token: string().required(),
});
