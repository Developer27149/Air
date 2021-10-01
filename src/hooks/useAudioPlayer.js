import { useEffect, useState } from "react";

export default function useAudioPlayer({ url }) {
  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickendTime] = useState();

  useEffect(() => {
    const audio = document.getElementById("audio");
    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    };

    const setAudioTime = () => setCurTime(audio.currentTime);

    // DOM listeners: update react state on DOM events
    audio.addEventListener("loadeddata", setAudioData); // 加载好音频之后就可以初始化当前音频信息
    audio.addEventListener("timeupdate", setAudioTime); // 更新音频时间点

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause();
    if (clickedTime && clickedTime !== curTime) {
      // update currentTime
      audio.currentTime = clickedTime;
      setClickendTime(null);
    }

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioTime);
      audio.removeEventListener("timeupdate", setAudioTime); // 更新音频时间点
    };
  });
  // useEffect(() => {
  //   const audio = document.getElementById("audio");
  //   setCurTime(audio.currentTime);
  //   setDuration(audio.duration);
  //   setPlaying(true);
  // }, [url]);
  return {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickendTime,
    setCurTime,
    setDuration,
  };
}
