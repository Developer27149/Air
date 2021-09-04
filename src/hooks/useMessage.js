import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useMessage() {
  const msg = useSelector((state) => state.basic.msg);
  const backendBaseUrl = useSelector((state) => state.basic.backendBaseUrl);
  const updateTimestamp = useSelector((state) => state.basic.updateTimestamp);
  const time = useSelector((state) => state.basic.time);
  const dispatch = useDispatch();
  // data
  const [data, setData] = useState(msg.text);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDateTime = new Date().getTime();
        // 如果最近一小时内获取过则忽略
        if (currentDateTime - updateTimestamp > 1000 * 60 * 60) {
          // 获取新的更新到 storage
          // 如果用户需要展示每日文字，则获取新的内容
          if (msg.show) {
            const { data } = await axios.get(`${backendBaseUrl}/msg`);
            console.log(data);
            dispatch(
              setMsg({
                ...msg,
                text: data,
              })
            );
            setData(data);
          }
        }
      } catch (error) {
        // 出错则使用旧的 data
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return data;
}
