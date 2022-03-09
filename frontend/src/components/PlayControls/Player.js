import AudioPlayer from 'react-h5-audio-player';
import { useSelector } from 'react-redux';
import { useAudioPlayer } from '../../Context/AudioPlayerContext';
import 'react-h5-audio-player/lib/styles.css';
import { useEffect } from 'react';

export default function Player() {
  const song = useSelector(state => state.songs.playing);
  const { audioPlayer, paused, setPaused } = useAudioPlayer();

  let timeout;
  const onPlay = () => {
    // clearTimeout(timeout);
    // console.log('timer started...');
    // timeout = setTimeout(() => {
    //   console.log('BRUH!!!!!!!!');
    // }, 5000)
    
    setPaused(false);
    console.log('on play');
  }
  const onPause = () => {
    clearTimeout(timeout);
    setPaused(true);
    console.log('on pause');
  }
  
  useEffect(() => {

    console.log('inside use effect', paused);
  })
  return (
    <>
      <AudioPlayer
        autoPlay
        src={song?.songURL}
        onPlay={e => {
          onPlay()
        }}
        onPause={e => {
          onPause()
        }}
        ref={audioPlayer}
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
