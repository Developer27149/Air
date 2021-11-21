import * as yup from "yup";
const { string, array, number, boolean, object, mixed } = yup;

export const configSchema = yup.object().shape({
  wallpaper: object({
    raw: boolean().required(),
    fixed: boolean().required(),
    history: array().required(),
    unlike: array().required(),
    like: array().required(),
    items: array().required(),
    imgBase64: string().required(),
    downloadUrl: string().required(),
  }).required(),
  time: object({
    showTime: boolean().required(),
    showWeather: boolean().required(),
    location: string(),
  }).required(),
  msg: object({
    show: boolean().required(),
    text: string().required(),
    fontSize: number().required(),
  }),
  search: object({
    engine: string().required(),
  }),
  updateTimestamp: string(),
  backendBaseUrl: string(),
  weather: object({
    temp: number(),
    text: string(),
  }),
  profile: object({
    token: string(),
    avatar: string(),
    username: string(),
    intro: string(),
    uploadWallpaperId: array(),
    email: string(),
    isAnonymous: boolean().required(),
  }),
  todo: object({
    tasks: array()
      .of(
        object().shape({
          status: mixed().oneOf(["finish", "doing", "init"]).required(),
          content: object().shape({
            title: string().required(),
            text: string().required(),
          }),
          create_at: string().required(),
          deadline: string(),
          needNotice: boolean().required(),
          importantLevel: array().of(string()).required(),
          comments: array().default([]),
          isFixed: boolean().default(false),
          id: string().required(),
        })
      )
      .default([]),
    activeMenu: boolean().default(true),
    activeMenuItemId: number().default(1),
    showTip: boolean().default(true).required(),
  }),
});
