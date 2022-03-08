import AudioPlayer from 'react-h5-audio-player';
import { useSelector } from 'react-redux';
import 'react-h5-audio-player/lib/styles.css';
import { useEffect, useRef } from 'react';

export default function Player() {
  const song = useSelector(state => state.songs.playing);
  
  const player = useRef();

  const clickPlay = () => player.current.audio.current.play();
  const clickPause = () => player.current.audio.current.pause();

  return (
    <>
      <button onClick={clickPlay}>play test</button>
      <button onClick={clickPause}>pause test</button>
      <AudioPlayer
        autoPlay
        src={song?.songURL}
        onPlay={e => console.log("onPlay")}
        onPause={e => console.log('onPause')}
        ref={player}
        // other props here
        layout='horizontal-reverse'
        showSkipControls={true}
        showJumpControls={false}
        customAdditionalControls={[]}
        style={{
          backgroundColor: '#212121',
          paddingLeft: '0',

        }}
      />
    </>
  );
}
