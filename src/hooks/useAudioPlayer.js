import { useCallback, useEffect, useRef, useState } from "react";
import { getRandomMusic } from "Utils/request.js";

export default function useAudioPlayer(audioRef) {
  const [isCanplay, setIsCanplay] = useState(false);
  const [songUrl, setSongUrl] = useState(null);
  const songUrlRef = useRef(null);
  const [isPause, setIsPause] = useState(true);
  const [currentProgressPercent, setCurrentProgressPercent] = useState(0);

  const handleCanplay = useCallback(() => setIsCanplay(true));

  const handleTimeUpdate = useCallback(() => {
    setCurrentProgressPercent(~~((audioRef.current.currentTime / audioRef.current.duration) * 100));
  }, [audioRef.current]);

  const handleAudioToEnd = useCallback(() => {
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
    setIsPause(true);
  }, [audioRef.current]);
  const switchStatus = useCallback(() => {
    if (isCanplay) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPause(false);
      } else {
        audioRef.current.pause();
        setIsPause(true);
      }
    }
  }, [audioRef.current, isCanplay]);

  useEffect(() => {
    if (songUrlRef.current !== songUrl && songUrl !== null) {
      // 切歌了，更新状态
      audioRef.current.src = songUrl;
      audioRef.current.load();
      audioRef.current.currentTime = 0;
    }
  }, [songUrl]);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      // DOM listeners: update react state on DOM events
      audio.addEventListener("canplay", handleCanplay); // 加载好音频之后就可以初始化当前音频信息
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleAudioToEnd);
      // Get music resource address
      getRandomMusic().then((res) => {
        const {
          data: {
            data: { downloadUrl },
          },
        } = res;
        setSongUrl(downloadUrl);
      });
    }

    // effect cleanup
    return () => {
      audioRef.current.removeEventListener("canplay", handleCanplay);
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.removeEventListener("ended", handleAudioToEnd);
    };
  }, [audioRef.current]);

  return {
    isCanplay,
    switchStatus,
    isPause,
    currentProgressPercent,
  };
}
