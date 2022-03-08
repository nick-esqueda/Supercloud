import React, { useContext, useRef } from 'react'
import { createContext } from 'react'

const AudioPlayerContext = createContext();
export const useAudioPlayer = () => useContext(AudioPlayerContext);

export default function AudioPlayerProvider(props) {
  const audioPlayer = useRef(null);
  
  return (
    <AudioPlayerContext.Provider value={audioPlayer}>
      {props.children}
    </AudioPlayerContext.Provider>
  )
}
