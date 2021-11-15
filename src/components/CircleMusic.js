import useAudioPlayer from "Hooks/useAudioPlayer.js";
import React from "react";

export default function CircleMusic() {
  const { curTime, duration, playing, setPlaying, setClickendTime, setCurTime, setDuration } =
    useAudioPlayer();
  return (
    <div>
      <audio onClick={setPlaying}/>
    </div>
  );
}
