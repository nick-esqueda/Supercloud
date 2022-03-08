import React, { useContext, useRef, useState } from 'react'
import { createContext } from 'react'

const AudioPlayerContext = createContext();
export const useAudioPlayer = () => useContext(AudioPlayerContext);

export default function AudioPlayerProvider(props) {
  const audioPlayer = useRef(null);
  const [paused, setPaused] = useState(false);
  
  return (
    <AudioPlayerContext.Provider value={{ audioPlayer, paused, setPaused }}>
      {props.children}
    </AudioPlayerContext.Provider>
  )
}
